import { defineComponent } from 'vue';
import EffectPass from './EffectPass.js';

export default defineComponent({
  extends: EffectPass,
  props: {
    method: {
      type: Function,
      default: null
    },
    options: {
      type: Array,
      default: () => ([]),
    },
  },
  mounted() {
    if (!this.method) {
      console.error('Must include `method` for custom pass.');
      return;
    }

    const optionsToPass = this.options.map(option => {
      switch (option) {
        case 'camera':
          return this.three.camera;
        case 'scene':
          return this.three.scene;
        case 'previous-pass':
          return this.composer.readBuffer;
        case 'previous-texture':
          return this.composer.readBuffer.texture;
        default:
          return option;
      }
    });
    const pass = new this.method(
      ...optionsToPass
    );

    this.completePass(pass);
  },
  __hmrId: 'SSAOPass',
});
