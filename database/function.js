require('../controllers/settings');
const {
   User
} = require('./schema');

async function addUser(username, email, password, apikey) {
   let obj = {
      username,
      email,
      password,
      apikey,
      defaultKey: apikey,
      premium: false,
      limit: limit_free
   };
   User.create(obj);
}
module.exports.addUser = addUser

async function limitMin(apikey) {
   let key = await User.findOne({
     apikey: apikey
   });
  let { premium } = key
  let mun = key.limit + 1
   let min = key.limit - 1;
          if (premium === null) {
        return User.updateOne({apikey: apikey}, {limit: mun}, function (err, res) {
        if (err) throw err;
                })   
            } else {
        return User.updateOne({apikey: apikey}, {limit: min}, function (err, res) {
        if (err) throw err;
                })
            }
        }
module.exports.limitMin = limitMin

async function checkEmail(email){
   let x = await User.findOne({
      email: email
   });
   if (x !== null) {
      return x.email;
   } else {
      return false;
   }
}

module.exports.checkEmail = checkEmail;

async function checkUsername(username) {
   let users = await User.findOne({
      username: username
   });
   if (users !== null) {
      return users.username;
   } else {
      return false;
   }
}
module.exports.checkUsername = checkUsername;

async function checkKey(apikey) {
   let db = await User.findOne({
      apikey: apikey
   });
   if (db === null) {
      return false;
   } else {
      return db.apikey;
   }
}
module.exports.checkKey = checkKey;

async function resetLimit() {
        let users = await User.find({});
        users.forEach(async(data) => {
            let { username } = data
            if (username !== null) {
                return User.updateOne({username: username}, {limit: limit_free}, function (err, res) {
                    if (err) throw err;
                });
            } 
        })
    }
module.exports.resetLimit = resetLimit;

async function isLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }
module.exports.isLimit = isLimit;

async function checkLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        return key.limit;
    }
module.exports.checkLimit = checkLimit;

async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username, limit:users.limit};
    }
module.exports.getApikey = getApikey;