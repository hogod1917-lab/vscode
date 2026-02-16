const card = document.querySelector('.profile-card');
const container = document.body;

// 마우스 움직임 감지
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// 마우스가 떠날 때 복구
container.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    card.style.transition = "all 0.5s ease";
});

container.addEventListener('mouseenter', () => {
    card.style.transition = "none";
});

// 클릭 시 폭죽 효과
document.addEventListener('click', (e) => {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const colors = ['#0984e3', '#00cec9', '#6c5ce7', '#fab1a0', '#fdcb6e'];
        const size = Math.random() * 8 + 4;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        const destX = e.clientX + (Math.random() - 0.5) * 250;
        const destY = e.clientY + (Math.random() - 0.5) * 250;

        particle.animate([
            { transform: `translate(${e.clientX}px, ${e.clientY}px)`, opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => particle.remove();
    }
});
// 기존 코드 아래에 추가하세요
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');
let index = 0;
let slideInterval;

// 슬라이드 이동 핵심 함수
function updateSlide() {
    const moveX = -index * 33.333;
    track.style.transform = `translateX(${moveX}%)`;
}

// 다음 슬라이드 (자동/수동 공용)
function nextSlide() {
    index++;
    if (index >= slides.length) index = 0;
    updateSlide();
}

// 수동 이동 함수 (버튼 클릭용)
function moveSlide(step) {
    // 자동 재생 타이머 초기화 (사용자가 클릭하면 5초 다시 시작)
    clearInterval(slideInterval);
    
    index += step;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    updateSlide();
    startTimer(); // 클릭 후 다시 타이머 시작
}

// 5초 타이머 시작 함수
function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}

// 초기 실행
startTimer();