var contactURLArray = [];
var contactArray = [];
var loadContact = 0;

function initApplication() {
    console.log("Welcome to Mustang v1!");
}

function loadIndex() {
    var contactRequest = new XMLHttpRequest()
    indexRequest.open('GET', 'https://mustang-index-jaw.azurewebsites.net');
    indexRequest.onload = function() {
        console.log("Index JSON: " + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i < contactIndex.length; i++){
            contactURLArray.push(contactIndex[i].contactURL);
        }
        console.log("ContactURLArray: "+ JSONstringify(contactURLArray));
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray = 0;
    loadContact = 0;

    if (contactURLArray.length > loadContact) {
        loadNextContact(contactURLArray[loadContact]);
    }

}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        contactArray.push(contact);
        document.getElementById("contactID").innerHTML = JSON.stringify(contactArray);

        loadContact++;
        if (contactURLArray.length > loadContact){
            loadNextContact(contactURLArray[loadContact]);
        }
    }
    contactRequest.send();
}

function logContacts() {
    console.log(contactArray);
}