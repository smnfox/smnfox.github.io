
import { tryOnBeforeUnmount } from "@vueuse/core";
import { Howl } from "howler";
import type { Sound, SoundCache, SoundKey } from "../types/sounds";

export const SOUND_MAP = {
  jump: '/sounds/jump.wav',
  defeat: '/sounds/defeat.wav',
  click: '/sounds/click.wav',
}
export const GAME_SOUNDS: SoundKey[] = ['jump', 'defeat'];
const MAX_DELAY_BEFORE_PLAY = 2000;

class Sounds {
    private soundCache: SoundCache;
    private muteSources: Set<number> = new Set();
    private pageUnfocusMuteSourceId: number | undefined;
    private localVolume: number = 0.1;

    constructor() {
      this.soundCache = {} as SoundCache;
    }

    public loadSound(key: SoundKey): Promise<Sound | null> {
        if (!key) {
          return Promise.resolve(null);
        }
        if (this.soundCache[key]) {
          if (this.soundCache[key].howl) {
            // Sound already loaded
            return Promise.resolve(this.soundCache[key]);
          } else if (this.soundCache[key].loading) {
            // Sound is currently loading
            return this.soundCache[key].loadPromise;
          }
        }

        try {
          this.soundCache[key] = {
            howl: null,
            loading: true,
            loadPromise: new Promise<Sound | null>((resolve, reject) => {
              const howl = new Howl({
                src: [SOUND_MAP[key]],
                volume: this.localVolume,
                html5: false,
                onload: () => {
                  const sound = this.soundCache[key];
                  sound.howl = howl;
                  sound.loading = false;
                  tryOnBeforeUnmount(() => {
                    sound.howl?.stop();
                  });
                  resolve(sound);
                },
                onloaderror: (id, error) => {
                  delete this.soundCache[key];
                  reject(error);
                },
              });
            }),
            play: () => {
              void this.playSound(key);
            },
          };

          return this.soundCache[key].loadPromise;
        } catch (error) {
          console.error(`Failed to load sound ${key}:`, error);
          return Promise.reject();
        }
    }

    public async playSound(key: SoundKey): Promise<void> {
        if (!(key in SOUND_MAP)) {
          console.error(`Sound key ${key} not found`);
          return;
        }

        const sound = await this.loadSound(key);
        if (sound) {
          try {
            const time = Date.now();
            await Howler.ctx.resume();
            const delay = Date.now() - time;
            if (delay > MAX_DELAY_BEFORE_PLAY || Howler.ctx.state === 'suspended') {
              // no need to play old sounds
              return;
            }
            sound.howl?.volume(this.localVolume);
            sound.howl?.play();
          } catch (error) {
            console.error(`Failed to play sound ${key}:`, error);
          }
        }
    }

    public addAudioMuteSource(): number {
        let id = 0;
        while (this.muteSources.has(id)) {
          id++;
        }
        this.muteSources.add(id);

        if (this.muteSources.size === 1) {
          Howler.mute(true);
        }

        return id;
    }

    public removeAudioMuteSource(id: number): void {
        this.muteSources.delete(id);

        if (this.muteSources.size === 0) {
          Howler.mute(false);
        }
    }

    private clearPageUnfocusMuteSource(): void {
        if (this.pageUnfocusMuteSourceId !== undefined) {
          this.removeAudioMuteSource(this.pageUnfocusMuteSourceId);
        }
    }

    public muteOnVisibilityChange(): void {
        window.addEventListener('visibilitychange', () => {
          this.clearPageUnfocusMuteSource();
          if (document.visibilityState === 'hidden') {
            this.pageUnfocusMuteSourceId = this.addAudioMuteSource();
          }
        });
    }

    public preloadSounds = async (list: SoundKey[]): Promise<void> => {
        try {
          const promiseList = list.map(item => this.loadSound(item));
          await Promise.all(promiseList);
        } catch (error) {
          console.error(`Failed to preload sounds:`, error);
        }
    }
}

export const sounds = new Sounds();
