$(function(){

  var search_list = $("#user-search-result");
  var chatmember_list = $("#chatmember_search_result");

  function appendUsers(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${user.name}">追加</a>
               </div>`
    search_list.append(html);
  }

  function appendChatMember(name , user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value="${user_id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    chatmember_list.append(html);
  }

  function appendErrMsgToHTML (msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }
$(function(){
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function (users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUsers(user);
        });
      }
        else{
          appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
      .fail(function() {
        alert('ユーザーの取得に失敗しました');
      });
    });
    $(function(){
      $(document).on("click", '.user-search-add',function(){
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendChatMember(name, user_id);
      });

      $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});