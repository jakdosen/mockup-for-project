/**
 * User: Gavin.Li
 * Date: 5/16/13
 */
;define(function(require, exports, module){
        var $ = require("jquery"),
            _ = require("underscore"),
            Backbone = require("backbone"),
            data = require('./data');

    var ItemModel = Backbone.Model.extend({

    });

    var ItemList = Backbone.Collection.extend({
        model:ItemModel
    });

    var ItemView = Backbone.View.extend({
        tagName:"tr",
        template:_.template($('#provider-tpl').html()),
        render:function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        initialize:function () {
            this.render();
        },
        events:{
        },
        operate:function () {   // button operate

        }
    });

    var AppView = Backbone.View.extend({
        initialize:function (renderTarget) {
            this.renderTarget = renderTarget;
            //this.setElement($('#specsTableContainer'));
            this.collection = new ItemList();
            this.collection.bind("add", this.renderOne, this);
            this.collection.bind("reset", this.renderAll, this);
            this.getData();
        },
        events:{

        },
        renderOne:function (item, index) {
            var itemView = new ItemView({model:item});
            $(this.renderTarget).append(itemView.el);
        },
        renderAll:function () {
            $(this.renderTarget).empty();
            this.collection.each($.proxy(this.renderOne, this));
        },
        getData:function () {
            debugger;
            this.collection.reset(data);
        }
    });

    return {
        init:function () {
            new AppView("#specsTableContainerTbody");
        }
    }

});