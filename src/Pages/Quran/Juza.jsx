import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import CopyIcons from "../../components/CopyIcons/CopyIcons";
import call from "../../api/call";

function Juza() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tafsir, setTafsir] = useState({});
  const { id } = useParams();

  const handelSura = async () => {
    const juza = await call.juzaData(id);
    setData(juza);
    setLoading(false);
  };

  // نفس دالة fetchTafsir في صفحة السورة
  const fetchTafsir = async (ayahNumber) => {
    if (tafsir[ayahNumber]) {
      setTafsir((prev) => ({
        ...prev,
        [ayahNumber]: null,
      }));
      return;
    }

    const tafsirText = await call.tafsirAyah(ayahNumber);

    setTafsir((prev) => ({
      ...prev,
      [ayahNumber]: tafsirText,
    }));
  };

  useEffect(() => {
    handelSura();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading mT="250px" />
      ) : (
        <div className="sura">
          {data.map((item) => (
            <div key={item.number} className="relative py-4">
              <p className="text-lg md:text-xl leading-loose">
                {item.text} (<span>{item.numberInSurah || item.number}</span>)
              </p>
              <h3
                onClick={() => fetchTafsir(item.number)}
                className="cursor-pointer text-[20px] absolute left-[28px] top-[0px] text-red-600 btn text-sm mt-2"
              >
                {tafsir[item.number] ? "X" : "📖"}
              </h3>
            {/* tafsir container  */}
              {tafsir[item.number] && (
                <div className="mr-[30px] mt-3 bg-green-50 p-3 rounded-md text-green-700 relative">
                  <h6 className="text-center text-[16px] sm:text-[22px] pt-[27px]">
                    {tafsir[item.number]}
                  </h6>

                  <div className="absolute top-2 left-2">
                    <CopyIcons copiedText={tafsir[item.number]} />
                  </div>
                </div>
              )}

              <CopyIcons copiedText={item.text} />
            </div>
          ))}

          <Link
            to="/quran/juza"
            className="inline-block mt-6 text-gray-600 hover:text-black"
          >
            <i className="bi bi-backspace text-2xl"></i>
          </Link>
        </div>
      )}
      <br />
    </div>
  );
}

export default Juza;
