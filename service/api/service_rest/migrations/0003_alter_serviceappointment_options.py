# Generated by Django 4.0.3 on 2022-08-05 17:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_serviceappointment_vin'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='serviceappointment',
            options={'ordering': ['appointment_time']},
        ),
    ]