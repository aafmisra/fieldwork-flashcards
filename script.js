//get a list of all rhode island animals of a certain class from gbif
//creat arrays of the different taxas
//deduplicate the lists
//return new deduped list

function getSpecies(classID) {
  return fetch(
    `https://api.gbif.org/v1/occurrence/search/?limit=300&basisOfObservation=OBSERVATION&stateProvince=Rhode%20Island&classKey=${classID}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      let results = response.results;
      let species = results
        .map(result => result.speciesKey)
        .filter(
          speciesKey =>
            speciesKey !== undefined &&
            speciesKey !== 9163257 &&
            speciesKey !== 2435035 &&
            speciesKey !== 2441370
        );

      species = Array.from(new Set(species));
      return species;
    });
}

//take the speciesKey and return an object with taxa names

function getNames(speciesKey) {
  return fetch(`https://api.gbif.org/v1/species/${speciesKey}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return {
        Class: response.class,
        Order: response.order,
        Family: response.family,
        Genus: response.genus,
        Species: response.species
      };
    });
}

//search eol API using species name from gbif API and return eol species id
function getEOLspeciesID(speciesName) {
  return fetch(
    `https://eol.org/api/search/1.0.json?q=${speciesName}&page=1&key=`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response.results[0].id;
    });
}

//take eol species id and return url of a picture from species page
function getEOLPictureURL(eolID) {
  return fetch(
    `https://eol.org/api/pages/1.0/${eolID}.json?details=true&images_per_page=1`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response.taxonConcept.dataObjects[0].eolMediaURL;
    });
}

//combine taxa names and picture url into one object
function getInfo(speciesKey) {
  let namesPromise = getNames(speciesKey);

  return namesPromise.then(function(names) {
    let picturePromise = getEOLspeciesID(names.Species).then(getEOLPictureURL);
    return picturePromise.then(function(picture) {
      return { ...names, picture };
    });
  });
}

//create a div element representing a card
//create a dl element for the card
//create dt elements and append labels from getInfo to them
//create dd elements and append names from getInfo to them
//create an img element for the card
//append url from getInfo as src attribute of img

function getInfoList(info) {
  const namesList = document.createElement('dl');
  namesList.setAttribute('class', 'card-names');

  const classType = document.createElement('dt');
  classType.innerText = 'Class';
  const className = document.createElement('dd');
  className.innerText = info.Class;
  namesList.append(classType);
  namesList.append(className);

  const orderType = document.createElement('dt');
  orderType.innerText = 'Order';
  const orderName = document.createElement('dd');
  orderName.innerText = info.Order;
  namesList.append(orderType);
  namesList.append(orderName);

  const familyType = document.createElement('dt');
  familyType.innerText = 'Family';
  const familyName = document.createElement('dd');
  familyName.innerText = info.Family;
  namesList.append(familyType);
  namesList.append(familyName);

  const genusType = document.createElement('dt');
  genusType.innerText = 'Genus';
  const genusName = document.createElement('dd');
  genusName.innerText = info.Genus;
  namesList.append(genusType);
  namesList.append(genusName);

  const speciesType = document.createElement('dt');
  speciesType.innerText = 'Species';
  const speciesName = document.createElement('dd');
  speciesName.innerText = info.Species;
  namesList.append(speciesType);
  namesList.append(speciesName);

  let card = document.createElement('div');
  card.appendChild(namesList);
  card.setAttribute('class', 'gallery-card');

  const animalPhoto = document.createElement('img');
  const cardFront = document.createElement('div');
  cardFront.setAttribute('class', 'card-photo');
  animalPhoto.setAttribute('src', info.picture);
  animalPhoto.setAttribute('width', '150px');
  cardFront.style.backgroundImage = `url(${info.picture})`;
  card.appendChild(cardFront);

  return card;
}

//loop that uses helper functions and array of species to create cards
cardGallery = document.querySelector('.gallery');
getSpecies(classID).then(function(speciesKeys) {
  for (var speciesKey of speciesKeys) {
    getInfo(speciesKey).then(function(info) {
      let card = getInfoList(info);
      cardGallery.appendChild(card);
    });
  }
});

//event listener for shuffle button
const shuffleButton = document.querySelector('.shuffle-cards');

shuffleButton.addEventListener('click', function() {
  location.reload();
});


//QUIZ MODE
//click "im ready for a quiz button"
//when button is clicked, dd elements on the cards change to input fields
//button changes to "i need to study"
//if user clicks "i need to study" button, cards switch back to the default state and button changes back to "im ready for a quiz"

function getInputFields(info) {
  const namesList = document.createElement('dl');
  namesList.setAttribute('class', 'card-names');

  const classType = document.createElement('dt');
  classType.innerText = 'Class';
  const className = document.createElement('input');
  className.setAttribute('class', 'class-input');
  namesList.append(classType);
  namesList.append(className);

  const orderType = document.createElement('dt');
  orderType.innerText = 'Order';
  const orderName = document.createElement('input');
  orderName.setAttribute('class', 'order-input');
  namesList.append(orderType);
  namesList.append(orderName);

  const familyType = document.createElement('dt');
  familyType.innerText = 'Family';
  const familyName = document.createElement('input');
  familyName.setAttribute('class', 'family-input');
  namesList.append(familyType);
  namesList.append(familyName);

  const genusType = document.createElement('dt');
  genusType.innerText = 'Genus';
  const genusName = document.createElement('input');
  genusName.setAttribute('class', 'genus-input');
  namesList.append(genusType);
  namesList.append(genusName);

  const speciesType = document.createElement('dt');
  speciesType.innerText = 'Species';
  const speciesName = document.createElement('input');
  speciesName.setAttribute('class', 'species-input');
  namesList.append(speciesType);
  namesList.append(speciesName);

  let card = document.createElement('div');
  card.appendChild(namesList);
  card.setAttribute('class', 'gallery-card');

  let submit = document.createElement('button');
  submit.textContent = 'submit';
  submit.setAttribute('class', 'submit-button button');
  namesList.appendChild(submit);
  submit.addEventListener('click', function() {
    if (
      className.value === info.Class &&
      orderName.value === info.Order &&
      familyName.value === info.Family &&
      genusName.value === info.Genus &&
      speciesName.value === info.Species
    ) {
      card.style.display = 'none';
      scoreDown(score);
    } else {
      card.style.animation = "flash 1s ease-in-out";
    }
  });

  const animalPhoto = document.createElement('img');
  const cardFront = document.createElement('div');
  cardFront.setAttribute('class', 'card-photo');
  animalPhoto.setAttribute('src', info.picture);
  animalPhoto.setAttribute('width', '150px');
  cardFront.style.backgroundImage = `url(${info.picture})`;
  card.appendChild(cardFront);

  return card;
}

const quizButton = document.querySelector('.quiz-button');
const studyButton = document.querySelector('.study-button');
const scoreBoard = document.querySelector('.score-board')

quizButton.addEventListener('click', switchToQuizMode);

function clearGallery() {
  let card = cardGallery.firstElementChild;
  while (card) {
    cardGallery.removeChild(card);
    card = cardGallery.firstElementChild;
  }
}

function switchToQuizMode() {
  clearGallery();
  getSpecies(classID).then(function(speciesKeys) {
    for (var speciesKey of speciesKeys) {
      getInfo(speciesKey).then(function(info) {
        let card = getInputFields(info);
        cardGallery.appendChild(card);
      });
    }
  });
  studyButton.style.display = 'inline';
  quizButton.style.display = 'none';
  shuffleButton.style.display = 'none';
  scoreBoard.textContent = `Cards Remaining: ${score}`;
  return cardGallery;
}

studyButton.addEventListener('click', switchToStudyMode);

function switchToStudyMode() {
  clearGallery();
  getSpecies(classID).then(function(speciesKeys) {
    for (var speciesKey of speciesKeys) {
      getInfo(speciesKey).then(function(info) {
        let card = getInfoList(info);
        cardGallery.appendChild(card);
      });
    }
  });
  studyButton.style.display = 'none';
  quizButton.style.display = 'inline';
  shuffleButton.style.display = 'inline';
  scoreBoard.textContent = '';
  return cardGallery;
}

//trying to get array.length from getSpecies set
let score = getSpecies(classID).then(function (response) {
  score = response.length
  return score
})

function scoreDown() {
  if(score > 0) {
    score -= 1
    scoreBoard.textContent = `Cards Remaining: ${score}`;
  } else if(score = 0) {
    scoreBoard.textContent = "Great work, scientist!"
  }
}

//now that event listeners work, create logic to check answers and act accordingly
//user types answers in the input fields
//if all input.value match thecorresponding info.{nametype}, then the card disappears
// const classInput = document.querySelector(".class-input");
// const orderInput = document.querySelector(".order-input");
// const familyInput = document.querySelector(".family-input");
// const genusInput = document.querySelector(".genus-input");
// const speciesInput = document.querySelector(".species-input");
