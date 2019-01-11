var board = {
	name: 'Kanban Board',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column').on('click', function() {
	var columnName = prompt('Enter a column name');
	if (columnName === null) {
		return
	}
	$.ajax({
		url: prefixURL + baseUrl + '/column',
		method: 'POST',
		data: {
      name: columnName
    },
		success: function(response) {
			var column = new Column(response.id, columnName);
			board.createColumn(column);
		}
	});
});

function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }
