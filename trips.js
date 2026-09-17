const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";


async function loadTrips() {

  const cards = document.querySelector(".cards");

  if (!cards) return;

  cards.innerHTML = "<p>جاري تحميل الرحلات...</p>";

  try {

    const response = await fetch(
      SUPABASE_URL + "/rest/v1/trips?select=*&order=id.asc",
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
      cards.innerHTML = "<p>لا توجد رحلات حاليًا.</p>";
      return;
    }


    cards.innerHTML = trips.map(trip => {

      const title =
        trip.title_ar ||
        trip.title_en ||
        "رحلة";


      const description =
        trip.description_ar ||
        trip.description_en ||
        "";


      const price =
        trip.price_ar ||
        trip.price_en ||
        "السعر غير محدد";


      const image =
        trip.image_ar ||
        trip.image_en ||
        "";


      return `
        <a class="card"
           href="trip.html?id=${encodeURIComponent(trip.id)}">

          <div
            class="pic"
            style="
              background-image:url('${escapeAttribute(image)}');
              background-size:cover;
              background-position:center;
            ">
          </div>

          <div class="card-body">

            <span>Nile Crown Travel</span>

            <h3>${escapeHTML(title)}</h3>

            <p>${escapeHTML(description)}</p>

            <b>السعر: ${escapeHTML(price)}</b>

          </div>

        </a>
      `;

    }).join("");


  } catch (error) {

    console.error(error);

    cards.innerHTML =
      "<p>حدث خطأ في تحميل الرحلات.</p>";

  }
}


function escapeHTML(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

  return String(value)

    .replaceAll("\\", "\\\\")

    .replaceAll("'", "\\'");

}


loadTrips();
