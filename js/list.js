$(function(){
    var widthWin = $(window).width();//设备宽度
    $('html').css("fontSize",widthWin / 375 * 100 + "px");

    //list跳转链接
    $(".list").on("click",function(){
        window.location.href = "./app.html";
    });

    //添加设备
    $(".add_device").on("click",function(){
        console.log("添加设备咯！");
    });
    
})