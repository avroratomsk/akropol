from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse
from django.db.models import Q
import itertools

from shop.forms import ProductFilterForm
from .services import *

from django.db.models import Count

from .models import *

def category(request):
  products = Product.objects.filter(status=True)
  page = request.GET.get("page", 1)
  if request.method == "GET":
    get_filtres = request.GET
      
    char_filtres_list = list(get_filtres.keys())
    parametrs_value = []
    for parametr in char_filtres_list:
      parametrs_value.append(request.GET.getlist(parametr))# [['Малиновый', 'Белый'], ['25']]
    
    merged_array = list(itertools.chain(*parametrs_value))
    product = ProductChar.objects.filter(char_value__in=merged_array)
    
    id_filter = [pr.parent.id for pr in product]
    
    if id_filter:
        products = products.filter(id__in=id_filter)
    
  products_all = Product.objects.filter(status=True)
  chars_all = ProductChar.objects.filter(parent__in=products_all).distinct()
  char_name = CharName.objects.filter(c_chars__in=chars_all, filter_add=True).exclude(filter_name=None).distinct()
  
  chars_list_name_noduble = []
  for li in chars_all:
    if li.char_value not in chars_list_name_noduble:
      chars_list_name_noduble.append(li.char_value)
  
  chars = ProductChar.objects.filter(char_value__in=chars_list_name_noduble).distinct('char_value')
  
  chars_list_name_noduble_a = ProductChar.objects.filter(parent__in=products_all).distinct().values_list('char_value', flat=True).distinct()
  # print(chars_list_name_noduble_a)

  # chars = ProductChar.objects.filter(char_value__in=chars_list_noduble)
  # print(chars)
  paginator = Paginator(products, 16)
  current_page = paginator.page(int(page))
  context = {
    "title": "Название товара",
    "products": current_page,
    "chars": chars,
    "char_name": char_name
  }
  
  return render(request, "pages/catalog/category.html", context)


def category_detail(request, slug):
  page = request.GET.get("page", 1)
  category = Category.objects.get(slug=slug)
  # chars = CharName.objects.filter(group=None)
  products = Product.objects.filter(category=category)
  filter_form = ProductFilterForm(request.GET)
  if filter_form.is_valid():
      q_objects = Q()
      for char_name in CharName.objects.filter(filter_add=True):
          value_ids = filter_form.cleaned_data.get(char_name.filter_name)
          if value_ids:
              q_objects |= Q(chars__char_name=char_name, chars__char_value__in=value_ids)
      
      if q_objects:
          products = products.filter(q_objects).distinct()
          
  paginator = Paginator(products, 16)
  current_page = paginator.page(int(page))
  
  context = {
    "category_name": category.name,
    "title": "Название товара",
    "products": current_page,
    "filter_form": filter_form,
  }
  
  return render(request, "pages/catalog/category-details.html", context)

def product(request, slug):
  product = Product.objects.get(slug=slug)
  products = Product.objects.filter(category=product.category)[:4]
  product_color = ColorProduct.objects.filter(active=True)
  # images = ProductImage.objects.filter(parent_id=product.id)[:3]
  chars_all = ProductChar.objects.filter(parent=product).distinct()
  
  char_name = CharName.objects.filter(c_chars__in=chars_all, filter_add=True).exclude(filter_name=None).distinct()
  
  chars_list_name_noduble = []
  for li in chars_all:
    if li.char_value not in chars_list_name_noduble:
      chars_list_name_noduble.append(li.char_value)
  
  # print(chars_list_name_noduble)
  
  # chars = ProductChar.objects.filter(char_value__in=chars_list_name_noduble).distinct('char_value')
  chars = ProductChar.objects.filter(char_value__in=chars_list_name_noduble).values('char_value').annotate(count=Count('char_value')).filter(count=1)
  
  context = {
    "title": "Название продукта",
    "product": product,
    "products": products,
    "char_name":char_name,
    "chars":chars_all,
    "product_color": product_color
    # "images": images
  }
  return render(request, "pages/catalog/product.html", context)
