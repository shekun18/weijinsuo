$(function () {
    /*动态轮播图*/
    banner();
    /*移动端页签*/
    initMobileTab();
    /*初始工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*1.获取轮播图数据    ajax */
    /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
    /*2.1 准备数据*/
    /*2.2 把数据转换成html格式的字符串 （动态创建元素，字符串拼接，模版引擎【artTemplate】*/
    /*2.3 把字符渲染页面当中*/
    /*3.测试功能 页面尺寸发生改变重新渲染*/
    /*4.移动端手势切换  touch*/


    /*做数据缓存*/
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                /*强制转换后台返回的数据为json对象*/
                /*强制转换不成功程序报错，不会执行success,执行error回调*/
                dataType: 'json',
                data: '',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }

    var render = function () {
        getData(function (data) {
            /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
            var isMobile = $(window).width() < 768 ? true : false;
            /*2.1 准备数据*/
            /*2.2 把数据转换成html格式的字符串*/
            /*使用模版引擎：那些html静态内容需要编程动态的*/
            /*发现：点容器  图片容器  新建模版*/
            /*开始使用*/
            /*<% console.log(list); %> 模版引擎内不可使用外部变量 */
            var pointHtml = template('pointTemplate', {list: data});
            //console.log(pointHtml);
            var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
            //console.log(imageHtml);
            /*2.3 把字符渲染页面当中*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        })
    }


    $(window).on('resize', function () {
        render();
        /*通过js主动触发某个事件*/
    }).trigger('resize')

    //移动端手势切换
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    //originalEvent 代表的是JS原生事件
    $('.wjs_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        if (isMove && Math.abs(distanceX) > 50){
            //左滑
            if(distanceX < 0){
                $('.carousel').carousel('next');
            }
            //右滑
            else {
                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    })


}
var initMobileTab = function () {
    /*1.解决换行问题*/
    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    $navTabs.find('li').each(function (i, item) {
        var $currLi = $(this);//$(item);
        /*
         * width()  内容
         * innerWidth() 内容+内边距
         * outerWidth() 内容+内边距+边框
         * outerWidth(true) 内容+内边距+边框+外边距
         * */
        var liWidth = $currLi.outerWidth(true);
        width += liWidth;
    });
    console.log(width);
    $navTabs.width(width);

    /*实现滑动效果使用iscroll */
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    });
}




























