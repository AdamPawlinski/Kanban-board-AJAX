function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardHeader = $('<header class="head"><header>');
		var cardNav = $('<nav class="head-nav card-nav"></nav>');
		var cardButton = $('<button class="dropdown-btn dropdown-card" id="drop-card-btn">...</button>');
		var cardNavContainer = $('<ul class="dropdown-container card-nav-container" id="drop-card-cont"></ul>');
		var cardDeleteBtn = $('<li class="dropdown-list button-del button-del-card"><a class="dropdown-link" href="#">delete</a></li>');
		var cardChange = $('<li class="dropdown-list edit-card"><a class="dropdown-link" href="#">edit</a></li>');
		var cardColor = $('<li class="dropdown-list color-card"><label class="dropdown-link">card color<input type="color" id="card-color" value></label></li>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.on('click', function(){
			self.removeCard();
		});
		cardChange.on('click', function() {
			self.changeCard();
		});

		dropdown(cardButton, cardNavContainer);

		cardColor.on('change', function() {
			var color = $('#card-color').val();
			self.css('background-color', color);
		});

		card.hover(
			function(){
				cardNav.css('visibility', 'visible');				
			},
			function(){
				cardNav.css('visibility', 'hidden');
			}
		);

		cardNavContainer.append(cardChange)
						.append(cardColor)
						.append(cardDeleteBtn);

		cardNav.append(cardButton)
				.append(cardNavContainer);

		cardHeader.append(cardNav);
		
		cardDescription.text(self.name);
		card.append(cardHeader)
			.append(cardDescription);

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
