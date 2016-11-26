var currentBox = "";
var currentCat = "";
var changeOfCat = false;
var newCat = "";
var widths = new Object();
var heights = new Object();
var cats = ["about", "work", "contact"];
var currentBack = 0;
var backCount = 4;

// save width and height of each div (before setting height to 0)
window.onload = function() {
	for (var i = 0; i < cats.length; i++) {
		widths[cats[i]] = parseFloat($("#box_" + cats[i]).css("width")) + 30;
		heights[cats[i]] = parseFloat($("#box_" + cats[i]).css("height"));
		$("#box_" + cats[i]).css("height", 0);
	}
};

// resize magic wrap if open
$(window).resize(function() {
	if ($("#magicWrap").css("width") > "10px") {
		$("#magicWrap").css("width", (window.innerWidth - 160 - widths[currentCat]))
	}
})

function openBox(category) {	
	// if no boxes are open
	if ($("#magicWrap").css("width") == "10px") {
		currentBox = $("#box_" + category);
		currentCat = category;
		$(currentBox).css("height", "0");
		moveLine(true);
	} 
	// else if there is a box open
	else {
		// if user has clicked the same cat as is open, close line
		if (category == currentCat) {
			boxExpand(false);
		} else {
			changeOfCat = true;
			newCat = category;
			currentCat = category;
			boxExpand(false);
		}
	}
}

// extend line across screen
function moveLine(open) {
	if (open) {
		$("#magicWrap").css("width", (window.innerWidth - 160 - widths[currentCat]));
		setTimeout(function(){ boxFade(true); }, 350);
	} else {
		if (changeOfCat) {
			$("#magicWrap").css("width", (window.innerWidth - 160 - widths[currentCat]));
			currentBox = $("#box_" + newCat);
			setTimeout(function(){ boxFade(true); }, 350);
			changeOfCat = false;
		} else {
			$("#magicWrap").css("width", "10px");
		}
	}
}

// fade new box
function boxFade(open) {
	if (open) {
		$(currentBox).css("opacity", "1");
		setTimeout(function(){ boxExpand(true); }, 10);
	} else {
		$(currentBox).css("opacity", "0");
		setTimeout(function(){ moveLine(false); }, 0);
	}
}

// expand new box vertically
function boxExpand(open) {
	if (open) {
		$(currentBox).css("height", heights[currentCat]);
	} else {
		$(currentBox).css("height", 0);
		setTimeout(function(){ boxFade(false); }, 250);
	}
}

// change background
function changeBack(dir) {
	if (dir == 0)
		var newBack = modulo((currentBack - 1), backCount);
	else
		var newBack = (currentBack + 1) % backCount;
	currentBack = newBack;
	$("#canvas").css("backgroundImage", "url('pic" + newBack + ".jpg')");
}

// modulo for negative numbers (JS % is a remainder function)
function modulo(num, mod) {
	return ((num % mod) + mod) % mod;
}