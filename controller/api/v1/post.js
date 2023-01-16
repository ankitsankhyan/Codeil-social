const { populate, findById } = require('../../../model/post');
let Post = require('../../../model/post');
let Comments = require('../../../model/comment');
module.exports.index =async function(req, res){

// can we done in 3 ways

    // return res.json({
    //     data:{
    //         name: 'ankit hu yaar'
    //     },
    //     message: 'from iiitm gwalior'
    // }
        
    // )


    // return res.status(300).json({
    //     data:{
    //         name: 'ankit hu yaar'
    //     },
    //     message: 'from iiitm gwalior'
    // });

// sends data from this json file

    // return res.json(200,{
    //     data:{
    //         name:'ankit hu yaar'
    //     },
    //     message:'from iiit gwalior' 
    // } );

    var post =await Post.find({}).populate('user').populate({
        // this helps in populating comments
       
        path: 'comments',
    
    // this is used to populate user inside comments
      
    populate: {
        path: 'user',
       
       }
    //    populate: {
    //     path:'post'
    //    }
    }
        
       
    )

    return res.status(200).json({
        posts:  post
    }
    
    )
}

module.exports.destroy = async function(req, res){

   var post = await Post.findById(req.params.id);
   console.log(post);

    post.comments.forEach((e) => {
             Comments.findByIdAndDelete(e, function(err){
                console.log(err);
             })
    })

    return res.status(200).json({
        data: post
    });

}