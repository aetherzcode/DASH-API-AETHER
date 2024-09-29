function one(name,gpname,pp,bg,member,gcicon) {
	const data = `https://api.zeltoria.my.id/api/maker/welcome?name=${name}&gpname=${gpname}&member=${member}&pp=${pp}&bg=${bg}&apikey=Elistz`
	let result = {
		data
	}
	return result
}

module.exports = one