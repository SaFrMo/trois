<template>
    <Plane
        :rotation="{ x: Math.PI * -0.5 }"
        :scale="{ x: 40, y: 40 }"
        :position="{ y: -1 }"
        @click="idx++"
    >
        <ShaderMaterial
            ref="shader"
            :fragment-shader="fragmentShader"
            :vertex-shader="vertexShader"
        />
    </Plane>
</template>

<script>
const vertexShader = `
varying vec2 vUv;
varying float n;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main(){
    n = noise(uv);
    vec3 pos = position + normal * n;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`

const fragmentShader = `
varying float n;
void main(){
    gl_FragColor = vec4(vec3(n), 1.);
}
`

export default {
    data() {
        return {
            fragmentShader,
            vertexShader,
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            requestAnimationFrame(this.update)
        },
    },
}
</script>