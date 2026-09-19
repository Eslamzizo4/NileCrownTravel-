const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";

const WHATSAPP_NUMBER =
  "201010575983";


// =========================
// تحميل الرحلة
// =========================

async function loadTrip() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  // =========================
  // ID الرحلة
  // =========================

  let id =
    params.get("id");


  // =========================
  // اللغة
  // =========================

  const lang =
    params.get("lang") === "en"
      ? "en"
      : "ar";


  const isEnglish =
    lang === "en";


  // =========================
  // دعم الرابط القديم
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
  // لغة الصفحة
  // =========================

  document.documentElement.lang =
    lang;

  document.documentElement.dir =
    isEnglish
      ? "ltr"
      : "rtl";


  // =========================
  // النصوص حسب اللغة
  // =========================

  if (isEnglish) {

    if (priceLabel) {
      priceLabel.textContent =
        "Price:";
    }

    if (includesTitle) {
      includesTitle.textContent =
        "What's included";
    }

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

    if (book) {
      book.textContent =
        "Book via WhatsApp";
    }

    if (backButton) {
      backButton.textContent =
        "Back to trips";

      backButton.href =
        "trips.html?lang=en";
    }

    if (navHome) {
      navHome.textContent =
        "Home";

      navHome.href =
        "en.html";
    }

    if (navTrips) {
      navTrips.textContent =
        "Trips";

      navTrips.href =
        "trips.html?lang=en";
    }

    if (navContact) {
      navContact.textContent =
        "Contact";

      navContact.href =
        "en.html#contact";
    }

    if (langButton && id) {

      langButton.textContent =
        "AR";

      langButton.href =
        "trip.html?id=" +
        encodeURIComponent(id) +
        "&lang=ar";
    }

  } else {

    if (priceLabel) {
      priceLabel.textContent =
        "السعر:";
    }

    if (includesTitle) {
      includesTitle.textContent =
        "يشمل البرنامج";
    }

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

    if (book) {
      book.textContent =
        "طلب حجز عبر واتساب";
    }

    if (backButton) {
      backButton.textContent =
        "العودة للرحلات";

      backButton.href =
        "trips.html";
    }

    if (navHome) {
      navHome.textContent =
        "الرئيسية";

      navHome.href =
        "index.html";
    }

    if (navTrips) {
      navTrips.textContent =
        "الرحلات";

      navTrips.href =
        "trips.html";
    }

    if (navContact) {
      navContact.textContent =
        "تواصل";

      navContact.href =
        "index.html#contact";
    }

    if (langButton && id) {

      langButton.textContent =
        "EN";

      langButton.href =
        "trip.html?id=" +
        encodeURIComponent(id) +
        "&lang=en";
    }
  }


  // =========================
  // التحقق من ID
  // =========================

  if (!id) {

    if (title) {
      title.textContent =
        isEnglish
          ? "Trip not found"
          : "الرحلة غير موجودة";
    }

    if (description) {
      description.textContent =
        isEnglish
          ? "No trip ID was provided."
          : "لم يتم تحديد رقم الرحلة.";
    }

    return;
  }


  // =========================
  // تحميل الرحلة من Supabase
  // =========================

  try {

    const response =
      await fetch(
        SUPABASE_URL +
        "/rest/v1/trips?id=eq." +
        encodeURIComponent(id) +
        "&select=*",
        {
          method: "GET",

          headers: {
            "apikey":
              SUPABASE_KEY,

            "Authorization":
              "Bearer " +
              SUPABASE_KEY,

            "Content-Type":
              "application/json"
          }
        }
      );


    // =========================
    // فحص الاتصال
    // =========================

    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        "Supabase Error: " +
        response.status +
        " - " +
        errorText
      );
    }


    const trips =
      await response.json();


    // =========================
    // الرحلة غير موجودة
    // =========================

    if (
      !Array.isArray(trips) ||
      trips.length === 0
    ) {

      if (title) {
        title.textContent =
          isEnglish
            ? "Trip not found"
            : "الرحلة غير موجودة";
      }

      if (description) {
        description.textContent =
          isEnglish
            ? "This trip could not be found."
            : "لم نتمكن من العثور على هذه الرحلة.";
      }

      return;
    }


    const trip =
      trips[0];


    // =========================
    // العنوان
    // =========================

    const tripTitle =
      isEnglish
        ? (
            trip.title_en ??
            trip.title_ar ??
            "Trip"
          )
        : (
            trip.title_ar ??
            trip.title_en ??
            "رحلة"
          );


    // =========================
    // الوصف
    // =========================

    const tripDescription =
      isEnglish
        ? (
            trip.description_en ??
            trip.description_ar ??
            ""
          )
        : (
            trip.description_ar ??
            trip.description_en ??
            ""
          );


    // =========================
    // السعر
    // =========================

    const tripPrice =
      isEnglish
        ? (
            trip.price_en ??
            trip.price_ar ??
            "Price not specified"
          )
        : (
            trip.price_ar ??
            trip.price_en ??
            "السعر غير محدد"
          );


    // =========================
    // التصنيف
    // =========================

    const tripCategory =
      isEnglish
        ? (
            trip.category_en ??
            trip.category_ar ??
            ""
          )
        : (
            trip.category_ar ??
            trip.category_en ??
            ""
          );


    // =========================
    // الصورة
    // =========================

    const tripImage =
      trip.image ||
      trip.image_url ||
      trip.image_en ||
      trip.image_ar ||
      "";


    // =========================
    // عرض البيانات
    // =========================

    if (title) {
      title.textContent =
        tripTitle;
    }


    if (description) {
      description.textContent =
        tripDescription;
    }


    if (price) {
      price.textContent =
        tripPrice;
    }


    if (category) {
      category.textContent =
        tripCategory;
    }


    // =========================
    // صورة الرحلة
    // =========================

    if (tripPic) {

      if (tripImage) {

        tripPic.style.backgroundImage =
          "url('" +
          escapeCSSUrl(tripImage) +
          "')";

        tripPic.style.backgroundSize =
          "cover";

        tripPic.style.backgroundPosition =
          "center";

        tripPic.style.backgroundRepeat =
          "no-repeat";

      } else {

        tripPic.style.backgroundImage =
          "none";
      }
    }


    // =========================
    // عنوان المتصفح
    // =========================

    document.title =
      tripTitle +
      " | Nile Crown Travel";


    // =========================
    // WhatsApp
    // =========================

    if (book) {

      const bookingText =
        isEnglish
          ? "Hello Nile Crown Travel, I would like to book: " +
            tripTitle
          : "مرحبًا Nile Crown Travel، أريد حجز رحلة: " +
            tripTitle;


      book.href =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
          bookingText
        );
    }


  } catch (error) {

    console.error(
      "TRIP ERROR:",
      error
    );


    if (title) {
      title.textContent =
        isEnglish
          ? "Failed to load trip"
          : "حدث خطأ في تحميل الرحلة";
    }


    if (description) {
      description.textContent =
        isEnglish
          ? "Please try again later."
          : "برجاء المحاولة مرة أخرى.";
    }
  }
}


// =========================
// حماية رابط الصورة
// =========================

function escapeCSSUrl(value) {

  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}


// =========================
// تشغيل الصفحة
// =========================

loadTrip();
