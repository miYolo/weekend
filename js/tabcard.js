var TabCard=function(opts){
    if(opts instanceof Object){
        this.oNavs=document.querySelectorAll(opts.el+" .card-nav-list");
        this.oContents=document.querySelectorAll(opts.el+" .card-content");
        this.iLength=this.oNavs.length;
        this.iIndex=0;
        this.fnTimer;
        this.init();
    }
};
TabCard.prototype={
    init:function(){
        var _this=this;
        _this.run();
        _this.bindEvent();
    },
    bindEvent:function(){
        var _this=this;
        for(var i=0;i<_this.iLength;i++){
            _this.oNavs[i].index=i;
            _this.oNavs[i].onmouseover=function(){
                clearInterval(_this.fnTimer);
                _this.changeTab(this.index);
            }
            _this.oNavs[i].onmouseout=function(){
                clearInterval(_this.fnTimer);
                _this.run();
            }
            _this.oContents[i].onmouseover=function(){
                clearInterval(_this.fnTimer);
            }
            _this.oContents[i].onmouseout=function(){
                clearInterval(_this.fnTimer);
                _this.run();
            }
        }
    },
    run:function(){
        var _this=this;
        _this.fnTimer=setInterval(function(){
            if(_this.iIndex<_this.iLength-1){
                _this.iIndex++;
            }else{
                _this.iIndex=0;
            }
            _this.changeTab(_this.iIndex);
        },3000);
    },
    changeTab:function(iIndex){
        var _this=this;
        for(var j=0;j<_this.iLength;j++){
            _this.oNavs[j].className="card-nav-list";
            _this.oContents[j].className="card-content hide";
        }
        _this.oNavs[iIndex].className="card-nav-list on";
        _this.oContents[iIndex].className="card-content";
    }
};