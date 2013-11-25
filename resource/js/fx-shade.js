(function(){
    /* {{{ fx-shade */
    var fadeSpeed = "fast";
    var fadeTo = 0.3;
    $(".fx-shade").each(function(){
        var $children = $(this).children();
        var $nieces = $(this).next().find("tr").slice(1);
        for (var i=0 ;i < $children.length;++i) {
            var me = $children[i];
            var c = $($children[i]).attr("class").split(" ");
            for(var j=0;j< c.length;++j){
                if(0 === c[j].indexOf("f-")){
                    me.c = c[j];
            }}
            me.brothers = $(this).next().find("." + me.c);
            me.brothers.brothers = $(this).find("." + me.c);
            if(me.brothers){
                for(var j=0;j<me.brothers.length;++j){
                    (me.brothers)[j].c = me.c;
                }
            }
        }
        var $family = {'$children':$children,'$nieces':$nieces};
        $children.bind('mouseenter',$family,function(){
            for (var i=0 ;i < $children.length;++i) {
                if($children[i].c !== this.c) {
                    $($children[i]).css('opacity', fadeTo);
            }}
            for (var i=0 ;i < $nieces.length;++i) {
                if($nieces[i].c !== this.c) {
                    $($nieces[i]).css('opacity', fadeTo);
            }}
        });
        $children.bind('mouseleave',$family,function(){
            $($children).css('opacity', 1);
            $($nieces).css('opacity', 1);
        });
        $nieces.bind('mouseenter',$family,function(){
            for (var i=0 ;i < $children.length;++i) {
                if($children[i].c !== this.c) {
                    $($children[i]).css('opacity', fadeTo);
            }}
            for (var i=0 ;i < $nieces.length;++i) {
                if($nieces[i].c !== this.c) {
                    $($nieces[i]).css('opacity', fadeTo);
            }}
        });
        $nieces.bind('mouseleave',$family,function(){
            $($children).css('opacity', 1);
            $($nieces).css('opacity', 1);
        });
    });
    /* }}} fx-shade */
})();
