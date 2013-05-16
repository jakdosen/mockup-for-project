/**
 * User: Bob Bao
 * Date: 5/16/13
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        data = require("./data");

    var ItemModel = Backbone.Model.extend({});

    var ItemList = Backbone.Collection.extend({
        model : ItemModel,
        initialize : function(models, url, path){
            this.url = url;
            this.path = path;
        },
        parse : function(resp, xhr){
            return eval("resp." + this.path);
        }
    });

    var ItemView = Backbone.View.extend({
        tagName: "tr",
        className: "",
        template :_.template($('#buyer-tpl').html()),
        render : function () {
            var model = this.model;
            model.set("status",data.status[1*(model.get("status"))]);
            this.$el.html(this.template(this.model.toJSON()));
        },
        initialize : function () {
            this.render();
        }/*,
        events : {

        }*/

    });

    var AppView = Backbone.View.extend({
        initialize : function(url, renderTarget){
            this.renderTarget = renderTarget;
            this.collection = new ItemList();
            this.collection.bind("add", this.renderOne, this);
            this.collection.bind("reset", this.renderAll, this);
            this.getData();
        },
        renderOne : function(item){
            var itemView = new ItemView({model:item});
            $(this.renderTarget).append(itemView.el);
        },
        renderAll : function(){
            $(this.renderTarget).empty();
            this.collection.each($.proxy(this.renderOne,this));
        },
        getData : function () {
            this.collection.reset(data.data);
        }

    });

    return {
        init:function () {
            new AppView("", "#buyer-sp");
        }
    }
});