/**
 * User: Gavin.Li
 * Date: 5/15/13
 */
;
define(function (require, exports, module) {
    var $ = require("jquery"),
        _ = require("underscore"),
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

    var popupTemplate = _.template($("#attr-popup-tpl").html());
    if (originalContent.length == 0) {
        originalContent = $('#productEditorPopup').html();
    }

    /**
     * adv product editor popup
     */
    $("#advancedEditor,#serviceSpecsTable .customize-spec").click(function () {
        $('#productEditorPopup').dialog({
            title: 'Create Product',
            closeOnEscape: false,
            autoOpen: true,
            height: 680,
            width: 1230,
            modal: true,
            resizable: false,
            buttons: {
                'cancel'	: function(){$(this).dialog( "close" );},
                'save': function () {$(this).dialog( "close" );}
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
                        $(popupTemplate({type:"tab",len:1})).dialog({
                            title: 		'Set Tab Attributes',
                            closeOnEscape:	false,
                            autoOpen: 	true,
                            height: 	400,
                            width: 		700,
                            modal: 		true,
                            resizable: 	false,
                            buttons: 	{
                                'update'	: function(){$(this).dialog( "close" );}
                            },
                            create		: function(){

                            },
                            close		: function(){
                                $(this).remove();
                            }
                        });
                    });
                }
                tableMgr_initDelegations:{
                    $('#productEditorPopup .pe-dd-cell').die().live(
                        'mouseenter', function(){
                            $(this).find('.pe-dd-cell-editIcon').show();

                        }).live(
                        'mouseleave', function(){
                            $(this).find('.pe-dd-cell-editIcon').hide();
                            var numTip = $(this).find('.round-num');
                            numTip.length&&(numTip.hide());

                        });
                }

                editor.makeCardsDraggable();

            },
            close: function () {
                $('#productEditorPopup').dialog('destroy');

                $('#productEditorPopup').html(originalContent);
            }
        });
    });


    /**
     * Cell attribution popup
     */
    $(".pe-dd-cell-editIcon").click(function(){

        $(popupTemplate({type:"cell",len:$(this).parent().find(".pe-dd-cellCard").length})).dialog({
            title: 		'Set Cell Attributes',
            closeOnEscape:	false,
            autoOpen: 	true,
            height: 	'auto',
            width: 		700,
            modal: 		true,
            resizable: 	false,
            buttons: 	{
                'cancel'	: function(){$(this).dialog( "close" );},
                'save'	: function(){$(this).dialog( "close" );}
            },
            create		: function(){
                $("#cell-attr-cont").tabs();
                $('a.pe-attr-style-open').die().live('click', function(){
                    $(this).next().show();
                    $(this).hide();
                });

            },
            close		: function(){
                $(this).remove();
            }
        });
    });

});