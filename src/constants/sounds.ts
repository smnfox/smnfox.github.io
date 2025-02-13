import type { SoundKey } from "../types/sounds";

export const SOUND_MAP = {
    jump: '/sounds/jump.wav',
    defeat: '/sounds/defeat.wav',
    click: '/sounds/click.wav',
}

export const GAME_SOUNDS: SoundKey[] = ['jump', 'defeat'];
export const MAX_DELAY_BEFORE_PLAY = 2000;
