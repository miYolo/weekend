var Index=function(){
    this.oFloatTop=document.getElementById("float-top");
    this.oFloatNav=document.getElementById("float-nav");
    this.oFloatNavBoxs=document.querySelectorAll(".float-nav .box");
    this.oGoodsAreas=document.querySelectorAll(".goods-area,.like-area");
    this.oTopBtn=document.getElementsByName("top-btn");
    this.iScrollTop=0;
    this.bFirstEnter=true;
    this.aScrollTop=[];
    this.init();
};
Index.prototype={
    init:function(){
        var _this=this;
        new Slide({el:".banner-main"});
        new TabCard({el:".card-main"});
        for(var i=0;i<_this.oGoodsAreas.length;i++){
            _this.aScrollTop.push(_this.oGoodsAreas[i].offsetTop);
        }
        _this.eventScroll();
        _this.bindEvent();
    },
    eventScroll:function(){
        var _this=this;
        window.onscroll=function(){
            _this.iScrollTop=document.documentElement.scrollTop || document.body.scrollTop
            if(_this.iScrollTop<=938){
                _this.oFloatTop.style.transform="translateY(-100%)";
                _this.oFloatTop.style.webkitTransform="translateY(-100%)";
                if(!_this.bFirstEnter) {
                    _this.oFloatNav.className = "float-nav float-nav-in";
                }
            }else{
                _this.oFloatTop.style.transform="translateY(0px)";
                _this.oFloatTop.style.webkitTransform="translateY(0px)";
                _this.oFloatNav.className="float-nav float-nav-out";
                _this.bFirstEnter=false;
            }

            //天猫超市
            _this.changeBoxColor(0,1,"green");

            //天猫国际
            _this.changeBoxColor(1,2,"red");

            //美丽人生
            _this.changeBoxColor(2,3,"pink");

            //潮电酷玩
            _this.changeBoxColor(3,4,"blue");

            //居家生活
            _this.changeBoxColor(4,5,"green");

            //打造爱巢
            _this.changeBoxColor(5,6,"red");

            //户外出行
            _this.changeBoxColor(6,7,"cyan");

            //猜你喜欢
            _this.changeBoxColor(7,8,"red");
        }
    },
    changeBoxColor:function(index1,index2,classname){
        var _this=this,iScrollBottom=0,iScrollTop=0;
        iScrollTop=_this.aScrollTop[index1]-100;
        iScrollBottom=iScrollTop+_this.oGoodsAreas[index1].offsetHeight;
        if(_this.iScrollTop>=iScrollTop && _this.iScrollTop<=iScrollBottom){
            _this.oFloatNavBoxs[index2].className="box "+classname;
        }else{
            _this.oFloatNavBoxs[index2].className="box";
        }
    },
    bindEvent:function(){
        var _this=this;
        for(var i=0;i<_this.oTopBtn.length;i++){
            _this.oTopBtn[i].onclick=function(e){
                e.cancelBubble=true;
                _this.scrollUp(5);
            }
        }

        for(var i=1;i<=8;i++){
            _this.oFloatNavBoxs[i].index=i;
            _this.oFloatNavBoxs[i].onclick=function(){
                _this.scrollUp(_this.aScrollTop[this.index-1]-50);
            }
        }
    },
    scrollUp:function(val){
        var _this=this;
        var fnTimer=setInterval(function(){
            _this.iScrollTop-=_this.iScrollTop/7;
            if(parseInt(_this.iScrollTop)<=val){
                clearInterval(fnTimer);
                _this.iScrollTop=val;
            }
            document.documentElement.scrollTop=_this.iScrollTop;
            document.body.scrollTop=_this.iScrollTop;
        },30);
    }
};