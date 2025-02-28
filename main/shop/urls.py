from django.urls import path

from shop import views


urlpatterns = [
    #Если я сделаю данный маршрут ниже чем catalog_detail, то поиск не будет
    #работать по той причине что всегда будет выаолняться маршрут в который передали slug

    path('search/', views.category_detail, name="search"), 
    path('', views.category, name="category"),
    path('<slug:slug>/', views.category_detail, name="category_detail"),
    path('product/<slug:slug>/', views.product, name="product"),
    
]