// Home Page
$('#homeButton').click(function () { 
  window.location.href = "home4.html"
});


// Auto Smooth Scrolling
$('.page-scroll').on('click', function(e){

  //Get href
  var href = $(this).attr('href');

  //Get element
  var elementHref = $(href);

  //Scroll
  $('html, body').animate({
    scrollTop: (elementHref.offset().top - 70)
  }, 1500, 'easeInOutExpo'
  );

  e.preventDefault();
});

// Cart Sidebar
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "800px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// Constructor Product
function Product(productID, productName, type, productPrice){
	this.productID = productID;
	this.productName = productName;
	this.type = type;
	this.productPrice = productPrice;
}

// Product Top Cuban Insertion
var product1 = new Product('TS01', 'Black - Cuban Shirt', 'Top', 149000);
var product2 = new Product('TS02', 'Grey - Cuban Shirt', 'Top', 149000);

// Product Top Oxofrd Insertion 
var product3 = new Product('TL01', 'Black - Oxford Shirt', 'Top', 149000);
var product4 = new Product('TL02', 'Grey - Oxford Shirt', 'Top', 199000);
var product5 = new Product('TL03', 'White - Oxford Shirt', 'Top', 199000);

// Product Bottom Short Insertion
var product6 = new Product('BS01', 'Black - Short Cargo', 'Bottom', 129000);
var product7 = new Product('BS02', 'Grey - Short Cargo', 'Bottom', 129000);

// Product Bottom Ankle Insertion
var product8 = new Product('BL01', 'Black - Ankle Trouser', 'Bottom', 179000);
var product9 = new Product('BL02', 'Grey - Ankle Trouser', 'Bottom', 179000);
var product10 = new Product('BL03', 'White - Ankle Trouser', 'Bottom', 179000);

var shoppingCart = (function() {

  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }


  return obj;
})();




$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += 
      "<h5 class='product-name'>" + cartArray[i].name + "</h5>" +
      "<h5 class='single-price'>" + cartArray[i].price + "</h5>" +
      "<button type='button' class='minus-item input-group-addon btn btn-danger' data-name=" + cartArray[i].name + ">-</button>" +
      "<input type='number' class='item-count form-control' data-name=" + cartArray[i].name + " value=" + cartArray[i].count + ">" +
      "<button type='button' class='plus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">+</button>" +
      "<button type='button' class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">x</button>" +
      "<h5 class='result'>= <span>" + cartArray[i].total + "</span></h5>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
  var name = $(this).data('name');
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

function displayInvoice() {
  var productOrdered = shoppingCart.listCart();
  var output = "";
  for(var i in productOrdered) {
    output += 
          '<th scope="row" class="qty">' + cartArray[i].count + '</th>' +
          '<td class="desc">' + cartArray[i].name + '</td>' +
          '<td class="price">' + cartArray[i].price + '</td>' +
          '<td class="border-left">' + cartArray[i].total + '</td>';
  }
  $('#invoiceDisplay').html(output);
  $('.total-table-price').html(shoppingCart.totalCart());
}

var totalCart = shoppingCart.totalCount();

// Check Out
$('#checkOutButton').click(function () { 
  if(totalCart == 0){
    alert('Anda belum memilih barang');
  }
  else if (totalCart => 1){
    window.location.href = "invoicePage.html";
    displayInvoice();
  }
});





