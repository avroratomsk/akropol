from django.http import HttpResponse
from django.shortcuts import render

from home.models import BaseSettings, Gallery, GalleryCategory, HomeTemplate, Stock
from cart.models import Cart
from home.forms import CallbackForm, ContactForm, OrderSericeForm, ReviewsPopupForm
from home.callback_send import email_callback
from shop.models import Category, Product
from reviews.models import Reviews
from django.http import JsonResponse


def callback(request):
  if request.method == "POST":
    form = CallbackForm(request.POST)
    if form.is_valid():
      name  = form.cleaned_data['name']
      phone = form.cleaned_data['phone']
      title = 'Заказ обратного звонка'
      messages = "Заказ обратного звонка:" + "\n" + "Имя: " +str(name) + "\n" + "Номер телефона: " + str(phone) + "\n"
      
      email_callback(messages, title)
      
      return JsonResponse({"success": "success"})
  else:
    return JsonResponse({'status': "error", 'errors': form.errors})
  
  return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def contact_form(request):
  if request.method == "POST":
    form = ContactForm(request.POST)
    if form.is_valid():
      name  = form.cleaned_data['name']
      phone = form.cleaned_data['phone']
      social = form.cleaned_data['social']
      title = 'Заказ обратного звонка'
      messages = "Заказ обратного звонка:" + "\n" + "Имя: " +str(name) + "\n" + "Номер телефона: " + str(phone) + "\n" + "\n" + "Способ связи: " + str(social) + "\n"
      
      email_callback(messages, title)
      
      return JsonResponse({"success": "success"})
    else:
      print(form)
  else:
    return JsonResponse({'status': "error", 'errors': form.errors})
  
  return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def reviews_form(request):
  if request.method == "POST":
    form = ReviewsPopupForm(request.POST)
    if form.is_valid():
      name  = form.cleaned_data['name']
      phone = form.cleaned_data['phone']
      reviews = form.cleaned_data['reviews']
      title = 'Форма отзыва'
      messages = "Форма отзыва:" + "\n" + "Имя: " +str(name) + "\n" + "Телефон: " + str(phone) + "\n" + "\n" + "Отзыв: " + str(reviews) + "\n"
      
      email_callback(messages, title)
      
      return JsonResponse({"success": "success"})
    else:
      print(form)
  else:
    return JsonResponse({'status': "error", 'errors': form.errors})
  
  return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def service_form(request):
  if request.method == "POST":
    form = OrderSericeForm(request.POST)
    if form.is_valid():
      name  = form.cleaned_data['name']
      phone = form.cleaned_data['phone']
      pagename = form.cleaned_data['service']
      title = 'Заказ обратного звонка'
      messages = "Заказ обратного звонка:" + "\n" + "Имя: " +str(name) + "\n" + "Номер телефон: " + str(phone) + "\n" + "Заказ услуги: " + str(pagename) + "\n"
      
      email_callback(messages, title)
      
      return JsonResponse({"success": "success"})
    else:
      print(form)
  else:
    return JsonResponse({'status': "error", 'errors': form.errors})
  
  return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def consultation(request):
  if request.method == "POST":
    form = OrderSericeForm(request.POST)
    if form.is_valid():
      name  = form.cleaned_data['name']
      phone = form.cleaned_data['phone']
      pagename = form.cleaned_data['service']
      title = 'Консультация'
      messages = "Консультация:" + "\n" + "Имя: " +str(name) + "\n" + "Телефон: " + str(phone) + "\n" + "Проконсультировать по : " + str(pagename) + "\n"
      
      email_callback(messages, title)
      
      return JsonResponse({"success": "success"})
    else:
      print(form)
  else:
    return JsonResponse({'status': "error", 'errors': form.errors})
  
  return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


def index(request):
  page = request.GET.get('page', 1)
  form = CallbackForm()
  try: 
    home_page = HomeTemplate.objects.get()
    settings = BaseSettings.objects.get()
  except:
    home_page = HomeTemplate.objects.all()
    settings = BaseSettings.objects.all()

  category = Category.objects.all()[:4]
  products = Product.objects.filter(status=True).prefetch_related('chars')[:8]
  reviews = Reviews.objects.filter(status=True)
  gallery = Gallery.objects.all()
  gallery_category = GalleryCategory.objects.all().prefetch_related('categories')
  
  context = {
    "categorys": category,
    "home_page": home_page,
    "products": products,
    "settings": settings,
    "reviews": reviews,
    "gallery": gallery,
    "gallery_category": gallery_category,
    "form": form
  }
  return render(request, 'pages/index.html', context)

def about(request):
    return render(request, "pages/about.html")

def contact(request):
    return render(request, "pages/contact.html")

def stock(request):
    stocks = Stock.objects.filter(status=True)
    news = Product.objects.filter(latest=True)
    populate = Product.objects.filter(quantity_purchase__gte=10)
    free_delivery = Product.objects.filter(free_shipping=True)
    
    context = {
        "stocks": stocks,
        "news": news,
        "populate": populate,
        "free_delivery": free_delivery,
    }
    
    return render(request, "pages/stock/stock.html", context)

def stock_detail(request, slug):
    stock = Stock.objects.get(slug=slug)
    
    context = {
        "stock": stock
    }
    
    return render(request, "pages/stock/stock_detail.html", context)
  
  
def gallery(request):
  gallery_category = GalleryCategory.objects.all().prefetch_related('categories')
  gallery = Gallery.objects.all()
  context = {
    "gallery": gallery,
    "gallery_category": gallery_category,
  }
  
  return render(request, "pages/gallery.html", context)


def delivery(request):
  return render(request, "pages/delivery.html")