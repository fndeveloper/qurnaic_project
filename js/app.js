// ========== THIS CODE IS HERE FOR SHOW A TIME IN HEADER TOP LEFT START =========
var dt = document.getElementById("dt");
if (dt) {
  var ti = new Date();
  dt.innerHTML = ti.toDateString().split("  ");
}
// ========== THIS CODE IS HERE FOR SHOW A TIME IN HEADER TOP LEFT END =========


// ========== THIS CODE IS HERE FOR SHARE BUTTON IN EACH PAGE START ========
var share = document.getElementById("share");
if (share) {
  share.addEventListener("click", () => {
    navigator.share({
      url: window.location.href
    })
  })
}

// ========== THIS CODE IS HERE FOR SHARE BUTTON IN EACH PAGE END ========
















// ============================== 📁 INDEX.HTML CODE START 📁 ==============================================================

// ==========  HOME PAGE LIBRARY CODE START ==========

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
//  =========== ALL DATA OF LIBRAY IS HERE START ===========
function libarayfuntion(ty) {


  library_home_div.innerHTML = "";
  ty.forEach((dt, index) => {




    library_home_div.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 text-center book_div library_div_und library_div">
        <span class="my-3">${dt.title.split(" ").slice(0, 3).join(" ")}..</span>
          <a href="library.html" class="text-decoration-none text-dark">
            <img src="${encodeURI(dt.thumbnail_url)}" alt="" class="mt-3 img-fluid home_lib_image">
          </a>
        </div>
      `

  })


}
//   ========== ALL DATA OF LIBRAY IS HERE END  ==========

//   ========== HOME SEARCH LIBRAY IS HERE START ========== 

if (search_lib) {
  search_lib.addEventListener("input", () => {
    var st = search_lib.value.toLowerCase();

    const filtered = library_data.filter((e) =>
      e.title.toLowerCase().includes(st)
    );

    libarayfuntion(filtered);
  });

}
//   ========== HOME SEARCH LIBRAY IS HERE END ========== 


// ========== HOME PAGE LIBRARY CODE END   ==========

// ============================== 📁 INDEX.HTML CODE END  📁 ==============================================================


















// ============================== 📁 QURAN.HTML CODE START  📁 ==============================================================

const quran_tab_div = document.getElementById("quran_tab_div");
const tabContent = document.getElementById("v-pills-tabContent");
const searchInput = document.getElementById("surah_name");
const erase_btn = document.getElementById("erase_btn");
const languageSelect = document.querySelectorAll(".languageSelect");

let currentLanguage = "en";
const ayahLimit = 40;

if (quran_tab_div && tabContent) {
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

  languageSelect.forEach(es => {
    es.addEventListener("change", () => {
      currentLanguage = es.value;
      fetchSurahs();
    });
  });

  function loadSurahTabs(surahs) {
    quran_tab_div.innerHTML = "";
    tabContent.innerHTML = "";

    surahs.forEach((surah, index) => {
      quran_tab_div.innerHTML += `
            <li class="nav-item w-100 d-flex col-12 my-1" role="presentation">
              <button class="nav-link nav_tab_name_Sura ${index === 0 ? "active" : ""}"
                id="chaptertabs${surah.id}"
                data-bs-toggle="tab"
                data-bs-target="#surah${surah.id}"
                data-surahid="${surah.id}"
                type="button" role="tab">
                ${surah.id}. ${surah.surahname}
              </button>
            </li>`;

      tabContent.innerHTML += `
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}"
              id="surah${surah.id}" role="tabpanel"
              aria-labelledby="chaptertabs${surah.id}">
              <div id="ayahContent${surah.id}"></div>
              <div id="ayahPagination${surah.id}" class="mt-3"></div>
            </div>`;
    });

    if (surahs.length > 0) {
      loadSurahContent(surahs[0].id, 1);
    }
  }

  function loadSurahContent(surahId, page = 1) {
    const ayahContainer = document.getElementById(`ayahContent${surahId}`);
    const paginationDiv = document.getElementById(`ayahPagination${surahId}`);
    ayahContainer.innerHTML = `<p>Loading ayahs...</p>`;

    fetch(`https://subjectsofalquran.com/api/quran/surah/${surahId}?lang=${currentLanguage}&page=${page}&limit=${ayahLimit}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      
      .then(data => {
        const verses = data.data || [];
        const surahName = verses[0]?.surah_name || "";

        const isTawbah = surahName.toLowerCase().includes("tawbah") || surahName.includes("التوبة");
        const bismillahSection = isTawbah ? '' : `
            <div class="position-relative text-center d-flex flex-row justify-content-center align-items-center">
              <img src="assets/images/image/img1.png" alt="Background" class="img-fluid col-lg-7 mx-auto">
              <h3 class="position-absolute start-50 translate-middle-x font_naskh  bis_text">
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
                    <span class="me-2 font_naskh ">${v.ayah_text}</span>
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

        ayahContainer.innerHTML = `<h2  class='text-center mb-3 font_naskh '>سُورَة ${surahName}</h2>  ${bismillahSection}${versesHtml}`;
        renderAyahPagination(surahId, data.last_page, page);
      })
      .catch(err => {
        ayahContainer.innerHTML = `<p class='text-danger'>Error loading ayahs. Please try again later.</p>`;
      });
  }
  // ========== PAGINATION CODE START =============

  function renderAyahPagination(surahId, lastPage, currentPage) {
    const paginationDiv = document.getElementById(`ayahPagination${surahId}`);
    let paginationHTML = `<nav><ul class="pagination justify-content-center">`;
    for (let i = 1; i <= lastPage; i++) {
      paginationHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
              <button class="page-link" onclick="loadSurahContent(${surahId}, ${i})">${i}</button>
            </li>`;
    }
    paginationHTML += `</ul></nav>`;
    paginationDiv.innerHTML = paginationHTML;
  }
  // ========== PAGINATION CODE END =============


// ========== FETCH ALL SURAH CODE START =============
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
// ========== FETCH ALL SURAH CODE END =============

// =========== WHEN CLICK ON A SURAH IT'S OPEN FROM A TOP CODE START ===============

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("nav_tab_name_Sura")) {
      const button = e.target;
      const surahId = button.getAttribute("data-surahid");
      loadSurahContent(surahId, 1);
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

// =========== WHEN CLICK ON A SURAH IT'S OPEN FROM A TOP CODE END ===============

// =========== SEARCH SURAH CODE START ===============

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
              loadSurahContent(surahs[0].id, 1);
            }
          })
          .catch(err => {
            quran_tab_div.innerHTML = `<p class="text-danger px-2">No results found.</p>`;
            tabContent.innerHTML = "";
          });
      }
    });
  }

// =========== SEARCH SURAH CODE END ===============

// =========== ERASE BUTTON CODE START ===============

  if (erase_btn) {
    erase_btn.addEventListener("click", () => {
      location.reload();
    });
  }
// =========== ERASE BUTTON CODE START ===============

  fetchSurahs();
}

function Coopy(a, b, c, d, e) {
  const textToCopy = `Surah Name: ${a}\nAyah Number: ${b}\nSurah Number: ${c}\nAyah Text: ${d}\nTranslation: ${e}\n\nWebsite : https://subjectsofalquran.com/\nPublish By : Fons Vitae Publications,  Inc.`;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      Swal.fire({
        title: "Verse has been copied to the clipboard!",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      });
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

function ShareAyah(a, b, c, d, e) {
  const shareData = {
    title: `Surah ${a} - Ayah ${b}`,
    text: `Surah Name: ${a}\nAyah Number: ${b}\nSurah Number: ${c}\nAyah Text: ${d}\nTranslation: ${e}\nWebsite : https://subjectsofalquran.com/\nPublish By : Fons Vitae Publications,  Inc.`
  };
  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Sharing failed", error));
  } else {
    alert("Web Share API not supported in this browser.");
  }
}
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

// ============================== 📁 QURAN.HTML CODE END  📁 ==============================================================


// ============================== 📁 LIBRARY.HTML CODE START  📁 ==============================================================



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


      media_type.innerHTML += `<option class="text-capitalize" value="${e}">${e === "pdf" ? "E-Book" : `${e}`} </option>`;
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


        <a href="https://subjectsofalquran.com/storage/${dt.file_path}" target="_blank" class="bg p-1 px-2 mt-2 col-11 fs-6 mb-2 text-decoration-none text-white rounded-2 ">
          View Video
        </a>
    ` : `
      <img src="${encodeURI(dt.thumbnail_url)}" alt="Thumbnail" class="img-fluid home_lib_image z-2">
    `}

    <div class="position-relative">
      ${dt.media_type === 'audio' ? `
       
          <hr class="col-11 mx-auto ">
     <div class="p-2">
      <h6 class="fw-light">Title : ${dt.title}</h6>
    
      <h6 class="fw-light">Media Type : ${dt.media_type}</h6>
 <audio controls class="audio-wrapper   col-11   text-decoration-none text-dark rounded-2  ">
          <source src="https://subjectsofalquran.com/storage/${dt.file_path}" type="audio/mpeg">

        </audio>

      ` : dt.media_type === 'pdf' ? `
      <hr class="col-11 mx-auto ">
     <div class="p-2">
      <h6 class="fw-light">Title : ${dt.title}</h6>
    
      <h6 class="fw-light">Media Type : ${dt.media_type}</h6>


      <div class="mb-2">
        <a href="https://subjectsofalquran.com/storage/${dt.file_path}" target="_blank" class="bg p-1 px-2  col-11 fs-6  text-decoration-none text-dark rounded-2 ">
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







// ============================== 📁 LIBRARY.HTML CODE END  📁 ==============================================================


// ============================== 📁 The_List_of_Subjects.html CODE START  📁 ==============================================================

// ===================  SUBJECT CODE START ===============

const list_of_subjects = document.getElementById("list_of_subjects");
const pagin_bnt_of_subject = document.getElementById("pagin_bnt_of_subject");

const search_subject_here = document.getElementById("search_subject_here");
let page = 1;
if (list_of_subjects && pagin_bnt_of_subject) {
  const headers = {
    "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    "Content-Type": "application/json",
  };
  // 🟡 Search button
  document.getElementById("searchbtn_subje").addEventListener("click", () => {
    const query = searchBox.value.trim();
    pages(1, query);
  });
  function pages(params = 1, query = "") {
    page = params;
    const isSearching = query !== "";

    const apiUrl = isSearching
      ? `https://subjectsofalquran.com/api/topics/search?q=${query}&page=${page}`
      : `https://subjectsofalquran.com/api/topics?page=${page}`;

    fetch(apiUrl, {
      headers: {
        Authorization: "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => {


        list_of_subjects.innerHTML = "";
        pagin_bnt_of_subject.innerHTML = "";


        datas.data.forEach((element) => {
          console.log(element);
          
          list_of_subjects.innerHTML += `

          
          <div class="accordion mb-2">
            <div class="accordion-item">
            <a href="the_list_of_subjects_detail.html?subject=${element.id}"   class="text-decoration-none text-dark">
              <h4 class="accordion-header">
   
                <button class="accordion-button collapsed text-wrap text-break" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse${element.id}"
                  aria-expanded="false"
                  aria-controls="flush-collapse${element.id}">
              <span class="pe-3">${Number(element.topiccode)}</span>
                  ${element.topicname}
                </button>
                  </a>
              </h4>
            </div>
          </div>
        `;
        });


        for (let i = 1; i <= datas.last_page; i++) {
          pagin_bnt_of_subject.innerHTML += `
    <button class="btn m-1 btn_pagin ${i === page ? ' active' : ''}" onclick="pages(${i}, '${query}')">
      ${i}
    </button>`;
        }

      })
      .catch((err) => console.log("API ERROR:", err));
  }

  pages();

}

// ============================== 📁 The_List_of_Subjects.html CODE END  📁 ==============================================================



// ============================== 📁 the_list_of_subjects_detail.html? CODE START  📁 ==============================================================



// ======================= GET SINGLE SURAH IN SUBJECT PAGE START ===========================
var location_of_page = location.search.split("=")[1];


if (location.href.includes("the_list_of_subjects_detail.html")) {
  let currentLanguage_detail = "en";
  var languageSelect_detail = document.getElementById("languageSelect_detail");
  var single_Detail_of_subject = document.getElementById("single_Detail_of_subject");
  var read_subject_detail = document.getElementById("read_subject_detail");

  // Set languages
  fetch(`https://subjectsofalquran.com/api/topicdetails/topic/${location_of_page}`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then((single_topic) => {



      read_subject_detail.addEventListener("click", () => {
        window.open(`the_list_of_subjects_read.html?read=${single_topic.data[0].topic_id}`, '_blank');
      })
      if (single_topic.data.length > 0) {
        const body_of_detail = single_topic.data.map((e, index) =>




          `
    <div class="d-flex col-12">
    
<p class="col-2 num_css">${e.surahcode} : </p>
<p class="num_css "> ${e.topicdetail} <span class=""> </span> </p>


</div>
    `).join("");


        single_Detail_of_subject.innerHTML = `

        <!-- ======================= SUBJECT NAME START ====================== -->
              <div class="col-lg-8 mx-auto col-12"> 
              
                <div class="position-relative text-center d-flex flex-row justify-content-center align-items-center">
              <img src="assets/images/image/img1.png" alt="Background" class="img-fluid col-lg-9 mx-auto">
              <h3 class="position-absolute start-50 translate-middle-x font_naskh  bis_text p-3">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h3>
            </div>
              <h3 class="text-center fs-2  py-2 font_naskh">
    ${single_topic.data[0].topic.topicname}
              </h3>
              </div>



 
<!-- ======================= SUBJECT NAME END ====================== -->

<!-- ======================= SUBJECT SERIAL START ====================== -->

<div class="d-flex flex-row  col-12 ">
  <p class="col-2 ">Srl : </p>
  <p class="pe-2  "> ${single_topic.data[0].topiccode}</p>
</div>
<!-- ======================= SUBJECT SERIAL START ====================== -->
 <div class="d-flex col-12">
  <p class="col-2 ">Surah No:</p>
  <p class="pe-2 ">Ayah No:</p>

 </div>
<!-- ======================= SUBJECT DETIAL LOOP START ====================== -->

${body_of_detail

          }
<!-- ======================= SUBJECT DETIAL LOOP END ====================== -->
        `

      }
      else {
        single_Detail_of_subject.innerHTML = `
   This Subject are not Uploaded 
   `
      }


    })

    .catch((err) => {
      console.log(err);
      single_Detail_of_subject.innerHTML = `Wait Your content is ready `
    });

}


// ============================== 📁 the_list_of_subjects_detail.html? CODE END  📁 ==============================================================



// ============================== 📁 the_list_of_subjects_read.html CODE START 📁 ==============================================================

var location_of_page_read = location.search.split("=")[1];

if (location.href.includes("the_list_of_subjects_read.html")) {
  const languageSelectElement = document.getElementById("languageSelect_read");
  const single_Detail_of_subject_read = document.getElementById("single_Detail_of_subject_read");
  let currentLanguage_read = "en";

  async function fetchAndRenderAyahs() {
    single_Detail_of_subject_read.innerHTML = `<p class="text-center text-muted">⏳ Loading Ayahs, please wait...</p>`;

    const res = await fetch(`https://subjectsofalquran.com/api/topicdetails/topic/${location_of_page_read}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        "Content-Type": "application/json"
      }
    });
    const single_topic = await res.json();

    if (single_topic.data.length > 0) {
      const topicAyahsWithSurah = single_topic.data.flatMap(item => {
        const ayahList = item.topicdetail
          .split(/[\s,]+/)
          .filter(Boolean)
          .map(num => String(Number(num)));

        return ayahList.map(ayah => ({
          ayah,
          surah: item.surahcode || "001",
          topic: item.topic.topicname
        }));
      });

      topicAyahsWithSurah.sort((a, b) => {
        const surahA = Number(a.surah);
        const surahB = Number(b.surah);
        if (surahA !== surahB) return surahA - surahB;
        return Number(a.ayah) - Number(b.ayah);
      });

      single_Detail_of_subject_read.innerHTML = `
        <div class="col-lg-8 mx-auto col-12"> 
          <div class="position-relative text-center d-flex flex-row justify-content-center align-items-center">
            <img src="assets/images/image/img1.png" alt="Background" class="img-fluid col-lg-9 mx-auto">
            <h3 class="position-absolute start-50 translate-middle-x font_naskh bis_text p-3">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h3>
          </div>
        </div>

        <h4 class="text-center fs-2  py-2 font_naskh">${topicAyahsWithSurah[0].topic}</h4>
        <div id="ayahContainer"></div>
      `;

      const ayahContainer = document.getElementById("ayahContainer");

      for (const { surah, ayah } of topicAyahsWithSurah) {
        const cleanSurah = String(Number(surah));
        const url = `https://subjectsofalquran.com/api/quran/surah/${cleanSurah}/ayah/${ayah}`;

        try {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
              "Content-Type": "application/json"
            }
          });

          if (!res.ok) {
            console.error(` Could not load Ayah ${ayah} of Surah ${cleanSurah}`);
            ayahContainer.innerHTML += `<div class="alert alert-warning"> Could not load Ayah ${ayah} of Surah ${cleanSurah}</div>`;
            continue;
          }

          const verse = await res.json();

          ayahContainer.innerHTML += `
            <div class="d-flex mb-2 flex-lg-row flex-column justify-content-between surah-max-div">
              <div class="col-lg-1 col-12 p-3 mb-lg-2 d-flex flex-lg-column justify-content-lg-center justify-content-around">
                <span class="fw-light mb-2">${verse.surah_number}:${verse.ayah_number}</span>
                <button class="cp_bnt mb-2" onclick="Coopy('${verse.surah_name}', ${verse.ayah_number}, ${verse.surah_number}, '${verse.ayah_text}', '${verse[`translation_${currentLanguage_read}`]}')">
                  <i class="fa-regular fa-copy"></i>
                </button>
                <button class="cp_bnt mb-2 fw-lighter" onclick="ShareAyah('${verse.surah_name}', ${verse.ayah_number}, ${verse.surah_number}, '${verse.ayah_text}', '${verse[`translation_${currentLanguage_read}`]}')">
                  <i class="fas fa-share-alt"></i>
                </button>
                <button class="cp_bnt mb-2 fw-lighter" onclick="ReadAyah('${verse.id}', this)">
                  <i class="fa-solid fa-play"></i>
                </button>
              </div>
              <div class="col-lg-11 col-12 p-3 mb-lg-2">
                <p class="text-end fs-4 my-2 font_naskh d-flex justify-content-end align-items-center gap-2 flex-wrap">
                  <span class="font_naskh d-inline-flex align-items-center justify-content-end text-end" dir="rtl">
                    <span class="me-2 font_naskh">${verse.ayah_text}</span>
                    <span class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 46px; height: 46px;">
                      <img src="assets/images/image/qurnan_verse_icon.png" alt="Ayah Icon" class="img-fluid" style="width: 100%; height: auto;">
                      <span class="position-absolute font_naskh" style="font-size: 18px;">
                        ${new Intl.NumberFormat('ar-SA').format(verse.ayah_number)}
                      </span>
                    </span>
                  </span>
                </p>
                <p class="text-start fs-6 my-2">
                  ${verse[`translation_${currentLanguage_read}`] || ""}
                </p>
              </div>
            </div>
          `;
        } catch (err) {
          console.error(` Error fetching Surah ${cleanSurah} Ayah ${ayah}:`, err);
        }

        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } else {
      single_Detail_of_subject_read.innerHTML = `<div class="alert alert-info"> This subject is not uploaded yet.</div>`;
    }
  }

  // Fetch languages and populate dropdown
  fetch("https://subjectsofalquran.com/api/quran/languages", {
    method: "GET",
    headers: {
      "Authorization": "Bearer b1e2f3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      const langug = Object.entries(data.available_languages);
      langug.forEach(element => {
        const selected = element[0] === "en" ? "selected" : "";
        languageSelectElement.innerHTML += `<option value="${element[0]}" ${selected}>${element[1]}</option>`;
      });
    });

  // Handle language change
  languageSelectElement.addEventListener("change", (e) => {
    currentLanguage_read = e.target.value;
    fetchAndRenderAyahs(); // ✅ re-fetch on language change
  });

  // First load
  fetchAndRenderAyahs();
}

// ============================== 📁 the_list_of_subjects_read.html CODE END  📁 ==============================================================
 