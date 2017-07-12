// createMode indicates if we are or are not in create mode
var createMode = false;
var deleteMode = false;

/** Coordinates of last point clicked on image. */
var x, y;

/** data store for tagged features/rows */
var ids = [];

function insertAndMapData(x, y, id){
    console.log("Mapping id: " + id + " to coordinates " + x + "," + y);
    if (id == " " || x == null){
        console.log("Invalid ID");
        alert("ID is not valid.");
        return;
    }
    if(ids[id]){
        console.log("Data already mapped");
        return;
    }
    ids[id] = x + "," + y; // adds to ID array
    mapData(x,y,id);
}

//////
/*var a = jQuery('<area/>', { 'shape': "circle", 'id': id, 'data-name': "1,all", 'coords': x + "," + y + ",10", 'href': "#" });

var a = $('<area />', {
    'shape': 'circle',
    'id': '1',
    'da'
})
a['shape'] = 'circle';
a['id'] = '1';
a['data-name'] = '1,all';
a['coords'] = '191,81,10';
a['href'] = '#';
$(".mapper-map").append(a);
*/

//////

function mapData(x,y,id){
    var mapHTML = "<area shape=\"circle\" ";
    mapHTML += "id=\"" + id + "\" ";
    mapHTML += "data-name=\"" + id + ",all\" ";
    mapHTML += "coords=\"" + x + "," + y + ",10\" href=\"#\">";
    $(".mapper-map").append(mapHTML);
    
    if(!deleteMode)
        $('#tagged' + id).show();

    map = $('#mapper');
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
}

function unmapData(id){
    var mapHTML;
    console.log("Delete tag for id: " + id + " from coords " + ids[id]);
    if (id === ""){
        console.log("Invalid ID");
        return;
    }

    $('#deleteTag' + id).hide();
    
    delete ids[id];

    $(".mapper-map").empty(); //clear html ?

    map = $('#mapper');
    map.mapster('unbind')
            
    for (var row in ids){
        console.log(row + " " + ids[row]);
        if(ids[row]){
            var coords = ids[row].split(',');
            console.log(coords[0] + "," + coords[1]);
            mapData(coords[0],coords[1],row);
        }
    }
}


/**
 * gets called from map.html document ready function if
 * data already exists for map
 */
function build_mappings(mappingsString){
    var maps = mappingsString.split('\n');
    for(var i = 0; i < maps.length - 1; i++){
        to_map = maps[i].split(',');
        insertAndMapData(to_map[1],to_map[2],to_map[0]);
    }
}

/**
 * onClick handler which is attached to the rows after clicking on image
 * 
 * 
 */
function dataClick(id){
    if (createMode) {
        insertAndMapData(x,y,id);
    }
    createMode = false;

    // use toggle class, elements same as line 120 in csv.js @ 1111c0a373f706c7a6e0d8aa46d3a06258ea7a27
    $('.unlinked').removeClass("unlinked");
    $('.linked').removeClass("linked");
    $('.greyOut').removeClass("greyOut");
}
