function ScrollImg(obj)
{
	this.oUl=obj.getElementsByTagName('ul')[0];
	this.aLi=obj.getElementsByTagName('li');
	this.iLiLen=this.aLi.length;
	this.iLiWidth=this.aLi[0].offsetWidth;
	this.timer=null;
	
	this.init(obj);
}

ScrollImg.prototype = {
	//初始函数
	init : function(obj)
	{
		this.oUl.style.width=this.iLiLen*this.iLiWidth+'px';
		this.liHover();
		this.scrollFn(obj);
		this.objOver(obj);
		this.objOut(obj);
	},
	//li的hover事件，放上去其它图片半透明
	liHover : function()
	{
		var This=this;
		for(var i=0; i<this.aLi.length; i++)
		{
			this.aLi[i].onmouseover = function()
			{
				for(var i=0; i<This.aLi.length; i++)
				{
					// setStyle(指定第几张图片,声明是透明还是不透明（此处为不透明度）,不透明度为0.65（言外之意就是透明度为（0.35）);
					setStyle(This.aLi[i],'opacity',0.65);
				}
				// 不透明度和透明度都是在0~1之间，不透明度 = 1 时 为完全不透明  = 0 时 为完全透明   ，透明度 则是相反  =1 全透明  =0 不透明
				setStyle(this,'opacity',1);
			}
			this.aLi[i].onmouseout = function()
			{
				for(var i=0; i<This.aLi.length; i++)
				{
					setStyle(This.aLi[i],'opacity',1);
				}
			}
		}	
	},
	//滚动事件
	scrollFn : function(obj)
	{
		this.startScroll(obj);			
	},
		startScroll : function(obj)
	{
		var This=this;
		this.timer=setInterval(function(){
			startMove(obj.getElementsByTagName('ul')[0],{'left':-165},function()
			{
				This.oUl.appendChild(This.aLi[0]);
				This.oUl.style.left='0px';
			});
		}, 1500);
	},
	stopScroll : function()
	{
		clearInterval(this.timer);
	},
	//obj的over事件
	objOver : function(obj)
	{
		var This=this;
		obj.onmouseover = function()
		{
			This.stopScroll();
		}
		
	},
	//obj的out事件
	objOut : function(obj)
	{
		var This=this;
		obj.onmouseout = function()
		{
			This.startScroll(obj);			
		}
	}
}


