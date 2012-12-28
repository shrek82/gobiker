define(function(require, exports, module){
    var obj={};
    obj.name='zhaojiangang';
    obj.send=function(json){
        $.ajax({
            url: json.url?json.url:null,
            type:json.method?json.method:'get',
            processData: false,
            data:json.data?json.data:'&ajax=true',
            success: function(data){
                alert(data);
            },
            error:json.onError?function(data){
                json.onError(data);
            }:null,
            dataType:json.dataType?json.dataType:'html'
        });
    }
    return obj;
})