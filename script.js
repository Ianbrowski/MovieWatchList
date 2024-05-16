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
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAkm1u_-UqkEYvIzin2e0rOwdyAaCQykLM",
  authDomain: "moviewatchlist-e2cdf.firebaseapp.com",
  projectId: "moviewatchlist-e2cdf",
  storageBucket: "moviewatchlist-e2cdf.appspot.com",
  messagingSenderId: "328908084791",
  appId: "1:328908084791:web:b6dc4e96314711ee0891b2",
  measurementId: "G-MYHWKZ08ZX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to fetch and display items
async function fetchItems() {
    const snapshot = await db.ref('items').once('value');
    const items = snapshot.val();
    const movieList = document.getElementById('movie-list');
    const seriesList = document.getElementById('series-list');

    movieList.innerHTML = '';
    seriesList.innerHTML = '';

    for (const key in items) {
        const item = items[key];
        const card = createCard(item, key);
        if (item.type === 'movie') {
            movieList.appendChild(card);
        } else if (item.type === 'series') {
            seriesList.appendChild(card);
        }
    }
}

// Function to create a card element
function createCard(item, key) {
    const card = document.createElement('div');
    card.className = 'card';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.watched;
    checkbox.addEventListener('change', () => {
        db.ref('items/' + key).update({ watched: checkbox.checked });
    });

    const label = document.createElement('label');
    label.textContent = item.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
        db.ref('items/' + key).remove();
        fetchItems();
    });

    card.appendChild(checkbox);
    card.appendChild(label);
    card.appendChild(deleteButton);

    return card;
}

// Event listeners for forms
document.getElementById('add-movie-form').addEventListener('submit', event => {
    event.preventDefault();
    const movieName = document.getElementById('new-movie').value.trim();
    if (movieName) {
        const newItem = db.ref('items').push();
        newItem.set({
            name: movieName,
            type: 'movie',
            watched: false,
        });
        document.getElementById('new-movie').value = '';
        fetchItems();
    }
});

document.getElementById('add-series-form').addEventListener('submit', event => {
    event.preventDefault();
    const seriesName = document.getElementById('new-series').value.trim();
    if (seriesName) {
        const newItem = db.ref('items').push();
        newItem.set({
            name: seriesName,
            type: 'series',
            watched: false,
        });
        document.getElementById('new-series').value = '';
        fetchItems();
    }
});

// Initial fetch
fetchItems();
