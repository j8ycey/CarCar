from django.urls import path
from .views import list_create_appointments, list_create_technicians, update_appointments, list_vos

urlpatterns = [
    path("appointments/", list_create_appointments, name="list_create_appointments"),
    path("technicians/", list_create_technicians, name="list__create_technicians"),
    path("appointments/<int:pk>/", update_appointments, name="update_appointment"),
    path("automobiles/", list_vos, name="list_vos"),

]