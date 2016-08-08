require 'pp'
require './lib/parkingManagement'

@vehicles = []

car1 = {make: 'Ferarri', model:'Enzo', color:'Blue'}
car2 = {make: 'Ferarri', model:'Spider', color:'Green'}
car3 = {make: 'Buggatti', model:'Veyron', color:'Orange'}
car4 = {make: 'Lamborghini', model:'Murcielago', color:'Black'}
car5 = {make: 'Mclaren', model:'P1', color:'Red'}
bike1 = {make: 'Kawasaki', model:'Ninja', color:'Green'}

@vehicles.push(car1, car2, car3, car4, car5, bike1)

@my_garage = GarageManagementSystem::Garage.new

def create_spots
  level = 2
  until level == 0
    i = 1
    car_spot = 15
    until car_spot == 0
      spot = GarageManagementSystem::Spot.new
      spot.type = 'car'
      spot.level = level
      spot.number = i
      @my_garage.spots.push(spot)
      i += 1
      car_spot -= 1
    end
    bike_spot = 5
    until bike_spot == 0
      spot = GarageManagementSystem::Spot.new
      spot.type = 'motorcycle'
      spot.level = level
      spot.number = i
      @my_garage.spots.push(spot)
      i += 1
      bike_spot -= 1
    end
    level -= 1
  end
end

def add_vehicles
  for vehicle in @vehicles
    car = GarageManagementSystem::Vehicle.new
    car.make = vehicle[:make]
    car.model = vehicle[:model]
    car.color = vehicle[:color]
    @my_garage.vehicles.push(car)
  end
end

create_spots
add_vehicles
