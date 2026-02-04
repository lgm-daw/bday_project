document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".card");
    const btn = document.getElementById("btnDetalles");
    const detalles = document.getElementById("detalles");

    // Animación de entrada suave
    setTimeout(() => {
        card.classList.remove("hidden");
    }, 300);

    // Función para cambiar el texto del botón
    const actualizarTextoBoton = (estaOculto) => {
        btn.textContent = estaOculto
            ? "Pulsar para abrir detalles 🎁"
            : "Cerrar detalles";
    };

    // Función para efecto de confeti (opcional)
    const crearConfeti = () => {
        const colores = ['#ff9a9e', '#fad0c4', '#a6c1ee', '#fbc2eb', '#ffecd2'];
        for (let i = 0; i < 20; i++) {
            const confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.style.left = Math.random() * 100 + 'vw';
            confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            confeti.style.width = Math.random() * 10 + 5 + 'px';
            confeti.style.height = confeti.style.width;
            document.body.appendChild(confeti);
            
            // Animación
            const anim = confeti.animate([
                { top: '-10px', opacity: 1, transform: 'rotate(0deg)' },
                { top: '100vh', opacity: 0.7, transform: 'rotate(' + (Math.random() * 360) + 'deg)' }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            anim.onfinish = () => confeti.remove();
        }
    };

    // Evento click del botón
    btn.addEventListener("click", () => {
        const estaOculto = detalles.classList.toggle("hidden");
        actualizarTextoBoton(estaOculto);

        // Efecto confeti cuando se abren los detalles (solo la primera vez)
        if (!estaOculto && !detalles.dataset.confetiLanzado) {
            crearConfeti();
            detalles.dataset.confetiLanzado = "true";
            
            // Reproducir sonido de felicitación si el usuario ha interactuado
            if (typeof Audio !== 'undefined') {
                try {
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-horn-576.mp3');
                    audio.volume = 0.3;
                    audio.play().catch(e => console.log("Audio no reproducido automáticamente"));
                } catch(e) {
                    // Silenciar error si no hay audio
                }
            }
        }

        // Enfocar detalles para accesibilidad (si se muestran)
        if (!estaOculto) {
            setTimeout(() => {
                detalles.setAttribute('tabindex', '-1');
                detalles.focus();
            }, 10);
        }
    });

    // Accesibilidad: Permitir activar con teclado
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });

    // Doble click sorpresa (opcional)
    let clickCount = 0;
    let clickTimer;
    btn.addEventListener('dblclick', () => {
        clearTimeout(clickTimer);
        clickCount = 0;
        // Cambiar temporalmente el texto del botón
        const originalText = btn.textContent;
        btn.textContent = '🎉 ¡DOBLE FELICIDAD! 🎉';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    });

    // Inicializar texto del botón
    actualizarTextoBoton(true);
});