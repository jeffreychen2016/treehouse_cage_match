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
    string +=       `<button type="button" class="btn btn-primary btn-lg">Start Cage Match</button>`;
    string +=   `</p>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<img id='player1-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail">`;
    string +=   `<div id='player1-point'>1000</div>`;      
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<img id='player2-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33UnuAbwyKG4qXGagC9rXVkidvv8hvdl1ulQ7ceEOpv1CbAIx" alt="..." class="img-thumbnail">`;
    string +=   `<div id='player2-point'>1000</div>`;      
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-6 col-md-offset-3">`;
    string +=       `<div class="panel panel-default">`;
    string +=           `<div class="panel-body">`;
    string +=               `Basic panel example`;
    string +=           `</div>`;                 
    string +=       `</div>`;          
    string +=   `</div>`;
    string += `</div>`;
    
    printToDom(string,'body');
}

const addEventListeners = (event,callBack) => {
    const userInputs = document.getElementsByClassName('user-input');
    for(let i = 0; i < userInputs.length; i++){
        userInputs[i].addEventListener(event,callBack);
    }
}

const getUserInput = (e) => {
    if(e.target.id === 'player1'){
        const player1 = document.getElementById(e.target.id).value;
        console.log('player1:',player1);
    }else{
        const player2 = document.getElementById(e.target.id).value;
        console.log('player2:',player2);
    }   
    // console.log('player1:',player1);
    // console.log('player2:',player2);
    displayPlayerProfile(e);
}

const displayPlayerProfile = (e) => {
    const xhttp_player_1 = new XMLHttpRequest();
    xhttp_player_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const returnedData_player_1 = JSON.parse(this.responseText);
            if(e.target.id === 'player1'){
                let player1_img = document.getElementById('player1-img');
                player1_img.setAttribute('src',returnedData_player_1.gravatar_url);
                let player1_point = document.getElementById('player1-point');
                player1_point.innerHTML = `${returnedData_player_1.points.total}`;
            }
        }
    };
    xhttp_player_1.open("GET","https://teamtreehouse.com/krissycaron.json", true);
    xhttp_player_1.send();

    const xhttp_player_2 = new XMLHttpRequest();
    xhttp_player_2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const returnedData_player_2 = JSON.parse(this.responseText);
            if(e.target.id === 'player2'){
                let player2_img = document.getElementById('player2-img');
                player2_img.setAttribute('src',returnedData_player_2.gravatar_url);
                let player2_point = document.getElementById('player2-point');
                player2_point.innerHTML = `${returnedData_player_2.points.total}`;
            }
        }
    };
    xhttp_player_2.open("GET","https://teamtreehouse.com/jeffrey.json", true);
    xhttp_player_2.send();
}

// XHR
function runOnSuccess(){
    const data = JSON.parse(this.responseText);
    buildDomString(data);
    addEventListeners('keyup',getUserInput);
    console.log(data);
}

function runOnFail(){
    console.log('XHR fails~~~~');
}

const XHRRequest = (runOnSuccess) => {
    const xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener('load',runOnSuccess);
    xhrRequest.addEventListener('error',runOnFail);
    xhrRequest.open('GET','https://teamtreehouse.com/krissycaron.json');
    xhrRequest.send();
}
// End of XHR



const applicationStarts = () => {
    XHRRequest(runOnSuccess);
}


applicationStarts();

