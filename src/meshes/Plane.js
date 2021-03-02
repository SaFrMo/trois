import { PlaneBufferGeometry } from 'three';
import { watch } from 'vue';
import Mesh from './Mesh.js';
import CANNON from 'cannon'

export default {
  extends: Mesh,
  props: {
    width: { type: Number, default: 1 },
    height: { type: Number, default: 1 },
    widthSegments: { type: Number, default: 1 },
    heightSegments: { type: Number, default: 1 },
  },
  created() {
    this.createGeometry();

    const watchProps = ['width', 'height', 'widthSegments', 'heightSegments'];
    watchProps.forEach(prop => {
      watch(() => this[prop], () => {
        this.refreshGeometry();
      });
    });
  },
  methods: {
    createGeometry() {
      this.geometry = new PlaneBufferGeometry(this.width, this.height, this.widthSegments, this.heightSegments);

      // physics creation
      if (this.physics) {
        const shape = new CANNON.Plane()
        const body = new CANNON.Body({
          mass: 0,
          shape,
          ...(this.physicsOptions || {})
        })
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.physics.world.addBody(body)
      }
    },
  },
  __hmrId: 'Plane',
};
