from home.models import BaseSettings
from shop.models import Category, ShopSettings 
 
def load_settings(request):
    return {'site_settings': BaseSettings.load()}

def category_menu(request):
    return {'category_menu': Category.objects.filter(add_menu=True)}

def catalog_download(request):
    try:
        shop_settings = ShopSettings.objects.get()
        return {'catalog_pdf': shop_settings}
    except:
        shop_settings = ShopSettings.objects.all()
        return {'catalog_pdf': shop_settings}
    