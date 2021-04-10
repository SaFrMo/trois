import { defineComponent, inject } from 'vue';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

export default defineComponent({
  setup() {
    return {
      composer: null,
      passes: [],
    };
  },
  inject: ['three'],
  provide() {
    return {
      composer: this.composer,
      passes: this.passes,
    };
  },
  mounted() {
    this.three.onAfterInit(() => {
      this.composer = new EffectComposer(this.three.renderer);
      this.three.renderer.autoClear = false;
      this.passes.forEach(pass => {
        this.composer.addPass(pass);
      });
      this.three.composer = this.composer;

      this.resize();
      this.three.onAfterResize(this.resize);
    });
  },
  unmounted() {
    this.three.offAfterResize(this.resize);
  },
  methods: {
    resize() {
      this.composer.setSize(this.three.size.width, this.three.size.height);
    },
  },
  render() {
    return this.$slots.default();
  },
  __hmrId: 'EffectComposer',
});
