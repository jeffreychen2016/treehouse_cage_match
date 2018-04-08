const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (data) => {
    string = '';
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<label for="exampleInputName2">Player 1:</label>`;
    string +=   `<input type="text" class="form-control user-input" id="player1" placeholder="Text input">`;    
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<label for="exampleInputName2">Player 2:</label>`;
    string +=   `<input type="text" class="form-control user-input" id="player2" placeholder="Text input">`;    
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<p>`;
    string +=       `<button id='match-start' type="button" class="btn btn-primary btn-lg">Start Cage Match</button>`;
    string +=   `</p>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<img id='player1-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail">`;
    string +=   `<div><h3><span id='player1-point' class="label label-default">Default</span></h3></div>`;      
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<img id='player2-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail">`;
    string +=   `<div><h3><span id='player2-point' class="label label-default">Default</span></h3></div>`;      
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-6 col-md-offset-3">`;
    string +=       `<div class="panel panel-default">`;
    string +=           `<div id='winner-board' class="panel-body">`;
    string +=               `Match Result`;
    string +=           `</div>`;                 
    string +=       `</div>`;          
    string +=   `</div>`;
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
                const returnedData_player_1 = JSON.parse(this.responseText);
                let player1_img = document.getElementById('player1-img');
                player1_img.setAttribute('src',returnedData_player_1.gravatar_url);
                let player1_point = document.getElementById('player1-point');
                player1_point.innerHTML = `${returnedData_player_1.points.total}`;
            }else{
                let player1_img = document.getElementById('player1-img');
                player1_img.setAttribute('src','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx');
            }
        }
        xhttp_player_1.open("GET","https://teamtreehouse.com/" + player1 + ".json", true);
        xhttp_player_1.send();
    }else{
        const xhttp_player_2 = new XMLHttpRequest();
        xhttp_player_2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const returnedData_player_2 = JSON.parse(this.responseText);
                let player2_img = document.getElementById('player2-img');
                player2_img.setAttribute('src',returnedData_player_2.gravatar_url);
                let player2_point = document.getElementById('player2-point');
                player2_point.innerHTML = `${returnedData_player_2.points.total}`;
            }else{
                let player2_img = document.getElementById('player2-img');
                player2_img.setAttribute('src','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx');
            }
        };
        xhttp_player_2.open("GET","https://teamtreehouse.com/" + player2 + ".json", true);
        xhttp_player_2.send();
    }
} //End of display player profile

const findWinner = () => {
    const player_1_point = parseInt(document.getElementById('player1-point').innerHTML);
    const player_2_point = parseInt(document.getElementById('player2-point').innerHTML);

    if(!isNaN(player_1_point) && !isNaN(player_2_point)){
        if(player_1_point > player_2_point){
            let winner = document.getElementById('player1').value;
            document.getElementById('winner-board').innerHTML = winner;
        }else if(player_1_point < player_2_point){
            let winner = document.getElementById('player2').value;
            document.getElementById('winner-board').innerHTML = winner;
        }else{
            document.getElementById('winner-board').innerHTML = 'Tie!!!';
        }
    }else{
        alert('Please select both players!!!');
    }
}

const applicationStarts = () => {
    buildDomString();
    addEventListeners('keyup',getUserInput,'class','user-input');
    addEventListeners('click',findWinner,'id','match-start');
}


applicationStarts();

