var currentBox = "";
var currentCat = "";
var widths = new Object();
var heights = new Object();
var cats = ["about", "work", "contact"];

// save width and height of each div (before they're resized)
window.onload = function() {
	for (var i = 0; i < cats.length; i++) {
		widths[cats[i]] = parseFloat($("#box_" + cats[i]).css("width")) + 30;
		heights[cats[i]] = parseFloat($("#box_" + cats[i]).css("height"));
	}
};

function openBox(category) {	
	var newBox = $("#box_" + category);
	
	// if no boxes are open
	if ($("#magicWrap").css("width") == "10px") {
		currentBox = newBox;
		currentCat = category;
		$(currentBox).css("height", "0");
		moveLine(true);
	} 
	// else if there is a box open
	else {
		// if user has clicked the same cat as is open
		if (newBox.toString() == currentBox.toString())
			boxExpand(false);
		else {

		}
	}
}

// extend line across screen
function moveLine(open) {
	if (open) {
		var newWidth = window.innerWidth - 160 - widths[currentCat];
		$("#magicWrap").css("width", newWidth);
		setTimeout(function(){ boxFade(true); }, 400);
	} else {
		$("#magicWrap").css("width", "10px");
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