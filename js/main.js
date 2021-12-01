// check the color options in the root 
let colorsStore = localStorage.getItem('color-options');

// change the default colors if there are colors storedin the localStore
if(colorsStore !== null){
    colorsStore = colorsStore.split(',');
    document.documentElement.style.setProperty('--main-Color', colorsStore[0])
    document.documentElement.style.setProperty('--main-color-dark', colorsStore[1])
    document.documentElement.style.setProperty('--main-color-light', colorsStore[2])

    // select the color options and look at the selected one 
    document.querySelectorAll('.settings-box .color-options li').forEach(li => {
        // check if the primary color is the same with current li
        if(li.dataset.primary == colorsStore[0]){
            // add class active
            li.classList.add('active');
        }
    })
    
}
// select the landing page
let landingPage = document.querySelector('.landing-page');

// Check if there is background image stored in the locastorege
let backImage = localStorage.getItem('background-image');
// check if the back image is not null and put it in the landing background
if(backImage !== null) {
    landingPage.style.backgroundImage = `url(../img/${backImage})`
} 

// Change the background-image;


// select previous and next buttons
let previous = document.querySelector('.previous-back');
let next = document.querySelector('.next-back'); 

let images = ['phoneblue.jpg', 'moutanBeutiful.jpg', 'mountagne.jpg'];
let currentImage = 0;

// the next background
next.onclick = () => {
    currentImage++;
    let index = currentImage % images.length
    if (index > (images.length - 1)) {
        console.log('it is enough')
    }else {
        landingPage.style.setProperty('background-image', `url(../img/${images[index]})`);
        localStorage.setItem('background-image' , images[index]);
    } 
}

// The previous background
previous.onclick = () => {
    if (currentImage <= 0) {
        console.log('it is enough')
    }else {
        currentImage--;
        let index = currentImage % images.length
        landingPage.style.setProperty('background-image', `url(../img/${images[index]})`);
        localStorage.setItem('background-image' , images[index]);
    }
    
}

// Variable to check the random background option
let backgroundRandomOption = true;

// Varibale to control the interval 
let backgroundInterval;

// function to excute the intervale if background option is true 

let randomizeBackground = () => {
    if(backgroundRandomOption == true) {
        backgroundInterval = setInterval(() => {
            currentImage++;
            let index = currentImage % images.length;
            landingPage.style.setProperty('background-image', `url(../img/${images[index]})`);
            localStorage.setItem('background-image' , images[index]);
        }, 1000);
    }
}

// excute the function to random the background
randomizeBackground();

 // show the settings box
 let showIt      = document.querySelector('.settings-box .shower');
 let settingsBox = document.querySelector('.settings-box');
 
 showIt.onclick = () => {
     settingsBox.classList.toggle('opened');
     showIt.classList.toggle('fa-spin');
 }

//  change the page colors ;

// select the LIs to and loop on them 
let listColors = document.querySelectorAll('.color-options li');
handleActiveClass(listColors);

listColors.forEach(li => {
    li.onclick = (e) => {
        // Get colors from the dataset 
        let primary = e.target.dataset.primary;
        let dark = e.target.dataset.dark;
        let light = e.target.dataset.light;
        // Change colors in root variables :
        document.documentElement.style.setProperty('--main-Color', primary);
        document.documentElement.style.setProperty('--main-color-dark', dark);
        document.documentElement.style.setProperty('--main-color-light', light);
        // save it in the local storage
        let colors = [primary, dark, light]
        localStorage.setItem('color-options' , colors );

        
    }
});

// check if there is a value of  yes or no in the random-background option in local storage
let randomBackStore = localStorage.getItem('random-background');
console.log(randomBackStore);
document.querySelectorAll('.background-options span').forEach(span => {
    if(span.dataset.background == randomBackStore){
        span.classList.add('active');
        randomBackgroundBehavior(span.dataset.background);
    }
})

// select the bullets-block
let bulletsBlock = document.querySelector('.bullets');

//check if there is a value of yes or no to show or hide the bullets block 
let showBulletsBlock = localStorage.getItem('show-bullets');

if(showBulletsBlock !== null){
    if(showBulletsBlock == 'yes'){
        bulletsBlock.style.display = 'block';
        document.querySelector('.bullets-options span.yes').classList.add('active');
    }else {
        bulletsBlock.style.display = 'none';
        document.querySelector('.bullets-options span.no').classList.add('active')
    }
}


// Switch background random options
document.querySelectorAll('.background-options span').forEach(span => {
    // On click on each span from the selected 
    span.addEventListener('click' , (e) => {
        // select allspans with class active andremove it 
         e.target.parentElement.querySelectorAll('.active').forEach(element => {
                // Remove the active class   
                element.classList.remove('active');
         });
        //  finaly we will add the class active to the clicked element 
        e.target.classList.add('active');
        // check the randomBack value and store use it to manipulate the interval
        let isEnable = e.target.dataset.background; 
        randomBackgroundBehavior(isEnable);
        localStorage.setItem('random-background', isEnable);
    });
})



// function to do if the random is able or not
function randomBackgroundBehavior(enable){
    // check the enable value
    if(enable === 'yes') {
        // set the variable backOption to true and excute the fucntion randomize
        backgroundRandomOption = true;
        randomizeBackground();
 }else {
      // set the the variable backOption to false and clear the intervale   
       backgroundRandomOption = false;
       randomizeBackground();
       clearInterval(backgroundInterval);
 }
}  




let skills = document.querySelector('.skills')
// animate the skillsection when reach it with scrolling 
window.onscroll = () => {
    // check if we reach the section 
    if(reachSection(skills)){
        // select elements to animate 
        let progressColored = document.querySelectorAll('.skills .skill .progress-bar .progress');
        progressColored.forEach(el => {
            el.style.width = el.dataset.progress;
        })
    };

    // animate the timeline section 
        let timeline = document.querySelector('.timeline');
        let parts = document.querySelectorAll('.part');
        parts.forEach(part => {
            if(reachSection(part)){
                part.style.opacity = 1;
            }
        })
        
}


function reachSection(section) {
    let isReached = false;
        // get the distance on the top of the section.
        let sectionOffsetTop = section.offsetTop;

        // the height of the section.
        let sectionOutterHeight = section.offsetHeight;

        // the height of the window in show.
        let windowHeight = this.innerHeight;

        // the scroll top of the window
        let windowScrollTop = this.pageYOffset;
        
        // check if we reach the section 
        if( windowScrollTop >= (sectionOffsetTop + sectionOutterHeight - windowHeight)){
            isReached = true
        };
     return isReached
}

// Images popUp

let gallery = document.querySelectorAll('.gallery img');

gallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // create overlay elment
        let overlay  = document.createElement('div');

        // add className to the element
        overlay.className = 'popup-overlay';

        // Apendthe elementto the body
        document.body.appendChild(overlay);
        

        // createan element to show the image with his informations
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        
        // Create the image to show it in the popup box 
        let image = document.createElement('img');
        image.setAttribute('src' , e.target.getAttribute('src'));

        // add the alt text as a title of the image if it isnot null
        if(e.target.src != null){
           
           // Create th heading element     
           let heading = document.createElement('h3');

          // Create the Text node 
          let headingText = document.createTextNode(e.target.alt);
          
          // Add the text node to the heading element
          heading.appendChild(headingText);

         // Append the heading element to the poopup box 
         popupBox.appendChild(heading)    

        }
        
        popupBox.appendChild(image)
        document.body.appendChild(popupBox)

        // Create the close button
        let closeButton = document.createElement('span');
        closeButton.innerText = 'X';
        closeButton.className = 'close-button';

        // Append the close button to the popup box 
        popupBox.appendChild(closeButton);
        
    });
})

// Close the popup box
document.addEventListener('click' , (e) => {
    if(e.target.className == 'close-button'){
            // Remove the popup box
            e.target.parentNode.remove();

            // remove the overlay 
            document.querySelector('.popup-overlay').remove();
    }
});

// testimonials slider

// select the testimonial blocks
let testimonials = document.querySelectorAll('.testimonials .content .testimonial');
testimonials[0].style.display = 'block';
// select the content block
let content = document.querySelectorAll('.testimonials .content');

// select buttons of slider
let testSlideButtons = document.querySelectorAll('.slide li');

// handle the class active
handleActiveClass(testSlideButtons)

// loop on slide buttons 
testSlideButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // loop on all testimonials 
        testimonials.forEach(testimonial => {
            // change the diplay property to none for all testimonials blocks 
            testimonial.style.display = 'none';
        })
        // show the current testimonial block demanded by the click
        testimonials[e.target.value].style.display = 'block';
    })
})

// Navigate with the navigation bar 


// navigate with the navigation bullets
let links = document.querySelectorAll('header li');
handleActiveClass(links);
scrollToSection(links);

// select the navigation bullets
let bullets = document.querySelectorAll('.bullets .bullet');
// handle the class active 
handleActiveClass(bullets)
// generate the scrolling to sections
scrollToSection(bullets);

// Select buttons from the bullets options section
let bulletsOptionBtn = document.querySelectorAll('.bullets-options span');
handleActiveClass(bulletsOptionBtn);


bulletsOptionBtn.forEach(btn => {
    btn.addEventListener('click' , (e) =>{
        if(e.target.classList.contains('yes')){
            bulletsBlock.style.display = 'block';
            localStorage.setItem('show-bullets' , 'yes')
        }else {
            bulletsBlock.style.display = 'none';
            console.log('nonono')
            localStorage.setItem('show-bullets' , 'no');
        }
    });
})


// function scroll to someWhere
function scrollToSection(buttons){
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        })
    })
}

// handle active classes between
function handleActiveClass(elements) {
    elements.forEach(elm => {
        elm.addEventListener('click' , (e) => {
            e.target.parentElement.querySelectorAll('.active').forEach(active => {
                active.classList.remove('active');
            })
            e.target.classList.add('active');
        })
    })
}

// reset parametre to default

// select thereset button
let resetBtn = document.querySelector('.reset-option button');
resetBtn.onclick = () => {
    // Clear the local storage
    localStorage.clear();

    // reload the page
    window.location.reload();
    
}

// toggle the menu

// select the toggle button
let toggleButton = document.querySelector('.toggle-menu');

// select the menu
let menu = document.querySelector('header ul');
toggleButton.onclick = (e) => { 
    e.stopPropagation();
    menu.classList.toggle('open');
    toggleButton.classList.toggle('menu-active');
}

// select the open small screen menu
let tLinks = document.querySelector('header ul .menu'); 

tLinks.onclick = (e) => {
    e.stopPropagation();
}

// stop propagatin on the menu

// Click everywhere 
document.addEventListener('click' , (e) => {
    if(e.target != toggleButton && e.target != tLinks){
            if(tLinks.classList.contains('open')) {
                toggleButton.classList.toggle('menu-active');
                tLinks.classList.toggle('open');
            }
    }
})

