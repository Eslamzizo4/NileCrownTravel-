const SUPABASE_URL =
  "https://vlqzmqbshqxjycwgiuov.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2kdCMej4UhbTlmEcrqIoRg_nDGXvSeL";

async function loadTrip() {
  const params = new URLSearchParams(window.location.search);
  let id = params.get("id");

if (id === "luxor") {
  id = "1";
}

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const tripPic = document.getElementById("tripPic");

  if (!id) {
    title.textContent = "الرحلة غير موجودة";
    return;
  }

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
      title.textContent = "الرحلة غير موجودة";
      return;
    }

    title.textContent =
      trip.title_ar || trip.title_en || "رحلة";

    description.textContent =
      trip.description_ar || trip.description_en || "";

    price.textContent =
      trip.price_ar || trip.price_en || "السعر غير محدد";

    if (trip.image_ar || trip.image_en) {
      tripPic.style.backgroundImage =
        "url('" +
        (trip.image_ar || trip.image_en) +
        "')";
    }

    const book = document.getElementById("book");

    if (book) {
      const message =
        "مرحباً Nile Crown Travel، أريد حجز رحلة " +
        (trip.title_ar || trip.title_en || "");

      book.href =
        "https://wa.me/201010575983?text=" +
        encodeURIComponent(message);
    }

  } catch (error) {
    console.error(error);
    title.textContent = "حدث خطأ في تحميل الرحلة";
    price.textContent = "تعذر تحميل السعر";
  }
}

loadTrip();
