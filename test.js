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

/**
var input = ['juan'];
// var input = ['juan', 'dos', 'tres'];
// var input = [['juan'], ['dos'], ['tres']];
var output = normalizeCSV(input);

console.log(output);
**/