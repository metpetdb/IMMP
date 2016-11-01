IMMP - Image Map for MetPet
==============

INTRODUCTION
--------------
IMMP is a simple UI designed to allow for simple tagging of geological data in photographs. More info coming soon

VERSION
--------------

###v0.7
####Database Implementation (We're a real app now!)
- Every URL loaded is now given a unique entry in the database
- Maps are loaded by going to the url /map/id=<mapID>
- CSV data loads into table if present, "upload csv" visible if not
 * "Upload csv" button sends the csv string to the database for convenient loading later on

####TODO
- Map saving
- Map loading
- Fix terrible CSS indication of "edit mode"
- Split changelog into separate file and use this space for a how-to setup and contribute

###v0.6
####CreateMapping
- Ability to create a mapping between a row of data and a location on the image
 * Not stored anywhere, just a local instance

###v0.5
####ImageMap linking and CSV importing
- Hovering over images in the image map now highlights a corresponding bit of data
- Image is now loaded by user via an input URL
- A CSV can be imported and displayed (crudely) on the left panel

###v0.4
####ImageMapster, The Beginning Of Image Interactions
- Included [imagemapster.js](https://github.com/jamietre/imagemapster) in repository
- Include remote jquery from Google in templates
- Began programatically rendering mappings over image

###v0.3
####Flaskification & User Authentication
- IMMP is now a Flask application (to run more in line with [other MetPet projects](https://github.com/metpetdb/))
- Basic user authentication implemented
 * Login and profile page routing
 * Information piped from login page to profile page

###v0.2
####Much more accurate visualization
- Bootstrap css libraries added and implemented
- Bootstrap theme Dashboard used for design influence
- Beginning of CSV processing, panel added
- onClick event added that prints cursor location on image

###v0.1
####Rough Almost-Visualization
- Mostly a sandbox for playing with the new technologies
- Nothing really works

CREDIT
--------------
Lead Developer - [Theo Browne](http://www.theo.li)

Developed as undergraduate research during the summer of 2016 at [Rensselaer Polytechnic Institute](http://www.rpi.edu)