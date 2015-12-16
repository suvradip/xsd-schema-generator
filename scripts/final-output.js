var fs = require('fs');

var DIRECTORIES = ['../output/fusioncharts', '../output/fusionwidgets', '../output/powercharts'];

for (var i = 0; i <DIRECTORIES.length; i++) {

	var files = fs.readdirSync(DIRECTORIES[i]);
	files.forEach(function(file){

    var fileData = fs.readFileSync(DIRECTORIES[i] + '/' + file,'utf-8');
    fileData = fileData.toString().replace('<xs:complexType>\n            <xs:sequence>', '<xs:complexType>\n            <xs:choice maxOccurs="unbounded" minOccurs="0">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="animation" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="animation" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="numvisibleplot">','</xs:choice>\n            <xs:attribute name="numvisibleplot">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="palette">','</xs:choice>\n            <xs:attribute name="palette">');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="caption" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="caption" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="viewmode" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="viewmode" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="base" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="base" type="xs:string"/>');
    fileData = fileData.toString().replace('</xs:sequence>\n            <xs:attribute name="allowselection" type="xs:string"/>','</xs:choice>\n            <xs:attribute name="allowselection" type="xs:string"/>');


    fs.writeFileSync(DIRECTORIES[i] + '/' + file, fileData,  'utf-8');
    
   
    });
}

