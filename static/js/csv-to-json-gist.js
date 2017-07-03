// Found at https://gist.github.com/jssuttles/8fb8b16a152558906469dfefbf88f658
function csvJSON(csv){

  var lines=csv.split('\n');

  var result = [];

  var headers=lines[0].split(',');
  lines.splice(0, 1);
  lines.forEach(function(line) {
    var obj = {};
    var currentline = line.split(',');
    headers.forEach(function(header, i) {
      obj[header] = currentline[i];
    });
    result.push(obj);
  });

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}