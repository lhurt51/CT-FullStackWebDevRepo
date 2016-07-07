my_cars = []
car1 = {make: 'Ferarri', model:'Enzo', color:'Blue'}
car2 = {make: 'Ferarri', model:'Spider', color:'Green'}
car3 = {make: 'Buggatti', model:'Veyron', color:'Orange'}
car4 = {make: 'Lamborguini', model:'Mercilago', color:'Black'}
car5 = {make: 'Mclaren', model:'P1', color:'Red'}

my_cars.push(car1, car2, car3, car4, car5)

for car in my_cars
  if car[:color] == 'Red'
    puts car[:make] + ' ' + car[:model]
  end
end

for car in my_cars
  if (car[:make].include? 'i') || (car[:model].include? 'i')
    puts car
  end
end

for car in my_cars
  puts "#{car[:make]} #{car[:model]}"
end

array_string = []
for car in my_cars
  array_string.push("#{car[:make]} #{car[:model]} #{car[:color]}")
end
puts "#{array_string[0]} | #{array_string[1]} | #{array_string[2]} | #{array_string[3]} | #{array_string[4]}"
