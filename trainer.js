class Question {
	constructor(answer, image, advice) {
		this.answer = answer;
		this.image = image;
		this.advice = advice;
	}
}

function shuffle(arr) {
	const newArr = [...arr];
	for (let i = newArr.length - 1; i > 0; i--) {
  		const j = Math.floor(Math.random() * (i + 1));
    	[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  	}
  	return newArr;
}

function reloadPage() {
	location.reload();
}

function submitAnswer() {
	const parentDiv = this.parentElement;
	const input = parentDiv.querySelector('input');
	answers.push(input.value.trim().toLowerCase());

	if (answers.length == questions.length) {
		drawAnswers();
	} else {
		const frames = document.querySelectorAll('.frame');
		frames[answers.length - 1].style.display = 'none';
		frames[answers.length].style.display = 'flex';

		const sidebarButtons = document.querySelectorAll('.sidebar-button');
		sidebarButtons[answers.length - 1].classList.replace('current-question', 'completed-question');
		sidebarButtons[answers.length].classList.add('current-question');
	}
}

function updateIcon() {
	const parentDiv = this.parentElement;
	const button = parentDiv.querySelector('button img');

	if (this.value.trim() === '') {
		button.src = YESINACT;
	} else {
		button.src = YESACT;
	}
}

function drawQuestions(questions) {
	for (let i = 0; i < questions.length; i++) {
		const frame = document.createElement('div');
		frame.className = 'frame';
		if (i != 0) {frame.style.display = 'none'};
		const img = document.createElement('img');
		img.className = 'task';
		img.src = questions[i].image;
		const answerDiv = document.createElement('div');
		answerDiv.className = 'answer';
		const span = document.createElement('span');
		span.textContent = questions[i].advice;
		const inputGroup = document.createElement('div');
		const input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('input', updateIcon);
		const button = document.createElement('button');
		button.className = 'check-answer';
		button.addEventListener('click', submitAnswer);
		const buttonImg = document.createElement('img');
		buttonImg.src = 'images/yes-inactive.svg';

		button.appendChild(buttonImg);
		inputGroup.appendChild(input);
		inputGroup.appendChild(button);
		answerDiv.appendChild(span);
		answerDiv.appendChild(inputGroup);
		frame.appendChild(img);
		frame.appendChild(answerDiv);

		const wrapper = document.querySelector('.wrapper');
		wrapper.appendChild(frame);
	}
}

function drawAnswers() {
	const sidebar = document.querySelector('.sidebar');
	sidebar.remove();
	const frames = document.querySelectorAll('.frame');
	for (let i = 0; i < frames.length; i++) {
		frames[i].remove();
	}

	const finalTable = document.createElement('table');
	finalTable.className = 'results';
	const headerRow = document.createElement('tr');
	headerRow.innerHTML = `
		<td>#</td>
        <td>картинка</td>
        <td>правильный ответ</td>
        <td>твой ответ</td>
        <td>результат</td>
	`;
	finalTable.appendChild(headerRow);

	for (let i = 0; i < answers.length; i++) {
		let row = document.createElement('tr');

		let td1 = document.createElement('td');
		td1.innerText = i + 1;
		row.appendChild(td1);

		let td2 = document.createElement('td');
		let logo = document.createElement('img');
		logo.src = questions[i].image;
		logo.className = 'q-logo';
		td2.appendChild(logo);
		row.appendChild(td2);

		let td3 = document.createElement('td');
		td3.innerText = questions[i].answer;
		row.appendChild(td3);

		let td4 = document.createElement('td');
		td4.innerText = answers[i];
		row.appendChild(td4);

		let td5 = document.createElement('td');
		let correct = document.createElement('img');
		if (questions[i].answer.toLowerCase() == answers[i]) {
			correct.src = YESACT;
		} else {
			correct.src = NO;
		};
		correct.className = 'q-answer';
		td5.appendChild(correct);
		row.appendChild(td5);

		finalTable.appendChild(row);
	}

	const wrapper = document.querySelector('.wrapper');
	wrapper.appendChild(finalTable);

	const vowelsRegex = /[аеёиоуыэюяьЪ]/gi;
  
    document.querySelectorAll('td').forEach(cell => {
        if (cell.querySelector('img')) return;
    
        let text = cell.textContent.trim();
        if (!text || !vowelsRegex.test(text)) return;
    
        let parts = text.split(vowelsRegex);
        let matches = text.match(vowelsRegex) || [];
    
        let html = '';
	    for (let i = 0; i < parts.length; i++) {
	        html += parts[i];
	        if (i < matches.length) {
	            html += `<span style="color: red">${matches[i]}</span>`;
	        }
	    }
	    
	    cell.innerHTML = html;
  	});
}

const YESACT = 'images/yes-active.svg';
const YESINACT = 'images/yes-inactive.svg';
const NO = 'images/no.svg';

const TRAINERDATA = [
	new Question('ашан', 'images/questions/ashan.png', 'Напечатай: Ашан'),
	new Question('каток', 'images/questions/bulldozer.png', 'Напечатай: Каток'),
	new Question('каток', 'images/questions/hockey.png', 'Напечатай: Каток'),
	new Question('зелень', 'images/questions/salad.png', 'Напечатай: Зелень'),
	new Question('тюмень', 'images/questions/tumen.png', 'Напечатай: Тюмень')
]

let questions = shuffle(TRAINERDATA);
let answers = [];
drawQuestions(questions);

const reloadButton = document.querySelector('.close-button');
reloadButton.addEventListener('click', reloadPage);