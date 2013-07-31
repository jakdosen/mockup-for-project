/**
 * Created with JetBrains WebStorm.
 * User: Gavin.Li
 * Date: 7/31/13
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
define(function(require,exports){
    var
        root = this,
        $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        ev;
    require("jquery.ui");
    root.data = require("./data");
    /**
     * event center
     * It is used to subscribe module event and  publish event cross module.
     * @type {*}
     */
    ev = root.ev = _.extend({}, Backbone.Events, {
        bind: function () {
            this.on.apply(this, arguments);
        },
        unbind: function () {
            this.off.apply(this, arguments);
        },
        installTo: function (obj) {
            obj.bind = _.bind(this.on, this);
            obj.unbind = _.bind(this.off, this);
        }
    });


    initMain:{
        window.frames["provider"].location = "provider/index.html";
        ev.bind("add.newFrame",(function(){
            $('.container.resizable').resizable({
                handles: 'n, w'
            });
            return arguments.callee;
        })());

        ev.bind("add.newFrame",function(url){
            $(document.body).append('\
            <div class="container resizable">\
                <iframe src="' + url + '"></iframe>\
            </div>\
            ');
        });
    }

});
