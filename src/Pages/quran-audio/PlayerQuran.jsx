import { useEffect, useState, useRef } from "react"
import "./styles.css"
import AudioPlayer from "react-h5-audio-player";
import namesOfsura from "../../data/quran/quran";
import "react-h5-audio-player/lib/styles.css";
import { useContext } from "react";
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
  const [id, setId] = useState(0);
  const [nameOfSura, setNameOfSura] = useState("الفاتحة");
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);
  const [activeSura, setActiveSura] = useState(1);
  const listRef = useRef(null);

  const urlAduio =
    id < 10
      ? `${url}00${num}.mp3`
      : id < 100
        ? `${url}0${num}.mp3`
        : `${url}${num}.mp3`;

  const handelIdAndNameSura = (suraId, name) => {
    setNum(suraId);
    setId(suraId);
    setActiveSura(suraId);
    setNameOfSura(name);
  };

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="quran-root" dir="rtl">
        {/* Header */}
        <header className="q-header bg-white/10 rounded-2xl">
          <div className="q-header-inner">
            <div className="q-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div className="q-meta-row">
              <div className="q-meta-chip">
                القارئ: <span>{localStorage.getItem("nameOfQauri")}</span>
              </div>
              <div className="q-meta-chip">
                الرواية: <span>{localStorage.getItem("rewaya")}</span>
              </div>
            </div>
            <div className="q-sura-name-live">▶ {nameOfSura}</div>
          </div>
        </header>

        {/* Surah List */}
        <div className="q-list  " ref={listRef}>
          {namesOfsura.map((item) => (
            <div
              key={item.id}
              className={`q-sura-item${activeSura === item.id ? " active" : ""}`}
              onClick={() => handelIdAndNameSura(item.id, item.name)}
            >
              <div className="q-sura-num">{item.id}</div>
              <div className="q-sura-name">{item.name}</div>
              {activeSura === item.id && (
                <div className="q-playing-indicator">
                  <span /><span /><span />
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
              className={`q-color-dot${accent.value === c.value ? " selected" : ""}`}
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
            src={urlAduio}
            onPlay={() => console.log("onPlay")}
          />
        </div>
      </div>
    </>
  );
}

export default Player1;