// JavaScript Document

var login = function(){
	var init = function(){
	}
	
	var user_exist = function(value) {
			var error = checkOnly(value) == '[null,true]' ? '用户不存在' : '';
			return error;
		}
	
	var checkOnly = function(value) {
	
		return $.ajax({
			url : '/registration/checkOnly_username',
			data : {
				fieldValue : value
			},
			type : 'post',
			async : false
		}).responseText;
	
	}
};