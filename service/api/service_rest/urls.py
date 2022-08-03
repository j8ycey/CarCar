from django.urls import path
from .views import list_create_appointments, list_create_technicians, cancel_appointments, list_vos

urlpatterns = [
    path("appointments/", list_create_appointments, name="list_create_appointments"),
    path("technicians/", list_create_technicians, name="list__create_technicians"),
    path("appointments/<int:pk>/", cancel_appointments, name="cancel_appointment"),
    path("automobiles/", list_vos, name="list_vos"),
]