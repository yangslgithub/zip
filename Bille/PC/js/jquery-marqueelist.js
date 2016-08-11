/*!
 * marqueeList - jQuery Plugin
 * @requires jQuery v1.6 or later
 *
 *
 * Copyright Bille.Feng
 *
 */
(function($){
	
	$.fn.marqueelist = function(settings)
	{
		var $this = this;
		$this.each(function(id,elem){
			var $marquee = $(this).find('ul:eq(0)');
			var i = 0;
		
			if ($marquee.find('li').length > 5) {
				setInterval(function() {
					if (i < -30) {
						$marquee.find("li:first").appendTo($marquee);
						i = 0;
					}
					$marquee.css('margin-top', function() {
						return --i;
					});
				}, 50);
			}
			
		});
	}
	
	
})(jQuery);