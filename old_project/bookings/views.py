from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpResponseForbidden, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import UserV2, Airport, Flight, Ticket, Passenger
from django.urls import reverse
from django.forms.models import model_to_dict

# Create your views here.

def index(request):
    if not request.user.is_authenticated:
        return render(request, "bookings/index.html") # == login page
    context = {
        "user": request.user
    }
    if request.user.groups.filter(name='Ticket Agents').exists():
        return render(request, "bookings/Admin_LoginSucessfully.html")

    return HttpResponseRedirect(reverse('customersearching'))

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('index'))
    else:
        return HttpResponse("Mật khẩu hoặc tài khoản không hợp lệ")

def register_view(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse('index'))
        return render(request, "bookings/register.html")
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        id_number = request.POST['id_number']
        phone_number = request.POST['phone_number']
        sex = request.POST['sex']
        birthday = request.POST['birthday']

        if User.objects.filter(username=username).exists():
            return HttpResponse("Tài khoản đã tồn tại")
        else:
            user = User.objects.create_user(username=username, password=password, email=email,
            first_name=first_name, last_name=last_name)
            user.save()

            user_v2 = UserV2(user=user, id_number=id_number, phone_number=phone_number, sex=sex, birthday=birthday)
            user_v2.save()

            login(request, user)
            return HttpResponseRedirect(reverse('index'))

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

def customer_searching(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    context = {
        "airports": [model_to_dict(airport) for airport in Airport.objects.all()]
    }
    return render(request, "bookings/Customer_Searching.html", context)

def admin_selling(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    # Check agent account?
    if request.user.groups.filter(name='Ticket Agents').exists():
        if request.method == 'GET':
            return render(request, "bookings/Admin_Selling.html")
        elif request.method == 'POST':
            flight_id = request.POST['flight_id']
            seat_code = request.POST['seat_code']
            # Check booking code
            #Ticket.objects.filter(seat_code=booking_code)
            ticket = Ticket.objects.filter(flight=flight_id, seat_code=seat_code)
            if not ticket:
                return HttpResponse("No comment")
            context = {
                "passenger_name": ticket[0].passenger.full_name,
                "flight_id": flight_id,
                "departure": ticket[0].flight.departure.code,
                "arrival": ticket[0].flight.arrival.code,
                "departure_date": ticket[0].flight.departure_time.date(),
                "departure_time": ticket[0].flight.departure_time.strftime('%H: %M'),
                "arrival_time": ticket[0].flight.arrival_time.strftime('%H: %M'),
                "ticket_type": ticket[0].seat_code[0],
                "ticket_price": ticket[0].flight.first_class_price if ticket[0].seat_code[0] == 'F' else ticket[0].flight.eco_class_price,
            }
            #return HttpResponseRedirect(reverse('ticket', args=[flight_id, seat_code]))
            return render(request, "bookings/Admin_SellingInfo.html", context)

def admin_selling_info(request):
    return render(request, "bookings/Admin_SellingInfo.html")

def flights_view(request):
    if request.method == 'GET':
        if request.user.groups.filter(name='Ticket Agents').exists():
            flights = Flight.objects.all()
        else:
            departure = request.GET['departure']
            arrival = request.GET['arrival']
            departure_date = request.GET['departure_date']
            flights = Flight.objects.filter(departure=departure, arrival=arrival, departure_time__date=departure_date)

        context = {"flights": []}
        for flight in flights:
            context["flights"].append({
                "id": flight.id,
                "departure_code": flight.departure.code,
                "arrival_code": flight.arrival.code,
                "departure_time": flight.departure_time.strftime('%H: %M'),
                "arrival_time": flight.arrival_time.strftime('%H: %M'),
                "num_of_seats": flight.plane.num_of_seats,
                "num_of_fc_seats": flight.plane.num_of_fc_seats,
                "num_of_eco_seats": flight.plane.num_of_eco_seats,
                "num_of_empty_fc_seats": flight.plane.num_of_fc_seats - len(Ticket.objects.filter(flight_id=flight.id, seat_code__startswith='F')),
                "num_of_empty_eco_seats": flight.plane.num_of_eco_seats - len(Ticket.objects.filter(flight_id=flight.id, seat_code__startswith='Y')),
            })
        if request.user.groups.filter(name='Ticket Agents').exists():
            return render(request, "bookings/Admin_Searching.html", context)
        return render(request, "bookings/Customer_SearchingInfo.html", context)


def flight(request, flight_id):
    if request.method == 'GET' and request.user.is_authenticated:
        try:
            flight = Flight.objects.get(pk=flight_id)
        except Flight.DoesNotExist:
            raise Http404("Flight does not exist")
        context = {
            "flight": {
                "id": flight.id,
                "departure_code": flight.departure.code,
                "arrival_code": flight.arrival.code,
                "departure_time": flight.departure_time.strftime('%H: %M'),
                "arrival_time": flight.arrival_time.strftime('%H: %M'),
                "fc_price": flight.first_class_price,
                "eco_price": flight.eco_class_price,
                "transit": [(transit.airport.code, transit.transit_time) for transit in flight.transits_flight.all()],
                "num_of_seats": flight.plane.num_of_seats,
                "num_of_fc_seats": flight.plane.num_of_fc_seats,
                "num_of_eco_seats": flight.plane.num_of_eco_seats,
                "num_of_empty_fc_seats": flight.plane.num_of_fc_seats - len(Ticket.objects.filter(flight_id=flight.id, seat_code__startswith='F')),
                "num_of_empty_eco_seats": flight.plane.num_of_eco_seats - len(Ticket.objects.filter(flight_id=flight.id, seat_code__startswith='Y')),
                "tickets": [seat_code for seat_code in ['F' + str(num) for num in range(flight.plane.num_of_fc_seats)] \
                    + ['Y' + str(num) for num in range(flight.plane.num_of_eco_seats)] if seat_code not in [ticket.seat_code for ticket in flight.tickets.all()]]
            }
        }
        return render(request, "bookings/Customer_booking.html", context)
        #return JsonResponse(context)
    else:
        return HttpResponseForbidden(content='You need login')

def tickets_view(request, flight_id):
    if request.method == 'POST':
        user_id = request.user.id
        #flight_id = request.POST['flight_id']
        seat_code = request.POST['seat_code']

        user = UserV2.objects.get(pk=user_id)
        
        if Passenger.objects.filter(id_card_number=user.id_number).exists() == False:
            passenger = Passenger.objects.create(id_card_number=user.id_number, first_name=user.user.first_name, 
            last_name=user.user.last_name, birthday=user.birthday, phone_number=user.phone_number,
            sex=user.sex)
            passenger.save()
        else:
            passenger = Passenger.objects.filter(id_card_number=user.id_number)[0]

        ticket = Ticket.objects.create(flight=Flight.objects.get(pk=flight_id), passenger=passenger, seat_code=seat_code)
        ticket.save()

        return HttpResponse(content=f'Vé đã được đặt, vui lòng thanh toán trước ít nhất 1 ngày.')