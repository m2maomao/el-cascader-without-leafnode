<template>
  <div>
    <div class="block">
      <h3>动态加载</h3>
      <!-- 动态级联：v-model绑定选中值，props需要提供{lazy, lazyLoad}, lazy为开启懒加载 -->
      <el-cascader
        ref="cascader"
        v-model="selectedOptions"
        :props="props"
        @change="handleChange"
        @expand-change="handleExpandChange"
      ></el-cascader>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      selectedOptions: []
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 默认就会执行？先拿到第一级数据
    async lazyLoad(node, resolve) {
      const parentId = node.level === 0 ? null : node.value;
      try {
        const res = await this.fetchChildNodes(parentId);
        const children = res.data || [];
        if (children.length === 0) {
          node.leaf = true;
          resolve([]);
          // hack: 延迟模拟点击选中当前节点
          this.$nextTick(() => {
            setTimeout(() => {
              const cascaderMenus = document.querySelectorAll('.el-cascader-menu');
              if (cascaderMenus && cascaderMenus.length > 0) {
                const lastMenu = cascaderMenus[cascaderMenus.length - 1];
                const allNodes = lastMenu.querySelectorAll('.el-cascader-node:not(.is-disabled)');
                let targetItem = null;
                allNodes.forEach(n => {
                  // 用 label 匹配
                  if (n.innerText.trim() === node.label) {
                    targetItem = n;
                  }
                });
                if (targetItem) {
                  targetItem.click();
                } else {
                  // 没找到可以打印所有节点和 node.label 方便调试
                  console.log('未找到目标节点，node.label:', node.label);
                  allNodes.forEach(n => {
                    console.log('节点文本:', n.innerText.trim());
                  });
                }
              }
            }, 200);
          });
        } else {
          const nodes = children.map(item => ({
            value: item.value,
            label: item.label,
          }));
          resolve(nodes);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        resolve([]);
      }
    },
    handleExpandChange(nodes) {
      if (!nodes || nodes.length === 0) return;
      const lastNode = nodes[nodes.length - 1];
      // 只有叶子节点才自动选中
      if (lastNode && lastNode.leaf) {
        this.selectedOptions = nodes.map(n => n.value);
      }
    },
    async fetchChildNodes(parentId) {
      return axios.get('http://localhost:3000/api/regions', {
        params: { parentId },
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid #ddd;
}
</style>