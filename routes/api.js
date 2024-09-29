require('../controllers/settings');
require('../controllers/message');

__path = process.cwd();

const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const fetch = require('node-fetch');
const Frieren = require("@xct007/frieren-scraper");
const { diffusion } = require("@xct007/frieren-scraper");
const { downloads } = require('scraper-jsc')
const { search } = require('scraper-jsc')
const { anime } = require('scraper-jsc')
const { news } = require('scraper-jsc')
const { stalk } = require('scraper-jsc')

// Lib

const {
    fetchJson,
    getBuffer
} = require('../lib/function');


// Database
const {
    limitMin,
    isLimit,
    checkKey
} = require('../database/function');

// Scrape data
const scrape = require('../scrape/index');
// API Key
const keyfree = key_free;
const keypremium = key_premium;

// Features
//Anime
router.get('/anime/mangatoons', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.mangatoons(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
 limitMin(apikey);
})
router.get('/anime/nhentai-get', async (req, res, next) => {
  const id = req.query.id
	if (!id) return res.json('Masukan IDnya')
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
 scrape.others.xyro.nhentaiScraper(id).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/anime/nhentai-search', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
 scrape.others.xyro.nhentaisearch(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/anime/nhentai-detail', async (req, res, next) => {
  const url = req.query.url
	if (!url) return res.json(msg.paramurl)
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
 scrape.others.xyro.nhentai(url).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/anime/nhentai-getimg', async (req, res, next) => {
  const url = req.query.url
	if (!url) return res.json(msg.paramurl)
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
 scrape.others.xyro.nhgetimg(url).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/anime/mal-anime', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    anime.MalSearchAnime(query).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/mal-manga', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    anime.MalSearchManga(query).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/hentai', async (req, res, next) => {
const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/random/hentai`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
})
router.get('/anime/nekopoi', async (req, res, next) => {
const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/random/nekopoi`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
})
router.get('/anime/character', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/myanimelist/character?search=${query}`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-search', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-detail', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/komiku-search', async (req, res, next) => {
    const query = req.query.q
	  if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/komiku-detail', async (req, res, next) => {
    const url = req.query.url
	  if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/komiku-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
 router.get('/anime/doujin-search', async (req, res, next) => {
    const query = req.query.q
	  if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/doujin-detail', async (req, res, next) => {
    const url = req.query.url
	  if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/doujin-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})  
//Sfw
router.get('/sfw/akira', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/akira.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/anna', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/anna.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/asuna', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/asuna.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ayanokouji', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ayanokouji.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ayuzawa', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ayuzawa.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/bocchi', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/bocchi.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/chisato', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/chisato.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/cosplay', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/cosplay.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/elaina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/elaina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ikuyo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ikuyo.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaela', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaela.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaguya', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaguya.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaori', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaori.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kobo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kobo.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kotori', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kotori.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/loli', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/loli.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/miku', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/miku.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/neko', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/neko.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/rias', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/rias.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/sakura', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/sakura.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/sasuke', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/sasuke.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shinka', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shinka.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shizuka', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shizuka.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shota', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shota.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/tekina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/tekina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/waifu', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/waifu.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/yotsuba', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/yotsuba.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/yumeko', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/yumeko.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
//Others
router.get('/others/stalkgithub', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    stalk.Github(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/others/githubrepo', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    stalk.GithubRepo(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})

router.get('/others/heroml', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/game/detail-hero?search=${query}`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
})
router.get('/others/chatgpt', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
    scrape.others.chatgpt(query)
	.then(data => {
    let anu = data.text
		let result = anu
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/others/chargi', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.others.chargi(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/others/toanime', async(req, res, next) => {
	const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
	const url = req.query.url
	if(!url) return res.json(msg.paramurl)

	let result = `https://api-xcoders.site/api/maker/toonify?url=${url}&id=2&apikey=Frieren`
	data = await fetch(result).then(v => v.buffer())
	await fs.writeFileSync(__path + '/tmp/animeh.png', data)
	res.sendFile(__path + '/tmp/animeh.png')
})
router.get('/others/stabledif', async(req, res, next) => {
	const prompt = req.query.prompt
  if (!prompt) return res.json('Masukan Promptnya')
  const seed = req.query.seed
  if (!seed) return res.json('Masukan Seed')
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })

	const Obj = await diffusion.stable(prompt, seed)
	const buffer = Buffer.from(Obj.base64Img, "base64")
	res.set({'Content-Type': 'image/png'})
	res.send(buffer)
})
// Downloader
router.get('/downloader/spotify', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
    scrape.downloader.download.spotifyDown(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/downloader/xnxx', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
    scrape.downloader.download.xnxxDownloader(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/downloader/youtube-play', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.play(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})

router.get('/downloader/youtube-play-audio', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.playaudio(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-play-video', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.playvideo(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-audio', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.audio(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-video', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.video(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/tiktok', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.tiktok(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/facebook', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.facebook(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/spotify', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    alya = await fetchJson(`https://api.alyachan.my.id/api/spotifydl?url=${url}`)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/twitter', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    downloads.Twitter(url)
	.then(data => {
		let result = data.result;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/mediafire', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.mediafire(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/sfilemobi', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.sfilemobi(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/soundcloud', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.soundcloud(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

// Asupan
router.get('/asupan/video/random', async (req, res, next) => {
    const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
	
	const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/video/random.json'));
    const rv = data[Math.floor(Math.random() * data.length)];
    result = await fetch(rv).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', result)
    res.sendFile(__path +'/tmp/asupan.mp4')
})

router.get('/asupan/image/random', async (req, res, next) => {
    const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
	let data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/random.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
})

router.get('/asupan/image/china', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/china.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/indonesia', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/indonesia.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/japan', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/japan.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/korean', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/korean.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/malaysia', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/malaysia.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/thailand', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/thailand.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/vietnam', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/vietnam.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

// Search
router.get('/search/xnxx', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
    scrape.downloader.download.xnxxSearch(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/search/soundcloud', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.SoundCloude(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/wattpad', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.WattPad(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/jadwaltv', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.JadwalTV(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/youtube', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    //if (!keypremium.includes(apikey)) return res.render('not-apikey-premium', { layout: 'not-apikey-premium' })
    
    scrape.search.youtube(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/joox', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.joox(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/sfilemobi', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.sfilemobi(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/moddroid', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.moddroid(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/apkmody', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.apkmody(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/happymod', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.happymod(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/group-whatsapp', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.groupwa(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/sticker', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.sticker(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/wallpaper', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.wallpaper(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/ringtone', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.ringtone(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/pinterest', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.pinterest(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/wikimedia', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.wikimedia(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/playstore', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.PlayStore(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/bukalapak', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.BukaLapak(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/jadwalbola', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.JadwalSepakbola().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/kodepos', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.KodePos(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/lirik', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.Lirik(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/steam', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.Steam(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/steam-detail', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.SteamDetail(url).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
// News
router.get('/news/gempa', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.Gempa().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/gempa2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.Gempa2().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-global', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasGlobal().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-news', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasNews().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-populer', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasTerpopuler().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/rumah-keadilan', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.RumahKeadilan().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/tixid', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.TixID().then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
// Text Pro
router.get('/textpro/hologram-color', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/hologram-color-3d-text-effect-generator-online-1117.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/luxury-crystal', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-luxury-3d-crystal-text-effects-online-1116.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/metallic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-metallic-text-with-details-online-1108.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/grunge-metallic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/grunge-metallic-3d-text-effect-online-1115.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/liquid-metal', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-liquid-metal-text-effect-1112.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/multicolor-paint', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-multicolor-paint-text-effect-online-1114.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/pink-gold', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-pink-soft-gold-text-effect-online-1113.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/burger', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-burger-3d-text-effect-1111.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/cage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-cage-text-effect-online-1110.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/comic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-comic-text-effects-online-1091.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/neon-light', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/neon-light-text-effect-online-882.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/neon-light-2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-neon-light-text-effect-online-1028.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/gradient-neon-light', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/orange-juice', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/valentine', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/pencil', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-sketch-text-effect-online-1044.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/berry', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-berry-text-effect-online-free-1033.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/blackpink', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-blackpink-logo-style-online-1001.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/bear-logo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/christmas', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/3d-christmas-text-effect-by-name-1055.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/thunder', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/online-thunder-text-effect-generator-1031.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/box-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/3d-box-text-effect-online-880.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/green-horor', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-green-horror-style-text-effect-online-1036.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/magma-hot', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/chocolate-cake-text-effect-890.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/strawberry', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/strawberry-text-effect-online-889.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch-2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-a-glitch-text-effect-online-free-1026.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch-tiktok', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/video-game-classic-8-bit-text-effect-1037.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-logo-style-marvel-studios-online-971.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-ninja-logo-online-935.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

// Photo Oxy
router.get('/photooxy/flaming', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/night-sky', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/shadow-sky', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/burn-paper', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-grass', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-watter', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-white', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/3d-text-effect-under-white-cube-217.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/coffe-cup', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/neon-glow', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/rainbow-shine', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/army-camouflage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/army-camouflage-fabric-text-effect-221.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/glow-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/create-a-3d-glowing-text-effect-220.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/candy-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/honey-text-effect-218.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/vintage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/other-design/vintage-text-style-219.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/gradient-avatar', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/gradient-avatar-text-effect-207.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/fur-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/fur-text-effect-generator-198.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/striking', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/other-design/striking-3d-text-effect-online-187.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

// Canvas
router.get('/canvas/welcome', async (req, res, next) => {
	const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
	const name = req.query.name
	if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
	const gpname = req.query.gpname
	if (!gpname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
	const member = req.query.member
	if (!member) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
	const pp = req.query.pp
	if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
	const bg = req.query.bg
	if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
	
	const baseURL = JSON.parse(fs.readFileSync(__path + '/scrape/data/canvas/welcome/1.json'))
	let result = {
		url: `${baseURL}?name=${name}&gpname=${gpname}&member=${member}&pp=${pp}&bg=${bg}`,
		method: 'GET',
		encoding: null
	};
	
	request(result, function(error, response, body) {
		res.set('Content-Type', 'image/png')
		res.send(body)
	})
	limitMin(apikey)
})
router.get('/canvas/goodbye', async (req, res, next) => {
	const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
const name = req.query.name
	if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
	const gpname = req.query.gpname
	if (!gpname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
	const member = req.query.member
	if (!member) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
	const pp = req.query.pp
	if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
	const bg = req.query.bg
	if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
	
	const baseURL = JSON.parse(fs.readFileSync(__path + '/scrape/data/canvas/goodbye/1.json'))
	let result = {
		url: `${baseURL}?name=${name}&gpname=${gpname}&member=${member}&pp=${pp}&bg=${bg}`,
		method: 'GET',
		encoding: null
	};
	
	request(result, function(error, response, body) {
		res.set('Content-Type', 'image/png')
		res.send(body)
	})
	limitMin(apikey)
})
router.get('/maker/ttp', async(req, res, next) => {
	const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
	const text = req.query.text
	if(!text) return res.json(msg.paramtext)

	const baseURL = JSON.parse(fs.readFileSync(__path + '/scrape/data/maker/ttp/2.json'))
	let result = `${baseURL}?text=${text}`
	data = await fetch(result).then(v => v.buffer())
	await fs.writeFileSync(__path + '/tmp/ttp.png', data)
	res.sendFile(__path + '/tmp/ttp.png')
	limitMin(apikey)
})

module.exports = router