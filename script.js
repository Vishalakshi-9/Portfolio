// Contact form submit
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseElem = document.getElementById('formResponse');
  
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
  
      const data = await res.json();
  
      if (data.success) {
        responseElem.textContent = 'Thanks! Your message was sent.';
        this.reset();
      } else {
        responseElem.textContent = data.error || 'Something went wrong.';
      }
    } catch (err) {
      responseElem.textContent = 'Error sending message.';
    }
  });
  
  // Project modal
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalImage = document.getElementById("modalImage"); // 👈 new
  const closeButton = document.querySelector(".close-button");
  const githubBtn = document.getElementById("githubBtn");
  const liveServerBtn = document.getElementById("liveServerBtn");
  
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.title;
      modalDescription.textContent = card.dataset.description;
  
      // Set image
      const imageSrc = card.dataset.image;
      if (imageSrc) {
        modalImage.src = imageSrc;
        modalImage.style.display = "block";
      } else {
        modalImage.style.display = "none";
      }
  
      // Set GitHub button
      const githubLink = card.dataset.github;
      githubBtn.style.display = githubLink ? "inline-block" : "none";
      githubBtn.onclick = githubLink ? () => window.open(githubLink, "_blank") : null;
  
      // Set Live button
      const liveLink = card.dataset.live;
      liveServerBtn.style.display = liveLink ? "inline-block" : "none";
      liveServerBtn.onclick = liveLink ? () => window.open(liveLink, "_blank") : null;
  
      modal.classList.remove("hidden");
    });
  });
  
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
  
  