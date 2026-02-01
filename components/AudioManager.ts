
class AudioManager {
  private static instance: AudioManager;
  private currentAudio: HTMLAudioElement | null = null;
  private isProcessing: boolean = false;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Unlocks audio context on user interaction. 
   * Necessary for mobile browser compliance.
   */
  public unlock() {
    const silent = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    const a = new Audio(silent);
    a.play().catch(() => {});
  }

  /**
   * Plays a phoneme sound from a URL.
   * STRICT RULES:
   * 1. Validate via HEAD request before playback.
   * 2. Fresh Audio instance per attempt.
   * 3. No overlaps: Stop previous before starting next.
   * 4. Controlled retry on playback failure.
   */
  public async play(url: string, onEnd?: () => void) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    this.stop();

    let validationData = { status: 0, contentType: 'unknown', contentLength: 0 };

    try {
      // 1. Validation Step
      const headResponse = await fetch(url, { method: 'HEAD' });
      validationData = {
        status: headResponse.status,
        contentType: headResponse.headers.get('content-type') || 'none',
        contentLength: parseInt(headResponse.headers.get('content-length') || '0', 10)
      };

      const isAudio = validationData.contentType.toLowerCase().includes('audio') || 
                      validationData.contentType === 'application/octet-stream';
      const isLargeEnough = validationData.contentLength > 500; // Relaxed slightly for small phonemes

      if (validationData.status !== 200 || !isAudio || !isLargeEnough) {
        console.error(`Audio Validation Failed: (${validationData.status}, ${validationData.contentType}, ${validationData.contentLength}, ${url})`);
        this.isProcessing = false;
        if (onEnd) onEnd();
        return;
      }

      // 2. Playback with controlled retry
      const attemptPlayback = (audioUrl: string): Promise<HTMLAudioElement> => {
        return new Promise((resolve, reject) => {
          const audio = new Audio(audioUrl);
          this.currentAudio = audio;

          audio.onended = () => {
            this.currentAudio = null;
            this.isProcessing = false;
            if (onEnd) onEnd();
            resolve(audio);
          };

          audio.onerror = () => {
            const err = audio.error;
            reject(new Error(`Audio Error [${err?.code}]: ${err?.message}`));
          };

          audio.play().catch(reject);
        });
      };

      try {
        await attemptPlayback(url);
      } catch (playError: any) {
        console.warn(`Initial playback failed, retrying: ${playError.message}`);
        this.stop();
        await attemptPlayback(url);
      }
      
      this.isProcessing = false;
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(`AudioManager Exception: ${error.message} | URL: ${url} | Validation: (${validationData.status}, ${validationData.contentType}, ${validationData.contentLength})`);
      }
      this.currentAudio = null;
      this.isProcessing = false;
      if (onEnd) onEnd();
    }
  }

  /**
   * Stops current playback and resets source.
   */
  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio.load(); // Forces cleanup
      this.currentAudio = null;
    }
    this.isProcessing = false;
  }

  public isCurrentlyPlaying(url: string): boolean {
    if (!this.currentAudio) return false;
    return !this.currentAudio.paused;
  }
}

export const audioManager = AudioManager.getInstance();
