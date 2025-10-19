"use client";
import React from "react";

// Minimal shim for framer-motion used to avoid bundling motion-dom/motion-utils
// It renders plain elements and ignores animation props.

type MotionCommonProps = {
  initial?: any;
  animate?: any;
  exit?: any;
  whileInView?: any;
  transition?: any;
  layout?: any;
  layoutId?: any;
  viewport?: any;
  onAnimationComplete?: any;
  variants?: any;
} & React.HTMLAttributes<HTMLElement> & Record<string, any>;

function createMotionComponent<T extends keyof JSX.IntrinsicElements>(
  tag: T,
) {
  const Comp = React.forwardRef<HTMLElement, MotionCommonProps>((props, ref) => {
    const { children, ...rest } = props;
    // Strip known motion-only props so they don't end up as DOM attributes
    const {
      initial,
      animate,
      exit,
      whileInView,
      transition,
      layout,
      layoutId,
      viewport,
      onAnimationComplete,
      variants,
      ...domProps
    } = rest as any;

    return React.createElement(tag, { ref, ...domProps }, children);
  });
  Comp.displayName = `motion.${String(tag)}`;
  return Comp as unknown as React.ComponentType<any>;
}

// Proxy to dynamically create motion tags like motion.div, motion.span, etc.
export const motion: any = new Proxy(
  {},
  {
    get: (_target, prop: string) => createMotionComponent(prop as any),
  },
);

export const AnimatePresence: React.FC<{ children?: React.ReactNode } & Record<string, any>> = ({ children }) => (
  <>{children}</>
);

export const LayoutGroup: React.FC<{ children?: React.ReactNode } & Record<string, any>> = ({ children }) => (
  <>{children}</>
);

// Very light stub of useAnimation controls
export const useAnimation = () => {
  const controls = React.useRef({
    start: async (_: any) => {},
    stop: () => {},
    set: (_: any) => {},
  }).current;
  return controls as any;
};

// Aliases/common hooks used in codebase
export const useAnimationControls = useAnimation;

export const useVelocity = (_: any) => ({ get: () => 0 });
export const useSpring = (value: any, _config?: any) => value ?? 0;
export const useTransform = (_: any, __: any, ___: any) => 0;

export const animate = (..._args: any[]) => ({ stop: () => {} });

export default motion;