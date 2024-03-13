import axios from 'axios'

//hadith
const hadithData =async (book,numberOfPage)=>{
      const res =await axios.get(`https://hadis-api-id.vercel.app/hadith/${book}?page=${numberOfPage}&limit=300`)
      return res.data.items
}

//name sura
const nameSura = async ()=>{
    const nameSura = await axios.get("https://api.alquran.cloud/v1/meta")
    return nameSura.data.data.surahs.references
} 
//sura 
const suraData = async (id)=>{
    const sura = await axios.get(`https://api.alquran.cloud/v1/surah/${id}`)
    return sura.data.data.ayahs
}
//juza 
const juzaData = async (id)=>{
    const juza = await axios.get(`https://api.alquran.cloud/v1/juz/${id}`)
    return juza.data.data.ayahs
}
const call = {
    nameSura,
    suraData,
    juzaData,
    hadithData,

}

export default call