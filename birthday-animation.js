// Setup
const canvas = document.getElementById('birthday-scene');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Balloons
const balloonGeometry = new THREE.SphereGeometry(2, 32, 32);
const balloonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const balloons = [];
for (let i = 0; i < 20; i++) {
    const balloon = new THREE.Mesh(balloonGeometry, balloonMaterial);
    balloon.position.set(
        Math.random() * 50 - 25,
        Math.random() * 50 - 25,
        Math.random() * 50 - 25
    );
    scene.add(balloon);
    balloons.push(balloon);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Move Balloons Up
    balloons.forEach(balloon => {
        balloon.position.y += 0.1;
        if (balloon.position.y > 30) balloon.position.y = -30;
    });

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
