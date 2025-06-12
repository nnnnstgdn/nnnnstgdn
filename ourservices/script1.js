document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.services-slider');
    const cards = Array.from(slider.querySelectorAll('.service-card'));
    slider.addEventListener('scroll', () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft < 0) slider.scrollLeft = 0;
        if (slider.scrollLeft > maxScroll) slider.scrollLeft = maxScroll;
    });
    //Вопрос ответ через localStorage
    const defaultFaq = [
        {
            q: 'Выделяет ли кварцвинил Royce формальдегид и другие вредные вещества?',
            a: 'Кварцвинил Royce не содержит формальдегид и другие вредные вещества. Этот материал производится с использованием экологически чистых компонентов и соответствует всем современным требованиям безопасности и экологичности. Вы можете использовать его для строительства без опасения о вредных эффектах на здоровье.'
        },
        {
            q: 'Насколько прочными являются замки SPC ламината Royce?',
            a: 'Ответ на этот вопрос.'
        },
        {
            q: 'Чем мыть каменно полимерное напольное покрытие и кварц виниловый ламинат?',
            a: 'Ответ на этот вопрос.'
        },
        {
            q: 'Какую площадь можно застелить ламинатом, чтобы не было разрывов?',
            a: 'Ответ на этот вопрос.'
        },
        {
            q: 'Можно ли укладывать SPC Royce ламинат где много воды?',
            a: 'Ответ на этот вопрос.'
        }
    ];
    // инициализируем localStorage
    if (!localStorage.getItem('faqData')) {
        localStorage.setItem('faqData', JSON.stringify(defaultFaq));
    }
    const faqData = JSON.parse(localStorage.getItem('faqData'));
    const faqList = document.querySelector('.faq-list');
    faqList.innerHTML = '';
    faqData.forEach((item) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `<button class="faq-question">${item.q}<span class="faq-toggle">
                <svg width="32" height="32"><use xlink:href="#icon-plus"></use></svg>
            </span></button>
            <div class="faq-answer">${item.a}</div>`;
        faqList.appendChild(faqItem);
    });
    // Обработка
    const faqItems = document.querySelectorAll('.faq-item');
    function smoothHeight(element, from, to) {
        let start = null;
        const duration = 300;
        function animate(currentTime) {
            if (!start) start = currentTime;
            const progress = (currentTime - start) / duration;
            if (progress < 1) {
                const current = from + (to - from) * progress;
                element.style.height = current + 'px';
                requestAnimationFrame(animate);
            } else {
                element.style.height = to + 'px';
            }
        }
        requestAnimationFrame(animate);
    }

    const closeAllAnswers = () => {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            const answer = item.querySelector('.faq-answer');
            item.classList.remove('active');
            smoothHeight(answer, answer.offsetHeight, 0);
        });
    };

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            closeAllAnswers(); // закрываем все остальные ответы
            // И переключаем текущий ответ
            if (!isActive) {
                item.classList.add('active');
                answer.style.height = 'auto';
                const targetHeight = answer.offsetHeight;
                answer.style.height = '0px';
                smoothHeight(answer, 0, targetHeight);
            } else {
                smoothHeight(answer, answer.offsetHeight, 0);
                item.classList.remove('active');
            }
        });
    });
}); 