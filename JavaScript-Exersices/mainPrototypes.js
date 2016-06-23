var Garages = function (garages) {
  this.garages = garages;
}

var Garage = function (cars, motorcycles) {
  this.cars = cars;
}

var Car = function (make, model, color, year) {
  this.make = make;
  this.model = model;
  this.color = color;
  this.year = year;
}

var myFavCar = new Car (Ferrari, Enzo, Red, 2018)
var myFastestCar = new Car(Buggatti, Veyron, Green, 2016)

var myGarage = new Garage([myFavCar, myFastestCar])
