
// taking user schema in the file (model)
const user = require('../model/user');
const posts = require('../model/post');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {

    try {
        var post_user = await posts.find({ user: req.user._id }).populate('user').sort('-createdAt');;

        return res.render('user', {
            title: 'Profile ',
            user: req.user,
            local: res.locals,
            post: post_user,

        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.random_id = async function (req, res) {
    try {
        var found_user = await user.findById(req.params.id);
        var post_user = await posts.find({ user: found_user.id });
        return res.render('user', {
            title: 'Profile ',
            user: found_user,
            local: res.locals,
            post: post_user
        });

    } catch (err) {
        console.log(err);
    }


}

module.exports.favarate_sport = function (req, res) {
    res.end('<h1> Cricket is my fav game <h1>');
}


module.exports.signup = function (req, res) {
    return res.render('sign_up.ejs', {
        title: 'sign-up page',
        local: res.locals
    })
}

module.exports.signIn = function (req, res) {
    return res.render('sign_in', {
        title: "Codiel| sign-in",
        local: res.locals
    });
}

module.exports.create = async function (req, res) {



    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        var User = await user.findOne({ email: req.body.email });
        console.log(User);
        if (!User) {

            // if user does not exist then create user

            var created_user = await user.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
            });

            return res.redirect('/user/sign-in');

        } else {

            console.log('user exists already');
            return res.redirect('/home');

        }

    } catch (err) {
        console.log(err);
    }


}


module.exports.createSession = function (req, res) {
    req.flash('success', 'You are logged in');

    return res.redirect('/user/profile');
}

module.exports.destroySession = function (req, res) {
    //    created an object flash in request anc corresponding key value
    //   due to version change in express 0.4.0 to 0.6.0 we have to pass callback function

    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        // note req.flash must be called after calling logout function
        req.flash('success', 'You are logged out');
        res.redirect('/');
    });





}


module.exports.update = async function (req, res) {
    if (req.user.id != req.params.id) {
        return res.status(401).send('unauthorised');
        // this will print that this attempt was an unauthorise attempt to change
    }

    // user.findByIdAndUpdate(req.params.id, req.body, function (err, update_user) {
    //     console.log(update_user);
    //     return res.redirect('back');
    // });

    var user_found = await user.findById(req.params.id);
    
    console.log(req.file,' outside ');
    user.uploadedAvatar(req, res, function (err) {
        if (err) {
            console.log('error ', err);
        }

        user_found.name = req.body.name;
        user_found.email = req.body.email;
        console.log(req.file);


        if (req.file) {
            //   if user has avatar than we will delete that in the uploads
            if (user_found.avatar) {

                // unlinkSync function is used to delete things in synchronous manner i.e programme will wait for image to be deleted
                if (fs.existsSync(path.join(__dirname , '..' , user_found.avatar))) {
                   
                    fs.unlinkSync(path.join(__dirname , '..' , user_found.avatar));
                    
                  }
                console.log( user_found.avatar);
            }
            user_found.avatar = user.avatarPath + '/' + req.file.filename;
        }
        user_found.save();
        return res.redirect('back');
    })
}