// javascript

// Set up some options objects: 'single_opts' for when a single area is selected, which will show just a border
// 'all_opts' for when all are highlighted, to use a different effect - shaded white with a white border
// 'initial_opts' for general options that apply to the whole mapster. 'initial_opts' also includes callbacks
// onMouseover and onMouseout, which are fired when an area is entered or left. We will use these to show or
// remove the captions, and also set a flag to let the other code know if we're currently in an area.
var inArea,
    map = $('#mapper'),
    single_opts = {
        fillColor: 'ff0000',
        fillOpacity: 0.2,
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
        },
        onMouseout: function (data) {
            inArea = false;
            $( "#" + data.key ).removeClass("hovered");
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
    //no hover action for title row
    if(num === 0)
        return;
    map = $('#mapper');
    $( "#" + num ).addClass("hovered");
    map.mapster('set_options', single_opts)
        .mapster('set', true, "" + num);

}

function tableOut(num){
    map = $('#mapper');
    $( "#" + num ).removeClass("hovered");
    map.mapster('set_options', single_opts)
        .mapster('set', false, "" + num);

}

$(document).ready(function() {
  $('img').imgAreaSelect({
    handles: true
  });

});