const { User, Utils } = require('./schema');
const toMs = require('ms');
const { limitCount, limitPremium } = require('../controllers/settings');
const e = require('connect-flash');
const tokens = 'KeyPrinz'
module.exports.tokens = tokens

    async function addPremium(username, customKey, expired) {
        User.updateOne({username: username}, {apikey: customKey, premium: Date.now() + toMs(expired), limit: limitPremium}, function (err, res) {
            if (err) throw err;
        })
    }
    module.exports.addPremium = addPremium

    async function ExpiredTime() {
        let users = await User.find({});
        users.forEach(async(data) => {
            let { premium, defaultKey, username } = data
            if (!premium || premium === null) return
            if (Date.now() >= premium) {
                User.updateOne({username: username}, {apikey: defaultKey, premium: null, limit: limitCount}, function (err, res) {
                    if (err) throw err;
                    console.log(`Masa Premium ${username} sudah habis`)
                })
            }
        })
    }
    module.exports.ExpiredTime = ExpiredTime

    async function deletePremium(username) {
        let users = await User.findOne({username: username});
        let key = users.defaultKey
        User.updateOne({username: username}, {apikey: key, premium: null, limit: limitCount}, function (err, res) {
            if (err) throw err;
        })
    }
    module.exports.deletePremium = deletePremium

    async function checkPremium(username) {
        let users = await User.findOne({username: username});
        if (users.premium === null) {
            return false;
        } else {
            return true;
        };
    };
    module.exports.checkPremium = checkPremium;

    async function changeKey(username, key) {
        User.updateOne({username: username}, {apikey: key}, function (err, res) {
            if (err) throw err;
        });
    }
    module.exports.changeKey = changeKey

    async function resetOneLimit(username) {
        let users = await User.findOne({username: username});
        if (users !== null) {
            User.updateOne({username: username}, {limit: limitCount}, function (err, res) {
                if (err) throw err;
            });
        }
    }
    module.exports.resetOneLimit = resetOneLimit

    /* UTILS, TOTAL REQ ETC */

    async function getTotalUser() {
        let db = await User.find({});
        return db.length
    }
    module.exports.getTotalUser = getTotalUser

    async function addUtil() {
        let db = await Utils.find({});
        if (db.length == 0) { 
            let obj = { total: 0, today: 0, visitor: 1, util: 'util'}
            Utils.create(obj)
            console.log(`[INFO] Utils Created!`)
        }
    }
    module.exports.addUtil = addUtil

    async function getTotalReq() {
        let db = await Utils.find({});
        return db[0].total
    }
    module.exports.getTotalReq = getTotalReq

    async function getTodayReq() {
        let db = await Utils.find({})
        return db[0].today
    }
    module.exports.getTodayReq = getTodayReq

    async function getVisitor() {
        let db = await Utils.find({})
        return db[0].visitor
    }
    module.exports.getVisitor = getVisitor

    async function addRequest() {
        let db = await Utils.find({})
        let addOneToday = db[0].today += 1
        let addOneTotal = db[0].total += 1
        Utils.updateOne({util: 'util'}, {total: addOneTotal, today: addOneToday}, (err, res) => {
            if (err) throw err
        })
    }
    module.exports.addRequest = addRequest

    async function addVisitor() {
        let db = await Utils.find({})
        let addOne = db[0].visitor += 1
        Utils.updateOne({util: 'util'}, {visitor: addOne}, (err, res) => {
            if (err) throw err
        })
    }
    module.exports.addVisitor = addVisitor

    async function resetTodayReq() {
        let db = await Utils.find({});
        let now = db[0].today
        let zero = db[0].today -= now
        Utils.updateOne({util: 'util'}, {today: zero}, (err, res) => {
            if (err) throw err
        })
    }
    module.exports.resetTodayReq = resetTodayReq