document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
        });
    
        document.getElementById('back-to-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    
        const stressForm = document.getElementById('stress-form');
        const nextButton = document.getElementById('next-question');
        const stressResult = document.getElementById('stress-result');
        let currentStep = 1;
        let score = 0;
    
        nextButton.addEventListener('click', () => {
            const currentQ = document.querySelector(`.question[data-step="${currentStep}"]`);
            const selected = currentQ.querySelector('input:checked');
            if (selected) {
                score += parseInt(selected.value);
                if (currentStep === 1) {
                    currentQ.style.display = 'none';
                    document.querySelector(`.question[data-step="2"]`).style.display = 'block';
                    nextButton.textContent = 'Result Dekh!';
                    currentStep++;
                } else {
                    stressForm.style.display = 'none';
                    const level = score <= 4 ? 'Chill Hai Tu' : score <= 8 ? 'Thoda Stress Hai' : 'Bhai Relax Kar!';
                    stressResult.innerHTML = `Tera Stress Level: <strong>${level}</strong> (Score: ${score}/10)`;
                    gsap.from(stressResult, { opacity: 0, y: 20, duration: 1 });
                }
            } else {
                alert('Bhai, kuch toh chun!');
            }
        });
    
        const recSlider = document.getElementById('rec-slider');
        const recommendations = {
            happy: ['Nach le bhai!', 'Dost ke saath selfie le', 'Mithai kha le'],
            calm: ['Chai pi aur relax kar', 'Ek acchi kitab padh', 'Nature mein ghoom'],
            sad: ['Ek comedy movie dekh', 'Kisi se baat kar', 'Thodi si ice cream kha'],
            angry: ['Pillow pe chillao', 'Run pe jaa', 'Deep breaths le']
        };
    
        function updateRecommendations(mood) {
            recSlider.innerHTML = '';
            (recommendations[mood] || recommendations.calm).forEach(text => {
                const item = document.createElement('div');
                item.classList.add('rec-item');
                item.textContent = text;
                gsap.from(item, { opacity: 0, x: 50, duration: 0.5 });
                recSlider.appendChild(item);
            });
        }
        updateRecommendations('calm');
    
        gsap.from('.navbar', { opacity: 0, y: -50, duration: 1 });
        gsap.from('.stress-test', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
        gsap.from('.recommendations', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
    });