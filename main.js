(function(w) {

    var speechnav = function(options) {

        var self = this;

        this._base = null;
        self._registry = {};
        self._options = {
            debug: true
        };
        self._lang = (navigator.language) ? navigator.language : navigator.userLanguage;
        self._lang = "en";

        if (typeof(options) === 'object') {
            for (var i in options) {
                self._options[i] = options[i];
            }
        }

        self.include = function(p, clbk, b) {
            var h = document.getElementsByTagName('head')[0], s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = (b !== undefined) ? b : self._base + p;
            s.onreadystatechange = clbk;
            s.onload = clbk;
            h.appendChild(s);
        };

        self.registry = function(key, obj) {
            if (key in self._registry) {
                self.log('key [' + key + '] already present in registry: ', self._registry[key]);
                return false;
            }
            self._registry[key] = obj;
        };

        self.register = function(key) {
            if (!key in self._registry) {
                self.log('key [' + key + '] not found in registry');
                return false;
            }
            return self._registry[key];
        };

        self.log = function() {
            if (self._options && self._options.debug) {
                return w.console && console.log.call(console, arguments);
            }
        };

        self.init = function() {
            self.loadBase();
            if (!self.isCapable())
                return false;

            if (self._options.includejQuery) {
                self.include("lib/jquery-2.0.1.min.js", self.prepare);
            } else {
                self.prepare();
            }
            self.include("lib/webkitSpeechRecognition.js");
            self.loadDictionary();

            self.include("lib/speechManager.js", function() {
                self.register("speech_manager").ready();
            });

            self.log(self);
        };

        self.loadDictionary = function() {
            sn.include("dictionary/_def.js", function() {
                sn.include("dictionary/" + self._lang + ".js");
            });
        };


        self.prepare = function() {
            self.$ = $;
            $.noConflict();
            self.$(function() {
                self.ready();
            });
        };

        self.isCapable = function() {
            if (!('webkitSpeechRecognition' in w)) {
                alert("Now only Chrome 21 and above support Web Speech API, consider to upgrade!");
                return false;
            }
            return true;
        };

        self.loadBase = function() {
            var scripts = document.getElementsByTagName('script');
            var index = scripts.length - 1;
            var myScript = scripts[index];
            var tmp = myScript.src.split("/");
            tmp.pop();
            self._base = tmp.join("/") + "/";
        };

        self.ready = function() {

        };



    };

    var sn = new speechnav({
        includejQuery: !("jQuery" in w)
    });
    try {
        if (w.addEventListener) {
            w.addEventListener('load', sn.init, false);
        } else if (w.attachEvent) {
            w.attachEvent('onload', sn.init);
        } else {
            throw "Can't bind load event";
        }
    } catch (e) {
        sn.log(e);
    }

    w.speechnav = sn;

})(window);