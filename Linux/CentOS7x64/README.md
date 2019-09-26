# CentOS7x64

## 虚拟机傻瓜式安装
1. vm14
2. CentOS7x64.iso
3. 我选择了最小安装模式，什么都没有，就基础Linux
4. 设置了root和密码

## 基本系统命令
1. reboot # 重启
2. poweroff # 关机
3. shutdown now # 立即关机
4. shutdown 16:00 # 16:00关机
5. shutdown -r now # 立即重启
6. shutdown -r 16:00 # 16:00重启

## 解决Cannot find a valid baseurl for repo: base/7/x86_6
1. vi /etc/sysconfig/network-scripts/ifcfg-ess33(这里的ifcfg-e不是固定的，反正我都是cat看下ONBOOT为no的那个就改成yes)
2. 把ONBOOT改成yes
3. service network restart

## 安装图形化界面
1. yum groupinstall "X Window System" # 一路y
2. yum grouplist # 看到可用的Groups
3. yum groupinstall "GNOME Desktop" "Graphical Administration Tools" # 名称要对应上，一路y