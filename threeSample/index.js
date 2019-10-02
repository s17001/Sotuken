const width = 960;
const height = 730;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(1, 1, +80);

// カメラコントローラーを作成
const controls = new THREE.OrbitControls(camera);

// 箱を作成
const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
// const box = new THREE.Mesh(geometry, material);


// ドーナツを作成
const geometry_d = new THREE.TorusGeometry(300, 100, 64, 100);
// マテリアルを作成
const material_d = new THREE.MeshStandardMaterial({color: '#CBFFAB', roughness: 0.5});

const returnMaterial = (color) => {
    return new THREE.MeshStandardMaterial({color: color, roughness: 0.5});
}

// メッシュを作成
const mesh = new THREE.Mesh(geometry_d, material_d);
// 3D空間にメッシュを追加
// scene.add(mesh);

const box = new THREE.Mesh(geometry, material_d);


// scene.add(box);

// const mygeo = new THREE.OctahedronGeometry(100,100);
// const mygeo = new THREE.OctahedronBufferGeometry(10,10)//OctahedronBufferGeometryこのマテリアルげろ重い
const mygeo = new THREE.OctahedronGeometry(20, 0)//サイズ、追加頂点数
const myShape = new THREE.Mesh(mygeo, material_d);
const myShape2 = new THREE.Mesh(mygeo, returnMaterial('#E800A5'));
const myShape3 = new THREE.Mesh(mygeo, returnMaterial('#00E880'));
const myShape4 = new THREE.Mesh(mygeo, returnMaterial('#FFFE41'));
scene.add(myShape)
scene.add(myShape2)
scene.add(myShape3)
scene.add(myShape4)

//右下
myShape.position.z = 300 // Zのプラス方向を手前側
myShape.position.x = 300 // Xは右側が整数の領域

//左上
myShape2.position.z = -300
myShape2.position.x = -300

//右上
myShape3.position.z = -300
myShape3.position.x = 300

//左下
myShape4.position.z = 300
myShape4.position.x = -300

// 平行光源
const light = new THREE.DirectionalLight(0xFFFFFF);
// const light2 = new THREE.DirectionalLight(0xFFFFFF);
const light2 = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);


light.intensity = 1; //光度
light2.intensity = 1; //光度

light.position.set(600, 600, 600);
light2.position.set(-300, -1000, 0);

// シーンに追加
scene.add(light);
scene.add(light2);

const plane = new THREE.GridHelper(600, 8, 0x888888, 0x888888);//サイズ、1片あたりいくつ刻むか
plane.position.y = -40;
scene.add(plane);

let counter = 0

//このtickみたいなものを定義することができれば、コマンド選択した動き？みたいなのを実現できるかもしれない
tick = () => {

    // console.log(counter)
    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;
    // box.rotation.z += 0.01;

    myShape.rotation.y += 0.01;


    // shape1が2に近く実験
    if (myShape.position.x !== myShape2.position.x && myShape.position.z !== myShape2.position.z ) {
        Approach(myShape)(myShape2)
    }

    // counter += 1

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
}


const init = () => {
    // 初回実行
    try {
        tick();
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener('DOMContentLoaded', init);
