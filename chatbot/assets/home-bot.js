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
        text: 'Sure!',
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
    content: "Awesome! We can show buttons like the one you just pressed."
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
  }).then(function () {
    return botui.message.bot({
      delay: 3000,
      content: 'And this is a delayed vibration'
    });
  }).then(function() {
    setTimeout(function(){ navigator.vibrate(1000) }, 3000);  //vibration set like this is send after a message is sent 
  })
  
  .then(end);
};


var end = function () {
  botui.message.add({
    delay: 5000,
    content: '!(book) [Read the docs](https:///docs.botui.org), see [examples](https:///examples.botui.org) or explore the code on !(github) [GitHub](https://github.com/moinism/botui)'
  });
};