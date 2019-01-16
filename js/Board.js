var board = {
	name: 'Kanban Board',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('#create-column').on('click', function() {
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

// dropdown menu

$('.dropdown-nav').mouseenter(function(){
	$(this).addClass('show');
	$('.dropdown-container').css('display', 'block');
	console.dir(this);
});
$('.dropdown-container').mouseleave(function(){
	$(this).removeClass('show');
	$('.dropdown-container').css('display', 'none');
});

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: '.card-placeholder'
		}).disableSelection();
		$('.column-container').sortable({
      connectWith: '.column-container',
      placeholder: '.card-placeholder'
		}).disableSelection();
  }
