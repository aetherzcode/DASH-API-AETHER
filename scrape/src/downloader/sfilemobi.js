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

function sfilemobi(url) {
    return new Promise(async(resolve, reject) => {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		if (!/sfile\.mobi/i.test(url)) return resolve()	
		const html = await axios.get(url).catch(function (error) {})
		if (!html) {
			resolve();
		}else{
			const $ = cheerio.load(html.data);
			const $k = (_a = /var z = (.*?);/i.exec($.html())) === null || _a === void 0 ? void 0 : _a[1];
			const urlPage = (((_d = (((_b = /var db = "(.*?)"/i.exec($.html())) === null || _b === void 0 ? void 0 : _b[1]) || ((_c = /var sf = "(.*?)"/i.exec($.html())) === null || _c === void 0 ? void 0 : _c[1]))) === null || _d === void 0 ? void 0 : _d.replace(/\\(\\)?/gi, '')) ||
				$('#download').attr('href')) + `&k=${$k}`;
			const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text();
			const icon = $('div.intro-container > img').attr('src');
			const type = (_e = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _e === void 0 ? void 0 : _e[1];
			const $list = $('div.list');
			const mimetype = (_f = $list.eq(0).text().split('-')[1]) === null || _f === void 0 ? void 0 : _f.trim();
			const aploud = (_g = $list.eq(2).text().split('Uploaded:')[1]) === null || _g === void 0 ? void 0 : _g.trim();
			const $aploud = $list.eq(1).find('a');
			const aploudby = $aploud.eq(0).text();
			const aploudbyUrl = $aploud.eq(0).attr('href');
			const aploudon = $aploud.eq(1).text();
			const aploudonUrl = $aploud.eq(1).attr('href');
			const decs = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(1) > div:nth-child(6) ').text()
			const downloads = parseInt((_h = $list.eq(3).text().split('Downloads:')[1]) === null || _h === void 0 ? void 0 : _h.trim());
			const filesizeH = (_j = /\((.*?)\)/i.exec($('#download').text())) === null || _j === void 0 ? void 0 : _j[1];
			const filesize = filesizeH && (0, parseFileSize)(filesizeH);
			const results = {
				url: urlPage,
				decs,
				filename,
				icon,
				type,
				mimetype,
				upload_date: aploud,
				upload_by: aploudby,
				upload_byUrl: aploudbyUrl,
				upload_don: aploudon,
				upload_donUrl: aploudonUrl,
				downloads_count: downloads,
				filesizeH,
				filesize: filesize
			};
		  resolve(results);
		}
	})
}

module.exports = sfilemobi