/**
*
*@2016-1-17 by 陈建芳
*@qq：1737752975
*@自助取证件固定宽高PC websit
*
*/

function Reusable(){
	this.init();
	this.$next = $(".next");
	this.$last = $(".last");
	this.indexNum = []; //获取服务器数据的index
	this.nowValue = 0; //当前项
	this.ajaxData; //ajax获得的数据
	this.$appendItems = $(".side ul");//页面动态添加的位置。这里添加的项是li
	this.$pageMessage = $(".basic-header-img");  //页面要修改的地方
	this.cc;
}

Reusable.prototype.init=function(){
	var _this = this;
	
	$.ajax({
		type : "GET",
		url : "../try.json",
		dataType: "json",
		success : function(data){
			_this.ajaxData = data;

			$.each(data,function(index,content){

				_this.indexNum.push(index); //获取服务器数据的index，用于得到数组的长度和页面显示的索引，日后可优化此处
			});
			_this.appendSide();    //成功获取数据后、执行回调函数。把数据的内容添加到页面
			$(_this.$appendItems).children().first().addClass("active");   //默认让第一个项变色
			_this.content();  //获取到数据直接渲染第一页
		},
		error : function(){
			//
		}
	});

	$(".next").click(function(){
		_this.nextClick();
	});
	$(".last").click(function(){
		_this.upClick();
	});
}
Reusable.prototype.appendSide = function(){ 
	var element='';
	var content='';
	var aa = this.ajaxEach("sxh");   //你要添加到页面的元素只要在此处修改键的名字即可
	console.log(aa);
	var bb = this.ajaxEach("mc");
	console.log(bb);
	this.cc = this.ajaxEach("url");
	console.log(this.cc);
	for(var i=0;i<aa.length;i++){
		element += '<li><span>'+aa[i]+'.</span>'+bb[i]+'</li>';
	}
	$(this.$appendItems).append(element);
}
Reusable.prototype.ajaxEach = function(ele){ //所需的元素，只要传入键名字即可、高不高级  哈哈  被自己的智商折服了
	var bar = [];
	$.each(this.ajaxData,function(index,content){
		bar.push(content[ele]);
	});

	return bar ;
}
Reusable.prototype.content = function(){  //页面要动态展示的信息 ！！！！！！！！！！！！！！！
	var nowMessage = this.cc[this.nowValue];
	$(".ajax-content").html(nowMessage);
}

Reusable.prototype.nextClick = function(){  //此方法引入两个html的元素上一步和下一步
	var bbb = this.nowValue;
	this.nowValue++;
	$(this.$appendItems).children().removeClass("active");

	$(this.$appendItems).children().eq(bbb).addClass("blue");
	$(this.$appendItems).children().eq(this.nowValue).addClass("active");
	this.$last.show();
	if(this.nowValue== this.indexNum.length-1){ //到最后一项的时候执行的操作
		this.$next.hide();
	}
	console.log(this.nowValue);
	this.content();
}
Reusable.prototype.upClick = function(){  //此方法引入两个html的元素上一步和下一步
	this.nowValue--;
	$(this.$appendItems).children().removeClass("active");

	$(this.$appendItems).children().eq(this.nowValue).removeClass("blue");
	$(this.$appendItems).children().eq(this.nowValue).addClass("active");
	this.$next.show();
	if(this.nowValue==0){ //第一个时候让上一步按键隐藏
		this.$last.hide();
	}
	console.log(this.nowValue);
	this.content();
}