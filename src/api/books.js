import axios from "axios";

const BOOKS_API_BASE =
  "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/books/ar/ar";
const PAGE_SIZE = 24;
const booksCache = new Map();

export async function getBooksPage(page = 1, signal) {
  if (booksCache.has(page)) {
    return booksCache.get(page);
  }

  const { data } = await axios.get(`${BOOKS_API_BASE}/${page}/${PAGE_SIZE}/json`, {
    signal,
  });
  const result = {
    books: Array.isArray(data?.data) ? data.data : [],
    links: data?.links || {},
  };

  booksCache.set(page, result);
  return result;
}
