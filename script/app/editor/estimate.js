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
            this.render();
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
            "change .quotes input":"calculate"
        },
        calculate:function(e){
            //validation
            if(isNaN($(e.target).val())){
                alert("Please input a number!");
                return;
            }

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

        },
        sum: function (list,start) {
            var init = start || 0;
            return _.reduce(list, function(memo, num){ return memo + num; }, init);
        },
        setTotalPrice: function (totalPrice,quotes) {
            var that = this;
            var dds = totalPrice.find("dd");
            _.each(dds, function (dd,i) {
                    $(dd).find("input").val(that.sum(quotes[i]) );
                }
            )
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
