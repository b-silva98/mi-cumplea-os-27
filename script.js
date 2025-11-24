document.addEventListener("DOMContentLoaded", function () {
  // Actualizar fecha en el hero
  document.getElementById('dateText').textContent = 'Domingo, 7 de Diciembre • 21:00 hs';

  // Crear papel picado rojo y blanco
  function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // Crear 60 piezas de papel picado (más cantidad)
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posición horizontal aleatoria
        const left = Math.random() * 100;
        confetti.style.left = `${left}%`;
        
        // Duración y delay aleatorios
        const duration = 3 + Math.random() * 4; // 3-7 segundos
        const delay = Math.random() * 3; // 0-3 segundos de delay
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        // Tamaño aleatorio (más variación)
        const size = 6 + Math.random() * 14; // 6-20px
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Rotación inicial aleatoria
        const initialRotation = Math.random() * 360;
        confetti.style.transform = `rotate(${initialRotation}deg)`;
        
        // Opacidad aleatoria para más realismo
        const opacity = 0.6 + Math.random() * 0.4; // 0.6-1.0
        confetti.style.opacity = opacity;
        
        confettiContainer.appendChild(confetti);
        
        // Eliminar el confetti después de que termine la animación
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, (duration + delay) * 1000);
      }, i * 50); // Espaciar más rápido la creación (cada 50ms)
    }
    
    // Eliminar el contenedor después de que termine todo el confetti
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }, 10000); // 10 segundos
  }

  // Iniciar papel picado inmediatamente
  createConfetti();

  // Repetir cada 6 segundos (más frecuente)
  setInterval(createConfetti, 6000);

  // Tu número de teléfono (con código de país)
  const phoneNumber = "5493886479127";
  
  // Control de Música - REPRODUCCIÓN AUTOMÁTICA
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const backgroundMusic = document.getElementById("backgroundMusic");
  
  let isPlaying = true; // Iniciar como reproduciéndose
  
  // Función para controlar la música
  function toggleMusic() {
    if (isPlaying) {
      backgroundMusic.pause();
      musicIcon.className = "bi bi-play-fill";
      musicText.textContent = " Reproducir";
      isPlaying = false;
    } else {
      // Intentar reproducir la música
      backgroundMusic.play().then(() => {
        musicIcon.className = "bi bi-pause-fill";
        musicText.textContent = " Pausar";
        isPlaying = true;
      }).catch(error => {
        console.log("Error al reproducir música:", error);
        alert("No se pudo reproducir la música. Haz clic en 'Reproducir' para intentarlo nuevamente.");
      });
    }
  }
  
  // Reproducir automáticamente al cargar la página
  function autoPlayMusic() {
    if (backgroundMusic) {
      // Configurar el volumen (opcional, entre 0 y 1)
      backgroundMusic.volume = 0.7;
      
      // Intentar reproducción automática inmediata
      const playPromise = backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Reproducción exitosa
          musicIcon.className = "bi bi-pause-fill";
          musicText.textContent = " Pausar";
          isPlaying = true;
          console.log("Música reproduciéndose automáticamente");
        }).catch(error => {
          // La reproducción automática falló
          console.log("Reproducción automática bloqueada:", error);
          musicIcon.className = "bi bi-play-fill";
          musicText.textContent = " Reproducir";
          isPlaying = false;
          
          // Mostrar mensaje informativo
          console.log("La música no pudo reproducirse automáticamente. El usuario debe interactuar primero.");
        });
      }
    }
  }
  
  // Event listener para el control de música
  if (musicToggle && backgroundMusic) {
    // Intentar reproducción automática inmediatamente
    autoPlayMusic();
    
    musicToggle.addEventListener("click", toggleMusic);
    
    // También intentar cuando el usuario haga cualquier interacción
    document.addEventListener('click', function firstInteraction() {
      if (!isPlaying) {
        autoPlayMusic();
      }
      document.removeEventListener('click', firstInteraction);
    });
    
    // Pausar música cuando se cierra la página
    window.addEventListener('beforeunload', function() {
      if (isPlaying) {
        backgroundMusic.pause();
      }
    });
    
    // Manejar cuando la música termina
    backgroundMusic.addEventListener('ended', function() {
      // Reiniciar la música cuando termine
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(error => {
        console.log("Error al reiniciar música:", error);
      });
    });
  }

  // CONTADOR REGRESIVO REAL - 8 de Diciembre 2025 (TU CUMPLEAÑOS)
  function updateCountdown() {
    const eventDate = new Date('2025-12-08T00:00:00'); // 8 de Diciembre 2025
    const now = new Date();
    
    const timeDiff = eventDate.getTime() - now.getTime();
    
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      // Actualizar elementos del DOM
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
      // Si ya pasó la fecha
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }
  
  // Actualizar contador inmediatamente y cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // RSVP form submission - SIMPLIFICADO
  const form = document.getElementById("rsvpForm");
  const submitBtn = document.getElementById("submitRsvp");
  
  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const name = document.getElementById("nameInput").value || "Invitado";
      const msg = document.getElementById("msgInput").value || "";
      
      // Build confirmation message - MÁS SIMPLE
      const confirmationMsg = msg 
        ? `¡Hola! Soy ${name} y confirmo mi asistencia a tu fiesta del 7 de Diciembre. ${msg}`
        : `¡Hola! Soy ${name} y confirmo mi asistencia a tu fiesta del 7 de Diciembre. ¡Nos vemos!`;
      
      // Open WhatsApp directly
      const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(confirmationMsg)}`;
      window.open(waLink, "_blank");
      
      // Show success feedback
      submitBtn.innerHTML = '<i class="bi bi-check2"></i> ¡Redirigiendo a WhatsApp!';
      submitBtn.classList.remove('btn-accent');
      submitBtn.classList.add('btn-success');
      submitBtn.disabled = true;
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('rsvpModal'));
        modal.hide();
        
        // Reset button after modal closes
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Confirmar por WhatsApp';
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-accent');
          submitBtn.disabled = false;
          form.reset();
        }, 500);
      }, 1500);
    });
  }
  
  // Add smooth animations to modals
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('show.bs.modal', function () {
      this.style.animation = 'fadeIn 0.3s ease-out';
    });
  });
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
});