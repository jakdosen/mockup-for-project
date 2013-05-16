/**
 * User: Gavin.Li
 * Date: 5/16/13
 * Module: popup
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        ev = PM.event,
        Backbone = require("backbone");
    require("jquery.ui");
    require("jsrender");

    var itemView = Backbone.View.extend({
        tagName:"div",
        events:{

        },
        template:_.template($("#productEditorCellAttr").html()),
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el..dialog({
                resizable: false,
                height:140,
                modal: true,
                buttons: {
                    "Delete all items": function() {
                        $( this ).dialog( "close" );
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        },
        initialize:function(){
            this.render();
            return this;
        }
    });

    return{
        open:function(data,type){
            new itemView({model:new Backbone.Model(data)});
        }
    }
});