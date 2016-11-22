function deleteMap(id){
	$.getJSON($SCRIPT_ROOT + '/deletemap', {
      mapID: id
      }, function(data) {
        // console.log(data.mappings);
    });
}

$(document).ready(function(){
    console.log("listening for deletes");
    $('.delete').click(function(){

    	console.log($(this).parent().attr('id'));
    	deleteMap($(this).parent().attr('id'));
        $(this).parent().remove();
        return false;

    });
});