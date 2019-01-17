var baseUrl = '/kodilla.com/pl/bootcamp-api';
var prefixURL = 'https://cors-anywhere.herokuapp.com';
var myHeaders = {
  'X-Client-Id': '3026',
  'X-Auth-Token': 'ba6a0a14a3cf22cde1f92f0d07d71ae1'
};
var dropdownBtn = $('#drop-btn');
var dropdownContainer = $('#drop-cont');

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: prefixURL + baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
			var col = new Column(column.id, column.name);
      board.createColumn(col);
      setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
  cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.createCard(cardObj);
  })
}

// dropdown menu

function dropdown(btn, container) {
	btn.mouseenter(function(){
		$(this).addClass('show');
		container.css('display', 'block');
	});
	container.mouseleave(function(){
		$(this).removeClass('show');
		container.css('display', 'none');
	});
};

dropdown(dropdownBtn, dropdownContainer);