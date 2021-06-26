from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Plane(models.Model):
    ACTIVE = 'AT'
    NON_ACTIVE = 'NA'
    STATUS_OF_PLANE_CHOICES = [
        (ACTIVE, 'Active'),
        (NON_ACTIVE, 'Non-active'),
    ]
    status = models.CharField(
        max_length=2,
        choices=STATUS_OF_PLANE_CHOICES,
        default=ACTIVE,
    )
    num_of_fc_seats = models.IntegerField()
    num_of_eco_seats = models.IntegerField()
    
    @property
    def num_of_seats(self):
        "Returns total number of seats in this plane"
        return self.num_of_fc_seats + self.num_of_eco_seats

    def __str__(self):
        return f"{self.id} - Status: {self.status} and Number of seats: {self.num_of_seats}"

class Airport(models.Model):
    code = models.CharField(max_length=3, default=None)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.id} - Name: {self.name}, Location: {self.location}"

class Passenger(models.Model):
    id_card_number = models.CharField(max_length=12)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthday = models.DateField()
    sex = models.CharField(max_length=5)
    phone_number = models.CharField(max_length=12)

    # methods
    @property
    def full_name(self):
        "Returns the full name of the passenger."
        return self.first_name + ' ' + self.last_name

    def __str__(self):
        return f"{self.id} - {self.full_name}."

class Flight(models.Model):
    plane = models.ForeignKey(Plane, on_delete=models.CASCADE, related_name='flights_use_this')
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    duration = models.IntegerField()
    departure = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='flights_departure')
    arrival = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='flights_arrival')
    first_class_price = models.IntegerField()
    eco_class_price = models.IntegerField()
    passengers = models.ManyToManyField(Passenger, blank=True, related_name="flights_gone")

    def change_duration(self, new_duration_time):
        self.duration = new_duration_time

    def __str__(self):
        return f"{self.id} - {self.departure} to {self.arrival}"

class DetailTransit(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name="transits_flight")
    airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='transits_airport')
    transit_time = models.IntegerField()

    @property
    def airport_name(self):
        return self.airport.name

    def __str__(self):
        return f"{self.id} - flight: {self.flight_id}, airport: {self.airport_name}"

class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='tickets')
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE, related_name='tickets')
    seat_code = models.CharField(max_length=4)

    def add_seat(self, code):
        if len(code) > 3 or code[0] not in ('F', 'Y') or int(code[1:]) <= 0:
            raise f"Invalid seat code."
        
        if Ticket.objects.filter(seat_code='F7').exists():
            raise f"This seat is already booked."

        if code[0] == 'F' and int(code[1:]) > self.flight.plane.num_of_fc_seats or \
            code[0] == 'Y' and int(code[1:]) > self.flight.plane.num_of_eco_seats:
            raise f"Invalid seat code."
        else:
            self.seat_code = code

    @property
    def price(self):
        class_fare = self.seat_code[0]
        return self.flight.fc_price if class_fare == 'F' else self.flight.ec_price

    @property
    def passenger_name(self):
        return self.passenger.name

    def __str__(self):
        return f"{self.id} - {self.flight} - Passenger: {self.passenger.full_name} - Seat code: {self.seat_code}"

class UserV2(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_number = models.CharField(max_length=12)
    phone_number = models.CharField(max_length=12)
    sex = models.CharField(max_length=6, default=None)
    birthday = models.DateField(default=None)