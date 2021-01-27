# Git

## Git rebase操作步骤

```
1.rebase之前需要经master分支拉到最新

2.切换分支到需要rebase的分支，这里是dev分支

3.执行git rebase master，有冲突就解决冲突，解决后直接git add . 再git rebase --continue即可

4.切换到master分支，执行git merge dev
```



## git如何在不提交本地修改的前提下，拉取远程最新代码

```
在git bash中，使用如下命令：

git stash list：查看本地的暂存区栈

（1）git stash：暂存本地修改

（2）git pull：拉取最新代码

（3）git stash pop 或者可以使用：git stash apply stash@{0}  :回到拉取之前的本地状态；此时若出现文件冲突，酌情解决即可；至于是git stash apply stash@{0} 还是git stash apply stash@{1} ，可以通过 git stash list 查看去确定。

可选 git stash clear：清空本地暂存栈信息
```



## sourceTree

https://www.liaoxuefeng.com/wiki/896043488029600/1317161920364578



## 廖雪峰总结

```bash
初始化一个Git仓库，使用git init命令。

添加文件到Git仓库，分两步：
使用命令git add <file>，注意，可反复多次使用，添加多个文件；
使用命令git commit -m <message>，完成。

要随时掌握工作区的状态，使用git status命令。
如果git status告诉你有文件被修改过，用git diff可以查看修改内容。

HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。
场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git
关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
Git支持多种协议，包括https，但ssh协议速度最快。

查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>或者git switch <name>
创建+切换分支：git checkout -b <name>或者git switch -c <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>

用git log --graph命令可以看到分支合并图。

合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场；

在master分支上修复的bug，想要合并到当前dev分支，可以用git cherry-pick <commit>命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

开发一个新feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

查看远程库信息，使用git remote -v；
本地新建的分支如果不推送到远程，对其他人就是不可见的；
从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

rebase操作可以把本地未push的分叉提交历史整理成直线；
rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

命令git tag <tagname>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
命令git tag -a <tagname> -m "blablabla..."可以指定标签信息；
命令git tag可以查看所有标签。
用命令git show <tagname>可以看到说明文字：

命令git push origin <tagname>可以推送一个本地标签；
命令git push origin --tags可以推送全部未推送过的本地标签；
命令git tag -d <tagname>可以删除一个本地标签；
命令git push origin :refs/tags/<tagname>可以删除一个远程标签。

变基拉直
git pull --rebase  --> fixed conflict --> git add . --> git rebase continue --> git push
git pull --rebase --> git push

git format-patch HEAD^
git am 0001-limit-log-function.patch
```



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
//	如果初始化了一个readme.md,就会需要先拉再推,先执行git pull --rebase origin master命令，然后再执行git push -u origin master即可上传成功(这里-u就是--set-upstream)
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

分支,一般不允许在主分支上工作
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
例如这是拉去origin仓库的主分支代码
git pull origin master

删除远程仓库的分支
git push origin --delete 远程分支的名称
```

