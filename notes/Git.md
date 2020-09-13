# Git

## git

提示命令,基本类似,-help为详细提示

```
git config -h
git checkout -h
git push -h
```

.ssh文件钥匙操作(这里主要是解决同时链接gitee和github)

```
一、公钥( SSH-Key )问题及解决方法。
//GitHub SSH-key生成命令
$ ssh-keygen -t rsa -C 'xxxxx@youdomian.com' -f ~/.ssh/github_id_rsa
//Gitee SSH-key生成命令
$ ssh-keygen -t rsa -C 'xxxxx@youdomian.com' -f ~/.ssh/gitee_id_rsa
二、不同平台共用同一个本地仓库
关联命令：
//Gitee
$ git remote add gitee git@gitee.com:xxx/xxx.git
//GitHub
$ git remote add gitHub git@github.com:xxx/xxx.git
推送命令：
//github
$ git push github master
//Gitee
$ git push gitee master
```

⚠️⚠️⚠️

```bash
基本命令,创建本地仓库: origin是在链接的时候为远程仓库取的名字,默认就是origin一般不修改
git init

链接到远程仓库:
git remote add origin 仓库地址
//	exp: git remote add origin https://git.oschina.net/hhh/GitDemo.git
//	如果出现fatal: remote origin already exists.说明你已经添加过远程仓库了，输入以下命令删除远程仓库：git remote rm origin，然后再次执行

git push -u origin master	//	初次推送到仓库需要推送原始主线程
//	如果初始化了一个readme.md,就会需要先拉再推,先执行git pull --rebase origin master命令，然后再执行git push -u origin master即可上传成功
//	如果假如还是不能拉代码的话再重启项目执行git push --set-upstream origin master

查看链接是否成功:
git remote -v

把文件提交到暂存区
提交到stage状态:
git add index.html
git add .
对已修改的文件,可以直接从工作区提交到仓库
git commit -a -m "备注信息"

反悔命令
取消暂存的文件
git reset HEAD index.html
git reset HEAD .

移除文件
同时删除工作区和仓库的文件
git rm -f index.html
删除仓库中的文件,被删除的文件自动出现为untracked状态,很好理解
git rm --cached index.css

版本回退
查看提交历史
git reflog
git reflog -2

查看完整hash值的版本时,在终端里用q终止程序
git log 
git log -2

回退版本
git reset --hard 简写的hash值   -->这里也可以使用git log 里面的完整的hash值

.gitignore
在根目录中创建 .gitignore文件,填写忽略规则
```



## 远程(GitHub)

⚠️⚠️⚠️

```bash
访问方式:
https: 不需配置,但是每次访问都需要输入账号密码
ssh: 需要额外配置,但是访问不需要输账号密码
key生成: 

将本地仓库上传到github:
git remote add origin https://git.oschina.net/hhh/GitDemo.git
第一次推送主分支
git push -u origin master

生成SSH Key命令:
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

把远程仓库克隆到本地:
git clone 远程仓库地址

分支,一般不允许在主分上工作
查看当前分支:
git branch
创建login功能分支:
git branch login
切换到login分支:
git checkout login
创建home新分支并跳转:
git checkout -b home
合并分支:
先跳到主分支master,然后再合并需要的分支的代码:
合并的时候如果存在合并冲突的情况,是需要手动处理好冲突然后提交后才能再次合并;
git checkout master
git merge login
删除分支,当合并完代码后,就可以删除这个分支:⚠️不能在当前分支销毁当前分支
git branch -d login
第一次把本地分支和远程的分支进行关联: (alians别名可以不需要)
git push -u origin login:alians
第二次推送就不需要-u了,如果取了别名就要加上别名
git push origin login (如果是在当前分支,就直接git push)

查看远程分支:
git remote show orgin
从远程仓库中把对应远程分支下载到本地仓库,名称一致:
git checkout 远程分支的名称
从远程的仓库中,把对应的远程分支下载到本地仓库,并重命名:
git checkout -b 本地分支的名称 远程仓库的名称/远程分支的名称
拉取当前仓库对应的远程仓库的代码和文件:
git pull
删除远程仓库的分支
git push origin --delete 远程分支的名称
```

