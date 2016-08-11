// JavaScript Document
function skip(url,target){
	if(typeof(target) == 'undefined' || target == "_self"){
		window.top.location.href=url;
	}else if(target == "_blank"){
		window.top.open(url)
	}
};

function recharge() {
	fancyshow('/kftrecharge/toRecharge.htm',630);
}

function withdraw() {
	var cardStatus = $("#cardStatus").val();
	if (cardStatus == 2) {
		fancyshow('/kftwithdraw/toWithdraw.htm',630);
	} else {
		layer.open({
			content : '您还没有实名认证，请先认证',
			title : '提示',
			icon : 0,
			yes : function(index) { 
				parent.fancyshow('/kftbankcard/toRealNameValid.htm',630);
				layer.close(index);
			}
		});
	}
	
}

function fancyshow(target,objWidth){
	$.fancybox.open({
		type : 'iframe',
		href : target,
		padding : 0,
		margin:0,
		width:objWidth,
		scrolling: 'no',
		closeBtn: false,
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div><a title="关闭" class="fancy-custom-close fancybox-close-animate" href="javascript:parent.$.fancybox.close(alert(1));"></a></div></div></div>'
		}
	})
}

function inputPattern(regexp){
	switch(regexp){
		case "chinaName":
			return /[^\u4E00-\u9FA5]/g
		break;
		case "number":
			return /[^\d]/g
		break;
		case "money":
			return /[^0-9.]/g 
		breakl
		case "IDcard":
			return /[\W]/g
		break;
	};
}

$(function(){
	
	$("#header .wechat").poshytip({
		content: $("#qrcode"),
		alignX: "center",
		alignY: "top"
	});
	if($('.poshytips').size()){
		$('.poshytips').each(function(index, element) {
			$(this).poshytip({
				className:	typeof($(this).attr('tips-class'))=='undefined'?'tip-common':$(this).attr('tips-class'),
				offsetX : 10,
				alignY: 'center'
			});
        }); 
	}
	if($("[data-quality]").size()){
		$("[data-quality]").each(function(index, element) {
            var $this = $(this);
			var url = $this.attr("data-quality");
			var img=new Image();
			img.onload=function(){
				if($this.is("img")){
					$this.attr("src",url);
				}else{
					$this.css("background-image","url("+url+")");
				}
			}
			img.src=url;
        });
	};
	
	
	if($(".tab-controls").size()){
		$(".tab-controls").each(function(index, element) {
			var $this = $(this);
			$this.find("a").click(function(){
				if($(this).hasClass("active"))return false;
				$(this).addClass("active").siblings().removeClass("active");
				var id = $(this).index();
				if(typeof($(this).attr("data-tabindex"))!="undefined")id = $(this).attr("data-tabindex");
				$this.nextAll(".tab-content").find(".tab-item").eq(id).stop().css("opacity",0).show().animate({opacity:1},500).siblings().hide();
			});
			$this.find("a:first").click();
        });
	};
	
	
	if($("[data-format]").size()){
		$("[data-format]").each(function(index, element) {
			var $this = $(this),
				layout = $this.attr("data-format");
			switch(layout){
				case "money":
					if($this.is("input")){
						$this.bind("blur",function(){
							if($this.val()>0)$this.val($.formatDigit($this.val(),2));
						});
						$this.bind("keyup",function(){
							$("[name='amount']").val($.unformatMoney($this.val()))
						});
					}else{
						$this.html($.formatDigit($this.text(),2))
					}
				break;
				case "bankCard":
					if($this.is("input")){
						$this.bind("keyup",function(){
							var value=$this.val().replace(/\s$/g,'');
							$("[name='custBankAccountNo']").val(value.replace(/\s+/g, ""))
							for(var i=0;i<value.length;i++)
							{
								var arr=value.split('');
								if((i+1)%5==0)
								{
									arr.splice(i,0,' ');
								}
							}
							$this.val(arr.join(''));
						});
					}else{
						$this.html($.formatDigit($this.text(),2))
					}
				break;
			}
        });
	};
	if($("input").size()){
		$("input").each(function(index, element) {
            var $input = $(this);
			if(typeof($input.attr("pattern")) != "undefined"){
				var validate = $input.attr("pattern");
				$input.bind("keyup",function(){
					$input.val($input.val().replace(inputPattern(validate),""));
				});
			};
			if(typeof($input.attr("focus-clear")) != "undefined"){
				if($input.attr("focus-clear") == "true")
					$input.bind("focus",function(){$input.val("")});
			};
			if($input.parents("span").hasClass("input-group") || $input.parents("label").hasClass("input-group")){
				var $this = $input.parents(".input-group");
				$input.on({
					"focus": function(){
						$this.addClass("focus");
					},
					"blur": function(){
						$this.removeClass("focus");
					}
				});
				if($input.hasClass("input-text")){
					$this.append("<em class='remove' style='display:none'></em>");
					$this.find(".remove").bind("mousedown",function(){
						$input.val("").focus();
						$(this).hide();
					});
					$input.on({
						"keyup": function(){
							if($input.val().length > 0){
								$this.find(".remove").show();
							}else{
								$this.find(".remove").hide();
							}
						},
						"focus":function(){
							if($input.val().length > 0){
								$this.find(".remove").show();
							}
						},
						"blur":function(){
							$this.find(".remove").hide();
						}
					});
				};
				if($input.hasClass("input-pwd")){
					$this.append("<em class='password' style='display:none'></em>");
					$this.find(".password").bind("mousedown",function(){
						$input.attr("type","text")
					});
					$this.find(".password").bind("mouseup",function(){
						$input.attr("type","password")
					});
					$input.on({
						"keyup": function(){
							if($input.val().length > 0){
								$this.find(".password").show();
							}else{
								$this.find(".password").hide();
							}
						}
					});
				};
			}
        });
	};
	if($("[class^='checkbox']").size()){
		$("[class^='checkbox']").click(function(){
			$(this).toggleClass("checked");
		});
	};
});

(function($){
    $.extend({
		formatDigit:function(val, decimal){
            var digit = 0.00;//临时变量
            var dec = 0;//小数部分
            var int = 0;//整数部分
            var buffer = new Array(); //输出缓存
            var positive = true; //保存正负值标记(true:正数)
            /**
             * 输出定长字符串，不够补0
             * <li>闭包函数</li>
             * @param int num 值
             * @param int len 输出的长度
             */
            function importZero(num, len){
                var str = num.toString();
                var sbuffer = new Array();
                for(var i=0,iLoop=len-str.length; i<iLoop; i++)
                    sbuffer.push('0');
                sbuffer.push(str);
                return sbuffer.join('');
            };

            if (typeof(decimal) === 'undefined')
                decimal = 2;
            positive = (val >= 0);//取出正负号
            digit = (isNaN(digit = parseFloat(val))) ? 0 : Math.abs(digit);//强制转换为绝对值数浮点
            //所有内容用正数规则处理
            int = parseInt(digit); //分离整数部分
            dec = parseInt((digit - int) * Math.pow(10,decimal) + 0.5); //分离小数部分(四舍五入
			

            do{
                buffer.unshift(importZero(int % 1000, 3));
            }while((int = parseInt(int/1000)));
            buffer[0] = parseFloat(buffer[0]).toString();//最高段区去掉前导0
            return ((positive)?'':'-') + buffer.join(',') +'.'+ ((0 === dec)?'00':importZero(dec, decimal));
        },
        unformatMoney:function(data){
            var digit = parseFloat(data.replace(/,/g, ''));
            return (isNaN(digit) ? 0 : digit);
        },
		
		setIncrease:function( num , callback , opts ){
			var _num = temp = 0;
			opts = opts || { format : false };
			num = parseFloat( num );
			var step = Math.ceil( num / ( opts.times || 100 ) );
			callback = callback || function(){};
			var timer = setInterval(function(){
				_num += step;
				if( num <= _num ){
					clearInterval( timer );
					_num = num;
				}
				temp = opts.format ? $.formatDigit( _num , 2 ) : _num;
				callback( temp , _num >= num );
			} , 30);
		},
		
		
    });
})(jQuery);

(function($){
	$.fn.details = function(settings)
	{
		settings = jQuery.extend({
			off: false,
			on: false
        },settings);
		var $obj = this;
			
		$obj.children().each(function(index, element) {
             var $this = $(this),
			 	 $off = settings.off ? settings.off : $this.find("dt"),
				 $on = settings.on ? settings.on : $this.find("dd");
			$this.height($off.outerHeight()).find("dd").show();
			$off.bind("click",function(){
				if($this.height() == $off.outerHeight()){
					$this.addClass("active").siblings().removeClass("active");
					$obj.children().stop().animate({height:$off.outerHeight()},300)
					$this.stop().animate({height:$on.outerHeight() + $off.outerHeight()},300).siblings()
				}else{
					$this.removeClass("active");
					$this.stop().animate({height:$off.outerHeight()},300)
				}
			});
			if($on.find("a.active").size() || $this.hasClass("active"))$off.trigger("click");
        });
	}
})(jQuery);





