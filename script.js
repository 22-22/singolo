const HEADER = document.querySelector('#header');
const MENU = document.querySelector('.navigation');
const PHONEVERT = document.querySelector('.slider__phone-vertical');
const PHONEHOR = document.querySelector('.slider__phone-horizontal');
const TAGS = document.querySelector('.tags');
let PORTFOLIO = document.querySelector('.portfolio__layout-4-columns');
const FORM = document.querySelector('.form');
const MODAL = document.querySelector('.modal')

//change active menu element
MENU.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__name')) {
		MENU.querySelectorAll('.navigation__name').forEach(item => item.classList.remove('active-nav'));
		event.target.classList.add('active-nav');
	}
});

//scroll with changing active menu element
document.addEventListener('scroll', onScroll);

function onScroll(event) {
	const curPosition = window.scrollY + HEADER.offsetHeight;
	const sections = document.querySelectorAll('body > section');
	const links = document.querySelectorAll('.navigation__name');

	sections.forEach((el) => {
		if (el.offsetTop <= curPosition && (el.offsetTop + el.offsetHeight) > curPosition) {
			links.forEach((a) => {
				a.classList.remove('active-nav');
				if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
					a.classList.add('active-nav');
				}
			})
		}
	});
}

//black screen
PHONEVERT.addEventListener('click', () => {
	if (PHONEVERT.querySelector('#sv').classList.contains('hidden')) {
		PHONEVERT.querySelector('#sv').classList.remove('hidden');
	} else {
		PHONEVERT.querySelector('#sv').classList.add('hidden');
	}
});

PHONEHOR.addEventListener('click', () => {
	if (PHONEHOR.querySelector('#sh').classList.contains('hidden')) {
		PHONEHOR.querySelector('#sh').classList.remove('hidden');
	} else {
		PHONEHOR.querySelector('#sh').classList.add('hidden');
	}
});

//add border to portfolio image
PORTFOLIO.addEventListener('click', (event) => {
	if (event.target.tagName !== 'DIV') {
		PORTFOLIO.querySelectorAll('.portfolio__image > img').forEach(item => item.classList.remove('portfolio-border'));
		event.target.classList.add('portfolio-border');
	}
});

//change active tag
TAGS.addEventListener('click', (event) => {
	if (event.target.tagName == 'SPAN') {
		TAGS.querySelectorAll('.tag').forEach(item => item.classList.remove('active-tag'));
		event.target.classList.add('active-tag');
		random();
	}
});

//change images randomly
function random() {
	let randomArr = [];
	PORTFOLIO.querySelectorAll('.portfolio__image').forEach(item => randomArr.push(item));
	randomArr.sort(() => Math.random() - 0.5);
	PORTFOLIO.innerHTML = '';
	randomArr.forEach(item => PORTFOLIO.append(item));
}

//slider
let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active-slide', direction);
	});
}

function showItem(direction) {
	
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active-slide');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

function changeBack() {
	if (items[currentItem].classList.contains('blue')) {	
		document.querySelector('.slider').setAttribute("style", "background: #648BF0; border-bottom: 6px solid #ffffff;");
	} else {
		document.querySelector('.slider').setAttribute("style", "background: #f06c64; border-bottom: 6px solid #ea676b;");
	};
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
		changeBack();
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
		changeBack();	
	}
});

//form
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
	FORM.reset();
});

