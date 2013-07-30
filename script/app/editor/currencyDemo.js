;define(function(require, exports, module){
    require("./currency.js");
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone");

    var data = [{ name: "USD", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "EUR", symbol: "$", precision: 2, thousand: ".", decimal: ".", format: "%s %v"},
                { name: "GBP", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "CAD", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "AUD", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "NZD", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "ZAR", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "INR", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "CNY", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "HKD", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "AED", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "THB", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "IDR", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "PHP", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "VND", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "SAR", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "PKR", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
                { name: "NGN", symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"}
                ];
    var Item = Backbone.Model.extend({});
    var ItemList = Backbone.Collection.extend({ model : Item });
    var ItemView = Backbone.View.extend({
        model: Item,
        template: _.template($('#currency-tpl').html()),
        render: function(){
            var model = this.model;
            this.$el.html(this.template(model.toJSON())).attr("value",model.get("name"));
        },
        initialize:function(){
            this.render();
        }
    });
    var AppView = Backbone.View.extend({
        initialize: function(url, renderTarget){
            this.setElement($("#currencyDemo"));
            this.renderTarget = renderTarget;
            this.collection = new ItemList();
            this.collection.bind("add", this.renderOne, this);
            this.collection.bind("reset", this.renderAll, this);
            this.getData();
        },
        renderOne: function(item){
            var itemView = new ItemView({model:item});
            $(this.renderTarget).append(itemView.el);
        },
        renderAll: function(){
            //$(this.renderTarget).empty();
            this.collection.each($.proxy(this.renderOne,this));
        },
        getData : function(){
            this.collection.reset(data);
        }
    });

    new AppView("", "#currency-select");

});
