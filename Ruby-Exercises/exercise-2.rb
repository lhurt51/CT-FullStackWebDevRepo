@my_cars = []

car1 = {make: 'Ferarri', model:'Enzo', color:'Blue'}
car2 = {make: 'Ferarri', model:'Spider', color:'Green'}
car3 = {make: 'Buggatti', model:'Veyron', color:'Orange'}
car4 = {make: 'Lamborghini', model:'Murcielago', color:'Black'}
car5 = {make: 'Mclaren', model:'P1', color:'Red'}
car6 = {make: 'khf', model:'ypkfh', color:'black'}

@my_cars.push(car1, car2, car3, car4, car5, car6)

def cars_with_i
  @my_cars.select {|car| (car[:make].include? 'i') || (car[:make].include? 'a') || (car[:make].include? 'e')}
end

def print_cars all_cars
  all_cars.map {|car| car[:make] + ' | ' + car[:model] + ' | ' + car[:color]}
end

puts print_cars cars_with_i
