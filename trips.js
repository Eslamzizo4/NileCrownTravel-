const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";


async function loadTrips() {

  const cards = document.querySelector(".cards");

  if (!cards) return;


  // =========================
  // تحديد اللغة
  // =========================

  const params =
    new URLSearchParams(window.location.search);

  const isEnglish =
    params.get("lang") === "en";


  // =========================
  // تحميل
  // =========================

  cards.innerHTML = isEnglish
    ? "<p>Loading trips...</p>"
    : "<p>جاري تحميل الرحلات...</p>";


  try {

    const response = await fetch(
      SUPABASE_URL +
      "/rest/v1/trips?select=*&order=id.asc",
      {
        method: "GET",

        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": "Bearer " + SUPABASE_KEY,
          "Content-Type": "application/json"
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
    // مفيش رحلات
    // =========================

    if (!Array.isArray(trips) || trips.length === 0) {

      cards.innerHTML = isEnglish
        ? "<p>No trips available at the moment.</p>"
        : "<p>لا توجد رحلات حاليًا.</p>";

      return;
    }


    // =========================
    // إنشاء الرحلات
    // =========================

    cards.innerHTML = trips.map(function (trip) {


      // =========================
      // العنوان
      // =========================

      const title = isEnglish
        ? (
            trip.title_en ||
            trip.title_ar ||
            "Trip"
          )
        : (
            trip.title_ar ||
            trip.title_en ||
            "رحلة"
          );


      // =========================
      // الوصف
      // =========================

      const description = isEnglish
        ? (
            trip.description_en ||
            trip.description_ar ||
            ""
          )
        : (
            trip.description_ar ||
            trip.description_en ||
            ""
          );


      // =========================
      // السعر
      // =========================

      const price = isEnglish
        ? (
            trip.price_en ||
            trip.price_ar ||
            "Price not specified"
          )
        : (
            trip.price_ar ||
            trip.price_en ||
            "السعر غير محدد"
          );


      // =========================
      // الصورة
      // =========================

      const image =
        trip.image_en ||
        trip.image_ar ||
        "";


      // =========================
      // رابط الرحلة
      // =========================

      const tripUrl =
        "trip.html?id=" +
        encodeURIComponent(trip.id) +
        "&lang=" +
        (isEnglish ? "en" : "ar");


      // =========================
      // نص السعر
      // =========================

      const priceText = isEnglish
        ? "Price:"
        : "السعر:";


      return `
        <a
          class="card"
          href="${tripUrl}"
        >

          <div
            class="pic"
            style="
              background-image:url('${escapeAttribute(image)}');
              background-size:cover;
              background-position:center;
            "
          >
          </div>

          <div class="card-body">

            <span>
              Nile Crown Travel
            </span>

            <h3>
              ${escapeHTML(title)}
            </h3>

            <p>
              ${escapeHTML(description)}
            </p>

            <b>
              ${priceText}
              ${escapeHTML(price)}
            </b>

          </div>

        </a>
      `;

    }).join("");


  } catch (error) {

    console.error(
      "TRIPS ERROR:",
      error
    );


    cards.innerHTML = isEnglish
      ? `
        <p>
          Failed to load trips.
        </p>
      `
      : `
        <p>
          حدث خطأ في تحميل الرحلات.
        </p>
      `;

  }

}


// =========================
// حماية النصوص
// =========================

function escapeHTML(value) {

  return String(value ?? "")

    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// =========================
// حماية الصورة
// =========================

function escapeAttribute(value) {

  return String(value ?? "")

    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}


// =========================
// تشغيل
// =========================

loadTrips();
