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



document.getElementById("save").addEventListener("click", function(){
    console.log("Saving...");
    var mappingString = "";
    for (var i = 0; i < ids.length; i++){
        if(ids[i] != null){
            console.log("Converting id: " + i + " into string");
            mappingString += i + "," + ids[i] + "\n";
            console.log("Current maps to store: \n" + mappingString);
        }
    }
    console.log("Pushing to database...");

    var id = window.location.pathname;
    id = id.substring(id.indexOf("id=")+3, id.length);

    $.getJSON($SCRIPT_ROOT + '/postmappings', {
    mapID: id,
    mappings: mappingString
      }, function(data) {
        console.log(data.mappings);
      });

});