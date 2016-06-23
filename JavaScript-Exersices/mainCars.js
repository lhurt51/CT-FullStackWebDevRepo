var garage = {

  userInterface: function () {
    var userInput = prompt('Would you like to add a car or search a model?')
    if (userInput.toLowerCase() === "add") {
      garage.addCar()
    } else if (userInput.toLowerCase() === "search") {
      garage.searchModel()
    } else {
      alert('Must enter something!')
      this.userInterface()
    }
  },

  addCar: function () {
    var myCar = prompt('Add a car by entering make, model, and color using only spaces.')
    if (myCar) {
      var inputArray = myCar.split(" ")
      if (inputArray.length === 3) {
        garage.cars.push({
            make: inputArray[0],
            model: inputArray[1],
            color: inputArray[2],
        })
      }
    } else {
      console.log('damn')
    }
  },

  searchModel: function () {
    var mySearch = prompt('Search a model')
    if (mySearch) {
      var searchResult;
      for (var i = 0; i < this.cars.length; i++) {
        var car = this.cars[i]
        if (mySearch.toLowerCase() === car.model) {
          searchResult = car
          break;
        }
      }
      return searchResult
    }
  },

  cars: [{

      make: 'corvette',
      model: 'stingray',
      color: 'red',

  }, {

      make: 'ford',
      model: 'pinto',
      color: 'green',

  }, {

      make: 'ford',
      model: 'sportsmobile',
      color: 'blue',

  }, {

      make: 'tesla',
      model: 's',
      color: 'silver',

  }, {

      make: 'toyota',
      model: 'tundra',
      color: 'charcoal',

  }],
}
