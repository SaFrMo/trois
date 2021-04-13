import { defineComponent } from 'vue';
import EffectPass from './EffectPass.js';
import { EffectPass as PostprocessingEffectPass } from 'postprocessing';

export default defineComponent({
  extends: EffectPass,
  props: {
    method: {
      type: Function,
      default: null
    },
    options: {
      default: () => ([]),
    },
  },
  inject: ['three'],
  mounted() {
    if (!this.method) {
      console.error('Must include `method` for custom pass.');
      return;
    }

    this.three.onAfterInit(() => {
      const toMap = Array.isArray(this.options) ? this.options : [this.options]

      const optionsToPass = toMap.map(option => {
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
      console.log(new this.method(...optionsToPass))
      // TODO: batch into single EffectPass - see https://vanruesc.github.io/postprocessing/public/demo/#performance
      const pass = new PostprocessingEffectPass(this.three.camera, new this.method(
        ...optionsToPass
      ));

      this.completePass(pass);
    })
  },
  __hmrId: 'SSAOPass',
});
