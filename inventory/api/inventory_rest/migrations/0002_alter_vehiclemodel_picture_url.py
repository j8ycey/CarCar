# Generated by Django 4.0.3 on 2022-08-01 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehiclemodel',
            name='picture_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
