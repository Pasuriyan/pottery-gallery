/* =====================================================
   POTTERY GALLERY - COMMON JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= THEME ================= */

    const root = document.documentElement;

    const themeButton = document.getElementById(
        "themeToggle"
    );

    const savedTheme = localStorage.getItem(
        "pottery-theme"
    );

    function applyTheme(theme) {

        root.setAttribute("data-theme", theme);

        localStorage.setItem(
            "pottery-theme",
            theme
        );

        if (themeButton) {

            const icon = themeButton.querySelector("i");

            if (icon) {

                icon.className =
                    theme === "dark"
                        ? "fa-solid fa-sun"
                        : "fa-solid fa-moon";
            }

            themeButton.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }
    }

    applyTheme(
        savedTheme === "dark" ? "dark" : "light"
    );

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                const currentTheme =
                    root.getAttribute("data-theme");

                applyTheme(
                    currentTheme === "dark"
                        ? "light"
                        : "dark"
                );
            }
        );
    }


    /* ================= RTL / LTR ================= */

    const directionButton = document.getElementById(
        "directionToggle"
    );

    const savedDirection = localStorage.getItem(
        "pottery-direction"
    );

    function applyDirection(direction) {

        root.setAttribute("dir", direction);

        localStorage.setItem(
            "pottery-direction",
            direction
        );

        if (directionButton) {

            const icon = directionButton.querySelector("i");

            if (icon) {

                icon.className =
                    "fa-solid fa-arrow-right-arrow-left";
            }

            directionButton.setAttribute(
                "aria-label",
                direction === "rtl"
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );

            directionButton.title =
                direction === "rtl"
                    ? "LTR"
                    : "RTL";
        }
    }

    applyDirection(
        savedDirection === "rtl" ? "rtl" : "ltr"
    );

    if (directionButton) {

        directionButton.addEventListener(
            "click",
            function () {

                const currentDirection =
                    root.getAttribute("dir");

                applyDirection(
                    currentDirection === "rtl"
                        ? "ltr"
                        : "rtl"
                );
            }
        );
    }


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById(
        "menuToggle"
    );

    const navMenu = document.getElementById(
        "navMenu"
    );

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navMenu.classList.toggle("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.className = isOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";
                }
            }
        );

        navMenu.querySelectorAll(
            "a:not(.dropdown-toggle-custom)"
        ).forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 850) {

                    navMenu.classList.remove("is-open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {
                        icon.className =
                            "fa-solid fa-bars";
                    }
                }
            });
        });
    }


    /* ================= HOME DROPDOWN ================= */

    document.querySelectorAll(
        ".dropdown-toggle-custom"
    ).forEach(function (toggle) {

        toggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const parent =
                    toggle.closest(".nav-dropdown");

                if (!parent) return;

                const isOpen =
                    parent.classList.toggle("open");

                toggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );
    });


    /* ================= CURRENT PAGE ================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    document.querySelectorAll(
        ".nav-menu a[href]"
    ).forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        const targetPage = href.split("/").pop();

        if (targetPage === currentPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

            const parentDropdown =
                link.closest(".nav-dropdown");

            if (parentDropdown) {

                const parentLink =
                    parentDropdown.querySelector(
                        ".dropdown-toggle-custom"
                    );

                if (parentLink) {
                    parentLink.classList.add("active");
                }
            }
        }
    });


    /* ================= SCROLL ANIMATIONS ================= */

    const animatedElements =
        document.querySelectorAll("[data-animate]");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(function (element) {

            element.classList.add("is-visible");

        });
    }


    /* ================= FOOTER YEAR ================= */

    document.querySelectorAll(
        "[data-current-year]"
    ).forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* ================= CONTACT FORM ================= */

    document.querySelectorAll(
        "[data-contact-form]"
    ).forEach(function (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;
                }

                const status =
                    form.querySelector(
                        "[data-form-status]"
                    );

                if (status) {

                    status.textContent =
                        "Thank you! Your enquiry has been validated. Connect this form to a backend or form service to receive submissions.";

                    status.style.color =
                        "var(--primary)";

                    status.setAttribute(
                        "role",
                        "status"
                    );
                }

                form.reset();
            }
        );
    });

});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('potteryContactForm');
  if (!form) return;

  const successAlert = document.getElementById('formSuccessAlert');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = submitBtn.querySelector('.btn-spinner');
  const btnText = submitBtn.querySelector('.btn-text');

  // Fields and validation rules
  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      group: document.getElementById('group-fullName'),
      errorEl: document.getElementById('error-fullName'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      el: document.getElementById('email'),
      group: document.getElementById('group-email'),
      errorEl: document.getElementById('error-email'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email (e.g. name@domain.com).';
        return '';
      }
    },
    phone: {
      el: document.getElementById('phone'),
      group: document.getElementById('group-phone'),
      errorEl: document.getElementById('error-phone'),
      validate: (val) => {
        if (!val.trim()) return ''; // Optional
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
        if (!phoneRegex.test(val.trim())) return 'Please provide a valid phone format.';
        return '';
      }
    },
    inquiryType: {
      el: document.getElementById('inquiryType'),
      group: document.getElementById('group-inquiryType'),
      errorEl: document.getElementById('error-inquiryType'),
      validate: (val) => {
        if (!val) return 'Please select an inquiry type.';
        return '';
      }
    },
    message: {
      el: document.getElementById('message'),
      group: document.getElementById('group-message'),
      errorEl: document.getElementById('error-message'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your message.';
        if (val.trim().length < 10) return 'Message must be at least 10 characters long.';
        return '';
      }
    }
  };

  // Helper to display or clear error
  function validateField(fieldName) {
    const field = fields[fieldName];
    const errorMsg = field.validate(field.el.value);

    if (errorMsg) {
      field.group.classList.add('has-error');
      field.errorEl.textContent = errorMsg;
      return false;
    } else {
      field.group.classList.remove('has-error');
      field.errorEl.textContent = '';
      return true;
    }
  }

  // Real-time validation on user typing/selecting
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const eventType = field.el.tagName === 'SELECT' ? 'change' : 'input';

    field.el.addEventListener(eventType, () => {
      if (field.group.classList.contains('has-error')) {
        validateField(key);
      }
    });

    field.el.addEventListener('blur', () => {
      validateField(key);
    });
  });

  // Submit handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach((key) => {
      const isValid = validateField(key);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidField) {
          firstInvalidField = fields[key].el;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Sending...';

    // Simulate asynchronous server submission (replace with fetch API if needed)
    setTimeout(() => {
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      btnText.textContent = 'Send Inquiry';

      // Reset form and display success alert
      form.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].group.classList.remove('has-error');
        fields[key].errorEl.textContent = '';
      });

      successAlert.style.display = 'block';
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Automatically hide after 6 seconds
      setTimeout(() => {
        successAlert.style.display = 'none';
      }, 6000);
    }, 1200);
  });
});