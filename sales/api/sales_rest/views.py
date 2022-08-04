from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import *


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "manufacturer",
        "model",
        "year",
        "color",
        "sold",
    ]


class ModelVOEncoder(ModelEncoder):
    model = ModelVO
    properties = [
        "id",
        "name",
        "manufacturer",
    ]


class ManufacturerVOEncoder(ModelEncoder):
    model = ManufacturerVO
    properties = [
        "id",
        "name",
    ]


class SalesmanEncoder(ModelEncoder):
    model = Salesman
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class StateEncoder(ModelEncoder):
    model = State
    properties = [
        "abbreviation",
        "name",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "phone",
        "street",
        "city",
        "state",
        "zipcode",
    ]
    encoders = {
        "state": StateEncoder()
    }


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesman",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesman": SalesmanEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET"])
def list_automobiles(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"automobiles": automobiles},
        encoder=AutomobileVOEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def list_models(request):
    models = ModelVO.objects.all()
    return JsonResponse(
        {"models": models},
        encoder=ModelVOEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def list_manufacturers(request):
    manufacturers = ManufacturerVO.objects.all()
    return JsonResponse(
        {"manufacturers": manufacturers},
        encoder=ManufacturerVOEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def list_states(request):
    states = State.objects.all()
    return JsonResponse(
        {"states": states},
        encoder=StateEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def list_salesmen(request):
    if request.method == "GET":
        salesmen = Salesman.objects.all()
        return JsonResponse(
            {"salesmen": salesmen},
            encoder=SalesmanEncoder,
            safe=False
        )
    elif request.method == "POST":
        data = json.loads(request.body)
        salesman = Salesman.objects.create(**data)
        return JsonResponse(
            {"salesman": salesman},
            encoder=SalesmanEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )
    elif request.method == "POST":
        data = json.loads(request.body)
        state = State.objects.get(abbreviation=data["state"])
        data["state"] = state
        customer = Customer.objects.create(**data)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    elif request.method == "POST":
        data = json.loads(request.body)
        try:
            vin = data["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            data["automobile"] = automobile
            salesman = Salesman.objects.get(employee_id=data["salesman"])
            data["salesman"] = salesman
            customer = Customer.objects.get(id=data["customer"])
            data["customer"] = customer
            sale = Sale.objects.create(**data)
            AutomobileVO.objects.filter(vin=vin).update(sold=True)
            return JsonResponse(
                {"sale": sale},
                encoder=SaleEncoder,
                safe=False
            )
        except (AutomobileVO.DoesNotExist, Salesman.DoesNotExist, AutomobileVO.DoesNotExist):
            return JsonResponse({"Error": "Selected automobile, salesman, or customer does not exist"}, status=404)
