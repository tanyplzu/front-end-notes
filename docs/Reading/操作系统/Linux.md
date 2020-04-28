# Linux 操作系统

## 系统操作

### ls

```sh
ls /
man ls
# 显示当前mulv文件权限
ls -l
# 显示隐藏文件
ls -a
```

### cd

更改当前的操作⽬录

- `cd /path/to/….` 绝对路径
- `cd ./path/to/…` 相对路径
- `cd ../path/to/…` 相对路径

### 建⽴/删除⽬录

- mkdir 建⽴⽬录
- rmdir 删除空⽬录
- rm -r 删除⾮空⽬录

### 复制⽂件

- cp 复制⽂件和⽬录
  - cp [选项] ⽂件路径
  - cp [选项] ⽂件… 路径
- 常⽤参数
  - -r 复制⽬录
  - -p 保留⽤户、权限、时间等⽂件属性
  - -a 等同于 -dpR

### rm 删除⽂件

- 常⽤参数
  - -r 删除⽬录（包括⽬录下的所有⽂件）
  - -f 删除⽂件不进⾏提示
- 注意： rm 命令可以删除多个⽬录，需谨慎使⽤

## mac 下的文件

- Applications
- Users
- cores
- home
- sbin
- var
- Library
- Volumes
- dev
- opt
- tmp 临时文件，重启时会更新
- System
- bin
- etc
- private
- usr
