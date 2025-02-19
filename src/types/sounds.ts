import type { Howl } from 'howler';
import type { SOUND_MAP } from "../services/sounds";

export type SoundKey = keyof typeof SOUND_MAP;

export interface Sound {
    howl: Howl | null
    loading: boolean
    loadPromise: Promise<Sound | null>
    play: () => void
}

export type SoundCache = {
    [key in SoundKey]: Sound
}
