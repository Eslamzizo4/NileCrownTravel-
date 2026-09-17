const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";


async function loadTrip() {

  const params = new URLSearchParams(window.location.search);

  let id = params.get("id");

  // تحديد اللغة
  const lang =
    params.get("lang") ||
    (
      document.documentElement.lang.toLowerCase().startsWith("en")
        ? "en"
        : "ar"
    );

  const isEnglish = lang === "en";


  // تحويل luxor القديم إلى ID قاعدة البيانات
  if (id === "luxor") {
    id = "1";
  }


  // عناصر الصفحة
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const tripPic = document.getElementById("tripPic");
  const category = document.getElementById("category");
  const book = document.getElementById("book");


  if (!id) {

    title.textContent =
      isEnglish
        ? "Trip not found"
        : "الرحلة غير موجودة";

    return;
  }


  // =========================
  // تغيير اتجاه ولغة الصفحة
  // =========================

  document.documentElement.lang =
    isEnglish ? "en" : "ar";

  document.documentElement.dir =
    isEnglish ? "ltr" : "rtl";


  // =========================
  // تغيير النصوص الثابتة
  // =========================

  const priceBox =
    document.querySelector(".price");

  const programTitle =
    document.querySelector(".detail-copy h3");

  const list =
    document.querySelector(".detail-copy ul");

  const backButton =
    document.querySelector(".btn.ghost");


  if (isEnglish) {

    if (priceBox) {
      priceBox.firstChild.textContent = "Price: ";
    }

    if (programTitle) {
      programTitle.textContent = "What's included";
    }

    if (list) {
      list.innerHTML = `
        <li>Trip organization and coordination</li>
        <li>Details according to the selected program</li>
        <li>Booking and inquiry support</li>
      `;
    }

    if (book) {
      book.textContent = "Book via WhatsApp";
    }

    if (backButton) {
      backButton.textContent = "Back to trips";
      backButton.href = "en.html";
    }


    // تغيير روابط القائمة العلوية
    const navLinks =
      document.querySelectorAll(".nav nav a");

    if (navLinks.length >= 3) {

      navLinks[0].textContent = "Home";
      navLinks[0].href = "en.html";

      navLinks[1].textContent = "Trips";
      navLinks[1].href = "en.html";

      navLinks[2].textContent = "Contact";
      navLinks[2].href = "en.html#contact";
    }


    // زر اللغة
    const langButton =
      document.querySelector(".lang");

    if (langButton) {
      langButton.textContent = "AR";
      langButton.href =
        "trip.html?id=" +
        encodeURIComponent(id) +
        "&lang=ar";
    }

  } else {

    if (priceBox) {
      priceBox.firstChild.textContent = "السعر: ";
    }

    if (programTitle) {
      programTitle.textContent = "يشمل البرنامج";
    }

    if (list) {
      list.innerHTML = `
        <li>تنظيم وتنسيق الرحلة</li>
        <li>التفاصيل حسب البرنامج المختار</li>
        <li>دعم وتواصل للحجز والاستفسار</li>
      `;
    }

    if (book) {
      book.textContent = "طلب حجز عبر واتساب";
    }

    if (backButton) {
      backButton.textContent = "العودة للرحلات";
      backButton.href = "index.html";
    }


    const navLinks =
      document.querySelectorAll(".nav nav a");

    if (navLinks.length >= 3) {

      navLinks[0].textContent = "الرئيسية";
      navLinks[0].href = "index.html";

      navLinks[1].textContent = "الرحلات";
      navLinks[1].href = "trips.html";

      navLinks[2].textContent = "تواصل";
      navLinks[2].href = "index.html#contact";
    }


    const langButton =
      document.querySelector(".lang");

    if (langButton) {
      langButton.textContent = "EN";
      langButton.href =
        "trip.html?id=" +
        encodeURIComponent(id) +
        "&lang=en";
    }
  }


  // =========================
  // الاتصال بـ Supabase
  // =========================

  try {

    const response = await fetch(
      SUPABASE_URL +
      "/rest/v1/trips?id=eq." +
      encodeURIComponent(id) +
      "&select=*",
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + SUPABASE_KEY
        }
      }
    );


    if (!response.ok) {
      throw new Error("فشل الاتصال بقاعدة البيانات");
    }


    const trips = await response.json();

    const trip = trips[0];


    if (!trip) {

      title.textContent =
        isEnglish
          ? "Trip not found"
          : "الرحلة غير موجودة";

      return;
    }


    // =========================
    // البيانات حسب اللغة
    // =========================

    const tripTitle = isEnglish
      ? (trip.title_en || trip.title_ar || "Trip")
      : (trip.title_ar || trip.title_en || "رحلة");


    const tripDescription = isEnglish
      ? (trip.description_en || trip.description_ar || "")
      : (trip.description_ar || trip.description_en || "");


    const tripPrice = isEnglish
      ? (trip.price_en || trip.price_ar || "Price not specified")
      : (trip.price_ar || trip.price_en || "السعر غير محدد");


    const tripImage =
      trip.image_en ||
      trip.image_ar ||
      "";


    const tripCategory = isEnglish
      ? (
          trip.category_en ||
          trip.category_ar ||
          "Egypt Tours"
        )
      : (
          trip.category_ar ||
          trip.category_en ||
          "رحلات داخل مصر"
        );


    // =========================
    // عرض البيانات
    // =========================

    title.textContent =
      tripTitle;


    description.textContent =
      tripDescription;


    price.textContent =
      tripPrice;


    if (category) {
      category.textContent =
        tripCategory;
    }


    // =========================
    // صورة الرحلة
    // =========================

    if (tripImage) {

      tripPic.style.backgroundImage =
        "url('" +
        escapeAttribute(tripImage) +
        "')";

      tripPic.style.backgroundSize = "cover";
      tripPic.style.backgroundPosition = "center";
    }


    // =========================
    // واتساب
    // =========================

    if (book) {

      const message = isEnglish

        ? "Hello Nile Crown Travel, I would like to book the trip: " +
          tripTitle

        : "مرحباً Nile Crown Travel، أريد حجز رحلة " +
          tripTitle;


      book.href =
        "https://wa.me/201010575983?text=" +
        encodeURIComponent(message);
    }


  } catch (error) {

    console.error(error);


    title.textContent =
      isEnglish
        ? "Error loading trip"
        : "حدث خطأ في تحميل الرحلة";


    price.textContent =
      isEnglish
        ? "Unable to load price"
        : "تعذر تحميل السعر";
  }
}


// =========================
// حماية النصوص
// =========================

function escapeAttribute(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}


// تشغيل الصفحة

loadTrip();
