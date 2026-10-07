import React, { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

// Shared IntersectionObserver for optimal rendering performance & zero forced reflows
const listenerCallbacks = new Map();
let sharedObserver = null;

function getSharedObserver() {
  if (typeof window === 'undefined') return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = listenerCallbacks.get(entry.target);
          if (callback && entry.isIntersecting) {
            callback();
            sharedObserver.unobserve(entry.target);
            listenerCallbacks.delete(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 0px 0px'
      }
    );
  }
  return sharedObserver;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  direction = 'zoom-out',
  threshold = 0.1,
  once = true,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    listenerCallbacks.set(el, () => {
      setIsVisible(true);
    });

    observer.observe(el);

    return () => {
      if (el && observer) {
        observer.unobserve(el);
        listenerCallbacks.delete(el);
      }
    };
  }, [isVisible]);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  const classes = [
    'scroll-reveal',
    `reveal-${direction}`,
    stagger ? 'reveal-stagger' : '',
    isVisible ? 'is-visible' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={classes} style={style} {...props}>
      {children}
    </Component>
  );
}
