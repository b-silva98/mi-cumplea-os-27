document.addEventListener("DOMContentLoaded", function () {
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
  
  // Control de Música
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const backgroundMusic = document.getElementById("backgroundMusic");
  
  let isPlaying = false;
  
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
        // Si hay error, mostrar alerta solo si el usuario intentó reproducir manualmente
        if (!isPlaying) {
          alert("No se pudo reproducir la música automáticamente. Haz clic en 'Reproducir' para intentarlo nuevamente.");
        }
      });
    }
  }
  
  // Reproducir automáticamente al cargar la página
  function autoPlayMusic() {
    if (backgroundMusic) {
      // Configurar el volumen (opcional, entre 0 y 1)
      backgroundMusic.volume = 0.7;
      
      // Intentar reproducción automática
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
          
          // Mostrar mensaje informativo (opcional)
          console.log("La música no pudo reproducirse automáticamente. El usuario debe interactuar primero.");
        });
      }
    }
  }
  
  // Event listener para el control de música
  if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener("click", toggleMusic);
    
    // Intentar reproducción automática después de un pequeño delay
    setTimeout(autoPlayMusic, 1000);
    
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
  
  // RSVP form submission
  const form = document.getElementById("rsvpForm");
  const submitBtn = document.getElementById("submitRsvp");
  const whatsappLink = document.getElementById("whatsappLink");
  
  // Actualizar enlace de WhatsApp por defecto
  function updateWhatsAppLink(message = "") {
    const defaultMessage = message || "Hola! Confirmo mi asistencia a la fiesta de cumpleaños. ¡Nos vemos!";
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  }
  
  // Inicializar enlace por defecto
  updateWhatsAppLink();
  
  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const name = document.getElementById("nameInput").value || "Invitado";
      const guests = document.getElementById("guestsInput").value || "0";
      const msg = document.getElementById("msgInput").value || "";
      
      // Build confirmation message
      let guestText = "Vengo solo/a";
      if (guests === "1") guestText = "1 acompañante";
      else if (guests === "2") guestText = "2 acompañantes";
      else if (guests === "3") guestText = "3 acompañantes";
      else if (guests === "4") guestText = "4 o más acompañantes";
      
      const text = `¡Hola! Soy ${name} y confirmo mi asistencia a tu cumpleaños. ${guestText}. ${msg ? `Mensaje: ${msg}` : ''}`;
      
      // Update WhatsApp link with custom message
      updateWhatsAppLink(text);
      
      // Show success feedback
      submitBtn.innerHTML = '<i class="bi bi-check2"></i> ¡Confirmado!';
      submitBtn.classList.remove('btn-accent');
      submitBtn.classList.add('btn-success');
      submitBtn.disabled = true;
      
      // Close modal after 2 seconds
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('rsvpModal'));
        modal.hide();
        
        // Reset button after modal closes
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Confirmar Asistencia';
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-accent');
          submitBtn.disabled = false;
          form.reset();
          // Restore default WhatsApp link
          updateWhatsAppLink();
        }, 500);
      }, 2000);
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