const fetch = require("node-fetch")

async function chargi(character) {
    try {
        if (!character) return console.error("Kamu Harus Memasukan Nama Character")

        let url = `https://genshin-db-api.vercel.app/api/characters?query=${character}&queryLanguages=English&resultLanguage=English`
        const response = await fetch(url).catch(err => console.error("Erro: ", err))
        const data = await response.json()

        return data
    } catch (error) {
        throw new Error("Error...")
    }
}

module.exports = chargi