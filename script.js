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
function updateDOM() {
  resultsArray.forEach((result) => {
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
    image.src = ressult.url;
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
    saveText.textContent = "Add to favorites";
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
    const copyright = document.createElement('span');
    copyright.textContent = `${result.copyright}`;
    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle,saveText,cardText,footer);
    link.appendChild(image);
    card.append(link,cardBody);
    //console.log(card);
    imagesContainer.appendChild(card);
  });
}

//Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = response.json();
    //Create the card & Rest using DOM
    console.log(resultsArray);
    updateDOM();
  }
  catch(error) {
    // Catch error here
    //console.log('Error', error);
  }
}
//On load Get the NASA pictures
getNasaPictures(); 