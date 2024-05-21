---
title: Galerkin transformer as backbone
published: 2024-05-21
description: ''
image: ''
tags: [毕设, MeGaFormer]
category: '实践学习'
draft: false 
---
# 目录
- [目录](#目录)
- [注册新Backbone](#注册新backbone)
- [修改模型架构](#修改模型架构)
  - [增大特征图输出尺寸](#增大特征图输出尺寸)
  - [使用Galerkin Attention机制](#使用galerkin-attention机制)
- [添加配置文件](#添加配置文件)
  - [增大特征图输出尺寸的设置](#增大特征图输出尺寸的设置)
  - [显存不够情况的调整](#显存不够情况的调整)

本文目的：增大架构中由backbone输出的特征图金字塔尺寸，在MeGaFormer中使用Galerkin transformer作为backbone。相比swin能显著减小计算时间与显存占用。
# 注册新Backbone
整体遵循Swin Transformer的注册方式，并在SwinTransformer的基础上进行修改。  
使用Detectron2库进行Galerkin Transformer类函数的注册：  
```python
@BACKBONE_REGISTRY.register()
class D2GalerkinTransformer(SwinTransformer, Backbone):
```  
将添加的新Backbone文件放在`mask2former/modeling/backbone/`路径下，并在init文件中导入：  
```python
from .galerkin_transformer import D2GalerkinTransformer
```  

# 修改模型架构
为了便于使用，设计的Galerkin Transformer类继承自Swin Transformer类，并在Swin Transformer的基础上进行修改。  
## 增大特征图输出尺寸
原始的模型最大特征图输出为输入的1/4，而我们将其增大到1/2。具体修改如下：  
```python
self._out_feature_strides = {
    "res2": 2,
    "res3": 4,
    "res4": 8,
    "res5": 16,
}
```  
并且在PatchEmbed中对输入图像嵌入时由4倍修改为2倍，具体改动见配置文件。
## 使用Galerkin Attention机制
在Swin Transformer Block中将Window Attention替换为Galerkin Attention，删除原先的Window Attention的输入处理代码，具体修改如下：  
```python
#init
self.simple_attn = simple_attn(dim, num_heads)
#forward
x = self.simple_attn(x)
```  
有关我实现galerkin attention的代码可以参考另一个篇blog：[Galerkin Transformer](./galerkin_attention.md)
# 添加配置文件
## 增大特征图输出尺寸的设置
## 显存不够情况的调整