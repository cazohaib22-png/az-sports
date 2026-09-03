// ===============================
// STRIKON SPORTS
// Main JavaScript
// ===============================

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

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close menu when a normal link is clicked
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            // Don't immediately close if this is a dropdown trigger
            if (link.parentElement.classList.contains("dropdown")) {
                return;
            }

            navMenu.classList.remove("active");

        });

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

            dropdown.classList.toggle("open");

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
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ===============================
// FADE-IN ANIMATION
// ===============================

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


document.querySelectorAll(".fade-in").forEach(function (element) {
    observer.observe(element);
});


// ===============================
// HERO LOAD ANIMATION
// ===============================

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});


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
            behavior: "smooth",
            block: "start"
        });

    }

}


// ===============================
// CLOSE MOBILE MENU WHEN RESIZING
// ===============================

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        document
            .querySelectorAll(".dropdown")
            .forEach(function (dropdown) {

                dropdown.classList.remove("open");

            });

    }

});
