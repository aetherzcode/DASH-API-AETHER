const axios = require('axios')
const cheerio = require('cheerio')

function moddroid(query) {
return new Promise((resolve, reject) => {
axios.get(`https://moddroid.com/?s=${query}`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.col-12.col-md-6.mb-4").each(function(c, d) {
link = $(d).find("a.d-flex.position-relative.archive-post").attr('href');
name = $(d).find("div > h3.h5.font-weight-semibold.text-truncate.text-primary.w-100").text().trim();
img = $(d).find("div.flex-shrink-0.mr-2 > img").attr('src');
desc = $(d).find("div.text-truncate.text-muted > span.align-middle").text();
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

module.exports = moddroid