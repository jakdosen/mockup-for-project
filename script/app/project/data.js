/**
 * User: Gavin.Li
 * Date: 5/16/13
 * Module: data
 */
;define(function(require, exports, module){
    return{
        status:['Draft','Estimates Received','Order Received'],
        data:[
            {
                'id':1,
                'name':'Photo Print',
                'owner':'Gavin',
                'status':0,
                'completionDate':'03/31/2013',
                'CreationDate':'01/5/2013',
                'desc':'Photo Print desc',
                'recent':'10:00am'
            },
            {
                'id':2,
                'name':'Book Sell',
                'owner':'Bob',
                'status':1,
                'completionDate':'05/20/2013',
                'CreationDate':'02/13/2013',
                'desc':'Book Sell desc',
                'recent':'three days ago'
            },
            {
                'id':3,
                'name':'English training',
                'owner':'Robin',
                'status':1,
                'completionDate':'02/19/2013',
                'CreationDate':'09/16/2012',
                'desc':'English training desc',
                'recent':'Yesterday'
            },
            {
                'id':4,
                'name':'Primary school education',
                'owner':'Song',
                'status':2,
                'completionDate':'04/15/2013',
                'CreationDate':'10/20/2012',
                'desc':'Primary school education desc',
                'recent':'11:00am'
            },
            {
                'id':5,
                'name':'Spring Poster Compaign',
                'owner':'Yang Luan',
                'status':1,
                'completionDate':'05/26/2013',
                'CreationDate':'07/21/2012',
                'desc':'Spring Poster Compaign desc',
                'recent':'12:00am'
            }
        ]
    }
});