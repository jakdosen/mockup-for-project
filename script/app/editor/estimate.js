;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone");
    require("jquery.ui");
    require("./currency");
    var currency = "USD";

    var estimate = {
        title:"Estimate for April Promotion",
        completionDate:"08/01/2013",
        description:"lalala",
        comments:"lelele",
        quotes:[
            {
                productName:"Printed Product",
                quantity:[500,1000,2500,5000,10000]
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
//            this.$el.html(_.template(this.$el.html(),this.model.toJSON()));
            this.renderBasic();
            this.renderQuotes();
            this.renderAdditional();
        },
        renderBasic: function () {
             this.$("#basic").html(_.template(
                 ['<div class="left">',
                     '<dl class="pop-tab-dl"><dt>Quote Title:</dt> <dd><input type="text" value="<%=title%>"/></dd></dl>',
                     '<dl class="pop-tab-dl"><dt>Completion Date:</dt> <dd><input type="text" value="<%=completionDate%>"/></dd></dl>',
                     '<dl class="pop-tab-dl"><dt>Description:</dt> <dd><textarea name="desc" rows="4" cols="20" ><%=description%></textarea></dd> </dl>',
                   '</div>',
                   '<div class="left">',
                     '<dl class="pop-tab-dl">   <dt>Comments:</dt> <dd><textarea name="comments" rows="8" cols="30" ><%=comments%></textarea></dd></dl>',
                   '</div><div class="clear"></div>'].join(''),
                 this.model.toJSON()
             ))
        },
        renderQuotes: function () {
            var that = this;
            _.each(this.model.get("quotes"),function(quote){
                that.$("#specs .quotes").append(_.template(
                    ['<dl class="pop-tab-dl clear">',
                        '<dt class="left"><%=productName%>:</dt>',
                        '<%_.each(quantity,function(q){%>',
                        '<dd class="left"><div><%=q%></div><div><input type="text" value=""/></div> </dd>',
                        '<%})%>',
                        '</dl>'].join(''),
                    quote
                ))
            })
        },
        renderAdditional: function () {
            var quotes = this.model.get("quotes");
            var q = _.max(quotes, function (quote) {
                return quote.quantity.length;
            });
            var cell = '<dd class="left"><div><input type="text" value="" readonly="true"/></div> </dd>';
            for(var i = 0; i < q.quantity.length; i++){
                this.$("#specs .additional .pop-tab-dl").append(cell);
                this.$("#specs .grand-total .pop-tab-dl").append(cell);
                this.$("#specs h2").append('<span>Quantity '+ (i+1) +'</span>');
            }
        },
        events:{
            "keyup .quotes input":"restrict2bits",
            "focus .quotes input":"convertCurrency",
            "blur .quotes input":"calculate",
            "change #shippingRate":"calculate",
            "change #taxRate":     "calculate"
        },
        restrict2bits: function (e) {
            var input = e.target;
            var idx = input.value.indexOf(".");
            if(idx != -1){
                input.value = input.value.substring(0,idx+3);
            }
        },
        convertCurrency: function (e) {
            $(e.target).val(Currency.reconvert($(e.target).val(),currency)).select();
        },
        calculate:function(e){
            //validation
            if(e && isNaN($(e.target).val())){
                alert("Please input a number!");
                setTimeout(function () {$(e.target).focus()},100);
                return;
            }
            this.totals = [];// initial calculation
            this.shippings = [];
            this.taxes = [];
            var dls = this.$("#specs .quotes").find("dl");
            var n,quotes=[];
            for (n = 0;n < 5; n++){
                var quote=[];
                _.each(dls, function (dl) {
                        var dd = $(dl).find("dd").eq(n);
                        if(dd.length){
                            var input = dd.find("div input");
                            quote.push(Currency.reconvert(input.val(),currency));
                        }
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
            _.each(this.$("#specs dd input"),function(input){
                input.value = Currency.convert(input.value, currency);
            })
        },
        sum: function (list,start) {
            var init = start || 0;
            return _.reduce(list, function(memo, num){ return memo + num; }, init);
        },
        setTotalPrice: function (totalPrice,quotes) {
            var that = this;
            var dds = totalPrice.find("dd");
            _.each(dds, function (dd,i) {
                    var total = that.sum(quotes[i] || 0);
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
            var dds = this.$("#specs .grand-total").find("dl dd");
            var that = this;
            _.each(dds, function(dd, i){
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
                height: 700,
                width: 805,
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
