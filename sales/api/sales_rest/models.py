from operator import mod
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Salesman(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.IntegerField(unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    phone = PhoneNumberField()
    street = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=5)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Sale(models.Model):
    automobile = models.OneToOneField(
        "AutomobileVO",
        related_name="sale",
        on_delete=models.CASCADE,
    )
    salesman = models.ForeignKey(
        "Salesman",
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        "Customer",
        related_name="sales",
        on_delete=models.PROTECT,
    )
    price = models.IntegerField()

    def __str__(self):
        return self.automobile.vin + " / salesman: " + str(self.salesman)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    manufacturer = models.CharField(max_length=20)
    model = models.CharField(max_length=20)
    year = models.PositiveSmallIntegerField()
    color = models.CharField(max_length=50)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class ModelVO(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)

    def __str__(self):
        return self.manufacturer + " " + self.name


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name