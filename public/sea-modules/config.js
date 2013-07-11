// seajs 的简单配置
seajs.config({
    // 调试模式
    debug: true,
    paths: {
        "root": '/sea-modules/'
    },
    alias: {
        "jquery": "/sea-modules/jquery/1.7.2/jquery.js",
        "main": "/sea-modules/main/src/main.js",
        "jquery.form": "/sea-modules/jquery.form/src/jquery.form.js",
        "candyForm": "/sea-modules/candyForm/src/candyForm.js"
    }, preload: ["jquery"]
})
;