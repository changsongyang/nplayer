import type { Player } from 'player';
import { isDefaultColor } from '../utils';
import { Bullet, BulletOption, BulletSetting } from './bullet';

export interface DanmakuOptions {
  disable?: boolean;
  blocked?: Array<'scroll' | 'top' | 'bottom' | 'color'>;
  fontsize?: number;
  fontsizeScale?: number;
  opacity?: number;
  speed?: number;
  area?: 0.25 | 0.5 | 0.75 | 1;
  unlimited?: boolean;
  bottomUp?: boolean;
  colors?: string[];
  duration?: number;
}

export const defaultOptions: Required<DanmakuOptions> = {
  disable: false,
  blocked: [],
  fontsize: 24,
  fontsizeScale: 1,
  opacity: 1,
  speed: 1,
  area: 0.5,
  unlimited: false,
  bottomUp: false,
  colors: ['#FE0302', '#FF7204', '#FFAA02', '#FFD302', '#FFFF00', '#A0EE00', '#00CD00', '#019899', '#4266BE', '#89D5FF', '#CC0273', '#222222', '#9B9B9B', '#FFFFFF'],
  duration: 5,
};

export class Danmaku {
  readonly element: HTMLElement;

  opts: Required<DanmakuOptions>;

  enabled: boolean;

  private readonly bulletPool: Bullet[] = [];

  private readonly aliveBullets: Set<Bullet> = new Set();

  private readonly scrollBullets: Bullet[] = [];

  private readonly topBullets: Bullet[] = [];

  private readonly bottomBullets: Bullet[] = [];

  private items: BulletOption[] = [];

  private pos = 0;

  paused = false;

  track = 0;

  trackHeight = 0;

  constructor(private readonly player: Player, private _opts?: DanmakuOptions) {
    this.opts = { ...defaultOptions, ..._opts };
    this.enabled = !this.opts.disable;

    const { $ } = player.Player._utils;
    this.element = player.element.appendChild($('.danmaku_screen'));

    this.resetOptions();
    if (this.enabled) this.enable();

    this.items = [
      { time: 1, text: '哈喽' },
    ];

    player.on('mounted', () => {
      this.updateTrack();
    });
  }

  get width() {
    return this.player.rect.width;
  }

  get currentTime() {
    return this.player.currentTime;
  }

  private createBullet(item: BulletOption, setting: BulletSetting): Bullet {
    let bullet = this.bulletPool.pop();
    if (bullet) {
      bullet.init(item, setting);
    } else {
      bullet = new Bullet(this.element, this, item, setting);
    }
    this.aliveBullets.add(bullet);
    return bullet;
  }

  private getShortestTrack(): [number, Bullet | undefined] {
    let item: Bullet;
    let shortest: Bullet = this.scrollBullets[0];
    if (!shortest) return [0] as any;
    for (let i = 1; i < this.track; ++i) {
      item = this.scrollBullets[i];
      if (!item) return [i] as any;
      if (shortest.showAt > item.showAt) shortest = item;
    }
    return [shortest.track, shortest];
  }

  private getEmptyTopTrack(): number {
    for (let i = 0; i < this.track; ++i) {
      if (!this.topBullets[i]) return i;
    }
    return -1;
  }

  private getEmptyBottomTrack(): number {
    for (let i = 0; i < this.track; ++i) {
      if (!this.bottomBullets[i]) return i;
    }
    return -1;
  }

  private shouldDiscard(item: BulletOption): boolean {
    if (this.opts.blocked.includes(item.type || 'scroll')) return true;
    if (!item.color || !this.opts.blocked.includes('color')) return false;
    return !isDefaultColor(item.color);
  }

  private fire = () => {
    if (!this.enabled || !this.player.playing) return;
    const currentTime = this.currentTime;
    const inc = this.opts.unlimited ? 0.5 : 1;
    const min = currentTime - inc;
    const max = currentTime + inc;
    let item: BulletOption;
    for (let l = this.items.length; this.pos < l; this.pos++) {
      item = this.items[this.pos];
      if (item.time < min) continue;
      if (item.time > max) break;
      if (this.shouldDiscard(item)) continue;
      if (!this.insert(item, currentTime) && !this.opts.unlimited) break;
    }
    if (this.paused) this.resume();
  }

  private updateTrack(): void {
    this.trackHeight = this.opts.fontsize * this.opts.fontsizeScale + 2;
    this.track = Math.floor(this.player.rect.height * this.opts.area / this.trackHeight);
  }

  recycleBullet(bullet: Bullet): void {
    this.bulletPool.push(bullet);
    this.aliveBullets.delete(bullet);
  }

  insert(item: BulletOption, currentTime: number): boolean {
    if (!item.type || item.type === 'scroll') {
      const [track, bullet] = this.getShortestTrack();
      if (!item.force && bullet && bullet.showAt > (currentTime + 2)) return false;
      this.scrollBullets[track] = this.createBullet(item, { track, prevShowAt: bullet && bullet.showAt });
      return true;
    } if (item.type === 'top') {
      let track = this.getEmptyTopTrack();
      track = track === -1 && item.force ? 0 : track;
      if (track !== -1) {
        this.topBullets[track] = this.createBullet(item, { track });
        return true;
      }
      return false;
    }
    let track = this.getEmptyBottomTrack();
    track = track === -1 && item.force ? 0 : track;
    if (track !== -1) {
      this.bottomBullets[track] = this.createBullet(item, { track });
      return true;
    }
    return false;
  }

  send(opts: BulletOption): void {
    this.insert({ isMe: true, force: true, ...opts }, this.player.currentTime);
  }

  pause = () => {
    this.aliveBullets.forEach((bullet) => bullet.pause());
    this.paused = true;
  }

  resume = () => {
    this.aliveBullets.forEach((bullet) => bullet.run());
    this.paused = false;
  }

  appendItems(items: BulletOption[]): void {
    this.items = this.items.concat(items);
  }

  resetItems(items: BulletOption[]): void {
    this.items = items;
    this.pos = 0;
  }

  updateOpacity(opacity = this.opts.opacity): void {
    this.element.style.opacity = String(opacity);
  }

  updateFontsize(scale = this.opts.fontsizeScale): void {
    this.opts.fontsizeScale = scale;
    this.updateTrack();
    this.element.style.fontSize = `${this.opts.fontsize * scale}px`;
  }

  updateArea(area: Required<DanmakuOptions>['area']): void {
    if (![0.25, 0.5, 0.75, 1].includes(area)) return;
    this.opts.area = area;
    this.updateTrack();
  }

  updateUnlimited(unlimited: boolean): void {
    this.opts.unlimited = unlimited;
  }

  updateBottomUp(bottomUp: boolean): void {
    this.opts.bottomUp = bottomUp;
  }

  updateSpeed(v: number): void {
    this.opts.speed = v;
    this.aliveBullets.forEach((b) => b.updateSpeed());
  }

  blockType(type: Required<DanmakuOptions>['blocked'][0]): void {
    if (this.opts.blocked.includes(type)) return;
    this.opts.blocked.push(type);
    this.aliveBullets.forEach((b) => {
      if (b.type === type) b.hide();
    });
  }

  allowType(type: Parameters<Danmaku['blockType']>[0]): void {
    this.opts.blocked = this.opts.blocked.filter((t) => t !== type);
    this.aliveBullets.forEach((b) => {
      if (b.type === type) b.show();
    });
  }

  resetOptions(): void {
    this.opts = { ...defaultOptions, ...this._opts };
    this.opts.blocked = [];
    this.updateOpacity();
    this.updateFontsize();
  }

  enable(): void {
    this.enabled = true;
    this.player.on('time-update', this.fire);
    this.player.on('pause', this.pause);
    this.player.on('ended', this.pause);
  }

  disable(): void {
    this.enabled = false;
    this.player.off('time-update', this.fire);
    this.player.off('pause', this.pause);
    this.player.off('ended', this.pause);
  }
}