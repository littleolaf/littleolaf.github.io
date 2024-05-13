---
title: Synapse for Mask2Former
published: 2024-05-13
description: '在Detectron2中注册Synapse数据集并使用'
image: ''
tags: [毕设, MeGaFormer]
category: '实践学习'
draft: false 
---
# 目录
- [目录](#目录)
- [对Mapper，evaluation文件适应性修改](#对mapperevaluation文件适应性修改)
  - [对Mask文件读取方式修改：](#对mask文件读取方式修改)
    - [mask\_former\_semantic\_dataset\_mapper.py](#mask_former_semantic_dataset_mapperpy)
    - [detectron2/data/dataset\_mapper.py/def \_\_call\_\_():](#detectron2datadataset_mapperpydef-__call__)
    - [detectron2/evaluation/sem\_seg\_evaluation.py/def process():](#detectron2evaluationsem_seg_evaluationpydef-process)
  - [对Image文件读取方式修改：](#对image文件读取方式修改)
    - [detectron2/data/detection\_utils.py/def read\_image():](#detectron2datadetection_utilspydef-read_image)
- [Synapse数据集的处理](#synapse数据集的处理)
  - [train训练集处理](#train训练集处理)
  - [test测试集处理](#test测试集处理)

# 对Mapper，evaluation文件适应性修改
Synapse数据集包含npz格式文件与h5格式文件，原始代码使用PIL库的Image函数进行图像提取，与Synapse数据集不兼容。  
为了使Mask2Former与MegaFormer能够使用Synapse数据集进行训练，需要对Mapper，evaluation文件进行适应性修改。  
共对四个文件做出修改：  
## 对Mask文件读取方式修改：
### mask_former_semantic_dataset_mapper.py
在mapper中关于数据集加载中的调用函数（def \_\_call_\_）中，修改mask的读取方式，添加对npz格式文件的读取方法：
```python
if "sem_seg_file_name" in dataset_dict:
    ground_truth = dataset_dict.pop("sem_seg_file_name")
    if ground_truth.endswith('.npz'):
        gt_binary_array = np.load(ground_truth)["arr_0"]
    else:  
        gt_image = Image.open(ground_truth).convert('L')
        gt_binary_array = np.asarray(gt_image)
    sem_seg_gt = gt_binary_array.astype("double")
```  

### detectron2/data/dataset_mapper.py/def \_\_call_\_():
同理，修改默认的dataset_mapper.py中的mask读取方式，添加对npz格式文件的读取方法，该文件涉及test数据集验证：
```python
# USER: Remove if you don't do semantic/panoptic segmentation.
"""修改读取gt的方式以适应npz文件"""
# TODO: 修改读取gt的方式以适应npz文件
if "sem_seg_file_name" in dataset_dict:
    ground_truth = dataset_dict.pop("sem_seg_file_name")
    if ground_truth.endswith('.npz'):
        sem_seg_gt = np.load(ground_truth)["arr_0"]
    else:
        sem_seg_gt = utils.read_image(ground_truth, "L").squeeze(2)
else:
    sem_seg_gt = None
```  

### detectron2/evaluation/sem_seg_evaluation.py/def process():
在测试集上验证模型时会使用此文件，需要对应地修改读取mask文件的方式，添加对npz格式文件的读取方法：  
```python
"""修改读取mask文件方式转为灰度图读取"""
# gt = self.sem_seg_loading_fn(gt_filename, dtype=int)

# 为synapse作npz文件读取修改
if gt_filename.endswith('.npz'):
    gt_binary_array = np.load(gt_filename)["arr_0"]
else:
    # 以下是为了kvasir进行修改读取mask文件方式转为灰度图读取的部分   
    gt_image = Image.open(gt_filename).convert('L')
    gt_binary_array = np.asarray(gt_image)
gt = gt_binary_array.astype(np.uint8)
```  
## 对Image文件读取方式修改：
### detectron2/data/detection_utils.py/def read_image():
在读取image时，修改读取方式，添加对npz格式文件的读取方法：  
对输入文件名进行判断，执行不同处理方法。
```python
if file_name.endswith('.npz'):
    image = np.load(file_name)["arr_0"]
    # 将输入图像转为三通道图像
    image = np.tile(image[:, :, np.newaxis], (1, 1, 3))
    return image
else:
    with PathManager.open(file_name, "rb") as f:
        image = Image.open(f)
        image = _apply_exif_orientation(image)
        return convert_PIL_to_numpy(image, format)
```  
# Synapse数据集的处理
## train训练集处理
将训练集中的image与label数组拆分存放。  
！！！待更新
## test测试集处理
将h5文件拆分为image与label，再将image与label数组按照第一个维度拆分成一个个切片存放。  
！！！待更新