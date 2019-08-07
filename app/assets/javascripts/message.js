$(function(){
  function buildHTML(message) {
    var image = message.is_image_present ? `<img src='${message.image.url}'> ` : ''

    var html = `<div class="message" data-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');   	
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html =buildHTML(message);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error')
     
    })
      return false;
    })
    
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      var href = 'api/messages#index {:format=>"json"}' 
     $.ajax({
       url: href,
       type: 'get',
       dataType: 'json',
       data: {id: last_message_id }
     })
     .done(function (messages) {
       var insertHTML ='';
           messages.forEach(function(message){
            insertHTML = buildHTML(message);
             $('.messages').append(insertHTML);
             $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
       });
     })
     .fail(function () {    
        alert('メッセージの取得に失敗しました');
     });
    };
   }
   setInterval(reloadMessages, 5000);
  });

