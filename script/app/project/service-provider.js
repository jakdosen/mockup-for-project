/**
 * User: Robin.Zhou
 * Date: 5/16/13
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        ev = window.MP.event,
        Backbone = require("backbone"),
        popup = require("./popup");

    var ItemModel = Backbone.Model.extend({});

    var ItemList = Backbone.Collection.extend({
        model : ItemModel
    });

    var ItemView = Backbone.View.extend({
        tagName: "tr",
        className: "",
        template :_.template($('#project-tpl').html()),
        events: {
            "click .gear": "operate",
            "change select": "change",
            "click ul.gear-option>li": "launchPopup"
        },
        initialize: function () {
            this.render();
        },
        render : function () {
            var model = this.model;
            model.set("status",MP.data.status[1*(model.get("status"))]);
            this.$el.html(this.template(this.model.toJSON()));
        },
        operate:function (e) {   // button operate
            var target = $(e.target);
            if(target.hasClass("gear")){
                target.next().toggle();
                target.next().mouseleave(function(){
                   $(this).hide();
                });
            }
        },
        change:function (e) {   // button operate
            var changeVal = e.target.value;
            if(!changeVal) return;
            parseInt(changeVal) === 0 ? popup.open(this.model.toJSON(), 0, 1) : popup.open(this.model.toJSON(), 1, 1) ;
        },
        launchPopup: function(e){
            var target = $(e.target);

            if(target.is('li')){
                var action = $(e.target).html();
                target.parent().hide(); //hide the ul
                if(action == 'Copy'){
                    popup.open(this.model.toJSON(), 0, 0);
                }else{
                    popup.open(this.model.toJSON(), 1 ,0);
                }
            }
        }
    });

    var AppView = Backbone.View.extend({
        initialize : function(renderTarget){
            ev.bind("Service.Add", this.getData,this);
            ev.bind("Service.Update", this.getData,this);
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
            var arr = _.filter(MP.data.data, function(item){ return item.status !== 0;})
            this.collection.reset(arr);
        }

    });

    return {
        init:function () {
            new AppView($("#specsTableContainerTbody"));
        }
    }

});