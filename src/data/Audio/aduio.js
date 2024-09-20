import shuffleArray from "../../components/shuffleArray"

import { v4 as uuid } from 'uuid';

export let books_audio =[
    // {
    //     id:1,
    //     author:"الشيخ سعيد الكملي",
    //     img:"https://audioketab.com/contents/Attachments/Images/6558.jpg",
    //     name_book:"إن الله يحب إخلاصك",
    //     url_audio:"https://audioketab.com/contents/Attachments/Audios/6559.mp3"
    // },
    // {
    //     id:uuid(),
    //     author:"وليد عبدالرحمن الحمدان",
    //     img:"https://mofakroun.com/image/cache/data/2024/%20%D8%AF%D9%84%D8%A7%D8%A6%D9%84/52-500x500.jpg",
    //     name_book:"جامع الذكر والدعاء من جامع الصحيحين",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/52859/jame3_alzeker_wa_do3a2.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=6831964dd0f263cd7b807b7e344c7153128e73037b6b5dcdb9c739815c9d8912"
    // },
    // {
    //     id:7,
    //     author:"يحيى بن شرف النووي",
    //     img:"https://play-lh.googleusercontent.com/QTV-FRlALVmuUqHn4bLY69zatDjO80QLC4dQH3CB_BgHJqCGFuKf6H2IAlCbm-jXGXU",
    //     name_book:"الأربعون النووية مع زيادات ابن رجب",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/42390/alarba3on_alnawaoya.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=234c9ac2749deb7158455dfbab2b862fb5abf82c991ea3e3ebaa96aba7c63baa"
    // },
    {
        id:3,
        author:"د. خالد بن عثمان السبت",
        img:"https://audioketab.com/contents/Attachments/Images/BrOdZJG8ggTriSs1FQAL.jpg",
        name_book:"الخلاصة في تدبر القرآن الكريم",
        url_audio:"https://audioketab.com/contents/Attachments/Audios/mjLp7VGFUGdv82J8Lpg2.mp3"
    },

    // {
    //     id:4,
    //     author:"أحمد بن يوسف السيد",
    //     img:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660672204i/61996564.jpg",
    //     name_book:"المنهاج من ميراث النبوة",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/51028/almenhaj_mn_meras_alnobwa.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=acdbd74c0c17cc5070181517be18a38c0f00550ed8ca1323af4e029434a1c754"
    // },
    // {
    //     id:5,
    //     author:"عبدالمحسن بن محمد القاسم",
    //     img:"https://islamicbooks4u.com/wp-content/uploads/2023/12/islamicbooks4u.com-%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D8%AE%D8%AA%D8%B5%D8%B1-%D8%A7%D9%84%D8%A3%D8%B0%D9%83%D8%A7%D8%B1-%D9%88%D8%A7%D9%84%D8%A2%D8%AF%D8%A7%D8%A8-%D9%84%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D9%85%D8%AD%D8%B3%D9%86-%D8%A8%D9%86-%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D9%82%D8%A7%D8%B3%D9%85-%D9%85%D9%88%D9%82%D8%B9-%D9%85%D9%83%D8%AA%D8%A8%D8%A9-%D8%A7%D9%84%D8%B9%D9%84%D9%88%D9%85-%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9.webp",
    //     name_book:"مختصر الأذكار والآداب",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/287/mukhtasar_aladhkar_waladab.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=48facf67deef2278ee7e3643d7c7258b3549a202b4bb11af771a6f354dfa3a09"
    // },
    // {
    //     id:6,
    //     author:"محمد بن عبدالله بن داود الصنهاجي",
    //     img:"https://upload.wikimedia.org/wikipedia/commons/8/89/Aj%C4%81r%C5%ABm%C4%ABya_book_cover.jpg",
    //     name_book:"متن الآجرومية في النحو",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/52494/matn_ajromya.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=9ecf7e5bd12e52658becbb04a35697550f5381174afa3de870730715b9a8007f"
    // },

    // {
    //     id:8,
    //     author:"أبو القاسم الرافعي القزويني",
    //     img:"https://s3.amazonaws.com/jarir-files/images/original/40644.jpg",
    //     name_book:"درة الضرع لحديث أم زرع",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/43953/dorat_aldar3_le7adeeth_om_zar3.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T165609Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=ebccc64688ecb804c96985a37da1a6bf02971439bd837dbecb490eae4bff18f7"
    // },
    // {
    //     id:9,
    //     author:"محمد بن عبدالوهاب",
    //     img:"https://nasihaa.com/uploads/img/1679129798_XUSwr.jpg",
    //     name_book:"فضل الإسلام",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/36060/fadl_aleslam.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=6e71f559864878fbc9e76700cfe27384c252997f70d06e8d61a364abd01718d3"
    // },
    // {
    //     id:10,
    //     author:"ابن جرير الطبري ",
    //     img:"https://media.zid.store/cdn-cgi/image/f=auto/https://media.zid.store/c3c80b9f-f176-496c-9f27-04187e1270f9/6e655ebd-e313-456a-bbf2-3ff60a5a4b27.jpeg",
    //     name_book:"صريح السنة",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/42981/ketab_sare7_alsunnah.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T145625Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=0370be5521e80ed3b14b44574c0b0ef0bf5cf4c8431e44bc23edbd06bf94b738"
    // },
    {
        id:2,
        author:"د.امجد عاطف الحلو",
        img:"/data/img/بحبك نحيا - موقع كتابي.png",
        name_book:"بحبك نحيا",
        url_audio:"https://audioketab.com/contents/Attachments/Audios/3488.mp3"
    },
    // {
    //     id:3,
    //     author:"",
    //     img:"",
    //     name_book:"",
    //     url_audio:""
    // },
]
// Start Courses 

// قصص الأنبياء 
export let prophetsStories = [
    {
        id:13,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة محمد صلّ الله عليه و سلم",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/013.mp3"
    },
    {
        id:1,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة سيدنا إبراهيم عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/001.mp3"
    },
    {
        id:2,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة ادريس ونوح عليهما السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/002.mp3"
    },
    {
        id:3,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة آدم عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/003.mp3"
    },
    {
        id:4,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة الخضر عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/004.mp3"
    },
    {
        id:5,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة أيوب عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/005.mp3"
    },
    {
        id:6,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة داوود عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/006.mp3"
    },
    {
        id:7,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة زكريا و يحي عليهما السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/007.mp3"
    },
    {
        id:8,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة سليمان و العزير عليهما السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/008.mp3"
    },
    {
        id:9,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة شعيب عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/009.mp3"
    },
    {
        id:10,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة صالح عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/010.mp3"
    },
    {
        id:11,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة عيسى عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/011.mp3"
    },
    {
        id:12,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة لوط عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/012.mp3"
    },
    {
        id:14,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة مريم بنت عمران عليها السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/014.mp3"
    },
    {
        id:15,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة موسى عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/015.mp3"
    },
    {
        id:16,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة هود عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/016.mp3"
    },
    {
        id:17,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة يوسف عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/017.mp3"
    },
    {
        id:18,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة يوشع بن نون عليه السلام",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/018.mp3"
    },
    {
        id:19,
        author:"الشيخ نبيل العوضي",
        img:"/data/img/sh_nabil.jpg",
        name_course:"قصة يونس عليه السلام ",
        url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/019.mp3"
    },
    // {
    //     id:20,
    //     author:"الشيخ نبيل العوضي",
    //     img:"/data/img/sh_nabil.jpg",
    //     name_course:"",
    //     url_audio:"https://dn720203.ca.archive.org/0/items/al3awadi-qasas-anbiya/020.mp3"
    // },
]

export let muslimMoaser = [
   {
        id:1,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 1",
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A1%20%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20-%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%2B%D8%A3%D9%8A%D9%85%D9%86%2B%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:2,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 2",
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A2%20%D8%AA%D8%A7%D9%94%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A7%D9%94%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:3,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 3",
        url_audio:"https://ia803401.us.archive.org/14/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A3%20%D8%AA%D8%A7%D9%94%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A7%D9%94%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:4,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 4",
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A4%20%D8%AA%D8%A7%D9%94%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A7%D9%94%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:5,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 5",
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A5%20%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A3%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:6,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 6",
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A6%20%D8%AA%D8%A7%D9%94%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A7%D9%94%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:7,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 7",
        url_audio:"https://ia803401.us.archive.org/14/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A7%20%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A3%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    {
        id:8,
        author:"المهندس أيمن عبدالرحبم",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
        name_course:"دورة تأسيس وعي المسلم المعاصر 8" ,
        url_audio:"https://dn720406.ca.archive.org/0/items/20210313_20210313_1000/%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A9%20%D9%A8%20%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3%20%D9%88%D8%B9%D9%8A%20%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85%20%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%20%D9%A2%20%D8%A3%D9%8A%D9%85%D9%86%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85.mp4"
    },
    // {
    //     id:9,
    //     author:"المهندس أيمن عبدالرحبم",
    //     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIlre0Fq1NZLC6Lhhwc_czznM-kFl5SVpcrdRsg1RMK9PQCZOQ9G4ruwNGMFSjXTryco&usqp=CAU",
    //     name_course:"دورة تأسيس وعي المسلم المعاصر",
    //     url_audio:""
    // },
]
export let courses = [
    {
        id:2,
        title:"دورة تأسيس وعي المسلم المعاصر",
        img:"https://static7.tgstat.ru/channels/_0/b0/b0f8e905b97170e08db29b92ef162e1a.jpg",
        path:"course",
        array:muslimMoaser
    },
    {
        id:3,
        title:"قصص الأنبياء",
        img:"https://play-lh.googleusercontent.com/fjRu2XKWoMJsUU9ukXnWUvNeo2VfZoFh7nYQrEnc69vYairg9hwm_iYeLHfkBCDrvRw",
        path:"course",
        array:prophetsStories
    },
    // {
    //     id:4,
    //     title:"",
    //     img:"",
    //     path:"course",
    //     array:[]
    // },
    // {
    //     id:5,
    //     title:"",
    //     img:"",
    //     path:"course",
    //     array:[]
    // },
    // {
    //     id:6,
    //     title:"",
    //     img:"",
    //     path:"course",
    //     array:[]
    // },
    // {
    //     id:4,
    //     title:"",
    //     img:"",
    //     path:"course",
    //     array:[]
    // },
]
// End Courses 
// Start Motoon 
export let motoon =[
    {
        id:7,
        author:"سليمان الجمزوري",
        img:"https://rjeem.com/wp-content/uploads/2019/08/%D8%AA%D8%AD%D9%81%D8%A9-%D8%A7%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84..jpg",
        name_book:"متن تحفة الأطفال",
        url_audio:"https://archive.org/download/1IIIIIIII1/Matn_Tohfa.mp3"
    },
    {
        id:8,
        author:"عبد الفتاح بن عبد الغني بن محمد القاضي",
        img:"https://www.noor-book.com/publice/covers_cache_webp/1/3/e/0/c9b1bf3ce23e085078552f392952570c.png.webp",
        name_book:"الفرائد الحسان في عد آي القرآن",
        url_audio:"https://media.islamway.net/audiobooks/3115/15_AHaddad_FraedHisanAddiQuran.mp3"
    },
    {
        id:3,
        author:"ابن الجزري",
        img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv2xLLoIhQNK7naQRLRGEbFS-msmCGn9oCMjpeff35b_qlD9gKPKmDpOU8bjDJIh9Cu-dOrkmIEZRwfXIcMe8fcJN_4iwKbvJLFwp63z6246PriQ8hwesNjL53Qwv9U4_lnCCUr2dlKbXL/s1600/276258934.jpg",
        name_book:"ذات الشفاء في سيرة النبي ﷺ والخلفاء",
        url_audio:"/data/mp3/motoon/ThatiShifaNbbiKholafa.mp3"
    },
    // {
    //     id:1,
    //     author:"أبي محمد القاسم بن فيرة الشاطبي",
    //     img:"https://images.yaoota.com/7VVQGf2apr0kBw2qJQYI9tjlZ7k=/trim/fit-in/840x840/filters:quality(100)/yaootaweb-production-sa/media/crawledproductimages/355ca7cc0b915abcbbc331f43735cd626b027e5a.jpg",
    //     name_book:"متن الشاطبية",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/43340/Matn_Sha6byah.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240419T171134Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=f1f0db4186ba99629319a93394c4ea40495fc86eae223e6c555b1ce9b386e096"
    // },
    // {
    //     id:2,
    //     author:"محمد بن عبدالله بن داود الصنهاجي",
    //     img:"https://upload.wikimedia.org/wikipedia/commons/8/89/Aj%C4%81r%C5%ABm%C4%ABya_book_cover.jpg",
    //     name_book:"متن الآجرومية في النحو",
    //     url_audio:"https://media.islamway.net/audiobooks/3115/15_AHaddad_Ajurmmiah.mp3"
    // },
    // {
    //     id:3,
    //     author:"أحمد بن حنبل",
    //     img:"https://drabosalahm.com/wp-content/uploads/2021/09/-----rsaltt-asswl-alsntt-lliemam-ahmd-ghlaf-scaled.jpg",
    //     name_book:"متن أصول السنة",
    //     url_audio:"https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/audiobooks/42178/matn_osol_alsunnah.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240418T111859Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=053a57b84e44fa0d0edcdfbb2d359363654e7a5b1574bb3340dc13804d06dfa0"
    // },

    // {
    //     id:4,
    //     author:"أبو عبد الله محمد القحطاني",
    //     img:"https://best-kutub.com/wp-content/uploads/2023/08/egb273422-5291167.jpg",
    //     name_book:"نونية القحطاني",
    //     url_audio:"https://media.islamway.net/audiobooks/3115/15_AHaddad_NooniatQhtani.mp3"
    // },
    {
        id:5,
        author:"عمر بن محمد بن فتوح البيقوني",
        img:"https://m.media-amazon.com/images/I/51MRhAyQ+jL._AC_UF1000,1000_QL80_.jpg",
        name_book:"المنظومة البيقونية في مصطلح الحديث",
        url_audio:"/data/mp3/motoon/Biqouniah.mp3"
    },
    // {
    //     id:6,
    //     author:"القاسم بن فيره بن خلف الشاطبي",
    //     img:"https://www.neelwafurat.com/images/eg/abookstore/covers/normal/4/4272.jpg",
    //     name_book:"متن الشاطبية في القراءات السبع",
    //     url_audio:"https://media.islamway.net/audiobooks/3115/15_AHaddad_Shatibiah.mp3"
    // },


    // {
    //     id:9,
    //     author:"الشيخ محمد بن أحمد المتولي",
    //     img:"https://www.noor-book.com/publice/covers_cache_webp/8/3/7/9/f2dd600ca1379445bcc16c4dfa5e0d12.png.webp",
    //     name_book:"الفَوائد المُعتبرة في الأحرف الأربعة الزائدة على العشرة",
    //     url_audio:"https://media.islamway.net/audiobooks/3115/15_AHaddad_FwaedMotbarhOhrff.mp3"
    // },
    // {
    //     id:3,
    //     author:"",
    //     img:"",
    //     name_book:"",
    //     url_audio:"https://archive.org/download/1IIIIIIII1/Matn_Tohfa.mp3"
    // },
    // {
    //     id:3,
    //     author:"",
    //     img:"",
    //     name_book:"",
    //     url_audio:""
    // },
    
]
// End Motoon  
// Start Podcast

export let ghreebQuran = [
  // https://ghurayb.podbean.com/ 
    {
        id:1,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(الآن حصحص الحق)",
        url_audio:"https://s301.podbean.com/pb/652d4bbb383212c89b96547ad36a5956/663d441c/data1/fs24/10629012/uploads/Episode_Strange_Quran304.mp3?pbss=73a37dd6-1cd8-57ec-97ab-a0bc9e2f9061"
    },
    {
        id:2,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(وفيه يعصرون) || غريب القرآن",
        url_audio:"https://s356.podbean.com/pb/1f73ba714f43fdc0641b5f8a050b110f/663d4628/data1/fs24/10629012/uploads/Episode_Strange_Quran303.mp3?pbss=7c3c02c6-cd56-5fb8-b464-f89295e240d1"
    },
    {
        id:3,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(إلا قليلاً مما تحصنون) || غريب القرآن",
        url_audio:"https://s333.podbean.com/pb/af72d7812a93b2ae36b436b0c232c758/663d5776/data1/fs24/10629012/uploads/Episode_Strange_Quran302.mp3?pbss=3c3faffa-436d-5e57-a861-9254ae2db38c"
    },
    {
        id:4,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(سبع عجاف) || غريب القرآن",
        url_audio:"https://s316.podbean.com/pb/0320949c96689829a85ce84e25181ccf/663d59c7/data1/fs24/10629012/uploads/Episode_Strange_Quran298.mp3?pbss=346964d6-397f-5049-a8ac-a9097ce4eb42"
    },
    {
        id:5,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(وادكر بعد أمة) || غريب القرآن",
        url_audio:"https://s305.podbean.com/pb/8728ae83a2c626f4a8e4f0590ebda05b/663d584a/data1/fs24/10629012/uploads/Episode_Strange_Quran300.mp3?pbss=c6963bc0-2bc5-527a-9a5f-d4989bc82a85"
    },
    {
        id:6,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(أضغاث أحلام) || غريب القرآن",
        url_audio:"https://mcdn.podbean.com/mf/web/j4bsx4/Episode_Strange_Quran299.mp3"
    },
    {
        id:7,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(اذكرني عند ربك) || غريب القرآن",
        url_audio:"https://mcdn.podbean.com/mf/web/pgmau6/Episode_Strange_Quran297.mp3"
    },
    {
        id:8,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(فاستعصم) || غريب القرآن",
        url_audio:"https://mcdn.podbean.com/mf/web/tssnas/Episode_Strange_Quran296.mp3"
    },
    {
        id:9,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(وأعتدت لهن متكئًا) || غريب القرآن",
        url_audio:"https://mcdn.podbean.com/mf/web/sa26iq/Episode_Strange_Quran295.mp3"
    },
    {
        id:10,
        author:" الدكتور عبدالرحمن بن معاضة الشهري",
        img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
        name_course:"(قد شغفها حبًا) || غريب القرآن",
        url_audio:"https://s310.podbean.com/pb/1c43dd074e053b3251aeff4a73d29d6d/663d5b20/data1/fs24/10629012/uploads/Episode_Strange_Quran294.mp3?pbss=b6a0fd3b-2263-5a21-8535-c6d321632040"
    },
    // {
    //     id:8,
    //     author:" الدكتور عبدالرحمن بن معاضة الشهري",
    //     img:"https://i1.sndcdn.com/artworks-bYWbfFmfhuxeziPv-1bZRDQ-t500x500.jpg",
    //     name_course:"",
    //     url_audio:""
    // },
]
// وعي
export let way =[
    {
        id:1,
        author:"",
        img:"https://i.ytimg.com/vi/2Bs2ghPX6Vk/sddefault.jpg",
        name_course:"وعي  | أحسن القصص | سيدنا يوسف عليه السلام",
        url_audio:"https://feeds.soundcloud.com/stream/1818231252-waiepodcast-wtx2ubotwea5.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | الاختلاط والتعامل المنضبط بين الولد والبنت",
        url_audio:"https://feeds.soundcloud.com/stream/1197197353-waiepodcast-ep24.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | سلسلة الأخلاق | صلة الأرحام",
        url_audio:"https://feeds.soundcloud.com/stream/1506640624-waiepodcast-ep59.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | سلسلة الأخلاق | العفة",
        url_audio:"https://feeds.soundcloud.com/stream/1494610474-waiepodcast-ep58.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | الدار الآخرة",
        url_audio:"https://feeds.soundcloud.com/stream/1219850959-waiepodcast-woganqi5cji2.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | وصف يوم القيامة",
        url_audio:"https://feeds.soundcloud.com/stream/1227040300-waiepodcast-ep39.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i.pinimg.com/736x/e2/f3/4c/e2f34c79880f714ebb3367cfb011f783.jpg",
        name_course:"وعي | الصلاة",
        url_audio:"https://feeds.soundcloud.com/stream/1197073237-waiepodcast-ep18.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | عن محبة النبي ﷺ",
        url_audio:"https://feeds.soundcloud.com/stream/1197453964-waiepodcast-ep28.mp3"
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | الدعاء والموانع النفسية بينك وبين المداومة عليه",
        url_audio:"https://feeds.soundcloud.com/stream/1197453946-waiepodcast-ep27.mp3",
    },
    {
        id:uuid(),
        author:"",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        name_course:"وعي | ما هو القرآن؟",
        url_audio:"https://feeds.soundcloud.com/stream/1197251125-waiepodcast-ep26.mp3"
    },

    // {
    //     id:uuid(),
    //     author:"",
    //     img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
    //     name_course:"",
    //     url_audio:""
    // },
    // {
    //     id:uuid(),
    //     author:"",
    //     img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
    //     name_course:"",
    //     url_audio:""
    // },
    // {
    //     id:uuid(),
    //     author:"",
    //     img:"",
    //     name_course:"",
    //     url_audio:""
    // },
]
// صور من حياة الصحابة 
export let frindsLive = [
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"أنس بن مالك رضي الله عنه",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/218_MD_Anas/01.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"سعيد بن عامر الجمحي ـ رضي الله عنه ـ 1",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Sa3eed_ibn_3amer/01.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"سعيد بن عامر الجمحي ـ رضي الله عنه ـ – 2",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Sa3eed_ibn_3amer/02.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"عبد الله بن حذافة السهمي رضي الله عنه – 1",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Ibn_hozafa/01.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"عبد الله بن حذافة السهمي رضي الله عنه – 2",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Ibn_hozafa/02.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"عبد الله بن حذافة السهمي رضي الله عنه – 3",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Ibn_hozafa/03.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"البراء بن مالك رضي الله عنه – مقومات بطل",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Braa2/01.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"البراء بن مالك رضي الله عنه – أهمية الثبات",
        url_audio:"http://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Braa2/02.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"البراء بن مالك رضي الله عنه – وسائل الثبات على دين الله",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Braa2/03.mp3"
    },
   {    id:uuid(),
        author:"",
        img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
        name_course:"البراء بن مالك رضي الله عنه – التعصب",
        url_audio:"https://download.media.islamway.net/lessons/scho1230/ALsa7abah/435_MD_Braa2/04.mp3"
    },
    // https://www.podbean.com/site/EpisodeDownload/DIR70F55B6WIFHX
//    {    id:uuid(),
//         author:"",
//         img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
//         name_course:"",
//         url_audio:""
//     },
//    {    id:uuid(),
//         author:"",
//         img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
//         name_course:"",
//         url_audio:""
//     },

]
export let fahm =[
        {    id:uuid(),
            author:"د. أحمد العربي",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:" سلسلة تذوق العبادات - (1) الصلاة",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/82983673/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-1-21%2Fc2226338-c3aa-d85b-2da4-ac76fe746ad9.mp3"
        },
        {    id:uuid(),
             author:"الشيخ/ هيثم سمير",
             img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
             name_course:" إدارة الشهوات ",
             url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/82634906/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-1-13%2F8f92a387-46e3-9186-7b8f-90ede58809ed.mp3"
         },
       {    id:uuid(),
            author:"الشيخ/ أحمد عبد السلام",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:"مناسك الحج والعمرة",
            url_audio:"https://d3ctxlq1ktw2nl.cloudfront.net/staging/2024-4-16/7836c358-a44d-4f63-668f-538dd85d1fb5.mp3"
        },
       {    id:uuid(),
            author:"د. محمد علي يوسف",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:" بنو إسـرائـيل في القرآن - الجزء 1",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/85568768/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-3-18%2F4d962a87-7e0c-036f-37c5-d40aad52aa9a.mp3"
        },
       {    id:uuid(),
            author:"د. محمد علي يوسف",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:" بنو إسـرائـيل في القرآن - الجزء 2",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/86067457/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-3-29%2Fcb26fa26-5157-ca3c-8fed-5414f8c818c4.mp3"
        },
       {    id:uuid(),
            author:"د. أحمد العربي",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:"سلسلة تذوق العبادات - (2) القرآن",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/83637699/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-2-6%2F72c5f4dc-324f-1651-2a47-c757648c1538.mp3"
        },
       {    id:uuid(),
            author:"مع أ. أحمد سالم",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:" أسرار وأدوار حول معنى الرجولة الحقيقي!",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/82033736/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-1-1%2Ff4d1609d-50c5-01ff-4e72-85ab279f29c8.mp3"
        },
       {    id:uuid(),
            author:" مع أ. أحمد خليفة",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:"كيف يفكر الناجحون ؟ ",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/81359992/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-0-16%2F78b69c47-60ec-9e1c-9bcc-e0f541b7280d.mp3"
        },
       {    id:uuid(),
            author:"د. أحمد العربي",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:" ماذا لو رأى الصحابة أحداث غزة؟",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/79029932/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-10-23%2Ff6e217d1-506b-ca0d-03e2-d629f53c29f8.mp3"
        },
       {    id:uuid(),
            author:" د. أحمد عبد الفضيل",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
            name_course:"هل في بيتك مدمن ؟ جذور الإدمان وعلاماته",
            url_audio:"https://anchor.fm/s/b0a5273c/podcast/play/76720876/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-9-3%2F349620522-44100-2-74fa67b6d0574.m4a"
        },
    //    {    id:uuid(),
    //         author:"",
    //         img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
    //         name_course:"",
    //         url_audio:""
    //     },
    //    {    id:uuid(),
    //         author:"",
    //         img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
    //         name_course:"",
    //         url_audio:""
    //     },
    //    {    id:uuid(),
    //         author:"",
    //         img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
    //         name_course:"",
    //         url_audio:""
    //     },
]
export let ayhElmoshkal = [
    // https://www.podbean.com/media/share/dir-6jzea-1c26b2af?utm_campaign=w_share_ep&utm_medium=dlink&utm_source=w_share
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:" إيه المشكلة في التوبة ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683674/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030502-48000-2-a78b449a84afcef9.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة في قطع الأرحام ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/86327036/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-4-5%2Fc6c200c1-a226-82f8-b188-c6981cfeea7c.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة في علاقتنا بأهلنا ؟ ",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683686/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030513-48000-2-bfe6ddc9a4cd5196.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"خطر السوشيال ميديا و ضياع العمر",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65686638/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315045828-44100-2-d4e1ca65de12e.m4a"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة في الحب و الارتباط ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65686487/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315043433-44100-2-d2dd3b874729f.m4a"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة في الدين الجديد ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65685898/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F2827db41-daf8-6391-121a-d4de2bb20649.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:" إيه المشكلة لو مبنصليش ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683687/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030514-44100-2-7dc160a3b274fcc3.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:" إيه المشكلة في الخطوبة ؟ (الجزء الأول)",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683675/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030507-44100-2-c944793c485e5b40.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة في الخطوبة ؟ (الجزء الثاني)",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683679/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030506-48000-2-7734ee2ff5609061.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة لو مش ملتزم ؟ ",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65683676/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F315030505-44100-2-d9fb0f2af2befc36.mp3"
        },
       {    id:uuid(),
            author:"",
            img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
            name_course:"إيه المشكلة لو مفيش دين ؟",
            url_audio:"https://anchor.fm/s/db806fac/podcast/play/65685294/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-27%2F8b2b96fb-9d1d-de40-10e4-e65c7bacb0c4.mp3"
        },
    //    {    id:uuid(),
    //         author:"",
    //         img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
    //         name_course:"",
    //         url_audio:""
    //     },
]
export let podcast = [
   {
        id:1,
        title:"غريب القران",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBY981r9JB4WUrd9s2ZjnOfSxERCtg0Xhe-QuQqaHB9IiNasoQKqp4J9jFThg3ALHMHY&usqp=CAU",
        path:"podcast",
        array:shuffleArray(ghreebQuran)
    },
   {
        id:uuid(),
        title:"وعي",
        img:"https://i1.sndcdn.com/artworks-CChezIaBmk0Wgb5V-QsvIRw-t3000x3000.jpg",
        path:"podcast",
        array:shuffleArray(way)
    },
//    {
//         id:uuid(),
//         title:"صور من حياة الصحابة ",
//         img:"https://i.scdn.co/image/ab6765630000ba8a45a8bd759a534e021e0a766e",
//         path:"podcast",
//         array:shuffleArray(frindsLive)
//     },
   {
        id:uuid(),
        title:"فاهم",
        img:"https://pbcdn1.podbean.com/imglogo/dir-logo/2696526/2696526_300x300.jpg",
        path:"podcast",
        array:shuffleArray(fahm)
    },
   {
        id:uuid(),
        title:"ايه المشكلة ؟",
        img:"https://pbcdn1.podbean.com/imglogo/dir-logo/3003670/3003670_300x300.jpeg",
        path:"podcast",
        array:shuffleArray(ayhElmoshkal)
    },
//    {
//         id:uuid(),
//         title:"",
//         img:"",
//         path:"podcast",
//         array:[]
//     },

]
// End Podcast  

export let categories = [
    {
        id:1,
        title:"الكتب الصوتيه",
        img:"https://thewriteress.com/wp-content/uploads/2021/03/Channels-for-AudioBooks-in-Arabic.jpg",
        path:"books",
        array:shuffleArray(books_audio)
    },
    {
        id:2,
        title:"المتون العلمية",
        img:"/data/img/motoon.jpg",
        path:"books",
        array:motoon
    },
    {
        id:3,
        title:"الدورات الدينية",
        img:"https://yt3.googleusercontent.com/Oc3btzMimZXnk8IYtlV8_JiYXK4REXk4LgAIiAFFtkbJtB5Nwsdt8CbieOvxtfrsyfDLvH6e=s900-c-k-c0x00ffffff-no-rj",
        path:"courses",
        array:shuffleArray(courses)
    },
    {
        id:1,
        title:"بودكاست",
        img:"https://yt3.googleusercontent.com/SlM9zx-9B8PA3oqOrB4Z7ZeYZjugI4i5Ho_TZ8u3YJ1eTEsxTIcFSWSWSaLAbE6ZPshUBIK9=s900-c-k-c0x00ffffff-no-rj",
        path:"podcasts",
        array:shuffleArray(podcast)
    },
    // {
    //     id:1,
    //     title:"",
    //     img:"",
    // },
]


