# Mysql

### 操作数据库

##### 查询所有数据库：

	标准语法：
		SHOW DATABASES;
##### 查询某个数据库的创建语句：

```sql
标准语法：
		SHOW CREATE DATABASE 数据库名称;
		作用：可以查看数据库的字符集
```

##### 创建数据库：

```sql
标准语法：
		CREATE DATABASE 数据库名称;
	 如：创建数据库并判断是否存在且指定字符集：
	 CREATE DATABASE IF NOT EXISTS day01demo06 CHARACTER SET utf8;
```

##### 修改数据库的字符集：

```sql
标准语法：
		ALTER DATABASE 数据库名称 CHARACTER SET 字符集名称;
		例：-- 修改数据库db4的字符集为utf8
		ALTER DATABASE db4 CHARACTER SET utf8;
```

##### 删除数据库，判断、如果存在则删除：

```mysql
标准语法：
		DROP DATABASE IF EXISTS 数据库名称;
```

##### 使用数据库:

```mysql
标准语法：
		USE 数据库名称;
```

##### 查询当前使用的数据库:

```mysql
标准语法：
		SELECT DATABASE();
```

### 操作数据表

##### 查询所有数据表：

```mysql
标准语法：
		SHOW TABLES;
```

##### 查询表结构：

```mysql
标准语法：
		DESC 表名;
```

##### 查询数据表的字符集:

```mysql
标准语法：
		SHOW TABLE STATUS FROM 数据库名称 LIKE '表名';
```

##### 创建数据表:

```mysql
标准语法：
		CREATE TABLE 表名(
			列名 数据类型 约束,
			列名 数据类型 约束,
			...
			列名 数据类型 约束
		);
		数据类型：
		int：整数类型
		double：小数类型
		date：日期类型。包含年月日，格式yyyy-MM-dd
		datetime:日期类型。包含年月日时分秒，格式：yyyy-MM-dd HH:mm:ss
		timestamp:时间戳类型。包含年月日时分秒，格式yyyy-MM-dd HH:mm:ss,如果不给该列赋值，或赋值为null，则默认使用当前系统时间自动赋值
		varchar(长度):字符串类型
```

##### 修改表名：

```mysql
标准语法：
		ALTER TABLE 旧表名 RENAME TO 新表名;
```

##### 修改表的字符集：

```mysql
标准语法：
		ALTER TABLE 表名 CHARACTER SET 字符集名称;
```

##### 给表添加列:

```mysql
标准语法：
		ALTER TABLE 表名 ADD 列名 数据类型;
```

##### 修改表中列的数据类型:

```mysql
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型;
		
		ALTER TABLE t_menu MODIFY menu_name VARCHAR(200) COMMENT '菜单名称';
```

##### 修改表中字段编码，此编码可以存表情

```sql
标准语法：
		ALTER TABLE '表名' CHANGE '字段名' '字段名' 字段类型 CHARACTER SET 编码类型 COLLATE 排序规则 COMMENT '字段备注';

ALTER TABLE accommodation_record CHANGE accommodation_record_num accommodation_record_num varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '住宿电话';

ALTER TABLE accommodation_record CHANGE remark remark text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注'
```



##### 修改表中列的名称和数据类型:

```mysql
标准语法：
		ALTER TABLE 表名 CHANGE 旧列名 新列名 数据类型;
```

##### 删除表中的列:

```mysql
标准语法：
		ALTER TABLE 表名 DROP 列名;
```

##### 删除表:

```mysql
标准语法：
		DROP TABLE 表名;
删除表，判断、如果存在则删除：
		标准语法：
		DROP TABLE IF EXISTS 表名;
```

##### 给指定列添加数据：

```mysql
标准语法：
		INSERT INTO 表名(列名1,列名2,...) VALUES (值1,值2,...);
		给数据表添加数据时，列名和值必须一一对应，添加的值的数据类型必须和创建表时设置的类型一致，除了数字类型以外的数据类型，都必须用引号包裹，单引号或双引号都可以。
```

##### 给全部列添加数据：

```mysql
标准语法：
		INSERT INTO 表名 VALUES (值1,值2,值3,...);
```

##### 批量添加所有列数据:

```mysql
标准语法：
		INSERT INTO 表名 VALUES (值1,值2,值3,...),(值1,值2,值3,...),(值1,值2,值3,...);
```

##### 修改表数据:

```mysql
标准语法：
		UPDATE 表名 SET 列名1 = 值1,列名2 = 值2,... [where 条件];
列如-- 修改电脑的价格为1800、库存为36：
		UPDATE product SET price=1800,stock=36 WHERE NAME='电脑';		
```

##### 删除表数据：

```mysql
标准语法：
		DELETE FROM 表名 [WHERE 条件];
列如：-- 删除product表中库存为10的商品信息
		DELETE FROM product WHERE stock=10;
```

### 查询数据

##### 查询全部数据：

```mysql
标准语法：
		SELECT * FROM 表名;
```

##### 查询指定列：

```mysql
	标准语法：
		SELECT 列名1,列名2,... FROM 表名;
```

##### 去除重复查询：

```mysql
标准语法：
		SELECT DISTINCT 列名1,列名2,... FROM 表名;
```

##### 计算列的值（改变列的值，包括null）：

```mysql
标准语法：
		SELECT 列名1 运算符(+ - * /) 列名2 FROM 表名;
		
	如果某一列为null，可以进行替换
	ifnull(表达式1,表达式2)
	表达式1：想替换的列
	表达式2：想替换的值
列如：-- 查询商品名称和库存，库存数量在原有基础上加10。进行null值判断
	 -- ifnull(参数1，参数2)里面有两个参数，第一个是要进行判断null的列，第二个是要替换那个null的值
	 -- +也可以替换成想要的其他运算方法
		SELECT NAME,IFNULL(stock,0)+10,IFNULL(price,0)+1 FROM product;	
```

##### 起别名：AS可以省略，但是不建议省略

```mysql
标准语法：
		SELECT 列名1,列名2,... AS 别名 FROM 表名;
```

### 条件查询

##### 条件查询：

```mysql
标准语法：
		SELECT 列名列表 FROM 表名 WHERE 条件;
列：-- 查询库存大于20的商品信息
		SELECT * FROM product WHERE stock>20;
```

##### 某某之间：

```mysql
-- 查询品牌为华为的商品信息
SELECT * FROM product WHERE brand='华为';
-- 查询金额在4000 ~ 6000之间的商品信息
SELECT * FROM product WHERE price>4000 AND price<6000;
SELECT * FROM product WHERE price BETWEEN 4000 AND 6000;
```

##### 多个相同条件：

```mysql
-- 查询库存为14、30、23的商品信息
SELECT * FROM product WHERE stock=14 OR stock=30 OR stock=23;
SELECT * FROM product WHERE stock IN(14,30,23);
```

##### 查询库存为null：

```mysql
-- 查询库存为null的商品信息
SELECT * FROM product WHERE stock IS NULL;
```

##### 查询库存不为null：

```mysql
SELECT * FROM product WHERE stock IS NOT NULL;
```

##### 查询以某某开头模糊查询：

```mysql
-- 查询名称以小米为开头的商品信息
SELECT * FROM product WHERE NAME LIKE '小米%';
```

##### _占位符：

```mysql
-- 查询名称第二个字是为的商品信息
SELECT * FROM product WHERE NAME LIKE '_为%';
-- 查询名称为四个字符的商品信息
SELECT * FROM product WHERE NAME LIKE '____';
```

##### %任意，任意多个任意字符：

```mysql
-- 查询名称中包含电脑的商品信息
SELECT * FROM product WHERE NAME LIKE '%电脑%';
```

### 聚合函数

```mysql
	标准语法：
		SELECT 函数名(列名) FROM 表名 [WHERE 条件];
```

##### 查询总记录条数：

```mysql
SELECT COUNT(NAME) FROM product WHERE price>5000;
SELECT COUNT(*) FROM product;
```

##### 查询最高值：

```mysql
-- 获取最高价格
SELECT MAX(price) FROM product;
```

##### 查询最低值：

```mysql
-- 获取最低库存
SELECT MIN(stock) FROM product;
```

##### 查询总数（就是相加）：

```mysql
-- 获取总库存数量
SELECT SUM(stock) FROM product;
-- 获取品牌为苹果的总库存数量
SELECT SUM(stock) FROM product WHERE brand='苹果';
```

##### 查询平均值：

```mysql
-- 获取品牌为小米的平均商品价格
查平均值一定要记得去除null AVG(IFNULL(price,0))
SELECT AVG(price) FROM product WHERE brand='小米';
```

##### 求百分比

```sql
(SUM(COL2)*100/COUNT(*))*100||'%'
SELECT XB,((COUNT(XB)/(SELECT COUNT(1) FROM "edu_jzgxx"))*100||'%') AS 占比 FROM "edu_jzgxx" GROUP BY XB
```



### 排序查询

```mysql
	标准语法：
		SELECT 列名 FROM 表名 [WHERE 条件] ORDER BY 列名1 排序方式1,列名2 排序方式2;
```

##### 升序查询：

```mysql
-- 按照库存升序排序
SELECT * FROM product ORDER BY stock ASC;
SELECT * FROM product WHERE brand='小米' ORDER BY stock ASC;
```

##### 降序查询：

```mysql
-- 查询名称中包含手机的商品信息。按照金额降序排序
SELECT * FROM product WHERE NAME LIKE '%手机%' ORDER BY price DESC;
```

##### 相同：

```mysql
-- 按照金额升序排序，如果金额相同，按照库存降序排列
SELECT * FROM product ORDER BY price ASC,stock DESC;
```

### 分组查询

```mysql
标准语法：
		SELECT 列名 FROM 表名 [WHERE 条件] GROUP BY 分组列名 [HAVING 分组后条件过滤] [ORDER BY 排序列名 排序方式];
```

```mysql
-- 按照品牌分组，获取每组商品的总金额
SELECT brand,SUM(price) FROM product GROUP BY brand;
SELECT NAME,SUM(price) FROM product GROUP BY NAME;

-- 对金额大于4000元的商品，按照品牌分组,获取每组商品的总金额
SELECT brand,SUM(price) FROM product WHERE price>4000 GROUP BY brand;

-- 对金额大于4000元的商品，按照品牌分组，获取每组商品的总金额，只显示总金额大于7000元的
SELECT brand,SUM(price) AS sam FROM product WHERE price>4000 GROUP BY brand HAVING sam>7000;
SELECT brand,SUM(price) getSum FROM product WHERE price > 4000 GROUP BY brand HAVING getSum > 7000;

-- 对金额大于4000元的商品，按照品牌分组，获取每组商品的总金额，只显示总金额大于7000元的、并按照总金额的降序排列
SELECT brand,SUM(price) AS sam FROM product WHERE price>4000 GROUP BY brand HAVING sam>7000 ORDER BY sam DESC;
```

### 分页查询

```mysql
标准语法：
		SELECT 列名 FROM 表名 
		[WHERE 条件] 
		[GROUP BY 分组列名]
		[HAVING 分组后条件过滤] 
		[ORDER BY 排序列名 排序方式] 
		LIMIT 当前页数,每页显示的条数;
	
	LIMIT 当前页数,每页显示的条数;
	公式：当前页数 = (当前页数-1) * 每页显示的条数
```

```mysql
-- 每页显示3条数据

-- 第1页  当前页数=(1-1) * 3
SELECT * FROM product LIMIT 0,2;

-- 第2页  当前页数=(2-1) * 3
SELECT * FROM product LIMIT 3,2;

-- 第3页  当前页数=(3-1) * 3
SELECT * FROM product LIMIT 6,2;
```

### 约束

##### 主键约束：非空，唯一

```mysql
标准语法：
		CREATE TABLE 表名(
		    列名 数据类型 PRIMARY KEY,
		    列名 数据类型,
		    ...
		);
一般设置id为主键：在类型后面加PRIMARY KEY
id INT PRIMARY KEY,
```

##### 删除主键约束：

```mysql
-- 删除主键约束
标准语法：
		ALTER TABLE 表名 DROP PRIMARY KEY;
		ALTER TABLE student DROP PRIMARY KEY;
```

##### 建表后单独添加主键约束：

```mysql
-- 建表后单独添加主键约束
	标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型 PRIMARY KEY;
		ALTER TABLE student MODIFY id INT PRIMARY KEY;
```

##### 主键自增约束：

```mysql
标准语法：
		CREATE TABLE 表名(
		    列名 数据类型 PRIMARY KEY AUTO_INCREMENT,
		    列名 数据类型,
		    ...
		);
在主键后面加：AUTO_INCREMENT
id INT PRIMARY KEY AUTO_INCREMENT,
```

##### 删除自增约束：不会删除主键约束

```mysql
-- 删除自增约束
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型;
		ALTER TABLE student01 MODIFY id INT;
```

##### 建表后单独添加自增约束：

```mysql
-- 建表后单独添加自增约束
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型 AUTO_INCREMENT;
		ALTER TABLE student01 MODIFY id INT AUTO_INCREMENT;
```

##### 唯一约束：

```mysql
标准语法：
		CREATE TABLE 表名(
		    列名 数据类型 UNIQUE,
		    列名 数据类型,
		    ...
		);
在列名数据类型后面加：UNIQUE
age INT UNIQUE
```

##### 建表后单独添加唯一约束：

```mysql
-- 建表后单独添加唯一约束
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型 UNIQUE;
		ALTER TABLE student02 MODIFY age INT UNIQUE;
```

##### 删除唯一约束：

```mysql
-- 删除唯一约束
标准语法：
		ALTER TABLE 表名 DROP INDEX 列名;
		ALTER TABLE student02 DROP INDEX age;
```

##### 非空约束：

```mysql
标准语法：
		CREATE TABLE 表名(
		    列名 数据类型 NOT NULL,
		    列名 数据类型,
		    ...
		);
在列名数据类型后面加：NOT NULL
NAME VARCHAR(30) NOT NULL,
```

##### 建表后单独添加非空约束：

```mysql
-- 建表后单独添加非空约束
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型 NOT NULL;
		ALTER TABLE student03 MODIFY NAME VARCHAR(30) NOT NULL;
```

##### 删除非空约束：

```mysql
-- 删除非空约束
标准语法：
		ALTER TABLE 表名 MODIFY 列名 数据类型;
		ALTER TABLE student03 MODIFY NAME VARCHAR(30);
```

### 外键约束

```mysql
标准语法：
		CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主表主键列名)
		外键名：起一个外键名     主表名：要关联的表名    主表主键列名：要关联的表的主键
		外键名：自己起一个，一般是两个表的相关联的两个列相结合
```

##### 删除外键约束：

```mysql
标准语法：
		ALTER TABLE 表名 DROP FOREIGN KEY 外键名;
```

##### 建表后单独添加外键约束：

```mysql
标准语法：
		ALTER TABLE 表名 ADD CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名);
```

### 内连接查询：查询两张表有交集的部分数据

##### 显示内连接：

```mysql
标准语法：
		SELECT 列名 FROM 表名1 [INNER] JOIN 表名2 ON 关联条件;
```

```mysql
-- 查询用户信息和对应的订单信息
SELECT * FROM USER JOIN orderlist ON user.`id`=orderlist.`uid`;

-- 查询用户信息和对应的订单信息，起别名
SELECT * FROM USER u JOIN orderlist o ON u.`id`=o.`uid`;

-- 查询用户姓名，年龄。和订单编号
SELECT u.`NAME`,u.`age`,o.`number` FROM USER u JOIN orderlist o ON u.`id`=o.`uid`;
```

##### 	隐式内连接：

```mysql
标准语法：
		SELECT 列名 FROM 表名1,表名2 WHERE 关联条件;
```

### 外连接查询

##### 左外连接：

```mysql
标准语法：
		SELECT 列名 FROM 表名1 LEFT [OUTER] JOIN 表名2 ON 条件;
列：-- 查询所有用户信息，以及用户对应的订单信息
		SELECT u.*,o.`number` FROM USER u LEFT JOIN orderlist o ON u.`id`=o.`uid`;
		作用：查询左表的全部数据，以及右表中与左表有交集部分的数据
```

##### 右外连接：

```mysql
标准语法：
		SELECT 列名 FROM 表名1 RIGHT [OUTER] JOIN 表名2 ON 条件;
列：查询所有订单信息，以及订单所属的用户信息
		SELECT u.*,o.`number` FROM USER u RIGHT JOIN orderlist o ON u.`id`=o.`uid`;
		作用：查询右表的全部数据，以及左表中与右表有交集部分的数据。
```

### 子查询

##### 结果是单行单列的：

```mysql
标准语法：
		SELECT 列名 FROM 表名 WHERE 列名=(SELECT 聚合函数(列名) FROM 表名 [WHERE 条件]);
```

```mysql
-- 查询年龄最高的用户姓名
SELECT MAX(age) FROM USER;
SELECT NAME,age FROM USER WHERE age=(SELECT MAX(age) FROM USER);
```

##### 结果是多行单列的：

```mysql
标准语法：
		SELECT 列名 FROM 表名 WHERE 列名 [NOT] IN (SELECT 列名 FROM 表名 [WHERE 条件]); 
```

```mysql
-- 查询张三和李四的订单信息
SELECT id FROM USER WHERE NAME='张三' OR NAME='李四';  -- 查询张三和李四的id
SELECT number,uid FROM orderlist WHERE uid=1 OR uid=2;  -- 根据uid查询订单
SELECT number,uid FROM orderlist WHERE uid IN (SELECT id FROM USER WHERE NAME='张三' OR NAME='李四');
```

##### 结果是多行多列的：

```mysql
标准语法：
		SELECT 列名 FROM 表名 [别名],(SELECT 列名 FROM 表名 [WHERE 条件]) [别名] [WHERE 条件];
```

```mysql
-- 查询订单表中id大于4的订单信息和所属用户信息
SELECT * FROM orderlist WHERE id>4;

SELECT o.*,u.`NAME` FROM (SELECT * FROM orderlist WHERE id>4) o LEFT JOIN USER u ON o.uid=u.`id`;
```

### 自关联查询

```
就是将一张表给起两个别名，做为两张表来查询，比如查员工所属的上级
```

```mysql
SELECT：选择，查询

​			字段列表

FROM：从....起，来自

​			表名列表

WHERE：条件判断

​			条件列表

GROUP BY：分组

​			分组字段

HAVING

​			分组后的过滤条件

OPDER BY

​			排序

LIMIT

​			分页
```



### 存储过程的创建

```mysql
创建存储过程
-- 修改分隔符$
DELIMITER $

-- 标准语法
CREATE PROCEDURE 存储过程名称（参数...）
BEGIN
	sql语句;
END$
-- 修改分隔符为分号
DELIMITER;
```

### case when then

```sql
-- 满足条件则加一
select 课程号,sum(case when 成绩>=60 then 1 else 0 end) as 及格人数,
sum(case when 成绩<60 then 1 else 0 end) as 不及格人数
from score
group by 课程号

-- 多条件
SELECT     id, name, cj, (CASE WHEN cj < 60 THEN '不及格' WHEN cj BETWEEN 60 AND 90 THEN '良好' WHEN cj > 90 THEN '优秀' END) AS 状态
FROM   stud
```

### 或者或者

```sql
-- 中学教育，教师学历分析
select count(1) as 数量,XL as 学历 from "edu_jzgxx" 
where JYJD = '初中'
or JYJD = '高中'
or JYJD = '中职'
or XXJGMC like '%中学'
group by 
```

### 字符串截取

```sql
-- 高等教育_学生来源分析

select SFZH,count(1) 数量 from (
select CASE 
	WHEN SUBSTR(SFZH,0,2 )=43 THEN
		'本地'
	ELSE
		'外地'
END SFZH  from "edu_gzgzyxzxssj" 
UNION all 
select CASE 
	WHEN SUBSTR(SFZH,0,2 )=43 THEN
		'本地'
	ELSE
		'外地'
END SFZH
 from "edu_bkxsxjsj"
UNION all
SELECT CASE 
	WHEN SUBSTR(SFZH,0,2 )=43 THEN
		'本地'
	ELSE
		'外地'
END SFZH from "edu_yjsxjsj")  group by SFZH;
```

### 字符串截取Oracle and Mysql

```sql
Oracle：SUBSTR(SFZH,0,2 )=43
Mysql：left(OPLOCDISTRICT,4)
```



### 多字段分组

```sql
SELECT 年份,性别,COUNT(1) 数量 FROM (SELECT SUBSTR(FILLTIME, 0, 4) 年份,NEOSEX 性别 FROM DBC_BIRTHCERTIFICATE) GROUP BY 性别,年份
```

### 查询多少条数据

```SQL
-- Oracle查询多少条数据
SELECT * FROM 表名 WHERE rownum<=200

-- mysql查询多少条数据
SELECT * FROM 表名 limit 10
SELECT * FROM 表名 limit 0,10 
```

### Oracle 各种索引介绍

```
https://www.cnblogs.com/zszitman/p/9841105.html

```

### 日期格式截取

```sql
TO_CHAR(LICENSE_GRANT_DATE, 'YYYY')
```

### 垒加

```sql
Mysql：
	SET @s := 0;
	@s := @s+A.SUMD
Oracle：
	SUM(SUMD) OVER( PARTITION BY 1 ORDER BY A.YEAR)
```

### 字符串拼接

```sql
Mysql：
	CONCAT(COUNT(*),'人')
Oracle：
	COUNT( * ) || '人'
作用：用来添加单位
```

### 正则表达式

```sql
WHEN CFJG REGEXP '[罚款,0,元,圆,处罚,人民币]'
REGEXP '[xyz]'
```

### 字符串转数字

```sql
Mysql：
	CAST(higher_education AS  unsigned int )
Oracle：
	TO_NUMBER("higher_education")
```

### Oracle 查看建表语句

```sql
select dbms_metadata.get_ddl('TABLE','G_MUCAIZHANBI_1') from dual;

```

### 表字段字符串截取

```sql
-- 		截取字符串，从第几个索引 需要多少个  ] 此符号 从第几号索引后 第一次出现的地方 返回此符号所在的索引，需要减去3-1
SELECT SUBSTR("address", 3, (INSTR("address", ']',4,1) - 4)) FROM "58cs1"
```

### Oracle 改变日期格式

```sql
ALTER SESSION SET nls_date_language='SIMPLIFIED CHINESE';

select cast(CREATE_DATE as timestamp) from TRS_GOVMSGBOX where rownum<10
```

### 查看mysql版本号

```
SELECT VERSION()
```



1. 主键约束：PRIMARY KEY 非空，唯一，一般用于数据的唯一标识

2. 主键自增：PRIMARY KEY AUTO_INCREMENT

3. 一对一的两张表所关联的主键和外键都必须有唯一约束

4. 一对多的建表原则：在多的一方建立外键约束，此外键约束不能唯一，来关联一的一方主键

5. 多对多的建表原则：需要建立一张中间表，且中间表至少有两个外键，这两个外键分别关联两张表的主键。

6. 外连接和内连接的区别：
   - 内连接：查询两张表中有交集部分的数据
   - 左外连接：查询左表的全部数据和右表中与左表有交集部分的数据
   - 右外连接：查询右表的全部数据和左表中与右表有交集部分的数据。
   
7. ​		给数据表添加数据时，列名和值必须一一对应，添加的值的数据类型必须和创建表时设置的类型一致，除了数字类型以外的数据类型，都必须用引号包裹，单引号或双引号都可以。

8. 分组是分组后再查询条件

9. -- 带any的子查询(提示:any表示有任何一个满足就会返回true,all表示全部满足才返回true)

   带any的子查询：一个表里面的一列数据与另一个表里的一列数据进行比较，只要前一个表里的一个数据大于另一个表里的一列数据中的任意一个就代表条件成立，就返回
   
   带all的子查询：一个表里面的一列数据与另一个表里的一列数据进行比较，只要前一个表里的一个数据大于另一个表里的一列数据中的全部数据就代表条件成立，就返回。
   
10. ```sql
    小数保留多少位：
    mysqlSELECT ename,TRUNCATE(sal/30,2) '日薪' FROM emp;
    oracle:	SUBSTR(KPRQ,0, 4);
    
    
    --四舍五入
    SELECT ROUND(0.44775454545454544,2) from dual;
    --直接保留两位小数
    SELECT TRUNC(4.757545489, 2) FROM DUAL;
    ```
```
    
11. 

12. 存储过程和函数的好处：

    - 提高代码的复用性
    - 减少数据在数据库和应用服务器之间的传输，提高效率
    - 减少代码层面的业务处理
    - 区别：
      - 存储函数必须有返回值
      - 存储过程可以没有返回值

#### 触发器

可以在增删改前后触发并执行触发器中定义的sql语句

INSERT型触发器

UPDATE型触发器

DELETE型触发器

#### 事务

逻辑上的一组操作,组成这组操作的每条sql语句,要么同时成功,要么同时失败,就可以使用事务将这多条sql语句捆绑起来

列如转账

#### 事务的四大特征

- 原子性：要么同时成功，要么同时失败
- 一致性：使数据库从一个一致性状态变换到另一个一致性状态，也就是说一个事务执行之前和执行之后必须处于一个一致性状态
- 持久性：事务一旦提交,数据就会被持久化到本地
- 隔离性：一个事务在执行操作的时候,不会被其它事务所干扰

#### 事务的隔离基本和引发的问题

![image-20200808205659889](C:\Users\tangtang\AppData\Roaming\Typora\typora-user-images\image-20200808205659889.png)

![image-20200808205731046](C:\Users\tangtang\AppData\Roaming\Typora\typora-user-images\image-20200808205731046.png)

#### 锁

锁的前提还要开启事务。

共享锁：可以共同加锁查询，但是不可以修改，或者删除。

InnoDB，带索引的列，默认加的是行锁。不带索引的列，默认加的是表锁。

排他锁：不可以与其他锁共存，可以普通查询，不能修改，或者加锁查询。

乐观锁：就是一个加标记的思想。
```

### 数据库设计原则

遵循五泛式，一般采用前三泛式

第一范式：原子性，数据库表中的列不可再拆分（一个列代表一个信息，比如省县得分为两个）

第二范式：唯一主键，不存在多主键

第三范式：不要依赖非主键字段以及更深层次的依赖



