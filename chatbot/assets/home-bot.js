var botui = BotUI('exdp-bot');

var customerName = 'x'

var wifiVisibleDone = false
var wifiRestartDone = false

var wifiBlockedDone = false
var wifiConnectDone = false

botui.message.bot({ // show first message
  delay: 1000,
  content: 'Please type in your customer name'
})
.then(function () {
  return botui.action.text({
    delay: 1000,
    action: {
      value: '',
      placeholder: 'Customer name'
    }
  });
})
.then(function (res) {
  customerName = res.value;
  console.log('Customer: ' + customerName);
})
.then(function () {
  return botui.message.bot({
    delay: 2000,
    content: 'Hello there ' + customerName + ', my name is Jarvis the chatbot. How may I help you with your wifi?',
  });
})
// ------- Sending and testing MQTT messaging ----------
.then(function() {
  sendMessage("Some very very very cool message is written here."); 
})   
// -----------------------------------------------------
.then(() => {
  return botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: 'My home internet is not working. The WiFi is down.',
        value: ''
      }
    ]
  })
})

/*
// --- Anders roder her  
.then(function() {
  setTimeout(function(){ navigator.vibrate([800, 300, 200, 100, 300, 100, 200]) }, 2000) //vibration set like this is sent before the next message 
})
// --- til her
*/

.then(function () {
  return botui.message.bot({
    delay: 2500,
    content: "I'm sorry to hear that your wifi is not working properly  " + customerName + ". What seems to be the problem?",
  })
})
.then(() => {
  return botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: 'I need help with restarting my router.',
        value: 'restart'
      },
      {
        text: 'My wifi connection does not appear',
        value: 'visible'
      }
    ]
  })
})
.then((res) => {
  if(res.value == 'restart') {
    wifiRestart();
  }
  if(res.value == 'visible') {
    wifiVisible();
  }
});

var preWifiRestart = function () {
  console.log("preWifiRestart chat")
  botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: "It didn't work. I still need help.",
        value: ''
      }
    ]
  })
  .then(function () {
    wifiRestart();
  })
}

var wifiRestart = function () {
  console.log("wifiRestart chat")
  botui.message.add({
    delay: 2000,
    content: "Try to restart your Wifi router, please do the following:"
  })

// --- Vibration 1.point  
.then(function() {
  setTimeout(function(){ navigator.vibrate([1000]) }, 2000) //vibration set like this is sent before the next message 
})
// --- til her

  .then(function () {
    return botui.message.add({
      delay: 2000,
      content: '1. Unplug your wifi router or modem from its power outlet (don’t just turn it off).'
    });
  })
  

// --- Vibration 2.point  
.then(function() {
  setTimeout(function(){ navigator.vibrate([500, 100, 500]) }, 2500) //vibration set like this is sent before the next message 
})
// --- til her


  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: '2. Wait 15-20 seconds, then plug it back in.'
    });
  })


 // --- Vibration 3.point 
.then(function() {
  setTimeout(function(){ navigator.vibrate([333, 100, 333, 100, 333]) }, 2500) //vibration set like this is sent before the next message 
})
// --- til her


  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: '3. Allow the device a minute or two to turn back on.'
    });
  })
  .then(function () {
    wifiRestartDone = true
    console.log("wifiRestartDone = " + wifiRestartDone)
  })
  .then(() => {
    if( wifiVisibleDone && wifiRestartDone == true ) {
      cont(); // Should skip the rest of this chat, if wifiVisibleDone == false
    }
    if ( wifiVisibleDone == false && wifiRestartDone == true ) {
      preWifiVisible();
    }
  })
};

var preWifiVisible = function () {
  console.log("preWifiVisible chat")
  botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: "It didn't work. I still need help.",
        value: ''
      }
    ]
  })
  .then(function () {
    wifiVisible();
  })
}

var wifiVisible = function () {
  console.log("wifiVisible chat")
  botui.message.add({
    delay: 2000,
    content: "Okay  " + customerName + ". Please try the following:"
  })
  .then(function () {
    return botui.message.add({
      delay: 2000,
      content: '1. Troubleshoot your wireless connection'
    });
  })
  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: '2. Check to see if the network is hidden'
    });
  })
  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: '3. Check your ISP (Internet Service Provider)'
    });
  })
  .then(function () {
    wifiVisibleDone = true
    console.log("wifiVisibleDone = " + wifiVisibleDone)
  })
  .then(() => {
    if( wifiVisibleDone && wifiRestartDone == true ) {
      cont(); // Should skip the rest of this chat, if wifiVisibleDone == false
    }
    if ( wifiVisibleDone == true && wifiRestartDone == false ) {
      preWifiRestart();
    }
  })
};

var cont = function () {
  console.log("continue  chat")
  botui.message.add({
    delay: 4000,
    content: customerName + ", is your WiFi now visible?"
  })
  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 4000,
      action: [
        {
          text: 'Yes, my WiFi is visible but wont connect.',
          value: 'wifiConnect'
        },
        {
          text: "The WiFi signal is visible, but signal strength is low.",
          value: 'wifiBlocked'
        }
      ]
    })
  })
  .then((res) => {
    if(res.value == 'wifiConnect') {
      wifiConnect();
    }
    if(res.value == 'wifiBlocked') {
      wifiBlocked();
    }
  });
};

var preWifiConnect = function () {
  console.log("preWifiConnect chat")
  botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: "Awesome, the signal is better now! But I still can't connect.",
        value: ''
      }
    ]
  })
  .then(function () {
    wifiConnect();
  })
}

var wifiConnect = function () {
  console.log("wifiConnect chat")
  botui.message.add({
    delay: 2500,
    content: "Okay  " + customerName + ", please try the following:"
  })
  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: '1. Right click on the network icon and run the troubleshooting'
    });
  })
  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: "2. Flush DNS cache by opening your command and typing 'ipconfig/flushdns' and press enter"
    });
  })
  .then(function () {
    wifiConnectDone = true
    console.log("wifiConnectDone = " + wifiConnectDone)
  })
  .then(() => {
    if( wifiBlockedDone && wifiConnectDone == true ) {
      ending(); // Should skip the rest of this chat, if == true
    } 
    if( wifiBlockedDone == false && wifiConnectDone == true ) {
      preWifiBlocked();
    }
  })
};

var preWifiBlocked = function () {
  console.log("preWifiBlocked chat")
  botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 2500,
    action: [
      {
        text: "Awesome, i'm connected now! But the signal strenght is low,",
        value: ''
      }
    ]
  })
.then(function () {
  wifiBlocked();
})
}

var wifiBlocked = function () {
  console.log("wifiBlocked chat")
  botui.message.add({
    delay: 2000,
    content: "The WiFi signal can be blocked by physical objects. Is anything covering or blocking your WiFi router?"
  })
  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 4000,
      action: [
        {
          text: 'Yes, my WiFi router is placed behind a flower pot.',
          value: ''
        }
      ]
    })
  })
  .then(function () {
    return botui.message.add({
      delay: 2500,
      content: "Try to place your WiFi router in an open space where the signal is not blocked and try again."
    });
  })
  .then(function () {
    wifiBlockedDone = true
    console.log("wifiBlockedDone = " + wifiBlockedDone)
  })
  .then(() => {
    if( wifiBlockedDone && wifiConnectDone == true ) {
      ending(); // Should skip the rest of this chat, if == true 
    }
    if (wifiBlockedDone == true && wifiConnectDone == false) {
      preWifiConnect();
    }
  })
};

var ending = function () {
  botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 3000,
    action: [
      {
        text: "Cool, the WiFi is now visible and the signal strong!",
        value: ''
      }
    ]
  })
  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 3000,
      action: [
        {
          text: "However, my WiFi still doesn't work, there is no internet connection.!",
          value: ''
        }
      ]
    })
  })
  .then(function () {
    return botui.message.add({
      delay: 2000,
      content: "I am sorry to hear that " + customerName + ". Please try and restart your device. If your device is not updated, it might help to update it."
    });
  })
  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 3000,
      action: [
        {
          text: 'Awesome, it worked!',
          value: 'victory'
        },
        {
          text: "Restarting my device didn't work either.. I still need help.",
          value: 'endofroad'
        }
      ]
    })
  })
  .then((res) => {
    if(res.value == 'victory') {
      victory();
    }
    if(res.value == 'endofroad') {
      endofRoad();
    }
  });
}

var victory = function () {
  console.log("Positive outcome, victory")
  botui.message.add({
    delay: 2000,
    content: "Great to hear  " + customerName + "! Is there anything else I can be of service with? "
  })
  
  // --- Celebration vibration 
  .then(function() {
    setTimeout(function(){ navigator.vibrate([30, 100, 30, 100, 30, 100, 30]) }, 20) //vibration set like this is sent before the next message 
  })
  // --- til her

  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 2000,
      action: [
        {
          text: "No, I want to go and surf the waves of the internet",
          value: 'victory'
        }
      ]
    })
  })
};

var endofRoad = function () {
  console.log("Negative outcome, gameover")
  botui.message.add({
    delay: 2000,
    content: "I am sorry to hear that  " + customerName + ". Please contact our customer service during weekdays opening hours: 8 - 10 GMT +2 / CEST +8"
  })
  .then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 2000,
      action: [
        {
          text: "Great, thanks...",
          value: 'gameover'
        }
      ]
    })
  })
};

/* //OLD ORIGINAL CHATBOT 

var botui = BotUI('exdp-demo');

botui.message.bot({ // show first message
  delay: 1000,
  content: 'Hello there!'
}).then(() => {
  return botui.message.bot({ // second one
    delay: 2000, // wait 2 sec.
    content: 'Let me demonstrate how we can use vibrations and chat messaging for our experiment'
  })
}).then(() => {
  return botui.action.button({ // let the user perform an action
    delay: 1000,
    action: [
      {
        text: 'Sure, lets do it Einstein. But do not do it to fast, I like it slow and steady!',
        value: 'sure'
      },
      {
        text: 'Uuuh...?',
        value: 'skip'
      }
    ]
  })
}).then((res) => {
  if(res.value == 'sure') {
    tutorial();
  }
  if(res.value == 'skip') {
    end();
  }
});

var tutorial = function () {
  botui.message.add({
    delay: 1500,
    content: "Awesome!!!! We can show buttons like the one you just pressed."
  }).then(function () {
    return botui.message.add({
      delay: 3000,
      content: 'We can also ask for text input like ...'
    });
  }).then(function () {
    return botui.message.add({
      delay: 2000,
      content: 'Whats your name?'
    });
  }).then(function () {
    return botui.action.text({
      delay: 1000,
      action: {
        value: '',
        placeholder: ''
      }
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 2000,
      content: res.value + ' is a nice name! 😀',
    });
  }).then(function() {
    navigator.vibrate(1000)  //vibration set like this is, after a message is sent at the same time as the previous message 
  }).then(function () {
    return botui.message.bot({
      delay: 3000,
      content: 'Did you feel that vibration?'
    });
  }).then(function () {
    return botui.message.bot({
      delay: 2000,
      content: 'That was an instant vibration'
    });
  }).then(function() {
    setTimeout(function(){ navigator.vibrate(1000) }, 2000);  //vibration set like this is sent before the next message 
  }).then(function () {
    return botui.message.bot({
      delay: 3000,
      content: 'That was a pre-emptive vibration 🙃'
    });
  }).then(function () {
    return botui.message.bot({
      delay: 3000,
      content: 'And this is a delayed vibration 😜'
    });
  }).then(function() {
    setTimeout(function(){ navigator.vibrate(1000) }, 2000);  //vibration set like this is send after a message is sent 
  })
  
  .then(end);
};


var end = function () {
  botui.message.add({
    delay: 5000,
    content: '!(book) [Read the docs](https:///docs.botui.org), see [examples](https:///examples.botui.org) or explore the code on !(github) [GitHub](https://github.com/moinism/botui)'
  });
};

*/