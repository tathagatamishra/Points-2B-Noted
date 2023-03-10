import * as THREE from 'three'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(50, 720 / 720)

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') })


renderer.setSize(720, 720)
camera.position.z = 5



const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


renderer.render(scene, camera)