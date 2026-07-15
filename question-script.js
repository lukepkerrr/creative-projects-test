const YESACT = 'images/yes-active.svg';
const YESINACT = 'images/yes-inactive.svg'

const ANSWERINPUT = document.querySelector('.answer input');
const ACCEPTBUTTON = document.querySelector('.check-answer img');

function updateIcon() {
	if (ANSWERINPUT.value.trim() === '') {
		ACCEPTBUTTON.src = YESINACT;
	} else {
		ACCEPTBUTTON.src = YESACT;
	}
}

ANSWERINPUT.addEventListener('input', updateIcon);