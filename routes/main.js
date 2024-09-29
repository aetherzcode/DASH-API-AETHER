require('../controllers/settings');
require('../controllers/message');

const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

// Lib
const { isAuthenticated } = require('../lib/auth');
const { connectToMongoDb } = require('../database/connect');
const {
	getApikey,
    limitMin,
    isLimit,
    checkKey,
    checkKeyPrem,
    checkLimit
} = require('../database/function');

const keyfree = key_free;
const keypremium = key_premium;

router.get('/', (req, res) => {
    res.render('home', {
    layout: 'home'
  });
})

router.get('/get-started', (req, res) => {
    res.render('get-started', {
    layout: 'get-started'
  });
})

router.get('/dashboard', isAuthenticated, async(req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey, username, limit } = getkey
  res.render('index', {
    apikey,
    username,
    limit,
    layout: 'index'
  });
})

router.get('/profile', isAuthenticated, async(req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('profile', {
    apikey,
    layout: 'profile'
  });
})

router.get('/pricing', isAuthenticated, async(req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('pricing', {
    apikey,
    layout: 'pricing'
  });
})

router.get('/settings', isAuthenticated, async(req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('settings', {
    apikey,
    layout: 'settings'
  });
})

router.get('/report-bug', isAuthenticated, (req, res) => {
    res.render('report-bug', {
    layout: 'report-bug'
  });
})

// Check Keys
router.get('/checkapikeyfree', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	let check = await checkKey(apikey);
	if (!check) return res.json({status: "Error", code: 404, message: "Error not Found."})
	const limit = await checkLimit(apikey)
  if (!limit) return res.json({status: "Error", code: 404, message: "Error not Found."})
	var keys = apikey
	if (keys) {
	json = JSON.stringify({
		status: "Success",
		code: 200,
		author: author,
		result: {
         apikey: keys,
         limit: limit
		},
	})
} else {
	json = JSON.stringify({
		status: "Error",
    	code: 404,
    	message: "Error not Found."
	})
}
res.send(JSON.parse(json))
})

// Check Keys
router.get('/checkapikeypremium', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (keypremium.includes(apikey))
	
	var keys = apikey
	if (keys) {
	json = JSON.stringify({
		status: "Success",
		code: 200,
		author: author,
		result: {
         apikey: keys
		},
	})
} else {
	json = JSON.stringify({
		status: "Error",
    	code: 404,
    	message: "Error not Found."
	})
}
res.send(JSON.parse(json))
})

module.exports = router