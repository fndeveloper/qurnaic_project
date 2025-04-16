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

//   HEADER COMPONTENT CODE START

fetch("header.html")
.then(res => res.text())
.then(data=>{
document.getElementById("header").innerHTML=`${data}`   
})
//   HEADER COMPONTENT CODE END
// SURAH ALL START
fetch("https://api.alquran.cloud/v1/surah")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("surahContainer");
if(container) 
    console.log(data.data);
    
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

//   SINGLE SURAH START;

Promise.all([
    fetch("https://api.alquran.cloud/v1/quran/en.sahih"),
    fetch("http://api.alquran.cloud/v1/quran/ar.alafasy")
  ])
  .then(res => Promise.all(res.map(ress => ress.json())))
  .then(e => {
    console.log(e[1].data.surahs);
    
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
  