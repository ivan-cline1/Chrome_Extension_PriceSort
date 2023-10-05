chrome.runtime.onMessage.addListener((msg,sender,response)=>{
    if(msg.name==="start"){
        console.log('started');
        chrome.runtime.sendMessage({name:'step2'});
    }

    
})
