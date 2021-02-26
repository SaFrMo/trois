<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05 }">
    <Camera :position="{ x: 5, y: 5, z:-5 }" />
    <Scene background="#ffffff">
        <PointLight :position="{ x: 10, y: 50, z: 50 }" />
      <Box ref="box" :size="1">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script>

export default {
  mounted() {
    const renderer = this.$refs.renderer;
  },
};
</script>
