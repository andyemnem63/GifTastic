$(document).ready(function(){
/*Global Variables
==============================================================*/
var topics = ['skate','dogs','animals','music',
			  'anime','food','cats','video games', 
			  'rpg', 'florida','pittsburgh',
			  'philadelphia','beer', 'funny','politics','elon musk',
			  'space','programming', 'computers', 'web development',
			  'coding', 'front-end','back-end','history'];
var stillImgUrl = '';
var animateImgUrl = '';
var gifCondition = '';
var stillUrl = '';
var animateUrl = '';
/*Functions
==============================================================*/
var createBtn = function(){
	//removes all elements within the btn-section
	$('#btn-section').empty();
	//Create buttons based on elements in array
	for(var i = 0; i < topics.length; i++){
		//Creates new buttons
		var newBtn = $('<button>');
		//Give button an attribute // COME BACK TO THIS*********
		newBtn.attr('data-name',topics[i]);
		//Add class to button
		newBtn.attr('class', 'gif btn-success');
		//Give button name that reflext array
		newBtn.text(topics[i]);
		//Add button to DOM
		$('#btn-section').append(newBtn);
	}
}

var submit = function(){
	 //When submit button is clicked .............
	 $('#submit-btn').on('click',function(event){
	 	//Prevent from the default form/input events from occuring //***** COME BACK TO THIS
	 	event.preventDefault();
	 	//Get input text value
	 	var inputVal = $('#userInput').val();
	 	//push user input to array
	 	topics.push(inputVal);
	 	//Create new buttons
	 	createBtn();
	 	//Testing
	 	console.log(inputVal);
	 	console.log(topics);

	 });
}
var displayGif = function(){
	//Gets the value of the button that is clicked
	var btnVal = $(this).data('name');
	//Api URL and key 
	var apiKey = 'dc6zaTOxFJmzC';
	var apiUrl = 'https://api.giphy.com/v1/gifs/search?q='+ btnVal +'&api_key=' + apiKey;
		$.ajax({
		url: apiUrl,
		method: 'GET'
	}).done(function(response){
	//removes images when new btn is clicked
	$('.gifSection').empty();

	for(var i = 0;i < 10; i++){
	//Still & Animated Images
	stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
	animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
	//Assign image element to newImg variable
	var newImg = $('<img>');
	//Give img element stillImgUrl, animated  & src attribute
	newImg.attr('data-still',stillImgUrl);
	newImg.attr('data-animate',animateImgUrl);
	newImg.attr('src',stillImgUrl);
	newImg.attr('data-type','still');
	newImg.addClass('gifImage');
	//Adds Images to DOM
	$('.gifSection').append(newImg); 
	}
	//Testing
	console.log('The button value is = ' + btnVal);
	console.log('Still image Url = ' + stillImgUrl);
	console.log('Animated image Url = ' + animateImgUrl);
	});
}
var gifAnimate = function(){
	//sets gifCondition to either still or animate
	gifCondition = $(this).data('type');
	stillUrl = $(this).data('still');
	animateUrl = $(this).data('animate');
	if(gifCondition === 'still'){
		//Changes the gif to an animated image by switching the URL
		$(this).attr('src',animateUrl);
		//Switch the data-type to animate
		$(this).data('type','animate');
		//Testing
		console.log(gifCondition);
	}
	else if(gifCondition === 'animate'){	
		//Change src to still
		$(this).attr('src',stillUrl);
		//Switch the data-type to still
		$(this).data('type','still');
		//Testing
		console.log(gifCondition); 
	}
}

/*Main
==============================================================*/
createBtn();
submit();
$(document).on('click','.gif',displayGif);
$(document).on('click','.gifImage',gifAnimate);





});
