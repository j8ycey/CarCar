import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO, ModelVO, ManufacturerVO

def get_automobiles():
    url = "http://inventory-api:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for car in content["autos"]:
        AutomobileVO.objects.update_or_create(
            id=car["id"],
            vin=car["vin"],
            manufacturer=car["model"]["manufacturer"]["name"],
            model=car["model"]["name"],
            year=car["year"],
            color=car["color"],
        )

def get_models():
    url = "http://inventory-api:8000/api/models/"
    response = requests.get(url)
    content = json.loads(response.content)
    for model in content["models"]:
        ModelVO.objects.update_or_create(
            name=model["name"],
            manufacturer=model["manufacturer"]["name"],
        )

def get_manufacturers():
    url = "http://inventory-api:8000/api/manufacturers/"
    response = requests.get(url)
    content = json.loads(response.content)
    for manufacturer in content["manufacturers"]:
        ManufacturerVO.objects.update_or_create(
            name=manufacturer["name"]
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
            get_models()
            get_manufacturers()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
