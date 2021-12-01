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

// handle active classes between buttons
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

export {handleActiveClass , scrollToSection}