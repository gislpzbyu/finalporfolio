export function createCard(gif) {
	const imageUrl = gif.images.fixed_height.url;
	const title = gif.title;

	return (
		`<div class="col-md-3 mb-4">
		  <div class="card">
		    <img src="${imageUrl}" class="card-img-top" alt="GIF">
		    <div class="card-body">
		      <h5 class="card-title">${title}</h5>
		    </div>
		  </div>
		</div>`
	);
}

export function getHeyArnoldGifs () {
	const apiUrl = 'https://api.giphy.com/v1/gifs'
	const apiKey = 'yk0XxQhSBspdswqMKBRCkvfPotXQxxT6';

	const url = `${apiUrl}/search?api_key=${apiKey}&q=Hey%20Arnold&limit=20`;

	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data));
}