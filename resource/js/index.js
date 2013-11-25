(function(){
    var mapShow = window.mapShow = {
        _$showBox : $(".show-box"),
        _$briefArr: $(".brief"),
        _$idMap:{},
        _i:0,
        _len:0,
        _timmer:null,
        _inteval:2000,
        _$hl: null,
        _currentURL: undefined,
        init: function(){
            
            this._len = this._$briefArr.length;
            for(var i = 0;i < this._len; ++i) {
                this._$briefArr[i] = $(this._$briefArr[i]);
                var id = this._$briefArr[i].attr("id");
                this._$idMap[id] = this._$briefArr[i];
            }
            $(".show-box").bind({
                mouseenter:function(){
                    window.mapShow._stopShow();
                },
                mouseleave:function(){
                    window.mapShow._continueShow();
                }
            });
            $(".tag-off").bind({
                mouseenter:function(){
                    var me = window.mapShow;
                    me._stopShow();
                    var id = "#" + $(this).attr("class").split(" ")[0];
                    me.go($(id));
                },
                mouseleave:function(){
                    window.mapShow._continueShow();
                },
                click:function(){
                    var me = window.mapShow;
                    if (me._currentURL !== undefined )
                        window.location.href = me._currentURL;
                }    
            });
            this.show();
        },
        _stopShow: function(){clearTimeout(this._timmer);},
        _continueShow: function(){this._timmer = setTimeout("window.mapShow.show()",this._inteval);},
        show: function(){
            var me = window.mapShow;
            var theObj = me._$briefArr[me._i % me._len];
            me.go(theObj);
            ++(me._i);
            me._timmer = setTimeout("window.mapShow.show()",me._inteval);
        },
        go: function(theObj) {
            var me = window.mapShow;
            var id = "." + theObj.attr("id");
            me._$showBox.html(theObj.html());
            if (theObj.url === undefined)
                theObj.url = theObj.find("a").attr("href");
            me._currentURL = theObj.url;
            if (me._$hl !== null) {
                me._$hl.removeClass("tag-on");
            }
            me._$hl = $(id);
            me._$hl.addClass("tag-on");
        }
    }
})();
