import {useEffect, useRef} from 'react';
import * as THREE from 'three';

const ThreeBlobs = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const mouseRef = useRef<{x: number, y: number}>({x: 0, y: 0});
    // Store actual screen coordinates for direct blob manipulation
    const screenMouseRef = useRef<{x: number, y: number}>({x: 0, y: 0});

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        rendererRef.current = renderer;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Create simplified noise texture for better performance
        const createNoiseTexture = () => {
            const size = 256; // Reduced size for better performance
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d')!;

            const imageData = context.createImageData(size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.floor(Math.random() * 255);
                data[i] = value;     // Red
                data[i + 1] = value; // Green
                data[i + 2] = value; // Blue
                data[i + 3] = 255;   // Alpha
            }

            context.putImageData(imageData, 0, 0);

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
        };

        const noiseTexture = createNoiseTexture();

        // Enhanced shader material with stronger mouse interaction and center protection
        const createBlobMaterial = (color: string) => {
            return new THREE.ShaderMaterial({
                uniforms: {
                    uTime: {value: 0},
                    uColor: {value: new THREE.Color(color)},
                    uNoiseTexture: {value: noiseTexture},
                    uOpacity: {value: 0.8},
                    uMouse: {value: new THREE.Vector2(0, 0)},
                    uMouseIntensity: {value: 0.0}
                },
                vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uMouseIntensity;
          
          // Enhanced noise function
          float noise(vec3 position, float frequency) {
            return sin(position.x * frequency + uTime) * 
                   cos(position.y * frequency + uTime * 1.2) * 0.5;
          }
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            // Base deformation
            vec3 newPosition = position;
            newPosition += normal * noise(position, 0.5);
            
            // STRONGER mouse repulsion - increased effect but with safety limits
            vec2 mousePos = uMouse;
            vec2 vertPos = position.xy;
            
            // Calculate distance with a minimum to prevent extreme forces
            float dist = distance(mousePos, vertPos);
            dist = max(dist, 0.5); // Minimum distance to prevent extreme forces
            
            // Clamped strength calculation
            float strength = min(2.0 / dist, 1.0) * uMouseIntensity;
            
            // Push vertices away from mouse with clamped force
            vec2 direction = normalize(vertPos - mousePos);
            
            // Fix NaN issue when vertPos equals mousePos
            if(length(direction) < 0.01) {
                direction = vec2(1.0, 0.0); // Default direction
            }
            
            newPosition.xy += direction * strength;
            
            // Add some vertical displacement for more dramatic effect
            newPosition.z += strength * 0.3;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
                fragmentShader: `
          uniform vec3 uColor;
          uniform sampler2D uNoiseTexture;
          uniform float uOpacity;
          uniform vec2 uMouse;
          uniform float uMouseIntensity;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            // Simplified grain effect
            vec4 noise = texture2D(uNoiseTexture, vUv * 2.0);
            float grain = (noise.r - 0.5) * 0.2;
            
            // Distance from center for gradient effect
            float distanceFromCenter = length(vPosition.xy) / 2.0;
            
            // Enhanced mouse glow effect - brighter and more visible
            float dist = distance(vPosition.xy, uMouse);
            dist = max(dist, 0.5); // Prevent extreme values at center
            float glow = max(0.0, 1.0 - dist / 2.0) * uMouseIntensity * 1.5;
            
            float alpha = smoothstep(1.0, 0.0, distanceFromCenter) * uOpacity;
            
            // Add more dramatic color change when mouse is nearby
            vec3 finalColor = uColor + grain + glow + vec3(glow * 0.5, glow * 0.3, glow);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide
            });
        };

        // ACM Javeriana color palette
        const colors = ['#3a75ff', '#004af5', '#022983'];
        const blobs: THREE.Mesh[] = [];

        // Create lower-poly blob geometries for better performance
        colors.forEach((color, index) => {
            // Reduced segments from 64 to 32 for better performance
            const geometry = new THREE.SphereGeometry(2, 32, 32);
            const material = createBlobMaterial(color);
            const blob = new THREE.Mesh(geometry, material);

            // Position blobs
            const angle = (index / colors.length) * Math.PI * 2;
            blob.position.set(
                Math.cos(angle) * 4,
                Math.sin(angle) * 2,
                Math.sin(angle) * 3
            );

            blobs.push(blob);
            scene.add(blob);
        });

        // Basic lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        camera.position.z = 10;

        // Mouse movement handler - store both normalized and screen coordinates
        const handleMouseMove = (event: MouseEvent) => {
            // Store normalized coordinates for shader calculations
            mouseRef.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            };
            
            // Store actual screen coordinates for direct blob manipulation
            screenMouseRef.current = {
                x: event.clientX,
                y: event.clientY
            };
            
            // Update custom cursor position
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Convert normalized mouse position to world coordinates (improved version)
        const getMouseWorldPosition = () => {
            // Create a vector at the mouse position and correct z-depth
            const vector = new THREE.Vector3(
                mouseRef.current.x,
                mouseRef.current.y,
                0.5  // z=0.5 is at the center of the scene depth
            );
            
            // Convert to world coordinates
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));
            
            return pos;
        };

        // Animation loop with enhanced mouse interaction
        let time = 0;
        const animate = () => {
            time += 0.01;
            
            // Get mouse position in world space
            const mouseWorldPos = getMouseWorldPosition();
            
            // Update all blobs with stronger mouse interaction
            blobs.forEach((blob, index) => {
                // Update shader uniforms
                if (blob.material instanceof THREE.ShaderMaterial) {
                    const material = blob.material;
                    material.uniforms.uTime.value = time;
                    
                    // Pass mouse position to shader
                    material.uniforms.uMouse.value = new THREE.Vector2(mouseWorldPos.x, mouseWorldPos.y);
                    
                    // Calculate distance between blob and mouse with safety minimum
                    const blobPos = blob.position;
                    const dx = blobPos.x - mouseWorldPos.x;
                    const dy = blobPos.y - mouseWorldPos.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    dist = Math.max(dist, 1.0); // Minimum safe distance to prevent extreme behavior
                    
                    // More controlled mouse interaction
                    const intensity = Math.max(0, 1 - dist/6);
                    material.uniforms.uMouseIntensity.value = Math.min(intensity * 3.0, 1.5); // Clamped to reasonable value
                    
                    // Direct blob movement in response to mouse - with safety limits
                    if (dist < 5.0) {
                        // Calculate normalized direction with safety check
                        let dirX = dx;
                        let dirY = dy;
                        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
                        
                        // Avoid division by zero
                        if (dirLength > 0.001) {
                            dirX /= dirLength;
                            dirY /= dirLength;
                        } else {
                            // Random direction if too close to center
                            const angle = index * Math.PI * 0.7 + time;
                            dirX = Math.cos(angle);
                            dirY = Math.sin(angle);
                        }
                        
                        // Limit the repulsion force
                        const repulsionForce = Math.min(0.02 * (1 - dist/5.0), 0.01);
                        
                        // Apply controlled position change
                        blob.position.x += dirX * repulsionForce;
                        blob.position.y += dirY * repulsionForce;
                    }
                }

                // Simpler rotation animation
                blob.rotation.x += 0.002 * (index + 1);
                blob.rotation.y += 0.003 * (index + 1);

                // Simple floating motion
                const offset = index * Math.PI * 0.7;
                blob.position.y += Math.sin(time + offset) * 0.01;
                blob.position.x += Math.cos(time * 0.8 + offset) * 0.008;
                
                // Ensure blobs don't drift too far
                const distanceFromCenter = Math.sqrt(
                    blob.position.x * blob.position.x + 
                    blob.position.y * blob.position.y
                );
                
                if (distanceFromCenter > 8) {
                    // Gently pull back toward center
                    blob.position.x *= 0.99;
                    blob.position.y *= 0.99;
                }
            });

            renderer.render(scene, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();

            // Dispose geometries and materials
            blobs.forEach(blob => {
                blob.geometry.dispose();
                if (blob.material instanceof THREE.ShaderMaterial) {
                    blob.material.dispose();
                }
            });
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full"
            style={{filter: 'blur(0.3px)', cursor: 'none'}}
        >
            {/* Custom cursor */}
            <div 
                className="fixed rounded-full w-6 h-6 border-2 border-javeriana-medium/50 pointer-events-none"
                style={{
                    left: 0, 
                    top: 0, 
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.05s ease'
                }}
                id="custom-cursor"
            />
        </div>
    );
};

export default ThreeBlobs;
