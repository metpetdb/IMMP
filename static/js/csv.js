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

function processFile(e) {
    var file = e.target.result,
        results;
    console.log(file);
    if (file && file.length) {
        results = file.split("\n");
    }
    var csvarray = $.csv.toArrays(file);
    var csvtable = generateTable(csvarray);
    $('#result').empty();
    $('#result').html(csvtable);
    $('#upload').hide();
    $('#files').hide();

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