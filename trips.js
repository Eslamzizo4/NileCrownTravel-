const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";


async function loadTrips() {

  const cards = document.querySelector(".cards");

  if (!cards) return;

  cards.innerHTML = "<p>جاري تحميل الرحلات...</p>";

  // معرفة لغة الصفحة
  const isEnglish =
    document.documentElement.lang.toLowerCase().startsWith("en");

  try {

    const response = await fetch(
      SUPABASE_URL +
      "/rest/v1/trips?select=*&order=id.asc",
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

    if (!trips.length) {

      cards.innerHTML = isEnglish
        ? "<p>No trips available at the moment.</p>"
        : "<p>لا توجد رحلات حاليًا.</p>";

      return;
    }


    cards.innerHTML = trips.map(trip => {

      // =========================
      // اختيار اللغة
      // =========================

      const title = isEnglish
        ? (trip.title_en || trip.title_ar || "Trip")
        : (trip.title_ar || trip.title_en || "رحلة");


      const description = isEnglish
        ? (trip.description_en || trip.description_ar || "")
        : (trip.description_ar || trip.description_en || "");


      const price = isEnglish
        ? (trip.price_en || trip.price_ar || "Price not specified")
        : (trip.price_ar || trip.price_en || "السعر غير محدد");


      const image =
        trip.image_en ||
        trip.image_ar ||
        "";


      // =========================
      // رابط صفحة التفاصيل
      // =========================

      const tripUrl =
        "trip.html?id=" +
        encodeURIComponent(trip.id) +
        "&lang=" +
        (isEnglish ? "en" : "ar");


      return `

        <a class="card"
           href="${tripUrl}">

          <div
            class="pic"
            style="
              background-image:url('${escapeAttribute(image)}');
              background-size:cover;
              background-position:center;
            ">
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
              ${
                isEnglish
                  ? "Price: "
                  : "السعر: "
              }

              ${escapeHTML(price)}
            </b>

          </div>

        </a>

      `;

    }).join("");


  } catch (error) {

    console.error(error);

    cards.innerHTML = isEnglish
      ? "<p>Failed to load trips.</p>"
      : "<p>حدث خطأ في تحميل الرحلات.</p>";

  }

}


// =========================
// حماية النصوص
// =========================

function escapeHTML(value) {

  return String(value)

    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// =========================
// حماية رابط الصورة
// =========================

function escapeAttribute(value) {

  return String(value)

    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");

}


// تشغيل تحميل الرحلات

loadTrips();
