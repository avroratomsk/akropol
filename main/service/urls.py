from django.urls import path

from service import views


urlpatterns = [
    path('ustanovka/', views.service_new, name="service_new"),
    path('gravirovka/', views.service_grav, name="service_grav"),
    path('', views.service, name="service"),
    # path('<slug:slug>/', views.service_detail, name="service_detail"),
]