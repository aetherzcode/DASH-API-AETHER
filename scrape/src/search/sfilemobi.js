const axios = require('axios')
const cheerio = require('cheerio')

function parseFileSize(size) {
    return parseFloat(size) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}

function sfilemobi(query, page = 1) {
    return new Promise(async(resolve, reject) => {
		const html = await axios.get(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
		const $ = cheerio.load(html.data);
		const results = [];
		$('div > div > div > div.list').each((_, el) => {
			var _a, _b;
			const $el = $(el);
			const url = $el.find('a').attr('href');
			const filename = $el.find('a').text();
			const icon = $el.find('img').attr('src');
			const type = (_a = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _a === void 0 ? void 0 : _a[1];
			const filesizeH = (_b = /\((.*?)\)/.exec($el.text())) === null || _b === void 0 ? void 0 : _b[1];
			const filesize = filesizeH && (0, parseFileSize)(filesizeH);
			if (filename && url) {
				results.push({
					url,
					filename,
					icon: icon,
					type: type,
					filesizeH: filesizeH,
					filesize: filesize
				});
			}
		});
		if (!results.length) {
			resolve()
		}
		return  resolve(results)
	})
}

module.exports = sfilemobi