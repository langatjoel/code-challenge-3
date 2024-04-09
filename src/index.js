document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const movieList = document.getElementById("films");
    const movieTitle = document.getElementById("title");
    const movieRuntime = document.getElementById("runtime");
    const movieInfo = document.getElementById("film-info");
    const showtime = document.getElementById("showtime");
    const ticketNum = document.getElementById("ticket-num");
    const buyTicketButton = document.getElementById("buy-ticket");
    const image =document.getElementById('poster')
    // Variables to store data
    let currentMovie = null; // Store the currently selected movie

    // Function to display movie details
    function displayMovieDetails(movie) {
      movieTitle.textContent = movie.title;
      movieRuntime.textContent = '${movie.runtime} minutes';
      movieInfo.textContent = movie.description;
      image.src=movie.poster;
      image.alt=movie.title;
      showtime.textContent = movie.showtime;

  ticketNum.textContent = `${movie.capacity - movie.tickets_sold}`;
  
  // Update the button text based on available tickets
  if (movie.tickets_sold >= movie.capacity) {
    buyTicketButton.textContent = "Sold Out";
    buyTicketButton.setAttribute("disabled", "true");
  } else {
    buyTicketButton.textContent = "Buy Ticket";
    buyTicketButton.removeAttribute("disabled");
  }
}
  
// Function to handle the "Buy Ticket" button click
function buyTicket() {
  if (currentMovie) {
    // Check if there are available tickets
    if (currentMovie.tickets_sold < currentMovie.capacity) {
      // Update the sold tickets count
      currentMovie.tickets_sold++;
      updateTicketInfo(currentMovie);
    }
  }
}
  
// Function to handle updating ticket information on the server
function updateTicketInfo(movie) {
  // Send a PUT request to update the server
  fetch(`http://localhost:3000/films/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((updatedMovie) => {
      // Update the currentMovie with the updated data
      currentMovie = updatedMovie;
      displayMovieDetails(updatedMovie);
    })
    .catch((error) => {
      console.error("Update error:", error);
    });
}
  
// Make a GET request to the JSON server
fetch("http://localhost:3000/films")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Check if the data is an array of movies
    if (Array.isArray(data)) {
      // Display the first movie by default if available
      if (data.length > 0) {
        currentMovie = data[0];
        displayMovieDetails(currentMovie);
      }
  
      // Update the movie list
      data.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.addEventListener("click", () => {
          currentMovie = movie;
          displayMovieDetails(movie);
        });
        movieList.appendChild(li);
      });
  
      // Add event listener to "Buy Ticket" button
      buyTicketButton.addEventListener("click", buyTicket);
    } else {
      console.error("Invalid JSON format. Expected an array of movies.");
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
  });
  

