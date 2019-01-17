var baseUrl = '/kodilla.com/pl/bootcamp-api';
var prefixURL = 'https://cors-anywhere.herokuapp.com';
var myHeaders = {
  'X-Client-Id': '3026',
  'X-Auth-Token': 'ba6a0a14a3cf22cde1f92f0d07d71ae1'
};
var dropdownBtn = $('#drop-btn');
var dropdownContainer = $('ul:first');
var background = $('#background');
var chooseBckgrnd = $('#background-pick');

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

chooseBckgrnd.on('click', function addBackground() {
  switch (this.value) {
    case mountain:
      $('.column-container').css('background', 'url(./resources/mountains.jpg)');
      break
    case sea:
      $('.column-container').css('background', 'url(./resources/mountains.jpg)');
      break
    case city:
      $('.column-container').css('background', 'url(./resources/mountains.jpg)');
      break
    default:
      ('.column-container').css('background', 'rgba(0,0,0,.18)');
  }     
});

// dropdown menu

function dropdown(btn, container) {
	btn.mouseenter(function(){
		container.css('display', 'block');
	});
	container.mouseleave(function(){
		container.css('display', 'none');
  });
  if (background) {
    background.mouseenter(function(){
      $('#background-pick').css('display', 'block');
    });
  };
};

dropdown(dropdownBtn, dropdownContainer);