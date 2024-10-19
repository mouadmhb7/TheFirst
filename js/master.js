// check if there's  local storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    
    document.querySelectorAll(".colors-list li").forEach(el =>{
        el.classList.remove("active");

        if(mainColors === el.dataset.color ){
        el.classList.add("active")
        }
    });
    

}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval 
let backgroundInterval;

// Check If There's  Local Storage Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null){

        console.log(backgroundLocalItem)
    if (backgroundLocalItem === "true"){

        backgroundOption = true
    }
    else {
        backgroundOption = false
    }
    console.log(backgroundLocalItem)

    // Remove Active class From All Spans
    document.querySelectorAll(".option-box span").forEach(ele => {
        ele.classList.remove("active")
    });

    if(backgroundLocalItem === "true"){
        document.querySelector(".option-box .yes").classList.add("active")
    } else {
        document.querySelector(".option-box .no").classList.add("active")
    }
}


// =========use the value of bullet from the localStorage ==================
let storageOfTheBullets = localStorage.getItem('bullets_option');

if(storageOfTheBullets !== null){
    if (storageOfTheBullets === "true") {
        document.querySelector(".bullets-option .yes").classList.add('active')

    }
    else{
        document.querySelector(".bullets-option .no").classList.add('active')
        document.querySelector(".nav-bullets").style.display="none"
    }
}











// click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function() {

    // Toggle class fa-spin for Rotation On Self 
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle('open');
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    
    li.addEventListener("click",(e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        
        //set color on the local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        // remove Active Class From All Children
        e.target.parentElement.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active")
        });
        e.target.classList.add("active")

    });
});

// Switch RandomBackEl  Background Option
const RandomBackEl = document.querySelectorAll(".option-box span");

// Loop On All Span 
RandomBackEl.forEach(span =>{
    span.addEventListener("click",(e)=> {

        handelActive(e)

        if(e.target.dataset.background === "yes"){
            backgroundOption === true ;
            randomizeImgs();
            localStorage.setItem("background_option", true)
        }
        else {
            backgroundOption === false ;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false)
        }
    });
});



// select landing page Element
let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]


// Function To Randomize Imgs
function randomizeImgs(){
    if (backgroundOption === true){
        backgroundInterval = setInterval(()=>{
            // get random number 
            let randomNum = Math.floor(Math.random() * imgsArray.length) ;
        
            // change background image Url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
        
        },1000) ;

    }
}
randomizeImgs();

// Select Skills Selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
let skillOffsetTop = ourSkills.offsetTop;
this.console.log(skillOffsetTop);

let skillsOuterHeight = ourSkills.offsetHeight;
this.console.log(skillsOuterHeight)

let windowHeight = this.innerHeight;
this.console.log(windowHeight);

let windowScrollTop = this.pageYOffset;
this.console.log(windowScrollTop);
if (windowScrollTop > ( skillOffsetTop + skillsOuterHeight - windowHeight ) ){
    
    let allSkills =  document.querySelectorAll(".skill-box .skill-progress span");
    console.log(allSkills)
    allSkills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
    })
}
}

// create the popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // create a overlay element

        let overlay = document.createElement("div")

        // add class to overlay

    overlay.className = "popup-overlay";

    // append overlay to the body 

    document.body.appendChild(overlay);
    
    // create the popup box 

    let popupBox = document.createElement("div");

    // add class to the popupBox 

    popupBox.classList ="popup-box";






    if ( img.alt !== null){

        // create heading
        let imgHeading = document.createElement("h3");

        //create text for heading 
        let imgText = document.createTextNode(img.alt);

        // append the text to the heading 
        imgHeading.appendChild(imgText);

        // append the heading to the popupBox
        popupBox.appendChild(imgHeading);

    }











    // create the image 
    let popupImage = document.createElement("img");

    // set image src
    popupImage.src = img.src;

    // add image to popup box 
    popupBox.appendChild(popupImage);

    // append the popup box to body 
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement('span');

    // create the close button text
    let closeButtonText = document.createTextNode("X");

    // Append text to the close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton)

    })
});


// burder   button  ============================

let burgerButton = document.querySelector(".burger-button");
let burgerLinks = document.querySelector(".header-area .links")

burgerButton.onclick = function(e){
    
    // stop propagation
    e.stopPropagation();


    if(burgerLinks.classList.contains("open")){
        burgerButton.classList.remove("love")
        burgerLinks.classList.remove("open")
    }
    else{
        burgerLinks.classList.add("open");
        burgerButton.classList.add("love");

    }
    
}
document.addEventListener("click",function (e){
    if(e.target !== burgerButton && e.target !== burgerLinks) {

        if(burgerLinks.classList.contains('open')){

            burgerButton.classList.toggle("love");
            burgerLinks.classList.toggle("open");
        }
    };
});

burgerLinks.onclick = function(e){
    e.stopPropagation();
}



// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a")
function scrollTo(elements) {
    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {
    
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior: "smooth"
            });
        });
    });
};
scrollTo(allBullets);
scrollTo(allLinks);



function handelActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active")
    });
    ev.target.classList.add("active")
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletContainer = document.querySelector(".nav-bullets");


// set the the value of the bullets in the localStorage
bulletsSpan.forEach(span => {

    span.addEventListener("click",(e)=> {

        handelActive(e);
    
        if(e.target.dataset.display ==="yes"){

            localStorage.setItem("bullets_option", true)
            
            
        }
        else{
            localStorage.setItem("bullets_option", false)
        }
        console.log(localStorage.getItem('bullets_option'))  
    });
});







bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === "yes"){

            bulletContainer.style.display="block";
        }
        else {
            bulletContainer.style.display="none"
        }
        handelActive(e)
    })
})

// reset button 

document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem('background_option');

    window.location.reload();
}