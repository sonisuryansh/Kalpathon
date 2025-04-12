// 💬 Chat Button Action
function openChat() {
    alert("Chatbot coming soon! 🤖 We're working on something awesome.");
  }
  
  // 🌐 Language Switcher (mock)
  function switchLang(lang) {
    alert(`Switched to ${lang === 'hi' ? 'हिन्दी' : 'English'} (UI will update in full version)`);
  }
  
  // 📊 Animated Counter
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
  
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace(/,/g, '');
        const speed = 50;
        const increment = Math.ceil(target / speed);
  
        if (count < target) {
          counter.innerText = (count + increment).toLocaleString();
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
  
      updateCount();
    });
  });
  
  // 🧠 Form Submission Logic
  document.getElementById("eligibilityForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const income = document.getElementById("income").value;
    const region = document.getElementById("region").value;
    const education = document.getElementById("education").value;
  
    alert(`✅ Eligibility Check:\n\nIncome: ₹${income}\nRegion: ${region}\nEducation: ${education}\n\n🎯 Matching schemes will be shown in future builds.`);
  });
  
  
  // Language switcher (mock)
  function switchLang(lang) {
  alert(`Switched to ${lang === 'hi' ? 'हिन्दी' : 'English'} (UI will update in full version)`);
  }
  
  // Counter animation
  document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".counter").forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText.replace(/,/g, '');
      const speed = 50;
      const inc = Math.ceil(target / speed);
      if (current < target) {
        counter.innerText = (current + inc).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });
  
  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero
  gsap.from(".hero-title", { duration: 1, y: -50, opacity: 0 });
  gsap.from(".hero-desc", { duration: 1, y: 30, opacity: 0, delay: 0.3 });
  
  // Animate sections
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });
  
  // Animate cards individually
  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1
    });
  });
  });
  
  // Form submission
  document.getElementById("eligibilityForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const income = document.getElementById("income").value;
  const region = document.getElementById("region").value;
  const education = document.getElementById("education").value;
  
  alert(`✅ Eligibility Check:\n\nIncome: ₹${income}\nRegion: ${region}\nEducation: ${education}\n\n🎯 Matching schemes will be shown in future builds.`);
  });
  
  // Animate schemes on scroll (basic fade-in)
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".scheme-card");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
  
    cards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });
  });
  // Fade-in on scroll
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".scheme-card");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
  
    cards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });
  });


window.onscroll = function () {
    const btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
  }



  document.getElementById("eligibilityForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const income = document.getElementById("income").value;
    const region = document.getElementById("region").value;
    const education = document.getElementById("education").value;

    const result = `Income: ₹${income}<br>Region: ${region}<br>Education: ${education}<br><br>🎯 Matching schemes will be shown in future builds.`;

    document.getElementById("resultText").innerHTML = result;
    document.getElementById("popupModal").style.display = "flex";
  });

  function closePopup() {
    document.getElementById("popupModal").style.display = "none";
  }
    
