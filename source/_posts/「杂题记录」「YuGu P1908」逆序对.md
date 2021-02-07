---
title: 「YuGu P1908」逆序对
date: 2019-10-24 19:44:57
tags:
 - 归并排序
 - 逆序对
 - 树状数组
 - 数据结构
categories:
 - 杂题记录
---

{% note primary %}
求逆序对是有两种可爱的方法哦~
{% endnote %}

<!-- more -->
# 归并排序
```cpp
int A[_];
int tmp[_];
LL ans = 0;
void work(int l, int r)
{
	int m = (l + r) >> 1;
	if(l == r)return;
	work(l, m), work(m + 1, r);
	for(int i = l, j = m + 1,k = l;k <= r;k++)
	{
		if(i <= m && (j > r || A[i] <= A[j]))
			tmp[k] = A[i++], ans += (j - m - 1);
		else
			tmp[k] = A[j++];
	}
	for(register int i = l;i <= r;i++)
		A[i] = tmp[i];
}
int main()
{
	int n;
	scanf("%d", &n);
	for( register int i = 1;i <= n;i++)
		scanf("%d", A + i);
	work(1, n);
	printf("%lld", ans);
	return 0;
}
```

# 树状数组
思考一下逆序对的定义：

$$A_i > A_j (i < j)$$

考虑按顺序遍历序列$A$，假设当前遍历到$A_j$此时所有的$A_i$在前面已经遍历过了，这样就满足了一个条件（$i < j$）。

这样对于一个当前序列的元素$A_j$，和$A_j$构成逆序对的就是之前已经遍历过的所有元素中大于$A_j$的元素个数。这样就满足了第二个条件（$A_i < A_j$）

简单说，其实不一定非要使用树状数组这个数据结构维护，只要支持区间查询或者最值查询

$$A_i > A_j (i < j)$$

其实枚举顺序，就保证了每次计算的时候满足了$i < j$，我们只需要在所有已经处理的$A_i$中进行选择符合第二个条件的$A_i > A_j$即可。

我们把数据排序，并且进行离散化，放入树状数组，我比较习惯排序的时候从大到小排序。


比如:

源数据是：

`21 41 241 415 2141 31 3 2`

离散化后对应为：

`6   4  3   2    1   5 7 8 `（1是最大的）

按顺序离散化后放入树状数组后就是

![exp](https://i.loli.net/2019/10/24/vO7Pw1kXubQhpxs.png)

现在按照原数组中的顺序进行处理：
处理分两步：

 - 标记本数据已经出现
 - 统计这个元素形成的逆序对数量

代码体现为:
```cpp
    change(A[i]在树状数组中的位置, +1);
    ans += query(A[i]在树状数组中的位置);//查询树状数组中[1, A[i]在树状数组中的位置 )的和。
```
`ans += query(A[i]在树状数组中的位置);`

查询树状数组中[1, A[i]在树状数组中的位置 )的和。

因为区间[1, A[i]在树状数组中的位置 )就是保存着那些已经处理过的且小于$A[i]$的数据个数，这些都能形成逆序对，这段区间中为$1$就是已经被处理的了， 所以这段区间的总和就是能和A[i]形成的逆序对数量。

代码就是:
```cpp
struct Node{
	int Val;
	int where;
	bool operator < (const Node & A) const{
		if(Val == A.Val)
			return where > A.where;
		return Val > A.Val;
	}
}A[_];
int n;
int C[_];
int R[_];
int lowbit(int x) { return x & -x; }
int query(int x)
{
	int ans = 0;
	for(;x >= 1;x -= lowbit(x))
		ans += C[x];
	return ans;
}
void change(int x, int val)
{
	for(;x <= n;x += lowbit(x))
		C[x] += val;
}
signed main()
{
	n = read();
	for(_R int i = 1;i <= n;i++) {
		A[i].Val = read();
		A[i].where = i;
	}
	sort(A + 1, A + 1 + n);
	for(_R int i = 1;i <= n;i++) {
		R[A[i].where] = i;
	}
	int ans = 0;
	for(_R int i = 1;i <= n;i++) {
		change(R[i], 1);
		ans += query(R[i] - 1);
	}
	printf("%lld", ans);
	
	return 0;
}
```