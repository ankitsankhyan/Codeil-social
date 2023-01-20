const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
        from:'ankitsankhyan04@gmail.com',
        to: comment.user.email,
        subject:"New Comment Published",
       html: '<h1> Yup your comment is published </h1>'
    },(err, info)=>{
        if(err){
            console.log('error is there');
        }
        console.log('info is' , info);
    }
    
    )
}