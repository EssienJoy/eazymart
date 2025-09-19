

// Creates a smooth slider
export function slider() {
    // Selects all sliders
    document.querySelectorAll('.slider').forEach((sliderEl) => {
        const slides = sliderEl.querySelectorAll('.slide');
        const btnLeft = sliderEl.querySelector('.btn-left');
        const btnright = sliderEl.querySelector('.btn-right');


        let curSlide = 0;
        const maxSlide = slides.length;

        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * i}%)`;
        });

        btnright.addEventListener('click', function () {
            curSlide++;

            if (curSlide === maxSlide) {
                curSlide = 0;

                slides.forEach((s, i) => {
                    s.style.transition = 'none';
                    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
                });

                return;
            }


            slides.forEach((s, i) => {
                s.style.transition = 'transform 1s 0.3s ';
                s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
            });
        });


        btnLeft.addEventListener('click', function () {
            curSlide--;

            if (curSlide < 0) {
                curSlide = maxSlide - 1;

                slides.forEach((s, i) => {
                    s.style.transition = 'none';
                    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
                });

                return;

            }

            slides.forEach((s, i) => {
                s.style.transition = 'transform 1s';
                s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
            });
        });

    });
}
slider();

// Updates Blur Image
export const srcImageUpdate = function () {
    const blurImage = document.querySelector('.blur-img');
    if (!blurImage) return;

    const imageSrc = blurImage.dataset.blurimage;
    blurImage.src = imageSrc;
    blurImage.classList.remove('blur-img');
    blurImage.style.opacity = '1';
};


