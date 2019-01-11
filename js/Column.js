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
		var columnDelete = $('<button class="button-del">x</button>');
		var columnChange = $('<button class="edit-col">edit</button>');
		var columnAddCard = $('<button class="button-add-card">Add card</button>');

		columnDelete.on('click', function() {
			self.deleteColumn();
		});

		columnChange.on('click', function() {
			self.columnChange();
		})

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

		columnHeader.append(columnChange)
					.append(columnAddCard)
					.append(columnDelete);

		column.append(columnTitle)
			.append(columnHeader)
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
