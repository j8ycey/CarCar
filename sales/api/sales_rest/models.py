from operator import mod
from django.db import models


# Create your models here.
class Salesman(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.IntegerField()

    def __str__(self):
        return self.first_name + " " + self.last_name


class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    address = models.ForeignKey(
        "Address",
        on_delete=models.PROTECT,
    )
    phone = models.CharField(max_length=12)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Address(models.Model):
    street = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    state = models.ForeignKey(
        "State",
        on_delete=models.CASCADE,
    )
    zipcode = models.CharField(max_length=5)

    def __str__(self):
        return self.city + ", " + self.state.abbreviation + " - " + self.street

    class Meta:
        ordering = ['state', 'city']


class State(models.Model):
    abbreviation = models.CharField(max_length=2)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.abbreviation + " - " + self.name

    class Meta:
        ordering = ['name']


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