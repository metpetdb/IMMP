var fileInput = $('#files');
var uploadButton = $('#upload');
var deleteTagButton = $('#deleteTag');

uploadButton.on('click', function uploadButtonClick() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);

    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing');
    }

});

/**
 * this and show_* runs once when new image
 * 
 * and once on load
 * hide is called every time image is loaded in build_table? shouldn't it just be once?
 */
function hide_csv_import(){
  $('#result').empty();
  $('#upload').hide();
  $('#files').hide();
}

function show_csv_import(){
  $('#upload').show();
  $('#files').show();
}

function processFile(e) {
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
    }
    var csvarray = $.csv.toArrays(file);
    var csvstring = $.csv.fromArrays(csvarray);
    push_csv_to_db(csvstring);
    var csvtable = generateTable(csvarray);
    hide_csv_import();
    $('#result').html(csvtable);

}

/**
 * HAPPENS ON LAUNCH (document.ready in map.html)
 */
function build_table(csv){
  var csvarray = $.csv.toArrays(csv);
  var csvtable = generateTable(csvarray);
  hide_csv_import();
  $('#result').html(csvtable);
}

function push_csv_to_db(csv){
  var id = window.location.pathname;
  id = id.substring(id.indexOf("id=")+3, id.length);
  $.getJSON($SCRIPT_ROOT + '/postcsv', {
    mapID: id,
    csv: csv
  }, function(data) {
  });
}

/**
 * Normalizes data to Matrix of Strings
 * 
 * Converts List of strings to list of 1-length lists of strings, passes
 * through list of list of strings as passed in.
 * 
 * @param csvData ['string'] or [['string']]
 * @return matrix of strings
 */
function normalizeCSV(csvData) {
  if (csvData[0].constructor === String) {
    return csvData.map(function (row) {
      return [row];
    });
  } else if (csvData[0].constructor === Array &&
    csvData[0][0].constructor === String) {
    return csvData;
  } else {
    // alert('Error: csvData malformed, see console.');
    console.log(csvData);
    throw new Error('csvData');
  }
}

// build HTML table data from an array (one or two dimensional)
/**
 * normalizes data
 * 
 * array: if csv 
 * @param data array[''] or array[[]], array[{}]
 */
function generateTable(data) {
  var html = '';
  if(typeof(data[0]) === 'undefined') {
    return null;
  }

  data = normalizeCSV(data);

  /**
   * constructs html for rows with listeners for tableOver, tableOut, and Click on rows
   * 
   * * tableData tag with column info 
   * * button tag to delete with unmapData onclick listener
   * 
   * @param tableOver, tableOut, dataClick, unmapData
   */
  for(var row in data) {
    //HTML addition for new table row (one for every row in CSV)
    html += '<tr onMouseover="tableOver(' + row + ')" onMouseout="tableOut( ' + row + ')" id="' + row + '" onClick="dataClick( ' + row + ')" class="data-row">\r\n';
    if(row != 0)
      html += '<td><button id=deleteTag' + row + ' class="btn-danger btn-xs" style="display:none;" onclick="unmapData( ' + row + ' )">x</button><button id=tagged' + row + ' class="btn-success btn-xs" style="display:none;">&#10003;</button></td>\r\n';
    else
      html += '<td></td>'
    for(var item in data[row]) {
      html += '<td>' + data[row][item] + '</td>\r\n';
    }
    html += '</tr>\r\n';
  }

  return html;
}

function generateTableFromJSON(json) {
  var tr;
  for (var i = 0; i < json.length; i++) {
      tr = '<tr onMouseover="tableOver(' + i + ')" onMouseout="tableOut( ' + i + ')" id="' + i + '" onClick="dataClick( ' + i + ')" class="data-row">\r\n';
      tr.append("<td>" + json[i].User_Name + "</td>");
      tr.append("<td>" + json[i].score + "</td>");
      tr.append("<td>" + json[i].team + "</td>");
      tr.append("</tr>");
      $('#results').append(tr);
  }
}

/**
 * refactor to use $.fn.toggleClass?
 */
function grey_out(item, index){
    $('#result').find('#' + index).removeClass("unlinked");
    $('#result').find('#' + index).addClass("linked");
}

function create_visual(ids){
  $('.mapper').addClass("greyOut")
  $('#result').find('tr').addClass("unlinked");
  $('#result').find('#0').removeClass("unlinked");
  ids.forEach(grey_out);
}

/**
 * show delete buttons for tagged objects
 */
function showDeletes(){
  $('#delete').hide();
  $('#create').show();
  for (var row in ids){
    if(ids[row]){
      $('#tagged' + row).hide();
      $('#deleteTag' + row).show();
    }
  }
}

function hideDeletes(){
  $('#create').hide();
  $('#delete').show();
  for (var row in ids){
    if(ids[row]){
      $('#tagged' + row).show();
      $('#deleteTag' + row).hide();
    }
  }
}