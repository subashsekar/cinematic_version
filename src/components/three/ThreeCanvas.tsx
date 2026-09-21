"use client";

import { Canvas, type CanvasProps, type EventManager } from "@react-three/fiber";

/**
 * These scenes are decorative. Disabling Fiber's DOM event manager avoids its
 * lifecycle race where a detached canvas target receives addEventListener.
 */
const createDisabledEvents = (): EventManager<HTMLElement> => ({
  enabled: false,
  priority: 0,
  handlers: {
    onClick: () => undefined,
    onContextMenu: () => undefined,
    onDoubleClick: () => undefined,
    onWheel: () => undefined,
    onPointerDown: () => undefined,
    onPointerUp: () => undefined,
    onPointerLeave: () => undefined,
    onPointerMove: () => undefined,
    onPointerCancel: () => undefined,
    onLostPointerCapture: () => undefined,
  },
  connect: () => undefined,
  disconnect: () => undefined,
  update: () => undefined,
});

export function ThreeCanvas({ children, ...props }: CanvasProps) {
  return (
    <Canvas {...props} events={createDisabledEvents}>
      {children}
    </Canvas>
  );
}
