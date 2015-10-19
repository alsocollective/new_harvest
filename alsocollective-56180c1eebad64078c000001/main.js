// D3 Stuff, will need to look back at this...
function d3_top_area_thing(fill_colour, stroke_colour) {
	/* https://github.com/d3/d3-timer Copyright 2015 Mike Bostock */
	/* original code from http://bl.ocks.org/mbostock/280d83080497c8c13152 */
	"undefined" == typeof requestAnimationFrame && (requestAnimationFrame = "undefined" != typeof window && (window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame) || function(e) {
		return setTimeout(e, 17)
	}),
	function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(e.timer = {})
	}(this, function(e) {
		"use strict";

		function n() {
			r = m = 0, c = 1 / 0, t(u())
		}

		function t(e) {
			if (!r) {
				var t = e - Date.now();
				t > 24 ? c > e && (m && clearTimeout(m), m = setTimeout(n, t), c = e) : (m && (m = clearTimeout(m), c = 1 / 0), r = requestAnimationFrame(n))
			}
		}

		function i(e, n, i) {
			i = null == i ? Date.now() : +i, null != n && (i += +n);
			var o = {
				callback: e,
				time: i,
				flush: !1,
				next: null
			};
			a ? a.next = o : f = o, a = o, t(i)
		}

		function o(e, n, t) {
			t = null == t ? Date.now() : +t, null != n && (t += +n), l.callback = e, l.time = t
		}

		function u(e) {
			e = null == e ? Date.now() : +e;
			var n = l;
			for (l = f; l;) e >= l.time && (l.flush = l.callback(e - l.time, e)), l = l.next;
			l = n, e = 1 / 0;
			for (var t, i = f; i;) i.flush ? i = t ? t.next = i.next : f = i.next : (i.time < e && (e = i.time), i = (t = i).next);
			return a = t, e
		}
		var a, m, r, f, l, c = 1 / 0;
		e.timer = i, e.timerReplace = o, e.timerFlush = u
	});

	var canvas = document.querySelector("#node_top_visual"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		radius = 2.5,
		minDistance = 60,
		maxDistance = 80,
		minDistance2 = minDistance * minDistance,
		maxDistance2 = maxDistance * maxDistance;

	var tau = 2 * Math.PI,
		n = 50,
		particles = new Array(n);

	for (var i = 0; i < n; ++i) {
		particles[i] = {
			x: Math.random() * width,
			y: Math.random() * height,
			vx: 0,
			vy: 0
		};
	}

	timer.timer(function(elapsed) {
		context.save();
		context.clearRect(0, 0, width, height);

		for (var i = 0; i < n; ++i) {
			var p = particles[i];
			p.x += p.vx;
			if (p.x < -maxDistance) p.x += width + maxDistance * 2;
			else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
			p.y += p.vy;
			if (p.y < -maxDistance) p.y += height + maxDistance * 2;
			else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
			p.vx += 0.2 * (Math.random() - .5) - 0.01 * p.vx;
			p.vy += 0.2 * (Math.random() - .5) - 0.01 * p.vy;
			context.beginPath();
			context.arc(p.x, p.y, radius, 0, tau);
			context.fillStyle = fill_colour;
			context.fill();
		}

		for (var i = 0; i < n; ++i) {
			for (var j = i + 1; j < n; ++j) {
				var pi = particles[i],
					pj = particles[j],
					dx = pi.x - pj.x,
					dy = pi.y - pj.y,
					d2 = dx * dx + dy * dy;
				if (d2 < maxDistance2) {
					context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
					context.beginPath();
					context.moveTo(pi.x, pi.y);
					context.lineTo(pj.x, pj.y);
					context.strokeStyle = stroke_colour;
					context.stroke();
				}
			}
		}

		context.restore();
	});
}


var app = {
	init: function() {
		app.nav.init();
		app.waypoints.init();
		app.top_viz.init();
	}
}

app.nav = {
	init: function() {
		app.nav.mobile.init();
		app.nav.waypoint.init();
	},
	mobile: {
		last_location: 0,
		accel: 0,
		target: null,
		height: 0,
		init: function() {
			$("#nav-pulldown button").click(app.nav.mobile.clicked)
				.on("touchstart", app.nav.mobile.touchstart)
				.on("touchmove", app.nav.mobile.touchmove)
				.on("touchend", app.nav.mobile.touchend);
		},
		clicked: function(event) {
			// $(".side-menu").toggleClass("open");
			var target = $(".side-menu");
			if (target.hasClass("open")) {
				target.removeClass("open")
					.css("top", "0%")
					.animate({
						top: "-100%"
					}, 1000, function() {
						target.css("top", "")
					});

			} else {
				target.animate({
					top: "0%"
				}, 1000, function() {
					target.css("top", "")
						.addClass("open");
				});
			}
		},
		touchstart: function(event) {
			event.preventDefault();
			app.nav.mobile.target = $(".side-menu");
			app.nav.mobile.height = app.nav.mobile.target.height();
			return false;
		},
		touchmove: function(event) {
			event.preventDefault();
			var touched = event["originalEvent"]["targetTouches"]["0"],
				h = app.nav.mobile.height,
				touch_loc = touched["clientY"] - h;
			app.nav.mobile.accel = app.nav.mobile.last_location - touch_loc;
			app.nav.mobile.last_location = touch_loc;
			if (touched["clientY"] - h < 0 && touched["clientY"] - h > -h) {
				app.nav.mobile.target.css("top", touch_loc);
			}
			return false;
		},
		touchend: function(event) {
			event.preventDefault();
			var target = $(".side-menu").removeClass("open closed");
			if (app.nav.mobile.accel <= 0) {
				app.nav.mobile.target.animate({
					top: "0%"
				}, 1000, function() {
					app.nav.mobile.target.css("top", "")
					target.addClass("open");
				});
				app.nav.mobile.accel = 1;
			} else {
				app.nav.mobile.target.animate({
					top: "-100%"
				}, 1000, function() {
					app.nav.mobile.target.css("top", "")
				});
				app.nav.mobile.accel = -1;
			}

			return false;
		}


	},
	waypoint: {
		init: function() {
			$(".nav a[href^='#']").click(app.nav.waypoint.handler);
		},
		handler: function(event) {
			console.log(".side-body #" + this.href.split("#").pop());
			var target = $(".side-body #" + this.href.split("#").pop());
			if (target.length) {
				$(".scrowled_on_to_section").removeClass("scrowled_on_to_section");
				$(this).addClass("scrowled_on_to_section");
			}
		}
	}
}

app.waypoints = {
	init: function() {
		$("#content div[id]").waypoint({
			handler: app.waypoints.handler
		})
		$("#content div[id]").waypoint({
			handler: app.waypoints.handler,
			offset: '70%'
		})
		$("#content div[id]").waypoint({
			handler: app.waypoints.handler_top,
			offset: '100%'
		})

	},
	handler_top: function(direction) {
		var target = $("a[href='#" + this.element.id + "']");
		if (direction == "up", target.length) {
			target.removeClass("scrowled_on_to_section");
		}
	},
	handler: function(direction) {
		var target = $("a[href='#" + this.element.id + "']");
		if (target.length) {
			$(".scrowled_on_to_section").removeClass("scrowled_on_to_section");
			target.addClass("scrowled_on_to_section");
		}
	},
}

app.top_viz = {
	init: function() {
		app.top_viz.resize();
		$(window).resize(app.top_viz.resize);
		// $("#node_top_visual").attr({
		// 	"width": $(target[0].parentNode).outerWidth(),
		// 	"height": target.outerHeight()
		// });
		// d3_top_area_thing("#FF0000", "#0000FF");
	},
	resize: function() {
		var target = $(".side-body .headline");

		$("#node_top_visual").attr({
			"width": $(target[0].parentNode).outerWidth(),
			"height": target.outerHeight()
		});
		d3_top_area_thing("#FF0000", "#0000FF");
	}
}

$(document).ready(function() {
	app.init();
	console.log("APP.init ran");
});