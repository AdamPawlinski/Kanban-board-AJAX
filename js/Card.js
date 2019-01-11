function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardHeader = $('<header class="head"><header>');
		var cardDeleteBtn = $('<button class="button-del button-del-card">x</button>');
		var cardChange = $('<button class="edit-card">edit</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.on('click', function(){
			self.removeCard();
		})
		cardChange.on('click', function() {
			self.changeCard();
		})

		cardHeader.append(cardChange)
				  .append(cardDeleteBtn);

		card.append(cardDeleteBtn);
		card.append(cardChange);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: prefixURL + baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.element.remove();
			}
		})
	},
	changeCard: function () {
		var self = this;
		var cardName = prompt('Enter new card name');	
		$.ajax({
			url: prefixURL + baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: cardName 
			},
			success: function(response){
				self.element;
			}
		})
	}
}
