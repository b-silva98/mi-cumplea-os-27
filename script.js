document.addEventListener("DOMContentLoaded", function () {
  // Actualizar fecha en el hero
  document.getElementById('dateText').textContent = 'Domingo, 7 de Diciembre • 21:00 hs';

  // Inicializar efectos visuales
  initConfetti();
  initMusic();
  initCountdown();
  initRSVP();
});

// =============================================
// PAPEL PICADO - ANIMACIÓN
// =============================================

function initConfetti() {
  function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // Crear 60 piezas de papel picado
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posición horizontal aleatoria
        const left = Math.random() * 100;
        confetti.style.left = `${left}%`;
        
        // Duración y delay aleatorios
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 3;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        // Tamaño aleatorio
        const size = 6 + Math.random() * 14;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Rotación inicial aleatoria
        const initialRotation = Math.random() * 360;
        confetti.style.transform = `rotate(${initialRotation}deg)`;
        
        // Opacidad aleatoria
        const opacity = 0.6 + Math.random() * 0.4;
        confetti.style.opacity = opacity;
        
        confettiContainer.appendChild(confetti);
        
        // Eliminar después de la animación
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, (duration + delay) * 1000);
      }, i * 50);
    }
    
    // Eliminar contenedor
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }, 10000);
  }

  // Iniciar inmediatamente y repetir
  createConfetti();
  setInterval(createConfetti, 6000);
}

// =============================================
// MÚSICA - CONTROL AUTOMÁTICO
// =============================================

function initMusic() {
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const backgroundMusic = document.getElementById("backgroundMusic");
  
  let isPlaying = true;

  function toggleMusic() {
    if (isPlaying) {
      backgroundMusic.pause();
      musicIcon.className = "bi bi-play-fill";
      musicText.textContent = " Reproducir";
      isPlaying = false;
    } else {
      backgroundMusic.play().then(() => {
        musicIcon.className = "bi bi-pause-fill";
        musicText.textContent = " Pausar";
        isPlaying = true;
      }).catch(error => {
        console.log("Error al reproducir música:", error);
      });
    }
  }
  
  function autoPlayMusic() {
    if (backgroundMusic) {
      backgroundMusic.volume = 0.7;
      const playPromise = backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicIcon.className = "bi bi-pause-fill";
          musicText.textContent = " Pausar";
          isPlaying = true;
        }).catch(error => {
          console.log("Reproducción automática bloqueada:", error);
          musicIcon.className = "bi bi-play-fill";
          musicText.textContent = " Reproducir";
          isPlaying = false;
        });
      }
    }
  }
  
  // Configurar eventos
  if (musicToggle && backgroundMusic) {
    autoPlayMusic();
    musicToggle.addEventListener("click", toggleMusic);
    
    // Intentar reproducir en primera interacción
    document.addEventListener('click', function firstInteraction() {
      if (!isPlaying) {
        autoPlayMusic();
      }
      document.removeEventListener('click', firstInteraction);
    });
    
    // Pausar al cerrar
    window.addEventListener('beforeunload', function() {
      if (isPlaying) {
        backgroundMusic.pause();
      }
    });
    
    // Loop infinito
    backgroundMusic.addEventListener('ended', function() {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(console.error);
    });
  }
}

// =============================================
// CONTADOR REGRESIVO
// =============================================

function initCountdown() {
  function updateCountdown() {
    const eventDate = new Date('2025-12-08T00:00:00');
    const now = new Date();
    const timeDiff = eventDate.getTime() - now.getTime();
    
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// =============================================
// CONFIRMACIÓN DE ASISTENCIA
// =============================================

function initRSVP() {
  // Tu número de teléfono
  const phoneNumber = "5493886479127";

  // Envío por WhatsApp
  document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('nameInput').value || "Invitado";
    const msg = document.getElementById('msgInput').value || "";
    
    // Construir mensaje
    let confirmationMsg = `¡Hola! Soy ${name} y confirmo mi asistencia a tu fiesta del 7 de Diciembre.`;
    
    if (msg) {
      confirmationMsg += ` ${msg}`;
    }
    
    confirmationMsg += `\n\n¡Nos vemos en la fiesta! 🎉`;
    
    // Abrir WhatsApp
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(confirmationMsg)}`;
    window.open(waLink, "_blank");
    
    // Feedback visual
    const submitBtn = document.getElementById('submitRsvp');
    submitBtn.innerHTML = '<i class="bi bi-check2"></i> ¡Enviado!';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('rsvpModal'));
      modal.hide();
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Confirmar por WhatsApp';
        submitBtn.disabled = false;
        document.getElementById('rsvpForm').reset();
      }, 500);
    }, 2000);
  });
}

// =============================================
// ANIMACIONES ADICIONALES
// =============================================

// Agregar animación CSS para modales
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .modal.fade .modal-content {
    animation: fadeIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Efectos hover mejorados
document.querySelectorAll('.btn, .nav-icon').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  element.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

console.log('🎉 Invitación cargada correctamente!');