/*
    @name Ajax Cross Domain Plugin
    @author Mauricio Madruga de Azevedo
    @contact mmadrugadeazevedo@gmail.com
    @date 09-18-2013
    @version 1.0.0

    Simple plugin with jquery to do Cross Domain ajax Requests.

    Simple call of function 

    $.ajaxCrossDomain(
        {
            url : 'http://www.google.com',
            callback : function() {
                console.log('Success');
            }
        }
    );

    Settings  :
        typeRequisition - Can be 'Get' or 'Post'
        url - URL that provide the response with the data
        returnData - Type of data returned, can be 'text' or 'json'
        callback - Function thar return the response with success
*/

(function($){
    $.ajaxCrossDomain = function(settings, callback) {
        var browser = navigator.userAgent;
        var config = {
            typeRequisition : 'GET',
            url : '',
            returnData : 'json',
            callback : function() {

            }
        };

        if (settings){$.extend(config, settings);}

        if (browser.indexOf("MSIE") > -1) {
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
                if (xdr) {
                    xdr.onload = function() {
                        if (typeof config.callback == 'function') { 
                            config.callback(this); 
                        }
                    };
                    xdr.onerror = function() {
                        console.log('The request fail!');
                    };
                    xdr.open('GET', config.url);
                    xdr.send();
                }
            } 
        }else {
            $.ajax({
                type: config.typeRequisition,
                url: config.url,
                dataType: config.returnData,
                success: function(data, textStatus, jqXHR) {
                    if (typeof config.callback == 'function') { 
                        config.callback(data); 
                    }
                },    
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('The request fail!');
                }
            });
        }
    };
})(jQuery);
