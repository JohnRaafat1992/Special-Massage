// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

	document.documentElement.style.setProperty('--main--color',mainColors);

// remove active class from all children 
document.querySelectorAll(".colors-list li").forEach(Element => {

Element.classList.remove("active");

// add active class on element with data-color === local storage item
if(Element.dataset.color === mainColors) {

	// add active class 
	Element.classList.add("active");
}

});

}

// random background option
let backgroundOption = true;

// variable to control the interval 
let backgroundIterval;

// check if there is item in random background local storage 
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background is not empty
if(backgroundLocalItem !== null) {

	if(backgroundLocalItem === 'true') {

		backgroundOption = true ;


	} else {
		backgroundOption = false ;

		
	}

// remove active class from all spans 
document.querySelectorAll(".random-backgrounds span").forEach(Element => {

	Element.classList.remove("active");

});

if (backgroundLocalItem === 'true') {

document.querySelector(".random-backgrounds .no").classList.add("active");

} else {

document.querySelector(".random-backgrounds .yes").classList.add("active");

}
}

// toggle spin class on icon
document.querySelector(".toggle-setting .fa-cog").onclick =function () {
	// toggle class new class for rotation the icon 
	this.classList.toggle("fa-spin");
	// toggle class open on main setting box
	document.querySelector(".setting-box").classList.toggle("open");
};

// switch colors 
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all list items 
colorsLi.forEach(li => {

// click on every list items
li.addEventListener("click", (e) => {

// set color on root
document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

// set color on local storage
localStorage.setItem("color_option", e.target.dataset.color);

handelActive(e);

});

});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randomBackEl.forEach(span => {

// click on every span
span.addEventListener("click", (e) => {

handelActive(e);

if (e.target.dataset.background === 'no') {

	backgroundOption = true;
	randomizeImas(); 
	localStorage.setItem("background_option", true);

} else {

	backgroundOption = false;

	clearInterval(backgroundIterval);

	localStorage.setItem("background_option", false);

}

});

});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imges
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg"];



// function to randomize imgs 
function randomizeImas(){

	if(backgroundOption === true) {

	backgroundIterval = setInterval(() => {

	// get random number
	let randomNumber = Math.floor(Math.random() * imgsArray.length);

	// change background images url
	landingPage.style.backgroundImage = 'url("Images/' + imgsArray[randomNumber] + ' ")';

},2000);

}

}
randomizeImas();

// create popup with image
let ourGallery = document.querySelectorAll(".gallary img");

// doing loop for images 
ourGallery.forEach(img => {

	img.addEventListener('click', (e) => {

// create overlay element 
let overlay = document.createElement("div");

// add class to overlay
overlay.className = 'popup-overlay';

// append overlay to the body
document.body.appendChild(overlay);

// create the popup box
let popupBox = document.createElement("div");

// create class to popup box
popupBox.className = 'popup-box';

// create image 
let popupImage = document.createElement("img");

// set image source
popupImage.src = img.src;

// add image to popup box
popupBox.appendChild(popupImage);

// add popup box to body
document.body.appendChild(popupBox);

if (img.alt !== null) {

// create heading
let imgHeading = document.createElement("h3") ;

// creatge text for hrading
let imgText = document.createTextNode(img.alt);

// append the text to heading 
imgHeading.appendChild(imgText);

// append the heading to popup box
popupBox.appendChild(imgHeading);

// create the close span
let closeButton = document.createElement("span");

// create the text for close button 
let closeButtonText = document.createTextNode("X");

// append text to close span
closeButton.appendChild(closeButtonText);

//add class to close button
closeButton.className = 'close-button';

// append span to the popup box 
popupBox.appendChild(closeButton);
}

	});
});

// close popup
document.addEventListener("click", function (e) {

if (e.target.className == 'close-button') {

	// remove the current popup
	e.target.parentNode.remove();

	// remove overlay
	document.querySelector(".popup-overlay").remove();

}
});
// start slide
// get slider items - array from [ es6 feature ] 
let sliderImages = Array.from (document.querySelectorAll('.slider-container img'));

// get numbers of slider
let slidesCount = sliderImages.length;

// set current slide
let currentSlide = 1;

//slide number element
let slidNumberElement = document.getElementById('slide-number');

// previous and next buttons 
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');

// handel click on previous and next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// creat the main ul element
let paginationElement = document.createElement('ul');

// set id on created ul element 
paginationElement.setAttribute('id', 'pagination-ul');

// creat list items based on slides count 
for (let i = 1; i <= slidesCount; i++) {

// creat the li 
let paginationItem = document.createElement('li');

// set custom attribute 
paginationItem.setAttribute('data-index', i);

// set item content 
paginationItem.appendChild(document.createTextNode(i));

// add items to the main ul 
paginationElement.appendChild(paginationItem);
}

// add the created ul element to the page 
document.getElementById('indicators').appendChild(paginationElement);

//get the new created ul 
var paginationCreatedUL = document.getElementById('pagination-ul');

// get pagination items - array from [ es6 feature ] 
var paginationBullets = Array.from (document.querySelectorAll('#pagination-ul li'));

	for (var i = 0; i < paginationBullets.length; i++) {

        paginationBullets[i].onclick= function() {

        currentSlide = parseInt(this.getAttribute('data-index'));

        theChecker();
}
}
// trigger the checker function 
theChecker();

// next slide function 
function nextSlide () {
	if (nextButton.classList.contains('disabled')) {
        // do nothing
        return false;
	} else {
        currentSlide++;
	theChecker();
}
}

// previous slide function 
function prevSlide () {
	if (prevButton.classList.contains('disabled')) {
        // do nothing
        return false;
	} else {
        currentSlide--;
	theChecker();
}
}

// create the checker function 
function theChecker() {

    // set the slide number 
	slidNumberElement.textContent = '' + ' ' + (currentSlide) + ' / ' + (slidesCount);

    // remove all active class
	removeAllActive()

    // set active class on current slide
	sliderImages[ currentSlide - 1].classList.add('active')

    // set active class on current pagination item 
	paginationCreatedUL.children[currentSlide - 1].classList.add('active');

    // check if current slide is the first 
	if (currentSlide == 1) {

        // add disabled class on previous button
        prevButton.classList.add('disabled');
	} else {
        // remove disabled class from previous button
        prevButton.classList.remove('disabled');
	}
     // check if current slide is the last
	if (currentSlide == slidesCount) {

        // add disabled class on next button
        nextButton.classList.add('disabled');
	} else {
        // remove disabled class from next button
        nextButton.classList.remove('disabled');
	}
}

// remove all active classes from images and pagination bullets
function removeAllActive() {

    // loop through images
	sliderImages.forEach(function(img) {

        img.classList.remove('active');

	});

    // loop through bullets
	paginationBullets.forEach(function (bullet) {
        bullet.classList.remove('active');
	});
};
//end slide

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
	elements.forEach(ele => {

	ele.addEventListener("click", (e) => {

		e.preventDefault();

		document.querySelector(e.target.dataset.section).scrollIntoView({

			behavior: 'smooth'

	});
	});
});
}

scrollToSection(allBullets);
scrollToSection(allLinks);

function handelActive(ev) {

	// remove active class from all children 
ev.target.parentElement.querySelectorAll(".active").forEach(element => {

	element.classList.remove("active");
});

// add active class on self 
ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

	bulletsSpan.forEach(span => {

	span.classList.remove("active");

	});

	if (bulletLocalItem === 'block') {

		bulletsContainer.style.display = 'block';

		document.querySelector(".bullets-option .yes").classList.add("active");

	} else {

	bulletsContainer.style.display = 'none';	
	
	document.querySelector(".bullets-option .no").classList.add("active");

	}
}

bulletsSpan.forEach(span => {

	span.addEventListener("click", (e) => {

		if (span.dataset.display === 'show') {

			bulletsContainer.style.display = 'block';

			localStorage.setItem("bullets_option", 'block');
		} else {

		bulletsContainer.style.display = 'none';
		
		localStorage.setItem("bullets_option", 'none');
		}

		handelActive(e);
	});
});

// reset button 
document.querySelector(".reset-options").onclick = function () {

	localStorage.removeItem("color_option");
	localStorage.removeItem("background_option");
	localStorage.removeItem("bullets_option");

	window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {

	// stop propagation
	e.stopPropagation();

	// toggle class menu active to button
	this.classList.toggle("menu-active");

	// toggle class open on links 
	tLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button 
document.addEventListener("click", (e) => {

	if (e.target !== toggleBtn && e.target !== tLinks) {
		
// check if menu is open 
if (tLinks.classList.contains("open")) {

	// toggle class menu active to button
	toggleBtn.classList.toggle("menu-active");

	// toggle class open on links 
	tLinks.classList.toggle("open");// togg
}
	}
});

// stop propagation pn menu
tLinks.onclick = function (e) {

e.stopPropagation();
};