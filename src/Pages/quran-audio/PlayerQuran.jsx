import { useEffect, useMemo, useState, useRef, useContext } from "react";
import "./styles.css";
import AudioPlayer from "react-h5-audio-player";
import namesOfsura from "../../data/quran/quran";
import "react-h5-audio-player/lib/styles.css";
import ScrollToTop from "../../components/ScroolToTop/ScroolToTop";
import GloableContext from "../../store/GloableContext";

const ACCENT_COLORS = [
  { name: "فيروزي", value: "#4FC8CD", glow: "rgba(79,200,205,0.35)" },
  { name: "أبيض", value: "#F0EDE6", glow: "rgba(240,237,230,0.25)" },
  { name: "ذهبي", value: "#C9A84C", glow: "rgba(201,168,76,0.35)" },
  { name: "وردي", value: "#E8A598", glow: "rgba(232,165,152,0.35)" },
];

function Player1() {
  const [num, setNum] = useState(1);
  const { url } = useContext(GloableContext);

  const [id, setId] = useState(1);
  const [nameOfSura, setNameOfSura] = useState("الفاتحة");

  const [accent, setAccent] = useState(ACCENT_COLORS[0]);
  const [activeSura, setActiveSura] = useState(1);

  const [readerName, setReaderName] = useState("");
  const [rewaya, setRewaya] = useState("");
  const [availableSuraIds, setAvailableSuraIds] = useState([]);

  const listRef = useRef(null);
  const currentUrl = url || localStorage.getItem("currentUrl") || "";
  const baseAudioUrl = currentUrl.endsWith("/") ? currentUrl : `${currentUrl}/`;
  const availableSuras = useMemo(
    () =>
      availableSuraIds.length
        ? namesOfsura.filter((item) => availableSuraIds.includes(item.id))
        : namesOfsura,
    [availableSuraIds]
  );

  const urlAudio =
    id < 10
      ? `${baseAudioUrl}00${num}.mp3`
      : id < 100
      ? `${baseAudioUrl}0${num}.mp3`
      : `${baseAudioUrl}${num}.mp3`;

  const handelIdAndNameSura = (suraId, name) => {
    setNum(suraId);
    setId(suraId);
    setActiveSura(suraId);
    setNameOfSura(name);
  };

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });

    if (typeof window !== "undefined") {
      setReaderName(localStorage.getItem("nameOfQauri") || "");
      setRewaya(localStorage.getItem("rewaya") || "");

      const savedSuras = (localStorage.getItem("quranAudioSuras") || "")
        .split(",")
        .map((sura) => Number(sura))
        .filter(Boolean);

      setAvailableSuraIds(savedSuras);
    }
  }, []);

  useEffect(() => {
    if (!availableSuras.length) return;

    const firstSura = availableSuras[0];
    const currentSuraIsAvailable = availableSuras.some((item) => item.id === id);

    if (!currentSuraIsAvailable) {
      setNum(firstSura.id);
      setId(firstSura.id);
      setActiveSura(firstSura.id);
      setNameOfSura(firstSura.name);
    }
  }, [availableSuras, id]);

  useEffect(() => {
  document.documentElement.style.setProperty("--accent", accent.value);
  document.documentElement.style.setProperty("--accent-glow", accent.glow);
}, [accent]);

  return (
    <div className="quran-root" dir="rtl">
      {/* Header */}
      <header className="q-header bg-white/10 rounded-2xl">
        <div className="q-header-inner">
          <div className="q-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>

          <div className="q-meta-row">
            <div className="q-meta-chip">
              القارئ: <span>{readerName}</span>
            </div>

            <div className="q-meta-chip">
              الرواية: <span>{rewaya}</span>
            </div>
          </div>

          <div className="q-sura-name-live">▶ {nameOfSura}</div>
        </div>
      </header>

      {/* Surah List */}
      <div className="q-list" ref={listRef}>
        {availableSuras.map((item) => (
          <div
            key={item.id}
            className={`q-sura-item${
              activeSura === item.id ? " active" : ""
            }`}
            onClick={() => handelIdAndNameSura(item.id, item.name)}
          >
            <div className="q-sura-num">{item.id}</div>
            <div className="q-sura-name">{item.name}</div>

            {activeSura === item.id && (
              <div className="q-playing-indicator">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        ))}
      </div>

      <ScrollToTop bottom={"160px"} />

      {/* Color Picker */}
      <div className="q-color-picker">
        {ACCENT_COLORS.map((c) => (
          <div
            key={c.value}
            className={`q-color-dot${
              accent.value === c.value ? " selected" : ""
            }`}
            style={{ background: c.value }}
            title={c.name}
            onClick={() => setAccent(c)}
          />
        ))}
      </div>

      {/* Audio Player */}
      <div className="q-player-wrap">
        <div className="q-player-label">سورة {nameOfSura}</div>

        <AudioPlayer
          style={{ direction: "ltr" }}
          autoPlay
          src={urlAudio}
          onPlay={() => console.log("onPlay")}
        />
      </div>
    </div>
  );
}

export default Player1;
