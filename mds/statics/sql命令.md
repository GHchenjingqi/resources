### 数据库和数据表创建

#### 数据库操作：

show databases    - 显示指定数据库的所有表

create database  数据库名   - 创建数据库

drop database 数据库名    - 删除数据库

use 数据库名    - 切换到指定数据库



#### 数据表操作：

create table(字段 字段类型)    - 创建数据表：

```sql
create table user(
	id INT,
    name VARCHAR(100),
    sex INT,
    age INT,
    date DATETIME,
)
```

desc  表名   -  查看表结构都有哪些字段

**alter  table** 使用

- alter  table  表名  modify colmn 字段 字段类型     -  修改表结构：

```sql
ALTER table user MODIFY COLUMN name VARCHAR(200);
```

- alter  table  表名  rename  colmn 字段名 to 新字段名     -  修改表字段名：

```sql
ALTER table user RENAME COLUMN name to nick_name;
```

- alter  table  表名 add   colmn  字段   字段类型    - 新增字段：

```sql
ALTER table user ADD COLUMN level INT;
```

- alter  table  表名  drop  colmn  字段    - 删除字段

```SQL
ALTER table user DROP COLUMN level ;
```

- alter  table  表名  modify colmn 字段 字段类型  default 值     - 设置默认值：

```sql
ALTER table user MODIFY COLUMN level INT DEFAULT 1;
```

​    

### **数据的增删改查**

insert   into 表名 （字段1，字段2）values (值1，值2)     - 插入一条数据：

```sql
INSERT INTO user (id,name) VALUES (1,'zhansan');
```

select  *  from  表名      -  查询数据

```sql
select  *  from user;
select  id,name,sex  from user;
```

update 表名 set 字段=值  where name=值    - 更新数据

```sql
// 使用 where 条件语句 更新 张三的等级为1
UPDATE user set level = 1 where name = 'zhangsan';
// 所有用户的等级改为1  --- 非常危险
UPDATE user set level = 1 ;
```

delete from 表名 where 字段条件     - 删除指定条数据

```sql
delete from user  where  id = 1;
```



### **数据表导入导出**

导出到指定文件：

mysqldump -u  用户 -p 表名 > 文件名.sql

```
// 使用root用户 输入密码 导出user数据表 到user.sql文件中
mysqldump -u root -p user > user.sql
```

导入指定文件：

mysql -u  用户  -p  表名 < 文件名.sql

```sql
mysql -u  root  -p user < user.sql
```



### **常用语句**

#### where 条件语句

```sql
select  *  from user  where level = 1;
select  *  from user  where level > 1 and sex = 1 ;
select  *  from user  where level > 1 and sex = 1  or age > 30 ;
```

关键字 优先级：not > and > or

可以使用括号改变条件语句的优先级：

```sql
select  *  from user  where level > 1 and (sex = 1  or age > 30) ;
```

#### 关键字 in  限定指定值类型

```sql
// 查找等级 1,3,4的用户
select  *  from user  where level in (1,3,4);
```

#### 关键字  between ... and ...  指定范围

```sql
// 查询等级 1-4 的用户，包括1和4
select  *  from user  where level BETWEEN 1 and 4;
// 等价于
select  *  from user  where level >= 1 and level <= 4;
```

not可以加到任何一个条件语句中

```sql
// 不在 1到4范围内的
select  *  from user  where level NOT BETWEEN 1 and 4;
```

#### 关键字 like  模糊查询

```sql
// 查询名字带第一个是“王”字的，%代表任意字
select  *  from user  where name LIKE '王%';
// 名字中包含 “王”字的用户
select  *  from user  where name LIKE '%王%';
// _ 一个表示一个任意字：查询名字为2个字姓王的用户
select  *  from user  where name LIKE '王_';
// 查询名字为3个字姓王的用户
select  *  from user  where name LIKE '王__';
```

#### is null  判断

sql里面的null和任何都不相等，同样也不和自己相等。

```sql
// 查询性别为 null的用户
select  *  from user  where sex is null;
// 查询性别不为 null的用户
select  *  from user  where sex is not null;
```

使用等号 查找 字段为空 - 有值空白符，注意sql中 空和""不一样！

```sql
select  *  from user  where sex = "";
```

#### 使用 order by 进行排序

- desc 降序排列
- asc  升序排列

```sql
// 按等级降序排列
select  *  from user  ORDER BY level desc;
// 按等级降序排列的基础上，额外的再按 年龄降序排列
select  *  from user  ORDER BY level desc,  age;
// 按等级降序排列的基础上，额外的再按 年龄升序排列
select  *  from user  ORDER BY level desc,  age ASC;
```

#### **limit 分页查询**

- limit  n           限制查询n条记录
- limit n offset m   限制从第m+1条 开始查询n条记录，等效于低版本的 limit m,n

```sql
// 从第6条开始，获取3条记录
select  *  from user limit 3 offset 5;
```

分页公式：

```sql
select * from  表名  limit (currentPage-1)*pageSize,pageSize;
select * from  表名  limit pageSize offset (currentPage-1)*pageSize;
```

#### as 别名

字段别名

```sql
select  id as u_id ,name as u_name  from user;
```

表别名

```sql
select * from user as u where u.id = 10;
```



### 聚合函数

- AVG()  返回集合平均值
- COUNT() 返回集合数量
- MAX() 返回最大值
- MIN() 返回最小值
- SUM 求和

```sql
// 统计用户数量
select coun(*) from user ;
// 求等级的平均值
select AVG(level) from user ;
```

**分组 group by**

```sql
// 通过分组，统计性别分别对应的数量
SELECT sex, COUNT(*) FROM user GROUP BY sex;
```

**分组过滤 having**

```sql
// 分组统计不同级别的数量，仅显示统计数量大于4的
SELECT level, COUNT(level) FROM user GROUP BY level having COUNT(level) > 4;
```

**去重 distinct**

```sql
SELECT DISTINCT sex FROM use;
```

**并集查询 union**

```sql
// 等级在1~4 和 性别不为null 的并集
select  *  from user  where level BETWEEN 1 and 4
UNION
select  *  from user  where sex is not null;
```

union 默认会去重：2个条件都满足会合并成一条。如需不去重，使用 union all 。

**交集查询 intersect**

```sql
// 等级在1~4 且 性别不为null 的交集
select  *  from user  where level BETWEEN 1 and 4
INTERSECT
select  *  from user  where sex is not null;
```

**差集查询 except**

```sql
// 等级在1~4 且 性别不为0 的差集
select  *  from user  where level BETWEEN 1 and 4
EXCEPT
select  *  from user  where sex ='0';
```

### 子查询

一个查询的结果是另一个查询的条件，这个时候就用到子查询。

```sql
// 求平均等级
select  AVG(level)  from user;

// 查询 大于平均等级的数据
select  *  from user  where level > (select  AVG(level)  from user);

// 新建一个表，数据为查询小于5的数据
create table new_user select * from user where level < 5

// 将大于6的数据插入到新表中
insert into new_user select * from user where level > 6
```

exists 查询结构判断，返回查询结果的数量

```sql
// 查询等级大于100的数据是否存在，返回0，不存在
select exists (select  *  from user  where level > 100)
```

### 表关联

一个表的主键是另一个表的外键，这样就可以把2个不同表关联起来。

- 内连接：inner join   返回2个表都有的数据

```sql
select  *  from user inner join article on user.id = artical.uid
```

- 左连接：left join  返回左表所有记录，即便右表没有记录使用null填充

```
select  *  from user left join article on user.id = artical.uid
```

- 右连接：right join  返回右表所有记录，即便左表没有记录使用null填充

```
select  *  from user right join article on user.id = artical.uid
```

### 索引

索引可以大大提高MySQL的检索速度，提高运行效率。

为某个字段 创建索引

```sql
// 为user的name字段添加索引
CREATE INDEX indexName ON user(name); 
```

通过修改表结构添加索引

```sql
alter table user add index  indexName(name)
```

删除索引

```sql
DROP INDEX indexName ON user; 
```

### 视图

视图是虚拟存在的数据表。会根据查询语句保存在数据字段中，会根据表数据的修改而修改。

创建视图

```sql
// 创建一个视图：存放user表等级前10的用户
creat view top10
as
select  *  from user 
order by
level desc limit 10
```

