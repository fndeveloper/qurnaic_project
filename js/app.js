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
if(header){
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

if(footer){
fetch("footer.html")
  .then(e => e.text())
  .then((e) => {

    footer.innerHTML = `
  ${e}
  `

  })
}

// ========================= share =====================
var share=document.getElementById("share");
if(share){
  share.addEventListener("click",()=>{
    navigator.share({
      url:window.location.href
    })
  })
}

// ========================= share =====================

// ======================== SEARCH LIBRARAY START ===================
document.addEventListener("input", () => {
  const libraryDivs = document.querySelectorAll(".library_div");
  const searchValue = document.getElementById("search_lib");
if(libraryDivs && searchValue) {
  libraryDivs.forEach((div) => {
    const head = div.querySelector(".div_library_head");
    if (head) {
      const text = head.textContent.toLowerCase();
      const matches = text.includes(searchValue.value.toLowerCase());
     
      
      // Optional: show/hide based on match
      div.style.display = matches ? "block" : "none";
    }
  });}
});
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


// ======================== SEARCH LIBRARAY END ===================
 
// ========================== FOOTER FETCH END ======================================
// //  QURAN OFFCANS CODE START
// document.addEventListener('DOMContentLoaded', function () {

//   // Quran open karne ka code
//   document.getElementById('openQuranOffcanvas').addEventListener('click', function (e) {
//     e.preventDefault();

//     var mainCanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mainOffcanvas'));
//     if (mainCanvas) {
//       mainCanvas.hide();
//     }

//     setTimeout(function () {
//       var quranCanvas = new bootstrap.Offcanvas(document.getElementById('quranOffcanvas'));
//       quranCanvas.show();
//     }, 100);
//   });

//   // Jab Quran Offcanvas band hoga, main offcanvas ko wapas show karna
//   var quranOffcanvasElement = document.getElementById('quranOffcanvas');
//   quranOffcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
//     var mainCanvas = new bootstrap.Offcanvas(document.getElementById('mainOffcanvas'));
//     mainCanvas.show();
//   });

// });


// QURAN OFFCANS CODE END
// SURAH ALL START
// fetch("https://api.alquran.cloud/v1/surah")
//   .then(response => response.json())
//   .then(data => {
//     const container = document.getElementById("surahContainer");
//     var surah_ul=document.getElementById("surah_ul")

//     document.addEventListener("input",()=>{
//       var search_surah=document.getElementById("search_surah")
//       console.log(search_surah.values);

//     })

//     if(surah_ul){
//   data.data.forEach(e=>{
    
// surah_ul.innerHTML+=`
//   <!-- ============= NAV-LINK START =================== -->

//       <li class="nav-item px-1">
//         <a class="nav-link" href="surah_num.html?surah=${e.number-1}"> <span class="fs-6">${e.number}</span> ${e.englishName}</a>
//       </li>
//       <!-- ============= NAV-LINK END =================== -->
// `
    
//   })
// }
//     if(container) 
    
//     data.data.forEach(surah => {
//       const surahCard = `
//         <div class="col-md-4 mb-3">

// <a href="surah_num.html?surah=${surah.number-1}" class="text-decoration-none text-dark">

//             <div class="border rounded p-3 d-flex justify-content-between align-items-center shadow-sm">
//               <div>
//                 <h5 class="mb-0">🔹 ${surah.number}. ${surah.englishName}</h5>
//                 <small class="text-muted">${surah.englishNameTranslation}</small>
//               </div>
//               <div class="text-end">
//                 <h5 class="mb-0">${surah.name}</h5>
//                 <small class="text-muted">${surah.numberOfAyahs} Ayahs</small>
//               </div>
//             </div>
//           </a>
//         </div>`;
//       container.innerHTML += surahCard;
//     });

//     // Add click event listener to all links
//     document.querySelectorAll(".surah-link").forEach(link => {
//       link.addEventListener("click", function (e) {
//         e.preventDefault(); // Stop default navigation
//         const surahId = this.getAttribute("data-id");
//         console.log("Surah clicked ID:", surahId);
      
//       });
//     });
//   })
//   .catch(error => {
//     console.error("Error fetching Surahs:", error);
//   });

// SURAH ALL END

// JUZ ALL START
// API FOR SINGLE SURAH
// https://api.alquran.cloud/v1/juz/1 


// const container = document.getElementById("juzContainer");

//   for (let index = 0; index < 30; index++) {
//     const juzNumber = index + 1;

//     fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}`)
//       .then(response => response.json())
//       .then(data => {
//         const juzData = data.data;
//         const surahs = Object.values(juzData.surahs);

//         // Create wrapper for each Juz
//         const juzDiv = document.createElement("div");
//         juzDiv.className = "mb-4 p-3 border rounded shadow-sm";

//         // Juz Title
//         const juzTitle = document.createElement("h4");
//         juzTitle.textContent = `📖 Juz ${juzNumber}`;
//         juzDiv.appendChild(juzTitle);

//         // Add all Surahs inside this Juz
//         surahs.forEach(surah => {
//           const surahHTML = `
//             <div class="border-bottom py-2">
//               <a href="surah_num.html?surah=${surah.number}" class="text-decoration-none text-dark">
//                 <strong>${surah.number}. ${surah.englishName}</strong> 
//                 (${surah.englishNameTranslation}) 
//                 - <span class="text-muted">${surah.numberOfAyahs} Ayahs</span>
//                 <div class="text-end fs-4">${surah.name}</div>
//               </a>
//             </div>
//           `;
//           juzDiv.innerHTML += surahHTML;
//         });

//         // Append the whole Juz block to container
//         container.appendChild(juzDiv);
//       })
//       .catch(error => {
//         console.error(`Error fetching Juz ${juzNumber}:`, error);
//       });
//   }


// // JUZ ALL END

// //   SINGLE SURAH START;

// Promise.all([
//     fetch("https://api.alquran.cloud/v1/quran/en.sahih"),
//     fetch("http://api.alquran.cloud/v1/quran/ar.alafasy")
//   ])
//   .then(res => Promise.all(res.map(ress => ress.json())))
//   .then(e => {
//     // console.log(e[1].data.surahs);
    
//     const arabicAyahs = e[1].data.surahs[location.search.split("=")[1]].ayahs;
//     const englishAyahs = e[0].data.surahs[location.search.split("=")[1]].ayahs;
  
//     let combinedAyahsHTML = '';
  
//     for (let i = 0; i < arabicAyahs.length; i++ ) {
   
//       combinedAyahsHTML += `
//         <div class="mb-3 single_surah_div">
//          <span class="fs-6 text-center">${i}</span><br>
//           <h6 class="arabi float-end">${arabicAyahs[i].text} </h6> 
//           <br><br>
//           <h6 class="english">${englishAyahs[i].text}</h6>
//         </div>
//       `;
//     }
  
//     var singlesurahContainer = document.getElementById("singlesurahContainer");
//     singlesurahContainer.innerHTML = `
//       <h2 class="text-center ayah_name">${e[0].data.surahs[location.search.split("=")[1]].name} ${parseInt(location.search.split("=")[1]) + 1}
//  </h2>
//       <div class="col-lg-8 col-11 mx-auto  ">
//         <div class=" ">
//           ${combinedAyahsHTML}
//         </div>
//       </div>
//     `;
//   });
  
//   SINGLE SURAH END
  

// ORDER DIV START
// const ordercontainer = document.getElementById("orderContainer");
// console.log();

// fetch("https://api.quran.com/api/v4/chapters?language=en")
//     .then(res => res.json())
//     .then(data => {
//       const chapters = data.chapters;

//       // Sort by revelation order
//       chapters.sort((a, b) => a.revelation_order - b.revelation_order);

//       chapters.forEach(surah => {
//         const surahCard = `
//           <div class="col-4">
//            <div class="mx-auto  p-2 border border-1 shadow my-3">
//             <strong>${surah.revelation_order}. ${surah.name_simple}</strong>
//             (${surah.name_arabic}) - 
//             <span class="text-muted">${surah.revelation_place}</span>
        
//            </div>
//              </div>
//         `;
//         ordercontainer.innerHTML += surahCard;
//       });
//     })
//     .catch(err => {
//       container.innerHTML = `<p class="text-danger">Error loading data</p>`;
//       console.error(err);
//     });
// // ORDER DIV END



// =================== ENGLISH SUBJECT CODE START ===============
var english_subjects=document.getElementById("english_subjects");
if(english_subjects){
fetch("https://subjectsofalquran.com/api/topics")
.then(e => e.json())
.then(sub=>{
 sub.forEach((dt)=>{
  // console.log(dt);
  english_subjects.innerHTML+=`
    <li class="list-group-item" id="${dt.id}">${dt.topicname}</li>
  
  `
 })
  })
}
  // =================== ENGLISH SUBJECT CODE END =================

  // =================== QURAN SURAH START ============  //
const chaptersTabs = document.getElementById("chaptersTabs");
const tabContent = document.getElementById("v-pills-tabContent");

if (chaptersTabs && tabContent) {
  fetch("https://subjectsofalquran.com/api/surahs")
    .then(res => res.json())
    .then(surahs => {
      surahs.forEach((surah, index) => {
        // ======= Tab Button =========
        chaptersTabs.innerHTML += `
          <li class="nav-item w-100 bg-white d-flex col-12 my-1" role="presentation">
            <button class="nav-link ${index === 0 ? 'active' : ''}"
              id="chaptertabs${surah.id}"
              data-bs-toggle="tab"
              data-bs-target="#surah${surah.id}"
              type="button" role="tab">
              ${surah.id}. <span class="pe-3" style="font-size:3px"> </span> ${surah.surahname}
            </button>
          </li>
        `;

        // ======= Tab Content Placeholder =========
        tabContent.innerHTML += `
          <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" 
            id="surah${surah.id}" role="tabpanel" 
            aria-labelledby="chaptertabs${surah.id}">
            <p>Loading surah...</p>
          </div>
        `;

        // ======= Fetch Surah Verses =========
    fetch(`https://subjectsofalquran.com/api/quran/surah/${surah.id}`)
  .then((res) => {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Not a JSON response:", text);
        throw e;
      }
    });
  })
  .then(surahDetail => {
    // console.log(surahDetail);
    
    const versesHtml = surahDetail.map(v => `
<div class="bg-light p-3 rounded-2 mb-2 single_ayah_div">

      <p class="text-end fs-4 my-2 font_naskh"><strong></strong><span class="text-center aya_time">${v.ayah_number}</span> ${v.ayah_text}</p>
     <br>
      <p class="text-start fs-6 my-2 "><strong></strong> ${v.translation_en}</p>
     <br>
     
      <p class="text-end fs-6 my-2  font_naskh"><strong></strong> ${v.translation_ur}</p>

</div>
    `).join("");

    const tabPane = document.getElementById(`surah${surahDetail[0].surah_number}`);
    if (tabPane) {
      tabPane.innerHTML = `
        <h3 class="text-center font_naskh fs-3"> سُورَة ${surahDetail[0].surah_name}</h3>

        ${versesHtml}
      `;
    }
  })
  .catch(error => {
    console.error("Fetch or parsing error:", error);
  });
;
      });
    });
}