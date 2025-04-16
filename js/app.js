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
  