/*
    @name Ajax Cross Domain Plugin
    @author Mauricio Madruga de Azevedo
    @contact mmadrugadeazevedo@gmail.com
    @date 09-18-2013
    @version 1.0.0

    Simple plugin with jquery to do ajax on Cross Domain, that do the request accord with the browser.

    Simple call of function 

    $.ajaxCrossDomain(
        {url : 'http://www.google.com'}
    );

    Settings  :
        typeRequisition - Can be 'Get' or 'Post'
        url - URL that provide the response with the data
        returnData - Type of data returned, can be 'text' or 'json'

*/

(function($){
    $.ajaxCrossDomain = function(settings) {
        var browser = navigator.userAgent;

        var config = {
            typeRequisition : 'GET',
            url : '',
            returnData : 'json'
        };

        if (settings){$.extend(config, settings);}

        if (browser.indexOf("MSIE") > -1) {
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
                if (xdr) {
                    xdr.onload = function() {
                        return $.parseJSON(xdr.responseText); 
                    };
                    xdr.onerror = function() {
                        return 'The request fail!';
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
                    return data;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    return 'The request fail!'
                }
            });
        }
    };
})(jQuery);
