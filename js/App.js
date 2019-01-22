var baseUrl = '/kodilla.com/pl/bootcamp-api';
var prefixURL = 'https://cors-anywhere.herokuapp.com';
var myHeaders = {
  'X-Client-Id': '3026',
  'X-Auth-Token': 'ba6a0a14a3cf22cde1f92f0d07d71ae1'
};
var dropdownBtn = $('#drop-btn');
var dropdownContainer = $('#drop-cont');
var navContainer = $('.head-nav');
var dropBckgrnd = $('#drop-background-btn');
var dropBckgrndContainer = $('#drop-background-list');
var navDropBckgrnd = $('#drop-background');
var chooseBckgrnd = $('.choose-bckgrnd');

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
  console.log($(this).data('back'));
  switch ($(this).data('back')) {
    case 'mountain':
      $('body').css('background', 'url(./resources/mountains.jpg) no-repeat center fixed');
      break
    case 'sea':
      $('body').css('background', 'url(./resources/sea.jpg) no-repeat center fixed');
      break
    case 'city':
      $('body').css('background', 'url(./resources/city.jpg) no-repeat center fixed');
      break
    default:
      ('body').css('background', 'rgba(0,0,0,.18)');
  }     
});

// dropdown menu

function dropdown(btn, container, nav) {
	btn.mouseenter(function(){
		container.css('display', 'block');
	});
	$(nav).mouseleave(function(){
		container.css('display', 'none');
  });  
};

dropdown(dropdownBtn, dropdownContainer, navContainer);
dropdown(dropBckgrnd, dropBckgrndContainer, navDropBckgrnd);