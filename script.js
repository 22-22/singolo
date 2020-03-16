const MENU = document.querySelector('.navigation');
const PHONEVERT = document.querySelector('.slider__phone-vertical');
const PHONEHOR = document.querySelector('.slider__phone-horizontal');
const TAGS = document.querySelector('.tags');
let PORTFOLIO = document.querySelector('.portfolio__layout-4-columns');
const SLIDE2 = document.querySelector('.slide-2');
const FORM = document.querySelector('.form');
const MODAL = document.querySelector('.modal')


MENU.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__name')) {
		MENU.querySelectorAll('.navigation__name').forEach(item => item.classList.remove('active'));
		event.target.classList.add('active');
	}
});

PHONEVERT.addEventListener('click', (event) => {
	if (PHONEVERT.querySelector('#sv').classList.contains('hidden')) {
		PHONEVERT.querySelector('#sv').classList.remove('hidden');
	} else {
		PHONEVERT.querySelector('#sv').classList.add('hidden');
	}
});

PHONEHOR.addEventListener('click', (event) => {
	if (PHONEHOR.querySelector('#sh').classList.contains('hidden')) {
		PHONEHOR.querySelector('#sh').classList.remove('hidden');
	} else {
		PHONEHOR.querySelector('#sh').classList.add('hidden');
	}
});

PORTFOLIO.addEventListener('click', (event) => {
	PORTFOLIO.querySelectorAll('.portfolio__image > img').forEach(item => item.classList.remove('portfolio-border'));
	event.target.classList.add('portfolio-border');
});

TAGS.addEventListener('click', (event) => {
	TAGS.querySelectorAll('.tag').forEach(item => item.classList.remove('active'));
	event.target.classList.add('active');
	random();
});

function random() {
	let randomArr = [];
	PORTFOLIO.querySelectorAll('.portfolio__image').forEach(item => randomArr.push(item));
	randomArr.sort(() => Math.random() - 0.5);
	PORTFOLIO.innerHTML = '';
	randomArr.forEach(item => PORTFOLIO.append(item));
}

document.querySelector('.slider-container').addEventListener('click', (event) => {
	if (event.target.classList.contains('arrow')) {
		if (SLIDE2.classList.contains('hidden')) {
			SLIDE2.classList.remove('hidden');
			document.querySelector('.slider').setAttribute("style", "background: #648BF0; border-bottom: 6px solid #ffffff;");
		} else {
			SLIDE2.classList.add('hidden');
			document.querySelector('.slider').style.background = '#f06c64';
		}
	}
});

FORM.addEventListener('submit', (event) => {
	event.preventDefault();
	showMessage();
})

function showMessage() {
	MODAL.classList.remove('hidden');
	let subject = FORM.querySelector('.subject').value;
	let description = FORM.querySelector('.textarea').value;
	MODAL.querySelector('.modal__content').innerText = 'Письмо отправлено \n';
	if (FORM.querySelector('.subject').value == '') {
		MODAL.querySelector('.modal__content').innerText += 'Без темы \n';
	} else {
		MODAL.querySelector('.modal__content').innerText += `Тема: ${subject} \n`;
	}

	if (FORM.querySelector('.textarea').value == '') {
		MODAL.querySelector('.modal__content').innerText += 'Без описания \n';
	} else {
		MODAL.querySelector('.modal__content').innerText += `Описание: ${description}`;
	}	
}

MODAL.addEventListener('click', () => {
	MODAL.classList.add('hidden');
	
});


