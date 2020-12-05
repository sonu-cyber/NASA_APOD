
//NASA API
const count = 10;
const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


const apiKey = 'DEMO_KEY';
 const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page){
  window.scrollTo({top:0, behavior:'instant'});
 
  if(page === 'results'){
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
  loader.classList.add('hidden');
}
  

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites); 
  console.log('currentArray is', page, currentArray);
  currentArray.forEach((result) => {
    //Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    //Link 
    const link = document.createElement('a');
    link.href = result.hdurl;
    
    link.title = 'View Full Image';
    link.target = '_blank';
    //Image
    const image = document.createElement('img');
    image.src = result.url;
    
    image.alt = 'NASA Picture of The Day';
    image.loading = 'lazy';
    image.classList.add('card-image-top');
    //card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    //Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    //Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if(page === 'results') {
      saveText.textContent = "Add to favorites";
      saveText.setAttribute('onclick',`saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove favorite";
      saveText.setAttribute('onclick',`removeFavorite('${result.url}')`);
    }
    
    //card text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;

    //Footer container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    
    //Date
    const date = document.createElement('strong');
    date.textContent = result.date;
   
    //copyright
    const copyrightResult = result.copyright === undefined ? '':result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
   
    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle,saveText,cardText,footer);
    link.appendChild(image);
    card.append(link,cardBody);
    console.log(card);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  
  //get Favorites from local storage
  if(localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'))
    console.log('favorites from localstorage',favorites );
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

//Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    //Show loader
    loader.classList.remove('hidden');
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    //Create the card & Rest using DOM
    //console.log(resultsArray);
    updateDOM('results');
  }
  catch(error) {
    // Catch error here
    //console.log('Error', error);
  }
}
//Add result to Favorites
function saveFavorite(itemUrl){
  //loop through resultsArray to select favorite
  resultsArray.forEach((item) => { 
    if(item.url.includes(itemUrl ) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
     //console.log(JSON.stringify(favorites));
      //Show save confirmation for 2 secs
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden=true;
      },2000),
      //Set Favorites in Local Storage
      favorites = localStorage.setItem('nasaFavorites',JSON.stringify(favorites));
      updateDOM('favorites');
     
    }
  })
}
// Remove favorite
function removeFavorite(itemUrl) {
  if(favorites[itemUrl]) {
    delete favorites[itemUrl];
    //Set favorites in local storage
    favorites = localStorage.setItem('nasaFavorites',JSON.stringify(favorites));
    updateDOM('favorites');
  }
}
//On load Get the NASA pictures

getNasaPictures(); 