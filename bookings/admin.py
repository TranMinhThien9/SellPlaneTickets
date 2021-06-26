from django.contrib import admin

# Register your models here.
from .models import Airport, Flight, Plane, Passenger, Ticket, DetailTransit, UserV2

admin.site.register(Airport)
admin.site.register(Flight)
admin.site.register(Plane)
admin.site.register(Passenger)
admin.site.register(Ticket)
admin.site.register(DetailTransit)
admin.site.register(UserV2)