import { PlayerOptions } from './types';

const defaultOptions: Partial<PlayerOptions> = {
  shortcut: true,
  seekStep: 10,
  volumeStep: 0.1,
  volumeBarWidth: 100,
  controls: ['play', 'volume', 'time', 'spacer', 'airplay', 'settings', 'web-fullscreen', 'fullscreen'],
  settings: ['speed'],
  contextMenus: ['loop', 'pip', 'version'],
  contextMenuToggle: true,
  openEdgeInIE: true,
  videoAttrs: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
  },
};

export function processOptions(opts: PlayerOptions): Required<PlayerOptions> {
  return {
    ...defaultOptions,
    ...opts,
    videoAttrs: {
      ...defaultOptions.videoAttrs,
      ...opts?.videoAttrs,
    },
  } as Required<PlayerOptions>;
}