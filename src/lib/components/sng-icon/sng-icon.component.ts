import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { IconData } from '../../icons/icon-data.interface';

/** Dynamic icon component for ShadNG Icons. */
@Component({
  selector: 'sng-icon, cw-icon',
  template: `
    @if (hasIcon()) {
      <svg
        #svgElement
        [class]="svgClasses()"
        [attr.viewBox]="icon()?.viewBox || '0 0 24 24'"
        [attr.aria-hidden]="!alt()"
        [attr.focusable]="alt() ? 'false' : null"
      ></svg>
    } @else if (showFallback()) {
      <svg
        class="sng-fallback-icon cw-fallback-icon"
        [attr.viewBox]="'0 0 24 24'"
        [attr.aria-hidden]="!alt()"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
      </svg>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      flex-shrink: 0;
      width: var(--icon-size, 1.5rem);
      height: var(--icon-size, 1.5rem);
      color: var(--sng-icon-dynamic-color, inherit);
    }

    :host([class*='size-']) {
      width: auto;
      height: auto;
    }

    :host([class*='w-']) {
      width: auto;
    }

    :host([class*='h-']) {
      height: auto;
    }

    :host svg {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
      color: inherit;
    }

    :host svg path:not([fill]),
    :host svg circle:not([fill]),
    :host svg rect:not([fill]),
    :host svg ellipse:not([fill]),
    :host svg polygon:not([fill]),
    :host svg polyline:not([fill]) {
      fill: currentColor;
    }

    :host svg [fill='none'] {
      fill: none !important;
    }

    :host svg [fill='currentColor'] {
      fill: currentColor !important;
    }

    :host svg * {
      vector-effect: non-scaling-stroke;
    }

    :host(.animate-spin) {
      animation: sng-spin 1s linear infinite;
    }

    :host(.animate-pulse) {
      animation: sng-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    :host(.animate-bounce) {
      animation: sng-bounce 1s infinite;
    }

    @keyframes sng-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes sng-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes sng-bounce {
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host svg * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `],
  host: {
    class: 'sng-icon sng-icon-component cw-icon cw-icon-component',
    '[attr.role]': 'alt() ? "img" : null',
    '[attr.tabindex]': 'alt() ? 0 : null',
    '[attr.aria-label]': 'alt()',
    '[attr.data-icon-name]': 'icon()?.name',
    '[attr.data-icon-type]': 'icon()?.type',
    '[attr.data-icon-category]': 'icon()?.category',
    '[style.--icon-size]': 'iconSizeVar()',
    '[style.--icon-stroke-width]': 'iconStrokeWidthVar()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SngIcon implements AfterViewInit {
  readonly icon = input<IconData | undefined>(undefined);
  readonly size = input<number | string>(24);
  readonly alt = input<string | null>(null);
  readonly strokeWeight = input<string | number | undefined>(undefined);
  readonly svgClass = input<string>('');
  readonly showFallback = input<boolean>(true);

  readonly svgElement = viewChild<ElementRef<SVGElement>>('svgElement');

  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  private readonly hostHasSizeClass = signal(false);
  private classObserver?: MutationObserver;

  readonly hasIcon = computed(() => Boolean(this.icon()?.innerSvg));

  readonly iconSizeVar = computed(() => {
    const size = this.size();

    if (this.hostHasSizeClass() || size === null || size === undefined || size === '') {
      return null;
    }

    return typeof size === 'number' ? `${size}px` : String(size);
  });

  readonly iconStrokeWidthVar = computed(() =>
    String(this.strokeWeight() ?? this.icon()?.defaultStrokeWidth ?? '1'),
  );

  readonly svgClasses = computed(() => {
    const classes = ['sng-icon-svg', 'cw-icon-svg'];
    const icon = this.icon();

    if (icon) {
      classes.push(`sng-${icon.type}-svg`, `cw-${icon.type}-svg`);
    }

    const extra = this.svgClass().trim();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  constructor() {
    effect(() => {
      const icon = this.icon();
      const svgRef = this.svgElement();
      const strokeWeight = this.strokeWeight();

      if (!isPlatformBrowser(this.platformId) || !icon?.innerSvg || !svgRef?.nativeElement) {
        return;
      }

      const strokeWidth = String(strokeWeight ?? icon.defaultStrokeWidth ?? '1');
      this.renderSvgContent(svgRef.nativeElement, icon.innerSvg, strokeWidth);
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateHostClassChecks();

    this.classObserver = new MutationObserver(() => {
      this.updateHostClassChecks();
    });

    this.classObserver.observe(this.elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    this.destroyRef.onDestroy(() => {
      this.classObserver?.disconnect();
    });
  }

  private updateHostClassChecks(): void {
    const hostElement = this.elementRef.nativeElement;
    const classList: string[] = Array.from(hostElement.classList);

    this.hostHasSizeClass.set(classList.some((className) => /^(w-|h-|size-)/.test(className)));

    const arbitraryColorClass = classList.find((className) => /^text-\[#[0-9a-fA-F]{3,8}\]$/.test(className));

    if (!arbitraryColorClass) {
      this.renderer.removeStyle(hostElement, '--sng-icon-dynamic-color');
      return;
    }

    const colorMatch = /^text-\[(#[0-9a-fA-F]{3,8})\]$/.exec(arbitraryColorClass);
    if (!colorMatch?.[1]) {
      return;
    }

    this.renderer.setStyle(hostElement, '--sng-icon-dynamic-color', colorMatch[1]);
  }

  private renderSvgContent(svg: SVGElement, innerSvg: string, strokeWidth: string): void {
    while (svg.firstChild) {
      this.renderer.removeChild(svg, svg.firstChild);
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<svg xmlns='http://www.w3.org/2000/svg'>${innerSvg}</svg>`, 'image/svg+xml');
    const elements = doc.querySelector('svg')?.children;

    if (!elements) {
      return;
    }

    for (const element of Array.from(elements)) {
      const clonedElement = this.cloneElementRecursively(element, strokeWidth);
      this.renderer.appendChild(svg, clonedElement);
    }
  }

  private cloneElementRecursively(sourceElement: Element, strokeWidth: string): Element {
    const newElement = document.createElementNS('http://www.w3.org/2000/svg', sourceElement.tagName);

    for (const attribute of Array.from(sourceElement.attributes)) {
      this.renderer.setAttribute(newElement, attribute.name, attribute.value);
    }

    if (sourceElement.hasAttribute('stroke')) {
      this.renderer.setAttribute(newElement, 'stroke-width', strokeWidth);
    }

    for (const child of Array.from(sourceElement.children)) {
      const clonedChild = this.cloneElementRecursively(child, strokeWidth);
      this.renderer.appendChild(newElement, clonedChild);
    }

    if (!sourceElement.children.length && sourceElement.textContent?.trim()) {
      const text = this.renderer.createText(sourceElement.textContent);
      this.renderer.appendChild(newElement, text);
    }

    return newElement;
  }
}
