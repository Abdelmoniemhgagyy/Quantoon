export const getImageSrc = (image) => {
    if (!image) return '';
    // Force use of local file for treasure instead of the external link
    if (image.includes('flaticon') || image.includes('5048995.png')) return '/images/jannah/treasure.png';
    return /^https?:\/\//.test(image) ? image : `/images/jannah/${image}`;
};

export const getInitialCounters = () => {
    const saved = localStorage.getItem('jannah_counters');
    return saved ? JSON.parse(saved) : { castle: 0, house: 0, treasure: 0, tree: 0, tooba: 0, palm: 0 };
};
