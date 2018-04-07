const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = () => {
    string = '';
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<label for="exampleInputName2">Player 1:</label>`;
    string +=   `<input type="text" class="form-control" placeholder="Text input">`;    
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<label for="exampleInputName2">Player 2:</label>`;
    string +=   `<input type="text" class="form-control" placeholder="Text input">`;    
    string +=   `</div>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<p>`;
    string +=       `<button type="button" class="btn btn-primary btn-lg">Start Cage Match</button>`;
    string +=   `</p>`;
    string += `</div>`;
    string += `<div class="row margin-top">`;
    string +=   `<div class="col-md-4 col-md-offset-1">`;
    string +=   `<img src="..." alt="..." class="img-thumbnail">`;
    string +=   `<div>1000</div>`;      
    string +=   `</div>`;
    string +=   `<div class="col-md-4 col-md-offset-2">`;
    string +=   `<img src="..." alt="..." class="img-thumbnail">`;
    string +=   `<div>1000</div>`;      
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


// XHR
function runOnSuccess(){
    const data = JSON.parse(this.responseText);
    buildDomString();
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