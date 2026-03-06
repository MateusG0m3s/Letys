document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Background Particles ---
    const particlesContainer = document.getElementById('particles-container');
    const heartsCount = 15;

    for (let i = 0; i < heartsCount; i++) {
        createFloatingHeart();
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';

        particlesContainer.appendChild(heart);

        // Remove and recreate to loop
        heart.addEventListener('animationend', (e) => {
            if (e.animationName === 'floatUp') {
                heart.remove();
                createFloatingHeart();
            }
        });
    }

    // --- 2. Click Burst Effect ---
    document.body.addEventListener('click', (e) => {
        // Prevent on buttons or lightbox to not interfere
        if (e.target.tagName === 'BUTTON' || e.target.id === 'close-lightbox' || e.target.id === 'lightbox') return;

        const burstHeart = document.createElement('div');
        burstHeart.classList.add('click-heart');
        burstHeart.innerHTML = ['❤️', '✨', '💖', '🌸'][Math.floor(Math.random() * 4)];
        burstHeart.style.left = e.pageX + 'px';
        burstHeart.style.top = e.pageY + 'px';

        document.body.appendChild(burstHeart);

        setTimeout(() => {
            burstHeart.remove();
        }, 1000);
    });

    // --- 3. Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger on load

    // --- 4. Surprise Button & Typewriter ---
    const surpriseBtn = document.getElementById('surprise-btn');
    const bgMusic = document.getElementById('bg-music');
    const surpriseSection = document.getElementById('surprise-section');
    const typewriterText = document.getElementById('typewriter-text');

    const specialMessage = "Eu te amo mais do que as palavras podem expressar. Você é a mulher da minha vida!";
    let i = 0;

    function typeWriter() {
        if (i < specialMessage.length) {
            typewriterText.innerHTML += specialMessage.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    surpriseBtn.addEventListener('click', () => {
        // Play music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed / no file:", e));

        // Confetti explosion effect
        for (let j = 0; j < 30; j++) {
            setTimeout(() => {
                const h = document.createElement('div');
                h.classList.add('floating-heart');
                h.innerHTML = ['🌸', '💖', '✨'][Math.floor(Math.random() * 3)];
                h.style.left = 50 + (Math.random() * 20 - 10) + 'vw';
                h.style.top = 50 + 'vh';
                h.style.animation = 'popAndFade 1.5s ease-out forwards';
                document.body.appendChild(h);
                setTimeout(() => h.remove(), 1500);
            }, j * 50);
        }

        // Hide button, show text
        surpriseBtn.style.display = 'none';
        surpriseSection.classList.remove('hidden');

        // Scroll to it slightly
        setTimeout(() => {
            surpriseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            typeWriter();
        }, 500);
    });

    // --- 5. Love Counter ---
    // DEFINA A DATA AQUI: (Ano, Mês [0-11], Dia) 
    // Exemplo: 1 de Janeiro de 2022 -> new Date(2022, 0, 1)
    const startDate = new Date(2025, 9, 18); // Data placeholder, ajuste conforme necessário

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('time-counter').innerHTML = `
            <div class="time-segment"><span class="time-val">${days}</span><span class="time-label">Dias</span></div>
            <div class="time-segment"><span class="time-val">${hours}</span><span class="time-label">Horas</span></div>
            <div class="time-segment"><span class="time-val">${minutes}</span><span class="time-label">Min</span></div>
            <div class="time-segment"><span class="time-val">${seconds}</span><span class="time-label">Seg</span></div>
        `;
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    // --- 6. Lightbox & Dynamic Gallery 3x3 ---
    const allPhotos = [];
    // Gerar lista de 30 fotos (foto1.jpg até foto30.jpg)
    for (let i = 1; i <= 30; i++) {
        allPhotos.push(`foto${i}.jpg`);
    }

    const gallerySlots = document.querySelectorAll('.gallery-slot img');

    // Função para rodar uma imagem aleatória num slot aleatório
    function rotateRandomImage() {
        if (gallerySlots.length === 0) return;

        // Pega um slot aleatório do grid (0 a 8)
        const randomSlotIndex = Math.floor(Math.random() * gallerySlots.length);
        const slotImg = gallerySlots[randomSlotIndex];

        // Pega uma nova foto aleatória da lista de 30
        const randomPhoto = allPhotos[Math.floor(Math.random() * allPhotos.length)];

        // Aplica o efeito visual
        slotImg.classList.add('fade-out');

        // Depois que a opacidade zerar, troca a fonte e volta a opacidade
        setTimeout(() => {
            slotImg.src = randomPhoto;

            // Tratamento de erro pra fotos que não existam (mostra placeholder)
            slotImg.onerror = () => {
                slotImg.src = `https://via.placeholder.com/300/fecfef/4a4a4a?text=Foto`;
            };

            slotImg.classList.remove('fade-out');
            slotImg.classList.add('swing-in');

            // Remove a classe de animação após ela terminar para poder reusar
            setTimeout(() => {
                slotImg.classList.remove('swing-in');
            }, 700);
        }, 600); // sincronizado com o fade-out do CSS
    }

    // Inicializa o grid com as 9 primeiras fotos
    gallerySlots.forEach((img, index) => {
        img.src = allPhotos[index % allPhotos.length];
        img.onerror = () => {
            img.src = `https://via.placeholder.com/300/fecfef/4a4a4a?text=Foto`;
        };
    });

    // Inicia o loop para trocar imagens a cada X tempo (ex: 2.5s)
    setInterval(rotateRandomImage, 2500);

    // --- 7. Puzzle Assembly on Scroll ---
    const gallerySection = document.getElementById('gallery-section');
    const slots = document.querySelectorAll('.gallery-slot');
    let puzzleTriggered = false;
    let puzzleTimeouts = [];

    function checkPuzzleReveal() {
        const sectionTop = gallerySection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100 && !puzzleTriggered) {
            // Seção visível: encaixar peças uma a uma
            puzzleTriggered = true;

            // Ordem aleatória de encaixe
            const indices = Array.from({ length: slots.length }, (_, i) => i);
            for (let k = indices.length - 1; k > 0; k--) {
                const j = Math.floor(Math.random() * (k + 1));
                [indices[k], indices[j]] = [indices[j], indices[k]];
            }

            indices.forEach((slotIndex, order) => {
                const t = setTimeout(() => {
                    slots[slotIndex].classList.add('puzzle-in');
                }, order * 200); // 200ms entre cada peça
                puzzleTimeouts.push(t);
            });

        } else if (sectionTop >= windowHeight - 100 && puzzleTriggered) {
            // Seção saiu da tela: desencaixar tudo
            puzzleTriggered = false;
            puzzleTimeouts.forEach(t => clearTimeout(t));
            puzzleTimeouts = [];
            slots.forEach(slot => slot.classList.remove('puzzle-in'));
        }
    }

    window.addEventListener('scroll', checkPuzzleReveal);
    checkPuzzleReveal();

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');

    // Mudar de galleryImgs para usar o clique dinâmico
    document.querySelector('.gallery-grid').addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            if (e.target.src.includes('placeholder')) {
                lightboxImg.style.background = 'white';
            }
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

});
