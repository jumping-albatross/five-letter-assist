console.log('>>> game.js');

let maxBlock = 5;
let gameFin = 0;
let currentRow = 0; let nextRowBlock = 0; let remNotification = 0;

// https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// https://www.w3schools.com/js/js_arrow_function.asp

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let bigContainer = document.createElement('div');
bigContainer.id = 'bigContainer';
document.body.append(bigContainer);

let containerA = document.createElement('div');
containerA.id = 'containerA';
containerA.style.width = '50%';
containerA.style.float = 'left';
bigContainer.append(containerA);
// document.body.append(containerA);

let containerB = document.createElement('div');
containerB.id = 'containerB';
containerB.style.width = '150px';
containerB.style.height = '400px';
containerB.style.float = 'right';
containerB.style.overflow = 'scroll';
bigContainer.append(containerB);
// document.body.append(containerB);

// let textList = document.createElement('div');
// textList.className = 'textBoxy';
// textList.style.height = '100%';
// textList.id = 'noID';
// textList.textContent = '';
// textList.contentEditable = 'false';

// https://github.com/AnsonLai/OctordleReformat/
// https://stackoverflow.com/questions/5754712/add-characters-to-a-string-in-javascript
// https://stackoverflow.com/questions/9980416/how-can-i-insert-new-line-carriage-returns-into-an-element-textcontent
// https://coder-coder.com/display-divs-side-by-side/

// textList.setAttribute('style', 'white-space: pre;');

// let pre = ''

// advanced.forEach(element => {
// 	if (element[0] === 'A') {
// 		let p = document.createElement('p');
// 		p.textContent = element;
// 		containerB.append(p);
// 		// textList.textContent += pre + element;
// 		// pre = '\n';
// 	};
// });

// containerB.innerHTML = '';

// textList.innerText = 'Nothing to see guessing!\nMore\nMore\nAgain\nAgain'

// containerB.append(textList);

gameStart();
updateContainer(advanced, [], ['', '', '', '', ''], ['', '', '', '', ''], []);

function updateContainer(wordList, known_letters, known_positions, excluded_positions, excluded_letters_2) {
	// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates

	console.log('>> updateContainer');

	console.log('known_letters, known_positions, excluded_positions', known_letters, known_positions, excluded_positions);
	console.log('length of wordList', wordList.length);

	// clear the container
	let container = containerB;
	container.innerHTML = '';

	// TO DO
	/*	exclude word:
			without		 					known_letters
			with							excluded_letters_2
			without correct letters in	 	known_positions
			with wrong letters in 			excluded_positions
		ignore excluded_letters variable
	*/

	let areLettersKnown = known_positions.join('').length > 0;

	wordList.forEach(word => {

		let isExcluded = false;

		// #1 exclude words without known_letters
		known_letters.forEach(kl => {
			if (!word.includes(kl)) {
				isExcluded = true;
			}
		});

		// #1, part 2 exclude words with excluded_letters_2
		excluded_letters_2.forEach(el =>{
			if(word.includes(el)){
				isExcluded = true;
			}
		})


		// #2 exclude words without correct letters in their correct positions
		if (areLettersKnown) {
			for (let i = 0; i < word.length; i++) {
				if (known_positions[i] != '' && known_positions[i] != word[i]) {
					isExcluded = true;
				}
			}
		}

		// #3 exclude 	with incorrect letters in	unknown_positions
		if (!isExcluded) {
			for (let i = 0; i < excluded_positions.length; i++) {
				if (excluded_positions[i] === word[i]) {
					isExcluded = true;
				}
			}
		};

		if (!isExcluded) {
			let p = document.createElement('p');
			p.textContent = word;
			container.append(p);
		};

	});
	// if (element[0] === 'A') {
	// 	let p = document.createElement('p');
	// 	p.textContent = element;
	// 	containerL.append(p);

}

function openModal(type, notification) {
	let modal = document.createElement('div');
	modal.id = 'modal';
	if (type == 'endScore') {
		let message = document.createElement('span');
		message.className = 'modalMessage';
		message.innerHTML = notification;
		modal.append(message);

		setTimeout(function () {
			document.addEventListener('click', restartClick);
			document.addEventListener('keyup', restart);
		}, 100);
	}


	containerA.prepend(modal);
	setTimeout(function () {
		modal.style.cssText = 'opacity: 1';
	}, 1);

	let shadowBack = document.createElement('div');
	shadowBack.id = 'shadowBack';
	containerA.prepend(shadowBack);
	setTimeout(function () {
		shadowBack.style.cssText = 'opacity: .35';
	}, 1);

	let modalClose = document.createElement('button');
	modalClose.id = 'modalClose';
	modalClose.innerText = 'Close \u23CE';
	modalClose.modal = modal;
	modalClose.shadowBack = shadowBack;
	modalClose.addEventListener('click', closeModal);
	modal.prepend(modalClose);
}

function addLogo() {
	console.log('> addLogo()');

	let logo = document.createElement('div');
	logo.className = 'logo';
	logo.addEventListener("click", logoClick);

	let domName = 'ASSISTER';
	for (i = 0; i < domName.length; i++) {
		let spanClass = (i == 0 || i % 2 == 0) ? 'logo_green' : 'logo_gold';
		let logoSpan = document.createElement('span');
		logoSpan.className = spanClass;
		logoSpan.innerText = domName[i];
		logo.append(logoSpan);
	}

	containerA.append(logo);
	console.log('< addLogo()');
}

function setGlobal() {
	console.log('> setGlobal()');
	updateContainer(advanced, [], ['', '', '', '', ''], ['', '', '', '', ''], []);
	gameFin = 0;
	currentRow = 0;
	nextRowBlock = 0;
	remNotification = 0;
	console.log('< setGlobal()');
}



function gameOver() {
	console.log('> gameOver()');

	gameFin = 1;
	document.removeEventListener('keyup', deleteClick, false);
	document.removeEventListener('keyup', keyPress, false);
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', logoClick, false);
	document.removeEventListener('click', enterClick, false);
	document.removeEventListener('click', levelModal, false);
	document.removeEventListener('click', closeModal, false);

	console.log('> gameOver()');
}

function gameStart() {
	console.log('> gameStart()');
	setGlobal();
	containerA.innerHTML = '';
	// let wordType = (level == 'beginner') ? beginner : ((level == 'intermediate') ? intermediate : ((level == 'advanced') ? advanced : ((level == 'godmode') ? fullList : custom)));
	let wordType = advanced;

	console.log(advanced.length, wordType.length);

	let rand = Math.floor(Math.random() * wordType.length);
	chosenWord = wordType[rand].toUpperCase();
	console.log(chosenWord);
	addLogo();

	let navBar = document.createElement('div');
	navBar.className = 'nav_bar';


	let levelSelect = document.createElement('button');
	levelSelect.id = 'levelSelectBtn';
	levelSelect.className = 'btn';
	levelSelect.innerText = 'does nothing';
	levelSelect.addEventListener('click', levelModal = function (event) {
		openModal('charSelect');
	})
	navBar.append(levelSelect);
	containerA.append(navBar);

	let gameArea = document.createElement('div');
	gameArea.className = 'game_area';
	for (i = 0; i < 6; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		for (j = 0; j < maxBlock; j++) {
			let rowBlock = document.createElement('div');
			rowBlock.className = 'row_block';
			row.append(rowBlock);
		}
		gameArea.append(row);
	}
	containerA.append(gameArea);

	let notification = document.createElement('div');
	notification.id = 'notification';
	notification.innerText = 'Start guessing!'
	containerA.append(notification);

	// let keyLayoutTop = 'ABCDEFGHIJ';
	// let keyLayoutMid = 'KLMNOPQRS';
	// let keyLayoutBot = 'TUVWXYZ';
	let keyLayoutTop = 'QWERTYUIOP';
	let keyLayoutMid = 'ASDFGHJKL';
	let keyLayoutBot = 'ZXCVBNM';

	let keyboard = document.createElement('div');
	keyboard.id = 'keyboard';

	let topKeys = document.createElement('div');
	topKeys.id = 'topKeys';
	addKeys(topKeys, keyLayoutTop, 'keyboardKey_s');
	keyboard.append(topKeys);

	let midKeys = document.createElement('div');
	midKeys.id = 'midKeys';
	addKeys(midKeys, keyLayoutMid, 'keyboardKey_m');
	keyboard.append(midKeys);

	let botKeys = document.createElement('div');
	botKeys.id = 'botKeys';

	let deleteKey = document.createElement('span');
	deleteKey.className = 'keyboardKey_l';
	deleteKey.innerHTML = '&#x2190;';
	deleteKey.addEventListener("click", deleteClick);
	botKeys.append(deleteKey);
	addKeys(botKeys, keyLayoutBot, 'keyboardKey_s');

	let enterKey = document.createElement('span');
	enterKey.className = 'keyboardKey_l';
	enterKey.innerText = 'Enter';
	enterKey.addEventListener("click", enterClick);
	botKeys.append(enterKey);
	keyboard.append(botKeys);

	containerA.append(keyboard);

	document.addEventListener('keyup', keyPress);
	console.log('< gameStart()');
}

function keyPress(event) {
	// console.log(`<> keyPress(${event.key})`);

	if (gameFin == 0) {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		for (i = 0; i < alphabet.length; i++) {
			if ((event.key === alphabet[i] || event.key === alphabet[i].toUpperCase())) {
				addLetter(rowBlockEl, alphabet[i]);
			}
		}
		if (event.key === 'Enter') {

			submitWord(wordRow);
		}
		if (event.key === 'Backspace') {
			deleteLetter(rowBlockEl);
		}
	}
}

function enterClick() {
	console.log('<> enterClick()');
	if (gameFin == 0) {
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		submitWord(wordRow);
	}
}

function logoClick(event) {
	console.log('<> logoClick()');

	containerA.innerHTML = '';
	gameStart()
}

function restart(event) {
	if (event.key === 'Enter') {
		document.removeEventListener('keyup', restart, false);
		document.removeEventListener('click', restartClick, false);
		gameStart();
	}
}

function restartClick() {
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', restartClick, false);
	gameStart();
}


function closeModal() {
	let modal = event.currentTarget.modal;
	let shadowBack = event.currentTarget.shadowBack;
	modal.style.cssText = 'opacity:0';
	shadowBack.style.cssText = 'opacity:0';
	setTimeout(function () {
		modal.remove();
		shadowBack.remove();
	}, 355);
}

function deleteClick() {
	if (gameFin == 0) {
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		deleteLetter(rowBlockEl);
	}
}

function keyboardPress() {
	if (gameFin == 0) {
		let layout = event.currentTarget.layout;
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		addLetter(rowBlockEl, layout);
	}
}

function deleteLetter(rowBlockEl) {
	if (nextRowBlock > 0) {
		nextRowBlock--;
		rowBlockEl[nextRowBlock].innerText = '';
	}
}

function count(str, find) {
	return (str.split(find)).length - 1;
}

function checkAnswer(wordRow, answer) {
	let score = 0;

	console.log(wordRow, answer);
	let answerArray = [];

	for (i = 0; i < answer.length; i++) {
		let letter = answer[i].toUpperCase();
		answerArray.push(letter);
		let blockClass = 'blockGrey';
		if (chosenWord.toUpperCase().includes(letter)) {
			if (chosenWord[i].toUpperCase() === letter) {
				score++;
				blockClass = ' blockGreen';
				if (count(answer, letter) > count(chosenWord, letter)) {
					for (j = 0; j < wordRow.childNodes.length; j++) {
						if (wordRow.childNodes[j].innerText == letter && wordRow.childNodes[j].className == 'row_block  blockGold') {
							wordRow.childNodes[j].className = 'row_block  blockGrey';
							let index = answerArray.indexOf(letter);
							if (index !== -1) {
								answerArray.splice(index, 1);
							}
						}
					}
				}
			} else {
				if (countOccurrences(answerArray, letter) <= count(chosenWord, letter)) {
					blockClass = ' blockGold';
				}
				else {
					blockClass = ' blockGrey';
				}
			}
		}
		wordRow.childNodes[i].className = 'row_block ' + blockClass;
		let keyboard = document.getElementById('keyboard_' + letter);
		if (chosenWord.toUpperCase().includes(letter)) {
			if (letter == chosenWord[i]) {
				if (!keyboard.className.includes('blockGreen')) {
					keyboard.classList.remove('blockGold');
					keyboard.className += ' blockGreen';
				}
			} else {
				if (!keyboard.className.includes('blockGreen') && !keyboard.className.includes('blockGold')) {
					keyboard.className += ' blockGold';
				}
			}
		}
		else {
			if (!keyboard.className.includes('blockGrey')) {
				keyboard.className += ' blockGrey';
			}
		}
	}

	if (score === maxBlock) {


		let url = '<a href="https://duckduckgo.com/' + chosenWord + '+definition&ia=definition" target="_blank">' + chosenWord + '</a>';
		let notification = url;
		gameOver();

		setTimeout(function () {
			openModal('endScore', notification);
		}, 250);
	}
	else if (currentRow == 5) {
		let url = '<a href="https://duckduckgo.com/?q=%22' + chosenWord + '%22+%22definition%22&ia=definition" target="_blank">' + chosenWord + '</a>';
		let notification = url;
		gameOver();

		setTimeout(function () {
			openModal('endScore', notification);
		}, 250);
	}
	else {
		filterWords(wordRow);
		nextRowBlock = 0;
		currentRow++;
	}
}
var z;
function filterWords(wordRow) {
	/* filterWords examines the current word, determines
	 * the duplicate letters, the known letters and the
	 * excluded letters. Then suggested words are filtered
	 * to remove possibilities.
	 */

	let word = wordRow.textContent;

	console.log('>> filterWords');

	let duplicate_letters = new Set();
	let known_positions = ['', '', '', '', ''];
	let known_letters = '';
	let excluded_positions = ['', '', '', '', ''];
	let excluded_letters = [];

	for (let i = 0; i < wordRow.childNodes.length; i++) {
		const element = wordRow.childNodes[i];
		let letter = element.innerText;
		let colour = element.className;
		// console.log(colour, letter, colour.toUpperCase().includes('GOLD'));

		if (colour.toUpperCase().includes('GOLD')) {
			excluded_positions[i] = letter;
			known_letters += letter;
		}
		else if (colour.toUpperCase().includes('GREY')) {
			excluded_positions[i] = letter;
			excluded_letters.push(letter);
		}
		else {
			known_positions[i] = letter;
			known_letters += letter;
		}
	}

	let excluded_letters_2 = [];

	excluded_letters.forEach(letter => {
		if (!known_letters.includes(letter)) {
			excluded_letters_2.push(letter);
		}
	});

	console.log('word', word);
	console.log('dup_let', duplicate_letters);
	console.log('kn_let', known_letters.split(''));
	console.log('kn_pos', known_positions);
	console.log('ex_pos', excluded_positions);
	console.log('ex_let_2', excluded_letters_2);


	// function updateContainer(wordList, known_letters, known_positions, excluded_positions) {


	let wordList = containerB.innerText.split('\n\n');
	updateContainer(wordList, known_letters.split(''), known_positions, excluded_positions, excluded_letters_2);
	// updateContainer(wordList, known_positions, excluded_letters_2, excluded_positions);

	// wordRow.childNodes[i].className = 'row_block ' + blockClass;
}

function submitWord(wordRow) {
	console.log('<> submitWord()');
	if (nextRowBlock > 0 && nextRowBlock % maxBlock == 0) {

		console.log(`innerText ${wordRow.innerText.split('\n')}`);
		console.log(wordRow.innerText.split('\n').join(''), 'joined');

		// let answer = wordRow.innerText.replace(/[\n\r]/g, '');

		let answer = wordRow.innerText.split('\n').join('');

		console.log(answer);

		if (fullList.includes(answer)) {
			checkAnswer(wordRow, answer);
		} else {
			remNotification = 0;
			document.getElementById('notification').innerText = 'Word not in list';
		}
	} else {
		remNotification = 0;
		document.getElementById('notification').innerText = 'You must enter ' + maxBlock + ' characters';
	}
}

function addKeys(el, layout, keyClass) {
	for (i = 0; i < layout.length; i++) {
		let key = document.createElement('span');
		key.className = keyClass;
		key.id = 'keyboard_' + layout[i];
		key.innerText = layout[i];
		key.layout = layout[i];
		key.addEventListener("click", keyboardPress);
		el.append(key);
	}
}

function addLetter(rowBlockEl, letter) {
	// console.log(`<> addLetter(${rowBlockEl}, ${letter})`);
	if (remNotification == 0) {
		remNotification = 1;
		document.getElementById('notification').innerText = '';
	}
	if (nextRowBlock < maxBlock) {
		rowBlockEl[nextRowBlock].innerText = letter.toUpperCase();
		nextRowBlock++;
	}
}

console.log('<<< game.js');