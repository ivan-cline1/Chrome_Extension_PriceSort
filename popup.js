
function sendMessages(){
  var selection = document.querySelector('select').value; 
  chrome.runtime.sendMessage({name:"start",select:selection});
  chrome.tabs.query( {currentWindow: true, active : true},
    function(tabArray){
      var activeTab = tabArray[0];
      chrome.tabs.sendMessage(activeTab.id, {name: "step2",select:selection});}
  )
}

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("myButton").addEventListener("click",sendMessages)
    var list= document.getElementById('myList');
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      // Check if the message contains elements
      if (message.elements) {
        list.innerHTML = '';
        for (let element of message.elements) {
          const listItem = document.createElement('li');
          listItem.textContent = element;
          list.appendChild(listItem);
        }
        
      }
    });
  
  
  })



