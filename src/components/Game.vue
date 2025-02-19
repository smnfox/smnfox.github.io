<template>
    <div class="game__wrapper">
        <div
            class="game__container"
            ref="game"
        />
        <div
            v-if="gameState !== 'NotStarted'"
            class="game__score"
        >
            {{ score }}
        </div>
        <div
            v-if="gameState === 'Paused'"
            class="game__pause game__overlay"
        >
            PAUSE
        </div>
        <div
            v-if="gameState === 'GameOver'"
            class="game__over game__overlay"
        >
            Defeat.
            Your score:
            <span>{{ score }}</span>
            <Button @click="gameRestart">Restart</Button>
        </div>
        <div
            v-if="gameState === 'NotStarted'"
            class="game__start game__overlay"
        >
            <Button @click="gameRestart">Start game</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onBeforeUnmount, onMounted, useTemplateRef, ref, type Ref } from 'vue';
import RAPIER from '@dimforge/rapier3d-compat';
import { GAME_SOUNDS, sounds } from '../services/sounds';
import Button from "primevue/button";


const game = useTemplateRef('game');

const clock = new THREE.Clock();
let time = 0;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let world: RAPIER.World;
let character: {
    mesh: THREE.Object3D
    collider: RAPIER.Collider
};
let characterController: RAPIER.KinematicCharacterController;
const dynamicObjects: [THREE.Object3D, RAPIER.RigidBody][] = [];

const inputs = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
};
const jumpSpeed = 12;
const characterSpeed = 4;
const characterOffset = 0.01; // The gap the controller will leave between the character and its environment.

let yForce = 0;
let xForce = 0;
let zForce = 0;

const gameState: Ref<GameState> = ref('NotStarted');
const score = ref(0);

type GameState = 'NotStarted' | 'Paused' | 'GameOver' | 'InProgress';

const togglePause = () => {
    if (gameState.value === 'Paused') {
        gameState.value = 'InProgress';
        renderGame();
    } else {
        gameState.value = 'Paused';
    }
};

const onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            inputs.forward = true;
            break;
        case 'KeyS':
        case 'ArrowDown':
            inputs.backward = true;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            inputs.left = true;
            break;
        case 'KeyD':
        case 'ArrowRight':
            inputs.right = true;
            break;
        case 'Space':
            inputs.up = true;
            break;
        case 'Escape':
            togglePause();
            break;
        default:
            break;
    }
};

const onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            inputs.forward = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            inputs.backward = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            inputs.left = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            inputs.right = false;
            break;
        case 'Space':
            inputs.up = false;
            break;
        default:
            break;
    }
};

const onWindowResize = () => {
    if (!game.value || !camera) {
        return;
    }

    camera.aspect = game.value.offsetWidth / game.value.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(game.value.offsetWidth, game.value.offsetHeight);
}

const initGraphics = () => {
    if (!game.value) {
        return;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xbfd1e5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.setSize(game.value.offsetWidth, game.value.offsetHeight);

    camera = new THREE.PerspectiveCamera(60, game.value.offsetWidth / game.value.offsetHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    dirLight.shadow.camera.left = - 35;
    dirLight.shadow.camera.right = 35;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = - 35;
    dirLight.shadow.blurSamples = 10;
    dirLight.shadow.radius = 5;
    dirLight.position.set(10, 15, 30);
    scene.add(dirLight);

    controls = new OrbitControls(camera, renderer.domElement);
    game.value.appendChild( renderer.domElement );
    window.addEventListener('resize', onWindowResize, false);
};

const initObjects = () => {
    const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 50), new THREE.MeshPhongMaterial());
    floorMesh.receiveShadow = true;
    floorMesh.position.y = -1;
    scene.add(floorMesh);
    const floorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -1, 0));
    const floorShape = RAPIER.ColliderDesc.cuboid(10, 0.5, 25);
    world.createCollider(floorShape, floorBody);

    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial({color: 0xff0000}));
    cubeMesh.castShadow = true;
    scene.add(cubeMesh);
    const cubeBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 0, -10).setCanSleep(false));
    const cubeShape = RAPIER.ColliderDesc.cuboid(1, 1, 1).setMass(1).setRestitution(1.1);
    world.createCollider(cubeShape, cubeBody);
    dynamicObjects.push([cubeMesh, cubeBody]);

    const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshNormalMaterial());
    sphereMesh.castShadow = true;
    scene.add(sphereMesh);
    const sphereBody = world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 5, 5));
    const sphereShape = RAPIER.ColliderDesc.ball(1).setMass(1).setRestitution(1.1);
    character =  {
        mesh: sphereMesh,
        collider: world.createCollider(sphereShape, sphereBody),
    };
};

const initPhysics = async () => {
    await RAPIER.init();
    const gravity = new RAPIER.Vector3(0.0, -9.81, 0.0);
    world = new RAPIER.World(gravity);

    characterController = world.createCharacterController(characterOffset);
    characterController.enableAutostep(0.5, 0.2, true);
    characterController.enableSnapToGround(0.5);
};

const gameEnd = () => {
    gameState.value = 'GameOver';
};

const gameRestart = () => {
    time = 0;
    score.value = 0;
    yForce = 0;
    xForce = 0;
    zForce = 0;
    gameState.value = 'InProgress';

    character.collider.parent()?.setNextKinematicTranslation({
        x: 0,
        y: 5,
        z: 5,
    });
    character.mesh.position.copy(character.collider.parent().translation());
    character.mesh.quaternion.copy(character.collider.parent().rotation());
    requestAnimationFrame(renderGame);
};

const handleInput = (deltaTime: number) => {
    const translation = character.collider.parent()?.translation();
    if (translation && translation.y < -1) {
        // fell from the platform
        sounds.playSound('defeat');
        gameEnd();
        return;
    }

    const characterVelocity = new THREE.Vector3();
    const horizontalVelocity = new THREE.Vector3();

    if (zForce > 0) {
        zForce -= deltaTime * characterSpeed;
        if (zForce < 0) {
            zForce = 0;
        }
    } else if (zForce < 0) {
        zForce += deltaTime * characterSpeed;
        if (zForce > 0) {
            zForce = 0;
        }
    }
    if (inputs.forward) {
        zForce = -characterSpeed;
    }
    if (inputs.backward) {
        zForce = characterSpeed;
    }

    if (xForce > 0) {
        xForce -= deltaTime * characterSpeed;
        if (xForce < 0) {
            xForce = 0;
        }
    } else if (xForce < 0) {
        xForce += deltaTime * characterSpeed;
        if (xForce > 0) {
            xForce = 0;
        }
    }
    if (inputs.left) {
        xForce = -characterSpeed;
    }
    if (inputs.right) {
        xForce = characterSpeed;
    }

    horizontalVelocity.x += xForce;
    horizontalVelocity.z += zForce;

    characterVelocity.add(horizontalVelocity.multiplyScalar(deltaTime * characterSpeed));

    const isGrounded = characterController.computedGrounded();
    const verticalVelocity = new THREE.Vector3();
    yForce -= deltaTime * 20;
    if (isGrounded && inputs.up) {
        yForce = jumpSpeed;
        sounds.playSound('jump');
    } else if (isGrounded) {
        yForce = 0;
    }
    verticalVelocity.y += yForce;
    characterVelocity.add(verticalVelocity.multiplyScalar(deltaTime));

    characterController.computeColliderMovement(character.collider, characterVelocity);

    const nextTranslation = new THREE.Vector3();
    nextTranslation.copy(character.collider.parent().translation());
    nextTranslation.add(characterController.computedMovement());

    character.collider.parent()?.setNextKinematicTranslation(nextTranslation);
    character.mesh.position.copy(character.collider.parent().translation());
    character.mesh.quaternion.copy(character.collider.parent().rotation());

    // Check collisions
    for (var i = 0; i < characterController.numComputedCollisions(); i++) {
        let collision = characterController.computedCollision(i);
        if (collision?.collider?.parent()?.bodyType() === 0) {
            // floor body type - 1
            // anything else body type - 0
            // or its fixed/dynamic bodies idk
            sounds.playSound('defeat');
            gameEnd();
            return;
        }
    }
};

const renderGame = () => {
    if (gameState.value !== 'InProgress') {
        return;
    }
	requestAnimationFrame(renderGame);

    // Don't go below 30 Hz to prevent spiral of death
    let deltaTime = clock.getDelta();
    deltaTime = Math.min(deltaTime, 1.0 / 30.0);

    world.timestep = Math.min(deltaTime, 0.1);
    world.step();

    handleInput(deltaTime);

    for (let i = 0, n = dynamicObjects.length; i < n; i++) {
        dynamicObjects[i][0].position.copy(dynamicObjects[i][1].translation());
        dynamicObjects[i][0].quaternion.copy(dynamicObjects[i][1].rotation());
    }

    time += deltaTime;
    score.value = Number(time.toFixed());
    controls.update(deltaTime);
    renderer.render(scene, camera);
};

onMounted(async () => {
    if (!game.value) {
        throw new Error('No game container');
    }

	if (!WebGL.isWebGL2Available()) {
		const warning = WebGL.getWebGLErrorMessage();
		game.value.appendChild(warning);
        return;
	}

    await initPhysics();
    initGraphics();
    initObjects();
    renderGame();

    sounds.preloadSounds(GAME_SOUNDS);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
});

onBeforeUnmount(() => {
    gameState.value = 'GameOver';
    world.removeCharacterController(characterController);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
});
</script>

<style scoped lang="scss">
.game {
    &__wrapper {
        position: relative;
        width: 100%;
        flex-grow: 1;
        display: flex;
    }

    &__container {
        width: 100%;
    }

    &__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__score {
        position: absolute;
        left: 5%;
        top: 5%;
        color: #000000;
        font-size: 20px;
        font-weight: 700;
    }

    &__over {
        flex-direction: column;
        gap: 8px;
        color: #ffffff;
    }

    &__start {
        background-color: transparent;
    }
}
</style>
