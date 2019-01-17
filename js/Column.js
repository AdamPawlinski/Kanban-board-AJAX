function Column(id, name) {
	var self = this;

	self.id = id;
  	self.name = name || 'No name given';
	self.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="column-card-list"></ul>');
		var columnHeader = $('<header class="head column-head"></header>');
		var columnNav = $('<nav class="head-nav column-nav"></nav>');
		var columnButton = $('<button class="dropdown-btn dropdown-col" id="drop-col-btn">...</button>')
		var columnNavContainer = $('<ul class="dropdown-container column-nav-container" id ="drop-col-cont"></ul>')
		var columnDelete = $('<li class="dropdown-list del-col"><a class="dropdown-link" href="#">delete</a></li>');
		var columnChange = $('<li class="dropdown-list edit-col"><a class="dropdown-link" href="#">edit column</a></li>');
		var columnAddCard = $('<li class="dropdown-list add-card"><a class="dropdown-link" href="#">Add card</a></li>');
		var columnColor = $('<li class="dropdown-list color-col"></li>');
		var columnColorPicker = $('<span class="dropdown-link">column color<input type="color" id="col-color" value></span>');

		dropdown(columnButton, columnNavContainer);		

		columnDelete.on('click', function() {
			self.deleteColumn();
		});

		columnChange.on('click', function() {
			self.columnChange();
		});

		columnColor.on('click', function(){
			columnColorPicker.on('change', function() {
				var color = $('#col-color').val();
				column.css('background-color', color);
			});
		});

		columnAddCard.on('click', function(event) {
			var cardName = prompt("Enter the name of the card");
			if (cardName === null) {
				return
			}
			event.preventDefault();
			$.ajax({
				url: prefixURL + baseUrl + '/card',
				method: 'POST',
				data: {
						name: cardName,
						bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
							var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});

		columnColor.append(columnColorPicker);

		columnNavContainer.append(columnAddCard)
						.append(columnChange)
						.append(columnColor)
						.append(columnDelete);

		columnNav.append(columnButton)
				 .append(columnNavContainer);

		columnHeader.append(columnTitle)
					.append(columnNav);					

		column.append(columnHeader)
			.append(columnCardList);
		
		return column;
		}
}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {		
		var self = this;
		if (confirm("Do you really want to delete the " + self.name + " column?"));
		$.ajax({
		url: prefixURL + baseUrl + '/column/' + self.id,
		method: 'DELETE',
		success: function(response){
		self.element.remove();
		}
		});
	 },
	columnChange: function() {
		var columnName = prompt("Enter the new name of the column");
		if (columnName === null) {
			return
		}
		event.preventDefault();
		$.ajax({
			url: prefixURL + baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: columnName
			},
			success: function(response) {					
				self.response;
			}
		});
	 }
};
