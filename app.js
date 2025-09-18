document.addEventListener('DOMContentLoaded', function() {
    // Эффект "поднятия" и запуск видео только при наведении
    document.querySelectorAll('.video-item').forEach(item => {
        const video = item.querySelector('video');
        const videoInfo = item.querySelector('.video-info');
        
        item.addEventListener('mouseenter', function(e) {
            item.classList.add('raised');
            if (video) {
                video.currentTime = 0;
                video.muted = false;
                video.play().catch(() => {});
            }
        });
        
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 12;
            const rotateX = -((y - centerY) / centerY) * 12;
            
            // Применяем трансформацию ко всему элементу
            item.style.setProperty('--parallax-transform', `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`);
            
            // Также применяем к info для синхронизации
            if (videoInfo) {
                videoInfo.style.transform = `perspective(900px) rotateY(${rotateY * 0.5}deg) rotateX(${rotateX * 0.5}deg)`;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            item.classList.remove('raised');
            item.style.setProperty('--parallax-transform', 'rotateY(0deg) rotateX(0deg)');
            
            // Сбрасываем трансформацию info
            if (videoInfo) {
                videoInfo.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
            }
            
            if (video) {
                video.pause();
                video.muted = true;
            }
        });
    });
});
