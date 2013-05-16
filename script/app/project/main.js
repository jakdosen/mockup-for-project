/**
 * User: Gavin.Li
 * Date: 5/15/13
 * Module: project/main
 */
;define(function(require, exports, module){
    //load css
    require("./../load-css");

    var
        MP = {},
        _ = require("underscore"),
        Backbone = require("backbone");

    window.MP = MP;
    /**
     * MP event center
     * It is used to subscribe module event and  publish event cross module.
     * @type {*}
     */
    MP.event = _.extend({}, Backbone.Events, {
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
    /**
     * MP.load function
     * @param {Object} modules
     * @param {Object} after -- This callback will be invoked when the module is loaded.
     */
    MP.load = function (modules, after) {
        var len;
        modules = modules || [];
        if (!_.isArray(modules)) {
            modules = [modules];
        }
        len = modules.length;
        _.each(modules, function (m, k) {
            _.isString(m)&&(m={"module":m});
             require.async(m["module"], function (mod, args) {
                args = m["arguments"] || [];
                if (mod && mod.init) {
                    !_.isArray(args) && ( args = [args]);
                    mod.init.apply(mod, args);
                }
                --len || (_.isFunction(after) && after(mod));
            });
        });
    };
     MP.load("./buyer");
     MP.load("./service-provider");

});
