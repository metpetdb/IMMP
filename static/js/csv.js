var fileInput = $('#files');
var uploadButton = $('#upload');

uploadButton.on('click', function() {
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
    console.log(file);
    if (file && file.length) {
        results = file.split("\n");
    }
    var csvarray = $.csv.toArrays(file);
    var csvstring = $.csv.fromArrays(csvarray);
    console.log(csvstring);
    push_csv_to_db(csvstring);
    var csvtable = generateTable(csvarray);
    hide_csv_import();
    $('#result').html(csvtable);

}

function build_table(csv){
  var csvarray = $.csv.toArrays(csv);
  var csvtable = generateTable(csvarray);
  hide_csv_import();
  $('#result').html(csvtable);
}

function push_csv_to_db(csv){
  var id = window.location.pathname;
  id = id.substring(id.indexOf("id=")+3, id.length);
  console.log("Currently modifying the CSV data for ID #" + id);
  console.log("Provided CSV data: \n" + csv);
  $.getJSON($SCRIPT_ROOT + '/postcsv', {
    mapID: id,
    csv: csv
  }, function(data) {
    console.log(data.csv);
  });
}

// build HTML table data from an array (one or two dimensional)
function generateTable(data) {
  var html = '';
  if(typeof(data[0]) === 'undefined') {
    return null;
  }
  if(data[0].constructor === String) {
    html += '<tr>\r\n';
    for(var item in data) {
      html += '<td>' + data[item] + '</td>\r\n';
    }
    html += '</tr>\r\n';
  }
  if(data[0].constructor === Array) {
    for(var row in data) {
      //HTML addition for new table row (one for every row in CSV)
      html += '<tr onMouseover="tableOver(' + row + ')" onMouseout="tableOut( ' + row + ')" id="' + row + '" onClick="dataClick( ' + row + ')" class="data-row">\r\n';
      for(var item in data[row]) {
        html += '<td>' + data[row][item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }
  }
  if(data[0].constructor === Object) {
    for(var row in data) {
      html += '<tr>\r\n';
      for(var item in data[row]) {
        html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }
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

function grey_out(item, index){
    console.log("greying out" + index);
    $('#result').find('#' + index).removeClass("unlinked");
    $('#result').find('#' + index).addClass("linked");
}

function create_visual(ids){
  $('.mapper').addClass("greyOut")
  $('#result').find('tr').addClass("unlinked");
  $('#result').find('#0').removeClass("unlinked");
  ids.forEach(grey_out)
  console.log(ids)
}