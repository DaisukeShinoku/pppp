import consumer from "./consumer"

// $(function() {}; で囲むことでレンダリング後に実行される
// レンダリング前に実行されると $('#messages').data('room_id') が取得できない
$(function() {
  const chatChannel = consumer.subscriptions.create({ channel: 'RoomChannel', room: $('#messages').data('room_id') }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      //'1' == 1 // true
      //'1' === 1 // false
      $('#messages').append(data.message);
      let $last_message = $('.message').last();
      //console.log($last_message)
      //console.log($('#messages'))
      //console.log($('#messages').data('current_user_id'), $last_message.data('message-user-id'))
      if ($('#messages').data('current_user_id') == $last_message.data('message-user-id')) {
        // self message
        $last_message.find('div').removeClass('right-message')
        $last_message.find('div').addClass('left-message')
      } else {
        // other message
        $last_message.find('div').removeClass('left-message')
        $last_message.find('div').addClass('right-message')
      }
      //return $('#messages').append(data['message']);
    },

    speak: function(message, confirm_user) {
      console.log('ここが呼ばれました')
      return this.perform('speak', {
        message: message, confirm_user: confirm_user
      });
    }
  });

  $(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
    console.log(event.target.value)
    if (event.keyCode === 13) {
      const confirm_user = $('#messages').data('current_user_id')
      chatChannel.speak(event.target.value, confirm_user);
      event.target.value = '';
      return event.preventDefault();
    }
  });
});