// var swiperH = new Swiper('.swiper-container-h', {
//   spaceBetween: 50,
//   slidesPerView: 'auto',
//   centeredSlides: true,
//   grabCursor: true,
//   mousewheel: true,
//   history: {
//     key: 'slide',
//   },
//   pagination: {
//     el: '.swiper-pagination-h',
//     clickable: true,
//   },
// });

// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

export const goToContactForm = (target) => {
    console.log(`Hola que tal`);
    let scrollContainer = target;
    do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    let targetY = 0;
    do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    // start scrolling
    handlerScroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};
    
const handlerScroll = (c, a, b, i) => {
    i++; if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function(){ handlerScroll(c, a, b, i); }, 20);
}

/**
 * If contact form has been completed it must show the secondary sections
 * @param {*} show 
 */
export const showSecondarySectionsLanding = (show) => {
  const beneficiosHtml = document.getElementById('beneficios');
  const propiedadesHtml = document.getElementById('propiedades');
  const proptechHtml = document.getElementById('proptech');
    
  if ( show ) {
    beneficiosHtml?.classList.remove('hidden');
    propiedadesHtml?.classList.remove('hidden');
    proptechHtml?.classList.remove('hidden');
  } else {
    beneficiosHtml?.classList.add('hidden');
    propiedadesHtml?.classList.add('hidden');
    proptechHtml?.classList.add('hidden');
  }
}
// const adios 