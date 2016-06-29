/*
GOALS FOR PIZZA UNICORN

2.  Orders contain one or many Pizzas

3.  Pizzas have one or many Items

4.  PU has many Delivery People

5.  Orders get assigned to a Random Delivery Person
*/

// *********** Initialize ***********

var pageAddCustomer = $('#page-add-customer');
var pageAddPizza = $('#page-add-pizza');
var pageCart = $('#page-cart');
var pageReceipt = $('#page-receipt');
var buttonCustomer = $('#btn-add-customer');
var buttonPizza = $('#btn-add-pizza');
var buttonCart = $('#btn-add-cart');
var linkAddMorePizzas = $('#add-more-pizzas');

var firstName = $('#firstName');
var lastName = $('#lastName');
var email = $('#email');
var state = $('#state');
var zip = $('#zip');
var pizzaDropdown = $('#pizza-dropdown');
var pizzaSizeList = $('#pizza-size-list');
var toppingList = $('#topping-list');
var pizzaForm = $('#pizza-form');
var cartDisplay = $('#cart-display');
var navLinks = $('.nav-link');

var customer = {};
var order = {};
var pizza = {};

// *********** Create Customer Page ***********
pageAddCustomer.css('display','block');
var currentPage = pageAddCustomer;

buttonCustomer.on( 'click', function() {
  var customer = new Customer(firstName.val(), lastName.val(), email.val(), state.val(), zip.val());
  order = new Order(customer);

  loadPizzaOptions();

  console.log('');
  console.log('------ Customer Order Created! ------');
  console.log(customer);
  console.log(order);

  navigate(currentPage, pageAddPizza);
});

// *********** Add Pizzas Page ***********
buttonPizza.on( 'click', function() {
  pizza = new Pizza();
  var pizzaSize = new PizzaSize(pizzaDropdown.data('name'), parseFloat(pizzaDropdown.data('cost')));
  pizza.setSize(pizzaSize);

  pizzaForm.find("input:checked").each(function () {
    var topping = new Topping($(this).data('name'), parseFloat($(this).data('cost')));
    pizza.addTopping(topping);
  });

  order.addPizza(pizza);

  console.log('');
  console.log('------ Pizza Added! ------');
  console.log(order.pizzas);

  navigate(currentPage, pageCart);

  showCart();
});

var loadPizzaOptions = function() {
  var caretText = ' <span class="caret"></span>';
  pizzaDropdown.html("Select a Pizza" + caretText);
  delete pizzaDropdown.attr('data-name');
  delete pizzaDropdown.attr('data-cost');
  pizzaSizeList.html('');
  toppingList.html('');

  $.each(allPizzaSizes, function () {
    var listItemLink = $('<a></a>');
    listItemLink.attr('href', '#');
    listItemLink.attr('data-name', this.name);
    listItemLink.attr('data-cost', this.cost);
    listItemLink.html(this.name);

    listItemLink.on( 'click', function() {
      pizzaDropdown.html(listItemLink.html() + caretText);
      pizzaDropdown.data('name', listItemLink.data('name'));
      pizzaDropdown.data('cost', listItemLink.data('cost'));
    });

    var listItem = $('<li></li>');
    listItem.append(listItemLink);
    pizzaSizeList.append(listItem);
  });

  $.each(allToppings, function () {
    var toppingDiv = $('<div></div>');
    var toppingLabel = $('<label></label>');
    var toppingInput = $('<input></input>');

    toppingDiv.addClass('checkbox');
    toppingInput.attr('type', 'checkbox');
    toppingInput.attr('data-name', this.name);
    toppingInput.attr('data-cost', this.cost);

    toppingLabel.append(toppingInput);
    toppingLabel.append(this.name);
    toppingDiv.append(toppingLabel);
    toppingList.append(toppingDiv);
  });

}

// *********** Show Cart Page ***********
buttonCart.on( 'click', function() {
  var deliveryPerson = deliveryPeople[ Math.floor(Math.random() * deliveryPeople.length) ];
  order.addDeliveryPerson(deliveryPerson);

  console.log('');
  console.log('------ Order Complete! ------');
  console.log(customer);
  console.log(order);

  navigate(currentPage, pageReceipt);
});

linkAddMorePizzas.on( 'click', function() {
  loadPizzaOptions();
  navigate(currentPage, pageAddPizza);
});

var showCart = function() {

  cartDisplay.html('');

  for (i = 0; i < order.pizzas.length; i++) {
    var pizza = order.pizzas[i];
    var pizzaDisplay = $('<p></p>');
    pizzaDisplay.html(pizza.size.name + ': $' + pizza.size.cost.toFixed(2));
    var toppingListDisplay = $('<ul></ul>');

    for (x = 0; x < pizza.toppings.length; x++) {
      var toppingItem = $('<li></li>');
      var thisTopping = pizza.toppings[x];
      toppingItem.html(thisTopping.name + ': $' + thisTopping.cost.toFixed(2));
      toppingListDisplay.append(toppingItem);
    }

    pizzaDisplay.append(toppingListDisplay);
    var pizzaTotal = $('<p>Pizza Total: $' + pizza.totalCost.toFixed(2) + '</p>')
    pizzaDisplay.append(pizzaTotal);


    cartDisplay.append(pizzaDisplay);
  }

  var orderTotal = $('<p></p>');
  orderTotal.html('Order Total: $' + order.totalCost.toFixed(2));
  cartDisplay.append(orderTotal);
}

// *********** Navigation ***********
var navigate = function(pageFrom, pageTo) {
  pageFrom.css('display', 'none');
  currentPage = pageTo;
  currentPage.css('display', 'block');
}

// Nav links
navLinks.on( 'click', function() {
  switch (this.id) {
    case 'link-customer':
    navigate(currentPage, pageAddCustomer);
    break;

    case 'link-pizza':
    navigate(currentPage, pageAddPizza);
    break;

    case 'link-cart':
    navigate(currentPage, pageCart);
    break;

    case 'link-receipt':
    navigate(currentPage, pageReceipt);
    break;

    default:
    console.log('404');
  }
});

// *********** App Objects ***********

var Customer = ( function() {
  var incrementedId = 1;

  return function Customer(firstName, lastName, email, state, zip) {
    this.id = incrementedId++,
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.state = state,
    this.zip = zip
  }

} )();

var Order = ( function(customer) {
  var incrementedId = 10001;

  return function Order(customer) {
    this.id = incrementedId++,
    this.customerId = customer.id,
    this.deliveryPerson = {},
    this.pizzas = [],
    this.totalCost = 0,
    this.addPizza = function(pizza) {
      this.pizzas.push(pizza);
      this.totalCost += pizza.totalCost;
    },
    this.addDeliveryPerson = function(deliveryPerson) {
      this.deliveryPerson = deliveryPerson;
    }
  }
} )();

var Pizza = function() {
  this.toppings = [],
  this.totalCost = 0,
  this.size = {},
  this.setSize = function(size) {
    this.size = size;
    this.totalCost += parseInt(size.cost)
  }
  this.addTopping = function(topping){
    this.toppings.push(topping);
    this.totalCost += parseFloat(topping.cost);
  }
}

var Topping = function(name, cost) {
  this.name = name,
  this.cost = cost
}

var PizzaSize = function(name, cost) {
  this.name = name,
  this.cost = parseFloat(cost)
}

/*
PizzaSize.prototype.changeName = function(newName) {
  this.name = newName;
}

PizzaSize.prototype.changeCost = function(newName) {
  this.name = newName;
}

PizzaSize.prototype.getName = function() {
  alert(this.name);
}
*/

var DeliveryPerson = function(name, phone, car) {
  this.name = name,
  this.phone = phone,
  this.car = car
}
