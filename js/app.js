// ========================== HEADER FETCH START ======================================

// document.addEventListener("DOMContentLoaded", () => {
//   const header = document.getElementById("header");
//   if (header) {
//     fetch("header.html")
//       .then((res) => res.text())
//       .then((html) => {
//         header.innerHTML = html;
//       });
//   } else {
//     console.error("Element with ID 'header' not found.");
//   }
// });
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


// =============== LANGUAGE ==================
function sortlanguage(lang) {
  const allLangs = ["english", "arabic", "urdu", "french", "german", "chinese", "spanish"];
  allLangs.forEach(l => {
    const ul = document.getElementById(l);
    if (ul) ul.style.display = (l === lang) ? "block" : "none";
  });
}
function sortItems(id, type) {
  const ul = document.getElementById(id);
  const items = Array.from(ul.querySelectorAll('li'));

  let sortedItems;

  if (type === "alpha" || type === "name") {
    // Alphabetically sort
    sortedItems = [...items].sort((a, b) => a.textContent.localeCompare(b.textContent));
  } else if (type === "size") {
    // Sort by length of text
    sortedItems = [...items].sort((a, b) => a.textContent.length - b.textContent.length);
  } else if (type === "serial") {
    // Extract numbers from text like "1. Something"
    sortedItems = [...items].sort((a, b) => {
      const numA = parseInt(a.textContent);
      const numB = parseInt(b.textContent);
      return numA - numB;
    });
  }

  // Reorder list items without emptying the list
  sortedItems.forEach(item => ul.appendChild(item));
}

// =============== LANGUAGE ==================// 

// =================== ENGLISH SUBJECT CODE START ===============
var english_subjects = document.getElementById("english_subjects");
if (english_subjects) {
  fetch("https://subjectsofalquran.com/api/topics")
    .then(e => e.json())
    .then(sub => {
      sub.forEach((dt) => {
        english_subjects.innerHTML += `
    <li class="list-group-item" id="${dt.id}">${dt.topicname}</li>
  
  `
      })
    })
}
// =================== ENGLISH SUBJECT CODE END =================



// ============================== LIBRARY CODE START =====================================
var Library_tabs = document.getElementById("Library_tabs")
var v_pills_tabContent_library = document.getElementById("v-pills-tabContent-library");


if (Library_tabs && v_pills_tabContent_library) {

  fetch("https://subjectsofalquran.com/api/library")
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






















// Elements
const chaptersTabs = document.getElementById("chaptersTabs");
const tabContent = document.getElementById("v-pills-tabContent");
const searchInput = document.getElementById("surah_name");
const languageSelect = document.getElementById("languageSelect");
const erase_btn = document.getElementById("erase_btn");

let currentLanguage = "en"; // default language

// ==========================================================================

fetch("https://subjectsofalquran.com/api/quran/languages")
  .then((res) => res.json())
  .then((data) => {
    const langs = data.available_languages || {};

    let optionsHtml = "";

    Object.entries(langs).forEach(([code, name]) => {

      const selected = code === "en" ? "selected" : "";
      optionsHtml += `<option value="${code}" ${selected}>${name}</option>`;
    });

    if (languageSelect) {
      languageSelect.innerHTML = optionsHtml;
    } else {

    }
  })
// .catch((err) =>);

// ==========================================================================

// Language change event
if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
    fetch("https://subjectsofalquran.com/api/surahs")
      .then((res) => res.json())
      .then(loadSurahTabs);
  });
}

// Load Tabs from API
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
      </li>
    `;

    tabContent.innerHTML += `
      <div class="tab-pane fade ${index === 0 ? "show active" : ""}"
        id="surah${surah.id}" role="tabpanel"
        aria-labelledby="chaptertabs${surah.id}">
        <p class="loading">Click tab to load surah...</p>
      </div>
    `;
  });

  // Auto-load first Surah content
  if (surahs.length > 0) {
    loadSurahContent(surahs[0].id);
  }
}

// Load Surah content by ID
function loadSurahContent(surahId) {
  const pane = document.getElementById(`surah${surahId}`);
  if (pane && !pane.dataset.loaded) {
    pane.innerHTML = `<p>Loading surah...</p>`;

    fetch(`https://subjectsofalquran.com/api/quran/surah/${surahId}?lang=${currentLanguage}`)
      .then((res) => res.text().then((text) => JSON.parse(text)))
      .then((data) => {

  


        const surahName = data[0].surah_name.trim();
        const isTawbah = surahName.includes("التوبة") || surahName.toLowerCase().includes("tawbah");

        const versesHtml = data.map((v) =>
       
          

          `
<div class="d-flex mb-2 flex-lg-row flex-column justify-content-between surah-max-div">
 <div class="col-lg-1 col-12   p-3  mb-lg-2  d-flex flex-lg-column justify-content-lg-center justify-content-around">
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
  <div class="col-lg-11 col-12   p-3  mb-lg-2 ">
  <p class="text-end fs-4 my-2 font_naskh d-flex justify-content-end align-items-center gap-2 flex-wrap">
    

    <!-- Ayah Number Icon (after the Ayah text) -->
    
 <span class="font_naskh d-block text-end" dir="rtl" style="line-height: 2;">
    ${v.ayah_text}
    <span class="position-relative d-inline-flex justify-content-center align-items-center ms-2" style="width: 36px; height: 36px;">
      <img src="assets/images/image/qurnan_verse_icon.png" alt="Ayah Icon" class="img-fluid" style="width: 100%; height: auto;">
      <span class="position-absolute font_naskh" style="font-size: 16px;">
        ${new Intl.NumberFormat('ar-SA', { useGrouping: false }).format(v.ayah_number)}
      </span>
    </span>
  </span>
    
  </p>

  <!-- Translation -->
  <p class="text-start fs-6 my-2">
    ${v[`translation_${currentLanguage}`] || ""}
  </p>
</div>
</div>

        `).join("");

        const bismillahSection = isTawbah ? '' : `
          <div class="position-relative text-center d-flex flex-row justify-content-center align-items-center">
            <img src="assets/images/image/img1.png" alt="Background" class="img-fluid col-lg-7 mx-auto">
            <h3 class="position-absolute start-50 translate-middle-x font_naskh bis_text">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h3>
          </div>
        `;

        pane.innerHTML = `
          <h3 class="text-center font_naskh fs-3">سُورَة ${surahName}</h3>
          <span>No of Surah : ${data[0].surah_number}</span>
          <br>
          <span> ${data.length}</span>

          ${bismillahSection}
          ${versesHtml}
        `;

        pane.dataset.loaded = "true";
      })
      .catch((error) => {
        pane.innerHTML = `<p>Error loading surah. Please try again later.</p>`;
        // console.error("Surah Fetch Error:", error);
      });
  }
}

// Initial Load
fetch("https://subjectsofalquran.com/api/surahs")
  .then((res) => res.json())
  .then(loadSurahTabs);

// Tab click to load content
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("nav_tab_name_Sura")) {
    const button = e.target;
    const surahId = button.getAttribute("data-surahid");
    loadSurahContent(surahId);

    // Smooth scroll
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
      fetch("https://subjectsofalquran.com/api/surahs")
        .then((res) => res.json())
        .then(loadSurahTabs);
    } else {
      fetch(`https://subjectsofalquran.com/api/surahs/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((surahs) => {
          loadSurahTabs(surahs);
          if (surahs.length > 0) {
            loadSurahContent(surahs[0].id);
          }
        })
        .catch((err) => {
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

// =================================================
var library_home_div=document.getElementById("library_home_div")
var search_lib=document.getElementById("search_lib");
var library_data=[];

if(library_home_div){
  fetch("https://subjectsofalquran.com/api/library")
  .then((e)=>e.json())
  .then((data)=>{
library_data=data.data.slice(0,4);
libarayfuntion(library_data)
 })
 }
function libarayfuntion(ty){
 
  
  library_home_div.innerHTML="";
  ty.forEach((dt,index)=>{
   
    
   library_home_div.innerHTML+=`
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 text-center book_div library_div">
        <span class="my-3">${dt.title.split(" ").slice(0,3).join(" ")}..</span>
          <a href="The_List_of_Subjects.html" class="text-decoration-none">
            <img src="${dt.thumbnail_url}" alt="" class="mt-3 img-fluid home_lib_image">
          </a>
        </div>
      `
    
  })
  
  
}
// =======
if(search_lib){
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
var library_div=document.getElementById("library_div")
var search_lib=document.getElementById("search_lib");
var library_data1=[];

if(library_div){
  fetch("https://subjectsofalquran.com/api/library")
  .then((e)=>e.json())
  .then((data)=>{
library_data1=data.data;
libarayfuntion1(library_data1)
 })
 }
function libarayfuntion1(ty){
 
  
  library_div.innerHTML="";
  ty.forEach((dt,index)=>{

    library_div.innerHTML += `
  <div class="  col-sm-4 col-md-3 col-lg-3  text-center book_di library_div position-relative">
    <span class="my-3">${dt.title}</span>
    <a href="The_List_of_Subjects.html" class="text-decoration-none">
      <img src="${dt.thumbnail_url}" alt="" class="col-12 img-fluid home_lib_image position-relative z-2">
    </a>
    <img src="assets/images/banners/shelf.png" class="col-12 img-fluid shelft" alt="Shelf">
     
  </div>
`;


    
  })
  
  
}
// =======
if(search_lib){
search_lib.addEventListener("input", () => {
  var st = search_lib.value.toLowerCase();

  const filtered = library_data1.filter((e) =>
    e.title.toLowerCase().includes(st)
  );

  libarayfuntion1(filtered); // just once
});

}
// =================================================


