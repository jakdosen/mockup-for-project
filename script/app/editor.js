/**
 * User: Gavin.Li
 * Date: 5/15/13
 */
define(function(require, exports, module){
    var $ = require("jquery");
    var cardsUlDomId = 'peCards';
    module.exports={
        makeCardsDraggable:function(){
            $('#' + cardsUlDomId + ' li').draggable('destroy').draggable({
                revert:	'invalid',
                helper:	'clone',
                start:	function(event, ui){
                }
            });
        }
    };
});