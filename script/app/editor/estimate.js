;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone");
    require("jquery.ui");

    var estimate = {
        title:"Estimate for April Promotion",
        completionDate:"08/01/2013",
        description:"lalala",
        comments:"lelele",
        quotes:[
            {
                productName:"Printed Product",
                quantity:[2500,5000,10000]
            },
            {
                productName:"Retail Display",
                quantity:[50,100,300]
            },
            {
                productName:"Brochures",
                quantity:[2500,5000,10000]
            }
        ]
    };

    var ItemModel = Backbone.Model.extend({
        sync:function () {
            return true;
        },
        clear:function () {
            this.destroy();
        }
    });
    var EstimatePopupView = Backbone.View.extend({
        create:function(){       },
        initialize:function(){
            this.model.bind("add",this.render,this);
//            this.render();
//            this.calculate();
        },
        render:function(){
            this.$el.html(_.template(this.$el.html(),this.model.toJSON()));
            var that = this;
            _.each(this.model.get("quotes"),function(quote){
                that.$("#specs .quotes").append(_.template(
                    ['<dl class="pop-tab-dl clear">',
                        '<dt class="left"><%=productName%>:</dt>',
                        '<%_.each(quantity,function(q){%>',
                        '<dd class="left"><div><%=q%></div><div><input type="text" value="200"/></div> </dd>',
                        '<%})%>',
                        '</dl>'].join(''),
                    quote
                ))
            })
        },
        events:{
            "change .quotes input":"calculate",
            "change #shippingRate":"calculate",
            "change #taxRate":     "calculate"
        },
        calculate:function(e){
            //validation
            if(e && isNaN($(e.target).val())){
                alert("Please input a number!");
                $(e.target).focus().select();
                return;
            }
            this.totals = [];// initial calculation
            this.shippings = [];
            this.taxes = [];
            var dls = this.$("#specs .quotes").find("dl");
            var n,quotes=[];
            for (n = 0;n < 3; n++){
                var quote=[];
                _.each(dls, function (dl) {
                        var input = $(dl).find("dd").eq(n).find("div input");
                        quote.push(input.val()-0);
                    }
                );
                quotes.push(quote);
            }
            var additional = this.$("#specs .additional").find("dl");
            var totalPrice = additional.eq(0);
            var estimatedShipping = additional.eq(1);
            var tax = additional.eq(2);
            this.setTotalPrice(totalPrice,quotes);
            this.setEstimatedShipping(estimatedShipping);
            this.setTax(tax);
            this.setGrandTotal();
        },
        sum: function (list,start) {
            var init = start || 0;
            return _.reduce(list, function(memo, num){ return memo + num; }, init);
        },
        setTotalPrice: function (totalPrice,quotes) {
            var that = this;
            var dds = totalPrice.find("dd");
            _.each(dds, function (dd,i) {
                    var total = that.sum(quotes[i]);
                    that.totals.push(total);
                    $(dd).find("input").val(total);
                }
            )
        },
        setEstimatedShipping:function(estimatedShipping){
            var rate = $("#shippingRate").val();
            if(isNaN(rate)){
                alert("Please input a number!");
                return;
            }
            rate = rate/100;
            var dds = estimatedShipping.find("dd");
            var that = this;
            _.each(dds, function (dd,i){
                var shipping = that.totals[i]*rate;
                that.shippings.push(shipping);
                $(dd).find("input").val(shipping);
            })
        },
        setTax: function(tax){
            var rate = $("#taxRate").val();
            if(isNaN(rate)){
                alert("Please input a number!");
                return;
            }
            rate = rate/100;
            var dds = tax.find("dd");
            var that = this;
            _.each(dds, function (dd, i){
                var tax = that.totals[i]*rate;
                that.taxes.push(tax);
                $(dd).find("input").val(tax);
            });
        },
        setGrandTotal:function(){
            var dds = this.$("#specs .total").find("dl dd");
            var that = this;
            _.each(dds, function(dd, i){     debugger;
                var grandTotal = that.sum([that.totals[i],that.shippings[i],that.taxes[i]]);
                $(dd).find("input").val(grandTotal);
            })
        }


    });
    var AppView = Backbone.View.extend({
        el:document.body,
       /* events:{
            "click #createEstimateButton":"createEstimate"
        },*/
        initialize:function(){
            this.createEstimatePopupTPL = $("#estimate-popup-tpl").html();
            this.createEstimate();
        },
        createEstimate:function(){
            $(this.createEstimatePopupTPL).dialog({
                title: 'Request Estimates From Suppliers',
                closeOnEscape: false,
                autoOpen: true,
                height: 680,
                width: 800,
                modal: true,
                resizable: false,
                buttons: {
                    'cancel': function(){$(this).dialog( "close" );},
                    'Save as Draft': function(){$(this).dialog( "close" );},
                    'Send RFE': function () {
                        this.estimatePopupView.create();
                    }
                },
                create:function(){
                    this.estimatePopupView = new EstimatePopupView({model: (new ItemModel()).set(estimate)}).setElement($(this));
                    this.estimatePopupView.render();
                    this.estimatePopupView.calculate();

                },
                close: function () {
                    $(this).dialog('destroy');
                }
            });
        },
        addEstimate:function(){

        }
    });
    new AppView;
});
