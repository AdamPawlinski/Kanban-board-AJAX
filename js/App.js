var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3026',
  'X-Auth-Token': 'ba6a0a14a3cf22cde1f92f0d07d71ae1'
};

$.ajaxSetup({
	headers: myHeaders
});
$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
			var col = new Column(column.id, column.name);
      board.createColumn(col);
    });
}
