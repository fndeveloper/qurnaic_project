
document.addEventListener("DOMContentLoaded", () => {
  var header = document.getElementById("header")
  if (header) {
    fetch("header.html")
      .then(e => e.text())
      .then((e) => {

        header.innerHTML = `
  ${e}
  `
        var dt = document.getElementById("dt");
        var ti = new Date();
        dt.innerHTML = ti.toDateString().split("  ");

      })
  }


  // console.log(ti);
});



// ========================== HEADER FETCH END ======================================
// ========================== FOOTER FETCH START ======================================
var footer = document.getElementById("footer")

if (footer) {
  fetch("footer.html")
    .then(e => e.text())
    .then((e) => {

      footer.innerHTML = `
  ${e}
  `

    })
}

// ========================= share =====================
var share = document.getElementById("share");
if (share) {
  share.addEventListener("click", () => {
    navigator.share({
      url: window.location.href
    })
  })
}

// ========================= share =====================

// =================== ENGLISH SUBJECT CODE START ===============
var english_subjects = document.getElementById("english_subjects");
var pagination_buttons = document.getElementById("pagination_buttons");
if (english_subjects && pagination_buttons) {
  var headers = {
    "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    "Content-Type": "application/json"
  };

  function loadTopics(page) {
    if (!page) page = 1;

    english_subjects.innerHTML = "";
    pagination_buttons.innerHTML = "";

    fetch("https://subjectsofalquran.com/api/topics?page=" + page, {
      method: "GET",
      headers: headers
    })
    .then(res => res.json())
    .then(data => {
      var topics = data.data;
      var totalTopics = topics.length;
      var index = 0;

      function loadNext() {
        if (index >= totalTopics) {
          for (var i = 1; i <= data.last_page; i++) {
            pagination_buttons.innerHTML += `<button class="btn btn-sm btn-primary m-1" onclick="loadTopics(${i})">${i}</button>`;
          }
        } else {
          var topic = topics[index];
          fetch("https://subjectsofalquran.com/api/topicdetails/topic/" + topic.id, {
            method: "GET",
            headers: headers
          })
          .then(res2 => res2.json())
          .then(detailData => {
            var details = detailData.data;
            var joinedDetails = "";

            for (var d = 0; d < details.length; d++) {
              if (details[d].topicdetail && details[d].surah && details[d].surah.id) {
                let sID = details[d].surah.id;
                let sName = details[d].surah.surahname;
                let aNum = details[d].ayah_number;
                let detail = details[d].topicdetail;

                joinedDetails += `
                  <p><span class="fw-bold">Surah:</span> <a href="The_List_of_Subjects_detail.html?surah=${sID}" target="_blank">${sName}</a></p>
                  <p><span class="fw-bold">Ayah Number:  </span> ${detail}</p>
                  <hr>`;
              }
            }

            english_subjects.innerHTML += `
              <div class="accordion mb-3" id="accordion-${topic.id}">
                <div class="accordion-item">
                  <h5 class="accordion-header" id="heading-${topic.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${topic.id}" aria-expanded="false" aria-controls="collapse-${topic.id}">
                      <h5 class="fs-6 m-0">${topic.topicname}</h5>
                    </button>
                  </h5>
                  <div id="collapse-${topic.id}" class="accordion-collapse collapse" aria-labelledby="heading-${topic.id}" data-bs-parent="#accordion-${topic.id}">
                    <div class="accordion-body">${joinedDetails || "<p>No details found.</p>"}</div>
                  </div>
                </div>
              </div>`;

            index++;
            loadNext();
          });
        }
      }

      loadNext();
    })
    .catch(() => {
      english_subjects.innerHTML = "<p style='color:red;'>Error loading topics. Please try again.</p>";
    });
  }

  loadTopics(1);
}

// =================== ENGLISH SUBJECT CODE END =================

// ============================== SEARCH LIBRARY CODE START =================================

// ============================== SEARCH LIBRARY CODE END =================================



// ============================== LIBRARY CODE START =====================================
var Library_tabs = document.getElementById("Library_tabs")
var v_pills_tabContent_library = document.getElementById("v-pills-tabContent-library");


if (Library_tabs && v_pills_tabContent_library) {

  fetch("https://subjectsofalquran.com/api/library", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + "b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", // 👈 Server ko token dikhaya
      "Content-Type": "application/json"
    }
  }
  )
    .then(e1 => e1.json())
    .then((library) => {



      v_pills_tabContent_library.innerHTML = `
     
 <h4 class="fw-normal text-center pb-3">${library.data[0].title}</h4>
      <h6 class="fw-normal">Author : ${library.data[0].author}}</h6>
      <h6 class="fw-normal">Description :${library.data[0].description}</h6>
 <img src=${library.data[0].thumbnail_url} class="img-fluid py-2 col-12 lib_thumbnail" alt="" srcset="">
      
      `
      library.data.forEach((element, index) => {
        const safeData = JSON.stringify(element).replace(/"/g, "&quot;");
        Library_tabs.innerHTML += `
  <button class="nav-link nav_tab_name_Sura btn_of_lib_title ${index === 0 ? "active" : ""} col-11 text-start" 
    data-id="${safeData}" 
    id="v-pills-hom-tab" 
    data-bs-toggle="pill" 
    data-bs-target="#v-pills-hom" 
    type="button" 
    role="tab" 
    aria-controls="v-pills-hom" 
    aria-selected="true">
    ${element.title}
  </button>`;
        // =========

      });


      // ========== library_home_div start =============

      // ========== library_home_div ==================
      // =============== BUTTON START ===============
      // =============== BUTTON START ===============
      var btn_of_lib_title = document.querySelectorAll(".btn_of_lib_title");

      btn_of_lib_title.forEach((s) => {
        s.addEventListener("click", (e) => {
          btn_of_lib_title.forEach((btn) => {
            btn.classList.remove("active");
          });

          e.target.classList.add("active");
          var tdff = JSON.parse(e.target.getAttribute("data-id"));
          v_pills_tabContent_library.innerHTML = `
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
        <h4 class="fw-normal text-center pb-3">${tdff.title}</h4>
        <h6 class="fw-normal">Author : ${tdff.author}</h6>
        <h6 class="fw-normal">Description : ${tdff.description}</h6>
        <img src="${tdff.thumbnail_url}" class="img-fluid py-2 col-12 lib_thumbnail" alt="">
      </div>
    `;
        });
      });
      // =============== BUTTON END =================

      // =============== BUTTON END =================
    })


}
// ============================== LIBRARAY CODE END  =====================================

// ======================== QURAN.HTML CODE START =======================

const chaptersTabs = document.getElementById("chaptersTabs");
const tabContent = document.getElementById("v-pills-tabContent");
const searchInput = document.getElementById("surah_name");
const erase_btn = document.getElementById("erase_btn");

const languageSelect = document.querySelectorAll(".languageSelect");
let currentLanguage = "en"; // default language

if (chaptersTabs && tabContent) {
  // Fetch available languages and populate dropdowns
  fetch("https://subjectsofalquran.com/api/quran/languages", {
    method: "GET",
    headers: {
      "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      const langs = data.available_languages || {};
      let optionsHtml = "";
      Object.entries(langs).forEach(([code, name]) => {
        const selected = code === "en" ? "selected" : "";
        optionsHtml += `<option value="${code}" ${selected}>${name}</option>`;
      });
      languageSelect.forEach(e => e.innerHTML = optionsHtml);
    });

  // Handle language change
  languageSelect.forEach(es => {
    es.addEventListener("change", () => {
      currentLanguage = es.value;
      fetchSurahs();
    });
  });

  // Load tabs from API
  function loadSurahTabs(surahs) {
    chaptersTabs.innerHTML = "";
    tabContent.innerHTML = "";

    surahs.forEach((surah, index) => {
      chaptersTabs.innerHTML += `
        <li class="nav-item w-100 d-flex col-12 my-1" role="presentation">
          <button class="nav-link nav_tab_name_Sura ${index === 0 ? "active" : ""}"
            id="chaptertabs${surah.id}"
            data-bs-toggle="tab"
            data-bs-target="#surah${surah.id}"
            data-surahid="${surah.id}"
            type="button" role="tab">
            ${surah.id}. <span class="pe-3" style="font-size:3px"></span> ${surah.surahname}
          </button>
        </li>`;

      tabContent.innerHTML += `
        <div class="tab-pane fade ${index === 0 ? "show active" : ""}"
          id="surah${surah.id}" role="tabpanel"
          aria-labelledby="chaptertabs${surah.id}">
          <p class="loading">Click tab to load surah...</p>
        </div>`;
    });

    if (surahs.length > 0) {
      loadSurahContent(surahs[0].id);
    }
  }


  // Load Surah content by ID
  function loadSurahContent(surahId) {
    const pane = document.getElementById(`surah${surahId}`);
    if (pane) {
      pane.innerHTML = `<p>Loading surah...</p>`;
      fetch(`https://subjectsofalquran.com/api/quran/surah/${surahId}?lang=${currentLanguage}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.text().then(text => JSON.parse(text)))
        .then(data => {
          const verses = data.data || [];
          const surahName = verses[0]?.surah_name || "";
          const isTawbah = surahName.toLowerCase().includes("tawbah") || surahName.includes("التوبة");
          const bismillahSection = isTawbah ? '' : `
            <div class="position-relative text-center d-flex flex-row justify-content-center align-items-center">
              <img src="assets/images/image/img1.png" alt="Background" class="img-fluid col-lg-7 mx-auto">
              <h3 class="position-absolute start-50 translate-middle-x font_naskh bis_text">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h3>
            </div>`;

          const versesHtml = verses.map(v => `
            <div class="d-flex mb-2 flex-lg-row flex-column justify-content-between surah-max-div">
              <div class="col-lg-1 col-12 p-3 mb-lg-2 d-flex flex-lg-column justify-content-lg-center justify-content-around">
                <span class="fw-light mb-2">${v.surah_number}:${v.ayah_number}</span>
                <button class="cp_bnt mb-2" onclick="Coopy('${v.surah_name}', ${v.ayah_number}, ${v.surah_number}, '${v.ayah_text}', '${v[`translation_${currentLanguage}`]}')">
                  <i class="fa-regular fa-copy"></i>
                </button>
                <button class="cp_bnt mb-2 fw-lighter" onclick="ShareAyah('${v.surah_name}', ${v.ayah_number}, ${v.surah_number}, '${v.ayah_text}', '${v[`translation_${currentLanguage}`]}')">
                  <i class="fas fa-share-alt"></i>
                </button>
                <button class="cp_bnt mb-2 fw-lighter" id="aud" onclick="ReadAyah('${v.id}', this)">
                  <i class="fa-solid fa-play"></i>
                </button>
              </div>
              <div class="col-lg-11 col-12 p-3 mb-lg-2">
                <p class="text-end fs-4 my-2 font_naskh d-flex justify-content-end align-items-center gap-2 flex-wrap">
                  <span class="font_naskh d-inline-flex align-items-center justify-content-end text-end" dir="rtl">
                    <span class="me-2">${v.ayah_text}</span>
                    <span class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 46px; height: 46px;">
                      <img src="assets/images/image/qurnan_verse_icon.png" alt="Ayah Icon" class="img-fluid" style="width: 100%; height: auto;">
                      <span class="position-absolute font_naskh" style="font-size: 18px;">
                        ${new Intl.NumberFormat('ar-SA').format(v.ayah_number)}
                      </span>
                    </span>
                  </span>
                </p>
                <p class="text-start fs-6 my-2">
                  ${v[`translation_${currentLanguage}`] || ""}
                </p>
              </div>
            </div>`).join("");

          pane.innerHTML = `<h3 class="text-center font_naskh fs-3">سُورَة ${surahName}</h3>${bismillahSection}${versesHtml}`;
          pane.dataset.loaded = "true";
        })
        .catch(err => {
          pane.innerHTML = `<p>Error loading surah. Please try again later.</p>`;
          console.error("Surah Fetch Error:", err);
        });
    }
  }

  function fetchSurahs() {
    fetch("https://subjectsofalquran.com/api/surahs", {
      method: "GET",
      headers: {
        "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(loadSurahTabs);
  }

  fetchSurahs(); // Initial Load

  // Tab Click Event
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("nav_tab_name_Sura")) {
      const button = e.target;
      const surahId = button.getAttribute("data-surahid");
      loadSurahContent(surahId);
      setTimeout(() => {
        const pane = document.getElementById(`surah${surahId}`);
        if (pane) {
          const yOffset = -50;
          const y = pane.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 200);
    }
  });

  // Live Search
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim();
      if (query.length === 0) {
        fetchSurahs();
      } else {
        fetch(`https://subjectsofalquran.com/api/surahs/search?q=${encodeURIComponent(query)}`, {
          method: "GET",
          headers: {
            "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(surahs => {
            loadSurahTabs(surahs);
            if (surahs.length > 0) {
              loadSurahContent(surahs[0].id);
            }
          })
          .catch(err => {
            console.error("Search API Error:", err);
            chaptersTabs.innerHTML = `<p class="text-danger px-2">No results found.</p>`;
            tabContent.innerHTML = "";
          });
      }
    });
  }



// Erase button reload
if (erase_btn) {
  erase_btn.addEventListener("click", () => {
    location.reload();
  });
}

function Coopy(a, b, c, d, e) {
  const textToCopy = `
Surah Name: ${a}
Ayah Number: ${b}
Surah Number: ${c}
Ayah Text: ${d}
Translation: ${e}


Website : https://subjectsofalquran.com/
Publish By : Fons Vitae Publications,  Inc.
  `.trim();

  navigator.clipboard.writeText(textToCopy)
    .then(() => {

      setTimeout(() => {
        Swal.fire({
          title: "Verse has been copied to the clipboard!",

          // icon: "success",
          draggable: true,
          customClass: {
            popup: 'cus_copy_pop'
          },
          timer: 2000, // Auto close after 5 seconds
          showConfirmButton: false, // Hide the OK button
          timerProgressBar: true // Optional: show progress bar
        })
      }, 2000);
      console.log(textToCopy);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

function ShareAyah(a, b, c, d, e) {
  const shareData = {
    title: `Surah ${a} - Ayah ${b}`,
    text: `Surah Name: ${a}
Ayah Number: ${b}
Surah Number: ${c}
Ayah Text: ${d}
Translation: ${e}
Website : https://subjectsofalquran.com/
Publish By : Fons Vitae Publications,  Inc.
`


  };
    if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Sharing failed", error));
  } else {
    alert("Web Share API not supported in this browser.");
  }
  }
// ======================== QURAN.HTML CODE END =======================
// 



}

// =================================================
var library_home_div = document.getElementById("library_home_div")
var search_lib = document.getElementById("search_lib");
var library_data = [];

if (library_home_div) {
  fetch("https://subjectsofalquran.com/api/library", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + "b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", // 👈 Server ko token dikhaya
      "Content-Type": "application/json"
    }
  })
    .then((e) => e.json())
    .then((data) => {
    
      
      library_data = data.data.slice(0, 4);
      libarayfuntion(library_data)
    })
}
function libarayfuntion(ty) {


  library_home_div.innerHTML = "";
  ty.forEach((dt, index) => {


    library_home_div.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 text-center book_div library_div_und library_div">
        <span class="my-3">${dt.title.split(" ").slice(0, 3).join(" ")}..</span>
          <a href="library.html" class="text-decoration-none">
            <img src="${dt.thumbnail_url}" alt="" class="mt-3 img-fluid home_lib_image">
          </a>
        </div>
      `

  })


}
// =======
if (search_lib) {
  search_lib.addEventListener("input", () => {
    var st = search_lib.value.toLowerCase();

    const filtered = library_data.filter((e) =>
      e.title.toLowerCase().includes(st)
    );

    libarayfuntion(filtered); // just once
  });

}
// =================================================


// ======================= AUDIO CONTENT IS HERE =====================
let currentAudio = null;
let currentButton = null;

function ReadAyah(id, button) {
  const audioURL = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${id}.mp3`;

  // If same button clicked again → toggle pause
  if (currentAudio && !currentAudio.paused && currentButton === button) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    button.innerHTML = `<i class="fa-solid fa-play"></i>`;
    return;
  }

  // Stop previous audio and reset previous button icon
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentButton) {
      currentButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  }

  // Play new audio
  currentAudio = new Audio(audioURL);
  currentButton = button;

  currentAudio.play().then(() => {
    button.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }).catch(error => {
    alert("Error playing audio: " + error.message);
  });

  // When audio ends → reset play icon
  currentAudio.onended = function () {
    button.innerHTML = `<i class="fa-solid fa-play"></i>`;
  };
}

// ======================= AUDIO CONTENT IS END ======================




// =================================================
var library_div = document.getElementById("library_div");
var search_lib = document.getElementById("search_lib");
var media_type = document.getElementById("media_type");
var paginationNumbers = document.getElementById("paginationNumbers");
var lenght_page = document.getElementById("lenght_page");

var library_data1 = [];
var library_media = [];
var currentPage = 1;
var itemsPerPage = 12;
var currentDataSet = [];

if (library_div && search_lib && media_type) {
  fetch("https://subjectsofalquran.com/api/library", {
    method: "GET",
    headers: {
      "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "Content-Type": "application/json"
    }
  })
  .then((e) => e.json())
  .then((data) => {
    library_data1 = data.data;
    currentDataSet = [...library_data1];
    libarayfuntion1(currentDataSet);
    renderMediaTypes();
  });
}

function renderMediaTypes() {
  setTimeout(() => {
    library_media.forEach((e) => {
     
      
      media_type.innerHTML += `<option class="text-capitalize" value="${e}">${e === "pdf" ? "E-Book":`${e}`} </option>`;
    });
  }, 1000);
}

function libarayfuntion1(dataArray) {
  library_div.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = dataArray.slice(start, end);

  pageItems.forEach((dt) => {
    if (!library_media.includes(dt.media_type)) {
      library_media.push(dt.media_type);
    }
    console.log(dt);
library_div.innerHTML += `
  <div class="col-12 col-lg-4 text-start my-2 book_di library_div position-relative">

 <div class="col-lg-11 col-12 mx-auto library_div_und rounded-3">
    ${dt.media_type === 'video' ? `
      <video controls class="col-12" style="height: 194px; width:100%" >
        <source src="https://subjectsofalquran.com/storage/${dt.file_path}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
        <hr class="col-11 mx-auto ">
     <div class="p-2">
      <h6 class="fw-light">Title : ${dt.title}</h6>
    
      <h6 class="fw-light">Media Type : ${dt.media_type}</h6>


        <a href="https://subjectsofalquran.com/storage/${dt.file_path}" target="_blank" class="bg p-1 px-2 mt-2 col-11 fs-6 mb-2 text-decoration-none rounded-2 ">
          View Video
        </a>
    ` : `
      <img src="${dt.thumbnail_url}" alt="Thumbnail" class="img-fluid home_lib_image z-2">
    `}

    <div class="position-relative">
      ${dt.media_type === 'audio' ? `
       
          <hr class="col-11 mx-auto ">
     <div class="p-2">
      <h6 class="fw-light">Title : ${dt.title}</h6>
    
      <h6 class="fw-light">Media Type : ${dt.media_type}</h6>
 <audio controls class="audio-wrapper   col-11   text-decoration-none rounded-2  ">
          <source src="https://subjectsofalquran.com/storage/${dt.file_path}" type="audio/mpeg">

        </audio>

      ` : dt.media_type === 'pdf' ? `
      <hr class="col-11 mx-auto ">
     <div class="p-2">
      <h6 class="fw-light">Title : ${dt.title}</h6>
    
      <h6 class="fw-light">Media Type : ${dt.media_type}</h6>


      <div class="mb-2">
        <a href="https://subjectsofalquran.com/storage/${dt.file_path}" target="_blank" class="bg p-1 px-2  col-11 fs-6  text-decoration-none rounded-2 ">
          View E-Book
        </a>
      </div>
     </div>
      ` : dt.media_type === 'video' ? `` : `
        <p class="text-muted">Unsupported Media Type</p>
      `}
    </div>
</div>
  </div>
`;

    });
   renderPaginationNumbers(dataArray);
  updatePageInfo(dataArray);
}

function renderPaginationNumbers(dataArray) {
  paginationNumbers.innerHTML = "";
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "btn btn_of_pagin_lib page-btn";
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      libarayfuntion1(currentDataSet);
    });

    paginationNumbers.appendChild(btn);
  }
}

function updatePageInfo(dataArray) {
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);
  lenght_page.innerHTML = `Page: ${currentPage}/${totalPages}`;
}

if (media_type) {
  media_type.addEventListener("change", () => {
    const selectedType = media_type.value;
    currentPage = 1;
    currentDataSet = library_data1.filter(item => item.media_type === selectedType);
    libarayfuntion1(currentDataSet);
  });
}

if (search_lib) {
  search_lib.addEventListener("input", () => {
    const st = search_lib.value.toLowerCase();
    currentPage = 1;
    currentDataSet = library_data1.filter(item =>
      item.title.toLowerCase().includes(st)
    );
    libarayfuntion1(currentDataSet);
  });
}
// =================================================


// ======================= GET SINGLE SURAH IN SUBJECT PAGE START ===========================
var location_of_page = location.search.split("=")[1];
if (location.href.includes("the_list_of_subjects_detail.html")) {
  let currentLanguage_detail = "en";
  var languageSelect_detail = document.getElementById("languageSelect_detail");
  var single_Detail_of_subject=document.getElementById("single_Detail_of_subject");

  // Set languages
  fetch("https://subjectsofalquran.com/api/quran/languages", {
    method: "GET",
    headers: {
      "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      const langs = data.available_languages || {};
      let optionsHtml = "";

      Object.entries(langs).forEach(([code, name]) => {
        const selected = code === "en" ? "selected" : "";
        optionsHtml += `<option value="${code}" ${selected}>${name}</option>`;
      });

      languageSelect_detail.innerHTML = `${optionsHtml}`;
    })
    .catch((err) => {
      console.log(err);
    });

  function fn() {
    fetch(`https://subjectsofalquran.com/api/quran/surah/${location_of_page}?lang=${currentLanguage_detail}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        res.data.forEach((dat) => {
          console.log(dat[`translation_${currentLanguage_detail}`]);

        single_Detail_of_subject.innerHTML += `
  <div class="d-flex mb-2 flex-lg-row flex-column justify-content-between surah-max-div">
    <div class="col-lg-1 col-12 p-3 mb-lg-2 d-flex flex-lg-column justify-content-lg-center justify-content-around">
      <span class="fw-light mb-2">${dat.surah_number}:${dat.ayah_number}</span>
      <button class="cp_bnt mb-2" onclick="Coopy('${dat.surah_name}', ${dat.ayah_number}, ${dat.surah_number}, '${dat.ayah_text}', '${dat[`translation_${currentLanguage_detail}`]}')">
        <i class="fa-regular fa-copy"></i>
      </button>
      <button class="cp_bnt mb-2 fw-lighter" onclick="ShareAyah('${dat.surah_name}', ${dat.ayah_number}, ${dat.surah_number}, '${dat.ayah_text}', '${dat[`translation_${currentLanguage_detail}`]}')">
        <i class="fas fa-share-alt"></i>
      </button>
      <button class="cp_bnt mb-2 fw-lighter" id="aud" onclick="ReadAyah('${dat.id}', this)">
        <i class="fa-solid fa-play"></i>
      </button>
    </div>
    <div class="col-lg-11 col-12 p-3 mb-lg-2">
      <p class="text-end fs-4 my-2 font_naskh d-flex justify-content-end align-items-center gap-2 flex-wrap">
        <span class="font_naskh d-inline-flex align-items-center justify-content-end text-end" dir="rtl">
          <span class="me-2">${dat.ayah_text}</span>
          <span class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 46px; height: 46px;">
            <img src="assets/images/image/qurnan_verse_icon.png" alt="Ayah Icon" class="img-fluid" style="width: 100%; height: auto;">
            <span class="position-absolute font_naskh" style="font-size: 18px;">
              ${new Intl.NumberFormat('ar-SA').format(dat.ayah_number)}
            </span>
          </span>
        </span>
      </p>
      <p class="text-start fs-6 my-2">
        ${dat[`translation_${currentLanguage_detail}`] || ""}
      </p>
    </div>
  </div>
`;

        });
      })
      .catch(err => {
        console.error("Error loading Surah:", err);
        const container = document.getElementById("single_surah_container");
        if (container) container.innerHTML = "<p class='text-danger'>Failed to load surah.</p>";
      });
  }

  // Language change
  languageSelect_detail.addEventListener("change", function () {
    currentLanguage_detail = this.value;
    fn();
  });

  // First load
  fn();
}
// ======================= GET SINGLE SURAH IN SUBJECT PAGE END ===========================
