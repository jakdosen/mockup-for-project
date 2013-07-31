;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        data = top.data;
    _.each(data.product, function(product){
        product.supplier = data.supplier;
    });

    var ItemModel = Backbone.Model.extend({});
    var ItemList = Backbone.Collection.extend({ model : ItemModel });
    var ProductView = Backbone.View.extend({
        model : ItemModel,
        tagName: "li",
        template: _.template($("#product-tpl").html()),
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    var RfeView = Backbone.View.extend({
        model : ItemModel,
        tagName: "li",
        template: _.template($("#rfe-tpl").html()),
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    var AppView = Backbone.View.extend({
        initialize:function(url,renderTarget,element){
            $(renderTarget).html($(element).html());
            this.setElement($("#buying"));
            this.products = new ItemList();
            this.products.bind("add", this.renderProduct, this);
            this.products.bind("reset", this.renderProducts, this);
            this.rfes = new ItemList();
            this.rfes.bind("add", this.renderRfe, this);
            this.rfes.bind("reset", this.renderRfes, this);
            this.getData();
        },
        renderProducts:function(){
            this.products.each($.proxy(this.renderProduct,this));
        },
        renderProduct:function(item){
            var productView = new ProductView({model:item});
            this.$("#products").append(productView.el);
        },
        renderRfes:function(){
            this.rfes.each($.proxy(this.renderRfe,this));
        },
        renderRfe:function(item){
            var rfeView = new RfeView({model:item});
            this.$("#rfes").append(rfeView.el);
        },
        getData:function(){
            this.products.reset(data.product);
            this.rfes.reset(data.estimate);
        }

    });

    new AppView("","#jobBuying9443887","#buying-view");

});
