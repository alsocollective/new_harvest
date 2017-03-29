var NH2017 = {
	init: function() {
		skrollr.init({
			forceHeight: false
		});

		NH2017.modal.init();
		NH2017.speakers.init();
	}
}

NH2017.modal = {
	init: function() {
		// $(".nh2017_load_into_modal").click(NH2017.modal.click);
		$("#nh2017_modal_close").click(NH2017.modal.close);
	},
	click: function(event) {
		event.preventDefault();
		// if (this.href) {
		// 	console.log(this.href)
		// 	var target = $(this).data("target");
		// 	if (target) {
		// 		$("#nh2017_modal").load(this.href + " " + target, NH2017.modal.post_load);
		// 	};

		// };
		return false;
	},
	post_load: function(event) {
		// $("html").addClass("nh2017_modal_active")
	},
	close: function(event) {
		event.preventDefault();
		$("html,#nh2017_speakers_modal").removeClass("nh2017_modal_active");
		return false;
	}
}

NH2017.speakers = {
	init: function() {
		$("#nh2017_speaker_slides").slick({
			arrows: true,
			dots: false,
			prevArrow: '<div class="arrow_svg_prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" viewBox="0 0 31.8 12.3" enable-background="new 0 0 31.8 12.3" xml:space="preserve"><polyline fill="none" stroke-miterlimit="10" points="0.9,1.5 15.9,10.3 30.9,1.6 "></polyline></svg></div>',
			nextArrow: '<div class="arrow_svg_next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" viewBox="0 0 31.8 12.3" enable-background="new 0 0 31.8 12.3" xml:space="preserve"><polyline fill="none" stroke-miterlimit="10" points="0.9,1.5 15.9,10.3 30.9,1.6 "></polyline></svg></div>'
		})
		$(".nh2017_select_show").click(NH2017.speakers.click);
	},
	click: function(event) {
		event.preventDefault();
		var target = $(this).data("target");
		console.log(target);
		$("#nh2017_speaker_slides").slick("slickGoTo", target);
		$("html,#nh2017_speakers_modal").addClass("nh2017_modal_active");
		return false;
	}
}



NH2017.init();