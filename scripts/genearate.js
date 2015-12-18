//JS file that converts the JSON to XSD
/* jshint ignore:start */
phantom.page.injectJs('createXSD.js');

//JS file to format the output string with indentation and newline
phantom.page.injectJs('vkbeautify.0.99.00.beta.js');
/* jshint ignore:end */

var system = require('system'),

//Pass the relative path of the json folder as argument 
//while running the js file from build script
//e.g folderPath = '../xt-attrs/xt-attrs/src/json';
folderPath = system.args[1];
/* jshint ignore:start */
//Exit phantomjs if folder path not defined    
if (system.args.length === 1) {
    console.log('Pass relative path of folder as argument when invoking this script!');
    phantom.exit();
}
/* jshint ignore:end */
console.log('Generating XSD...');
var mapWithAliasName = function(newName) {
        var aliasName,
            key,
            mappingObj = {
                'Col3DLine': 'MSColumnLine3D',
                'Column3D': 'Column3D',
                'Combi2DDY': 'MSCombiDY2D',
                'MSCol3DLineDY': 'MSColumn3DLineDY',
                'MSStCol': 'MSStackedColumn2D',
                'MSStColLineDY': 'MSStackedColumn2DLineDY',
                'ScrollStackedCol2D': 'ScrollStackedColumn2D',
                'StArea2D': 'StackedArea2D',
                'StBar2D': 'StackedBar2D',
                'StCol2D': 'StackedColumn2D',
                'StCol2DLine': 'StackedColumn2DLine',
                'StCol3D': 'StackedColumn3D',
                'StCol3DLine': 'StackedColumn3DLine',
                'StCol3DLineDY': 'StackedColumn3DLineDY',
                'Angular': 'AngularGauge',
                'Horizontal': 'HLED',
                'SparkWL': 'SparkWinLoss',
                'Vertical': 'VLED',
                'BoxandWhisker2D': 'BoxAndWhisker2D',
                'Candlestick': 'CandleStick',
                'DragCol2D': 'DragColumn2D',
                'InverseArea': 'InverseMSArea',
                'InverseColumn': 'InverseMSColumn2D',
                'InverseLine': 'InverseMSLine',
                'LogColumn2D': 'LogMSColumn2D',
                'LogLine': 'LogMSLine',
                'MALine': 'MultiAxisLine'
            };

        //Extracting the alias name from file name 
        //newName = newName.slice(newName.lastIndexOf('_') + 1, newName.length + 1);
       
        //Mapping the extracted alias names with exception names 
        //and getting the actual alias name
        for (key in mappingObj) {
            if (mappingObj.hasOwnProperty(key)) {
                aliasName = mappingObj[key];
                if (newName === String(key)) {
                    newName = aliasName;
                    break;
                }
            }
        }

        return newName;

    },
    //Function to check the file name and map to relevant FusionCharts category
    //and return the directory name
    getOutputPath = function(newName) {

        var nameStr,
            key,
            folderName,
            folderObj = {
                'fusioncharts': {
                    'names': 'Column3D,Column2D,Line,Area2D,Bar2D,Pie2D,Pie3D,Doughnut2D,Doughnut3D,Pareto2D,Pareto3D,MSColumn2D,MSColumn3D,MSLine,MSBar2D,MSBar3D,MSArea2D,Marimekko,ZoomLine,StackedColumn3D,StackedColumn2D,StackedBar2D,StackedBar3D,StackedArea2D,MSStackedColumn2D,MSCombi3D,MSCombi2D,MSColumnLine3D,StackedColumn2DLine,StackedColumn3DLine,MSCombiDY2D,MSColumn3DLineDY,StackedColumn3DLineDY,MSStackedColumn2DLineDY,Scatter,Bubble,ScrollColumn2D,ScrollLine2D,ScrollArea2D,ScrollStackedColumn2D,ScrollCombi2D,ScrollCombiDY2D'
                },
                'fusionwidgets': {
                    'names': 'AngularGauge,Bulb,Cylinder,HLED,Linear,Thermometer,VLED,RealTimeArea,RealTimeColumn,RealTimeLine,RealTimeStackedArea,RealTimeStackedColumn,RealTimeLineDY,SparkLine,SparkColumn,SparkWinLoss,HBullet,VBullet,Funnel,Pyramid,Gantt,DrawingPad'
                },
                'powercharts': {
                    'names': 'LogMSColumn2D,LogMSLine,Spline,SplineArea,MSSpline,MSSplineArea,ErrorBar2D,ErrorLine,ErrorScatter,InverseMSArea,InverseMSColumn2D,InverseMSLine,DragColumn2D,DragLine,DragArea,Radar,HeatMap,BoxAndWhisker2D,CandleStick,DragNode,MSStepLine,MultiAxisLine,MultiLevelPie,SelectScatter,Waterfall2D,Kagi'
                }
            };

        //Extracting the alias name from file name 
        //newName = newName.slice(newName.lastIndexOf('_') + 1, newName.length + 1);

        //Scanning the folderObj and mapping with the filename passed as parameter
        //if exist among 3 objects, get the respective object name and 
        //consider it as folder name
        for (key in folderObj) {
            if (folderObj.hasOwnProperty(key)) {
                nameStr = folderObj[key].names;
                if (nameStr.indexOf(newName) >= 0) {
                    folderName = key;
                    break;
                } else {
                    continue;
                }
            }
        }
        //If JavaScript alias name doea not match, put the files in 'others' folder
        (folderName === undefined) ? folderName = 'others': folderName;

        return '/' + folderName + '/';
    },
    scanDirectory = function(path) {
        var fs = require('fs'),
            content,
            outputFolder = 'output/',
            filePath,
            newFilename,
            newFilepath,
            extension = '.xsd';
        if (fs.isDirectory(path)) {
            //Looping through the list of files returned from list method
            fs.list(path).forEach(function(e) {
                filePath = path + '/' + e;
                //If its a file and is NOT a Map related JSON then continue with it
                if (!fs.isDirectory(filePath) && filePath.indexOf('Maps') === -1) {
                    //Open file 
                    fs.open(filePath, 'r');
                    //Read the file content
                    content = fs.read(filePath);
                    //Generating XSD from the JSON String
                    //Ignoring jshint as this is defined in createXSD.js
                    /* jshint ignore:start */
                    content = convertToXSD(content);
                    //Formatting the string content in XML format
                    //Ignoring jshint as this is defined in vkbeautify.0.99.00.beta.js
                    content = vkbeautify.xml(content);
                    /* jshint ignore:end */
                    //Getting the new filename
                    newFilename = mapWithAliasName(e.slice(0, e.lastIndexOf('.')));
                    //Defining the new path based on the JavaScript 
                    //alias name extracted from newFilename
                    newFilepath = getOutputPath(newFilename);
                    //Write the content in new file and same in new path
                    fs.write(outputFolder + newFilepath + newFilename + extension, content, 'w');
                    console.log('Saved In  ' + newFilepath + newFilename + extension);
                }
                if (e !== '.' && e !== '..') {
                    scanDirectory(path + '/' + e);
                }
            });
        }
    };

console.log('');
scanDirectory(folderPath);
console.log('');
//Ignoring jshint as this phantomjs is the framework
/* jshint ignore:start */



var fs = require('fs');
var DIRECTORIES = ['output/fusioncharts', 'output/fusionwidgets', 'output/powercharts'];

for (var i = 0; i <DIRECTORIES.length; i++) {

 var files = fs.list(DIRECTORIES[i]);

 for(var j=2; j<files.length; j++){

    var fileData = fs.read(DIRECTORIES[i] + '/' + files[j]);
    fileData = fileData.toString().replace('<xs:complexType>\n            <xs:sequence maxOccurs="unbounded" minOccurs="0">', '<xs:complexType>\n            <xs:choice maxOccurs="unbounded" minOccurs="0">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="animation" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="animation" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="numvisibleplot">','</xs:choice>\n            <xs:attribute name="numvisibleplot">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="palette">','</xs:choice>\n            <xs:attribute name="palette">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="caption" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="caption" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="viewmode" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="viewmode" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="base" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="base" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="allowselection" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="allowselection" type="xs:string"/>');

    fs.write(DIRECTORIES[i] + '/' + files[j], fileData);

    }
}





phantom.exit();






/* jshint ignore:end */