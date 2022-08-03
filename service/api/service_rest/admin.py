from django.contrib import admin
from .models import AutomobileVO, Technician, ServiceAppointment

# Register your models here.

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(ServiceAppointment)