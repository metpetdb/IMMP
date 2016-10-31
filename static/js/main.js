// createMode indicates if we are or are not in create mode
var createMode = false;
var x;
var y;
var ids = [];

function mapData(x, y, id){
    var mapHTML = "<area shape=\"circle\" ";
    mapHTML += "id=\"" + id + "\" ";
    mapHTML += "data-name=\"" + id + ",all\" ";
    mapHTML += "coords=\"" + x + "," + y + ",10\" href=\"#\">";
    console.log(mapHTML);
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

function dataClick(id){
    if(createMode){
        mapData(x,y,id);
        ids.push(id);
    }
    createMode = false;
    $('#result').removeClass("unlinked");
}

function createMapping(e, img){
    //Handles click of map (used for adding new mappings)
    /* Order of events:
    1. Store X and Y locations of click
    2. Highlight data in table that has not been mapped (TODO)
    3. Wait for user to click data to map to (TODO)
    4. Send to "mapData" function that takes x, y, and id, and adds to map (TODO)
    */
    var offset = $(".mapper").offset();

    // x = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
    // y = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;

    var offset_t = $(img).offset().top - $(window).scrollTop();
    var offset_l = $(img).offset().left - $(window).scrollLeft();

    var left = Math.round( (e.clientX - offset_l) );
    var top = Math.round( (e.clientY - offset_t) );

    console.log("Left: " + left + " Top: " + top);

    x = left;
    y = top;
    createMode = true;

    create_visual(ids);

}

