var fs = require('fs');

var DIRECTORIES = '../jsonfilesforxsdgenerator/attributes';
var files = fs.readdirSync(DIRECTORIES);
files.forEach(function(file){
var fileData = fs.readFileSync(DIRECTORIES + '/' + file,'utf-8');

fileData = fileData.toString().replace(/"\\"left\\", \\"center\\", \\"right\\"",/gm, '"left, center, right",');
fileData = fileData.toString().replace(/"'left', 'middle', 'right'"/gm,   '"left, middle, right"');
fileData = fileData.toString().replace(/"'left', 'center' or 'right'"/gm, '"left, center, right"');
fileData = fileData.toString().replace(/"'left' or 'right'"/gm, '"left, right"');
fileData = fileData.toString().replace(/ "'top', 'middle' or 'bottom'"/gm, '"top, middle, bottom"');
fileData = fileData.toString().replace(/"'AUTO', 'WRAP':, 'STAGGER', 'ROTATE', 'NONE'"/gm, '"AUTO, WRAP, STAGGER, ROTATE, NONE"');
fileData = fileData.toString().replace(/"&quot;ABOVE&quot;, &quot;BELOW&quot;, &quot;AUTO&quot;"/gm, '"ABOVE, BELOW, AUTO"');
fileData = fileData.toString().replace(/"'TL', 'TR', 'BL', \\n'BR', 'CC'"/gm, '"TL, TR, BL, BR, CC"');
fileData = fileData.toString().replace(/"'TL', 'TR', 'BL', 'BR', 'CC'"/gm,  '"TL, TR, BL, BR, CC"');
fileData = fileData.toString().replace(/"'top', 'middle', 'bottom'"/gm, '"top, middle, bottom"');
fileData = fileData.toString().replace(/"'stretch', 'tile', 'fit', 'fill', 'center', 'none'"/gm, '"stretch, tile, fit, fill, center, none"');
fileData = fileData.toString().replace(/"'RIGHT' or 'BOTTOM'"/gm, '"RIGHT, BOTTOM"');
fileData = fileData.toString().replace(/"'BOTTOM' or 'RIGHT'"/gm, '"BOTTOM, RIGHT"');
fileData = fileData.toString().replace(/"'y','m','d','h','mn' or 's'"/gm, '"y, m, d, h, mn, s"');
fileData = fileData.toString().replace(/"'P' or 'S'"/gm, '"P, S"');
fileData = fileData.toString().replace(/"'W', 'L', or 'D'"/gm, '"W, L, D"');
fileData = fileData.toString().replace(/"'mm\/dd\/yyyy' or 'dd\/mm\/yyyy' or 'yyyy\/mm\/dd' or 'mm-dd-yyyy' or 'dd-mm-yyyy' or 'yyyy-mm-dd'"/gm, '"mm/dd/yyyy, dd/mm/yyyy, yyyy/mm/dd, mm-dd-yyyy, dd-mm-yyyy, yyyy-mm-dd"');
fileData = fileData.toString().replace(/"'mm\/dd\/yyyy'"/gm, '"mm/dd/yyyy"');
fileData = fileData.toString().replace(/"COLUMN, AREA or LINE"/gm, '"Column, Area, Line"');


fileData = JSON.parse(fileData);

for(var i=0; i<fileData.length; i++)
{
	var obj1 = fileData[i];

	for(var j=0; j<obj1.attrs.length; j++)
	{
		var obj2 = obj1.attrs[j];

		if(obj2.name.search(/ratio/i) > -1){
			obj2.type = 'Ratio of each separated by comma';
			obj2.range = '';
		}
		if(obj2.name.toLowerCase() === 'bgcolor' || obj2.name.toLowerCase() === 'plotgradientcolor'){
			obj2.type = 'separate the hex color codes of each color in the gradient using comma';
			obj2.range = '';
		}
		if(obj2.name.toLowerCase() === 'tickvaluedistance'){
			obj2.type = 'IntegerNumber';
			obj2.range = '';
		}
		if(obj2.name === 'x' || obj2.name === 'y' || 
		   obj2.name === 'z' || obj2.name.toLowerCase() === 'startvalue'||
		   obj2.name.toLowerCase() === 'lineposition'||
		   obj2.name.toLowerCase() === 'labelposition'){
			obj2.type = 'Number';
			delete obj2.range;
		}
		if((file === 'Gantt.json') && (obj2.name.toLowerCase() === 'height' || 
			obj2.name.toLowerCase() === 'toppadding')){
			obj2.type = 'in pixels or in percent';
			}
		if(obj2.name.toLowerCase() === 'numvisibleplot'){
			obj2.range = '2-1000';
			}		
		} //end of for loop

}	

fs.writeFileSync(DIRECTORIES + '/' + file, JSON.stringify(fileData, null, 4),  'utf-8');

});
