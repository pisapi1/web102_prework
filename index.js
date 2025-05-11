/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
//const GAMES_JSON = JSON.parse(GAMES_DATA)
const GAMES_JSON = games;
// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        let x = document.createElement("div");

        // add the class game-card to the list
        x.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        //games[i].classList.add("game-img");
        
        x.innerHTML = `
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        <img class="game-img" src="${game.img}" alt="${game.name}" />
        `;
        
        
        // append the game to the games-container
        gamesContainer.append(x);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_contributions = GAMES_JSON.reduce(
    (acc, curr) => acc + curr.backers
    ,0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${ total_contributions.toLocaleString() }</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let total_raised = GAMES_JSON.reduce(
    (acc, curr) => acc + curr.pledged
    ,0)
// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${ total_raised.toLocaleString() }</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let total_num_games = GAMES_JSON.reduce(
    (acc) => acc + 1
    ,0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
gamesCard.innerHTML = `<p>${ total_num_games }</p>`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unmet_games = GAMES_JSON.filter( (unmet) => {return unmet.goal > unmet.pledged});

    //console.log("Filtered Unfunded Games:", unmet_games);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unmet_games);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let met_games = GAMES_JSON.filter( (met) => {return met.goal <= met.pledged});


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(met_games);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let num_unfunded = GAMES_JSON.reduce(
    (acc, curr) => {
        // if pledgers is less than goal
        if(curr.goal > curr.pledged) {
            return acc + 1
        }
        else {
            return acc
        }
    }
    ,0)

// create a string that explains the number of unfunded games using the ternary operator
let unfunded_statement = `A total of $${total_raised.toLocaleString()} has been raised for ${total_num_games} games. 
Currently, ${num_unfunded} ${num_unfunded > 1? "games remain" : "game remains"} unfunded. We need yur help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
let para = document.createElement("p");
let node_text = document.createTextNode(unfunded_statement);
para.appendChild(node_text);

descriptionContainer.append(para);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first_game, second_game, ...rest] = sortedGames;

// first word of first game
let first_game_name = first_game.name;
// first word of second game
let second_game_name = second_game.name; 


// create a new element to hold the name of the top pledge game, then append it to the correct element
// top pledge game
let firstgame_text = document.createElement("p");
let firstgame_text_node = document.createTextNode(first_game_name);
firstgame_text.append(firstgame_text_node);

firstGameContainer.append(firstgame_text);
// do the same for the runner up item
// second top pledge game
let secondgame_text = document.createElement("p");
let secondgame_text_node = document.createTextNode(second_game_name);
secondgame_text.append(secondgame_text_node);

secondGameContainer.append(secondgame_text);