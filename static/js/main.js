// javascript

// Set up some options objects: 'single_opts' for when a single area is selected, which will show just a border
// 'all_opts' for when all are highlighted, to use a different effect - shaded white with a white border
// 'initial_opts' for general options that apply to the whole mapster. 'initial_opts' also includes callbacks
// onMouseover and onMouseout, which are fired when an area is entered or left. We will use these to show or
// remove the captions, and also set a flag to let the other code know if we're currently in an area.

// createMode indicates if we are or are not in create mode
console.log("ready");
var createMode = false;
var x;
var y;

var inArea,
    map = $('#mapper'),
    single_opts = {
        fillColor: '000000',
        fillOpacity: 0,
        stroke: true,
        strokeColor: 'ff0000',
        strokeWidth: 2
    },
    all_opts = {
        fillColor: 'ffffff',
        fillOpacity: 0.6,
        stroke: true,
        strokeWidth: 2,
        strokeColor: 'ffffff'
    },
    initial_opts = {
        mapKey: 'data-name',
        isSelectable: false,
        // These are called when user hovers over mapped locations on image
        onMouseover: function (data) {
            inArea = true;
            $( "#" + data.key ).addClass("hovered");
            console.log(data.key + " added active");
        },
        onMouseout: function (data) {
            inArea = false;
            $( "#" + data.key ).removeClass("hovered");
            console.log(data.key + " removed active");
        }
    };
    opts = $.extend({}, all_opts, initial_opts, single_opts);

    // Bind to the image 'mouseover' and 'mouseout' events to activate or deactivate ALL the areas, like the
    // original demo. Check whether an area has been activated with "inArea" - IE<9 fires "onmouseover" 
    // again for the image when entering an area, so all areas would stay highlighted when entering
    // a specific area in those browsers otherwise. It makes no difference for other browsers.

    map.mapster('unbind')
        .mapster(opts)
        .bind('mouseover', function () {
            if (!inArea) {
                map.mapster('set_options', all_opts)
                    .mapster('set', true, 'all')
                    .mapster('set_options', single_opts);
            }
        }).bind('mouseout', function () {
            if (!inArea) {
                map.mapster('set', false, 'all');
            }
        });

// These are called when user hovers over data in table
function tableOver(num){
    map = $('#mapper');
    $( "#" + num ).addClass("hovered");
    map.mapster('set_options', single_opts)
        .mapster('set', true, "" + num);
    console.log(num + " added active");

}

function tableOut(num){
    map = $('#mapper');
    $( "#" + num ).removeClass("hovered");
    map.mapster('set_options', single_opts)
        .mapster('set', false, "" + num);

}

function mapData(x, y, id){
    var mapHTML = "<area shape=\"circle\" ";
    mapHTML += "id=\"" + id + "\" ";
    mapHTML += "data-name=\"" + id + ",all\" ";
    mapHTML += "coords=\"" + x + "," + y + ",10\" href=\"#\">";
    alert(mapHTML);
    $(".mapper-map").append(mapHTML);
}

function dataClick(id){
    if(createMode){
        mapData(x,y,id);
    }
    createMode = false;
}

function createMapping(event, img){
        //Handles click of map (used for adding new mappings)
    /* Order of events:
    1. Store X and Y locations of click
    2. Highlight data in table that has not been mapped (TODO)
    3. Wait for user to click data to map to (TODO)
    4. Send to "mapData" function that takes x, y, and id, and adds to map (TODO)
    */

    x = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
    y = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;
    createMode = true;

}

$(document).ready(function() {
    console.log("ready");
  $('img').imgAreaSelect({
    handles: true
  });

});