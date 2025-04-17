 // Dummy Data (replacing API calls)
 const dummyMovies = [
  {
      id: 1,
      title: "The Adventure Begins",
      poster_path: "/api/placeholder/180/270",
      release_date: "2023-05-15",
      vote_average: 8.5,
      overview: "An epic adventure that follows a group of explorers as they journey through uncharted lands.",
      genres: [{name: "Adventure"}, {name: "Action"}],
      genre_ids: ["action", "adventure"]
  },
  {
      id: 2,
      title: "Laugh Out Loud",
      poster_path: "/api/placeholder/180/270",
      release_date: "2023-08-22",
      vote_average: 7.8,
      overview: "A hilarious comedy about a family vacation gone terribly wrong.",
      genres: [{name: "Comedy"}, {name: "Family"}],
      genre_ids: ["comedy"]
  },
  {
      id: 3,
      title: "Midnight Mystery",
      poster_path: "/api/placeholder/180/270",
      release_date: "2022-11-05",
      vote_average: 8.2,
      overview: "A detective must solve a series of mysterious crimes before the clock strikes midnight.",
      genres: [{name: "Mystery"}, {name: "Thriller"}],
      genre_ids: ["drama"]
  },
  {
      id: 4,
      title: "Love in Paris",
      poster_path: "/api/placeholder/180/270",
      release_date: "2024-02-14",
      vote_average: 7.5,
      overview: "Two strangers meet in the city of love and embark on a romantic journey.",
      genres: [{name: "Romance"}, {name: "Drama"}],
      genre_ids: ["romance", "drama"]
  },
  {
      id: 5,
      title: "Galactic War",
      poster_path: "/api/placeholder/180/270",
      release_date: "2023-12-10",
      vote_average: 9.0,
      overview: "An interstellar conflict threatens the peace of the galaxy.",
      genres: [{name: "Sci-Fi"}, {name: "Action"}],
      genre_ids: ["scifi", "action"]
  },
  {
      id: 6,
      title: "The Haunting",
      poster_path: "/api/placeholder/180/270",
      release_date: "2022-10-31",
      vote_average: 7.2,
      overview: "A family moves into a new house, only to discover it's haunted by a vengeful spirit.",
      genres: [{name: "Horror"}, {name: "Thriller"}],
      genre_ids: ["horror"]
  },
  {
      id: 7,
      title: "City of Dreams",
      poster_path: "/api/placeholder/180/270",
      release_date: "2021-09-18",
      vote_average: 8.4,
      overview: "A young artist moves to the big city to pursue their dreams against all odds.",
      genres: [{name: "Drama"}, {name: "Music"}],
      genre_ids: ["drama"]
  },
  {
      id: 8,
      title: "Undercover Agent",
      poster_path: "/api/placeholder/180/270",
      release_date: "2024-01-20",
      vote_average: 8.1,
      overview: "A spy infiltrates a dangerous criminal organization to prevent a global catastrophe.",
      genres: [{name: "Action"}, {name: "Thriller"}],
      genre_ids: ["action"]
  },
  {
      id: 9,
      title: "Laugh Factory",
      poster_path: "/api/placeholder/180/270",
      release_date: "2023-07-04",
      vote_average: 7.6,
      overview: "A stand-up comedian struggles with fame and personal relationships.",
      genres: [{name: "Comedy"}, {name: "Drama"}],
      genre_ids: ["comedy", "drama"]
  },
  {
      id: 10,
      title: "Future World",
      poster_path: "/api/placeholder/180/270",
      release_date: "2022-06-30",
      vote_average: 8.7,
      overview: "In a dystopian future, a rebel group fights against an oppressive regime.",
      genres: [{name: "Sci-Fi"}, {name: "Action"}],
      genre_ids: ["scifi", "action"]
  }
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const randomButton = document.getElementById('random-button');
const randomResult = document.getElementById('random-result');
const trendingMovies = document.getElementById('trending-movies');
const watchlistItems = document.getElementById('watchlist-items');
const voteMovieInput = document.getElementById('vote-movie-input');
const addVoteMovie = document.getElementById('add-vote-movie');
const voteItems = document.getElementById('vote-items');
const shareVote = document.getElementById('share-vote');
const movieModal = document.getElementById('movie-modal');
const closeModal = document.getElementById('close-modal');
const movieDetails = document.getElementById('movie-details');

// State Management
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let voteList = JSON.parse(localStorage.getItem('voteList')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme
  if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = 'Light Mode';
  }
  
  // Load initial data
  renderMovies(dummyMovies, trendingMovies);
  renderWatchlist();
  renderVoteList();
  
  // Event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Search functionality
  searchButton.addEventListener('click', searchMovies);
  searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchMovies();
  });
  
  // Random movie picker
  randomButton.addEventListener('click', pickRandomMovie);
  
  // Voting system
  addVoteMovie.addEventListener('click', addMovieToVote);
  shareVote.addEventListener('click', createVotingLink);
  
  // Modal functionality
  closeModal.addEventListener('click', () => {
      movieModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
      if (e.target === movieModal) {
          movieModal.style.display = 'none';
      }
  });
}

// Theme Functions
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

// Search and Filter Functions
function searchMovies() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
      renderMovies(dummyMovies, trendingMovies);
      return;
  }
  
  const filteredMovies = dummyMovies.filter(movie => 
      movie.title.toLowerCase().includes(query) || 
      movie.overview.toLowerCase().includes(query)
  );
  
  if (filteredMovies.length > 0) {
      renderMovies(filteredMovies, trendingMovies);
  } else {
      trendingMovies.innerHTML = '<p>No movies found. Try a different search term.</p>';
  }
}

function pickRandomMovie() {
  const genreFilter = document.getElementById('genre-filter').value;
  const yearFilter = document.getElementById('year-filter').value;
  
  let filteredMovies = [...dummyMovies];
  
  if (genreFilter) {
      filteredMovies = filteredMovies.filter(movie => 
          movie.genre_ids.includes(genreFilter)
      );
  }
  
  if (yearFilter) {
      filteredMovies = filteredMovies.filter(movie => 
          movie.release_date.startsWith(yearFilter)
      );
  }
  
  if (filteredMovies.length === 0) {
      randomResult.innerHTML = '<p>No movies found with these filters. Try different criteria.</p>';
      return;
  }
  
  // Pick a random movie from filtered results
  const randomIndex = Math.floor(Math.random() * filteredMovies.length);
  const randomMovie = filteredMovies[randomIndex];
  
  randomResult.innerHTML = `
      <div class="movie-card">
          <img class="movie-poster" src="${randomMovie.poster_path}" alt="${randomMovie.title}">
          <div class="movie-info">
              <h3 class="movie-title">${randomMovie.title}</h3>
              <div class="actions">
                  <button onclick="showMovieDetails(${randomMovie.id})">Details</button>
                  <button onclick="addToWatchlist(${randomMovie.id})">+ Watchlist</button>
              </div>
          </div>
      </div>
  `;
}

// Render Functions
function renderMovies(movies, container) {
  container.innerHTML = '';
  
  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.innerHTML = `
          <img class="movie-poster" src="${movie.poster_path}" alt="${movie.title}">
          <div class="movie-info">
              <h3 class="movie-title">${movie.title}</h3>
              <div class="actions">
                  <button onclick="showMovieDetails(${movie.id})">Details</button>
                  <button onclick="addToWatchlist(${movie.id})">+ Watchlist</button>
              </div>
          </div>
      `;
      container.appendChild(movieCard);
  });
}

function renderWatchlist() {
  watchlistItems.innerHTML = '';
  
  if (watchlist.length === 0) {
      watchlistItems.innerHTML = '<li>Your watchlist is empty</li>';
      return;
  }
  
  watchlist.forEach((movieId) => {
      const movie = dummyMovies.find(m => m.id === movieId);
      if (!movie) return;
      
      const li = document.createElement('li');
      li.className = 'watchlist-item';
      li.innerHTML = `
          <span>${movie.title}</span>
          <div>
              <button onclick="showMovieDetails(${movie.id})">Details</button>
              <button onclick="removeFromWatchlist(${movie.id})">Remove</button>
          </div>
      `;
      watchlistItems.appendChild(li);
  });
}

function renderVoteList() {
  voteItems.innerHTML = '';
  
  if (voteList.length === 0) {
      voteItems.innerHTML = '<li>Add movies for voting</li>';
      return;
  }
  
  voteList.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'vote-item';
      li.innerHTML = `
          <span>${item.title}</span>
          <div>
              <span>Votes: ${item.votes}</span>
              <button onclick="voteForMovie(${index})">Vote</button>
              <button onclick="removeFromVoteList(${index})">Remove</button>
          </div>
      `;
      voteItems.appendChild(li);
  });
}

// Movie Details Modal
function showMovieDetails(movieId) {
  const movie = dummyMovies.find(m => m.id === movieId);
  if (!movie) return;
  
  movieDetails.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title} (${movie.release_date.slice(0, 4)})</h2>
      <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
      <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <button onclick="addToWatchlist(${movie.id})">Add to Watchlist</button>
  `;
  
  movieModal.style.display = 'flex';
}

// Watchlist Functions
function addToWatchlist(movieId) {
  const movie = dummyMovies.find(m => m.id === movieId);
  if (!movie) return;
  
  // Check if movie already exists in watchlist
  if (!watchlist.includes(movieId)) {
      watchlist.push(movieId);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      renderWatchlist();
      alert(`${movie.title} added to watchlist!`);
  } else {
      alert(`${movie.title} is already in your watchlist!`);
  }
}

function removeFromWatchlist(movieId) {
  watchlist = watchlist.filter(id => id !== movieId);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  renderWatchlist();
}

// Voting Functions
function addMovieToVote() {
  const movieTitle = voteMovieInput.value.trim();
  if (!movieTitle) return;
  
  if (!voteList.some(item => item.title.toLowerCase() === movieTitle.toLowerCase())) {
      voteList.push({
          title: movieTitle,
          votes: 0
      });
      localStorage.setItem('voteList', JSON.stringify(voteList));
      renderVoteList();
      voteMovieInput.value = '';
  } else {
      alert('This movie is already in the voting list!');
  }
}

function voteForMovie(index) {
  voteList[index].votes++;
  localStorage.setItem('voteList', JSON.stringify(voteList));
  renderVoteList();
}

function removeFromVoteList(index) {
  voteList.splice(index, 1);
  localStorage.setItem('voteList', JSON.stringify(voteList));
  renderVoteList();
}

function createVotingLink() {
  alert('Voting link feature coming soon! For now, share your screen or device to let others vote.');
}

// Make functions available globally for inline event handlers
window.showMovieDetails = showMovieDetails;
window.addToWatchlist = addToWatchlist;
window.removeFromWatchlist = removeFromWatchlist;
window.voteForMovie = voteForMovie;
window.removeFromVoteList = removeFromVoteList;