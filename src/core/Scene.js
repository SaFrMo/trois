import { Scene, Color } from 'three';
import { watch, inject } from 'vue';
import createPhysics from '../physics/createPhysics'

export default {
  inject: ['three'],
  props: {
    id: String,
    background: [String, Number],
    
    // physics props
    usePhysics: { type: Boolean, default: false },
    // string or number is parsed to float, object is {x, y, z} Vector3,
    // array is [x,y,z]
    gravity: { type: [String, Number, Object, Array], default: -9.82 }
  },
  setup(props) {
    const scene = new Scene();
    if (props.background) scene.background = new Color(props.background);
    watch(() => props.background, (value) => { scene.background = new Color(value); });
    
    const three = inject('three')
    let physics = null
    // set up physics if requested
    if (props.usePhysics){
      physics = createPhysics({ gravity: props.gravity })
      three.onBeforeRender(physics.update)
    }
    
    return { scene, physics };
  },
  provide() {
    return {
      scene: this.scene,
      physics: this.physics
    };
  },
  mounted() {
    if (!this.three.scene) {
      this.three.scene = this.scene;
    }
  },
  methods: {
    // add(o) {
    //   this.scene.add(o);
    // },
    // remove(o) {
    //   this.scene.remove(o);
    // },
  },
  render() {
    if (this.$slots.default) {
      return this.$slots.default();
    }
    return [];
  },
};
