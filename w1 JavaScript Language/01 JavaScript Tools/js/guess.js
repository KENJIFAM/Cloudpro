'use strict';

let targetNumber = Math.floor(Math.random() * 10) + 1;
let stop = false;
let count = 0;

function init () {
	const number = document.querySelector("input[name='number']");
	const btn = document.querySelector("button");
	
	btn.addEventListener('click', e => {
		e.preventDefault();
		if (!stop) check(number.value);
	});
}

function check (value) {
	count++;
	
	if (value == targetNumber) {
		showWin();
	} else if (count >= 5) {
		showLoss();
	} else {
		showError();
	}
}

function showWin () {
	console.log('Win!');
	stop = true;
}

function showError () {
	console.log('Incorrect!');
}

function showLoss () {
	console.log(`Game over! The correct answer is ${targetNumber}`);
	stop = true;
}

init();
