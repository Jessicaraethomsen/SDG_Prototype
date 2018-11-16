$(document).ready(function() {
	
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	/*smooth scroll*/
	$('a.first-point').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
    $('a.second-point').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#second-point').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.third-point').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#third-point').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.fourth-point').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#fourth-point').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });

	$('a.fifth-point').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#fifth-point').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });

    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-bg1').css('top',(0-(scrolled*.25))+'px');
	$('#parallax-bg2').css('top',(0-(scrolled*.5))+'px');
	$('#parallax-bg3').css('top',(0-(scrolled*.75))+'px');

}



	/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#second-point').offset().top - (($('#third-point').offset().top - $('#second-point').offset().top) / 2);
	var section3Top =  $('#third-point').offset().top - (($('#fourth-point').offset().top - $('#third-point').offset().top) / 2);
	var section4Top =  $('#fourth-point').offset().top - (($('#fifth-point').offset().top - $('#fifth-point').offset().top) / 2);
	var section5Top =  $('#fifth-point').offset().top - (($(document).height() - $('#fifth-point').offset().top) / 2);;
	
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.first-point').addClass('active');

	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.second-point').addClass('active');

	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.third-point').addClass('active');

	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		$('nav#primary a.fourth-point').addClass('active');

	} else if ($(document).scrollTop() >= section5Top){
		$('nav#primary a.fifth-point').addClass('active');
	}
	
}
