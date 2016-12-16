IMMP - ChangeLog
==============

###v0.9
####Cleaning up for the beta
Features:

- UI Overhaul
- Delete button added to home page maps
 - Redesigned CSV table
 - Swapped placement of CSV and map (imagemapster maps can't be centered)
 - CSS cleaned up, csv.css removed
 - Coloring added to tables at all times
- Delete button for mappings

Bugfixes:

- Deployment bugs fixed (setup guide written to prevent future issues)
- Order of load issues on map page fixed
- Bootstrap-related 404 handled
- Invalid mappings ignored and automatically purged upon load

###v0.8
####Load Page And A Usable Experience
- Introduced "Create Or Load Map" Homepage
 - Maps can be loaded via URL or created with unique URL entry
 - Thumbnails of all created maps in database will appear on home page
- Bugfixes on map page
 - Fixed terrible CSS indication of "edit mode"
 - Fixed footer CSS
- Broke page down into templates
- Deleted unnecessary templates

###v0.7
####Database Implementation (We're a real app now!)
- Every URL loaded is now given a unique entry in the database
- Maps are loaded by going to the url /map/id=<mapID>
- CSV data loads into table if present, "upload csv" visible if not
 * "Upload csv" button sends the csv string to the database for convenient loading later on
- Mappings are loaded from the database if they exist
 * "Save" button pushes all current maps to database

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