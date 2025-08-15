const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许跨域

// 模拟数据库数据(返回叶子节点)
// const regionData = [
//   { id: '1000', name: '江苏省', parentId: null, isLeaf: false},
//   { id: '2000', name: '浙江省', parentId: null, isLeaf: false },
//   { id: '1001', name: '南京市', parentId: '1000', isLeaf: false },
//   { id: '1002', name: '苏州市', parentId: '1000', isLeaf: false },
//   { id: '100101', name: '玄武区', parentId: '1001', isLeaf: true },
//   { id: '100102', name: '鼓楼区', parentId: '1001', isLeaf: true },
//   { id: '2001', name: '杭州市', parentId: '2000', isLeaf: false },
//   { id: '200101', name: '西湖区', parentId: '2001', isLeaf: true },
// ]
// 模拟数据库数据（不返回叶子节点）
const regionData = [
  { id: '1000', name: '江苏省', parentId: null },
  { id: '2000', name: '浙江省', parentId: null },
  { id: '3000', name: '安徽省', parentId: null },
  { id: '1001', name: '南京市', parentId: '1000' },
  { id: '1002', name: '苏州市', parentId: '1000' },
  { id: '100101', name: '玄武区', parentId: '1001' },
  { id: '100102', name: '鼓楼区', parentId: '1001' },
  { id: '2001', name: '杭州市', parentId: '2000' },
  { id: '200101', name: '西湖区', parentId: '2001' },
]

// 单接口动态查询：/api/region?parentId=xxx
app.get('/api/regions', (req, res) => {
  console.log('req.query: ', req.query);
  const parentId = req.query.parentId || null; // 不传parentId 时返回根节点
  console.log('后端接收到的 parentId: ', parentId); // 打印参数

  // 过滤出对应级的节点
  const nodes = regionData.filter(item => item.parentId === parentId).map(item => ({
    value: item.id,
    label: item.name,
    leaf: item.isLeaf, // 是否是叶子节点（没有子级）
  }));

  // 模拟网络延迟（可选）
  setTimeout(() => {
    console.log('nodes: ', nodes);
    res.json(nodes);
  }, 300);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});