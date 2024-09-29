const axios = require('axios')
const cheerio = require('cheerio')

function apkmody(query) {
return new Promise((resolve, reject) => {
axios.get(`https://apkmody.io/?s=${query}`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.flex-item").each(function(c, d) {
name = $(d).find("div.card-title > h2.truncate").text();
desc = $(d).find("div.card-body > p.card-excerpt.has-small-font-size.truncate").text().trim();
img = $(d).find("div.card-image > img").attr('src');
link = $(d).find("article.card.has-shadow.clickable > a").attr('href');
const Data = {
img: img,
name: name,
desc: desc,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
});
}

module.exports = apkmody