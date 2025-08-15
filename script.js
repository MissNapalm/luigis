const videoSources = [
  'background2.mp4',
  'background4.webm',
  'background1.mp4',
  'background3.mp4',
];

let current = 0;
const videoEls = [
  document.getElementById('heroVideo1'),
  document.getElementById('heroVideo2')
];

// Initial setup
videoEls[0].src = videoSources[0];
videoEls[0].play();
videoEls[1].style.opacity = 0;

function crossfadeVideos() {
  const currentVid = videoEls[current % 2];
  const nextVid = videoEls[(current + 1) % 2];

  // Move to next video in the array
  current = (current + 1) % videoSources.length;
  const nextSource = videoSources[current];

  // Set up the next video
  nextVid.src = nextSource;
  nextVid.style.transition = 'none';
  nextVid.style.opacity = 0;
  nextVid.load();

  nextVid.oncanplay = () => {
    nextVid.oncanplay = null;
    nextVid.currentTime = 0;
    nextVid.play();

    // Crossfade
    setTimeout(() => {
      nextVid.style.transition = 'opacity 1s ease';
      currentVid.style.transition = 'opacity 1s ease';
      nextVid.style.opacity = 1;
      currentVid.style.opacity = 0;
    }, 50);

    // Pause the old video after fade
    setTimeout(() => {
      currentVid.pause();
      // Schedule next crossfade after 2 seconds
      setTimeout(crossfadeVideos, 2000);
    }, 1050);
  };
}

// Start crossfade after 2 seconds
setTimeout(crossfadeVideos, 2000);

document.addEventListener('DOMContentLoaded', () => {
  // Animate the three cards in .cards-wrapper
  const cards = document.querySelectorAll('.cards-wrapper .card');
  const cardObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 150);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach(card => cardObserver.observe(card));

  // Dramatic testimonial animation
  const testimonials = document.querySelectorAll('.testimonial-card');
  const testimonialObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 180);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  testimonials.forEach(card => testimonialObserver.observe(card));

  // Cool "Who We Are" animation
  const aboutCard = document.querySelector('.about-card');
  const aboutImage = document.querySelector('.about-image');
  
  if (aboutCard && aboutImage) {
    const aboutObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            aboutCard.classList.add('visible');
            setTimeout(() => {
              aboutImage.classList.add('visible');
            }, 100);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    aboutObserver.observe(aboutCard);
  }
});
