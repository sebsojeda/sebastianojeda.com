---
title: Factorized Convolutions Explained
description: Factorized convolutions are a method to reduce the computational cost of convolutions, especially in deep neural networks. By decomposing or "factorizing" a standard convolution into multiple simpler convolutions, we can often achieve a reduction in the number of parameters and computations, while maintaining similar (or sometimes even better) performance.
date: 2023-10-25
---

Factorized convolutions are a method to reduce the computational cost of convolutions, especially in deep neural networks. By decomposing or "factorizing" a standard convolution into multiple simpler convolutions, we can often achieve a reduction in the number of parameters and computations, while maintaining similar (or sometimes even better) performance.

Let's consider two common forms of factorized convolutions:

1. **Separable Convolutions**: This is a technique where a standard convolution is decomposed into two stages:

   - **Depthwise Convolution**: Apply a single filter for each input channel. If the input has $C$ channels, then we have separate filters, one for each channel.
   - **Pointwise Convolution**: Apply a $1 \times 1$ convolution to combine the outputs of the depthwise convolution.

   For example, for 2D images, instead of performing a standard $3 \times 3$ convolution with $C$ input channels and $F$ output filters (which would require $3 * 3 * C * F$ parameters), we first apply a depthwise $3 \times 3$ convolution (requiring $3 * 3 * C$ parameters) and then a $1 \times 1$ pointwise convolution (requiring $C * F$ parameters). The total parameters for the separable convolution would then be $3 * 3 * C + C * F$, which is usually much fewer than the standard convolution for large $F$.

2. **Factorized Convolutions using Reduced Rank**: This technique involves decomposing a filter matrix into two low-rank matrices. The idea is similar to matrix factorization methods like Singular Value Decomposition (SVD). By representing a convolutional filter as a product of two smaller filters, the number of parameters can be reduced.

The key idea behind factorized convolutions is to achieve computational efficiency without sacrificing too much in terms of model performance. By splitting a complex operation into simpler parts, the model can still capture the required patterns in data while being faster and requiring fewer parameters. This is especially beneficial in resource-constrained environments, like mobile devices.

In practice, factorized convolutions, especially depthwise separable convolutions, have been successfully used in architectures like MobileNets, which are designed for mobile and edge devices.
