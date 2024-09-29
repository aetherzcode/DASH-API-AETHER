const axios = require('axios')
const cheerio = require('cheerio')

function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
		const random = [1,2,3,4,5,6,7,8,9,10]
		let randomgambar = random[Math.floor(Math.random() * random.length)]
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${randomgambar}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image:  $(b).find('picture > source:nth-child(2)').attr('srcset')
                })
            })
	
            resolve(hasil)
		})
		.catch(reject)
		})
}

module.exports = wallpaper