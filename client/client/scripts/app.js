var app = {

  // username: document.URL.substr(document.URL.indexOf('username=') + 9),
  username: 'IanAndNick',
  server: 'http://127.0.0.1:8080/classes/chatterbox',
  currentRoom: undefined,
  rooms: [],
  friends: [],


  init: function() {
    this.fetch(app.iterateRooms, app);
  },


  fetch: function(callback, context) {
    $.ajax({
      url: this.server,
      type: 'GET',
      /*data: { order: "-createdAt",
              limit: 100
            },*/
      contentType: 'application/json',
      success: function (data) {
        callback.call(context, data.results);
        console.log('GET completed');
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },


  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('POST completed');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },


  setCurrentRoom: function() {
    this.currentRoom = $('#roomSelect').val();
  },


  clearMessages: function() {
    $('#chats').html('');
  },


  iterateMessages: function(messages) {
    this.clearMessages();
    this.setCurrentRoom();

    // if a room is selected, only display messages from that room
    if (this.currentRoom) {
      messages = _.where(messages, {roomname: this.currentRoom});
    }

    // iterate through messages and display them
    for (var i = 0; i < messages.length; i++) {
      this.displayMessage(messages[i]);
    }

    // add event listeners to the newly added messages
    $(".username").on('click', function() {
      var newFriend = $(this).text();
      if (app.friends.indexOf(newFriend) === -1) {
        app.friends.push(newFriend);
      }
    });
  },


  displayMessage: function(message) {
    // escape message properties
    var user = message.username;
    var text = message.text;
    var roomname = message.roomname;
    if (user) {
      user = this.escapeStr(user).slice(0,100);
    }
    if (text) {
      text = this.escapeStr(text).slice(0,500);
    }
    if (roomname) {
      roomname = this.escapeStr(roomname);
    }

    // identify the user's friends
    if (this.friends.indexOf(user) !== -1) {
      user = "<u>" + user + "</u>";
    }

    // display message
    var $message = message.roomname + "<div class='chat'><span class='username'>" + user + "</span>: " + text + "<br>" + "<span class='date'>" + new Date(message.createdAt) + "</span></div>";
    $('#chats').append($message);
  },


  escapeStr: function(str) {
    // escape harmful characters
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/'/g, '&quot;').replace(/!/g, '&#33;').replace(/%/g, '&#37;').replace(/\(/g, '&#40;').replace(/\)/g, '&#41;').replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/=/g, '&#61;');
  },


  iterateRooms: function(messages) {
    // keep unique room names
    var uniqRooms = _.uniq(_.pluck(messages, 'roomname'));
    uniqRooms.sort();

    // make the first selection option blank
    $('#roomSelect').html('<option></option>');

    // iterate and display room names
    for (var i = 0; i < uniqRooms.length; i++) {
      this.displayRooms(uniqRooms[i]);
    }
  },


  displayRooms: function(room) {
    if (room) {
      room = this.escapeStr(room);
      var $room = "<option>" + room + "</option>";
      $('#roomSelect').append($room);
      this.rooms.push(room);
    }
  }

};


$(function() {

  app.init();

  $("#fetch").on('click', function(event) {
    event.preventDefault();

    app.fetch(app.iterateMessages, app);
    console.log('fetch completed');
  });

  $("#refreshrooms").on('click', function(event) {
    event.preventDefault();

    app.fetch(app.iterateRooms, app);
    console.log('get rooms completed');
  });

  $("#createRoom").on('click', function(event) {
    event.preventDefault();

    app.currentRoom = prompt("Create a new room name");
    if (app.rooms.indexOf(app.currentRoom) !== -1) {
      app.fetch(app.iterateMessages, app);
    } else {
      app.displayRooms(app.currentRoom);
      app.clearMessages();
    }
    $('#roomSelect').val(app.currentRoom);
    console.log('create room completed');
  });

  $("#send").on('click', function(event) {
    event.preventDefault();

    var $text = $("#message").val();
    var messageObj = {
      username: app.username,
      text: $text,
      roomname: app.currentRoom
    };
    app.send(messageObj);
    $("#message").val('');
    app.fetch(app.iterateMessages, app);
    console.log('send completed');
  });

});
