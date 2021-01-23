;
(function(window, undefined) {

    function startNProgress(){
        NProgress.configure({
            showSpinner:false//是否需要加载的小圆圈
        })
        NProgress.set(0.4);// 默认设置40% NProgress.set(0) 等价与 NProgress.start()
        let interval = setInterval(function(){
            NProgress.inc(); // 以小量递增
        },200)

        $(window).on('load',()=>{
            clearInterval(interval)
            NProgress.done()
        })
    }

    startNProgress();
    let util = {
        util_time: function(date, format = "YYYY-MM-DD HH:mm:ss") {
            return moment(date).format(format);
        }
    };
    //  暴露给全局
    window.util = util;
})(window);