const CONFIG = {
    disableReviews: false
};

function scrollToOrder() {
    const orderSection = document.querySelector('.order-section');
    if (orderSection) {
        orderSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function toggleReviews() {
    const reviewsSection = document.getElementById('reviewsSection');
    if (CONFIG.disableReviews) {
        reviewsSection.style.display = 'none';
    }
}

class CountdownTimer {
    constructor() {
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');

        this.init();
    }

    init() {
        let endTime = localStorage.getItem('countdownEndTime');

        if (!endTime) {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            endTime = endOfDay.getTime();
            localStorage.setItem('countdownEndTime', endTime);
        }

        this.endTime = parseInt(endTime);
        this.updateTimer();
        this.startTimer();
    }

    updateTimer() {
        const now = new Date().getTime();
        const distance = this.endTime - now;

        if (distance < 0) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 999);
            this.endTime = tomorrow.getTime();
            localStorage.setItem('countdownEndTime', this.endTime);
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.daysElement.textContent = days.toString().padStart(2, '0');
        this.hoursElement.textContent = hours.toString().padStart(2, '0');
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    startTimer() {
        setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
}

class VideoController {
    constructor() {
        this.video = document.getElementById('mainVideo');
        this.soundToggle = document.getElementById('soundToggle');
        this.isMuted = true;

        if (!this.video) {
            console.warn('[VideoController] #mainVideo not found');
            return;
        }
        this.init();
    }

    init() {
        this.video.controls = false;
        this.video.muted = true;

        this.soundToggle.addEventListener('click', () => {
            this.toggleSound();
        });

        this.video.addEventListener('error', () => {
            console.log('Video error');
        });
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        this.video.muted = this.isMuted;

        const icon = this.soundToggle.querySelector('i');
        if (this.isMuted) {
            icon.className = 'fas fa-volume-mute';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }
}

class OrderForm {
    constructor() {
        this.form = document.getElementById('orderForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const phone = formData.get('phone');

        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;

        try {
            const newPriceElement = document.querySelector('.price-new');
            const productNameElement = document.querySelector('.product-name');

            const newPrice = newPriceElement ? newPriceElement.textContent.replace(' BYN', '') : '';
            const productName = productNameElement ? productNameElement.textContent : 'товар';

            const response = await emailjs.send(
                'service_b9x4sni',
                'template_2ks2cks',
                {
                    to_email: 'fanfictionsapp@gmail.com',
                    from_name: name,
                    from_phone: phone,
                    product_name: productName,
                    price: newPrice
                }
            );

            window.location.href = 'thank-you.html';

        } catch (error) {
            console.error('Send error:', error);
            alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
}

function initSmoothScroll() {

    const heroButton = document.querySelector('.hero-cta');

    if (heroButton) {
        heroButton.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            const orderSection = document.querySelector('.order-section');
            if (orderSection) {
                orderSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
    }

    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach((button, index) => {
        if (button.type !== 'submit') {
            button.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                const orderSection = document.querySelector('.order-section');
                if (orderSection) {
                    orderSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            };
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing...');
    toggleReviews();
    new CountdownTimer();

    if (document.getElementById('mainVideo')) {
        new VideoController();
    }

    new OrderForm();
    initSmoothScroll();

    if (typeof emailjs !== 'undefined') {
        emailjs.init('z99brygNjk9IFEvCf');
    } else {
        console.log('EmailJS failed');
    }

    console.log('Initialized');
});

