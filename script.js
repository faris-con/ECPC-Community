const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const hasTeam = document.getElementById("hasTeam");
const teamNameWrap = document.getElementById("teamNameWrap");
const teamMembersWrap = document.getElementById("teamMembersWrap");

if (hasTeam) {
  hasTeam.addEventListener("change", () => {
    const show = hasTeam.value === "yes";
    if (teamNameWrap) teamNameWrap.classList.toggle("hidden", !show);
    if (teamMembersWrap) teamMembersWrap.classList.toggle("hidden", !show);
  });
}

const form = document.getElementById("registrationForm") || document.getElementById("teamRegistrationForm");
const success = document.getElementById("successState");
const newRegistration = document.getElementById("newRegistration");

if (form && success) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;

    // TODO: Replace this URL with your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzc-J_JrFIJyAfpAAZyvLTddGfPEteo4R-H-w6ripDQrn_vs6on4xxErdaH6z-KsMd-/exec';

    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(response => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        form.classList.add("hidden");
        success.classList.remove("hidden");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(error => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        console.error('Error!', error.message);
        alert('There was an error submitting the form. Please try again.');
      });
  });

  if (newRegistration) {
    newRegistration.addEventListener("click", () => {
      form.reset();
      if (teamNameWrap) teamNameWrap.classList.add("hidden");
      if (teamMembersWrap) teamMembersWrap.classList.add("hidden");
      success.classList.add("hidden");
      form.classList.remove("hidden");
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
