// ===============================
// STRIKON SPORTS
// Main JavaScript
// ===============================

// Sticky Navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close the mobile menu automatically once a link is tapped
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Fade-in Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});
document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

/* ===============================
   PRODUCT IMAGE GALLERY
================================*/

function changeImage(img){
    document.getElementById("mainProductImage").src = img.src;
    document.querySelectorAll(".thumbnail-gallery img")
    .forEach(i => i.classList.remove("active"));
    img.classList.add("active");
}

function loadProduct(id){

const card = document.querySelector('.sample-card[data-id="' + id + '"]');
if (!card) return;

const title = card.dataset.title;
const desc = card.dataset.desc;

// Read every data-imgN attribute present on the card (works for 4, 6, or any count)
const imgs = [];
let i = 1;
while (card.dataset["img" + i]) {
    imgs.push(card.dataset["img" + i]);
    i++;
}

document.getElementById("productTitle").innerHTML = title;

const description = document.getElementById("productDescription");
if (description) {
    description.innerHTML = desc;
}

const shortDesc = document.getElementById("productShortDesc");
if (shortDesc && card.dataset.shortDesc) {
    shortDesc.innerHTML = card.dataset.shortDesc;
}

if (imgs.length) {
    document.getElementById("mainProductImage").src = imgs[0];
}

// Match however many thumbnail slots exist in the HTML to however many images this product has
const thumbs = document.querySelectorAll(".thumbnail-gallery img");
thumbs.forEach((thumbImg, index) => {
    if (imgs[index]) {
        thumbImg.src = imgs[index];
        thumbImg.style.display = "block";
    } else {
        // hide extra thumbnail slots if this product has fewer images than the gallery supports
        thumbImg.style.display = "none";
    }
    thumbImg.classList.remove("active");
});

if (thumbs[0]) {
    thumbs[0].classList.add("active");
}

const heroSection = document.getElementById("top-product");
if (heroSection) {
    heroSection.scrollIntoView({
        behavior: "smooth"
    });
}

}
