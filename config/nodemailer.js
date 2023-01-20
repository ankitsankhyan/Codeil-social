
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs')
// defines user who send mail and service which is to be used
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.google.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ankitsankhyan04@gmail.com', // generated ethereal user
      pass: 'maqkhykbmgdmodfe', // generated ethereal password
    },
  });

// this function will render whole HTML to give a style to sent thing
  let renderTemplate = (data, relativepath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativepath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err);
        return;}
        mailHtml = template;
        }
    
    )
    return mailHtml
  }

  module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate
  }