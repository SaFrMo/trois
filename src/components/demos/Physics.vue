<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05 }">
    <Camera :position="{ x: 5, y: 3, z:-8 }" ref="camera"/>
    <Scene background="#ffffff" use-physics>
        <PointLight :position="{ x: 10, y: 50, z: 50 }" />
        
        
      <Box :size="1" ref="falling">
        <LambertMaterial />
      </Box>
      
      <Box ref="box" :position="{x: 0.5, y: -4, z: 0.6}" :physics-options="{ mass: 0 }" :size="1">
        <LambertMaterial />
      </Box>
       <!-- <Plane ref="box" :size="1" >
         <LambertMaterial />
     </Plane> -->
    </Scene>
  </Renderer>
</template>

<script>

export default {
  mounted() {
    const renderer = this.$refs.renderer;
    const camera = this.$refs.camera.camera;
    const falling = this.$refs.falling;
    renderer.onBeforeRender(() => {
      // console.log(falling.mesh.position)
      camera.lookAt(falling.mesh.position)
    })
  },
};
</script>
