---
title: 「琐记」注意事项 and 考试技巧
mathjax: true
date: 2020-11-29 21:01:04
tags:
 - 琐记
 - 技巧
categories:
 - 琐记
---

一些轻轻松松的 **退役**小技巧。
<!-- more -->
# 编译相关
## 编译指令
```
-Wall -Wl,--stack=2147483647
```

## 宏定义
```cpp
#warning check if index i out of bounds
#warning check if enable -Wall
#warning check if overflow
#define LL long long 
#define rep(i, l, r) for(int i = (l), ___ = (r); i <= ___; i++)
#define debug(x) cerr << #x << " = " << x << endl
```
## 容易漏下的头文件
```cpp
#include <cstdio>
#include <climits>
```