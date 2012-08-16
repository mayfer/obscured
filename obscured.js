
function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return {x: xScroll, y: yScroll}
}

$(document).ready(function(){
	$("<style type='text/css'> canvas#obscure-canvas { background: fixed; position: fixed; top: 0; left: 0; } </style>").appendTo("head");
	canvas_elem = $("<canvas id='obscure-canvas'>").appendTo('body').css('pointer-events', 'none');
	canvas_elem.height($(window).height());
	canvas_elem.width($(window).width());


	var canvas = document.getElementById('obscure-canvas');
	if (canvas.getContext){
		var context = canvas.getContext('2d');
		var width = canvas_elem.innerWidth();
		var height = canvas_elem.innerHeight();
		context.canvas.width = width;
		context.canvas.height = height;

		$(window).bind("resize", function(){
			width = $(window).width();
			height = $(window).height();

			canvas_elem.height(height);
			canvas_elem.width(width); 
			context.canvas.width = width;
			context.canvas.height = height;
		});

		context.filStyle = 'black';
		context.fillRect(0, 0, width, height);

		var radius = 100;
		$(canvas_elem).parent().bind('mousemove', function(e){
			scroll = getPageScroll();
			var relX = e.pageX - scroll.x;
			var relY = e.pageY - scroll.y;

			context.fillRect(0, 0, width, height);
			context.save();
			context.beginPath();
			context.arc(relX, relY, radius, 0, 2 * Math.PI, true);
			context.clip();
			context.clearRect(0, 0, width, height);
			context.restore();
		});
	} else {
		// canvas-unsupported code here
	}
});
