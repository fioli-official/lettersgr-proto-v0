
class AudioManager {
  private static instance: AudioManager;
  private currentAudio: HTMLAudioElement | null = null;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Unlocks audio for mobile browsers by playing a silent data URI.
   * Call this on the very first user interaction (e.g., SplashScreen or Welcome).
   */
  public unlock() {
    const audio = new Audio();
    audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    audio.play().catch(() => {});
  }

  /**
   * Plays a sound from a URL. Creates a new Audio() instance per playback.
   * Does not preload. Explicitly handles user gesture requirements.
   */
  public play(url: string, onEnd?: () => void) {
    this.stop();

    const audio = new Audio();
    this.currentAudio = audio;
    
    // crossOrigin is often required for Wikimedia resources in mobile browsers
    audio.crossOrigin = "anonymous";
    audio.src = url;
    audio.preload = "none"; // Load only on play() call

    audio.onended = () => {
      if (this.currentAudio === audio) this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      const err = audio.error;
      console.warn(`Audio Playback Failed [Code ${err?.code}]: ${err?.message} | URL: ${url}`);
      if (this.currentAudio === audio) this.currentAudio = null;
      if (onEnd) onEnd();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // AbortError happens when stop() is called immediately (user skipped fast)
        if (error.name !== 'AbortError') {
          console.warn('AudioManager: Playback blocked or source format unsupported.', error.message);
        }
        if (onEnd) onEnd();
      });
    }
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.removeAttribute('src'); // Better for cleanup on mobile
      this.currentAudio.load();
      this.currentAudio = null;
    }
  }

  public isCurrentlyPlaying(url: string): boolean {
    if (!this.currentAudio) return false;
    return this.currentAudio.src === url && !this.currentAudio.paused;
  }
}

export const audioManager = AudioManager.getInstance();
