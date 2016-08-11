/*!
 * listSlider - jQuery Plugin
 * @requires jQuery v1.6 or later
 *
 *
 * Copyright Bille.Feng
 *
 */
(function($){
	$.fn.listslider = function(settings)
	{
		settings = jQuery.extend({
			least: 1, //最少触发数量
			range: 1, //滑动数量
			speed: 500, //滑动速度
			next: false, //下一页
			prev: false, //上一页
			timeout: false, //自动播放间隔
			pauseOnHover: true, //鼠标触发暂停播放
			cycle: true,
			effect: 'scrollVert' //滑动方向'scrollVert' or 'scrollHorz'
        },settings);
		
		var $this = this;
		var width = $this.children().outerWidth(true),height = $this.children().outerHeight(true),total,current = 0,interval,mouseHover = false;
		
		switch(settings.effect){
			case 'scrollVert':
				if($this.children().length < settings.least)return;
				total = $this.children().length;
				var slideUp = function(){
					clearTimeout(interval);
					if(settings.next)settings.next.unbind('click');
					
					if(settings.cycle){
						for(var i = 0;i < settings.range;i++){
							$this.append($this.children().eq(i).clone(true));
						};
						$this.animate({marginTop:-(height * settings.range)},settings.speed,function(){
							$this.css('margin-top',0);
							for(var i = 0;i < settings.range;i++){
								$this.children().first().remove();
							};
							if(settings.next)settings.next.bind('click',slideUp);
							autoSlider();
						});
					}else{
						if(current < Math.ceil(total / settings.range) - 1)current++;
						$this.animate({marginTop:-(height * settings.range)*current},settings.speed,function(){
							if(settings.next)settings.next.bind('click',slideUp);
							autoSlider();
						});
					}
				};
				var slideDown = function(){
					clearTimeout(interval);
					if(settings.prev)settings.prev.unbind('click');
					if(settings.cycle){
						for(var i = 0;i < settings.range;i++){
							$this.prepend($this.children().eq(total - 1).clone(true))
						};
						$this.css('margin-top',-(height * settings.range));
						$this.animate({marginTop:0},settings.speed,function(){
							for(var i = 0;i < settings.range;i++){
								$this.children().last().remove();
							};
							if(settings.prev)settings.prev.bind('click',slideDown);
							autoSlider();
						});
					}else{
						if(current > 0)current--;
						$this.animate({marginTop:-(height * settings.range)*current},settings.speed,function(){
							if(settings.prev)settings.prev.bind('click',slideDown);
							autoSlider();
						});
					}
				};
				var autoSlider = function(){
					if(settings.timeout && mouseHover == false && settings.cycle == true)interval = setTimeout(slideUp,settings.timeout);
				};
				if(settings.pauseOnHover){
					$this.children().mouseenter(function(){
						mouseHover = true;
						if(interval)clearTimeout(interval);
					});
					$this.children().mouseleave(function(){
						mouseHover = false;
						autoSlider();
					});
				};
				if(settings.next)settings.next.bind('click',slideUp);
				if(settings.prev)settings.prev.bind('click',slideDown);
				autoSlider();
			break;
			case 'scrollHorz':
				if($this.children().length < settings.least)return;
				total = $this.children().length;
				$this.width(width * ($this.children().length + settings.range));
				total = $this.children().length;
				current = 0;
				
				var slideLeft = function(){
					clearTimeout(interval);
					if(settings.next)settings.next.unbind('click');
					
					if(settings.cycle){
						for(i = 1;i <= settings.range;i++){
							$this.append($this.children().eq(i - 1).clone(true));
						};
						$this.animate({marginLeft:-(width * settings.range)},settings.speed,function(){
							for(i = 1;i <= settings.range;i++){
								$this.children().first().remove();
							};
							$this.css({'margin-left':0});
							if(settings.next)settings.next.bind('click',slideLeft);
							autoSlider();
						});
					}else{
						if(current < Math.ceil(total/settings.range) - 1)current++;
						$this.animate({marginLeft:-(width * settings.range) * current},settings.speed,function(){
							if(settings.next)settings.next.bind('click',slideLeft);
							autoSlider();
						});
					}
				};
				
				var slideRight = function(){
					clearTimeout(interval);
					if(settings.prev)settings.prev.unbind('click');
					if(settings.cycle){
						for(i = 1;i <= settings.range;i++){
							$this.prepend($this.children().eq(total - 1).clone(true));
						};
						$this.css({'margin-left':-(width * settings.range) + 'px'}).animate({marginLeft:0},settings.speed,function(){
							for(i = 1;i <= settings.range;i++){
								$this.children().last().remove();
							};
							if(settings.prev)settings.prev.bind('click',slideRight);
							autoSlider();
						});
					}else{
						if(current > 0)current--;
						$this.animate({marginLeft:-(width * settings.range) * current},settings.speed,function(){
							if(settings.prev)settings.prev.bind('click',slideRight);
							autoSlider();
						});
					};
				};
				
				var autoSlider = function(){
					if(settings.timeout && mouseHover == false)interval = setTimeout(slideLeft,settings.timeout);
				};
				
				if(settings.pauseOnHover){
					$this.children().mouseenter(function(){
						mouseHover = true;
						if(interval)clearTimeout(interval);
					});
					$this.children().mouseleave(function(){
						mouseHover = false;
						autoSlider();
					});
				};
				
				if(settings.next)settings.next.bind('click',slideLeft);
				if(settings.prev)settings.prev.bind('click',slideRight);
				autoSlider();
			break;
		};
	};
})(jQuery);