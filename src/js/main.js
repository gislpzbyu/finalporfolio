import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { createCard } from "./utils/utils.mjs";

// import { setupCounter } from './counter.js';

function searchGifs(event) {
	event.preventDefault();

	const input = document.querySelector('#search-input');
	const value = input.value;
	const valueEncoded = encodeURI(value);

	console.log(valueEncoded);
	loadGifs(valueEncoded);
}

function loadGifs(searchCriteria = 'Hey%20Arnold') {
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

document.addEventListener('DOMContentLoaded', function () {
	loadGifs();

	const form = document.querySelector('#myForm');
	form.addEventListener('submit', searchGifs);
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
					<button type="button" class="btn btn-primary mt-2 btn-b;p" id="search-button">Search</button>
				</div>
            </form>
              <hr>

	          <ul class="list-group">
	            <li class="list-group-item">Item 1</li>
	            <li class="list-group-item">Item 2</li>
	            <li class="list-group-item">Item 3</li>
	            <li class="list-group-item">Item 4</li>
	          </ul>
         </div>
      </div>
      <div class="col-lg-9">
         <div class="row" id="card-row"></div>
      </div>
   </div>
</div>
`