const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
   let htmlstring = nodemailer.renderTemplate({comment:comment }, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'ankitsankhyan04@gmail.com',
        to: comment.user.email,
        subject:"New Comment Published",
       html: htmlstring
    },(err, info)=>{
        if(err){
            console.log('error is there');
            return;
        }
        console.log('info is' , info);
    }
    
    )
}


