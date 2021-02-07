---
title: 「杂题记录」「YuGu P4551」最长异或路径
author: 舒阳
date: 2020-07-10 20:47:13
tags:
 - 数论
 - 贪心
 - trie
categories:
 - 杂题记录
---

{% note success %}
#### 题意
在一组数据中查询某个数据`x`，使`x`与被查询数最大。
{% endnote %}

<!-- more -->
{% note warning %}
#### 注意
注意下一结点编号，注意记得先新建S结点 
由高位向地位建立`trie`。
注意考虑最高位 （32 ？ 31 ？ 30）。
{% endnote %}
# Code
```cpp
int head[_];
struct edges{
    int node;
    int w;
    int nxt;
}edge[_];
int tot = 0;
void add(int u, int v, int w){
    edge[++tot].nxt = head[u];
    head[u] = tot;
    edge[tot].node = v;
    edge[tot].w = w;
}
int n;
int rt = 0;
int xorv[_];
namespace trie{
    const int MAXH = 32;
    int ch[_ * MAXH][2];
    int tot = 1; // 注意下一结点编号，注意记得先新建S结点 
    
    void insert(int val){
        int o = 1;
        for(int i = 30;i >= 0;i--){
            int v = (val >> i) & 1;
            if(!ch[o][v]) ch[o][v] = ++tot;
            o = ch[o][v];
        }
    }
    int check(int val){
        int o = 1;
        int res = 0;
        for(int i = 30;i >= 0;i--){
            int v = ((val >> i) & 1); 
            if(ch[o][v^1]) v = v^1;
            res = (res << 1) | v;
            o = ch[o][v];
        }
        return res;
    }
    
}
void dfs0(int o, int f, int val){
    xorv[o] = val;
    for(int i = head[o];i;i = edge[i].nxt){ if(edge[i].node != f)dfs0(edge[i].node, o, val ^ edge[i].w); } 
}
int main()
{
#ifdef LOCAL_JUDGE
    freopen("in.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
#endif
    clock_t c1 = clock();
    n = read();
    for(int i = 1;i < n;i++) {
        int u = read(), v = read(), w = read();
        add(u, v, w); add(v, rt = u, w);
    }
    dfs0(rt, -1,  0);
    for(int i = 1;i <= n;i++) if(i != rt) trie::insert(xorv[i]);
    for(int i = 1;i <= n;i++) { }
    int ans = 0;
    for(int i = 1;i <= n;i++) ans = max(ans, trie::check(xorv[i]) ^ xorv[i]);
    for(int i = 1;i <= n;i++) ans = max(ans, xorv[i]);
    printf("%d\n", ans);
    
    std::cerr << "\n\nTime:  " << clock() - c1 << "  ms" << std::endl;
	return 0;
}
```
