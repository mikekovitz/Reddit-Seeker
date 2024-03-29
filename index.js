import reddit from './redditapi.js';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
//Form Event listener
searchForm.addEventListener('submit', e => {
    // Get search term
    const searchTerm =  searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked' ).value;
    //Get limit
    const searchLimit = document.getElementById('limit').value;
    //Check input
    if(searchTerm === ''){
    showMessage('please add a search term', 'alert-danger');    
    }
    //clearInput
    searchInput.value = '';
    //search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        let output = '<div class = "card-columns">';
        //Loop through posts
        results.forEach(post => {

        //Check for image
        const image = post.preview ? post.preview.images[0].source.url : 'https://assets.pcmag.com/media/images/391545-reddit-logo.jpg?thumb=y&width=275&height=275';

        output += `
        <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${post.url}" target = "_blank" class="btn btn-primary">Read more</a>
                <hr>
                <span class = "badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class = "badge badge-dark">Score: ${post.score}</span>
            </div>
        </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output; 
    });

    e.preventDefault();
} );

//showMessage
function showMessage(message, className) {
    //create div
    const div = document.createElement('div');
    //Add class
    div.className =  `alert ${className}`; //nie działa 
    //Add text
    div.appendChild(document.createTextNode(message))
    //Get parent
    const searchContainer = document.getElementById('search-container')
    //Get search
    const search = document.getElementById('search')
    //Insert message
    searchContainer.insertBefore(div, search);
    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

    //Truncate Text
    function truncateText(text, limit) {
        const shortened = text.indexOf('', limit);
        if (shortened == -1) return text;
        return text.substring(0, shortened);
    }