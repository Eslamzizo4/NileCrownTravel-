const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";


async function loadTrip() {

  const params = new URLSearchParams(window.location.search);

  let id = params.get("id");

  // =========================
  // تحديد اللغة
  // =========================

  const lang =
    params.get("lang") ||
    (
      document.documentElement.lang.toLowerCase().startsWith("en")
        ? "en"
        : "ar"
    );

  const isEnglish = lang === "en";


  // =========================
  // تحويل Luxor القديم
  // =========================

  if (id === "luxor") {
    id = "1";
  }


  // =========================
  // عناصر الصفحة
  // =========================

  const title =
    document.getElementById("title");

  const description =
    document.getElementById("description");

  const price =
    document.getElementById("price");

  const priceLabel =
    document.getElementById("priceLabel");

  const tripPic =
    document.getElementById("tripPic");

  const category =
    document.getElementById("category");

  const book =
    document.getElementById("book");

  const includesTitle =
    document.getElementById("includesTitle");

  const include1 =
    document.getElementById("include1");

  const include2 =
    document.getElementById("include2");

  const include3 =
    document.getElementById("include3");

  const backButton =
    document.getElementById("back");

  const langButton =
    document.getElementById("langButton");

  const navHome =
    document.getElementById("navHome");

  const navTrips =
    document.getElementById("navTrips");

  const navContact =
    document.getElementById("navContact");


  // =========================
  // لو مفيش ID
  // =========================

  if (!id) {

    title.textContent =
      isEnglish
        ? "Trip not found"
        : "الرحلة غير موجودة";

    return;
  }


  // =========================
  // لغة واتجاه الصفحة
  // =========================

  document.documentElement.lang =
    isEnglish ? "en" : "ar";

  document.documentElement.dir =
    isEnglish ? "ltr" : "rtl";


  // =========================
  // النصوص الثابتة
  // =========================

  if (isEnglish) {

    // السعر
    if (priceLabel) {
      priceLabel.textContent = "Price:";
    }

    // يشمل البرنامج
    if (includesTitle) {
      includesTitle.textContent = "What's included";
    }

    // القائمة
    if (include1) {
      include1.textContent =
        "Trip organization and coordination";
    }

    if (include2) {
      include2.textContent =
        "Details according to the selected program";
    }

    if (include3) {
      include3.textContent =
        "Booking and inquiry support";
    }

    // الحجز
    if (book) {
      book.textContent =
        "Book via WhatsApp";
    }

    // الرجوع
    if (backButton) {
      backButton.textContent =
        "Back to trips";

      backButton.href =
        "trips.html?lang=en";
    }

    // القائمة العلوية
    if (navHome) {
      navHome.textContent = "Home";
      navHome.href = "en.html";
    }

    if (navTrips) {
      navTrips.textContent = "Trips";
      navTrips.href = "trips.html?lang=en";
    }

    if (navContact) {
      navContact.textContent = "Contact";
      navContact.href = "en.html#contact";
    }

    // زر اللغة
    if (langButton) {

      langButton.textContent = "AR";

      langButton.href =
        "trip.html?id=" +
        encodeURIComponent(id) +
        "&lang=ar";
    }

  } else {

    // السعر
    if (priceLabel) {
      priceLabel.textContent = "السعر:";
    }

    // يشمل البرنامج
    if (includesTitle) {
      includesTitle.textContent =
        "يشمل البرنامج";
    }

    // القائمة
    if (include1) {
      include1.textContent =
        "تنظيم وتنسيق الرحلة";
    }

    if (include2) {
      include2.textContent =
        "التفاصيل حسب البرنامج المختار";
    }

    if (include3) {
      include3.textContent =
        "دعم وتواصل للحجز والاستفسار";
    }

    // الحجز
    if (book) {
      book.textContent =
        "طلب حجز عبر واتساب";
    }

    // الرجوع
