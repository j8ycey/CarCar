from django.urls import path
from .views import (
    list_automobiles,
    list_customers,
    list_sales,
    list_salesmen,
    list_manufacturers,
    list_models,
)

urlpatterns = [
    path("automobiles/", list_automobiles, name="list_automobiles"),
    path("models/", list_models, name="list_models"),
    path("manufacturers/", list_manufacturers, name="list_manufacturers"),
    path("customers/", list_customers, name="list_customers"),
    path("sales/", list_sales, name="list_sales"),
    path("salesmen/", list_salesmen, name="list_salesmen"),
]