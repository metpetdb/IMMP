function createMapping(e, img){
    //Handles click of map (used for adding new mappings)
    /* Order of events:
    1. Store X and Y locations of click
    2. Highlight data in table that has not been mapped (TODO)
    3. Wait for user to click data to map to (TODO)
    4. Send to "mapData" function that takes x, y, and id, and adds to map (TODO)
    */

    //don't allow creation of mappings while delete mode active
    if(deleteMode){
        return;
    }

    var offset = $(".mapper").offset();

    var offset_t = $(img).offset().top - $(window).scrollTop();
    var offset_l = $(img).offset().left - $(window).scrollLeft();

    var left = Math.round( (e.clientX - offset_l) );
    var top = Math.round( (e.clientY - offset_t) );

    x = left;
    y = top;
    createMode = true;

    create_visual(ids);

}

/**
 * stores current mappings in mappingString
 * ?
 */
document.getElementById("save").addEventListener("click", function(){
    console.log("Saving...");
    var mappingString = "";
    for (var i = 0; i < ids.length; i++){
        if(ids[i] != null){
            mappingString += i + "," + ids[i] + "\n";
        }
    }

    var id = window.location.pathname;
    id = id.substring(id.indexOf("id=")+3, id.length);

    $.getJSON($SCRIPT_ROOT + '/postmappings', {
    mapID: id,
    mappings: mappingString
      }, function(data) {
      });
    alert("Map saved.");
});

document.getElementById("cancel").addEventListener("click", function(){
    if(confirm("Leave map without saving?")){
        console.log("Redirecting to homepage");
        document.location.replace('/');
    }
})

document.getElementById("help").addEventListener("click",function(){
    alert("To add a mapping, click anywhere on the image, then click the data row you wish to map to that location. If you click the 'Delete Mappings' button, a red X will appear next to each mapped row which allows you to delete mappings you've created. Click 'Create Mappings to return to create mode. Click 'Save' in the bottom right to save your map once you've finished.")
});

document.getElementById("deleteTags").addEventListener("click", function(){
    if(deleteMode === true){
        deleteMode = false;
        hideDeletes();
    }
    else{
        deleteMode = true;
        showDeletes();
    }
})