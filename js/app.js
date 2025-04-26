// //   HEADER COMPONTENT CODE START

// document.addEventListener('DOMContentLoaded', function() {
//   // Fetch the header.html from the same directory as index.html
//   fetch('header.html')  // Directly referencing header.html in the same folder as index.html
//     .then(response => response.text()) // Get the text content of the header.html file
//     .then(data => {
      
      
//       // Insert the fetched HTML content into the #header div
//       document.getElementById('header').innerHTML = data;
//     })
//     });
  
    //   HEADER COMPONTENT CODE END
document.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
    const scrollPercent = (scrollTop / docHeight) * 100;
  
    const topBtn = document.querySelector(".top_btn_1");
  
    if (scrollPercent >= 100) {
      topBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`; // Font Awesome icon
    } else {
      topBtn.innerHTML = `${scrollPercent.toFixed(0)}`;
    }
  });


    
// QURAN OFFCANS CODE START
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('openQuranOffcanvas').addEventListener('click', function (e) {
    e.preventDefault();

    // Close the main offcanvas if it's open
    var mainCanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mainOffcanvas'));
    
    if (mainCanvas) {
      mainCanvas.hide();  // Hide the main offcanvas
    }

    // After a short delay, open the Quran offcanvas
    setTimeout(function () {
      var quranCanvas = new bootstrap.Offcanvas(document.getElementById('quranOffcanvas'));
      quranCanvas.show();  // Show the Quran offcanvas
    }, 300);  // 300ms delay
  });
});

// QURAN OFFCANS CODE END
// SURAH ALL START
fetch("https://api.alquran.cloud/v1/surah")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("surahContainer");
if(container) 
    
    data.data.forEach(surah => {
      const surahCard = `
        <div class="col-md-4 mb-3">

<a href="surah_num.html?surah=${surah.number}" class="text-decoration-none text-dark">

            <div class="border rounded p-3 d-flex justify-content-between align-items-center shadow-sm">
              <div>
                <h5 class="mb-0">🔹 ${surah.number}. ${surah.englishName}</h5>
                <small class="text-muted">${surah.englishNameTranslation}</small>
              </div>
              <div class="text-end">
                <h5 class="mb-0">${surah.name}</h5>
                <small class="text-muted">${surah.numberOfAyahs} Ayahs</small>
              </div>
            </div>
          </a>
        </div>`;
      container.innerHTML += surahCard;
    });

    // Add click event listener to all links
    document.querySelectorAll(".surah-link").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Stop default navigation
        const surahId = this.getAttribute("data-id");
        console.log("Surah clicked ID:", surahId);
      
      });
    });
  })
  .catch(error => {
    console.error("Error fetching Surahs:", error);
  });

// SURAH ALL END

// JUZ ALL START
// API FOR SINGLE SURAH
// https://api.alquran.cloud/v1/juz/1 


const container = document.getElementById("juzContainer");

  for (let index = 0; index < 30; index++) {
    const juzNumber = index + 1;

    fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}`)
      .then(response => response.json())
      .then(data => {
        const juzData = data.data;
        const surahs = Object.values(juzData.surahs);

        // Create wrapper for each Juz
        const juzDiv = document.createElement("div");
        juzDiv.className = "mb-4 p-3 border rounded shadow-sm";

        // Juz Title
        const juzTitle = document.createElement("h4");
        juzTitle.textContent = `📖 Juz ${juzNumber}`;
        juzDiv.appendChild(juzTitle);

        // Add all Surahs inside this Juz
        surahs.forEach(surah => {
          const surahHTML = `
            <div class="border-bottom py-2">
              <a href="surah_num.html?surah=${surah.number}" class="text-decoration-none text-dark">
                <strong>${surah.number}. ${surah.englishName}</strong> 
                (${surah.englishNameTranslation}) 
                - <span class="text-muted">${surah.numberOfAyahs} Ayahs</span>
                <div class="text-end fs-4">${surah.name}</div>
              </a>
            </div>
          `;
          juzDiv.innerHTML += surahHTML;
        });

        // Append the whole Juz block to container
        container.appendChild(juzDiv);
      })
      .catch(error => {
        console.error(`Error fetching Juz ${juzNumber}:`, error);
      });
  }


// JUZ ALL END

//   SINGLE SURAH START;

Promise.all([
    fetch("https://api.alquran.cloud/v1/quran/en.sahih"),
    fetch("http://api.alquran.cloud/v1/quran/ar.alafasy")
  ])
  .then(res => Promise.all(res.map(ress => ress.json())))
  .then(e => {
    // console.log(e[1].data.surahs);
    
    const arabicAyahs = e[1].data.surahs[location.search.split("=")[1]].ayahs;
    const englishAyahs = e[0].data.surahs[location.search.split("=")[1]].ayahs;
  
    let combinedAyahsHTML = '';
  
    for (let i = 0; i < arabicAyahs.length; i++ ) {
   
      combinedAyahsHTML += `
        <div class="mb-3 single_surah_div">
         <span class="fs-6 text-center">${i}</span><br>
          <h6 class="arabi float-end">${arabicAyahs[i].text} </h6> 
          <br><br>
          <h6 class="english">${englishAyahs[i].text}</h6>
        </div>
      `;
    }
  
    var singlesurahContainer = document.getElementById("singlesurahContainer");
    singlesurahContainer.innerHTML = `
      <h2 class="text-center ayah_name">${e[0].data.surahs[location.search.split("=")[1]].name} ${parseInt(location.search.split("=")[1]) + 1}
 </h2>
      <div class="col-lg-8 col-11 mx-auto  ">
        <div class=" ">
          ${combinedAyahsHTML}
        </div>
      </div>
    `;
  });
  
//   SINGLE SURAH END
  

// ORDER DIV START
const ordercontainer = document.getElementById("orderContainer");
console.log();

fetch("https://api.quran.com/api/v4/chapters?language=en")
    .then(res => res.json())
    .then(data => {
      const chapters = data.chapters;

      // Sort by revelation order
      chapters.sort((a, b) => a.revelation_order - b.revelation_order);

      chapters.forEach(surah => {
        const surahCard = `
          <div class="col-4">
           <div class="mx-auto  p-2 border border-1 shadow my-3">
            <strong>${surah.revelation_order}. ${surah.name_simple}</strong>
            (${surah.name_arabic}) - 
            <span class="text-muted">${surah.revelation_place}</span>
        
           </div>
             </div>
        `;
        ordercontainer.innerHTML += surahCard;
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="text-danger">Error loading data</p>`;
      console.error(err);
    });
// ORDER DIV END



