var MessageHttp = {
    sendXHRAB: function (url, _data, responseHandler) {
        return;
        if (!CC_WECHATGAME) {
            var str = "";
            for (var key in _data) {
                str += "&" + key + "=" + _data[key];
            }
            url = encodeURI(url + "?" + str);
            var xhr = cc.loader.getXMLHttpRequest();
            this.streamXHREvents(xhr, "GET", responseHandler,url);
            xhr.open("GET", url);

            xhr.send();
        } else {
            wx.request({
                url: url,
                data: _data,
                success: function (res) {
                    var handler = responseHandler || function (response) {
                        return response;
                    };
                    handler(res,url);
                }

            })
            var str = "";
            for (var key in _data) {
                str += "&" + key + "=" + _data[key];
            }
            console.log("---url", encodeURI(url + "?" + str));
        }

    },

    streamXHREvents: function ( xhr, method, responseHandler,url ) {
        var handler = responseHandler || function (response) {
            return response;
        };
        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                handler(xhr.responseText,url);
            }
        };
    },
};
// cc.tools.MessageHttp = MessageHttp;
module.exports = cc.MessageHttp = MessageHttp;