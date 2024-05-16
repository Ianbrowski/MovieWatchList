function addMovieToList(movieName) {
    const movieList = document.getElementById('movie-list');
    const newCard = createCard({ name: movieName, type: 'movie', watched: false });
    movieList.appendChild(newCard);

    // Attach event listener for the delete button after appending the card
    const deleteButton = newCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        movieList.removeChild(newCard);
    });
}

function addSeriesToList(seriesName) {
    const seriesList = document.getElementById('series-list');
    const newCard = createCard({ name: seriesName, type: 'series', watched: false });
    seriesList.appendChild(newCard);

    // Attach event listener for the delete button after appending the card
    const deleteButton = newCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        seriesList.removeChild(newCard);
    });
}


// Helper function to create a card element
function createCard(name) {
    const newCard = document.createElement('div');
    newCard.className = 'card';

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = name.toLowerCase().replace(/\s/g, '-');
    
    const newLabel = document.createElement('label');
    newLabel.htmlFor = newCheckbox.id;
    newLabel.textContent = name;

    newCard.appendChild(newCheckbox);
    newCard.appendChild(newLabel);

    return newCard;
}

// Helper function to create a delete button
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    return deleteButton;
}

// Event listener for adding a new movie
document.getElementById('add-movie-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieName = document.getElementById('new-movie').value.trim();
    if (movieName) {
        addMovieToList(movieName);
        document.getElementById('new-movie').value = '';
    }
});

// Event listener for adding a new TV series
document.getElementById('add-series-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const seriesName = document.getElementById('new-series').value.trim();
    if (seriesName) {
        addSeriesToList(seriesName);
        document.getElementById('new-series').value = '';
    }
});

