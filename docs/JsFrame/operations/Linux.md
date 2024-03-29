# Linux 操作系统

## 系统目录结构

![ssh](./imgs/linux001.jpg)

- home 用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的
- lib 类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。
- var 习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
- tmp 临时文件，重启时会更新。
- bin 这个目录存放着最经常使用的命令。
- etc 这个目录用来存放所有的系统管理所需要的配置文件和子目录。
- usr 类似于 windows 下的 program files 目录。
... 
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

### vim

> Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。简单的来说， vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。 vim 则可以说是程序开发者的一项很好用的工具。

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

## shell

- Shell 是命令解释器，用于解释用户对操作系统的操作
- CentOS 7 默认使用的 Shell 是 bash
