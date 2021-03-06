;define(function(require, exports, module){
    require("../../lib/accounting.js");

    window.Currency = {
        settings: {
            usd : { symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            gbp : { symbol: "£", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            eur : { symbol: "€", precision: 2, thousand: ".", decimal: ",", format: "%s %v"},
            cad : { symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            aud : { symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            nzd : { symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            zar : { symbol: "R", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            inr : { symbol: "₹", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            cny : { symbol: "¥", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            hkd : { symbol: "$", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            aed : { symbol: "AED", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            thb : { symbol: "฿", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            idr : { symbol: "Rp", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            php : { symbol: "₱", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            vnd : { symbol: "₫", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            sar : { symbol: "﷼", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            pkr : { symbol: "₨", precision: 2, thousand: ",", decimal: ".", format: "%s %v"},
            ngn : { symbol: "₦", precision: 2, thousand: ",", decimal: ".", format: "%s %v"}
        },
        convert : function(sum,cur){ return accounting.formatMoney(sum, this.settings[cur.toLowerCase()]); },
        reconvert:function(sum,cur){ return accounting.unformat(sum, this.settings[cur.toLowerCase()].decimal); },
        convertBatch:function(arr,cur){return accounting.formatColumn(arr, this.settings[cur.toLowerCase()]);}
       //AED symbol: د.إ
    };
});
