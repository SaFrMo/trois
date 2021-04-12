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

    this.three.onAfterInit(async () => {
      await this.$nextTick()
      await this.$nextTick()

      const optionsToPass = this.options.map(option => {
        switch (option) {
          case 'camera':
            return this.three.camera;
          case 'scene':
            return this.three.scene;
          case 'previous-pass':
          case 'prev-pass':
            return this.three.composer.readBuffer;
          case 'previous-texture':
          case 'prev-texture':
            return this.three.composer.readBuffer.texture;
          default:
            return option;
        }
      });
      const pass = new this.method(
        ...optionsToPass
      );

      this.completePass(pass);
    })
  },
  __hmrId: 'SSAOPass',
});
