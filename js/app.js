const cards = document.querySelectorAll('.card');

let hasFlipped = false;
let lockBoarad = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoarad) return;
	if (this === firstCard) return;
	this.classList.toggle('flip');
	if (!hasFlipped) {
		hasFlipped = true;
		firstCard = this;
	} else {
		hasFlipped = false;
		secondCard = this;
		checkIfMatch();
	}
}

function checkIfMatch() {
	let isMatch = firstCard.dataset.cardvalue === secondCard.dataset.cardvalue;

	isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
	lockBoarad = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1000);
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function resetBoard() {
	[ hasFlipped, lockBoarad ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

(function shuffle() {
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
