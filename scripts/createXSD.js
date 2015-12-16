//Main XSD string
var XSDString = '',
    //Object to store the min and max occurrence that an element should have

    occuranceObj = {
       
            'label' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'set' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'vline' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'trendlines' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'line' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'vtrendlines' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'categories' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'category' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'dataset' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'colorrange' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'color' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'dials' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'dial' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'trendpoints' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'point' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'hart' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'trendset' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'connectors' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'connector' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'processes' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'process' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'tasks' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'task' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'datatable' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'datacolumn' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'text' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'

            },
            'milestones' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'milestone' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'

            },
            'legend' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'item' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'rows' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'row' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'columns' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'column' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'pointers' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'axis' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'lineset' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            },
            'vLine' : {
                'minOccurs': '0', 
                'maxOccurs': 'unbounded'
            }

    };

//Function to create the Enumeration nodes
function getStringEnumerator(range) {
    var tempArray, i,
        tempString = '',
        finalValue;
    (range.indexOf(',') >= 0) ? (tempArray = range.split(',')) : (tempArray = range.split('or'));
    for (i = 0; i < tempArray.length; i++) {
        finalValue = tempArray[i].trim();
        finalValue = finalValue.replace(/"/g, '');
        tempString += '<xs:enumeration value="' +
            finalValue + '"/>';
    }

    return tempString;
}

//Function to create the minExclusive and maxExclusive nodes within restriction 
//nodes
function getNumberExclusive(range, exception) {

    var tempArray, tempString = '',
        finalString;
    //If only minimum range is mentioned then we split with "or" delimeter
    (exception === 'minOnly') ? (tempArray = range.split('or')) : (tempArray = range.split('-'));
    //Remove all non-numeric characters


    //fix for -360-360 this type of range
    if(tempArray[0] === "")
    finalString ="-" + tempArray[1].trim().replace(/\D/g, '');
    else
    finalString = tempArray[0].trim().replace(/\D/g, '');    

    tempString += '<xs:minInclusive value="' +
        finalString + '"/>';
    //Remove all non-numeric characters
    finalString = tempArray[1].trim().replace(/\D/g, '');
    (exception !== 'minOnly') ? tempString += '<xs:maxInclusive value="' + finalString + '"/>': '';

    return tempString;
}

function mapPath(location)
{
    
    var mapObj={
	    'chart' : '//chart',
        'label' :'//chart/label',
	    'set' : '//chart/set',
        'dataVline': '//chart/vline',
	    'line': '//chart/trendlines/line',
        'vline':'//chart/vtrendlines/line',
	    'categories':'//chart/categories',
	    'category':'//chart/categories/category',
	    'dataset':'//chart/dataset',
	    'data':'//chart/dataset/set',
        'dial':'//chart/dials/dial',
        'point':'//chart/trendpoints/point',
        'trendSet':'/chart/trendset',
        'connectors':'//chart/connectors',
        'connector':'//chart/connectors/connector',
        'processes':'//chart/processes',
        'process':'//chart/processes/process',
        'tasks':'//chart/tasks',
        'task':'//chart/tasks/task',
        'dataTable':'//chart/datatable',
        'dataColumn':'//chart/datacolumn',
        'text':'//chart/text',
        'milestone':'//chart/milestones/milestone',
        'item':'//chart/legend/item',
        'row':'//chart/rows/row',
        'column':'//chart/columns/column',
        'colorRange':'//chart/colorrange',
        'color':'//chart/colorrange/color',
        'pointer':'//chart/pointers',
        'axis':'//chart/axis',
        'lineset':'//chart/lineset',
        'categoryVline':'//chart/categories/vline',
        'dataLineset':'//chart/lineset/set',
        'heatMapDataset':'//chart/dataset/set'     
    };


    if(mapObj[location])
    return	mapObj[location];
}


function checkSet(json)
{
    var F1 = false, mlocation;
    for (var key in json)
    {
        for(var j=0; j<json[key].attrs.length; j++)
        {
            if(json[key].hasOwnProperty('path'))
            {
               if(json[key].path==='dataset')
                F1 = true;    
            }  
        }   
    }

    if(F1)
    mlocation = 'data';
    else
    mlocation = 'set';

    return mlocation;    

}

function getLocationObject(dataObj, location) {
   
    var objNameArray, currentObj, returnObject, name, j;

    //Parsing the location string and getting the names
    objNameArray = location.slice(2, location.length).split('/');
    //Initial object is the chart object. Everthing else reside inside chart Object        
    currentObj = dataObj;
    for (j = 0; j < objNameArray.length; j++) {
        name = objNameArray[j];
        if (!currentObj[name]) {
            //New Object created for each elements
            currentObj[name] = new Object({});
            //Corresponding array to store the attribute related data
            currentObj[name].attributes = [];
            currentObj[name].name = name;
        }
        returnObject = currentObj;
        currentObj = currentObj[name];
    }

    return currentObj;
}

//Function to parse the range string and get the separator
function getRangeSeparator(rangeStr) {
    var separator="";

    if(rangeStr == 'Any (color code without the # prefix)') {
        separator = 'Hex Code';
    }else if (rangeStr.indexOf('/') >= 0) {
        separator = '/';
    } else if (rangeStr.indexOf(',') >= 0) {
        separator = ',';
    } else if (rangeStr.indexOf('-') >= 0) {
        separator = '-';
        //Defining separator for values in pixel           
    } else if (rangeStr.indexOf('In Pixels') >= 0 || rangeStr.indexOf('In pixels') >= 0 || rangeStr.indexOf('In pixels or in percentage') >= 0  ) {
        separator = 'In Pixels';
        //Defining separator for color range       
    } else if (rangeStr.indexOf('Hex Code') >= 0 || rangeStr.indexOf('hex color codes') >= 0 || rangeStr.indexOf('Hex Color Code') >= 0) {
        separator = 'Hex Code';
        //For separator for Numeric range    
    } else if (rangeStr === 'Numeric value > 0' || rangeStr === 'Numeric Value') {
        separator = '>0';
        //Defining separator for range like "or above"    
    } else if (rangeStr.indexOf('or ') >= 0 && rangeStr.indexOf('above') >= 0) {
        separator = 'above';
        //For separator where range ONLY has "or"    
    } else if (rangeStr.indexOf('or ') >= 0 && rangeStr.indexOf('above') === -1 && rangeStr.indexOf('more') === -1) {
        separator = ',';
    }
    //Defining separator for range like "or more"
    else if (rangeStr.indexOf('or more') >= 0) {
        separator = 'more';
    }
    //Defining separator for range like "Font Name"
    else if (rangeStr.indexOf('Font Name') >= 0) {
        separator = 'Font Name';
    }
    else if (rangeStr === 'Any character') {
        separator = 'character';
    }
    else if (rangeStr === 'undefined' || rangeStr === '' || rangeStr === ' ' ) {
        separator = '';
    }
   
    return separator;
}

//Function to construct the restriction nodes based on data types and range
function getRestrictionString(range, type, exception) {

    var initStr = '<xs:simpleType>',
        restrictionStr = '',
        endRestrictionStr = '</xs:restriction>',
        endStr = '</xs:simpleType>',
        tempStr = '';

    switch (type.toLowerCase()) {
        case 'string':
            tempStr = '<xs:restriction base="xs:string">';
            tempStr += getStringEnumerator(range);
            break;
        case 'number':
            tempStr = '<xs:restriction base="xs:nonNegativeInteger">';
            //tempStr = '<xs:restriction base="xs:integer">';   
            tempStr += getNumberExclusive(range, exception);
            break;
    }
    restrictionStr = initStr + tempStr + endRestrictionStr + endStr;

    return restrictionStr;
}



//Function that parse the JSON string and convert to corresponding objects
//and generate the XSD string as output.
var generateXSDString = function(dataObj) {

        var tempDataObj = dataObj,
            totalKeys,
            occurStr = '',
            rangeSeparator,
            paramType,
            nameObj,
            paramRange,
            tempStr,
            key,
            k;

        //Generating the occurence string for an element
        occurStr = occuranceObj[tempDataObj.name] && ' minOccurs="' + occuranceObj[tempDataObj.name].minOccurs +
            '" maxOccurs="' + occuranceObj[tempDataObj.name].maxOccurs + '"';
        occurStr = (occurStr === undefined) ? occurStr = '' : occurStr;
        XSDString += '<xs:element name="' + tempDataObj.name + '"' + occurStr + '><xs:complexType>';
        totalKeys = Object.keys(tempDataObj); 
        (totalKeys.length > 2) ? (XSDString += '<xs:sequence>') : (XSDString += '');
        //Adding the inner objects later in a recursive way
        for (key in tempDataObj) {
            if (tempDataObj.hasOwnProperty(key)) {
                if (typeof(tempDataObj[key]) === 'object') {
                    if (tempDataObj[key].name) {
                        generateXSDString(tempDataObj[key]);
                    }
                }
            }
        }
        (totalKeys.length > 2) ? (XSDString += '</xs:sequence>') : (XSDString += '');

        //Adding the attribute nodes in the string first
        for (k = 0; k < tempDataObj.attributes.length; k++) {

            rangeSeparator = tempDataObj.attributes[k].separator;
            paramType = tempDataObj.attributes[k].type.toLowerCase();
            //fix , because all name needs in lowercase
            //nameObj = tempDataObj.attributes[k].name;
            nameObj = tempDataObj.attributes[k].name.toLowerCase();
            paramRange = tempDataObj.attributes[k].range;

              // for type number and range -360-360, attributes like  startangle, endangle, gaugestartangle, gaugeendangle    
          if((rangeSeparator === '-' && paramType === 'number') && 
            (nameObj === 'startangle' || nameObj === 'endangle' || 
                nameObj === 'gaugestartangle' || nameObj === 'gaugeendangle' )) {
            XSDString += '<xs:attribute name="' + nameObj + '">';
            XSDString += '<xs:simpleType> ';
            XSDString += '<xs:restriction base="xs:integer">';
            XSDString +=  getNumberExclusive(paramRange, '');
            XSDString += '</xs:restriction>';
            XSDString += '</xs:simpleType>';
            XSDString +=  '</xs:attribute>';
          }
          
            //For both Number and String where range is define with "," or "-"
            else if ((rangeSeparator === ',' && paramType === 'string') ||
                rangeSeparator === '-' && paramType === 'number') {
                XSDString += '<xs:attribute name="' + nameObj + '">';
                tempStr = getRestrictionString(paramRange, paramType, '');
                XSDString += tempStr + '</xs:attribute>';
                //For color attributes  
            } else if ((paramType === 'color' || paramType === 'color code' || paramType === 'hex color code' || paramType === 'hex code' || paramType === 'list of colors separated by comma') && (rangeSeparator === 'Hex Code' || rangeSeparator === '' || rangeSeparator === ' ')) {
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:hexBinary"/>';
                //For values in pixels
            } else if ((paramType === 'number' || paramType === 'number (pixels)') && (rangeSeparator === 'In Pixels')) {
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:nonNegativeInteger"/>'; 
                //Exceptional cases:
                //For Greater than some number or zero
            } else if (paramType === 'number' && (rangeSeparator === '>' || rangeSeparator === '>0')) {
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:nonNegativeInteger"/>'; //positiveInteger
                //For type 'Number' and range define in string like (2 or more, 5 or above)
            } else if (paramType === 'number' && (rangeSeparator === 'more' || rangeSeparator === 'above')) {
                XSDString += '<xs:attribute name="' + nameObj + '">';
                //Here we need to set the minimum range only, he using "minOnly"
                tempStr = getRestrictionString(paramRange, paramType, 'minOnly');
                XSDString += tempStr + '</xs:attribute>';
                //For type 'Number' but range not defined
            } else if (paramType === 'number' && rangeSeparator === undefined) {
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:float"/>';
            }else if(paramType === 'number' && (rangeSeparator === "" || rangeSeparator === " ")){
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:string"/>'; ////nonNegativeInteger
                //For type 'String' but range not defined
            }else if (paramType === 'string' && (rangeSeparator === "" || rangeSeparator === " " || rangeSeparator === undefined)) {
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:string"/>';
               //For type 'URL' but range not defined     
            }else if((paramType === 'url' || paramType === 'url in fusioncharts format' || paramType === 'link in fusioncharts format') && (rangeSeparator === "" || rangeSeparator === " " || rangeSeparator === undefined)){
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:anyURI"/>';
               //For type 'Any Character'    
            }else if(paramType === 'character' && rangeSeparator === 'character'){
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:string"/>';
                //For type 'Alpha'     
            }else if(paramType === 'alpha' && rangeSeparator === '-'){
                 XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:nonNegativeInteger"/>';   
            }else if(paramType === 'gradient mix formula' || paramType === 'ratio of each color separated by comma' || paramType === 'color code or fill mix formula (but single token)' || paramType === 'linear or radial' || paramType === 'gradient fill mix formula' || paramType === 'number separated by commas' || paramType === 'numbers separated by comma' || paramType === 'font name'){
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:string"/>';
            }else if(paramType === 'integernumber' && rangeSeparator === "")
                 XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:integer"/>';
            //For other types
            else {
                // XSDString += '<xs:attribute name="' + nameObj +
                //     '" type="xs:' + paramType + '"/>';
                    
                XSDString += '<xs:attribute name="' + nameObj +
                    '" type="xs:string"/>';    
            }
        }
        XSDString += '</xs:complexType></xs:element>';

       
    },
    xsdStartStr,
    xsdEndStr,
    XSDString,
    jsonObj,
    dataObj,
    i,
    //Main function that converts JSON to XSD
    convertToXSD = function(jsonContent) {
        //Static XSD strings
        xsdStartStr = '<?xml version="1.0" encoding="ISO-8859-1"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">',
            xsdEndStr = '</xs:schema>',
            //Data Object to store the entire JSON data
            jsonObj = new Object({}),
            dataObj = new Object({}),
            XSDString = '',
            i = 0;
        //Parsing JSON data
        jsonObj = JSON.parse(jsonContent); 

       
        //for (i = 0; i < jsonObj.length; i++) {
           /* var tagsObj = jsonObj.attributes[i].tags,
                attributeObject = new Object({}),
                nameObj = jsonObj.attributes[i].name,
                location = String(tagsObj.location),
                paramRange = jsonObj.attributes[i].params.range,
                paramType = jsonObj.attributes[i].params.type,
                rangeSeparator,
                currLocationObject;*/
            for (var key in jsonObj)
            {
                for(var j=0; j<jsonObj[key].attrs.length; j++)
                {
                    var attributeObject = new Object({}), rangeSeparator, 
                        currLocationObject, rangeSeparator, 
                        mlocation,  paramRange, nameObj, paramType, cheackLocation;

                    if(jsonObj[key].hasOwnProperty('path'))
                    {
                        if(jsonObj[key].path === 'data'  && jsonObj[key].table === 'Vertical Data Separator Lines')
                        mlocation =mapPath('dataVline');

                        else if(jsonObj[key].path === 'data'  && jsonObj[key].table === 'The data Object (child of the lineset Object)')
                        mlocation =mapPath('dataLineset'); 
                           
                        else if(jsonObj[key].path === 'data'  && jsonObj[key].table === 'The dataset Object and the data Object')
                        mlocation =mapPath('heatMapDataset');   

                        else if(jsonObj[key].path === 'data')
                        mlocation =mapPath(checkSet(jsonObj));

                        else if(jsonObj[key].path === 'line' && jsonObj[key].table === 'Vertical Trend-lines') 
                        mlocation =mapPath('vline');
                        
                        else if(jsonObj[key].path === 'category' && jsonObj[key].table === 'Vertical Data Separator Lines') 
                        mlocation =mapPath('categoryVline');

                        else
                        mlocation=mapPath(jsonObj[key].path);
                    }
                    else
                    {
                        mlocation=mapPath('chart');
                    }  


                    nameObj = jsonObj[key].attrs[j].name;
                    paramRange=jsonObj[key].attrs[j].range;
                    paramType=jsonObj[key].attrs[j].type;

                    

                    rangeSeparator = paramRange && getRangeSeparator(paramRange);
                    //Creating and storing objects based on the location Hierarchy
                    currLocationObject = getLocationObject(dataObj, mlocation);
                    //Attribute details stored in Object
                    attributeObject.name = nameObj;
                    attributeObject.range = paramRange;
                    attributeObject.type = paramType;
                    attributeObject.separator = rangeSeparator;
                    //JSON Object stored in dataObj with the required heirarchy
                    currLocationObject.attributes.push(attributeObject);
                    
                }    

        }
        //To generate the main XSDSchema from the stored data 

       generateXSDString(dataObj.chart);

     

        return xsdStartStr + XSDString + xsdEndStr;
    };