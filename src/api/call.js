import axios from 'axios'
//hadith
const hadithData = async (book, start = 0, end = 50) => {
  let data = [];

  switch (book) {
    case 'bukhari':
      data = (await import('../data/books/bukhari.json')).default;
      break;
    case 'muslim':
      data = (await import('../data/books/muslim.json')).default;
      break;
    case 'abu_dawud':
      data = (await import('../data/books/abu-daud.json')).default;
      break;
    case 'nasai':
      data = (await import('../data/books/nasai.json')).default;
      break;
    case 'tirmidzi':
      data = (await import('../data/books/tirmidzi.json')).default;
      break;
    case 'malik':
      data = (await import('../data/books/malik.json')).default;
      break;
    case 'ahmad':
      data = (await import('../data/books/ahmad.json')).default;
      break;
    case 'ibnu_majah':
      data = (await import('../data/books/ibnu-majah.json')).default;
      break;
    default:
      data = [];
  }

  return data.slice(start, end);
};


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


// tafsir
const tafsirAyah = async (ayahNumber) => {
  try {
    const response = await axios.get(
      `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.muyassar`
    );
    return response.data.data.text;
  } catch (error) {
    console.error("خطأ في جلب التفسير:", error);
    return "حدث خطأ أثناء جلب التفسير.";
  }
};

const call = {
    nameSura,
    suraData,
    juzaData,
    tafsirAyah,
    hadithData,

}

export default call