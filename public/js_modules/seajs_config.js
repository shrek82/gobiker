seajs.config({
  alias:{
    "jquery":"gallery/jquery/1.8.2/jquery",
    "lib": "lib/src/lib",
    "main":"main/src/main",
    "comments":"comments/src/comments"
  },
  preload:['jquery'],
  debug:false
});
