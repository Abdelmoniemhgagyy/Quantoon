import React from "react";
import { BookOpen, Download } from "lucide-react";

const Book = React.memo(({
  title,
  description,
  prepared_by = [],
  attachments = [],
  onRead,
}) => {
  const safeAttachments = Array.isArray(attachments) ? attachments : [];
  const safePreparedBy = Array.isArray(prepared_by) ? prepared_by : [];
  const pdf = safeAttachments.find((attachment) => attachment?.url) || null;
  const author = safePreparedBy[0]?.title;

  return (
    <article className="group flex min-h-[236px] flex-col border border-slate-200 bg-white/90 p-4 text-right shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-teal-500/60 hover:shadow-[0_18px_45px_rgba(15,118,110,0.14)] dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:hover:border-teal-300/50 dark:hover:shadow-[0_18px_45px_rgba(45,212,191,0.10)]">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-teal-500/40 bg-teal-400/10 text-teal-700 transition group-hover:bg-teal-500/15 dark:border-teal-300/40 dark:text-teal-100">
          <BookOpen size={24} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <h2 className="line-clamp-2 text-base font-bold leading-7 text-slate-950 dark:text-white">
            {title}
          </h2>
          {author ? (
            <p className="mt-1 line-clamp-1 text-sm text-slate-600 dark:text-white/65">
              {author}
            </p>
          ) : null}
        </div>
      </div>

      <p className="line-clamp-4 flex-1 text-sm leading-7 text-slate-700 dark:text-white/75">
        {description || "لا يوجد وصف متاح لهذا الكتاب."}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
        {pdf ? (
          <>
            <button
              type="button"
              onClick={() => onRead?.({ title, url: pdf.url })}
              className="inline-flex min-h-10 items-center gap-2 border border-teal-600/25 bg-teal-500/10 px-3 text-sm font-bold text-teal-800 transition hover:bg-teal-500/20 dark:border-teal-300/25 dark:text-teal-100 dark:hover:bg-teal-300/10"
            >
              <BookOpen size={18} />
              قراءة
            </button>
            <a
              href={pdf.url}
              download
              className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
            >
              <Download size={18} />
              تحميل
            </a>
          </>
        ) : (
          <span className="text-sm text-slate-500 dark:text-white/60">
            لا يوجد ملف متاح
          </span>
        )}
      </div>
    </article>
  );
});

export default Book;
