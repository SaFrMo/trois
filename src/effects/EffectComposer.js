import { defineComponent, inject } from 'vue';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

export default defineComponent({
  setup() {
    const three = inject('three');
    const composer = true;
    three.composer = composer;

    return {
      composer,
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
    this.three.onAfterInit(async () => {
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
      const { width, height } = this.three.size;
      this.passes.forEach(pass => pass.setSize(width, height))
      this.composer.setSize(width, height);
    },
  },
  render() {
    return this.$slots.default();
  },
  __hmrId: 'EffectComposer',
});
