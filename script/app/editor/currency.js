;define(function(require, exports, module){
    require("../../lib/accounting.js");

    window.Currency = {
        settings: {
            usd : { symbol: "$ " },
            gbp : { symbol: "£ " },
            eur : { symbol: "€ ", thousand : ".", decimal : ","}
        },
        convert : function(sum,name){ return accounting.formatMoney(sum, this.settings[name.toLowerCase()]); }

    };
});
