/**
 * User: Gavin.Li
 * Date: 7/31/13
 */
define(function(require,exports){
    var
        data = top.data,
        $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        ev = top.ev;
    require("jquery.ui");


    var ItemModel = Backbone.Model.extend({
        sync:function () {
            return true;
        },
        clear:function () {
            this.destroy();
        }
    });
    /**
     * EstimatePopupView
     * @type {*}
     */
    var EstimatePopupView = Backbone.View.extend({
        events:{
            "click .create-project-search-button":"searchSupplier"
        },
        initialize:function(){
            var parentView = this;
            var _View = this.SupplierView = Backbone.View.extend({
                tagName:"div",
                template: _.template("<span><%=name%> - <%=email%></span>"),
                render:function(){
                    this.$el.append(this.template(this.model.toJSON()));
                },
                initialize:function(){
                    this.render();
                    this.model.bind("destroy",this.remove,this);
                }
            });
            this.suppliers = new (Backbone.Collection.extend({
                model:ItemModel,
                initialize:function(){
                    this.bind("add",this.addOne,this);
                    this.bind("reset", this.addAll, this);
                },
                addOne:function(supplier){
                    parentView.$el.find(".create-project-customer-input").append(new _View({model:supplier}).el);
                },
                addAll:function () {
                    this.each(this.addOne) ;
                }

            }));
        },
        searchSupplier:function(){
            var
                val = $.trim($("#customerNameorEmail").val()),
                reg,
                findVal;
            if(val){
                findVal = _.filter(data.supplier,function(supplier,key){
                    reg = new RegExp(val,'i');
                    return reg.test(supplier["name"])||reg.test(supplier["email"]);
                });
                if(findVal&&findVal.length){

                    this.$el.find(".create-project-client-email").show();
                    this.suppliers.add(findVal);
                }
            }
        },
        verify:function(){

        },
        create:function(){
            EstimatePopupView.id++;
        },
        renderProduct:function(){

        }
    });
    //static property
    EstimatePopupView.id = 1;

    /**
     *  AppView
     * @type {*}
     */
    var AppView = Backbone.View.extend({
        el:document.body,
        events:{
            "click #createEstimateButton":"createEstimate"
        },
        initialize:function(){
//            this.createEstimatePopupTPL =  require("./tpl/createEstimatePopup.tpl");
            $(".job-tab-view").tabs({ active: 2 });
            this.createEstimatePopupTPL = $("#estimate-popup-tpl").html();
            try{ev.bind("add.estimate",this.addEstimate,this)}catch(e){};
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
                      this.estimatePopupView = new EstimatePopupView().setElement($(this));

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
    //need to change to event pattern
    require.async("./rfe.js");
});
