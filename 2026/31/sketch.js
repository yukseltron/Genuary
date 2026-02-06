import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
      uv.x += 0.002 * sin(uv.y * 3.0 + u_time * 0.5);
      uv.y += -0.2 * cos(uv.x * 40.0 + u_time * 0.8);
      
      float d = length(uv);
      float ring = sin(d * 0.9 - u_time * 3.0) / 10.0;
      ring = abs(ring);
      ring = 0.01 / ring; 
      
      vec3 color = vec3(0.01 + 0.05 * sin(i + u_time), 0.3, 0.8 + 0.2 * cos(i));
      finalColor += color * ring;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function onWindowResize() {
  const w = 600;
  const h = 600;
  renderer.setSize(w, h);
  uniforms.u_resolution.value.set(w, h);
}

window.addEventListener('resize', onWindowResize);
onWindowResize();

function animate(time) {
  requestAnimationFrame(animate);
  uniforms.u_time.value = time * 0.0001; 
  renderer.render(scene, camera);
}

animate(0);