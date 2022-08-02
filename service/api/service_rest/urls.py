from django.urls import path
from .views import delete_appointments, list_appointments, list_technicians, cancel_appointments

urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),
    path("technicians/", list_technicians, name="list_technicians"),
    path("appointments/<int:pk>/", cancel_appointments, name="cancel_appointment"),
]