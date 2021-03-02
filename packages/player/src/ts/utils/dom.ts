import { isBool, isString } from '.';
import { CLASS_PREFIX } from '../constants';
import { Disposable } from '../types';

const SELECTOR_REGEX = /([\w-]+)?(?:#([\w-]+))?((?:\.(?:[\w-]+))*)/;

export function $<T extends HTMLElement>(
  desc?: string,
  attrs?: { [key: string]: any; },
  children?: string | Array<Node>,
  classPrefix = CLASS_PREFIX,
): T {
  let match: string[] = [];

  if (desc) match = SELECTOR_REGEX.exec(desc) || [];

  const el = document.createElement(match[1] || 'div');

  if (match[2]) el.id = match[3];
  if (match[3]) el.className = match[3].replace(/\./g, ` ${classPrefix}`).trim();

  if (attrs) {
    Object.keys(attrs).forEach((name) => {
      const value = attrs[name];
      if (value === undefined) return;

      if (/^on\w+$/.test(name)) {
        (el as any)[name] = value;
      } else if (name === 'selected') {
        if (value) {
          el.setAttribute(name, 'true');
        }
      } else {
        el.setAttribute(name, value);
      }
    });
  }

  if (children) {
    if (isString(children)) {
      el.innerHTML = children;
    } else {
      children.forEach((c) => el.appendChild(c));
    }
  }

  return el as T;
}

export function getEl(el: HTMLElement | string | undefined | null): HTMLElement | null {
  if (!el) return null;
  if (isString(el)) return document.querySelector(el);
  return el;
}

const domParser = new DOMParser();
export function strToDom(
  str: string,
  type: DOMParserSupportedType = 'image/svg+xml',
): HTMLElement {
  return domParser.parseFromString(str, type).firstChild as HTMLElement;
}

export function removeNode(node: Element): void {
  if (node.remove) {
    node.remove();
  } if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

export function show(node: HTMLElement): void {
  node.style.display = '';
}

export function hide(node: HTMLElement): void {
  node.style.display = 'none';
}

export function addClass(dom: HTMLElement, cls = '', prefix = CLASS_PREFIX): void {
  cls = cls.trim();
  if (!cls) return;
  if (dom.classList) {
    cls.split(' ').forEach((c) => dom.classList.add(prefix + c));
  } else {
    dom.setAttribute('class', `${dom.className.trim()} ${cls}`);
  }
}

export function removeClass(dom: HTMLElement, cls: string, prefix = CLASS_PREFIX): void {
  dom.classList.remove(prefix + cls);
}

export function containClass(dom: HTMLElement, cls: string, prefix = CLASS_PREFIX): boolean {
  return dom.classList.contains(prefix + cls);
}

export function toggleClass(dom: HTMLElement, cls: string, force?: boolean, prefix = CLASS_PREFIX): boolean {
  return dom.classList.toggle(prefix + cls, force);
}

export function getEventPath(ev: Event): EventTarget[] {
  return (ev as any).path || ev.composedPath();
}

let thirdOptsSupported = false;

try {
  const options = Object.defineProperty({}, 'once', { get() { thirdOptsSupported = true; } });
  window.addEventListener('test', null as any, options);
// eslint-disable-next-line no-empty
} catch (e) {}

export function isListenerObjOptsSupported(): boolean {
  return thirdOptsSupported;
}

export class DomListener implements Disposable {
  constructor(
    private node: EventTarget,
    private type: string,
    private handler: (e: any) => void,
    private options?: boolean | AddEventListenerOptions,
  ) {
    this.options = isBool(options) ? options : options ? (thirdOptsSupported && options) : false;
    node.addEventListener(type, handler, this.options);
  }

  dispose(): void {
    if (!this.handler) return;
    this.node.removeEventListener(this.type, this.handler, this.options);
    this.node = null!;
    this.handler = null!;
    this.options = null!;
  }
}