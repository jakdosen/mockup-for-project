/**
 * User: Gavin.Li
 * Date: 5/16/13
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        data = require("./data");

    var ItemModel = Backbone.Model.extend({});

    var ItemList = Backbone.Collection.extend({
        model : ItemModel
    });

    var ItemView = Backbone.View.extend({
        tagName: "tr",
        className: "",
        template :_.template($('#provider-tpl').html()),
        events: {
            "click .tt":"operate"
        },
        initialize: function () {
            this.render();
        },
        render : function () {
            var model = this.model;
            model.set("status",data.status[1*(model.get("status"))]);
            this.$el.html(this.template(this.model.toJSON()));
        },
        operate:function () {   // button operate

        }
    });

    var AppView = Backbone.View.extend({
        initialize : function(renderTarget){
            this.renderTarget = renderTarget;
            this.collection = new ItemList();
            this.collection.bind("add", this.renderOne, this);
            this.collection.bind("reset", this.renderAll, this);
            this.getData();
        },
        renderOne : function(item){
            var itemView = new ItemView({model:item});
            this.renderTarget.append(itemView.el);
        },
        renderAll : function(){
            this.renderTarget.empty();
            this.collection.each($.proxy(this.renderOne,this));
        },
        getData : function () {
            var arr = _.filter(data.data, function(item){ return item.status !== 0;})
            this.collection.reset(arr);
        }

    });

    return {
        init:function () {
            new AppView($("#specsTableContainerTbody"));
        }
    }

});