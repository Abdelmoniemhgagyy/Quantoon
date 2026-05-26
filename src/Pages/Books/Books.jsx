import React from "react";
import { Download, ExternalLink, Search, X } from "lucide-react";
import Book from "./Book";
import Loading from "../../components/Loading/Loading";
import { getBooksPage } from "../../api/books";

const normalizeArabicText = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[أإآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "");

const Books = () => {
  const [books, setBooks] = React.useState([]);
  const [links, setLinks] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [error, setError] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [readerBook, setReaderBook] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const loadingMore = page > 1;

    setError("");
    loadingMore ? setIsLoadingMore(true) : setIsLoading(true);

    getBooksPage(page, controller.signal)
      .then(({ books: nextBooks, links: nextLinks }) => {
        setBooks((currentBooks) =>
          page === 1 ? nextBooks : [...currentBooks, ...nextBooks]
        );
        setLinks(nextLinks);
      })
      .catch((requestError) => {
        if (requestError.name !== "CanceledError") {
          setError("تعذر تحميل الكتب الآن. حاول مرة أخرى بعد قليل.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      });

    return () => controller.abort();
  }, [page]);

  const hasMoreBooks = Boolean(links?.next);
  const totalItems = links?.total_items;
  const normalizedSearchTerm = normalizeArabicText(searchTerm);
  const visibleBooks = React.useMemo(() => {
    if (!normalizedSearchTerm) return books;

    return books.filter((book) => {
      const searchableText = normalizeArabicText(book.title);

      return searchableText.includes(normalizedSearchTerm);
    });
  }, [books, normalizedSearchTerm]);
  const hasSearch = searchTerm.trim().length > 0;
  const isSearchingMoreBooks =
    hasSearch && visibleBooks.length === 0 && hasMoreBooks;

  React.useEffect(() => {
    if (!isSearchingMoreBooks || isLoading || isLoadingMore) return undefined;

    const searchTimer = window.setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
    }, 350);

    return () => window.clearTimeout(searchTimer);
  }, [isSearchingMoreBooks, isLoading, isLoadingMore]);

  React.useEffect(() => {
    if (!readerBook) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setReaderBook(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [readerBook]);

  if (isLoading) {
    return <Loading itemsCenter="true" />;
  }

  return (
    <main
      className="min-h-screen w-full pr-[78px] sm:pr-[90px] pl-4 sm:pl-8 py-8 text-slate-900 dark:text-white"
      dir="rtl"
    >
      <section className="mx-auto w-full max-w-[1280px]">
        <div className="mb-6 border border-slate-200 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
                كتب
              </h1>
            </div>

            <div className="w-full lg:max-w-[480px]">
              <label htmlFor="books-search" className="sr-only">
                البحث في الكتب
              </label>
              <div className="relative">
                <Search
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/45"
                />
                <input
                  id="books-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="ابحث باسم الكتاب..."
                  className="h-12 w-full border border-slate-300 bg-white pr-12 pl-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/45 dark:focus:border-teal-300"
                />
                {hasSearch ? (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="مسح البحث"
                  >
                    <X size={18} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="border border-teal-600/20 bg-teal-500/10 px-3 py-1.5 font-bold text-teal-800 dark:border-teal-300/25 dark:text-teal-100">
              المعروض {visibleBooks.length}
            </span>
            {totalItems ? (
              <span className="border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/65">
                إجمالي المكتبة {totalItems}
              </span>
            ) : null}
            {hasSearch ? (
              <span className="border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/65">
                نتائج البحث عن: {searchTerm}
              </span>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-300/40 dark:bg-red-950/30 dark:text-red-100">
            {error}
          </div>
        ) : null}

        {visibleBooks.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleBooks.map((book) => (
              <Book
                key={book.id || book.api_url || book.title}
                onRead={setReaderBook}
                {...book}
              />
            ))}
          </div>
        ) : hasSearch ? (
          <div className="border border-slate-200 bg-white/80 px-4 py-8 text-center text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.07] dark:text-white/70">
            {isSearchingMoreBooks || isLoadingMore
              ? "جار البحث في باقي الكتب..."
              : "لا توجد كتب مطابقة لهذا الاسم."}
          </div>
        ) : (
          <div className="border border-slate-200 bg-white/80 px-4 py-5 text-center text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.07] dark:text-white/70">
            لا توجد كتب متاحة الآن.
          </div>
        )}

        {hasMoreBooks ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={isLoadingMore}
              className="min-w-[150px] border border-teal-600/40 bg-teal-500/15 px-5 py-3 font-bold text-teal-800 transition hover:bg-teal-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:border-teal-300/50 dark:text-teal-50"
            >
              {isLoadingMore ? "جار التحميل..." : "تحميل المزيد"}
            </button>
          </div>
        ) : null}
      </section>

      {readerBook ? (
        <div
          className="fixed inset-0 z-[10001] bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-reader-title"
        >
          <div className="mx-auto flex h-full max-w-[1180px] flex-col overflow-hidden border border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-3 dark:border-white/10 dark:bg-slate-950 sm:px-4">
              <h2
                id="book-reader-title"
                className="line-clamp-1 min-w-0 text-sm font-bold text-slate-950 dark:text-white sm:text-base"
              >
                {readerBook.title}
              </h2>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={readerBook.url}
                  download
                  className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                  aria-label="تحميل الكتاب"
                >
                  <Download size={18} />
                </a>
                <a
                  href={readerBook.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                  aria-label="فتح الكتاب في تبويب جديد"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setReaderBook(null)}
                  className="flex h-10 w-10 items-center justify-center border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 dark:border-red-300/20 dark:bg-red-500/10 dark:text-red-100 dark:hover:bg-red-500/20"
                  aria-label="إغلاق القارئ"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <iframe
              title={readerBook.title}
              src={readerBook.url}
              className="min-h-0 flex-1 bg-slate-100 dark:bg-slate-900"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Books;
