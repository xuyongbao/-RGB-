$(function(){
    var widthWin = $(window).width();//设备宽度
    $('html').css("fontSize",widthWin / 375 * 100 + "px");

    //开关按钮
    $(".status_btn").on("click",function(e){
        e.stopPropagation();
        if($(this).hasClass("on")){
            $(this).removeClass("on").addClass("off");
            $(this).parent().find(".status_txt").text("关闭");
        }else{
            $(this).removeClass("off").addClass("on");
            $(this).parent().find(".status_txt").text("开启");
        }
    });
    //点击跳转控制页面
    $(".device_list").on("click",function(){
        window.location.href = "./control.html";
    });
    $(".label_left,.label_right").on("touchstart",function(){
        $(this).addClass("on").removeClass("off");
    });
    $(document).on("touchend",function(){
        $(".label_left,.label_right").addClass("off").removeClass("on");
    });

})