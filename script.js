/**
 * ============================================================================
 * DRASHTI'S SPECIAL BIRTHDAY EXPERIENCE — JAVASCRIPT
 * Architecture:
 * - Real state management
 * - Mystery reveal & verification logic
 * - Interactive cake candle extinguishing
 * - 4-step progressive memory unlocking with lightbox
 * - Interactive 3D envelope apology
 * - Final full celebration with quiet moment ending
 * - Graceful audio handling with fallback
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // MEMORIES CONFIGURATION (Uses the 4 real existing photos)
  // --------------------------------------------------------------------------
  const memories = [
    {
      image: 'images/photo1.jpg',
      caption: 'A memory worth keeping. ❤️'
    },
    {
      image: 'images/photo2.jpg',
      caption: 'One of those moments.'
    },
    {
      image: 'images/photo3.jpg',
      caption: 'A moment to remember.'
    },
    {
      image: 'images/photo4.jpg',
      caption: "One I'll always remember. ❤️"
    }
  ];

  // --------------------------------------------------------------------------
  // APPLICATION STATE
  // --------------------------------------------------------------------------
  const birthdayState = {
    currentScreen: 1,
    verified: false,
    candlesExtinguished: 0,
    candlesTarget: 3,
    wishUnlocked: false,
    currentMemoryIndex: 0,
    memoriesUnlockedCount: 1, // Memory 01 starts unlocked
    memoriesViewed: [true, false, false, false],
    apologyOpened: false,
    celebrationStarted: false,
    isPlayingMusic: false
  };

  // --------------------------------------------------------------------------
  // DOM REFERENCES
  // --------------------------------------------------------------------------
  const elements = {
    // Header & Progression
    stepIndicators: document.querySelectorAll('.step-indicator'),
    soundPillBtn: document.getElementById('sound-pill-btn'),
    soundIcon: document.getElementById('sound-icon'),
    audioEl: document.getElementById('birthday-audio'),
    ambientGlow: document.getElementById('ambient-glow'),
    cursorGlow: document.getElementById('cursor-glow'),
    atmosphereLayer: document.getElementById('atmosphere-layer'),

    // Screen 1
    loadLine1: document.getElementById('load-line-1'),
    loadLine2: document.getElementById('load-line-2'),
    loadLine3: document.getElementById('load-line-3'),
    detectionPanel: document.getElementById('detection-panel'),
    btnScreen1Open: document.getElementById('btn-screen-1-open'),

    // Screen 2
    verificationForm: document.getElementById('verification-form'),
    nameInput: document.getElementById('name-input'),
    btnVerifyName: document.getElementById('btn-verify-name'),
    verificationAlert: document.getElementById('verification-alert'),

    // Screen 3
    interactiveCake: document.getElementById('interactive-cake'),
    candles: document.querySelectorAll('.cake-candles .candle'),
    cakePromptArea: document.getElementById('cake-prompt-area'),
    wishUnlockedPanel: document.getElementById('wish-unlocked-panel'),
    btnScreen3Continue: document.getElementById('btn-screen-3-continue'),

    // Screen 4
    memCardTabs: [
      document.getElementById('mem-card-tab-0'),
      document.getElementById('mem-card-tab-1'),
      document.getElementById('mem-card-tab-2'),
      document.getElementById('mem-card-tab-3')
    ],
    memoryImageContainer: document.getElementById('memory-image-container'),
    activeMemoryImage: document.getElementById('active-memory-image'),
    memoryBadgeLabel: document.getElementById('memory-badge-label'),
    memoryCaptionText: document.getElementById('memory-caption-text'),
    btnMemoryPrev: document.getElementById('btn-memory-prev'),
    btnMemoryNext: document.getElementById('btn-memory-next'),
    memoryStepCounter: document.getElementById('memory-step-counter'),
    memoryCompletionBox: document.getElementById('memory-completion-box'),
    btnScreen4Continue: document.getElementById('btn-screen-4-continue'),

    // Screen 5
    btnScreen5Continue: document.getElementById('btn-screen-5-continue'),

    // Screen 6
    btnScreen6Continue: document.getElementById('btn-screen-6-continue'),

    // Screen 7
    envelopeWrapper: document.getElementById('envelope-3d-wrapper'),
    apologyDeliveredBox: document.getElementById('apology-delivered-box'),
    apologyActionFooter: document.getElementById('apology-action-footer'),
    btnScreen7Continue: document.getElementById('btn-screen-7-continue'),

    // Screen 8
    btnScreen8Continue: document.getElementById('btn-screen-8-continue'),

    // Screen 9
    celebrationReadyBox: document.getElementById('celebration-ready-box'),
    btnStartCelebration: document.getElementById('btn-start-celebration'),
    celebrationActivePanel: document.getElementById('celebration-active-panel'),
    finalQuietMoment: document.getElementById('final-quiet-moment'),

    // Lightbox
    lightboxModal: document.getElementById('photo-lightbox-modal'),
    lightboxOverlay: document.getElementById('lightbox-overlay'),
    lightboxCloseBtn: document.getElementById('lightbox-close-btn'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxCaptionText: document.getElementById('lightbox-caption-text'),
    lightboxCounter: document.getElementById('lightbox-counter'),
    lightboxPrevBtn: document.getElementById('lightbox-prev-btn'),
    lightboxNextBtn: document.getElementById('lightbox-next-btn')
  };

  // --------------------------------------------------------------------------
  // SCREEN TRANSITION LOGIC
  // --------------------------------------------------------------------------
  function goToScreen(targetIndex) {
    if (targetIndex < 1 || targetIndex > 9) return;

    const currentScreenEl = document.getElementById(`screen-${birthdayState.currentScreen}`);
    const targetScreenEl = document.getElementById(`screen-${targetIndex}`);

    if (!targetScreenEl) return;

    if (currentScreenEl) {
      currentScreenEl.classList.remove('visible');

      setTimeout(() => {
        currentScreenEl.classList.remove('active');
        currentScreenEl.style.display = 'none';

        targetScreenEl.style.display = 'block';
        targetScreenEl.classList.add('active');

        // Scroll smoothly to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        requestAnimationFrame(() => {
          targetScreenEl.classList.add('visible');
        });

        birthdayState.currentScreen = targetIndex;
        updateStepper(targetIndex);

        // Autofocus input on screen 2
        if (targetIndex === 2 && elements.nameInput) {
          setTimeout(() => elements.nameInput.focus(), 300);
        }
      }, 300);
    }
  }

  function updateStepper(screenIndex) {
    elements.stepIndicators.forEach((ind) => {
      const stepVal = parseInt(ind.getAttribute('data-step'), 10);
      ind.classList.toggle('active', stepVal === screenIndex);
      ind.classList.toggle('passed', stepVal < screenIndex);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 1: BIRTHDAY ALERT (ANIMATED PROTOCOL)
  // --------------------------------------------------------------------------
  function initializeScreen1() {
    setTimeout(() => {
      if (elements.loadLine1) elements.loadLine1.style.opacity = '1';
    }, 400);

    setTimeout(() => {
      if (elements.loadLine2) elements.loadLine2.style.opacity = '1';
    }, 1000);

    setTimeout(() => {
      if (elements.loadLine3) elements.loadLine3.style.opacity = '1';
    }, 1600);

    setTimeout(() => {
      if (elements.detectionPanel) {
        elements.detectionPanel.style.display = 'block';
      }
    }, 2200);

    if (elements.btnScreen1Open) {
      elements.btnScreen1Open.addEventListener('click', () => {
        goToScreen(2);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: INTERACTIVE VERIFICATION
  // --------------------------------------------------------------------------
  function verifyUser() {
    const rawVal = elements.nameInput.value.trim().toLowerCase();

    if (rawVal === 'drashti') {
      birthdayState.verified = true;
      elements.nameInput.disabled = true;
      elements.btnVerifyName.disabled = true;

      elements.verificationAlert.className = 'verification-alert success';
      elements.verificationAlert.innerHTML = `
        Identity confirmed.<br>
        <strong>Welcome, Drashti. ❤️</strong>
      `;

      setTimeout(() => {
        goToScreen(3);
      }, 1200);
    } else {
      elements.verificationAlert.className = 'verification-alert error';
      elements.verificationAlert.innerHTML = `
        Hmm... that's not quite right.<br>
        Try again. 🙂
      `;
      elements.nameInput.value = '';
      elements.nameInput.focus();
    }
  }

  function initializeVerification() {
    if (elements.btnVerifyName) {
      elements.btnVerifyName.addEventListener('click', verifyUser);
    }
    if (elements.verificationForm) {
      elements.verificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        verifyUser();
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 3: BIRTHDAY REVEAL & INTERACTIVE CAKE
  // --------------------------------------------------------------------------
  function initializeCandles() {
    elements.candles.forEach((candle) => {
      candle.addEventListener('click', (e) => {
        e.stopPropagation();
        extinguishCandle(candle);
      });
    });

    // Tapping cake blows all remaining candles
    if (elements.interactiveCake) {
      elements.interactiveCake.addEventListener('click', () => {
        elements.candles.forEach((candle) => extinguishCandle(candle));
      });
    }

    if (elements.btnScreen3Continue) {
      elements.btnScreen3Continue.addEventListener('click', () => {
        goToScreen(4);
      });
    }
  }

  function extinguishCandle(candleEl) {
    const flame = candleEl.querySelector('.flame');
    if (flame && !flame.classList.contains('extinguished')) {
      flame.classList.add('extinguished');
      birthdayState.candlesExtinguished++;

      // Tiny spark puff
      const puff = candleEl.querySelector('.spark-puff');
      if (puff) {
        puff.style.animation = 'fadeIn 0.4s ease-out';
      }

      // Small confetti spark
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 15,
          spread: 45,
          origin: { y: 0.6 }
        });
      }

      if (birthdayState.candlesExtinguished >= birthdayState.candlesTarget) {
        unlockWishMoment();
      }
    }
  }

  function unlockWishMoment() {
    birthdayState.wishUnlocked = true;

    // Cake glow & soft ambient pulse
    if (elements.interactiveCake) {
      elements.interactiveCake.style.filter = 'drop-shadow(0 0 25px rgba(255, 75, 145, 0.6))';
    }

    // Gentle soft confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#ff4b91', '#ffbe0b', '#00d2ff', '#ffffff']
      });
    }

    if (elements.cakePromptArea) elements.cakePromptArea.style.display = 'none';
    if (elements.wishUnlockedPanel) elements.wishUnlockedPanel.style.display = 'block';
  }

  // --------------------------------------------------------------------------
  // SCREEN 4: OUR MEMORIES (PROGRESSIVE 4-STEP GALLERY)
  // --------------------------------------------------------------------------
  function initializeMemories() {
    // Stepper tab clicks
    elements.memCardTabs.forEach((tab, idx) => {
      if (tab) {
        tab.addEventListener('click', () => {
          if (idx < birthdayState.memoriesUnlockedCount) {
            displayMemory(idx);
          }
        });
      }
    });

    // Previous Button
    if (elements.btnMemoryPrev) {
      elements.btnMemoryPrev.addEventListener('click', () => {
        if (birthdayState.currentMemoryIndex > 0) {
          displayMemory(birthdayState.currentMemoryIndex - 1);
        }
      });
    }

    // Unlock Next / Advance Button
    if (elements.btnMemoryNext) {
      elements.btnMemoryNext.addEventListener('click', () => {
        const nextIdx = birthdayState.currentMemoryIndex + 1;
        if (nextIdx < memories.length) {
          unlockMemory(nextIdx);
        }
      });
    }

    // Click photo to open lightbox
    if (elements.memoryImageContainer) {
      elements.memoryImageContainer.addEventListener('click', () => {
        openLightbox(birthdayState.currentMemoryIndex);
      });
    }

    // Completion button
    if (elements.btnScreen4Continue) {
      elements.btnScreen4Continue.addEventListener('click', () => {
        goToScreen(5);
      });
    }

    initializeLightbox();
  }

  function unlockMemory(index) {
    if (index >= memories.length) return;

    if (index >= birthdayState.memoriesUnlockedCount) {
      birthdayState.memoriesUnlockedCount = index + 1;
    }

    displayMemory(index);
  }

  function displayMemory(index) {
    if (index < 0 || index >= memories.length) return;

    birthdayState.currentMemoryIndex = index;
    birthdayState.memoriesViewed[index] = true;

    const data = memories[index];

    // Smooth image transition with parallax scale
    if (elements.activeMemoryImage) {
      elements.activeMemoryImage.style.opacity = '0';
      elements.activeMemoryImage.style.transform = 'scale(0.97)';

      setTimeout(() => {
        elements.activeMemoryImage.src = data.image;
        elements.activeMemoryImage.alt = `Memory 0${index + 1} with Drashti`;

        elements.activeMemoryImage.onload = () => {
          elements.activeMemoryImage.style.opacity = '1';
          elements.activeMemoryImage.style.transform = 'scale(1)';
        };
      }, 150);
    }

    // Texts & Counter
    if (elements.memoryBadgeLabel) elements.memoryBadgeLabel.textContent = `MEMORY 0${index + 1}`;
    if (elements.memoryCaptionText) elements.memoryCaptionText.textContent = data.caption;
    if (elements.memoryStepCounter) elements.memoryStepCounter.textContent = `0${index + 1} / 04`;

    // Navigation buttons state
    if (elements.btnMemoryPrev) {
      elements.btnMemoryPrev.disabled = index === 0;
    }

    if (elements.btnMemoryNext) {
      if (index === memories.length - 1) {
        // Last memory reached
        elements.btnMemoryNext.style.display = 'none';
        if (elements.memoryCompletionBox) {
          elements.memoryCompletionBox.style.display = 'block';
        }
      } else {
        elements.btnMemoryNext.style.display = 'inline-flex';
        const isNextUnlocked = index + 1 < birthdayState.memoriesUnlockedCount;
        elements.btnMemoryNext.textContent = isNextUnlocked ? `VIEW MEMORY 0${index + 2} →` : `UNLOCK MEMORY 0${index + 2} →`;
      }
    }

    updateMemoryTabsUI();
  }

  function updateMemoryTabsUI() {
    elements.memCardTabs.forEach((tab, idx) => {
      if (!tab) return;
      const isCurrent = idx === birthdayState.currentMemoryIndex;
      const isUnlocked = idx < birthdayState.memoriesUnlockedCount;

      tab.classList.toggle('active', isCurrent);
      tab.classList.toggle('unlocked', isUnlocked && !isCurrent);
      tab.classList.toggle('dimmed', !isUnlocked);
      tab.disabled = !isUnlocked;

      const statusEl = document.getElementById(`tab-status-${idx}`);
      if (statusEl) {
        if (isCurrent) statusEl.textContent = 'Viewing';
        else if (isUnlocked) statusEl.textContent = '✓';
        else statusEl.textContent = '🔒';
      }
    });
  }

  // --------------------------------------------------------------------------
  // FULLSCREEN LIGHTBOX
  // --------------------------------------------------------------------------
  function initializeLightbox() {
    if (elements.lightboxCloseBtn) elements.lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (elements.lightboxOverlay) elements.lightboxOverlay.addEventListener('click', closeLightbox);

    if (elements.lightboxPrevBtn) {
      elements.lightboxPrevBtn.addEventListener('click', () => {
        const prev = (birthdayState.currentMemoryIndex - 1 + memories.length) % memories.length;
        displayMemory(prev);
        updateLightboxData(prev);
      });
    }

    if (elements.lightboxNextBtn) {
      elements.lightboxNextBtn.addEventListener('click', () => {
        const next = (birthdayState.currentMemoryIndex + 1) % memories.length;
        displayMemory(next);
        updateLightboxData(next);
      });
    }

    // Keyboard handlers (ESC & Arrows)
    window.addEventListener('keydown', (e) => {
      if (elements.lightboxModal && elements.lightboxModal.style.display !== 'none') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') elements.lightboxPrevBtn.click();
        if (e.key === 'ArrowRight') elements.lightboxNextBtn.click();
      }
    });

    // Touch swipe support on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (elements.lightboxModal) {
      elements.lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      elements.lightboxModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          elements.lightboxPrevBtn.click();
        } else {
          elements.lightboxNextBtn.click();
        }
      }
    }
  }

  function openLightbox(index) {
    updateLightboxData(index);
    if (elements.lightboxModal) {
      elements.lightboxModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (elements.lightboxModal) {
      elements.lightboxModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function updateLightboxData(index) {
    const data = memories[index];
    if (elements.lightboxImg) elements.lightboxImg.src = data.image;
    if (elements.lightboxCaptionText) elements.lightboxCaptionText.textContent = data.caption;
    if (elements.lightboxCounter) elements.lightboxCounter.textContent = `0${index + 1} / 04`;
  }

  // --------------------------------------------------------------------------
  // SCREEN 5: FRIENDSHIP
  // --------------------------------------------------------------------------
  function initializeScreen5() {
    if (elements.btnScreen5Continue) {
      elements.btnScreen5Continue.addEventListener('click', () => {
        goToScreen(6);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 6: WHY I MADE THIS
  // --------------------------------------------------------------------------
  function initializeScreen6() {
    if (elements.btnScreen6Continue) {
      elements.btnScreen6Continue.addEventListener('click', () => {
        goToScreen(7);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 7: THE APOLOGY (INTERACTIVE 3D ENVELOPE)
  // --------------------------------------------------------------------------
  function initializeApology() {
    function openEnvelope() {
      if (birthdayState.apologyOpened) return;
      birthdayState.apologyOpened = true;

      if (elements.envelopeWrapper) {
        elements.envelopeWrapper.classList.add('opened');
      }

      // Reveal delivered note & continue button after smooth unfolding
      setTimeout(() => {
        if (elements.apologyDeliveredBox) elements.apologyDeliveredBox.style.display = 'block';
        if (elements.apologyActionFooter) elements.apologyActionFooter.style.display = 'flex';

        // Intimate heart drift
        spawnHearts(8);

        // Gentle small confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#ff4b91', '#ffffff', '#ffbe0b']
          });
        }
      }, 700);
    }

    if (elements.envelopeWrapper) {
      elements.envelopeWrapper.addEventListener('click', openEnvelope);
      elements.envelopeWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEnvelope();
        }
      });
    }

    if (elements.btnScreen7Continue) {
      elements.btnScreen7Continue.addEventListener('click', () => {
        goToScreen(8);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 8: PERSONAL BIRTHDAY MESSAGE
  // --------------------------------------------------------------------------
  function initializeScreen8() {
    if (elements.btnScreen8Continue) {
      elements.btnScreen8Continue.addEventListener('click', () => {
        goToScreen(9);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SCREEN 9: FINAL CELEBRATION & FINAL QUIET MOMENT
  // --------------------------------------------------------------------------
  function startCelebration() {
    birthdayState.celebrationStarted = true;

    if (elements.celebrationReadyBox) elements.celebrationReadyBox.style.display = 'none';
    if (elements.celebrationActivePanel) elements.celebrationActivePanel.style.display = 'flex';

    if (elements.ambientGlow) {
      elements.ambientGlow.classList.add('celebration-radiance');
    }

    // Play birthday music (user triggered)
    playMusic();

    // Trigger full celebration effects
    launchFullConfetti();
    spawnBalloons(15);
    spawnHearts(14);

    // After 5.5s, gently reveal the final quiet moment
    setTimeout(() => {
      if (elements.finalQuietMoment) {
        elements.finalQuietMoment.style.animation = 'fadeIn 1.2s ease forwards';
      }
    }, 5500);
  }

  function initializeCelebration() {
    if (elements.btnStartCelebration) {
      elements.btnStartCelebration.addEventListener('click', startCelebration);
    }
  }

  function launchFullConfetti() {
    if (typeof confetti !== 'function') return;

    // Center burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4b91', '#9d4edd', '#00d2ff', '#ffbe0b']
    });

    // Side streams
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.05, y: 0.7 },
        colors: ['#ff4b91', '#ffbe0b']
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.95, y: 0.7 },
        colors: ['#9d4edd', '#00d2ff']
      });
    }, 450);
  }

  function spawnBalloons(count) {
    if (!elements.atmosphereLayer) return;

    const colors = [
      'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
      'linear-gradient(135deg, #7c4dff 0%, #9e75ff 100%)',
      'linear-gradient(135deg, #00d2ff 0%, #70a6ff 100%)',
      'linear-gradient(135deg, #ffbe0b 0%, #ff9f43 100%)'
    ];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const balloon = document.createElement('div');
        balloon.className = 'float-balloon';
        balloon.style.left = `${5 + Math.random() * 90}%`;
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = `${7 + Math.random() * 4}s`;
        elements.atmosphereLayer.appendChild(balloon);

        setTimeout(() => balloon.remove(), 11000);
      }, i * 280);
    }
  }

  function spawnHearts(count) {
    if (!elements.atmosphereLayer) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'float-heart';
        heart.textContent = '❤️';
        heart.style.left = `${12 + Math.random() * 76}%`;
        heart.style.bottom = '8%';
        heart.style.fontSize = `${1 + Math.random() * 1.2}rem`;
        elements.atmosphereLayer.appendChild(heart);

        setTimeout(() => heart.remove(), 5500);
      }, i * 280);
    }
  }

  // --------------------------------------------------------------------------
  // AUDIO CONTROLLER (Graceful handling of missing files)
  // --------------------------------------------------------------------------
  function initializeAudio() {
    if (elements.soundPillBtn) {
      elements.soundPillBtn.addEventListener('click', () => {
        if (birthdayState.isPlayingMusic) {
          pauseMusic();
        } else {
          playMusic();
        }
      });
    }
  }

  function playMusic() {
    if (!elements.audioEl) return;

    const playPromise = elements.audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          birthdayState.isPlayingMusic = true;
          updateAudioUI(true);
        })
        .catch(() => {
          // If browser policy or missing file occurs, fail silently with zero errors
          birthdayState.isPlayingMusic = false;
          updateAudioUI(false);
        });
    }
  }

  function pauseMusic() {
    if (elements.audioEl) {
      elements.audioEl.pause();
    }
    birthdayState.isPlayingMusic = false;
    updateAudioUI(false);
  }

  function updateAudioUI(playing) {
    if (elements.soundIcon) elements.soundIcon.textContent = playing ? '🔊' : '🔇';
    if (elements.soundPillBtn) elements.soundPillBtn.classList.toggle('playing', playing);
  }

  // --------------------------------------------------------------------------
  // DESKTOP CURSOR GLOW TRACKER
  // --------------------------------------------------------------------------
  function initializeCursorGlow() {
    if (!elements.cursorGlow) return;
    window.addEventListener('mousemove', (e) => {
      elements.cursorGlow.style.left = `${e.clientX}px`;
      elements.cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // --------------------------------------------------------------------------
  // INITIALIZE EXPERIENCE ON DOM READY
  // --------------------------------------------------------------------------
  function initializeExperience() {
    initializeScreen1();
    initializeVerification();
    initializeCandles();
    initializeMemories();
    initializeScreen5();
    initializeScreen6();
    initializeApology();
    initializeScreen8();
    initializeCelebration();
    initializeAudio();
    initializeCursorGlow();

    // Trigger initial reveal
    const screen1 = document.getElementById('screen-1');
    if (screen1) {
      requestAnimationFrame(() => {
        screen1.classList.add('visible');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initializeExperience);

})();
