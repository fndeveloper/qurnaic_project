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
fetch("https://api.alquran.cloud/v1/surah")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("surahContainer");

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
        // optional: redirect if needed
        // window.location.href = `/surah/${surahId}`;
      });
    });
  })
  .catch(error => {
    console.error("Error fetching Surahs:", error);
  });

  