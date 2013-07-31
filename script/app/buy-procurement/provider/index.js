/**
 * Created with JetBrains WebStorm.
 * User: Gavin.Li
 * Date: 7/31/13
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
define(function(require,exports){
    var
        data = top.data,
        $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        ev = top.ev;
    require("jquery.ui");
    $(".job-tab-view").tabs({ active: 2 });

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

            this.suppliers = new (Backbone.Collection.extend({
                initialize:function(){
                    this.bind("add")
                }
            }));
        },
        searchSupplier:function(){

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
            this.createEstimatePopupTPL = $("#estimate-popup-tpl").html();
            ev.bind("add.estimate",this.addEstimate,this);
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
});
