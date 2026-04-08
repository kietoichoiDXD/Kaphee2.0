import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-interactive], .menu-flip-page';
const TEXT_SELECTOR =
  'h1, h2, h3, h4, h5, h6, p, span, li, label, strong, b, em, small, a, button, [data-text-hover]';

function useFinePointer() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsFinePointer(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  return isFinePointer;
}

export default function CursorUXLayer() {
  const isFinePointer = useFinePointer();
  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animationRef = useRef(null);
  const hoveredTextRef = useRef(null);

  const mouseTarget = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });
  const visibilityRef = useRef(false);
  const pressedRef = useRef(false);
  const interactiveRef = useRef(false);
  const cursorLabelRef = useRef('');

  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  const applyTextHover = (nextElement) => {
    if (hoveredTextRef.current === nextElement) {
      return;
    }

    if (hoveredTextRef.current) {
      hoveredTextRef.current.classList.remove('cursor-text-active');
    }

    hoveredTextRef.current = nextElement;

    if (nextElement) {
      nextElement.classList.add('cursor-text-active');
    }
  };

  useEffect(() => {
    if (!isFinePointer) {
      return undefined;
    }

    const animate = () => {
      ringPosition.current.x += (mouseTarget.current.x - ringPosition.current.x) * 0.18;
      ringPosition.current.y += (mouseTarget.current.y - ringPosition.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseTarget.current.x}px, ${mouseTarget.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const onMouseMove = (event) => {
      mouseTarget.current.x = event.clientX;
      mouseTarget.current.y = event.clientY;

      if (!visibilityRef.current) {
        visibilityRef.current = true;
        setIsVisible(true);
      }

      const hoveredNode = document.elementFromPoint(event.clientX, event.clientY);
      const interactiveElement = hoveredNode?.closest?.(INTERACTIVE_SELECTOR) ?? null;
      const textElement = hoveredNode?.closest?.(TEXT_SELECTOR) ?? null;
      const isInteractive = Boolean(interactiveElement);
      const label = interactiveElement?.dataset?.cursorLabel || textElement?.dataset?.cursorLabel || '';

      interactiveRef.current = isInteractive;
      cursorLabelRef.current = label;

      setIsHoveringInteractive(isInteractive);
      setCursorLabel(label);

      applyTextHover(textElement);
    };

    const onMouseDown = () => {
      pressedRef.current = true;
      setIsPressed(true);
    };

    const onMouseUp = () => {
      pressedRef.current = false;
      setIsPressed(false);
    };
    const onMouseLeave = () => {
      visibilityRef.current = false;
      interactiveRef.current = false;
      pressedRef.current = false;
      cursorLabelRef.current = '';
      setIsVisible(false);
      setIsHoveringInteractive(false);
      setCursorLabel('');
      setIsPressed(false);
      applyTextHover(null);
    };

    const magneticElements = [...document.querySelectorAll('[data-magnetic]')];
    const magneticCleanups = magneticElements.map((element) => {
      const strength = Number(element.dataset.magneticStrength || 18);

      const onMove = (event) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);

        element.style.transform = `translate3d(${offsetX / strength}px, ${offsetY / strength}px, 0)`;
      };

      const onLeave = () => {
        element.style.transform = 'translate3d(0, 0, 0)';
      };

      element.addEventListener('mousemove', onMove);
      element.addEventListener('mouseleave', onLeave);

      return () => {
        element.removeEventListener('mousemove', onMove);
        element.removeEventListener('mouseleave', onLeave);
        element.style.transform = 'translate3d(0, 0, 0)';
      };
    });

    document.body.classList.add('cursor-ux-enabled');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      magneticCleanups.forEach((cleanup) => cleanup());

      document.body.classList.remove('cursor-ux-enabled');
      applyTextHover(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isFinePointer]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <div ref={layerRef} className="cursor-ux-layer" aria-hidden="true">
      <div
        ref={ringRef}
        className={`cursor-ring ${
          isVisible ? 'cursor-visible' : ''
        } ${isHoveringInteractive ? 'cursor-hover' : ''} ${isPressed ? 'cursor-pressed' : ''}`}
      >
        {cursorLabel ? <span className="cursor-label">{cursorLabel}</span> : null}
      </div>
      <div
        ref={dotRef}
        className={`cursor-dot ${
          isVisible ? 'cursor-visible' : ''
        } ${isHoveringInteractive ? 'cursor-hover' : ''} ${isPressed ? 'cursor-pressed' : ''}`}
      />
    </div>
  );
}
