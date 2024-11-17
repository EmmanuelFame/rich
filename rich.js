let scene, camera, renderer, nucleus, stars, controls;
const container = document.getElementById("canvas_container");

init();
animate();

function init() {
    // Scene and Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 200);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Correctly Create OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement); // Proper usage
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(20, 32, 32);
    const nucleusMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6347,
        emissive: 0x300c00,
        wireframe: true,
    });
    nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.8,
    });

    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = THREE.MathUtils.randFloatSpread(600);
        const y = THREE.MathUtils.randFloatSpread(600);
        const z = THREE.MathUtils.randFloatSpread(600);
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Handle Window Resize
    window.addEventListener("resize", onWindowResize);

    // Fullscreen Button
    const fullscreenButton = document.getElementById("fullscr");
    let isFullscreen = false;
    fullscreenButton.addEventListener("click", () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
            fullscreenButton.textContent = "Exit Fullscreen";
        } else {
            document.exitFullscreen();
            fullscreenButton.textContent = "Go Fullscreen";
        }
        isFullscreen = !isFullscreen;
    });
}

function animate() {
    // Rotate Nucleus
    nucleus.rotation.x += 0.005;
    nucleus.rotation.y += 0.01;

    // Animate Stars
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    // Update Controls
    controls.update();

    // Render Scene
    renderer.render(scene, camera);

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
