/*!
 * marqueeList - jQuery Plugin
 * @requires jQuery v1.6 or later
 *
 *
 * Copyright Bille.Feng
 *
 */
(function($){
	$.fn.stickyNav = function()
	{
		var $obj = this;
		var pos = $obj.offset().top;
		var scrollHandle = function()
		{
			var scrollTop = $(document).scrollTop();
			if(scrollTop >= pos)
			{
				$obj.addClass("sticky");
			}else{
				$obj.removeClass("sticky");
			}
			$obj.find("a").each(function(i, e) {
				var chapter = $(this).attr("href");
				if(chapter.indexOf("#") > -1){
					if(scrollTop >= $(chapter).offset().top)
					{
						$(this).addClass("choose").siblings().removeClass("choose");
					}
				}
			});
		}
		$(window).bind("scroll",scrollHandle); 
		$(window).trigger("scroll");
	}
})(jQuery);