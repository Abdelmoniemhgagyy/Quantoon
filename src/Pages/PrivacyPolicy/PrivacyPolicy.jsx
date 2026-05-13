import React from "react";

const privacyPolicyUrl =
  "https://farsalmnaber1.blogspot.com/2026/05/blog-post.html?m=1";

function PrivacyPolicy() {
  return (
    <main className="mr-[60px] min-h-screen bg-slate-100/95 text-slate-900 dark:bg-slate-950/95 dark:text-white">
      <div className="flex h-screen flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300/70 bg-white/90 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
          <h1 className="text-xl font-semibold">سياسة الخصوصية</h1>
          <a
            href={privacyPolicyUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            فتح في المتصفح
          </a>
        </header>

        <iframe
          src={privacyPolicyUrl}
          title="سياسة الخصوصية"
          className="min-h-0 flex-1 border-0 bg-white"
        />
      </div>
    </main>
  );
}

export default PrivacyPolicy;
