//  Set All Variables 
let moon = document.querySelector('.moon');
let sun = document.querySelector('.sun');
let all_logo = document.querySelectorAll('.logo');
let hLogo = document.querySelector('.hLogo');

// toggle the event between the sun and the moon

function removeAndAddActiveClass() {
    moon.addEventListener('click', () => {
        moon.classList.remove('active');
        sun.classList.add('active');
        document.body.classList.add('them_color');
        all_logo.forEach(logo => {
            logo.src = 'img/black logo.png';
        });
        hLogo.src = 'img/H logo Black.png';
        localStorage.setItem('themColor', 'true');
    });

    sun.addEventListener('click', () => {
        sun.classList.remove('active');
        moon.classList.add('active');
        document.body.classList.remove('them_color');
        all_logo.forEach(logo => {
            logo.src = 'img/white logo.png';
        });
        hLogo.src = 'img/H logo White.png';
        localStorage.setItem('themColor', 'false');
    });
}
removeAndAddActiveClass();

// replace the active class from all links
function replaceClassActive(){
    let allLinksNav = document.querySelectorAll('.links li a');
    allLinksNav.forEach(link => {
        link.addEventListener('click', (e) =>{
            allLinksNav.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        })
    })
}
replaceClassActive();

// when clicked on elements
function WhenClickedOnElements(){
    let allLinks = document.querySelectorAll('.links li a');

    document.querySelector('.spansIcon').addEventListener('click', (e) => {
        document.body.classList.add('hidden');
        e.stopPropagation();
        document.querySelector('.nav').classList.add('right')
    })
    document.querySelector('.x_close').addEventListener('click', (e) =>{
        e.stopPropagation();
        e.target.parentElement.classList.remove('right');
        document.body.classList.remove('hidden');
    })
    document.body.addEventListener('click', () => {
        if (document.querySelector('.nav').classList.contains('right')){
            document.querySelector('.nav').classList.remove('right');
            document.body.classList.remove('hidden');
        }
    })
    document.querySelector('.nav').addEventListener('click', (e) => {
        e.stopPropagation();
    })
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav').classList.remove('right');
            document.body.classList.remove('hidden');
        })
    })
}
WhenClickedOnElements();

// when scroll and reach to the section of nums increase it
let section = document.querySelector('.all_numbers');
let nums = document.querySelectorAll('.all_numbers .box .num');
// to stop the function if is false and play it if true
let started = false;

function startCount() {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= section.offsetTop + 150){
            if (!started){
                nums.forEach(num => {
                    let goal = num.dataset.goal;
                    let count = setInterval(() => {
                        num.textContent++;
                        if (num.textContent == goal){
                            clearInterval(count);
                        }
                    }, 10)
                })
            }
            started = true;
        }
    })
}
startCount();

// when scroll to hafe section main to add the arrowr up


function addUpArrow(){
    let up = document.querySelector('.up');
    let section = document.querySelector('.main');
    let successSection = document.querySelector('.success');
    let successBoxes = document.querySelectorAll('.success .content .box');
    let footer = document.querySelector('.footer');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= section.offsetTop + 500){
            up.style.display = 'flex';
        } else{
            up.style.display = 'none';
        }
        // when scroll to success section 
        if (window.scrollY >= successSection.offsetTop - 400) {
            successBoxes.forEach((box, index) => {
                box.style.setProperty('--i', index + 1);
                const delay = index * 0.3;
                box.style.animationDelay = `${delay}s`;
                box.classList.add('animated');
            });
        }
    });
    up.addEventListener('click', () => {
        scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}
addUpArrow();

// scroll the images 
const scrollers = document.querySelectorAll('.box_images');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    addAnimation();
}

function addAnimation(){
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = document.querySelector('.inner_scroller');
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        })
    })
}

// add the overlay on the body and stop animation 
let all_innerScroller = document.querySelectorAll('.inner_scroller');
let all_images = document.querySelectorAll('.inner_scroller img');
let overlay = document.querySelector('.overlay');

function whenClickOnAnyImage(){
all_images.forEach(img => {
    img.addEventListener('click', (e) => {
        overlay.style.display = 'flex';
        document.querySelector('.overlay img').src = e.target.src;
        all_innerScroller.forEach(box => box.style.animationPlayState = 'paused');
    })
    overlay.addEventListener('click', (e) => {   
        e.target.style.display = 'none';
        all_innerScroller.forEach(box => box.style.animationPlayState = 'running');
    })
})
}
whenClickOnAnyImage();

// when hover on the image and the overlay in none
function whenHoverOnImage(){
    all_images.forEach(img => {
        img.addEventListener('mouseover', (e) => {
            if (overlay.style.display === 'none'){
                e.target.parentElement.style.animationPlayState = 'paused';
            }
        })
        img.addEventListener('mouseout', (e) => {
            if (overlay.style.display === 'none'){
                e.target.parentElement.style.animationPlayState = 'running';
            }
        })
    });
}
whenHoverOnImage();

// to send the message to the email
function sendEmail(){
    let formInformations = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    // بتجيب دول من الايميل js نفسه
    const serviceId = 'service_26eb0ql';
    const templateId = 'template_yc0n54j';
    if (name.value == '' || email.value == '' || message.value == ''){
        alert('Please Complete The values');
    } else{
        emailjs.send(serviceId,templateId,formInformations)
        .then(
            res =>{
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            }
        ).catch(error=> console.log(error));
    }
};

// when the page loaded
window.addEventListener('DOMContentLoaded', () => {
    // save the themColor in localstorage
    let getThemColor = localStorage.getItem('themColor');
    if (getThemColor === 'true') {
        document.body.classList.add('them_color');
        moon.classList.remove('active');
        sun.classList.add('active');
        all_logo.forEach(logo => {
            logo.src = 'img/black logo.png';
        });
        hLogo.src = 'img/H logo Black.png';
    } else {
        sun.classList.remove('active');
        moon.classList.add('active');
        document.body.classList.remove('them_color');
        all_logo.forEach(logo => {
            logo.src = 'img/white logo.png';
        });
        hLogo.src = 'img/H logo White.png';
    }
    // to add date to the elment date 
    let date = document.querySelector('.allContent .date');
    if (date){
        let currentDate = new Date().getFullYear();
        date.textContent = currentDate;
    }
})

