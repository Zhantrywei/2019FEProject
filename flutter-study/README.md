# Flutter：从入门到实践

## 环境搭建
1. git clone -b stable https://github.com/flutter/flutter.git
2. 配置环境变量
    1. PUB_HOSTED_URL：https://pub.flutter-io.cn
    2. FLUTTER_STORAGE_BASE_URL：https://storage.flutter-io.cn
    3. Path加入git clone下来目录文件夹路径的bin
    4. flutter doctor 无效，win10系统用flutter.bat doctor
    5. flutter 1.9.1 - Dart 2.5.0
    6. vscode plugins: Dart & Flutter

## 遇到的问题
1. git status 中文乱码：git config --global core.quotepath false
2. flutter doctor 无效，改用flutter.bat doctor
3. flutter.bat doctor 下载Dart失败：设置Background Intelligent Transfer Service 服务为手动，重启，开启该服务