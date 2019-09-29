# C/C++

## 环境搭建
1. Win10
    1. [MinGW](http://www.mingw.org/) - 官网右边aside有Downloads进入下载
    2. 一键式安装，最后进入组件勾选（为了编译 C/C++ 程序，所以只需安装 mingw-developer-toolkit、mingw32-base、mingw32-gcc-g++、msys-base 这4个组件即可）
    3. 安装成功配置环境变量MinGW安装目录的bin
    4. gcc --verions 或者 gcc -v
    > 1. [MinGW安装教程——著名C/C++编译器GCC的Windows版本](https://www.cnblogs.com/ggg-327931457/p/9694401.html)
    > 2. [MinGW-w64安装教程——著名C/C++编译器GCC的Windows版本](https://www.cnblogs.com/ggg-327931457/p/9694516.html)
2. Linux - Ubuntu18
    ```bash
        sudo apt update
        sudo apt install build-essential # 该命令将安装一堆新包，包括gcc，g ++和make
        gcc --version # Ubuntu 18.04存储库中可用的默认GCC版本是7.4.0

        # 安装多个GCC版本
        sudo apt install software-properties-common 
        sudo add-apt-repository ppa:ubuntu-toolchain-r/test
        # 将ubuntu-toolchain-r/test PPA添加到您的系统，认的Ubuntu存储库包括几个GCC版本，从5.x.x到8.x.x. 最新版本的GCC是9.1.0，可从Ubuntu Toolchain PPA获得

        sudo apt install gcc-7 g++-7 gcc-8 g++-8 gcc-9 g++-9 # 安装gcc & g++版本
        
        # 设置优先级
        sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 90 --slave /usr/bin/g++ g++ /usr/bin/g++-9
        sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 80 --slave /usr/bin/g++ g++ /usr/bin/g++-8
        sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 70 --slave /usr/bin/g++ g++ /usr/bin/g++-7

        # 修改默认版本
        sudo update-alternatives --config gcc
    ```
    > [如何在Ubuntu 18.04上安装GCC编译器](https://www.linuxidc.com/Linux/2019-06/159059.htm)


## 视频教程
1. [慕课网C免费教程](https://www.imooc.com/course/list?c=c)
2. [慕课网C++免费教程](https://www.imooc.com/course/list?c=cplusplus)

## 编译文件
1. *.c - 源代码
2. *.h - 头文件
3. *.i - 预编译(把伪指令转换为实际指令)
    ```bash
        gcc -E hello.c -o hello.i
    ```
4. *.s - 编译(把预编译好的文件转化为汇编语言)
    ```bash
        gcc -S hello.c -o hello.s
        # 或者
        gcc -S hello.i -o hello.s
    ```
5. *.o - 汇编(二进制文件)
    ```bash
        gcc -c hello.c -o hello.o
        # 或者
        gcc -c hello.i -o hello.o
        # 或者
        gcc -c hello.s -o hello.o
    ```
    ```
6. *.exe | *.out - 链接(可执行文件)
    ```bash
        gcc hello.c -o hello.exe    # windows默认:链接成其他文件需要对应的软件打开，如.mp4之类的，但是打开可能是失败的
        gcc hello.c -o hello.out    # linux默认:好像连接成其他的也可以执行
    ```

## make - Makefile文件