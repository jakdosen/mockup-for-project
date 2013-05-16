/**
 * User: Gavin.Li
 * Date: 5/16/13
 * Module: popup
 */
;define(function(require, exports, module){
    var $ = require("jquery"),
        _ = require("underscore"),
        MP = window.MP,
        ev = MP.event,
        data = MP.data.data,
        Backbone = require("backbone"),
        undefined,
        id = 6,
        dataModel = {
            'id':0,
            'name':'',
            'owner':'',
            'status':0,
            'completionDate':'',
            'CreationDate':'',
            'desc':'',
            'recent':''
        };
    require("jquery.ui");
    require("jsrender");
    var itemView = Backbone.View.extend({
        tagName:"div",
        template:_.template($("#popup-tpl").html()),
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            var
                buttonTextArr = "Create,Save,Submit".split(","),
                ownerTypeArr = "Buyer,Service".split(","),
                optTypeArr = "Add,Update".split(","),
                model = this.model.toJSON(),
                btn1txt = buttonTextArr[model.type + model.ownerType],
                actionKey =[ownerTypeArr[model.ownerType],optTypeArr[model.type]].join(".");

            var buttons = [
                {
                    text: btn1txt,
                    click: function() {
                        var
                            nameIpt = $( this).find("[name='name']"),
                            completionDateIpt = $( this).find("[name='completionDate']"),
                            descIpt = $( this).find("[name='desc']"),
                            ownerIpt = $( this).find("[name='ownerIpt']");
                        if(!nameIpt.val()) return
                        var addData = _.extend({},dataModel,model,{
                            name:nameIpt.val(),
                            owner:ownerIpt.val(),
                            status:[0,1,2][Math.ceil(Math.random()*10%2)],
                            completionDate:completionDateIpt.val(),
                            desc:descIpt.val()
                        });
                        model.type == 0&&(addData.id=id++);

                        data.push(addData);
                        var cp =ownerTypeArr.slice(0);
                        cp.push("");
                        //make 'Buyer.Create Service.Create'
                        ev.trigger(cp.join("."+buttonTextArr[0]+" "),addData);
                        console.log(cp.join("."+buttonTextArr[0]+" "));
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: 'cancel',
                    click: function() {

                        $( this ).dialog( "close" );
                    }
                }
            ];

            if(model.ownerType===0){
                buttons.splice(1,0,{
                    text: 'Save as Draft',
                    click: function() {
                        var
                            nameIpt = $( this).find("[name='name']"),
                            completionDateIpt = $( this).find("[name='completionDate']"),
                            descIpt = $( this).find("[name='desc']"),
                            ownerIpt = $( this).find("[name='owner']");
                        if(!nameIpt.val()) return
                        var addData = _.extend({},dataModel,model,{
                            name:nameIpt.val(),
                            owner:ownerIpt.val(),
                            status:[0,1,2][Math.ceil(Math.random()*10%2)],
                            completionDate:completionDateIpt.val(),
                            desc:descIpt.val()
                        });
                        model.type == 0&&(addData.id=id++);

                        data.push(addData);
                        ev.trigger(actionKey,addData);
                        console.log(actionKey);
                        $( this ).dialog( "close" );
                    }
                })
            }
            this.$el.dialog({
                resizable: false,
                height:300,
                width:600,
                modal: true,
                create:function(){

                },
                buttons: buttons,
                close:function(){
                    $(this).remove();
                }
            });
        },
        initialize:function(){
            this.render();
            return this;
        }
    });

    return{
        /**
         * open
         * @param data
         * @param type 0:copy 1:editor
         * @param ownerType 0:buyer 1:service
         */
        open:function(data,type,ownerType){
            data = data||{};
            data.type = type == undefined?0:type;
            data.ownerType = ownerType == undefined?0:ownerType;
            new itemView({model:new Backbone.Model(data)});
        }
    }
});