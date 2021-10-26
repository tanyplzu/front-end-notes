# Three.JS

## 常用方法

### group

```js
//创建两个网格模型mesh1、mesh2
var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var group = new THREE.group();
var mesh1 = new THREE.Mesh(geometry, material);
var mesh2 = new THREE.Mesh(geometry, material);
mesh2.translateX(25);
//把mesh1型插入到组group中，mesh1作为group的子对象
group.add(mesh1);
//把mesh2型插入到组group中，mesh2作为group的子对象
group.add(mesh2);
//把group插入到场景中作为场景子对象
scene.add(group);
```

父对象 group 进行旋转、缩放、平移变换，子对象同样跟着变换

```js
//沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
group.translateY(100);
//父对象缩放，子对象跟着缩放
group.scale.set(4, 4, 4);
//父对象旋转，子对象跟着旋转
group.rotateY(Math.PI / 6);
```

### BufferGeometry

缓冲区类型几何体 BufferGeometry 是 Three.js 的核心类之一，立方体 BoxBufferGeometry、圆柱体 CylinderBufferGeometry、球体 SphereBufferGeometry 等几何体类的基类都是 BufferGeometry。

```js
//创建一个缓冲类型的几何体对象
var geo = new THREE.BufferGeometry();
//类型数组创建顶点数据  数组中包含6个顶点的xyz坐标数据
var verArr = new Float32Array([
  1, 2, 3,
  49, 2, 4,
  -1, 99, -1,
  1, 1, 9,
  6, 5, 108,
  48, 1, 3,
]);
//三个为一组，表示一个顶点坐标
var BufferAttribute = new THREE.BufferAttribute(verArr, 3);
// 设置几何体的顶点位置数据
geo.attributes.position = BufferAttribute;
```

Three.js渲染器解析BufferGeometry

Three.js渲染器在渲染场景的时候，会从缓冲类型几何体对象BufferGeometry中提取顶点位置、法向量、颜色、索引等数据，然后调用WebGL相关原生API创建顶点缓冲区，这样GUP可以读取顶点数据在顶点着色器中进行逐顶点计算处理。


## dispose

删除场景对象中Scene一个子对象Group，并释放组对象Group中所有网格模型几何体的顶点缓冲区占用内存

```js
// 递归遍历组对象group释放所有后代网格模型绑定几何体占用内存
group.traverse(function(obj) {
  if (obj.type === 'Mesh') {
    obj.geometry.dispose();
    obj.material.dispose();
  }
})
// 删除场景对象scene的子对象group
scene.remove(group);
```