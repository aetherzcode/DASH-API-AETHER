const axios = require('axios')
const cheerio = require('cheerio')

async function mediafire(url) {
	let res = await axios.get(url)
	let get = cheerio.load(res.data)
	let urlFile = get('a#downloadButton').attr('href')
	let sizeFile = get('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('', '')
	let split = urlFile.split('/')
	let nameFile = split[5]
	mime = nameFile.split('.')
	mime = mime[1]
	let result = {
		title: nameFile,
		size: sizeFile,
		url: urlFile
	}
	return result
}

module.exports = mediafire