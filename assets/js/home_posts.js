
{

  let createPost = function () {
    let newPostform = $('#new-post-form');

    newPostform.submit(function (e) {
      e.preventDefault();
      // note .submit is activated when we have clicked only
      $.ajax({
        type: 'post',
        url: '/post/create',
        data: newPostform.serialize(),// data will be serialized
        success: function (data) {
          var c = newpostDom(data.data.post);
          console.log(c);
          $(' ul').prepend(c);

          // deletepost($(' .delete-post-button', c));
        },
        error: function (error) {
          console.log(error.responseText);
        }

      }

      )
    })


  }
  let newpostDom = function (post) {
    return $(`<li>


        <div>
          ${post.content}
            <br>
            <small>
              ${post.user}
            </small>
          
              <small>
                <a href="/post/destroy/${post.id} ">delete</a>
              </small>
            
  
        </div>
  
  
      </li>
      <div class="post-comments">
      Add comment
      <!-- form for adding commnent  -->
   
        <form action="comments/create" method="post">
          <input type="text" name="content" placeholder="type here to add comment...."><br>
          <input type="hidden" name="post" value= ${post.id}  >
          <input type="submit" value="Add comment">

        </form>
      `)
    // return $('<h1> added </h1>');
  }

  var anchor = $('.delete_post');




  // deleting a post
var json_data;
  let deletepost = function (deletelink) {
    $(deletelink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deletelink).prop('href'),
        success: function (data) {
          json_data = data;
         console.log(data, 'data is present');
         $(`#${data.data.post_id}`).remove();
         alert('deleted');
        }, error: function (error) {
          console.log(error.responseText);
        }
      })
    });

  }



  for (let i = 0; i < anchor.length; i++) {
    deletepost(anchor[i]);
  }

  createPost();
  // deleting comments


}
