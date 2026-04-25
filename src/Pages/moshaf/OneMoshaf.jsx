import React, { useEffect, useState, useRef } from 'react'

function OneMoshaf({ Src, typeImg, name, fahrs }) {

  const [numberOfPage, setNumberOfPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const numberOfzerosUrl = (num) =>
    num < 10 ? `000`
      : num < 100 ? `00`
        : `0`;

  const totalPages = fahrs + 2;
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changeInputValue = (e) => {
    setNumberOfPage(e.target.value);
  };

  // arrow icons functions 
  const prevPage = () => {
    if (numberOfPage > 1) {
      setNumberOfPage(+numberOfPage - 1)
    }
    else {
      setNumberOfPage(fahrs + 2)
    }
  }

  const nextPage = () => {
    if (numberOfPage < fahrs + 2) {
      setNumberOfPage(+numberOfPage + 1)
    }
    else {
      setNumberOfPage(1)
    }
  }

  // Modal scroll functionality
  useEffect(() => {
    if (!openModel) {
      if (observerRef.current) observerRef.current.disconnect();
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageIndex = entry.target.getAttribute('data-page');
          if (pageIndex) {
            setNumberOfPage(Number(pageIndex));
          }
        }
      });
    }, {
      root: scrollContainerRef.current,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    pagesArray.forEach((pageNum) => {
      const el = document.getElementById(`moshaf-${name.replace(/\s+/g, '-')}-page-${pageNum}`);
      if (el) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [openModel, name, pagesArray.length]);

  useEffect(() => {
    if (openModel) {
      setTimeout(() => {
        const el = document.getElementById(`moshaf-${name.replace(/\s+/g, '-')}-page-${numberOfPage}`);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModel]); // Run only when the modal opens, not on every page change

  const handleModalInputChange = (e) => {
    const val = Number(e.target.value);
    setNumberOfPage(val);
    if (val >= 1 && val <= totalPages) {
      const el = document.getElementById(`moshaf-${name.replace(/\s+/g, '-')}-page-${val}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (!openModel) {
      window.scroll({
        top: 0,
      })
    }
  }, [openModel])

  return (
    <>
      <div className='mt-[15px] mr-[60px] flex items-center justify-center flex-col'>
        <div className='my-4 md:my-2  md:mr-[42px] flex justify-center'>
          <input type="number" min={1} max={totalPages} placeholder='رقم الصفحة' className='p-2 w-[60%] md:w-auto rounded-lg border-none outline-none text-black'
            value={numberOfPage}
            onChange={changeInputValue} />

          <button className='md:mr-2 p-2 bg-blue-800 rounded-lg sm:rounded-l-lg text-white font-bold' onClick={() => setNumberOfPage(fahrs)}>الفهرس</button>
        </div>

        <div className='md:h-[600px] sm:w-[400px] flex gap-[3px] md:gap-[8px] items-center text-white'>
          <i className="bi bi-arrow-right-circle sm:text-3xl text-xl cursor-pointer" onClick={prevPage} ></i>

          <img className='w-[80%] sm:w-[70%] md:w-full md:h-[600px] rounded-[2px] cursor-pointer'
            src={`${Src}${numberOfzerosUrl(numberOfPage)}${numberOfPage}${typeImg}`} alt="moshaf"
            onClick={() => setOpenModel(!openModel)} />

          <i className="bi bi-arrow-left-circle  sm:text-3xl text-xl cursor-pointer" onClick={nextPage}></i>
        </div>
        <p className='md:text-xl text-white text-center md:mr-8'>{name}</p>

      </div>


      {/* model  */}
      {openModel && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-[#000] z-[99999999999] overflow-y-auto flex flex-col items-center'
          onClick={() => setOpenModel(false)}
          ref={scrollContainerRef}
        >
          {/* Header container */}
          <div
            className='sticky top-0 left-0 w-full bg-black/90 p-3 flex gap-4 justify-center items-center z-50 shadow-md'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='p-2 px-4 bg-blue-800 hover:bg-blue-700 rounded-lg text-white font-bold whitespace-nowrap transition-colors'
              onClick={() => {
                setNumberOfPage(fahrs);
                const el = document.getElementById(`moshaf-${name.replace(/\s+/g, '-')}-page-${fahrs}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              الفهرس
            </button>

            <div className="flex items-center gap-2">
              <span className="text-white hidden md:inline">رقم الصفحة:</span>
              <input
                type="number" min={1} max={totalPages} placeholder='رقم الصفحة'
                className='text-center border border-blue-400 p-2 w-[100px] md:w-[120px] rounded-lg outline-none text-black font-bold'
                value={numberOfPage}
                onChange={handleModalInputChange}
              />
            </div>

            <i
              onClick={() => setOpenModel(false)}
              className="bi bi-x-circle text-4xl text-white hover:text-red-500 cursor-pointer transition-colors absolute left-4 md:left-8"
            ></i>
          </div>

          {/* Moshaf Pages List for scrolling */}
          <div className="flex flex-col items-center gap-2 py-4 w-full" onClick={(e) => e.stopPropagation()}>
            {pagesArray.map((pageNum) => (
              <img
                key={pageNum}
                id={`moshaf-${name.replace(/\s+/g, '-')}-page-${pageNum}`}
                data-page={pageNum}
                className='w-[100%] md:w-[60%] xl:w-[40%] rounded-[2px] bg-[#111]'
                style={{ aspectRatio: '0.67' }}
                src={`${Src}${numberOfzerosUrl(pageNum)}${pageNum}${typeImg}`}
                alt={`Page ${pageNum}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
      {/* End model  */}

    </>
  )
}

export default OneMoshaf