/**
 * User: Gavin.Li
 * Date: 5/16/13
 * Module: data
 */
;
define(function (require, exports, module) {
    return{
        product: [
            {
                id: 1,
                name: "Printed Product",
                quantity: [2500, 5000, 10000],
                desc: "Printed Product",
                imageSrc: "https://s3.amazonaws.com/sqa.noosh.com/noosh/v1/product/5002453/icon"
            },
            {
                id: 2,
                name: "Retail Display",
                quantity: [50, 100, 300],
                desc: "Retail Display",
                imageSrc: "https://s3.amazonaws.com/sqa.noosh.com/noosh/v1/product/5002459/icon"
            },
            {
                id: 3,
                name: "Brochures",
                quantity: [2500, 5000, 10000],
                desc: "Brochures",
                imageSrc: "https://s3.amazonaws.com/sqa.noosh.com/noosh/v1/product/5002458/icon"
            }
        ],
        project:[
            {
                id:1,
                name:"April Promotion Package",
                productList:[1,2,3],
                desc:"April Promotion Package desc"
            }
        ],
        supplier:[
            {
                id:1,
                name:"supplier1",
                email:"sup1@sup1.com",
                isSignUp:true
            },
            {
                id:2,
                name:"supplier2",
                email:"sup2@sup2.com",
                isSignUp:false
            },
            {
                id:3,
                name:"supplier3",
                email:"sup3@sup3.com",
                isSignUp:true
            }
        ],
        estimate:[],
        order:[]
    }
});