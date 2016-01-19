/*
*
*2016-1-17 by 陈建芳
*qq：1737752975
*自助取证件固定宽高PC websit
*
*/

function Home(){
	this.init();
	this.timecount = 90;
	this.valueArry = []; //防止输入身份证号码的数组
}
Home.prototype.hidden = function(element){
	$(element).addClass("findItems");
}
/*Home.prototype.msgHidden = function(e){
	$(this).parents(".basic-message").addClass("findItems");
}*/
Home.prototype.show = function(element){
	$(element).removeClass("findItems");
}
/*Home.prototype.msgShow = function(element){
	$(element).removeClass("findItems");
}*/

Home.prototype.init = function(){
	/*跑火车咯*/
	var _this = this;
	$(".left").click(function(){
		_this.hidden(".starter");
		_this.show(".time");
		_this.show(".centerbg");
		_this.show(".getIdCard");
		_this.show(".gotoHome");
		_this.timeRun();
	});
	$(".right").click(function(){
		_this.hidden(".starter");
		_this.show(".time");
		_this.show(".centerbg");
		_this.show(".getIdCard");
		_this.show(".gotoHome");
		_this.timeRun();
	});
	/*返回主页面*/
	$(".gotoHome").click(function(){
		window.location.href="";
	});
	/*输入身份证号码页面*/
	var $cardnumber = $(".cardnumber");
	$(".numberCard").click(function(e){
		_this.clickGetValue(e);
	});
	$(".delete").click(function(){ //删除 pop()
		_this.valueArry.pop();
		$cardnumber.val(_this.valueArry.join(""));
	});
	$(".clear").click(function(){ //清空
		_this.valueArry=[];
		$cardnumber.val(_this.valueArry.join(""));
	});
	$("#post").click(function(){
		$cardnumber.focus();
	});
	/*获取身份证信息页面*/
	$(".cardbutton").click(function(){
		var carderValue = $cardnumber.val();
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		var carder = carderValue.match(reg);
		if(carder){
			_this.hidden(".getIdCard");
			_this.hidden(".gotoHome");
			_this.show(".yz-tip");
			
			setTimeout(function(){
				_this.hidden(".yz-tip");
				_this.hidden(".time");
				_this.hidden(".centerbg");
				_this.show(".getHandAgain");
			},1500);
			setTimeout(function(){
				_this.hidden(".getHandAgain");
				_this.show(".szh-start");
			},3000);
		}else{
			alert("身份信息有误");
		}

	});

	/*信息填写页面*/
/*	$(".next").click(function(){
		$(".last").show();
	});*/

	/*下一步按钮*/
/*	$(".next").click(function(){
		$(this).parents(".basic-message").addClass("findItems");
		$(this).parents(".basic-message").next().removeClass("findItems");
	});*/
	/*上一步按钮*/
/*	$(".last").click(function(){
		$(this).parents(".basic-message").addClass("findItems");
		$(this).parents(".basic-message").prev().removeClass("findItems");
	});*/
	/*返回修改*/
/*	$(".Llast").click(function(){
		$(this).parents(".basic-message").addClass("findItems");
		$(".szh-start").removeClass("findItems");
	});*/
	/*信息提交，支付页面*/
	$(".Lnext").click(function(){
		alert("已提交，请缴费");
		$(this).parents(".basic-message").addClass("findItems");
		$(".payMoney").removeClass("findItems");
		$(".time").removeClass("findItems");
		$(".centerbg").removeClass("findItems");
		$(".gotoHome").removeClass("findItems");
	});
	/*重新采集指纹信息按钮*/
	$(".handAgain").click(function(){
		$(this).parents(".basic-message").addClass("findItems");
		$(".getHandAgain").removeClass("findItems");
	});
}


/*设置时间倒计时*/
Home.prototype.timeRun = function(){
	var that = this;
	$(".time .count").html(this.timecount);
	var timego = setTimeout(function(){
		that.timeRun();
	},1000);
	if (this.timecount == 0){
		clearTimeout(timego);
		$(".count").removeClass("animated fadeInDown");
	}
	this.timecount--;
}

Home.prototype.clickGetValue = function(e){
	if(this.valueArry.length <18){
		this.valueArry.push(e.target.innerHTML);
		$(".cardnumber").val(this.valueArry.join(""));
	}else{
		alert("长度过长");
	}
}	
