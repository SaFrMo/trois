import { BoxBufferGeometry } from 'three';
import { watch } from 'vue';
import Mesh from './Mesh.js';
import CANNON from 'cannon'

export default {
  extends: Mesh,
  props: {
    size: Number,
    width: { type: Number, default: 1 },
    height: { type: Number, default: 1 },
    depth: { type: Number, default: 1 },
    widthSegments: { type: Number, default: 1 },
    heightSegments: { type: Number, default: 1 },
    depthSegments: { type: Number, default: 1 },
  },
  created() {
    this.createGeometry();

    ['size', 'width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegments'].forEach(prop => {
      watch(() => this[prop], () => {
        this.refreshGeometry();
      });
    });
  },
  methods: {
    createGeometry() {
      const sides = this.size
        ? [this.size, this.size, this.size]
        : [this.width, this.height, this.depth];
      this.geometry = new BoxBufferGeometry(...sides);

      // physics creation
      if (this.physics) {
        const halfSides = sides.map(v => v * 0.5)
        const shape = new CANNON.Box(new CANNON.Vec3(...halfSides))
        const position = this.position || { x: 0, y: 0, z: 0 }
        const sphereBody = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(position.x, position.y, position.z),
          shape,
          ...(this.physicsOptions || {})
        })
        this.physics.world.addBody(sphereBody)

        this.three.onBeforeRender(() => {
          this.mesh.position.copy(sphereBody.position)
          this.mesh.quaternion.copy(sphereBody.quaternion)
        })
      }
    },
  },
  __hmrId: 'Box',
};
