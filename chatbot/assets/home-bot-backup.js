var botui = BotUI('exdp-bot');

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
  clientConnect();
  return botui.message.bot({
    delay: 2000,
    content: 'Hello there ' + res.value + ', my name is Jarvis the chatbot. How may I help you with your wifi?',
    
  });
})
.then(() => {
  sendMQTT("Some very cool massage is written here.");
  return botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 1000,
    action: [
      {
        text: 'My home internet is not working. The WiFi is down.',
        value: ''
      }
    ]
  })
}).then(function () {
  return botui.message.bot({
    delay: 2000,
    content: "I'm sorry to hear that your wifi is not working properly. Have you tried to restart your wifi router?",
  });
}).then(() => {
  return botui.action.button({ // let the user perform an action, choose which answer to give
    delay: 1000,
    action: [
      {
        text: 'No, I need help with restarting my router.',
        value: 'restart'
      },
      {
        text: 'Yes, WiFi is still not working',
        value: 'continue'
      }
    ]
  })
}).then((res) => {
  if(res.value == 'restart') {
    wifiRestart();
  }
  if(res.value == 'continue') {
    wifiBlocked();
  }
});


var wifiRestart = function () {
  botui.message.add({
    delay: 1500,
    content: "I can help you with that, please do the following:"
  })

   //--- Vib
  .then(function() {
    navigator.vibrate(1000)})
   //--- Vibslut

  .then(function () {
    return botui.message.add({
      delay: 1000,
      content: '1. Unplug your wifi router or modem from its power outlet (don’t just turn it off).'
    });
  })

   //--- Vib
  //.then(function() {
  //  navigator.vibrate([800, 300, 200, 100, 300, 100, 200]});
  
   //--- Vibslut

  .then(function () {
    return botui.message.add({
      delay: 1000,
      content: '2. Wait 15-20 seconds, then plug it back in.'
    });
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: '3. Allow the device a minute or two to turn back on.'
    });
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: 'Awesome, it worked!.',
          value: 'end'
        },
        {
          text: "It didn't work, I still need help",
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'end') {
      end();
    }
    if(res.value == 'continue') {
      wifiBlocked();
    }
  });
};

var wifiBlocked = function () {
  botui.message.add({
    delay: 1500,
    content: "The WiFi signal can be blocked by physical objects. Is anything covering your WiFi router?"
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: 'Yes, my WiFi router is placed behind a flower pot.',
          value: 'flowerPot'
        },
        {
          text: "No, it is placed in the open",
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'flowerPot') {
      flowerPot();
    }
    if(res.value == 'continue') {
      wifiVisible();
    }
  });
};

var flowerPot = function () {
  botui.message.add({
    delay: 1500,
    content: "Try to place your WiFi router in an open space where the signal is not blocked and try again. "
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: 'Awesome, it worked!',
          value: 'end'
        },
        {
          text: "It didn't work, I still need help",
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'end') {
      end();
    }
    if(res.value == 'continue') {
      wifiVisible();
    }
  });
};

var wifiVisible = function () {
  botui.message.add({
    delay: 1500,
    content: "Is your WiFi connection visible, but unable to connect?"
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: 'No, my WiFi does not appear.',
          value: 'wirelesstrouble'
        },
        {
          text: 'Yes, my WiFi is visible but wont connect.',
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'wirelesstrouble') {
      wifiTrouble();
    }
    if(res.value == 'continue') {
      wifiConnect();
    }
});
};

var wifiTrouble = function () {
  botui.message.add({
    delay: 1500,
    content: "Please try the following:"
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: '1. Troubleshoot your wireless connection'
    });
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: '2. Check to see if the network is hidden'
    });
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: '3. Check your ISP (Internet Service Provider)'
    });
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: "Awesome, now my WiFi is visible! But I still can't connect",
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'continue') {
      wifiConnect();
    }
  });
};

var wifiConnect = function () {
  botui.message.add({
    delay: 1500,
    content: "Okay, then please try the following:"
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: '1. Right click on the network icon and run the troubleshooting'
    });
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: "2. Flush DNS cache by opening your command and typing 'ipconfig/flushdns' and press enter"
    });
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: "Awesome, I'm connected!!",
          value: 'end'
        },
        {
          text: "It didn't work, I still need help.",
          value: 'continue'
        }
      ]
    })
  }).then((res) => {
    if(res.value == 'end') {
      end();
    }
    if(res.value == 'continue') {
      endofRoad();
    }
});
};

var endofRoad = function () {
  botui.message.add({
    delay: 5000,
    content: 'I am sorry to hear that X. Please try and restart your device. If your device is not updated, it might help to update it.'
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: "That didn't work either. I still need help.",
          value: ''
        }
      ]
    })
  }).then(function () {
    return botui.message.add({
      delay: 1000,
      content: 'I am sorry to hear that X. Please contact our customer service during weekdays opening hours: 8 - 10 GMT +2 / CEST +8'
    });
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: "Great, thanks...",
          value: 'gameover'
        }
      ]
    })
  })
};

var end = function () {
  botui.message.add({
    delay: 5000,
    content: "Great to hear X! Is there anything else I can be of service with? "
  }).then(() => {
    return botui.action.button({ // let the user perform an action, choose which answer to give
      delay: 1000,
      action: [
        {
          text: "No, I want to go and surf the waves of the internet",
          value: 'victory'
        }
      ]
    })
  })
};