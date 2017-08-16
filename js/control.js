$(document).ready(function() {
    var widthWin = $(window).width();//设备宽度
    $('html').css("fontSize",widthWin / 375 * 100 + "px");

    var data = {
        "Switch":{value:"1"},
        "Light":{value:"100"},
        "Color":{value:"205,205,205"},
        "ColorTemperature":{value:"0"},//色温，暂时不做
        "Scene":{value:"0"},
        "Delay":{value:"20"}    
    }


    $('#colorpicker').farbtastic('#color');
    //隐藏无用的内部选择
    $('#colorpicker .color, #colorpicker .overlay ,#colorpicker .sl-marker').addClass("hidden");
    //修改颜色选择环大小
    var scale = widthWin * 0.6 / 195;
    $(".farbtastic").css("transform","scale("+scale+")");
    // 开关按钮
    $(".farbtastic").append("<div class = 'light'><span class= 'light_icon light_on_off on'>&#xe66e;</span></div>");

    
    var colorChange = false;
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var brightness = 0;//初始亮度值
    var decrement = 0; //亮度值增减量
    var actualTime = 0;//实时亮度值
    var lightWidth = $('.lighteness').width();//获取触发范围的宽度
    var app = {
        init:function(){
            var self = this;

            self.render(data);
            self.bindEvent();
        },
        bindEvent:function(){
            var self = this;
            $(".light_on_off").on("click",function(){
                if($(this).hasClass("off")){//开灯 
                    // $(this).removeClass("off").addClass("on");
                    // $(this).html("&#xe66e;");
                }else{                       //关灯
                    // $(this).addClass("off").removeClass("on");
                    // $(this).html("&#xe631;");
                    $(".lighteness").removeClass("hidden");
                    $(".color_choise").addClass("hidden");

                    $('.lighteness').find('div').removeClass("on").addClass("off");
                    $(".bulb").html("&#xe631;");
                    $("body").css("background","#283e5b");
                    $(".light_switch").addClass("hidden");

                    $(".light_switch").addClass("off").removeClass("on");
                    $(".light_switch").find(".switch_txt").text("RGB灯");
                }
            });
            //监听颜色的变化
            $(".farbtastic").on("touchstart",function(){
                console.log("颜色的当前值：",$("#color").css("background"));
            });
            $(".farbtastic").on("touchmove",function(){
                console.log("颜色的当前值：",$("#color").css("background"));
                $(".light_on_off").css("color",$("#color").css("backgroundColor"));
            });
            //底部按钮
            $(".btm>div").on("click",function(){
                if(!$(this).hasClass("on")){
                    $(".btm>div").removeClass("on");
                    $(this).addClass("on");
                }
            });
            // 开启关闭按钮
            $(".lighteness").on("click",function(){
                if($(".bulb").hasClass("off")){//开灯
                    $(this).find('div').removeClass("off").addClass("on");
                    $(".bulb").html("&#xe66e;");
                    $("body").css("background","#589ee0");
                    $(".light_switch").removeClass("hidden");
                }else{                      //关灯
                    $(this).find('div').removeClass("on").addClass("off");
                    $(".bulb").html("&#xe631;");
                    $("body").css("background","#283e5b");
                    $(".light_switch").addClass("hidden");
                }
            });
             //滑动调节亮度
            $(".lighteness").on("touchstart",function (e) {
                // e.preventDefault();
                var touch = e.touches[0]; //获取第一个触点
                var x = touch.pageX; //页面触点X坐标
                var y = touch.pageY; //页面触点Y坐标
                //记录触点初始位置
                startX = x;
                startY = y;
                $(".lighteness").on("touchmove",self.lightmove);
                $(document).on("touchend",self.lightend);
            });
            //切换按钮
            $(".light_switch").on("click",function(){
                if($(this).hasClass("off")){//换成RGB
                    $(this).addClass("on").removeClass("off");
                    $(this).find(".switch_txt").text("白灯");
                    $(".lighteness").addClass("hidden");
                    $('.color_choise').removeClass("hidden");
                }else{                      //换成白灯
                    $(this).addClass("off").removeClass("on");
                    $(this).find(".switch_txt").text("RGB灯");
                    $(".lighteness").removeClass("hidden");
                    $('.color_choise').addClass("hidden");          
                }
            });

        },
        render:function(data){
            var self = this;
            
            self.switchRender(data);//开关渲染
            self.lightRender(data);//亮度渲染
            self.colorRender(data);//RGB颜色渲染
        },
        switchRender:function(data){
            var self = this;
            if(data.Switch.value == 0){
                // $(".light_on_off").addClass("off").removeClass("on");
                // $(".light_on_off").html("&#xe631;");
                $(".lighteness").removeClass("hidden");
                $(".color_choise").addClass("hidden");

                $('.lighteness').find('div').removeClass("on").addClass("off");
                $(".bulb").html("&#xe631;");
                $("body").css("background","#283e5b");
                $(".light_switch").addClass("hidden");
            }else{
                if(!colorChange){
                    // $(".light_on_off").addClass("off").removeClass("on");
                    // $(".light_on_off").html("&#xe631;");
                    $(".lighteness").removeClass("hidden");
                    $(".color_choise").addClass("hidden");

                    $(".lighteness").find('div').removeClass("off").addClass("on");
                    $(".bulb").html("&#xe66e;");
                    $("body").css("background","#589ee0");
                    $(".light_switch").removeClass("hidden");   
                }else{
                    // $(".light_on_off").removeClass("off").addClass("on");
                    $(".light_on_off").html("&#xe66e;");

                    $(".lighteness").addClass("hidden");
                    $(".color_choise").removeClass("hidden");
                }
            }
        },
        lightRender:function(data){
            var self = this;
            var lightNess = data.Light.value;
            var power = data.Switch.value;
            var r = self.dataProcessing(lightNess);
            brightness = lightNess;

            if(power == 1){
                $(".bulb").css("color","rgb("+r+","+r+","+r+")");
            }


        },
        colorRender:function(data){
            var self = this;
            var color = data.Color.value;

            window.fb.setColor("rgb("+color+")");
            $(".light_on_off").css("color","rgb("+color+")");
            
        },
        lightmove : function (e){
            var self = this;
            // e.preventDefault();
            var touch = e.touches[0]; //获取第一个触点
            var x = touch.pageX; //页面触点X坐标
            var y = touch.pageY; //页面触点Y坐标
            //记录触点初始位置
            endX = x;
            endY = y;
            var len = Math.abs(startX - endX); //正值往右，增加亮度；负值往左，降低亮度
            if(len >= 5 && $(".bulb").hasClass("on")){ 
                decrement = parseInt(len / lightWidth * 100);//亮度值增减量
                if(startX - endX < 0  && brightness < 100){//增加亮度
                    actualTime = brightness + decrement;
                    if(actualTime > 100) actualTime = 100;
                }else if(startX - endX > 0  && brightness > 0){
                    actualTime = brightness - decrement;
                    if(actualTime < 0) actualTime = 0;
                }
                var r = 205 + (actualTime - 0) / 2;
                $(".bulb").css("color","rgb("+r+","+r+","+r+")");
            }
        },
        lightend : function (e){
            var self = this;
            // e.preventDefault();
            if(Math.abs(startX - endX) < 5){         //下一个
                if($(".bulb").hasClass("off")){//开灯
                    $(".lighteness").find('div').removeClass("off").addClass("on");
                    $(".bulb").html("&#xe66e;");
                    $("body").css("background","#589ee0");
                    $(".light_switch").removeClass("hidden");
                }else{                      //关灯
                    $(".lighteness").find('div').removeClass("on").addClass("off");
                    $(".bulb").html("&#xe631;");
                    $("body").css("background","#283e5b");
                    $(".light_switch").addClass("hidden");
                }
            }
            if( actualTime != brightness){
                brightness = actualTime;
            }
            $(".lighteness").off("touchmove",self.lightmove);
            $(document).off("touchend",self.lightend);
            
        },
        dataProcessing :function (n){
            return r = 205 + (n - 0) / 2;
        }
    }

    app.init();

//end
});



































