var slideIndex = 1;

function matchHeights(){
  
  //reset all heights to auto
  $(".col").height("auto")
  
  //set all the heights on the images to the same (max size)
  var heights = $(".col").map(function ()
    {
        return $(this).height();
    }).get();

	var maxHeight = Math.max.apply(null, heights);
	
	$(".col").height(maxHeight)
}
function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}

const tHandler = debounced(100, matchHeights);

$(document).ready(function(){
  
  window.addEventListener('resize', tHandler);
  matchHeights();
  
  //click for home_hub image
  $("#home_hub_box").click(function(){
    expand("#home_hub_pd")
  });
  
  //click for canvas image
  $("#canvas_box").click(function(){
    expand("#canvas_pd");
  });
  
  //click for digit classifier image
  $("#digit_classifier_box").click(function(){
    expand("#digit_classifier_pd");
  });
  
  //click for retirement calculator image
  $("#retirement_box").click(function(){
    expand("#retirement_pd");
  });
  
  //click for CV Robot image
  $("#CV_Robot_box").click(function(){
    expand("#CV_Robot_pd");
  });
  
  //click for GS IoT image
  $("#IoT_GS_box").click(function(){
    //show the descriptor if it is hidden
    expand("#IoT_GS_pd");
  });
  
  //displays the correct images
  updateImages();
});


function updateImages(className=null){
	if (className==null){
		className = "project_images"
	}
	var x = document.getElementsByClassName(className);
  
	const set1 = new Set();
	//add all element class names to the set
	for(var i = 0; i<x.length; i++){
		set1.add(x[i].className)
	}
	var iterator1 = set1.values();
	var className = iterator1.next().value;
	
	//while the className is defined, run showImage on that className
	while(className != undefined){
		console.log(className);
		showImage(slideIndex, className);
		className = iterator1.next().value;
	}
}


function plusImage(n, className) {
  slideIndex += n ;
  updateImages(className);
}


/*
Function to handle showing a single image when in expanded view
*/
function showImage(n, classname) {
  var i;
  var x = document.getElementsByClassName(classname);
  //wrap over
  if (n > x.length) {
  	slideIndex = 1
  }
  //wrap under
  if (n < 1) {
  	slideIndex = x.length
  }
  //hide everything but the current
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "inline";  
}

/*
expands the correct project descriptor
Pass in the string referring to the project descriptor ID
*/
function expand(element){
	closeallpd();
	$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
	if ($(element).is(":hidden")){
    	$(element).slideDown();
    	/*$('html, body').animate({
        scrollTop: $(".project-descriptor").offset().top
    }, 1000);*/
    slideIndex=1;
    updateImages();
    }
}

function closeallpd(){
	$(".project-descriptor").slideUp();
	$("iframe").each(function() { 
        var src= $(this).attr('src');
        $(this).attr('src',src);  
});
}
