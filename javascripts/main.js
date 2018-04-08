const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (data) => {
    string = '';
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<label class='text-red' for="exampleInputName2">Player 1:</label>`;
    string +=   `<input type="text" class="form-control user-input player-label" id="player1" placeholder="Player 1 Name">`;    
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<label class='text-blue' for="exampleInputName2">Player 2:</label>`;
    string +=   `<input type="text" class="form-control user-input" id="player2" placeholder="Player 2 Name">`;    
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<p>`;
    string +=       `<button id='match-start' type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter">Start Cage Match</button>`;
    string +=   `</p>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<img id='player1-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail players-default-img border-red">`;
    string +=   `<div><h3><span id='player1-point' class="label label-default border-red-thin text-red">Points</span></h3></div>`;      
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<img id='player2-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail players-default-img border-blue">`;
    string +=   `<div><h3><span id='player2-point' class="label label-default border-blue-thin text-blue">Points</span></h3></div>`;      
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">`;
    string +=   `<div class="modal-dialog modal-dialog-centered" role="document">`;
    string +=       `<div class="modal-content">`;
    string +=           `<div class="modal-header">`;
    string +=               `<h5 id='winner-name' class="modal-title" id="exampleModalLongTitle">The Winner is:</h5>`;
    string +=           `</div>`;
    string +=           `<div class="modal-body" id='winner-board'>`;
    string +=           `</div>`;
    string +=           `<div class="modal-footer center-btn">`;
    string +=               `<button id="find-winner-btn" type="button" class="btn btn-primary">Who Will Be The Winner!?</button>`;
    string +=               `<button id="modal-close-btn" type="button" class="btn btn-primary" data-dismiss="modal">Close</button>`;
    string +=           `</div>`;
    string +=       `</div>`;
    string +=    `</div>`;
    string += `</div>`;

    printToDom(string,'body');
}

const addEventListeners = (event,callBack,attr,attrName) => {
    if(attr === 'class'){
        const elements = document.getElementsByClassName(attrName);
        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener(event,callBack);
        }
    }else if(attr === 'id'){
        const element = document.getElementById(attrName);
        element.addEventListener(event,callBack);
    }
}

//display player profile
const getUserInput = (e) => {
    let player1 = '';
    let player2 = '';
    if(e.target.id === 'player1'){
        player1 = document.getElementById(e.target.id).value;
    }else{
        player2 = document.getElementById(e.target.id).value;
    }   
    displayPlayerProfile(e,player1,player2);
}

const displayPlayerProfile = (e,player1,player2) => {
    if(e.target.id === 'player1'){
        const xhttp_player_1 = new XMLHttpRequest();
        xhttp_player_1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                runOnSuccess(this,'player1');
            }else{
                runOnFailure('player1');
            }
        }
        xhttp_player_1.open("GET","https://teamtreehouse.com/" + player1 + ".json", true);
        xhttp_player_1.send();
    }else if(e.target.id === 'player2'){
        const xhttp_player_2 = new XMLHttpRequest();
        xhttp_player_2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                runOnSuccess(this,'player2');
            }else{
                runOnFailure('player2');
            }
        };
        xhttp_player_2.open("GET","https://teamtreehouse.com/" + player2 + ".json", true);
        xhttp_player_2.send();
    }
} //End of display player profile

function runOnSuccess(xhrCall,playerID){
    const returnedData = JSON.parse(xhrCall.responseText);
    let player_img = document.getElementById(`${playerID}-img`);
    player_img.setAttribute('src',returnedData.gravatar_url);
    let player_point = document.getElementById(`${playerID}-point`);
    player_point.innerHTML = `${returnedData.points.total}`;
}

function runOnFailure(playerID){
    let player_img = document.getElementById(`${playerID}-img`);
    player_img.setAttribute('src','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx');
    let player_point = document.getElementById(`${playerID}-point`);
    player_point.innerHTML = `Points`;
}

const inputValidation = () => {
    const player1_fight = document.getElementById('player1').value;
    const player2_fight = document.getElementById('player2').value;
    const player_1_point = parseInt(document.getElementById('player1-point').innerHTML);
    const player_2_point = parseInt(document.getElementById('player2-point').innerHTML);
    if(isNaN(player_1_point) || isNaN(player_2_point)){
        document.getElementById('winner-name').innerHTML = 'Invalid Player Names';
        document.getElementById('winner-board').innerHTML = 'Please select both players!!!';  
        document.getElementById('find-winner-btn').style.display = 'none';
    }else{
        startFight(player1_fight,player2_fight);
    }
}

const startFight = (player1,player2) => {
    const fight_title = document.getElementById('winner-name').innerHTML;
    const fight_img = `<img src="https://adriaticmedianethr.files.wordpress.com/2017/08/fora-dana29.gif?w=399" alt="..." class="img-thumbnail players-default-img">`;
    document.getElementById('winner-name').innerHTML = `<h4><span class="label label-default text-red border-red-thin">${player1}</span> VS <span class="label label-default text-blue border-blue-thin">${player2}</span></h4> `;
    document.getElementById('winner-board').innerHTML = fight_img;
    document.getElementById('find-winner-btn').style.display = 'unset';  
    document.getElementById('modal-close-btn').style.display = 'none';  
    addEventListeners('click',findWinner,'id','find-winner-btn');
}

const findWinner = () => {
    const player_1_point = parseInt(document.getElementById('player1-point').innerHTML);
    const player_2_point = parseInt(document.getElementById('player2-point').innerHTML);

    if(player_1_point > player_2_point){
        let winner = `The Winner Is:<br><span class="label label-default text-red border-red-thin">${document.getElementById('player1').value}</span>`;
        let winner_img_source = document.getElementById('player1-img').getAttribute('src');
        let winner_img = `<img src="${winner_img_source}" alt="..." class="img-thumbnail players-default-img border-red">`;
        document.getElementById('winner-name').innerHTML = winner;
        document.getElementById('winner-board').innerHTML = winner_img;
    }else if(player_1_point < player_2_point){
        let winner = `The Winner Is:<br><span class="label label-default text-blue border-blue-thin">${document.getElementById('player2').value}</span>`;
        let winner_img_source = document.getElementById('player2-img').getAttribute('src');
        let winner_img = `<img src="${winner_img_source}" alt="..." class="img-thumbnail players-default-img border-blue">`;
        document.getElementById('winner-name').innerHTML = winner;
        document.getElementById('winner-board').innerHTML = winner_img;
    }else{
        document.getElementById('winner-board').innerHTML = 'Tie!!!';
    }
    document.getElementById('find-winner-btn').style.display = 'none';  
    document.getElementById('modal-close-btn').style.display = 'unset'; 
}

const applicationStarts = () => {
    buildDomString();
    addEventListeners('keyup',getUserInput,'class','user-input');
    addEventListeners('click',inputValidation,'id','match-start');
}


applicationStarts();

