---
title: 「杂题记录」「YuGu P4213」「模板」杜教筛
author: 舒阳
date: 2020-06-14 14:13:10
tags:
 - 数学
 - 杜教筛
categories:
 - 杂题记录
---


杜教筛是个好东西
<!-- more -->
杜教筛

# Code
```cpp


int phi0[_];
int prime[_];
int not_prime[_];
int tot = 0;
int mu[_];
const int LMT = 5e6 + 10;
void euler0(int n){
    phi0[1] = 1;
    mu[1] = 1;
    for(int i = 2;i <= n;i++){
        if(!not_prime[i])prime[++tot] = i, phi0[i] = i - 1, mu[i] = -1;
        for(int j = 1;j <= tot && prime[j] * i <= n;j++){
            int x = prime[j] * i;
            not_prime[x] = 1;
            if(i % prime[j] != 0) phi0[x] = phi0[i] * (prime[j] - 1), mu[x] = -mu[i];
                else             { phi0[x] = phi0[i] *  prime[j]; mu[x] = 0; break; }
        }
    }
    // for(int i = 1;i <= 20;i++) { printf("%d%c", phi0[i], " \n"[i == 20]); }
    // for(int i = 1;i <= 20;i++) { printf("%d%c",   mu[i], " \n"[i == 20]); }
    for(int i = 1;i <= n;i++) phi0[i] += phi0[i - 1];
    for(int i = 1;i <= n;i++) mu[i]   += mu  [i - 1];
}

map<unsigned, long long> phi1;
map<unsigned, long long> mu1;

LL calc1(int k){
    if(k <= LMT) return phi0[k];
    if(phi1[k] != 0) return phi1[k];
    LL ans = (k * 1ll * k + 0ll + k) / 2ll;
    for(unsigned int d = 2;d <= k;d++){
        unsigned int L = d, x = (k / L);
        unsigned int R = (k / x);
        ans -= calc1(x) * 1ll *  (R - L + 1);
        d = R;
    }
    return phi1[k] = ans;
}

LL calc2(int k){
    if(k <= LMT) return mu[k];
    if(mu1[k] != 0) return mu1[k];
    LL ans = 1;
    for(unsigned  int d = 2;d <= k;d++){
        unsigned int L = d, x = (k / L);
        unsigned int R = (k / x);
        ans -= calc2(x) * 1ll * (R - L + 1);
        d = R;
    }
    return mu1[k] = ans;
}
// int I[_];

signed main()
{
#ifdef LOCAL_JUDGE
    freopen("in.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
#endif
    clock_t c1 = clock();
    
    euler0(LMT);
    
    int T = read();
    // int MAX = 0;
    // for(int i = 1;i <= T;i++) MAX = max(MAX, I[i] = read());
    
    while(T--){
        // LL x;scanf("%lld", &x);
        int x = read();
        printf("%lld %lld\n", calc1(x), calc2(x));
    }
    
    
    std::cerr << "\n\nTime:  " << clock() - c1 << "  ms" << std::endl;
	return 0;
}

```
