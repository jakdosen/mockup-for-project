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
/*        $ = require("jquery"),*/
        _ = require("underscore"),
        Backbone = require("backbone"),
        ev;

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
        ev.bind("open.supplier1",function(){
            window.frames["supplier1"].location = "supplier/supplier1.html";
        });
        ev.bind("invite.supplier2",function(){
            window.frames["supplier2"].location = "supplier/sign-up.html";
        });
    }

});
