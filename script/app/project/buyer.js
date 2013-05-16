/**
 * User: Bob Bao
 * Date: 5/16/13
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        popup = require("./popup"),
        data = MP.data,
        ev = MP.event;

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
        events : {
            "click .gear" : "dropDown",
            "change select" : "selectOpt"
        },
        render : function () {
            var model = this.model;
            model.set("status",data.status[1*model.get("status")]);
            this.$el.html(this.template(model.toJSON())).css("text-align","center");
        },
        initialize : function () {
            this.render();
            this.model.bind("change",this.render,this);
        },
        dropDown : function(e){
            $(e.target).hide();
            this.$el.find("select").show();
        },
        selectOpt : function(e){
            var opt = $(e.target).val();
            if(opt == "0"){
                 popup.open(this.model.toJSON(), 0, 0);
            }else{
                 popup.open(this.model.toJSON(), 1 ,0);
            }
        }

    });

    var AppView = Backbone.View.extend({
        initialize : function(url, renderTarget){
            this.renderTarget = renderTarget;
            this.collection = new ItemList();
            this.collection.bind("add", this.renderOne, this);
            this.collection.bind("reset", this.renderAll, this);
            this.getData();
            ev.bind("Buyer.Add", this.add, this);
            ev.bind("Buyer.Update", this.update, this);
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
        },
        add : function(item){
            item.id = this.collection.length+1;
            this.collection.add(item);
        },
        update : function(item){
            this.collection.each(function(it){
                if(it.get("id") === item.id){
                    it.reset(item);
                    return;
                }
            });
        }

    });

    return {
        init:function () {
            new AppView("", "#buyer-sp");
        }
    }
});