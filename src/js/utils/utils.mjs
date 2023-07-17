export function createCard(gif) {
	const imageUrl = gif.images.fixed_height.url;
	const title = gif.title;

	return (
		`<div class="col-md-3 mb-4">
		  <div class="card">
		    <img src="${imageUrl}" class="card-img-top" alt="GIF">
		    <div class="card-body">
		      <h5 class="card-title">${title}</h5>
              <button class="btn btn-primary copy-url-button">Copy URL</button>
		    </div>
		  </div>
		</div>`
	);
}

export function createHistoryItem(historyText, index) {

	const closeButton = `<button class="close-btn" data-index="${index}">&#10006;</button>`;

	return `<li class="list-group-item">${historyText}${closeButton}</li>`;
}