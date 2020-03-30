//  Variables

const listaTweets = document.getElementById('lista-tweets');

// EventListeners

eventListeners();

function eventListeners(){
    // Agrega tweets
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.getElementById('tweet').value;

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);

    listaTweets.appendChild(li);

    agregarTweetLocalStorage(tweet);
}

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

function obtenerTweetsLocalStorage() {
    let tweets;

    if(localStorage.getItem('tweets') === null) {
        tweets = []; 
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(tweet => {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);

        listaTweets.appendChild(li);
    });
}

function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}