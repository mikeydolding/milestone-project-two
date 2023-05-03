//fetch("https://newsdata.io/api/1/news?apikey=pub_21398e1dede5e8992ed2af8c2bc59bf9c8202&q=entertainment", {
//        "method": "GET",
//    })
//    .then(response => response.json())
//    .then(response => {
//        console.log(response);
//        document.getElementById('quote').innerHTML = response.content;
//        document.getElementById('author').innerHTML = '- ' + response.originator.name + ' -';
//    })
//    .catch(err => {
//        console.log(err);
//    });

//const searchFrom = document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.card-title');
const search = document.getElementById('search');
const topic = 'entertainment';

const newsType = document.getElementById("newsType");

var newsDataArr = [];

search.addEventListener('click', function() {
    newsType.innerHTML = "<h4>Search: " + topic + "<h4>";
    fetchNews();
});

//function fetchNews(e) {
//    e.preventDefault();

function fetchNews() {
    const apiKey = 'pub_21398e1dede5e8992ed2af8c2bc59bf9c8202 ';
    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${topic}`;



    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        data.results.forEach(results => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', results.link);
            a.setAttribute('target', '_blank');
            a.textContent = results.title;
            li.appendChild(a);
            newsList.appendChild(li);




            //const fetchTechnologyNews = async() => {
            //    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
            //    newsDataArr = [];
            //    if (response.status >= 200 && response.status < 300) {
            //        const myJson = await response.json();
            //        newsDataArr = myJson.articles;
            //    } else {
            //        // handle errors
            //        console.log(response.status, response.statusText);
            //        newsdetails.innerHTML = "<h5>No data found.</h5>"
            //        return;
            //    }

            //    displayNews();
            //}

        });
    }).catch((error) => { console.log(error) }
        //if (response.status >= 200 && response.status < 300) {
        //    const data = response.json();
        //    console.log(data);
        //    data.results.forEach(results => {
        //        let li = document.createElement('li');
        //        let a = document.createElement('a');
        //        a.setAttribute('href', results.link);
        //        a.setAttribute('target', _blank);
        //        a.textContent = results.title;
        //        li.appendChild(a);
        //        newsList.appendChild(li);
        //    });
        //    //newsDataArr = myJson.articles;
        //} else {
        //    // handle errors
        //    console.log(response.status, response.statusText);
        //    newsdetails.innerHTML = "<h5>No data found.</h5>"
        //    return;
        //}

        //displayNews();
    )
}

//function displayNews() {

//    newsdetails.innerHTML = "";

//    // if(newsDataArr.length == 0) {
//    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
//    //     return;
//    // }

//    newsDataArr.forEach(news => {

//        var date = news.publishedAt.split("T");

//        var col = document.createElement('div');
//        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

//        var card = document.createElement('div');
//        card.className = "p-2";

//        var image = document.createElement('img');
//        image.setAttribute("height", "matchparent");
//        image.setAttribute("width", "100%");
//        image.src = news.urlToImage;

//        var cardBody = document.createElement('div');

//        var newsHeading = document.createElement('h5');
//        newsHeading.className = "card-title";
//        newsHeading.innerHTML = news.title;

//        var dateHeading = document.createElement('h6');
//        dateHeading.className = "text-primary";
//        dateHeading.innerHTML = date[0];

//        var discription = document.createElement('p');
//        discription.className = "text-muted";
//        discription.innerHTML = news.description;

//        var link = document.createElement('a');
//        link.className = "btn btn-dark";
//        link.setAttribute("target", "_blank");
//        link.href = news.url;
//        link.innerHTML = "Read more";

//        cardBody.appendChild(newsHeading);
//        cardBody.appendChild(dateHeading);
//        cardBody.appendChild(discription);
//        cardBody.appendChild(link);

//        card.appendChild(image);
//        card.appendChild(cardBody);

//        col.appendChild(card);

//        newsdetails.appendChild(col);
//    });

//}