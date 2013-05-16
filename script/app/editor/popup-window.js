/**
 * User: Gavin.Li
 * Date: 5/15/13
 */
;
define(function (require, exports, module) {
    var $ = require("jquery"),
        editor = require("./editor"),
        originalContent = "";
    require("jquery.ui");
    require("jquery.form");
    require("jquery.autocomplete");
    require("jquery.validate");
    require("jquery.qtip");
    require("jsrender");
    require("jquery.multiselect");
    require("jquery.roundabout-shapes");
    require("jquery.tag");

    if (originalContent.length == 0) {
        originalContent = $('#productEditorPopup').html();
    }

    $("#advancedEditor,#serviceSpecsTable .customize-spec").click(function () {
        $('#productEditorPopup').dialog({
            title: 'Create Product',
            closeOnEscape: false,
            bgiframe: false,
            autoOpen: true,
            height: 680,
            width: 1230,
            modal: true,
            resizable: false,
            buttons: {
                'loading': function () {}
            },
            create: function () {
                $('#peMainTabs').show();
                $("#peTemplateScrollList").hide();

                initTables:{
                    $('#peMainTabs').show().tabs({active: 1});
                    $('#peMainTabs').tabs('select', 1);
                }
                initDrawButtons:{
                    $('#productEditorPopup').next().children('.ui-dialog-buttonset').html('<div id="productEditorNextButton" class="sp-simple-button" style="float: right;">Save</div>');
                }
                ddTabsMgr_initTabs:{
                    $('#peCustomizationTabs').tabs({
                        tabTemplate: "<li domId='test'><a href='#{href}'>#{label}</a> <div class='ui-icon ui-icon-edit pe-tab-edit'></div></li>"
                    });
                }
                ddTabsMgr_initDelegations:{
                    $('#productEditorPopup .pe-tab-edit').die().live('click', function(){
                        var $ahref 		= $(this).prev(),
                            hrefVal		= $ahref.attr('href'),
                            tabDomId	= hrefVal.substr(1),
                            originalCont = $('#productEditorCellAttr').html();
                        //productEditorCellAttr
                        $('#productEditorCellAttr').dialog({
                            title: 		'Set Tab Attributes',
                            closeOnEscape:	false,
                            autoOpen: 	true,
                            height: 	400,
                            width: 		700,
                            modal: 		true,
                            resizable: 	false,
                            buttons: 	{
                                'loading'	: function(){}
                            },
                            create		: function(){
                               /* //hide the how to place cards
                                $('#' + me.howToPlaceCardsDomId).hide();

                                //show the properties
                                me.contentTab(tabDomId);

                                //save|cancel buttons action
                                me.drawTabActionButtons(tabDomId);

                                me.editor.mediator.publish('attrWindowPoppedUp');*/
                            },
                            close		: function(){
                                $('#productEditorCellAttr').html(originalCont);
                            }
                        });
                    });
                }
                tableMgr_initDelegations:{
                    $('#productEditorPopup .pe-dd-cell').die().live(
                        'mouseenter', function(){
                            var
                                cellNum,
                                numTip = $(this).find('.round-num');
                            $(this).find('.pe-dd-cell-editIcon').show();
                            cellNum =  $(this).find('.pe-dd-cellCard').length;

                            if(cellNum>1&&!numTip.length){
                                $(this).append('<a class="round-num">'+cellNum+'</a>');
                            }
                            numTip.show();
                            //console.log(cellNum);
                        }).live(
                        'mouseleave', function(){
                            $(this).find('.pe-dd-cell-editIcon').hide();
                            var numTip = $(this).find('.round-num');
                            numTip.length&&(numTip.hide());

                        });
                    $('#productEditorPopup .pe-dd-cell .round-num').die().live(
                        'click',function(){

                            var status = $(this).attr("status");
                            if(!status||status=="Tiled"){
                                $(this).parent().find('.pe-dd-cellCard:gt(0)').hide();
                                $(this).attr("status","Overlapped");
                            }
                            else{
                                $(this).parent().find('.pe-dd-cellCard').show();
                                $(this).attr("status","Tiled");
                            }

                        }
                    )
                }

                editor.makeCardsDraggable();
//                $("#peTemplateScrollList").html(newHTML);

            },
            close: function () {
                $('#productEditorPopup').dialog('destroy');

                $('#productEditorPopup').html(originalContent);
            }
        });
    });
});