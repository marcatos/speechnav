(function(w, sn) {

    var speechManager = function() {

        var self = this;


        this.ready = function() {
            self.bindings();
        };

        this.bindings = function() {
            sn.$(w).on({
                "result_received.speechnav": function(e, data) {

                    sn.$.each(sn._LANG_, function(k, v) {
                        var i;

                        // firstly search for the first action keyword
                        if (i = data.t.indexOf(v) === 0) {
                            data.t = sn.$.trim(data.t.substr(i + v.length));
                            sn.$(w).triggerHandler("event_" + k + ".speechnav", data);
                        }
                    });

                },
                "event_up.speechnav": function(e, data) {
//                    console.log("dai che ndemo", data);
                },
                "event_scroll.speechnav": function(e, data) {
                    sn.$.each({down: sn._LANG_.down, up: sn._LANG_.up, left: sn._LANG_.left, right: sn._LANG_.right}, function(k, v) {
                        var i;
                        if (i = data.t.indexOf(v) === 0) {
                            data.t = sn.$.trim(data.t.substr(i + v.length));
                            sn.$(w).triggerHandler("event_scroll_" + k + ".speechnav", data);
                        } else if (i = data.t.indexOf(k) === 0) {
                            data.t = sn.$.trim(data.t.substr(i + k.length));
                            sn.$(w).triggerHandler("event_scroll_" + k + ".speechnav", data);
                        }
                    });
                },
                "event_scroll_down.speechnav": function(e, data) {
                    sn.$("html, body").animate({scrollTop: sn.$(document).height()}, 10000);
                },
                "": function(e, data) {

                }
            });
        };

    }

    sn.registry("speech_manager", new speechManager());

})(window, window.speechnav);