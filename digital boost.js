// script.js
if (window.innerWidth <= 768) {
    console.log("You're on a phone screen.");
}
// Event listener for scroll to track sections
window.addEventListener("scroll", function() {
    const sections = document.querySelectorAll("section"); // All sections to track
    const navLinks = document.querySelectorAll("nav a"); // Navigation links

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if current scroll position is within the section
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id"); // Get the id of the active section
        }
    });

    // Loop through nav links to apply active class based on current section
    navLinks.forEach((link) => {
        link.classList.remove("active"); // Remove active class from all links
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active"); // Add active class to the current section link
        }
    });
});

// JavaScript to hide header on scroll down and show on scroll up
let lastScrollTop = 0;
const header = document.querySelector("header"); // Make sure "header" matches your header element

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide header
        header.style.top = "-100px"; // Adjust based on your header height
    } else {
        // Scrolling up - show header
        header.style.top = "0";
    }
    
    lastScrollTop = scrollTop;
});
// Select all sections you want to animate
const sections = document.querySelectorAll('.section');

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Check if section is in view
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add 'show' class to trigger animation
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.2 // Adjusts when to trigger animation (0.2 = 20% in view)
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// cookie section 
// Check if cookies have already been accepted
if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').style.display = 'block'; // Show the banner
}

// Handle the button click
document.getElementById('accept-cookies').onclick = function() {
    localStorage.setItem('cookiesAccepted', 'true'); // Store acceptance in localStorage
    document.getElementById('cookie-banner').style.display = 'none'; // Hide the banner
};
// mobile nav 
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('nav-active'); // Toggle class to show/hide
}

// Smooth scroll to section and hide menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        // Hide the menu
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('nav-active'); // Hide the menu on link click

        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        
        // Add active class to the clicked link
        this.classList.add('active');

        // Smooth scroll to the section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Booking Section 
function openBookingForm(serviceName) {
    const bookingFormOverlay = document.getElementById("bookingFormOverlay");
    document.getElementById("serviceName").textContent = serviceName;
    bookingFormOverlay.style.display = "flex";
}

function closeBookingForm() {
    document.getElementById("bookingFormOverlay").style.display = "none";
}

// Define booked dates (example dates in "YYYY-MM-DD" format)
const bookedDates = ["2024-11-10", "2024-11-12", "2024-11-15"];

function openBookingForm(serviceName) {
    const bookingFormOverlay = document.getElementById("bookingFormOverlay");
    document.getElementById("serviceName").textContent = serviceName;
    bookingFormOverlay.style.display = "flex";

    // Initialize Flatpickr with unavailable dates
    flatpickr(".datepicker", {
        dateFormat: "Y-m-d",
        disable: bookedDates, // Disables booked dates
        minDate: "today"      // Prevents past date selection
    });
}

function closeBookingForm() {
    document.getElementById("bookingFormOverlay").style.display = "none";
}

// Slide-Up Animation on Scroll
const projectCards = document.querySelectorAll('.project-card');

function handleScrollAnimation() {
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50) {
            card.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);

// count Up 
function countUp(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', function() {
    const clientsCount = document.getElementById('clients-count');
    const servicesCount = document.getElementById('services-count');
    const followersCount = document.getElementById('followers-count');
    const awardsCount = document.getElementById('awards-count');
    const ongoingProjectsCount = document.getElementById('ongoing-projects-count');
    let counted = false;

    window.addEventListener('scroll', function() {
        if (!counted && isElementInViewport(clientsCount)) {
            countUp(clientsCount, 0, 52, 2000); // Adjust the end value and duration as needed
            countUp(servicesCount, 0, 72, 2000); // Adjust the end value and duration as needed
            countUp(followersCount, 0, 10000, 2000); // Adjust the end value and duration as needed
            countUp(awardsCount, 0, 6, 2000); // Adjust the end value and duration as needed
            countUp(ongoingProjectsCount, 0, 17, 2000); // Adjust the end value and duration as needed
            counted = true;
        }
    });
});
 // Ghost animation 
 document.addEventListener("DOMContentLoaded", () => {
    // Create the ghost element
    const ghost = document.createElement("div");
    ghost.id = "ghost";
    document.body.appendChild(ghost);
  
    // Show only the first time the site loads
    const hasSeenGhost = localStorage.getItem("hasSeenGhost");
  
    if (!hasSeenGhost) {
      localStorage.setItem("hasSeenGhost", true);
  
      // Ghost waves and hides when scrolling
      window.addEventListener("scroll", () => {
        ghost.style.animation = "hideGhost 1s forwards";
      });
    } else {
      ghost.style.display = "none";
    }
  });

  // count up 
  function countUp(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.count');
    let counted = false;

    const handleScroll = () => {
        counters.forEach(counter => {
            if (!counted && isElementInViewport(counter)) {
                const target = +counter.getAttribute('data-target');
                countUp(counter, 0, target, 2000); // Adjust the duration as needed
                counted = true;
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case the elements are already in view
});
  
// clients section
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".clients-grid img");
    let hasShown = false; // Ensures it only happens once

    function revealOnScroll() {
        let section = document.querySelector(".clients-section");
        let sectionTop = section.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && !hasShown) {
            hasShown = true; // Mark as shown
            images.forEach((img) => {
                img.classList.add("flash");
                setTimeout(() => {
                    img.classList.remove("flash");
                }, 2000); // Remove effect after 2s
            });
        }
    }

    window.addEventListener("scroll", revealOnScroll);
});

// Contsct Animations 
const words = ["First Name ", "Last Name", "Email", "Phone Number"];
let index = 0;
const textElement = document.getElementById("changing-text");

function changeText() {
    index = (index + 1) % words.length;
    textElement.textContent = words[index];
}

setInterval(changeText, 4000); // Change every 4 seconds

// clients section 
document.addEventListener("DOMContentLoaded", function () {
    const industries = ["Consumer Electronics", "CPG", "Automotive", "Financial Services", "Entertainment"];
    let index = 0;
    const textElement = document.getElementById("myText");

    function changeText() {
        textElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            textElement.textContent = industries[index]; // Change text
            textElement.style.opacity = 1; // Fade in
            index = (index + 1) % industries.length; // Loop through the array
        }, 500); // Wait for fade-out transition
    }

    changeText(); // Initial text setup
    setInterval(changeText, 3000); // Change text every 3 seconds
});

// Cookie banner 
window.addEventListener('load', function() {
    setTimeout(function() {
        // Display the overlay and cookie banner after 2 seconds
        document.getElementById('cookie-banner-overlay').style.display = 'block';
        document.getElementById('cookie-banner').style.display = 'block';
    }, 2000); // 2 seconds

    document.getElementById('accept-cookies').addEventListener('click', function() {
        // Hide the overlay and banner when the button is clicked
        document.getElementById('cookie-banner-overlay').style.display = 'none';
        document.getElementById('cookie-banner').style.display = 'none';
    });
});

// Email section 
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    const email = document.getElementById("email").value;

    // Show success popup
    document.getElementById("signup-popup").style.display = "flex";
    
    // Send the email to the Google Sheet (Your existing logic)
    fetch("https://script.google.com/macros/s/AKfycbxcSge_5nqWz-oli3b3QrKo-xKtTevM4M4SHRFobXBTsPe6J9Wdr5doKzZ2IDj57OS7NQ/exec", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => {
        // Optional: Log the response data for debugging
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Reset the email input field after submission
    document.getElementById("email").value = "";
});

function closePopup() {
    document.getElementById("signup-popup").style.display = "none"; // Close popup when clicked
}

// Robot Scroll section Js
// Show or hide the button based on scroll position
window.onscroll = function () {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    // Show button when user scrolls down 100px
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll the page to the top when the button is clicked
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"  // Smooth scroll effect
    });
});


// Blog section
// Open the modal when a blog title is clicked
document.querySelectorAll('.open-modal').forEach(link => {
    link.addEventListener('click', function(e) {
       e.preventDefault();
       
       // Get the data-blog attribute value to load content
       let blogId = e.target.getAttribute('data-blog');
       
       // Set the modal title and content based on the clicked blog
       let modalTitle = document.getElementById('modal-title');
       let modalContent = document.getElementById('modal-content');
       
       if (blogId === "1") {
          modalTitle.innerText = 'Who Are We?';
          modalContent.innerHTML = 'Full content for "Who Are We?" goes here...';
       } else if (blogId === "2") {
          modalTitle.innerText = 'How can Our Graphic\'s Enhance your Business';
          modalContent.innerHTML = 'Full content for "How can Our Graphic\'s Enhance your Business" goes here...';
       } else if (blogId === "3") {
          modalTitle.innerText = 'Latest Trends in Digital Marketing';
          modalContent.innerHTML = 'Full content for "Latest Trends in Digital Marketing" goes here...';
       } else if (blogId === "4") {
          modalTitle.innerText = 'Latest Trends in Digital Marketing';
          modalContent.innerHTML = 'Full content for "Latest Trends in Digital Marketing" goes here...';
       }
 
       // Show the modal
       document.getElementById('modal').style.display = 'block';
    });
 });
 
 // Close the modal
 document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
 });
 
 // Close the modal if clicked outside of the modal content
 window.addEventListener('click', function(e) {
    if (e.target == document.getElementById('modal')) {
       document.getElementById('modal').style.display = 'none';
    }
 });
