import { v4 as uuid } from "uuid";
import boyImg from "../assest/listImg/boy.png";
import allahImg from "../assest/listImg/allah.png";
import beadsImg from "../assest/listImg/beads.png";
import headphonesImg from "../assest/listImg/headphones.png";
import radioImg from "../assest/listImg/radio.png";
import audioQuranImg from "../assest/listImg/audio-quran.png";
import hotbaImg from "../assest/listImg/hotba.png";
import moshafImg from "../assest/listImg/quran.png";
import doaaImg from "../assest/listImg/zaker.png";
import zakerImg from "../assest/listImg/prayer.png";

import videoImg from "../assest/listImg/video.png";
import shortVideoImg from "../assest/listImg/quran_short_video.png";
import downloadImg from "../assest/listImg/downloadquran.png";
import PTimesImg from "../assest/listImg/mosque.png";
import qabaImg from "../assest/listImg/qabaImg.png";

const data = [
  {
    id: uuid(),
    title: "القرآن الكريم",
    subTitle: "مكتوب",
    url: "/quran",
    icon: "📖",
    image: moshafImg,
  },
  {
    id: uuid(),
    title: "تحميل القرآن",
    subTitle: "صوتي",
    url: "/quran/download",
    icon: "⬇️",
    image: downloadImg,
  },
  {
    id: uuid(),
    title: "مرئيات",
    subTitle: "مقاطع دينيه",
    url: "/videos",
    icon: "🎥",
    image: videoImg,
  },
  {
    id: uuid(),
    title: "الطفل المسلم",
    subTitle: "كلكم راعٍ",
    url: "/boymuslim",
    icon: "👶",
    image: boyImg,
  },
  {
    id: uuid(),
    title: "صوتيات",
    subTitle: "أستمع",
    url: "/audio",
    icon: "🎧",
    image: headphonesImg,
  },
  {
    id: uuid(),
    title: "راديو",
    subTitle: "بث مباشر",
    url: "/radio",
    icon: "📻",
    image: radioImg,
  },
  {
    id: uuid(),
    title: "الأذكار",
    subTitle: "أذكر الله",
    url: "/adkar",
    icon: "🌙",
    image: zakerImg,
  },
  {
    id: uuid(),
    title: "مواقيت الصلاة",
    subTitle: "🕋",
    url: "/prayer-times",
    icon: "🌟",
    image: PTimesImg,
  },
  {
    id: uuid(),
    title: "القِبلة",
    subTitle: "🕋",
    url: "/qibla-dir",
    icon: "🕋",
    image: qabaImg
  },
  {
    id: uuid(),
    title: "خطب",
    subTitle: "🕌",
    url: "/hotba",
    icon: "📢",
    image: hotbaImg,
  },
  {
    id: uuid(),
    title: "المصاحف",
    subTitle: "📖",
    url: "/moshaf",
    icon: "📚",
    image: null,
  },
  {
    id: uuid(),
    title: "القرآن صوتي",
    subTitle: "أستمع للقران",
    url: "/quran/audio",
    icon: "🔊",
    image: audioQuranImg,
  },
  {
    id: uuid(),
    title: "الأحاديث",
    subTitle: "ﷺ",
    url: "/hadith",
    icon: "📜",
    image: null,
  },
  {
    id: uuid(),
    title: "أسماء الله الحسنى",
    subTitle: "🕋",
    url: "/namesofallah",
    icon: "🌟",
    image: allahImg,
  },
  {
    id: uuid(),
    title: "السبحة",
    subTitle: "وَاذْكُرُوا اللَّهَ كَثِيرًا",
    url: "/rosary",
    icon: "🔵",
    image: beadsImg,
  },
  {
    id: uuid(),
    title: "مقاطع قران قصيرة",
    subTitle: "▶️",
    url: "videos/short-video-quran",
    icon: "▶️",
    image: shortVideoImg,
  },
  {
    id: uuid(),
    title: "ابنِ جنتك",
    subTitle: "🌴 قصور وتسابيح",
    url: "/build-jannah",
    icon: "🕌",
    image: "/images/jannah/treasure.png",
  },
  {
    id: uuid(),
    title: "الدعاء للمتوفى",
    subTitle: "رحمة ودعاء",
    url: "/deceased",
    icon: "🕌",
    image: doaaImg,
  },

];

export default data;
