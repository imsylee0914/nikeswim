// ==========================================
// 1. Hero 메인 배너 자동 슬라이드 & 인디케이터 제어
// ==========================================
const heroItems = document.querySelectorAll('.hero-item');
const dots = document.querySelectorAll('.dots li');
const playPauseBtn = document.querySelector('.btn-play-pause');
const playPauseImg = playPauseBtn ? playPauseBtn.querySelector('img') : null;

let currentIndex = 0;
let slideInterval = null;
let isPlaying = true; // 기본 자동 재생 상태

// 슬라이드 변경 함수
function showSlide(index) {
  currentIndex = index;
  heroItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
    if (dots[i]) {
      dots[i].classList.toggle('active', i === index);
    }
  });
}

function nextSlide() {
  if (heroItems.length > 0) {
    const nextIndex = (currentIndex + 1) % heroItems.length;
    showSlide(nextIndex);
  }
}

// 자동 슬라이드 시작
function startSlide() {
  if (!slideInterval && heroItems.length > 0) {
    slideInterval = setInterval(nextSlide, 4000);
    isPlaying = true;
    if (playPauseImg) {
      playPauseImg.src = 'images/icon-pause.png';
      playPauseImg.alt = '일시정지';
    }
  }
}

// 자동 슬라이드 멈춤
function stopSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    isPlaying = false;
    if (playPauseImg) {
      playPauseImg.src = 'images/icon-play.png'; // 정지 시 play 아이콘으로 교체
      playPauseImg.alt = '재생';
    }
  }
}

// 초기 실행
if (heroItems.length > 0) {
  startSlide();
}

// 1) 도트 버튼 클릭 이벤트 (해당 순서 슬라이드로 이동)
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    // 도트 클릭 시 타이머 리셋 (연속 이동 방지)
    if (isPlaying) {
      stopSlide();
      startSlide();
    }
  });
});

// 2) 재생/일시정지 버튼 토글 이벤트
if (playPauseBtn) {
  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopSlide();
    } else {
      startSlide();
    }
  });
}


// ==========================================
// 2. 오프라인 매장 아코디언 & 지도 연동
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const mapImages = document.querySelectorAll('.map-img');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    if (header) {
      header.addEventListener('click', () => {
        // 1. 이미 열려있는 항목을 다시 누른 게 아니라면 다른 아코디언 모두 닫기
        const isAlreadyActive = item.classList.contains('active');

        accordionItems.forEach(i => i.classList.remove('active'));

        // 2. 선택한 아코디언 열기
        if (!isAlreadyActive) {
          item.classList.add('active');
        } else {
          // 이미 열려있는 것을 클릭 시 닫히도록 설정 (원하지 않을 경우 이 line 주석 처리 가능)
          item.classList.add('active'); 
        }

        // 3. 연동된 지도 이미지 변경 처리
        const targetMapId = item.getAttribute('data-target');

        mapImages.forEach(map => {
          map.classList.remove('active');
          if (map.id === targetMapId) {
            map.classList.add('active');
          }
        });
      });
    }
  });
});