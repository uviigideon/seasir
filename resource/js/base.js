$(function(){
    $(".fllink-li").find("a").not(":last").click(function(event){
        var tmp = $(this).attr("href").split("/");    
        var src = window.location.href.split("/");
        src[src.length - 2] = tmp[tmp.length - 2];
        window.location.href = src.join("/");
        event.preventDefault();
    }); 
});
