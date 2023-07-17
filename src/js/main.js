import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { createCard, createHistoryItem } from "./utils/utils.mjs";

function searchGifs(event) {
	event.preventDefault();

	const input = document.querySelector('#search-input');
	const value = input.value;

	if (value === '') {
		return 0;
	}

	const valueEncoded = encodeURI(value);
	loadGifs(valueEncoded);
	saveSearchIntoLocalStorage(value);
}

export function loadGifs(searchCriteria = 'Hey%20Arnold') {
	const baseUrl = 'https://api.giphy.com/v1/gifs';
	const apiKey = 'yk0XxQhSBspdswqMKBRCkvfPotXQxxT6';
	const apiUrl = `${baseUrl}/search?api_key=${apiKey}&q=${searchCriteria}&limit=20`;

	const cardRow = document.getElementById('card-row');
	fetch(apiUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			const gifs = data.data;
			let cardsHtml = '';

			for (let i = 0; i < gifs.length; i++) {
				const gif = gifs[i];
				cardsHtml += createCard(gif);
			}

			cardRow.innerHTML = cardsHtml;
		})
		.catch(function (error) {
			console.log(error);
		});
}

function loadHistoryList() {
	const existingLocalStorage = localStorage.getItem('gif-history');

	const history = JSON.parse(existingLocalStorage);

	const historyList = document.getElementById('history-list');

	if (history.length > 0) {
		let itemHTML = '';

		for (let i = 0; i < history.length; i++) {
			itemHTML += createHistoryItem(history[i], i);
		}

		historyList.innerHTML = itemHTML;
	} else {
		historyList.innerHTML = '';
	}
}

function saveSearchIntoLocalStorage(searchCriteria = '') {
	// Retrieve the existing array from localStorage
	const historyJSON = localStorage.getItem('gif-history');

	// Parse the JSON string back into an array
	const history = JSON.parse(historyJSON);

	// Add new colors to the array
	history.push(searchCriteria);

	// Convert the updated array to a JSON string
	const updatedHistoryJSON = JSON.stringify(history.reverse());

	// Store the updated JSON string back in localStorage
	localStorage.setItem('gif-history', updatedHistoryJSON);

	loadHistoryList();
}

function verifyExistingHistory() {
	if (!localStorage.getItem('gif-history')) {
		localStorage.setItem('gif-history', JSON.stringify([]));
	}
}

function removeHistoryItem(index) {
	const existingLocalStorage = localStorage.getItem('gif-history');
	let history = JSON.parse(existingLocalStorage);

	// Remove the item at the specified index
	history.splice(index, 1);

	// Update the localStorage array
	localStorage.setItem('gif-history', JSON.stringify(history));

	// Reload the history list
	loadHistoryList();
}

document.addEventListener('DOMContentLoaded', function () {
	loadGifs();
	verifyExistingHistory();
	loadHistoryList();

	const form = document.querySelector('#myForm');
	form.addEventListener('submit', searchGifs);

	// Obtén el elemento 'history-list'
	const historyList = document.getElementById('history-list');

	historyList.addEventListener('click', function(event) {
		if (event.target.tagName.toLowerCase() === 'li') {
			const historyText = event.target.textContent.replace(/\u2716/g, '');

			loadGifs(historyText);
		}

		if (event.target.classList.contains('close-btn')) {
			const index = event.target.dataset.index;
			removeHistoryItem(index);
		}
	});

	// Copy URL GIF
	const cardRowList = document.getElementById('card-row');

	cardRowList.addEventListener('click', function(event) {
		if (event.target.tagName.toLowerCase() === 'button') {
			const button = event.target;
			const imgElement = button.closest('.card').querySelector('.card-img-top');
			const imageUrl = imgElement.src;
			navigator.clipboard.writeText(imageUrl);
			alert('Text copied');
		}
	})
});

document.querySelector('#app').innerHTML = `
<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Your Logo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about/about.html">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="container mt-4">
    <div class="row">
        <div class="col-lg-2">
            <div class="sidebar">
                <form id="myForm">
                    <div class="form-group">
                        <input type="text" class="form-control" id="search-input" placeholder="Search" />
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary mt-2 btn-b;p" id="search-button">Search</button>
                    </div>
                </form>
                <hr />
                <ul class="list-group" id="history-list"></ul>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="row" id="card-row"></div>
        </div>
    </div>
</div>
`

