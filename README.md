# Woodpecker 啄木鸟

努力更新中`ing`...

## 文档结构:
- [基础](/1foundations/index.md)
- [代码题](/2code/index)
- [场景题](/3scene-questions/index.md)
- [面试经验](/Interview-experience/index.md)



### **目前共创：**

<center class ='img'>
    <a href='https://github.com/mnxj' target="_blank">
        <img title="mnxj" alt="mnxj" src="https://avatars.githubusercontent.com/u/63659134?v=4" width="50px">
    </a>
    <a href='https://github.com/lhui' target="_blank">
        <img title="lhui" alt="lhui" src="https://avatars.githubusercontent.com/u/36818242?v=4" width="50px">
    </a>
</center>


`右上角`可以查看仓库，欢迎大家`fork`，共同完善

### **本地启动方式：**
```shell
1、npm insatll / yarn
2、npm run prepare / yarn prepare
3、npm run dev/ yarn dev
```

### `url`和`目录`映射关系:

```json
const NameMap = {
    '2code': '代码题',
    '1foundations': '基础',
    'front-end': '大前端',
    '3scene-questions': '场景题',
    'back-end': '后端',
    'network': '网络',
    'test': '测试',
    'data-base': '数据库',
    'Interview-experience': '面试经验',
    'leet-code':'力扣'
}
```

面经也可以选择投稿`773178360@qq.com`或者提MR

好的复盘是可以帮助你下一次更好的拿到offer


### 常用排序算法和概念
| 排序算法 | 时间复杂度      | 空间复杂度   | 稳定性 |
| -------- | --------------- | ------------ | ------ |
| 冒泡排序 | O(n^2)          | O(1)         | 稳定   |
| 选择排序 | O(n^2)          | O(1)         | 不稳定 |
| 插入排序 | O(n^2)          | O(1)         | 稳定   |
| 快速排序 | O(nlogn)~O(n^2) | O(logn)~O(n) | 不稳定 |
| 归并排序 | O(nlogn)        | O(n)         | 稳定   |
| 堆排序   | O(nlogn)        | O(1)         | 不稳定 |
| 基数排序 | O(nk)           | O(n+k)       | 稳定   |
| 希尔排序 | O(n^1.3)~O(n^2) | O(1)         | 不稳定 |

1. **冒泡排序**：两次循环，比较两个数据元素，如果顺序不对则进行交换； 
2. **选择排序**：找到最小（大）元素，存放到排序序列的起始位置，剩余以此类推，直到所有元素均排序完毕； 
3. **插入排序**：有序序列，从后向前扫描，找到相应位置并插入，直到整个数组有序； 
4. **快速排序**：选择一个基准元素，通过一趟排序将待排序列分割成两部分，其中一部分的元素都比基准元素小，另一部分的元素都比基准元素大，然后对这两部分分别进行快速排序，整个排序过程可以递归进行，最终得到有序序列；
5. **归并排序**：将已有序的子序列合并，得到完全有序的序列。即先使每个子序列有序，再使子序列段间有序； 
6. **堆排序**：利用堆这种数据结构所设计的一种排序算法，将初始待排序关键字序列构建成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点，将其与末尾元素进行交换，使末尾元素最大，然后再将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次大值，如此反复执行，便能得到一个有序序列； 
7. **计数排序**：根据数组中每个元素的值，计算出该元素在排序后数组中的位置，并将其放入相应位置；
8.  **桶排序**：将数组分到有限数量的桶里，然后对每个桶内的元素进行单独排序，最后将各个桶中的元素合并起来； 
9. **基数排序**：按照低位先排序，然后收集，再按照高位排序，再收集，以此类推，直到最高位。