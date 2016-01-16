jQuery(document).ready( function ($) {
	var page = {
	  w : $(window).width(),
	  h : $(window).height(),
	  c : document.getElementById('circles')
	}

	var circ = {
	  all : 3,
	  base : (page.w * 0.175),
	  setSizePos : function (c) {
	    var base = circ.base * 0.5,
	    		rand = Math.random() * (1.25 - 0.85) + 0.85,
	        size = Math.floor(circ.base * rand),
	        posX = Math.floor(Math.random() * page.w - base),
	        posY = Math.floor(Math.random() * page.h - base),
	        zind = Math.floor(Math.random() * 99);
	    $(c).css({
	      'width' 		: size,
	      'height'		: size,
	      'z-index'		: zind,
	      'transform' : 'translate('+posX+'px,'+posY+'px)'
	    });
	  },
	  doAnimate : function (c) {
	    circ.setPath(c);
	  },
	  setPath : function (c) {
	    var base = circ.base * 0.5,
	    		posX = Math.floor(Math.random() * page.w - base),
	        posY = Math.floor(Math.random() * page.h - base),
	        time = Math.floor(Math.random() * 4000 + 1000),
	        curve = ".05, .02, .47, .95";
	    $(c).transition({
		      x : posX+'px',
		      y : posY+'px'
		    }, 
		    time, 
		    'cubic-bezier('+curve+')', 
		    function (){
		      circ.doAnimate(c);
		    }
		  );
	  },
	  buildSet : function () {
	    for ( var i = 0; i < circ.all; i++ ) {
	      var c = document.createElement('span');
	      if ( Math.random() > 0.6 ) {
	        c.className = "circle red";
	      }
	      else {
	        c.className = "circle black";
	      }
	      c.innerHTML = "<span></span>";
	      page.c.appendChild(c);
	      circ.setSizePos(c);
	      circ.doAnimate(c);
	      c.className += " go";
	      c.onclick = function (e) {
	      	$(this).toggleClass('tag');
	      }
	    }
	  },
	  destroySet : function () {
	    var circs = $('.circle');
	    if ( circ.all >= circs.length ) {
	      btn.doStop();
	    }
	    else {
	      var circSet = circs.slice(0, circ.all); 
	      circSet.removeClass('go');
	      setTimeout( function () {
	        circSet.remove();
	      }, 250);
	    }
	  },
	  destroyAll : function () {
	    var circs = $('.circle');
	    circs.removeClass('go');
	    setTimeout( function () {
	      circs.remove();
	    }, 250);
	  }
	};

	var btn = {
	  start : document.getElementById('start'),
	  stop : document.getElementById('stop'),
	  more : document.getElementById('more'),
	  less : document.getElementById('less'),
	  doStart : function (e) {
	    circ.buildSet();
	    btn.start.setAttribute('disabled', true);
	    btn.stop.removeAttribute('disabled');
	    btn.more.removeAttribute('disabled');
	    btn.less.removeAttribute('disabled');
	  },
	  doStop : function (e) {
	    circ.destroyAll();
	    btn.stop.setAttribute('disabled', true);
	    btn.more.setAttribute('disabled', true);
	    btn.less.setAttribute('disabled', true);
	    btn.start.removeAttribute('disabled');
	  },
	  doMore : function (e) {
	    circ.buildSet();
	  },
	  doLess : function (e) {
	    circ.destroySet();
	  }
	}

	btn.start.onclick = btn.doStart;
	btn.stop.onclick = btn.doStop;
	btn.more.onclick = btn.doMore;
	btn.less.onclick = btn.doLess;
});

// NoSleep library.
// https://github.com/richtr/NoSleep.js
var noSleep = new NoSleep();
function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('touchstart', enableNoSleep, false);
}
document.addEventListener('touchstart', enableNoSleep, false);