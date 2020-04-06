# Fieldwork Flashcards :bear: :bird: :frog: :snake:

## About This Game

![Fieldwork Flashcards landing page](https://i.imgur.com/gumIvXe.png)

Ever since I can remember, my first love has been animals. As a kid I wanted to be like Jane Goodall or Steve Irwin. I followed this passion right through undergrad, and earned a degree in Wildlife & Conservation Biology. Throughout my time in that program, my professors and mentors emphasized the importance of local natural resources and native species. An expectation in every wildlife course; whether ornithology, herpetology, mammalogy, or entomology, was to memorize the clade and scientific name of every species, and to be able to identify that species in the field.

For this first SEIR project, I wanted to build something that I would've found useful and fun back in my college days. I thought back to the hours I spent making hundreds of flashcards...the papercuts, the hand cramps, the scissiors and glue. Though using these flashcards was essential to my education, I wouldn't call the memories of making them fond. My goal for this project is to make beautiful and user-friendly virtual flashcards that allow students like past me to take an active role in their learning, without all the steps that come before actually using the flashcards.

## Planning

### User stories

#### Who will use Fieldwork Flashcards?

Wildlife Biology students in Rhode Island, science teachers, wildlife enthusiasts, employees and volunteers at Rhode Island's many nature preserves.

#### Why will they use it?

This flashcard game will help its users memorize important details about local native species.

#### What is Fieldwork Flashcards?

This flashcard game will allow users to study and practice, and a gold feature would include a quiz mode where users could test their knowledge.

### Notes and wireframes

![Fieldwork Flashcards rough sketch](https://i.imgur.com/jyyQAAW.jpg)
My design ideas evolved throughout this process. This is my first very rough idea of what I wanted this web app to look like, and what features I wanted to include. Dream big!

### Bronze, Silver, Gold, Platinum plans

Bronze (MVP)

- [x] Incorporates HTML, CSS and JavaScript
- [x] Renders in the browser
- [x] Uses Javascript for DOM manipulation
- [x] Deployed online using Github Project pages
- [x] Uses semantic markup for HTML and CSS (adhere to best practices)
- [x] Has a landing page that displays all cards ("study mode")
- [x] Has a "practice mode" where cards are shuffled and users can flip back and forth between front and back of them

Silver

- [x] Is beautifully designed with CSS
- [x] Features different "decks" users can choose from e.g. reptiles, amphibians, animal track ID

Gold

- [x] Quiz Mode

  - [x] this mode will replace taxa names with blank fields that they need to fill in for Class, Order, Family etc.
  - [x] this mode will score their answers
  - [x] a "cards remaining" field counts down cards as the user fills in correct answers

Platinum

- [x] game is fully responsive so user can play on their mobile devices
- [ ] users can add their own cards to the decks
- [ ] score page would allow users to review all entries for that session to identify which species they need more practice with

## Features

Fieldwork Flashcards in its current form is on its way to platinum level.

Flashcards are organized into separate decks by Class (the taxonomic rank, not the web dev selector). At this time, users can choose from Classes Mammalia, Aves, Amphibia, and Reptilia.

The study page for each card deck loads with cards facing up, showing a picture of each species. Users hover over the card to "flip" it, and see a list of taxa names for that species. Users can click buttons to shuffle the cards or enter a quiz mode.

Quiz mode reloads the cards with input fields on the back of each card instead of the taxa names. Users fill in each field and click "submit", and the game scores their answers. If any one of the fields is incorrect, the card background will flash red. If all fields are correct, the card vanishes. A "cards remaining" field at the top of the page counts down as cards vanish, letting the user know how many they have left. When the user eliminates all cards, the text changes to "Great work, scientist!" From this page, users can navigate back to the homepage to choose another deck or navigate back to study mode by clicking buttons on the page.

Fieldwork Flashcards is fully responsive and works well on mobile devices. It was designed and built using Chrome, but it should function well in any modern browser.

## Technologies Used

This game was built entirely with HTML, CSS, and JavaScript. Hosted on a GitHub project page, it should render and function well in any modern browser.

The cards in each deck are not hard-coded. Rather, they are generated dynamically using two different APIs:

- I pulled the taxonomic information from each species from Global Biodiversity Information Facility, a site that offers open access to biodiversity data from all over the globe. This allowed me to query data by US state and Class, and pull data on mammals/birds/etc. found in the state of Rhode Island. You can find the docs for the GBIF API [here](https://www.gbif.org/developer/summary). GBIF gets much of its data from iNaturalist, a site where users can report species sitings with photos and geographic location, along with a plethora of other information about the siting. The benefit of this is that it allowed me to query data from a relatively specific area. The downfall, however, involved many many pictures of roadkill.
- In order to increase my chance of accessing photos of live animals, I pulled pictures for the front of the flashcards from the Encyclopedia of Life: basically the Wikipedia of species, but better. Making these two APIs work together to produce one flashcard required several steps: I took the unique species key produced by GBIF, converted that into a species name, which was in turn converted to a unique EoL species key which I could plug into the EoL search. The EoL classic API docs can be found [here](https://eol.org/docs/what-is-eol/data-services/classic-apis).

## Biggest Challenges

The most difficult part of this project was writing the logic to generate the cards. I eliminated the idea of hard-coding cards early on in my planning, because it would have greatly limited the scope of this project.

Deciding to use APIs was easy, figuring it all out was another matter. One of my biggest takeaways from this project is that working with APIs is _hard_. No two are exactly alike, and they all have their quirks. After coding in JavaScript for a while before learning APIs, I had to remind myself approximately one billion times that **fetch only returns a promise** and you **have to** use .then to do anything with it.

I also had a very hard time in the beginning making it all work, until I broke everything down into tiny steps and wrote a function for each one.

## Biggest Successes

I am really proud of the way this game looks. I really enjoy design, and I was inspired by the minimal design of old field guides. I wish I could have used beautiful old scientific illustrations for all of the cards!

I am also really proud of how many features I was able to develop for Fieldwork Flashcards. I certainly did not expect to achieve any of my platinum goals, but I did, and I'm proud.

### A snippet I'm particularly proud of

Here I iterated over an array of species keys that I generated with the getSpecies function, and for each key, created a card object using the getInfo function, and populated information and an image from the object to a card using the getInfoList function, and then appended that card to the gallery. This was the culmination of all the many small steps I took before this, and I was overjoyed when I finally created the version that worked.

```javascript
cardGallery = document.querySelector('.gallery');
getSpecies(classID).then(function(speciesKeys) {
  for (var speciesKey of speciesKeys) {
    getInfo(speciesKey).then(function(info) {
      let card = getInfoList(info);
      cardGallery.appendChild(card);
    });
  }
});
```

## Unsolved Issues and Ideas for the Future

Despite taking the extra steps to pull images from a better source, they are not perfect. While the roadkill is gone, some cards depict skulls/skeletons, or preserved specimens. Identifying species this way is still very common for wildlife biology students, but it's not really what I was going for. Additionally, each image is so different in size that some are cropped strangely when they are applied to the card. In the future I'd like to be able to address these issues to improve the usability of this game.

My JavaScript code could not be considered very DRY in its current state. The code that initially generates the cards for study mode is repeated to generate quiz mode, with minor changes to generate input fields instead of `<dd>` elements. In the future, I'd like to be able to implement this in a different way, so that my code is DRYer and makes fewer API requests, which would reduce loading time.

In the future I'd also like to be able to add decks for more taxa to include marine species and insects/arachnids, and add a feature that allows users to create their own cards.

## Gratitude

Thank you to all my GA teachers and fellow students for help and support throughout this project week!
