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
            this.addedSupplier = [];
            var _View = this.SupplierView = Backbone.View.extend({
                tagName:"li",
                template: _.template("<div style='padding: 3px;background: <%print(isAdded?'#6FC6D1':'#FFF')%>' class='row-supplier'><span><%=name%> - <%=email%></span> \
                    <a href='javascript:;' style='color: blue;text-decoration: underline' class='addUser <%if(isAdded){print('hide')}%>'>add</a>\
                    <a href='javascript:;' style='color: blue;text-decoration: underline' class='removeUser <%if(!isAdded){print('hide')}%>'>remove</a>\
                    <%if(!isSignUp){%>\
                     - This is a new supplier,\
                    <a href='javascript:;' style='color: blue;text-decoration: underline' class='inviteUser'>invite</a>\
                     now\
                    <%}%></div>\
                    "),
                events:{
                    "click a.addUser":"addSupplier",
                    "click a.removeUser":"removeSupplier",
                    "click a.inviteUser":"inviteSupplier"
                },
                render:function(){
                    this.model.set("isAdded",this.checkSupplier());
                    var supplierData = this.model.toJSON();

                    this.$el.append(this.template(this.model.toJSON()));
                    this.model.bind("change:isAdded",function(){
                        var isAdded = this.model.get("isAdded");
                        this.$el.find("a.addUser")[isAdded?"hide":"show"]();
                        this.$el.find("a.removeUser")[!isAdded?"hide":"show"]();
                        this.$el.find("div.row-supplier").css("background",(isAdded?'#6FC6D1':'#FFF'));
                    },this);
                },
                initialize:function(){
                    this.render();
                    this.model.bind("destroy",this.remove,this);
                },
                checkSupplier:function(){
                    var curSupplier = this.model.toJSON();
                    return !!_.find(parentView.addedSupplier,function(supplierId){return curSupplier.id == supplierId});
                },
                addSupplier:function(){
                    if(!this.checkSupplier()){
                        parentView.addedSupplier.push(this.model.get("id"));
                        this.model.set("isAdded",true);
                    }
                },
                removeSupplier:function(){
                    parentView.addedSupplier = _.without(parentView.addedSupplier,this.model.get("id"));
                    this.model.set("isAdded",false);
                },
                inviteSupplier:function(){
                    if(!this.model.get("isInvited")){
                        ev.trigger("add.newFrame","supplier/sign-up.html?userId="+this.model.get('id'));
                        this.model.set("isInvited",true);
                    }
                }
            });
            this.searchSuppliers = new (Backbone.Collection.extend({
                model:ItemModel,
                initialize:function(){
                    this.bind("add",this.addOne,this);
                    this.bind("reset", this.addAll, this);
                },
                addOne:function(supplier){
                    parentView.$el.find(".search-supplier-result").append(new _View({model:supplier}).el);
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
                    this.searchSuppliers.add(findVal);
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
