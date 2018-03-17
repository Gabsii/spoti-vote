function ScrollTo(name) {
	ScrollToResolver(document.getElementById(name));
}

function ScrollToResolver(elem) {
	var jump = parseInt(elem.getBoundingClientRect().top * .2);
	document.body.scrollTop += jump;
	document.documentElement.scrollTop += jump;
	if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
		elem.lastjump = Math.abs(jump);
		setTimeout(function() {
			ScrollToResolver(elem);
		}, "100");
	} else {
		elem.lastjump = null;
	}
}
