declare module 'three/addons/geometries/HeartGeometry.d.ts' {
  import { BufferGeometry } from 'three';

  export class HeartGeometry extends BufferGeometry {
    constructor(radius?: number, height?: number);
  }
}

declare module 'three/addons/geometries/HeartGeometry.js' {
  import { HeartGeometry } from 'three/addons/geometries/HeartGeometry.d.ts';
  export { HeartGeometry };
}
