$(document).ready(function () {

  // Login and Register Pop Up
  $('#profileIcon').click(function () { 
    window.location.href = "loginPage.html"
  });

  // Catalogue Page
  $('#catalogueButton, #springButton, #fallButton').click(function () { 
    window.location.href = "cataloguePage.html"
  });
  
  // Change Navbar on Scroll
  $(document).scroll(function () {
    var nav = $(".navbar");
    var jumbotron = $(".jumbotron");
    nav.toggleClass('scrolled', $(this).scrollTop() > (jumbotron.height() + 150));
    if($(this).scrollTop() > (jumbotron.height() + 150)){
      $('.underline').removeClass('underline');
    }
	});
	
});

// Auto Smooth Scrolling
$('.page-scroll').on('click', function(e){

	//Get href
	var href = $(this).attr('href');

	//Get element
	var elementHref = $(href);

	//Scroll
	$('html, body').animate({
		scrollTop: (elementHref.offset().top)
	}, 1500, 'easeInOutExpo'
	);

	e.preventDefault();
});