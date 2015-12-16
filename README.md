#xsd-schema-generator
--------

This repository contains code for auto generation of XSD schema for charts and widgets using chart attributes JSON data.


##File organization
========================

 - `scripts`: Scripts that generate XSD schemas and save in respective folder in `output` folder.


###Dependencies :

- phantomjs
- nodejs



###To generate XSD files for FusionCharts XT:

###Notes:

Open `bin/build` and edit the source path for the chart attribute JSON folder in the line below:

```
phantomjs scripts/genearate.js `../xt-attrs/xt-attrs/src/json`
```
The output will be saved in `/output/` by default. If you need to customize the path, edit `outputFolder` in scripts/genearate.js 

To generate the files run the below command in console:

```
> npm run-script build
```

`fileFormatToGenerate :` .xsd for XSD files generation

`product :` Ex:- FusionCharts XT

`version :` Ex:- 3.6.1

`outputFolder :` should be /output/ by default
