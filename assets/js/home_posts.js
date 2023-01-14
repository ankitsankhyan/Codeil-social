
{
var temp ;
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
          console.log(data.data.post);
          temp = data.data.post;
          var c = newpostDom(data.data.post);
           console.log(data);
          $(' ul').prepend(c);
        
          // deletepost($(' .delete-post-button', c));
          
          new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        }

      }

      )
    })


  }
  let newpostDom = function (post) {
    return $(`<li  id = "${post._id}">


        <div>
          ${post.content}
            <br>
          
          
              <small>
                <a href="/post/destroy/${post._id}" class="delete_post">delete</a>
              </small>
            
  
        </div>
  
  
     <br>
      <div class="post-comments">
      Add comment
      <!-- form for adding commnent  -->
   
        <form action="comments/create" method="post">
          <input type="text" name="content" placeholder="type here to add comment...."><br>
          <input type="hidden" name="post" value= ${post._id}  >
          <input type="submit" value="Add comment">

        </form>
        </li>
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
         
         new Noty({
          theme: 'relax',
          text: "Post Deleted!",
          type: 'success',
          layout: 'topRight',
          timeout: 1500
          
      }).show();

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


  var image = document.getElementById('upload-file');
  console.log('hello');
  alert('hello');

}
