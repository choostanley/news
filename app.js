const main = document.querySelector('main');
const source = document.querySelector('#sources');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
	updateNews();
	await updateSources();
	source.value = defaultSource;

	source.addEventListener('change', e => {
		updateNews(e.target.value);
	});

	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('sw.js');
			console.log(`yeah man`);			
		} catch (error) {
			console.log('SW failed to reg');
		}
	}
});

async function updateSources() {
	const res = await fetch('https://newsapi.org/v2/sources?apiKey=b459aa9591a6461080d095450294b145');
	const json = await res.json();

	source.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source = defaultSource) {
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=b459aa9591a6461080d095450294b145`);
	const json = await res.json();

	main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
	return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}