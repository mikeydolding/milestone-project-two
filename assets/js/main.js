import { MY_API_KEY } from "./config.js";
import { countries } from "./countries.js";
//import * as Search from './autocompleteSearch';
//const topic = document.getElementById("newsType");

const API_KEY = MY_API_KEY;

const searchBtn = document.getElementById("searchCountry");
const entertainmentBtn = document.getElementById("entertainment");
const foodBtn = document.getElementById("food");
const environmentBtn = document.getElementById("environment");
const technologyBtn = document.getElementById("technology");
const businessBtn = document.getElementById("business");

//const search = document.querySelector('.search');
var input = document.querySelector("inputCountry");
//const newsList = document.querySelector('.card-title');
var newsQuery = document.getElementById("newsQuery");

var newsdetailsHigh = document.getElementById("newsdetailsHigh");
var newsdetailsMedium = document.getElementById("newsdetailsMedium");
var newsdetailsLow = document.getElementById("newsdetailsLow");

var newsTitle = document.getElementById("newsTitle");
var newsContent = document.getElementById("newsContent");
var newsDescription = document.getElementById("newsDescription");

var newsDataArr = [];
var countryCode = "";
var countryName = "";
var newsType ="home"
var heading = document.getElementById("heading");
heading.innerHTML = `<div class="d-flex justify-content-center"><div id="loader"><img src="assets/images/loader.gif" alt="O" /></div></div>`

searchBtn.addEventListener("click", function (e) {
  countryName = document.getElementById("inputCountry").value;
  console.log("Search Button countryCode", countryName);
  let country = countries.find((item) => item.name === countryName);
  countryCode = country.code;
  newsType = "home";
  //document.getElementById("newsType").innerHTML = newsType;
  //console.log("EntertainmentNewsType",newsType);
  fetchNewsDefault(e);
  //newsType.innerHTML = "<h4>Entertainment</h4>";
  //fetchEntertainmentNews();
});

entertainmentBtn.addEventListener("click", function (e) {
  newsType = "entertainment";
  document.getElementById("heading").innerHTML = newsType;
  fetchNews(e);
  //newsType.innerHTML = "<h4>Entertainment</h4>";
  //fetchEntertainmentNews();
});

foodBtn.addEventListener("click", function (e) {
  newsType = "food,health";
  document.getElementById("heading").innerHTML = newsType;
  fetchNews(e);
});

technologyBtn.addEventListener("click", function (e) {
  newsType = "technology,science";
  document.getElementById("heading").innerHTML = newsType;
  fetchNews(e);
});

businessBtn.addEventListener("click", function (e) {
  newsType = "business,tourism";
  document.getElementById("heading").innerHTML = newsType;
  fetchNews(e);
});

environmentBtn.addEventListener("click", function (e) {
  newsType = "environment";
  document.getElementById("heading").innerHTML = newsType;
  fetchNews(e);
});

if (newsType === "home" ) {
  console.log("HomenewsType", newsType);
  console.log("countryCode", countryCode);

  window.onload = function (e) {
    heading.innerHTML = `<div class="d-flex justify-content-center"><p>Enter a Country</p></div>`
    fetch("https://api.country.is")
      .then((res) => res.json())
      .then((response) => {
        heading.innerHTML = "";
          countryCode = response.country;
          let country = countries.find((item) => item.code === countryCode);
          countryName = country.name;
          document.getElementById("inputCountry").placeholder = countryName;
          console.log("Country: ", countryName);
          heading.innerHTML = "<h1>Headlines</h1>";
          //newsType.innerHTML = `<div class="d-flex justify-content-center"><div id="loader"><img src="assets/images/loader.gif" alt="O" /></div></div>`
          fetchNewsDefault(e);
        
       
      })
      .catch((data, status) => {
        console.log("Request failed");
      });
  };
} else if(countryName) {
  let heading = document.getElementById("heading");
        //newsType.innerHTML = "<h1>Headlines</h1>";
        heading.innerHTML = `<div class="d-flex justify-content-center"><div id="loader">Enter a country`
  console.log("HomenewsType", newsType);
} else {
  
}

//function myTopic() {
//  var x = document.getElementById("myBtn").value;
//  document.getElementById("demo").innerHTML = x;
//}

async function fetchNewsDefault(e) {
  document.getElementById("newsdetailsHigh").innerHTML = "";
  document.getElementById("newsdetailsMedium").innerHTML = "";
  document.getElementById("newsdetailsLow").innerHTML = "";

  console.log("fetchNewsDefault");
  e.preventDefault();
  let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${countryCode}&category=tourism,environment,food,health,technology,entertainment`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    newsdetailsHigh.innerHTML = "<h5>No data found.</h5>";
    return;
    //const message = `An error has occured: ${response.status}`;
    //throw new Error(message);
  } else {
    const data = await response.json();
    const filteredData = await data.results.filter((i) => i.image_url !== null);
    newsDataArr = filteredData;
    console.log("newsDataArr", newsDataArr);
    displayNews();
  }
}

async function fetchNews(e) {
  document.getElementById("newsdetailsHigh").innerHTML = "";
  document.getElementById("newsdetailsMedium").innerHTML = "";
  document.getElementById("newsdetailsLow").innerHTML = "";

  //let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${topic}`;
  //let topic = "entertainment";
  //console.log(newsType)
  newsDataArr = "";
  e.preventDefault();
  let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${countryCode}&category=${newsType}`;

  const response = await fetch(url);
  if (!response.ok) {
    newsdetailsHigh.innerHTML = "<h5>No data found.</h5>";
    return;
  } else {
    const data = await response.json();
    const filteredData = await data.results.filter((i) => i.image_url !== null);
    newsDataArr = filteredData;
    displayNews();
  }
}

function displayNews() {
  newsdetailsHigh.innnerHTML = "";
  newsdetailsMedium.innnerHTML = "";
  newsdetailsLow.innnerHTML = "";

  //if (newsDataArr.length == 0) {
  //    newsdetails.innerHTML = "<h5>No data found.</h5>"
  //    return;
  //}

  //console.log(data)
  //data.results.forEach(results => {
  //});
  for (var i = 0, len = newsDataArr.length; i < len; i++) {
    if (i < 2) {
      var col = document.createElement("div");
      col.className = "col-sm-12  col-lg-6  mb-3 d-flex align-items-stretch";
      var card = document.createElement("div");
      card.className = "card";
      //card.setAttribute("max-height", "50%");p-2
      var cardBody = document.createElement("div");
      cardBody.className = "card-body p-2";

      var img = document.createElement("div");
      img.className = "card-img-top";

      var image = document.createElement("img");
      image.setAttribute("height", "matchparent");
      image.setAttribute("width", "100%");
      image.src = newsDataArr[i].image_url;

      let pText = document.createTextNode("Source: ");
      let li = document.createElement("small");
      let a = document.createElement("a");
      li.appendChild(a);
      a.setAttribute("href", newsDataArr[i].link);
      a.setAttribute("target", "_blank");
      a.textContent = newsDataArr[i].link;
      li.appendChild(pText);
      li.appendChild(a);

      let newsTitle = document.createElement("h5");
      newsTitle.className = "card-title";
      newsTitle.innerHTML = newsDataArr[i].title;

      let newsDescription = document.createElement("h6");
      newsDescription.className = "card-title text-truncate";
      newsDescription.innerHTML = newsDataArr[i].description;
      let newsContent = document.createElement("p");

      newsContent.className = "card-text text-truncate";
      newsContent.innerHTML = newsDataArr[i].content;

      img.appendChild(image);
      card.appendChild(img);

      cardBody.appendChild(newsTitle);
      cardBody.appendChild(newsDescription);
      cardBody.appendChild(newsContent);
      cardBody.appendChild(li);

      card.appendChild(cardBody);

      col.appendChild(card);

      newsdetailsHigh.appendChild(col);
    } else if (i >= 2 && i < 4) {
      var col = document.createElement("div");
      col.className = "col-sm-12 col-lg-6";
      var card = document.createElement("div");
      card.className = "card";
      //card.setAttribute("max-height", "50%");p-2
      var cardBody = document.createElement("div");
      cardBody.className = "card-body p-2";
      var img = document.createElement("div");
      img.className = "card-img-top";
      var image = document.createElement("img");
      image.setAttribute("height", "matchparent");
      image.setAttribute("width", "100%");
      image.src = newsDataArr[i].image_url;
      let pText = document.createTextNode("Source: ");
      let li = document.createElement("small");
      let a = document.createElement("a");
      li.appendChild(a);
      a.setAttribute("href", newsDataArr[i].link);
      a.setAttribute("target", "_blank");
      a.textContent = newsDataArr[i].link;
      li.appendChild(pText);
      li.appendChild(a);
      let newsTitle = document.createElement("h5");
      newsTitle.className = "card-title";
      newsTitle.innerHTML = newsDataArr[i].title;
      let newsDescription = document.createElement("h6");
      newsDescription.className = "card-title text-truncate";
      newsDescription.innerHTML = newsDataArr[i].description;
      let newsContent = document.createElement("p");
      newsContent.className = "card-text text-truncate";
      newsContent.innerHTML = newsDataArr[i].content;
      img.appendChild(image);
      card.appendChild(img);
      cardBody.appendChild(newsTitle);
      cardBody.appendChild(newsDescription);
      cardBody.appendChild(newsContent);
      cardBody.appendChild(li);
      card.appendChild(cardBody);
      col.appendChild(card);
      newsdetailsMedium.appendChild(col);
    } else {
      var col = document.createElement("div");
      col.className = "row g-2";
      var cardLeft = document.createElement("div");
      cardLeft.className = "col-md-6 ";
      var cardRight = document.createElement("div");
      cardRight.className = "col-md-6 card-body p-2";

      var img = document.createElement("div");
      img.className = "img-fluid";

      var image = document.createElement("img");
      image.setAttribute("height", "matchparent");
      image.setAttribute("width", "100%");
      image.src = newsDataArr[i].image_url;

      let pText = document.createTextNode("Source: ");
      let li = document.createElement("small");
      let a = document.createElement("a");
      li.appendChild(a);
      a.setAttribute("href", newsDataArr[i].link);
      a.setAttribute("target", "_blank");
      a.textContent = newsDataArr[i].link;
      li.appendChild(pText);
      li.appendChild(a);

      let newsTitle = document.createElement("h5");
      newsTitle.className = "card-title";
      newsTitle.innerHTML = newsDataArr[i].title;

      let newsDescription = document.createElement("h6");
      newsDescription.className = "card-title text-truncate";
      newsDescription.innerHTML = newsDataArr[i].description;
      let newsContent = document.createElement("p");

      newsContent.className = "card-text text-truncate";
      newsContent.innerHTML = newsDataArr[i].content;

      img.appendChild(image);
      cardLeft.appendChild(img);

      cardRight.appendChild(newsTitle);
      cardRight.appendChild(newsDescription);
      cardRight.appendChild(newsContent);
      cardRight.appendChild(li);

      col.appendChild(cardLeft);
      col.appendChild(cardRight);
      newsdetailsLow.appendChild(col);
    }
  }
}
