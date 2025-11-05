// Combined JavaScript for GreenEarth Community Garden

// Interactive Elements and Form Validation

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeInteractiveElements();
  initializeFormValidation();
});

// Interactive Elements Functionality
function initializeInteractiveElements() {
  // Services page accordion
  if (document.getElementById("educational-workshops")) {
    const serviceHeaders = document.querySelectorAll("section h3");
    serviceHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const content = this.nextElementSibling;
        if (content && content.tagName === "UL") {
          content.style.display =
            content.style.display === "none" ? "block" : "none";
          this.classList.toggle("active");
        }
      });
    });

    // Initially hide all service lists except the first
    const serviceLists = document.querySelectorAll("section ul");
    serviceLists.forEach((list, index) => {
      if (index !== 0) {
        list.style.display = "none";
      }
    });
    if (serviceHeaders.length > 0) {
      serviceHeaders[0].classList.add("active");
    }
  }

  // Tabs for Volunteer page
  initializeVolunteerTabs();

  // Image gallery lightbox for Home page
  initializeImageGallery();

  // Interactive map for Contact page
  initializeInteractiveMap();

  // Search functionality for Services page
  initializeServiceSearch();

  // Dynamic content loading
  initializeDynamicContent();

  // Smooth scrolling for navigation
  initializeSmoothScrolling();
}

// Volunteer Tabs
function initializeVolunteerTabs() {
  if (!document.getElementById("apply")) return;

  const volunteerTypes = [
    {
      id: "food-pantry",
      title: "Food Pantry",
      desc: "Help distribute food to community members",
    },
    {
      id: "youth-mentor",
      title: "Youth Mentor",
      desc: "Guide and inspire young gardeners",
    },
    {
      id: "senior-companion",
      title: "Senior Companion",
      desc: "Assist elderly community members",
    },
    {
      id: "events",
      title: "Event Volunteer",
      desc: "Help organize and run garden events",
    },
    {
      id: "skills-based",
      title: "Skills-Based",
      desc: "Share your professional skills",
    },
  ];

  const tabsHTML = `
        <div class="volunteer-tabs">
            <div class="tab-headers">
                ${volunteerTypes
                  .map(
                    (type) =>
                      `<button class="tab-header" data-tab="${type.id}">${type.title}</button>`
                  )
                  .join("")}
            </div>
            <div class="tab-contents">
                ${volunteerTypes
                  .map(
                    (type) =>
                      `<div class="tab-content" id="tab-${type.id}">
                        <h4>${type.title} Volunteer</h4>
                        <p>${type.desc}</p>
                    </div>`
                  )
                  .join("")}
            </div>
        </div>
    `;

  const interestSelect = document.querySelector("select#interest");
  if (interestSelect) {
    interestSelect.insertAdjacentHTML("beforebegin", tabsHTML);
  }

  // Tab functionality
  const tabHeaders = document.querySelectorAll(".tab-header");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabHeaders.length > 0) {
    tabHeaders[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  tabHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Update tab headers
      tabHeaders.forEach((h) => h.classList.remove("active"));
      this.classList.add("active");

      // Update tab contents
      tabContents.forEach((c) => c.classList.remove("active"));
      document.getElementById(`tab-${tabId}`).classList.add("active");

      // Update the select element
      if (interestSelect) {
        interestSelect.value = tabId;
      }
    });
  });
}

// Image Gallery
function initializeImageGallery() {
  if (!document.getElementById("welcome")) return;

  const galleryImages = [
    "../images/oppo-find-x5-pro-Nc-hc5g5yhw-unsplash.jpg",
    "../images/team-two-activists-doing-voluntary-work-plant-trees-forest.jpg",
  ];

  const galleryHTML = `
        <div class="image-gallery">
            <h3>Our Community in Action</h3>
            <div class="gallery-grid">
                ${galleryImages
                  .map(
                    (img, index) => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Community garden activity ${
                      index + 1
                    }" 
                             data-full="${img}">
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;

  document
    .getElementById("welcome")
    .insertAdjacentHTML("beforeend", galleryHTML);

  // Lightbox functionality
  const lightboxHTML = `
        <div class="lightbox">
            <span class="close">&times;</span>
            <img class="lightbox-content" id="lightbox-img">
            <div class="caption"></div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", lightboxHTML);

  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  galleryItems.forEach((img) => {
    img.addEventListener("click", function () {
      const fullSizeSrc = this.getAttribute("data-full");
      lightboxImg.setAttribute("src", fullSizeSrc);
      lightbox.style.display = "block";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      lightbox.style.display = "none";
    });
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// Interactive Map
function initializeInteractiveMap() {
  const mapContainer = document.querySelector("#map .map-container");
  if (!mapContainer) return;

  // Remove existing iframe
  const existingIframe = mapContainer.querySelector("iframe");
  if (existingIframe) {
    existingIframe.remove();
  }

  // Initialize Leaflet map if library is available
  if (typeof L !== "undefined") {
    const map = L.map(mapContainer).setView([-37.814107, 144.967117], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([-37.814107, 144.967117])
      .addTo(map)
      .bindPopup("GreenEarth Community Garden<br>121 Exhibition St, Melbourne")
      .openPopup();
  }
}

// Service Search
function initializeServiceSearch() {
  if (!document.getElementById("educational-workshops")) return;

  const searchHTML = `
        <div class="search-container">
            <input type="text" id="service-search" placeholder="Search services...">
            <button id="search-btn">Search</button>
        </div>
    `;

  const mainHeading = document.querySelector("main h2");
  if (mainHeading) {
    mainHeading.insertAdjacentHTML("afterend", searchHTML);
  }

  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("service-search");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", filterServices);
    searchInput.addEventListener("keyup", filterServices);
  }

  function filterServices() {
    const searchTerm = searchInput.value.toLowerCase();
    const serviceItems = document.querySelectorAll("section ul li");
    const sections = document.querySelectorAll("section");

    serviceItems.forEach((item) => {
      const serviceText = item.textContent.toLowerCase();
      if (serviceText.includes(searchTerm)) {
        item.style.display = "";
        item.closest("section").style.display = "";
        item.closest("ul").style.display = "";
      } else {
        item.style.display = "none";
      }
    });

    // Hide empty sections
    sections.forEach((section) => {
      const visibleItems = section.querySelectorAll("li").length > 0;
      section.style.display = visibleItems ? "" : "none";
    });
  }
}

// Dynamic Content
function initializeDynamicContent() {
  if (document.getElementById("quick-links")) {
    setTimeout(function () {
      const quickLinks = document.getElementById("quick-links");
      const featuredHTML = `
                <div class="featured-services">
                    <h3>Featured This Week</h3>
                    <ul>
                        <li>Composting Workshop - Saturday 10AM</li>
                        <li>Community Harvest Day - Sunday 2PM</li>
                        <li>New Seedling Planting - Volunteers Needed</li>
                    </ul>
                </div>
            `;
      quickLinks.insertAdjacentHTML("beforeend", featuredHTML);
    }, 1000);
  }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Form Validation Functionality
function initializeFormValidation() {
  initializeContactForm();
  initializeEnquiryForm();
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("general-contact-form");
  if (!contactForm) return;

  const messageTextarea = document.getElementById("message");
  const messageChars = document.getElementById("message-chars");

  // Character counter
  if (messageTextarea && messageChars) {
    messageTextarea.addEventListener("input", function () {
      messageChars.textContent = this.value.length;
    });
  }

  // Real-time validation
  contactForm.addEventListener("input", function (e) {
    validateField(e.target);
  });

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateContactForm()) {
      submitContactForm();
    }
  });

  // Form reset
  contactForm.addEventListener("reset", function () {
    clearErrors();
    if (messageChars) messageChars.textContent = "0";
  });
}

// Enquiry Form
function initializeEnquiryForm() {
  const enquiryForm = document.getElementById("service-enquiry-form");
  if (!enquiryForm) return;

  const serviceTypeSelect = document.getElementById("service-type");
  const otherServiceContainer = document.getElementById(
    "other-service-container"
  );
  const enquiryMessage = document.getElementById("enquiry-message");
  const enquiryMessageChars = document.getElementById("enquiry-message-chars");

  // Show/hide other service input
  if (serviceTypeSelect && otherServiceContainer) {
    serviceTypeSelect.addEventListener("change", function () {
      otherServiceContainer.style.display =
        this.value === "other-service" ? "block" : "none";
    });
  }

  // Character counter
  if (enquiryMessage && enquiryMessageChars) {
    enquiryMessage.addEventListener("input", function () {
      enquiryMessageChars.textContent = this.value.length;
    });
  }

  // Real-time validation
  enquiryForm.addEventListener("input", function (e) {
    validateField(e.target);
  });

  // Form submission
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateEnquiryForm()) {
      submitEnquiryForm();
    }
  });

  // Form reset
  enquiryForm.addEventListener("reset", function () {
    clearErrors();
    if (enquiryMessageChars) enquiryMessageChars.textContent = "0";
    if (otherServiceContainer) otherServiceContainer.style.display = "none";
  });
}

// Field Validation
function validateField(field) {
  const errorElement = document.getElementById(field.id + "-error");
  if (!errorElement) return;

  // Clear previous error
  errorElement.textContent = "";
  field.classList.remove("error");

  // Skip validation if field is empty and not required
  if (!field.value && !field.required) {
    return true;
  }

  let isValid = true;
  let errorMessage = "";

  // Required field validation
  if (field.required && !field.value.trim()) {
    isValid = false;
    errorMessage = "This field is required";
  }
  // Pattern validation
  else if (field.pattern && field.value) {
    const pattern = new RegExp(field.pattern);
    if (!pattern.test(field.value)) {
      isValid = false;
      errorMessage = field.title || "Please enter a valid value";
    }
  }
  // Email validation
  else if (field.type === "email" && field.value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }
  // Phone validation
  else if (field.type === "tel" && field.value && field.required) {
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
    if (!phonePattern.test(field.value.replace(/\s/g, ""))) {
      isValid = false;
      errorMessage = "Please enter a valid phone number";
    }
  }
  // Length validation
  else if (field.value) {
    if (field.minLength && field.value.length < field.minLength) {
      isValid = false;
      errorMessage = `Minimum ${field.minLength} characters required`;
    }
    if (field.maxLength && field.value.length > field.maxLength) {
      isValid = false;
      errorMessage = `Maximum ${field.maxLength} characters allowed`;
    }
  }
  // Date validation
  else if (field.type === "date" && field.value) {
    const selectedDate = new Date(field.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      isValid = false;
      errorMessage = "Please select a future date";
    }
  }

  if (!isValid) {
    errorElement.textContent = errorMessage;
    field.classList.add("error");
  }

  return isValid;
}

// Contact Form Validation
function validateContactForm() {
  const form = document.getElementById("general-contact-form");
  const fields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// Enquiry Form Validation
function validateEnquiryForm() {
  const form = document.getElementById("service-enquiry-form");
  const fields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Special validation for terms checkbox
  const termsCheckbox = document.getElementById("terms");
  if (termsCheckbox && !termsCheckbox.checked) {
    const errorElement = document.getElementById("terms-error");
    errorElement.textContent = "You must accept the terms and conditions";
    termsCheckbox.classList.add("error");
    isValid = false;
  }

  return isValid;
}

// Clear Errors
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.textContent = "";
  });

  const errorFields = document.querySelectorAll(".error");
  errorFields.forEach((field) => {
    field.classList.remove("error");
  });
}

// Contact Form Submission
function submitContactForm() {
  const form = document.getElementById("general-contact-form");
  const submitButton = document.getElementById("contact-submit");
  const statusDiv = document.getElementById("form-status");

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Simulate AJAX submission
  setTimeout(() => {
    const formData = new FormData(form);
    const emailBody = composeContactEmail(formData);

    // Show success message
    statusDiv.innerHTML = `
            <div class="success-message">
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting GreenEarth Community Garden. We'll get back to you within 24 hours.</p>
                <p><strong>Preview of your message:</strong></p>
                <div class="email-preview">
                    ${emailBody}
                </div>
            </div>
        `;

    // Reset form
    form.reset();
    if (document.getElementById("message-chars")) {
      document.getElementById("message-chars").textContent = "0";
    }

    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

    // Scroll to status message
    statusDiv.scrollIntoView({ behavior: "smooth" });
  }, 1500);
}

// Enquiry Form Submission
function submitEnquiryForm() {
  const form = document.getElementById("service-enquiry-form");
  const submitButton = document.getElementById("enquiry-submit");
  const responseDiv = document.getElementById("enquiry-response");
  const detailsDiv = document.getElementById("response-details");

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = "Processing...";

  // Simulate AJAX submission
  setTimeout(() => {
    const formData = new FormData(form);
    const serviceType = document.getElementById("service-type").value;
    const response = generateServiceResponse(serviceType, formData);

    // Show response
    detailsDiv.innerHTML = response;
    responseDiv.style.display = "block";

    // Scroll to response
    responseDiv.scrollIntoView({ behavior: "smooth" });

    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Submit Another Enquiry";
  }, 2000);
}

// Compose Contact Email
function composeContactEmail(formData) {
  const subject = formData.get("subject");
  const subjectOption = document.querySelector(
    `#subject option[value="${subject}"]`
  );
  const subjectText = subjectOption ? subjectOption.textContent : subject;

  return `
        <p><strong>From:</strong> ${formData.get("name")} (${formData.get(
    "email"
  )})</p>
        <p><strong>Phone:</strong> ${
          formData.get("phone") || "Not provided"
        }</p>
        <p><strong>Subject:</strong> ${subjectText}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.get("message").replace(/\n/g, "<br>")}</p>
    `;
}

// Generate Service Response
function generateServiceResponse(serviceType, formData) {
  const servicePrices = {
    "gardening-101": {
      cost: "$45",
      duration: "4 weeks",
      next: "Next session: March 15, 2025",
    },
    "youth-programs": {
      cost: "$25",
      duration: "8 weeks",
      next: "Next program: April 1, 2025",
    },
    composting: {
      cost: "Free",
      duration: "2 hours",
      next: "Next clinic: March 22, 2025",
    },
    "community-work": {
      cost: "Free",
      duration: "4 hours",
      next: "Next event: This Saturday",
    },
    "skill-sharing": {
      cost: "Membership: $20/year",
      duration: "Ongoing",
      next: "Available anytime",
    },
    "donation-plots": {
      cost: "Free",
      duration: "Seasonal",
      next: "Plot applications open now",
    },
    "seed-swap": {
      cost: "Free entry",
      duration: "1 day",
      next: "Annual event: September 14, 2025",
    },
    "herb-garden": {
      cost: "$35",
      duration: "3 hours",
      next: "Next workshop: March 28, 2025",
    },
    "season-extension": {
      cost: "$40",
      duration: "3 hours",
      next: "Next workshop: April 5, 2025",
    },
    "other-service": {
      cost: "Varies",
      duration: "Custom",
      next: "We'll contact you to discuss",
    },
  };

  const service = servicePrices[serviceType] || {
    cost: "Please contact for pricing",
    duration: "Varies",
    next: "We'll contact you soon",
  };
  const participantCount = formData.get("participant_count") || 1;

  let totalCost = "";
  if (
    service.cost !== "Free" &&
    service.cost !== "Free entry" &&
    service.cost !== "Membership: $20/year"
  ) {
    const costValue = parseInt(service.cost.replace("$", ""));
    totalCost = ` (Total for ${participantCount} participants: $${
      costValue * parseInt(participantCount)
    })`;
  }

  const serviceOption = document.querySelector(
    `#service-type option[value="${serviceType}"]`
  );
  const serviceName = serviceOption ? serviceOption.textContent : serviceType;

  return `
        <div class="service-response">
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Cost:</strong> ${service.cost}${totalCost}</p>
            <p><strong>Duration:</strong> ${service.duration}</p>
            <p><strong>Availability:</strong> ${service.next}</p>
            <p><strong>Your Contact:</strong> ${formData.get(
              "name"
            )} (${formData.get("email")})</p>
            <p><strong>Participants:</strong> ${participantCount}</p>
            <div class="next-steps">
                <h4>Next Steps:</h4>
                <ol>
                    <li>Our program coordinator will contact you within 2 business days</li>
                    <li>We'll schedule a garden tour if requested</li>
                    <li>Complete registration and payment (if applicable)</li>
                    <li>Join our community and start gardening!</li>
                </ol>
            </div>
            <p class="contact-note">If you have immediate questions, call us at <strong>+61-7-8198-9786</strong></p>
        </div>
    `;
}

// Phone Number Formatting
document.addEventListener("input", function (e) {
  if (e.target.type === "tel") {
    formatPhoneNumber(e.target);
  }
});

function formatPhoneNumber(input) {
  let numbers = input.value.replace(/\D/g, "");

  // Australian phone number formatting
  if (numbers.startsWith("61")) {
    numbers = numbers.substring(2);
  }

  if (numbers.length <= 4) {
    input.value = numbers;
  } else if (numbers.length <= 8) {
    input.value = numbers.replace(/(\d{4})(\d+)/, "$1 $2");
  } else {
    input.value = numbers.replace(/(\d{4})(\d{4})(\d+)/, "$1 $2 $3");
  }
}
