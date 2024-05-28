from django.urls import path

from service import views


urlpatterns = [
    path('service-new/', views.service_new, name="service_new"),
    path('', views.service, name="service"),
    path('<slug:slug>/', views.service_detail, name="service_detail"),
]