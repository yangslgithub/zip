// JavaScript Document

$(function(){
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
	
	if($(".input-group").size()){
		
		$(".input-group").find("input[type='text']").focus(function(){
			$(this).parents(".input-group").addClass("focus");
		});
		
		$(".input-group").find("input[type='text']").blur(function(){
			$(this).parents(".input-group").removeClass("focus");
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
            dec = parseInt((digit - int) * Math.pow(10,decimal) + 0.5); //分离小数部分(四舍五入)

            do{
                buffer.unshift(importZero(int % 1000, 3));
            }while((int = parseInt(int/1000)));
            buffer[0] = parseInt(buffer[0]).toString();//最高段区去掉前导0
            return ((positive)?'':'-') + buffer.join(',') +'.'+ ((0 === dec)?'00':importZero(dec, decimal));
        },
        unformatMoney:function(data){
            var digit = parseFloat(data.replace(/,/g, ''));
            return (isNaN(digit) ? 0 : digit);
        },
		
		increment:function( num , callback , opts ){
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
				temp = opts.format ? _formatNum( _num , true ) : _num;
				callback( temp , _num >= num );
			} , 30);
		}
    });
})(jQuery);


(function($){
	$.fn.extend({ 
		setfontsImage:function(){
			this.each(function(){
				var _self = $(this),val = _self.attr("val"),numArr = val.split("");
				for(i=0;i<numArr.length;i++){
					var id = numArr[i];
					switch(id){
						case("."):
							_self.append("<span class='fon-dot'></span>");
						break;
						case(","):
							_self.append("<span class='fon-comma'></span>");
						break;
						default:
							_self.append("<span class='fon-num"+id+"'></span>");
					};
				};
			});
		}
	}); 
})(jQuery);



