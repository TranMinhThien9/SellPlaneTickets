from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('flights', views.flights_view, name='flights'),
    path('flights/<int:flight_id>', views.flight, name='flight'),
    path('flights/<int:flight_id>/tickets', view=views.tickets_view, name='tickets'),
    path('register', view=views.register_view, name='register'),
    path('login', view=views.login_view, name='login'),
    path('logout', view=views.logout_view, name='logout'),
    path('customersearching', views.customer_searching, name='customersearching'),
    #path('customerbooking', views.customer_booking, name='customerbooking'),
    #path('adminsearching', views.admin_searching, name='adminsearching'),
    path('adminselling', views.admin_selling, name='adminselling'),
    path('adminsellinginfo', views.admin_selling_info, name='adminsellinginfo'),
    #path('customersearchinginfo', views.customer_searching_info, name='customersearchinginfo'),
    #path('tickets', views.tickets_view, name='tickets')
]