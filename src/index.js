// Your code here
document.addEventListener('DOMContentLoaded',()=>{
    const lists= document.querySelector('ul')
    lists.textContent=""
    const buyTicket= document.getElementById('buy-ticket')

    fetch("http://localhost:3000/films")
    .then(response => {
      if(!response.ok){
        throw new Error('Could not fetch resource')
      }
      return response.json()
    })
    .then(data => {
      data.forEach(movie => {
        const li = document.createElement('li')
        li.innerHTML += movie.title
        lists.appendChild(li)
        li.addEventListener('click',(e)=>{
            displayDetails(movie)
        })

      });
    })
    .catch(error => console.error())

  })

  

  function displayDetails(movie){
    const title= document.getElementById('title')
    title.textContent=movie.title

const runtime = document.getElementById('runtime')
runtime.innerHTML=`<p>runtime: ${movie.runtime}</p>`

const showtime = document.getElementById('showtime')
showtime.innerHTML=`<p>runtime: ${movie.showtime}</p>`

const poster = document.getElementById('poster')
poster.src=`${movie.poster}`
poster.alt=`${movie.title}`

const description =document.getElementById('film-info')
description.innerHTML=`<p>${movie.description}</p>`

const remaining=document.getElementById('ticket-num')
remaining.innerHTML=`${movie.capacity}-${movie.sold} tickets`
}