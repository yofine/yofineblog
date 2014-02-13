 //renderer
var width, height; // 声明全局变量
var renderer; // 声明全局变量
function initThree() {
    width = document.getElementById('header').clientWidth; //获取画布的宽度
    height = document.getElementById('header').clientHeight; //获取画布的高度
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); //生成渲染器对象（抗锯齿设置为有效）
    renderer.setSize(width, height); //设置渲染器高宽和画布一致
    document.getElementById('canvas-frame').appendChild(renderer.domElement); //*追加【canvas】元素到【canvas-frame元素中
    renderer.setClearColorHex(0xFFFFFF, 1.0); //设置清除色
}

//camera
var camera; //声明全局变量
function initCamera() {
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000); //设置透视投影的相机
    camera.position.x = 400;
    camera.position.y = 50;
    camera.position.z = 50; //设置相机的位置坐标
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1; //规定相机的上位【z】轴方向
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    }); //设置视野的中心坐标
}

//scene
var scene;

function initScene() {
    scene = new THREE.Scene();
}

//light
var light, light2;

function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0); //用「DirectionalLight」类声明一个叫 [light] 的对象来代表平行光源
    light.position.set(100, 100, 200); //设置光源向量
    scene.add(light); //追加光源到场景

    light2 = new THREE.AmbientLight(0x555555); //添加环境光
    scene.add(light2);
}

//cube
var cube;

function initObject() {
    var geometry = new THREE.CubeGeometry(150, 150, 150);

    for (var i = 0; i < geometry.faces.length; i++) {

        geometry.faces[i].color.setHex(Math.random() * 0xffffff);

    }

    var material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        ambient: 0xFF0000
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(0, 0, 0);
}

//three start
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    loop();
}

//loop
var t = 0;

function loop() {
    t++;
    cube.rotation.set(t / 50, t / 50, t / 50);
    camera.position.set(400 * Math.cos(t / 100), 400 * Math.sin(t / 200), 50 * Math.cos(t / 50));
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    });
    renderer.clear();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

threeStart();