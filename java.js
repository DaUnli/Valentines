// first
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

function moveButton() {
  const button = document.getElementById("noButton");
  const container = document.querySelector(".buttons");

  const maxX = container.clientWidth - button.offsetWidth;
  const maxY = container.clientHeight - button.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  button.style.left = x + "px";
  button.style.top = y + "px";
}


// second

const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
});
