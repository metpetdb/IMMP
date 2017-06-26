// createMode indicates if we are or are not in create mode
var createMode = false;
var deleteMode = false;
var x;
var y;
var ids = [];

function mapData(x, y, id){
    console.log("Mapping id: " + id + " to coordinates " + x + "," + y);
    if (id == " " || x == null){
        console.log("Invalid ID");
        return;
    }
    if(ids[id]){
        console.log("Data already mapped");
        return;
    }
    ids[id] = x + "," + y; // adds to ID array
    var mapHTML = "<area shape=\"circle\" ";
    mapHTML += "id=\"" + id + "\" ";
    mapHTML += "data-name=\"" + id + ",all\" ";
    mapHTML += "coords=\"" + x + "," + y + ",10\" href=\"#\">";
    $(".mapper-map").append(mapHTML);

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


function build_mappings(mappingsString){
    var maps = mappingsString.split('\n');
    for(var i = 0; i < maps.length - 1; i++){
        to_map = maps[i].split(',');
        mapData(to_map[1],to_map[2],to_map[0]);
    }
}

function dataClick(id){
    if(createMode){
        mapData(x,y,id);
    }
    createMode = false;
    $('.unlinked').removeClass("unlinked");
    $('.linked').removeClass("linked");
    $('.greyOut').removeClass("greyOut");
}