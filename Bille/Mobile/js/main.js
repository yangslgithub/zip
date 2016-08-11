// JavaScript Document
//全局
var $cache = {};
$cache.winW = $(window).width();
$cache.winH = $(window).height();
$cache.docW = false;
$cache.docH = false;
$cache.scale = 1;
$cache.timestamp =new Date().getTime();
$cache.datetime = formatDate($cache.timestamp);

var hasTouch = 'ontouchstart' in window ? true : false,
	touchStart = hasTouch ? 'touchstart' : 'mousedown',
	touchMove = hasTouch ? 'touchmove' : 'mousemove',
	touchEnd = hasTouch ? 'touchend' : 'mouseup';

window.onload = function(){
	document.body.addEventListener('touchstart', function () {}); 
};

$(function(){
	transferParam();
	preloadImages();
	if($(".tab-controls").size()){
		$(".tab-controls").each(function(index, element) {
			var $this = $(this);
			$this.find("a").click(function(){
				if($(this).hasClass("active"))return false;
				$(this).addClass("active").siblings().removeClass("active");
				var id = $(this).index();
				if(typeof($(this).attr("data-tabindex"))!="undefined")id = $(this).attr("data-tabindex");
				$this.nextAll(".tab-wrapper").find(".item").eq(id).show().siblings().hide();
			});
			if($this.find("a.active").size()){
				$this.find("a.active").removeClass("active").click();
			}else{
				$this.find("a:first").click();	
			}
        });
	};
	
	
	if($(".input-checkbox").size()){
		$(".input-checkbox").bind(touchStart,function(){
			$(this).toggleClass("checked");
		});
	};
	
	
	
	$(window).bind("resize",function(){
		$cache.winW = $(window).width();
		$cache.winH = $(window).height();
	});
	
	if($("a[href='#']").size())$("a[href='#']").click(function(){return false;});
});

//document.write("<span style='display:none'>DateTime:"+$cache.datetime+"</span>");  


//异步加载
function loadScript(filename,filetype){
    if(filetype == "js"){
        var fileref = document.createElement('');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

//设置动画参数
function transferParam(){
	if(!$(".animated").size())return false;
	$(".animated").each(function(index, element) {
		var thisObj = $(this);
		if(typeof(thisObj.attr("data-delay")) != "undefined"){
			var delay = thisObj.attr("data-delay");
			thisObj.css({'animation-delay':delay,'-webkit-animation-delay':delay});
		};
		if(typeof(thisObj.attr("data-duration")) != "undefined"){
			var duration = thisObj.attr("data-duration");
			thisObj.css({'animation-duration':duration,'-webkit-animation-duration':duration});
		};
		if(typeof(thisObj.attr("data-easing")) != "undefined"){
			var easing = thisObj.attr("data-easing");
			thisObj.css({'animation-easing':easing,'-webkit-animation-delay':easing});
		};
	});
};

//设备横屏事件
function orientationChange(elemnt){
	var coverElm = elemnt;
	var orientation = 'onorientationchange' in window;
	
	function changeScreen(){
		if(document.documentElement.clientWidth > document.documentElement.clientHeight)
			coverElm.style.display = 'block';
		else
			coverElm.style.display = 'none';
	}
	orientation ? (window.addEventListener('orientationchange',function(){
		(window.orientation != 0) ? coverElm.style.display = 'block' : coverElm.style.display = 'none';
	}, false)) : (changeScreen(), (window.addEventListener('resize', changeScreen, false)));
};

//图片预加载
function preloadImages(){
	if(!$("[data-quality]").size())return false;
	$("[data-quality]").each(function(index, element) {
		var thisObj = $(this);
		var url = thisObj.attr("data-quality");
		var img=new Image();
		img.onload=function(){
			if(thisObj.is("img")){
				thisObj.attr("src",url);
			}else{
				thisObj.css("background-image","url("+url+")");
			}
		}
		img.src=url;
	});
};

//转换时间戳
function formatDate(timestamp)   {  
	 var datetime = new Date(timestamp)  
	 var year = datetime.getFullYear();
	 var month = datetime.getMonth()+1;//js从0开始取 
	 var date = datetime.getDate(); 
	 var hour = datetime.getHours(); 
	 var minutes = datetime.getMinutes(); 
	 var second = datetime.getSeconds();
	 
	 if(month<10){
	  month = "0" + month;
	 }
	 if(date<10){
	  date = "0" + date;
	 }
	 if(hour <10){
	  hour = "0" + hour;
	 }
	 if(minutes <10){
	  minutes = "0" + minutes;
	 }
	 if(second <10){
	  second = "0" + second ;
	 }
	 
	 var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
	// alert(time);
	 return time;
}    
