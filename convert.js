var parseString = require('xml2js').parseString;
var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var obj;
var xml = fs.readFile(__dirname + '/static/bmml/NewMain.bmml', 'utf8', function(err, data){
    var html = '<html>\n<head><style type="text/css">html, body{background-image:none;}*{background-image:url("images/NewMain.png")}</style>\n</head>\n<body>\n';
    if (err) throw err;
    parseString(data, function(err, result){
        obj = result.mockup.controls;
        //console.log(util.inspect(obj, false, null));
        for(x = 0; x < obj.length; x++){
            //console.log(obj[x]);
            obj[x].control.forEach(function(element, index, array){
                element = element['$'];
                //var w = +element.w > +element.measuredW ? +element.w : +element.measuredW;
                //var h = +element.h > +element.measuredH ? +element.h : +element.measuredH;
                var w = +element.w === -1 ? +element.measuredW : +element.w;
                var h = +element.h === -1 ? +element.measuredH : +element.h;
                console.log(element);

                if(element.controlTypeID === '__group__' || element.controlTypeID === 'com.balsamiq.mockups::BrowserWindow' || element.controlTypeID === 'com.balsamiq.mockups::Canvas'){
                    console.log(element);
                }else{
                    html += '<div style="width:' + w + 'px; height: ' + h + 'px; position:absolute; left: ' + element.x + 'px;top:' + element.y + 'px;background-position: '+ element.x +'px '+ element.y +'px;z-index:' + element.zOrder + '" control-type="' + element.controlTypeID + '"></div>\n';
                }
            });
        }

        html += '</body>\n</html>';
        console.log(html);
    });
    /*
        html += '<div style="width: ' + obj.mockup.controls[0].control[0]['$'].w + 'px"></div>';
        html += '</body>';
        console.log(html);
    */
    fs.writeFile(__dirname + '/static/server/test.html', html, function(){
        console.log('wrote file');
    });
});
