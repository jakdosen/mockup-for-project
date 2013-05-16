/**
 * User: Gavin.Li
 * Date: 5/15/13
 * Desc: SeaJS global configuration.
 */
seajs.config({
    // Enable plugins
    plugins: ['shim','nocache','style','text'],

    // Configure alias
    alias: {
        'jquery': {
            src: 'lib/jquery/jquery',
            exports: 'jQuery'
        },
        'jquery.ui': {
            src: 'lib/jquery/jquery-ui.min',
            deps: ['jquery']
        },
        'jquery.autocomplete': {
            src: 'lib/jquery/jquery.autocomplete',
            deps: ['jquery','jquery.ui']
        },
        'jquery.filedrop': {
            src: 'lib/jquery/jquery.filedrop',
            deps: ['jquery']
        },
        'jquery.form': {
            src: 'lib/jquery/jquery.form',
            deps: ['jquery']
        },
        'jquery.multiselect': {
            src: 'lib/jquery/jquery.multiselect',
            deps: ['jquery','jquery.ui']
        },
        'jquery.qtip': {
            src: 'lib/jquery/jquery.qtip.min',
            deps: ['jquery','jquery.ui']
        },
        'jquery.roundabout': {
            src: 'lib/jquery/jquery.roundabout',
            deps: ['jquery']
        },
        'jquery.roundabout-shapes': {
            src: 'lib/jquery/jquery.roundabout-shapes',
            deps: ['jquery','jquery.roundabout']
        },
        'jquery.validate': {
            src: 'lib/jquery/jquery.validate.min',
            deps: ['jquery']
        },
        'jquery.tag':{
            src: 'lib/jquery/tag-it.min',
            deps: ['jquery',,'jquery.ui']
        },
        'jsrender':{
            src: 'lib/jsrender/jsrender-1.0',
            deps: ['jquery']
        }
    }
});
