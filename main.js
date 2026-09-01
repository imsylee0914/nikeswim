// ==========================================
// 1. Hero 메인 배너 자동 슬라이드 & 인디케이터 제어
// ==========================================
const heroItems = document.querySelectorAll('.hero-item');
const dots = document.querySelectorAll('.dots li');
const playPauseBtn = document.querySelector('.btn-play-pause');
const playPauseImg = playPauseBtn ? playPauseBtn.querySelector('img') : null;

let currentIndex = 0;
let slideInterval = null;
let isPlaying = true;

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

function stopSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    isPlaying = false;
    if (playPauseImg) {
      playPauseImg.src = 'images/icon-play.png';
      playPauseImg.alt = '재생';
    }
  }
}

if (heroItems.length > 0) {
  startSlide();
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    if (isPlaying) {
      stopSlide();
      startSlide();
    }
  });
});

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
// 2. 오프라인 매장 아코디언 & 모바일 드로어 연동
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  const btnHamburger = document.querySelector('.btn-hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('.header');

  if (btnHamburger && mobileMenu && header) {
    btnHamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      header.classList.toggle('menu-open');
    });
  }

  const accordionToggles = document.querySelectorAll('.btn-accordion-toggle');

  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const parentItem = this.closest('.accordion-item-nav');

      document.querySelectorAll('.accordion-item-nav.has-sub').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('open');
        }
      });

      parentItem.classList.toggle('open');
    });
  });

  const accordionItems = document.querySelectorAll('.store-accordion .accordion-item');
  const mapImages = document.querySelectorAll('.map-img');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    if (header) {
      header.addEventListener('click', () => {
        const isAlreadyActive = item.classList.contains('active');

        accordionItems.forEach(i => i.classList.remove('active'));

        if (!isAlreadyActive) {
          item.classList.add('active');
        } else {
          item.classList.add('active'); 
        }

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

  const wishButtons = document.querySelectorAll('.btn-wish');

  wishButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      button.classList.toggle('active');
    });
  });

  const instaItems = document.querySelectorAll('.insta-item');
  const modal = document.getElementById('instaModal');
  const modalImg = document.getElementById('modalImg');
  const modalText = document.getElementById('modalText');
  const modalLink = document.getElementById('modalLink');
  const btnClose = document.querySelector('.btn-close-modal');
  const overlay = document.querySelector('.modal-overlay');

  instaItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      const imgSrc = item.getAttribute('data-img');
      const text = item.getAttribute('data-text');
      const link = item.getAttribute('data-link');

      if (imgSrc) modalImg.src = imgSrc;
      if (text) modalText.textContent = text;
      if (link) modalLink.href = link;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

});


// 스크롤 감지
const headerElement = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    headerElement.classList.add('scrolled');
  } else {
    headerElement.classList.remove('scrolled');
  }
});