var Slide=function(opts){
    if(opts instanceof Object) {
        this.oEl = document.querySelector(opts.el);
        this.oBannerWrap = document.querySelector(opts.el + " .banner-wrap");
        this.oImgs = document.querySelectorAll(opts.el + " .banner-img");
        this.oSpot = document.querySelectorAll(opts.el + " .spot-list");
        this.iLength = this.oImgs.length;
        this.iBannerImgWidth = this.oImgs[0].offsetWidth;
        this.oEl.style.width = this.iBannerImgWidth;
        this.iIndex = 0;
        this.iCurWidth = 0;
        this.fnTimer;
        this.init();
    }
};
Slide.prototype={
    init:function () {
        var _this=this;
        _this.setBannerSize();
        _this.bindEvent();
        _this.run();
    },
    setBannerSize:function(){
        var _this=this;
        var iBannerWrapWidth=0;
        for(var i=0;i<_this.iLength;i++){
            _this.oImgs[i].style.width=_this.iBannerImgWidth+"px";
            iBannerWrapWidth+=_this.oImgs[i].offsetWidth;
        }
        _this.oBannerWrap.style.width=iBannerWrapWidth+"px";
    },
    run:function(){
        var _this=this;
        _this.fnTimer=setInterval(function(){
            if(_this.iIndex<_this.iLength-1){
                _this.iIndex++;
            }else{
                _this.iIndex=0;
            }
            _this.setSlideTransform();
        },3000)
    },
    bindEvent:function(){
        var _this=this;
        for(var i=0;i<_this.iLength;i++){
            _this.oSpot[i].onclick=function(){
                clearInterval(_this.fnTimer);
                _this.iIndex=this.getAttribute("data-index");
                _this.setSlideTransform();
            };
            _this.oSpot[i].onmouseout=function(){
                clearInterval(_this.fnTimer);
                _this.run();
            };
            _this.oImgs[i].onmouseover=function(){
                clearInterval(_this.fnTimer);
            };
            _this.oImgs[i].onmouseout=function(){
                clearInterval(_this.fnTimer);
                _this.run();
            };
        }
    },
    setSlideTransform:function(){
        var _this=this;
        _this.iCurWidth=-_this.iIndex*_this.iBannerImgWidth;
        _this.oBannerWrap.style.transform="translateX("+_this.iCurWidth+"px)";
        for(var j=0;j<_this.iLength;j++){
            _this.oSpot[j].className="spot-list";
        }
        _this.oSpot[_this.iIndex].className="spot-list active";
    }
};