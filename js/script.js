// ===============================
// STRIKON SPORTS
// Main JavaScript
// ===============================

// ===============================
// REDUCED MOTION PREFERENCE
// ===============================

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
}


// ===============================
// STICKY NAVBAR
// ===============================

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");


function closeMobileMenu() {

    if (navMenu) {
        navMenu.classList.remove("active");
    }

    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
        dropdown.classList.remove("open");
    });

}


if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        const isCurrentlyOpen = navMenu.classList.contains("active");

        if (isCurrentlyOpen) {
            closeMobileMenu();
        } else {
            navMenu.classList.add("active");
        }

    });

    // Close menu when a normal link is clicked
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            // Don't immediately close if this is a dropdown trigger
            if (link.parentElement.classList.contains("dropdown")) {
                return;
            }

            closeMobileMenu();

        });

    });

    // Close the mobile menu when tapping/clicking outside of it
    document.addEventListener("click", function (e) {

        if (window.innerWidth > 768) return;

        if (!navMenu.classList.contains("active")) return;

        const clickedInsideMenu = navMenu.contains(e.target);
        const clickedToggleBtn = menuBtn.contains(e.target);

        if (!clickedInsideMenu && !clickedToggleBtn) {
            closeMobileMenu();
        }

    });

    // Close the mobile menu when pressing Escape
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMobileMenu();
        }

    });

}


// ===============================
// MOBILE DROPDOWN
// ===============================

document.querySelectorAll(".dropdown > a").forEach(function (dropdownLink) {

    dropdownLink.addEventListener("click", function (e) {

        // Only use click-to-open behaviour on mobile
        if (window.innerWidth <= 768) {

            e.preventDefault();

            const dropdown = this.parentElement;
            const isCurrentlyOpen = dropdown.classList.contains("open");

            // Close any other open dropdowns first (accordion behaviour)
            document.querySelectorAll(".dropdown").forEach(function (otherDropdown) {

                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("open");
                }

            });

            dropdown.classList.toggle("open", !isCurrentlyOpen);

        }

    });

});


// ===============================
// SMOOTH SCROLLING
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        // Ignore empty "#"
        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

        }

    });

});


// ===============================
// FADE-IN ANIMATION
// ===============================

const fadeElements = document.querySelectorAll(".fade-in");

if (prefersReducedMotion) {

    // Reveal everything immediately, no scroll-triggered motion
    fadeElements.forEach(function (element) {
        element.classList.add("show");
    });

} else {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Animate only once
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    fadeElements.forEach(function (element) {
        observer.observe(element);
    });

}


// ===============================
// HERO LOAD ANIMATION
// ===============================

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});


// ===============================
// ANIMATED STATS COUNTERS
// ===============================

function animateStatValue(el) {

    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";

    if (isNaN(target)) {
        return;
    }

    // Respect reduced motion: jump straight to the final value
    if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
    }

    const duration = 1800;
    const startTime = performance.now();

    function step(currentTime) {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out so the count settles smoothly instead of stopping abruptly
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);

        el.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
        }

    }

    requestAnimationFrame(step);

}


function initStatsCounters() {

    const statElements = document.querySelectorAll("[data-target]");

    if (!statElements.length) {
        return;
    }

    let hasAnimated = false;

    function triggerAllStats() {

        if (hasAnimated) return;
        hasAnimated = true;

        statElements.forEach(function (el) {
            animateStatValue(el);
        });

    }

    // Find the section housing the stats so the whole group
    // animates together the first time it enters the viewport.
    const statsSection =
        document.querySelector(".stats-section") ||
        document.getElementById("stats") ||
        statElements[0].closest("section") ||
        statElements[0].parentElement;

    if (!statsSection) {
        triggerAllStats();
        return;
    }

    const statsObserver = new IntersectionObserver(function (entries, obs) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                triggerAllStats();
                obs.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.3
    });

    statsObserver.observe(statsSection);

}

initStatsCounters();


// ===============================
// PRODUCT IMAGE GALLERY
// ===============================

function changeImage(img) {

    const mainImage = document.getElementById("mainProductImage");

    if (!mainImage || !img) return;

    mainImage.src = img.src;

    document
        .querySelectorAll(".thumbnail-gallery img")
        .forEach(function (image) {

            image.classList.remove("active");

        });

    img.classList.add("active");

}


// ===============================
// LOAD PRODUCT
// ===============================

function loadProduct(id) {

    /*
       Product information is stored directly
       inside each .sample-card using data attributes.

       Example:

       data-id="1"
       data-title="Strikon Elite (TB-01)"
       data-desc="..."
       data-img1="..."
       data-img2="..."
       data-img3="..."
       data-img4="..."
    */

    const card = document.querySelector(
        '.sample-card[data-id="' + id + '"]'
    );

    if (!card) {
        console.warn("Product card not found:", id);
        return;
    }


    // ===============================
    // GET PRODUCT INFORMATION
    // ===============================

    const title = card.dataset.title || "";
    const desc = card.dataset.desc || "";
    const shortDesc = card.dataset.shortDesc || "";


    // ===============================
    // GET PRODUCT IMAGES
    // ===============================

    const images = [];

    let imageNumber = 1;

    while (card.dataset["img" + imageNumber]) {

        images.push(
            card.dataset["img" + imageNumber]
        );

        imageNumber++;

    }


    // ===============================
    // UPDATE PRODUCT TITLE
    // ===============================

    const productTitle =
        document.getElementById("productTitle");

    if (productTitle) {

        productTitle.innerHTML = title;

    }


    // ===============================
    // UPDATE DESCRIPTION
    // ===============================

    const productDescription =
        document.getElementById("productDescription");

    if (productDescription) {

        productDescription.innerHTML = desc;

    }


    // ===============================
    // UPDATE SHORT DESCRIPTION
    // ===============================

    const productShortDesc =
        document.getElementById("productShortDesc");

    if (productShortDesc) {

        if (shortDesc) {

            productShortDesc.innerHTML = shortDesc;

        }

    }


    // ===============================
    // UPDATE MAIN PRODUCT IMAGE
    // ===============================

    const mainProductImage =
        document.getElementById("mainProductImage");

    if (mainProductImage && images.length > 0) {

        mainProductImage.src = images[0];

    }


    // ===============================
    // UPDATE THUMBNAILS
    // ===============================

    const thumbnails =
        document.querySelectorAll(
            ".thumbnail-gallery img"
        );


    thumbnails.forEach(function (thumbnail, index) {

        thumbnail.classList.remove("active");


        if (images[index]) {

            thumbnail.src = images[index];

            thumbnail.style.display = "block";

        } else {

            thumbnail.style.display = "none";

        }

    });


    // First image becomes active
    if (thumbnails[0] && images.length > 0) {

        thumbnails[0].classList.add("active");

    }


    // ===============================
    // SCROLL TO PRODUCT
    // ===============================

    const heroSection =
        document.getElementById("top-product");

    if (heroSection) {

        heroSection.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });

    }

}


// ===============================
// CLOSE MOBILE MENU WHEN RESIZING
// ===============================

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {
        closeMobileMenu();
    }

});
