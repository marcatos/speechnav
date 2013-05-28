(function(w, sn) {

    var recognition = function() {

        var self = this;

        this._rec = new webkitSpeechRecognition();
        this._rec.lang = sn._lang;

        this.init = function() {
            self._rec.onresult = self.manageResult;
        }

        this.manageResult = function(e) {

            for (var i = e.resultIndex; i < e.results.length; ++i) {
                var data = {t: sn.$.trim(e.results[i][0].transcript), isFinal: !!e.results[i].isFinal};
                console.log(data);
                sn.$(w).triggerHandler("result_received.speechnav", data);
            }

        };

        this.start = function() {
            self._rec.start();
        };

        this.stop = function() {
            self._rec.stop();
        };

        this.init();

    };


    sn.registry("recognition", new recognition());


})(window, window.speechnav);