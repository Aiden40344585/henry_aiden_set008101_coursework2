var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET User page and messages. C.READ.U.D */
router.get('/userlist/:user_ID', function(req, res) {
  
  // set DB 
  var db = req.db;
  // set DB collection
  var collection = db.get('user_data');

  // find user data
  collection.find({user: user_ID,},
    function(e,docs){
      var parsedArray = Object.values(docs[0]);
      
      // respond with userlist.ejs and these variables
      res.render('userlist', {
        "user" : parsedArray[1],
        "received_from" : parsedArray[3],
        "in_message" : parsedArray[4],
        "sent_to" : parsedArray[5],
        "out_message" : parsedArray[6]
        });
  });
});

/* POST User messages. CREATE.R.UPDATE.D */
router.post('/messages', function(req, res){
  // set DB
  var db = req.db;
  var collection = db.get('user_data');

  // find user and message contents
  var toUser = req.body.to_user;
  var mess = req.body.to_message;
  
  // strip white space from message
  var toMess = mess.replace(/ /g,'')
  

  // find recipient entry and update received messages on DB
  collection.update({"user": toUser},
  {$push: {"from": user_ID, "received_message": toMess}},{multi:true}
  );
  console.log('Updated Recipient DB ')

  // find user entry and update sent messages on DB
  collection.update({"user": user_ID},
  {$push: {"to": toUser, "sent_message": toMess}}
  );
  console.log('Updated User DB ')
})

/* POST to log in check for user and to add new User to DB. CREATE.R.U.D */
router.post('/adduser', function(req, res) {

  // set DB variable.
  var db = req.db;

  // get form values.
  var userName = req.body.username;
  var userPwd = req.body.userpwd;

  // set collection.
  var collection = db.get('user_data');

  // Finding if user name is part of DB.
  collection.findOne({user: userName}, function (err, result){
    if (err) throw err;
    
    // check if the username matches the password
    if (result != null && result.pwd == userPwd)
    {
      console.log('Correct username and password: ' + userName + ' ' + userPwd)
      user_ID = userName;
      //console.log(path.join(__dirname, '../views', 'userlist.ejs'));
      res.redirect('userlist/'+ user_ID);
    }
    
    // if password does not match username
    else if (result != null && result.pwd != userPwd)
    {
      console.log('Incorrect password: ' + result.pwd + ' ' + userPwd)
      res.render()
    }
    else
    {
    console.log('Adding user to DB: ' + userName + ', with password: ' + userPwd)
    
    // Creating username, password and array for sent /recieved
    // messages to Database
    user_ID = userName;
    collection.insert({
    "user" : userName,
    "pwd" : userPwd,
    "from": [],
    "received_message" : [],
    "to" : [],
    "sent_message": []
    }, function (err, doc) {
    if (err) {
        // If failed return error
        res.send("Failed to write to database.");
    }
    else {
        // And forward to success page
        res.redirect("userlist/':user_ID");
    }
});
    }
  }) 
});

/* Delete messages. C.R.U.DELETE */
router.post('/delete/received', function(req, res){

  // set DB variable.
  var db = req.db;

  // get form values user, message & iteration
  var recName = req.body.received_from_rec;
  var userMess = req.body.received_from_mes;
  var iter = req.body.iter_value;

  // set collection.
  var collection = db.get('user_data');
  
  // Finding if user, finding from and received from is part of DB.
  console.log(recName)
  console.log(userMess)
  console.log(user_ID)
  console.log(iter)
  
  collection.findOneAndUpdate({"user": user_ID},
  {$pull: {"from": recName, "received_message": userMess}},{multi:true}
  );
  console.log('finished')
})

/* Delete messages. C.R.U.DELETE */
router.post('/delete/sent', function(req, res){

  // set DB variable.
  var db = req.db;

  // get form values.
  var userName = req.body.sent_to_rec;
  var userMess = req.body.sent_to_mes;

  // set collection.
  var collection = db.get('user_data');
  console.log(userName)
  console.log(userMess)

  collection.update({"user": user_ID},
  {$pull: {"to": userName, "sent_message": userMess}},{multi:true}
  );
})

module.exports = router;
