document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
        });
    
        document.getElementById('back-to-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    
        const ctx = document.getElementById('progress-chart').getContext('2d');
        let chart;
    
        function updateProgressChart() {
            const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
            const moodCounts = { happy: 0, calm: 0, sad: 0, angry: 0 };
            entries.forEach(e => moodCounts[e.mood]++);
    
            if (chart) chart.destroy();
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Happy', 'Calm', 'Sad', 'Angry'],
                    datasets: [{
                        label: 'Mood ka Trend',
                        data: [moodCounts.happy, moodCounts.calm, moodCounts.sad, moodCounts.angry],
                        backgroundColor: ['#4CAF50', '#2196F3', '#F44336', '#FF9800']
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });
        }
        updateProgressChart();
    
        gsap.from('.navbar', { opacity: 0, y: -50, duration: 1 });
        gsap.from('.dashboard', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    });