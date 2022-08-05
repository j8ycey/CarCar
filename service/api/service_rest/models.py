from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_vin", kwargs={"pk": self.id})

    def __str__(self):
        return self.vin
        


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)
    def __str__(self):
        return self.name + " - " + str(self.employee_id)
    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})
    class Meta:
        ordering = ["name"]


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    vip = models.BooleanField(default=False)
    appointment_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})

    def __str__(self):
        return self.vin + " - " + self.customer + " - " + self.reason

    class Meta:
        ordering = ["appointment_time"]
