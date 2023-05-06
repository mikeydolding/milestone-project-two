import { MY_API_KEY } from './config.js';

const topic = 'entertainment';
const API_KEY = MY_API_KEY;

const entertainmentBtn = document.getElementById("entertainment");
const foodBtn = document.getElementById("food");
const healthBtn = document.getElementById("health");

//const search = document.querySelector('.search');
const input = document.querySelector('.input');
//const newsList = document.querySelector('.card-title');
const newsQuery = document.getElementById('newsQuery');

const newsType = document.getElementById("newsType");

const newsTitle = document.getElementById("newsTitle");
const newsContent = document.getElementById("newsContent");
const newsDescription = document.getElementById("newsDescription");
var newsDataArr = [];

//window.onload = function() {
//    newsType.innerHTML = "<h4>Headlines</h4>";
//    fetchHeadlines();
//};

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    //fetchEntertainmentNews();
});
foodBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Food</h4>";
    //fetchEntertainmentNews();
});
healthBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Health</h4>";
    //fetchEntertainmentNews();
});

searchBtn.addEventListener('click', function(e) {
    console.log('clicked');

    //newsType.innerHTML = "<h4>Search: " + topic + "<h4>";
    fetchNews(e);
});


function fetchHeadlines() {
    //e.preventDefault();

    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}`;

    fetch(url, {
        "method": "GET",
        "headers": {}
    }).then((response) => {
        console.log('response', response);
        return response.json()
    }).then((data) => {
        let filteredData = data.results.filter(i => i.image_url !== null);
        newsDataArr = filteredData;
        console.log('newsDataArr', newsDataArr);
        displayNews();

        //console.log(data)
        //data.results.forEach(results => {
        //    let li = document.createElement('li');
        //    let a = document.createElement('a');
        //    a.setAttribute('href', results.link);
        //    a.setAttribute('target', '_blank');
        //    a.textContent = results.title;
        //    li.appendChild(a);
        //    newsList.appendChild(li);
        //});
    }).catch(err => {
        console.log('Request Failed', err)
    })
}




//search.addEventListener('submit', fetchNews);

//const fetchNews = async() => {

//    let url = `
//https: //newsdata.io/api/1/news?apikey=${apiKey}&q=${topic}`;
//    console.log('apiKey', apiKey)

//    const response = await fetch(url);

//    if (response.status >= 200 && response.status < 300) {
//        const data = await response.json();
//        newsDataArr = data.results;
//        console.log('newsDataArr', newsDataArr)
//    } else {
//        //error handle
//        console.log(response.status, response.statusText);
//        newsdetails.innerHTML = "<h5>No data found.</h5>"
//        return;
//    }
//    displayNews();
//}

async function fetchNews(e) {
    //let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${topic}`;
    e.preventDefault();
    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=id&category=entertainment,food,health,tourism`;

    const response = await fetch(url);
    if (!response.ok) {
        console.log(response.status);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
        //const message = `An error has occured: ${response.status}`;
        //throw new Error(message);
    } else {
        const data = await response.json();
        const filteredData = await data.results;
        //const filteredData = await data.results.filter(i => i.image_url !== null);
        newsDataArr = filteredData;
        console.log('newsDataArr', newsDataArr);
        displayNews();
    }

}

//function fetchNews() {
//    //let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${topic}`;

//    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=id&category=entertainment,food,health,tourism`;

//    fetch(url).then((response) => {
//        return response.json()
//    }).then((data) => {
//        let filteredData = data.results.filter(i => i.image_url !== null);
//        newsDataArr = filteredData;
//        console.log('newsDataArr', newsDataArr);
//        displayNews();
//    }).catch((error) => {
//        //console.log(error)
//    })
//}


function displayNews() {
    newsdetails.innnerHTML = "";

    //if (newsDataArr.length == 0) {
    //    newsdetails.innerHTML = "<h5>No data found.</h5>"
    //    return;
    //}

    newsDataArr.forEach(news => {
        var col = document.createElement('div');
        col.className = "col-sm-6 .col-md-6 col-lg-6 .col-xl-2 mb-3 d-flex align-items-stretch";
        var card = document.createElement('div');
        card.className = "card";
        //card.setAttribute("max-height", "50%");p-2
        var cardBody = document.createElement('div');
        cardBody.className = "card-body p-2";

        var img = document.createElement('div');
        img.className = "card-img-top";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.image_url;

        var newsTitle = document.createElement('h5');
        newsTitle.className = "card-title";
        newsTitle.innerHTML = news.title;
        var newsDescription = document.createElement('h6');
        newsDescription.className = "card-title";
        newsDescription.innerHTML = news.description;
        var newsContent = document.createElement('p');
        newsContent.className = "card-text  text-truncate";
        newsContent.innerHTML = news.content;

        img.appendChild(image);
        card.appendChild(img);

        cardBody.appendChild(newsTitle);
        cardBody.appendChild(newsDescription);
        cardBody.appendChild(newsContent);
        card.appendChild(cardBody);

        col.appendChild(card);
        newsdetails.appendChild(col);

        //var newsContent = document.createElement('p');
        //newsContent.className = "card-title";
        //discription.innerHTML = news.description;

    })
}