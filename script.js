window.onload = function() {
    const container = document.querySelector('.gif-container');
    const gifs = document.querySelectorAll('.gif');
    container.style.display = 'none';
    gifs.forEach(gif => {
        gif.style.display = 'none';
    });
};
// Handle response
function handleResponse(answer) {
    const responseDiv = document.getElementById('response');
    const container = document.querySelector('.container');
    const btnContainer = document.querySelector('.btn-container');
    
    // Remove both buttons after one is clicked
    btnContainer.style.display = 'none';

    // Display the appropriate response
    if (answer === 'yes') {
        responseDiv.innerHTML = "Yay! You've made me the happiest person! 💜";
        responseDiv.style.color = '#ff4b8d';
        createConfetti();
        container.classList.add('animate__heartBeat');
    } else {
        responseDiv.innerHTML = "That's okay, we can still be great friends!";
        responseDiv.style.color = '#ff4b5c';
    }

    responseDiv.style.opacity = '1';
    responseDiv.classList.add('animate__animated', 'animate__fadeInUp');

    // Send the response to the Netlify backend
    sendResponseToServer(answer);
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#ff61a6', '#ff85b2', '#ff4b8d', '#ffd700', '#ff4b5c'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        confetti.animate([{
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1
        }, {
            transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 1000}deg)`,
            opacity: 0
        }], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Function to send response to Netlify backend
function sendResponseToServer(answer) {
    fetch('/.netlify/functions/response', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: answer })  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Initialize background animations
window.onload = () => {
    createFloatingHearts();
    createLoveParticles();
    createFloatingCurves();
};

// Floating hearts creation
function createFloatingHearts() {
    const backgroundLayer = document.querySelector('.background-layer');
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓','💜'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.animationDuration = (Math.random() * 10 + 5) + 's';

        const floatAnimation = [
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 1 }
        ];

        const animation = heart.animate(floatAnimation, {
            duration: 10000,
            easing: 'cubic-bezier(0.5, 0.1, 0.3, 0.9)',
            fill: 'forwards'
        });

        backgroundLayer.appendChild(heart);

        animation.onfinish = () => {
            heart.remove();
        };
    }, 500);
}

// Love particle effects
function createLoveParticles() {
    const backgroundLayer = document.querySelector('.background-layer');

    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('love-particle');
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-50px';

        const floatAnimation = [
            { 
                transform: 'translateY(0) translateX(0) scale(1)', 
                opacity: 0.7,
                backgroundColor: 'rgba(255,255,255,0.6)'
            },
            { 
                transform: `translateY(100vh) translateX(${Math.random() * 200 - 100}px) scale(0.5)`, 
                opacity: 0,
                backgroundColor: 'rgba(255,255,255,0)'
            }
        ];

        const animation = particle.animate(floatAnimation, {
            duration: 8000,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        });

        backgroundLayer.appendChild(particle);

        animation.onfinish = () => {
            particle.remove();
        };
    }, 100);
}

// Floating curve effects
function createFloatingCurves() {
    const backgroundLayer = document.querySelector('.background-layer');

    setInterval(() => {
        const curve = document.createElement('div');
        curve.classList.add('floating-curve');
        
        curve.style.left = Math.random() * 100 + 'vw';
        curve.style.top = '-50px';
        curve.style.transform = `rotate(${Math.random() * 360}deg)`;

        const floatAnimation = [
            { 
                transform: 'translateY(0) rotate(45deg)', 
                opacity: 0.3,
                width: '200px'
            },
            { 
                transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, 
                opacity: 0,
                width: '50px'
            }
        ];

        const animation = curve.animate(floatAnimation, {
            duration: 10000,
            easing: 'linear',
            fill: 'forwards'
        });

        backgroundLayer.appendChild(curve);

        animation.onfinish = () => {
            curve.remove();
        };
    }, 1000);
}
// Run this immediately when script loads
(function hideGifsImmediately() {
    // Hide gifs immediately when script loads
    document.addEventListener('DOMContentLoaded', function() {
        hideGifs();
    });
    
    // Also hide them as soon as possible
    if (document.querySelector('.gif-container')) {
        hideGifs();
    }
})();

function showGifs() {
    const container = document.querySelector('.gif-container');
    if (container) {
        container.style.display = 'block';
        container.classList.add('show');
        container.querySelectorAll('.gif').forEach(gif => {
            gif.style.display = 'block';
        });
    }
}

function hideGifs() {
    const container = document.querySelector('.gif-container');
    if (container) {
        container.style.display = 'none';
        container.classList.remove('show');
        container.querySelectorAll('.gif').forEach(gif => {
            gif.style.display = 'none';
        });
    }
}