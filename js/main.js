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

// Change the background-image;

let landingPage = document.querySelector('.landing-page');
// select previous and next buttons
let previous = document.querySelector('.previous-back');
let next = document.querySelector('.next-back'); 

let images = ['phoneblue.jpg', 'moutanBeutiful.jpg', 'mountagne.jpg'];
let currentImage = 0;
console.log(next);

// the next background
next.onclick = () => {
    currentImage++;
    console.log(currentImage)
    let index = currentImage % images.length
    if (index > (images.length - 1)) {
        console.log('it is enough')
    }else {
        landingPage.style.setProperty('background-image', `url(../img/${images[index]})`);
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
    }
    
}

// Change the background each 3 seconds.
 let randomBackround = setInterval(() => {
     currentImage++;
     landingPage.style.setProperty('background-image', `url(../img/${images[currentImage % images.length]})`);
 }, 3000);

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
console.log(listColors)

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

        // Remove the class active from all items in the list
        e.target.parentElement.querySelectorAll('.active').forEach(li => li.classList.remove('active'));

        // add class active to the current li
        e.target.classList.add('active');

        
    }
});

// Able or disable the random background
let yes = document.querySelector('.background-options .yes');
let no = document.querySelector('.background-options .no');

yes.onclick = () => {
    randomBackround;
    localStorage.setItem('random-background' , 'yes');
    no.classList.remove('active');
    yes.classList.add('active');
}

no.onclick= () => {
    clearInterval(randomBackround);
    localStorage.setItem('random-background' , 'no');
    yes.classList.remove('active');
    no.classList.add('active');
    
}

