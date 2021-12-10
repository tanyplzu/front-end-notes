---
sidebarDepth: 0
---

# 50 道 SQL 练习题

转载自[超经典 SQL 练习题，做完这些你的ＳＱＬ就过关了](https://blog.csdn.net/flycat296/article/details/63681089)

创建测试数据

学生表 Student

```sql
create table Student(SId varchar(10),Sname varchar(10),Sage datetime,Ssex varchar(10));
insert into Student values('01' , '赵雷' , '1990-01-01' , '男');
insert into Student values('02' , '钱电' , '1990-12-21' , '男');
insert into Student values('03' , '孙风' , '1990-05-20' , '男');
insert into Student values('04' , '李云' , '1990-08-06' , '男');
insert into Student values('05' , '周梅' , '1991-12-01' , '女');
insert into Student values('06' , '吴兰' , '1992-03-01' , '女');
insert into Student values('07' , '郑竹' , '1989-07-01' , '女');
insert into Student values('09' , '张三' , '2017-12-20' , '女');
insert into Student values('10' , '李四' , '2017-12-25' , '女');
insert into Student values('11' , '李四' , '2017-12-30' , '女');
insert into Student values('12' , '赵六' , '2017-01-01' , '女');
insert into Student values('13' , '孙七' , '2018-01-01' , '女');
```

科目表 Course

```sql
create table Course(CId varchar(10),Cname nvarchar(10),TId varchar(10));
insert into Course values('01' , '语文' , '02');
insert into Course values('02' , '数学' , '01');
insert into Course values('03' , '英语' , '03');
```

教师表 Teacher

```sql
create table Teacher(TId varchar(10),Tname varchar(10));
insert into Teacher values('01' , '张三');
insert into Teacher values('02' , '李四');
insert into Teacher values('03' , '王五');
```

成绩表 SC

```sql
create table SC(SId varchar(10),CId varchar(10),score decimal(18,1));
insert into SC values('01' , '01' , 80);
insert into SC values('01' , '02' , 90);
insert into SC values('01' , '03' , 99);
insert into SC values('02' , '01' , 70);
insert into SC values('02' , '02' , 60);
insert into SC values('02' , '03' , 80);
insert into SC values('03' , '01' , 80);
insert into SC values('03' , '02' , 80);
insert into SC values('03' , '03' , 80);
insert into SC values('04' , '01' , 50);
insert into SC values('04' , '02' , 30);
insert into SC values('04' , '03' , 20);
insert into SC values('05' , '01' , 76);
insert into SC values('05' , '02' , 87);
insert into SC values('06' , '01' , 31);
insert into SC values('06' , '03' , 34);
insert into SC values('07' , '02' , 89);
insert into SC values('07' , '03' , 98);
```

1.查询" 01 "课程比" 02 "课程成绩高的学生的信息及课程分数

```sql
SELECT
	*
FROM
	( SELECT SId, score FROM sc WHERE sc.CId = '01' ) AS t1,
	( SELECT SId, score FROM sc WHERE sc.CId = '02' ) AS t2
WHERE
	t1.SId = t2.SId
	AND t1.score > t2.score
```

1.1 查询同时存在" 01 "课程和" 02 "课程的情况

```sql
SELECT
	*
FROM
	( SELECT SId, score FROM sc WHERE sc.CId = '01' ) AS t1,
	( SELECT SId, score FROM sc WHERE sc.CId = '02' ) AS t2
WHERE
	t1.SId = t2.SId
```

1.2 查询存在" 01 "课程但可能不存在" 02 "课程的情况(不存在时显示为 null )

```sql
SELECT
	*
FROM
	( SELECT SId, score FROM sc WHERE sc.CId = '01' ) AS t1
	LEFT JOIN ( SELECT SId, score FROM sc WHERE sc.CId = '02' ) AS t2 ON t1.SId = t2.SId
```

1.3 查询不存在" 01 "课程但存在" 02 "课程的情况

```sql
SELECT
	*
FROM
	sc
WHERE
	sc.SId NOT IN ( SELECT SId FROM sc WHERE sc.CId = '01' )
	AND sc.CId = '02'
```

2. 查询平均成绩大于等于 60 分的同学的学生编号和学生姓名和平均成绩

```sql
select student.*,t1.avgscore
from student inner JOIN(
select sc.SId ,AVG(sc.score)as avgscore
from sc
GROUP BY sc.SId
HAVING AVG(sc.score)>=60)as t1 on student.SId=t1.SId
```

3. 查询在 SC 表存在成绩的学生信息

```sql
SELECT DISTINCT
	student.*
FROM
	student,
	sc
WHERE
	student.SId = sc.SId
```

4.查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩(没成绩的显示为 null)

```sql
SELECT
	student.SId,
	student.Sname,
	t1.sumscore,
	t1.coursecount
FROM
	student,(
	SELECT
		SC.SId,
		sum( sc.score ) AS sumscore,
		count( sc.CId ) AS coursecount
	FROM
		sc
	GROUP BY
		sc.SId
	) AS t1
WHERE
	student.SId = t1.SId
```

4.1 查有成绩的学生信息

```sql
SELECT
	*
FROM
	student
WHERE
	EXISTS (
	SELECT
		*
	FROM
		sc
WHERE
	student.SId = sc.SId)
```

5. 查询「李」姓老师的数量

```sql
SELECT
	count(*)
FROM
	teacher
WHERE
	teacher.Tname LIKE '李%'
```

6. 查询学过「张三」老师授课的同学的信息

```sql
SELECT
	student.*
FROM
	teacher,
	course,
	student,
	sc
WHERE
	teacher.Tname = '张三'
	AND teacher.TId = course.TId
	AND course.CId = sc.CId
	AND sc.SId = student.SId
```

7. 查询没有学全所有课程的同学的信息

- 解法 1

```sql
SELECT
	student.*
FROM
	student
WHERE
	student.SId NOT IN (
	SELECT
		sc.SId
	FROM
		sc
	GROUP BY
		sc.SId
	HAVING
		count(*)=(
		SELECT
			count( CId )
		FROM
		course
	))
```

- 解法 2

```sql
SELECT DISTINCT
	student.*
FROM
	( SELECT student.SId, course.CId FROM student, course ) AS t1
	LEFT JOIN ( SELECT sc.SId, sc.CId FROM sc ) AS t2 ON t1.SId = t2.SId
	AND t1.CId = t2.CId,
	student
WHERE
	t2.SId IS NULL
	AND t1.SId = student.SId
```

利用[笛卡尔积](https://www.zhihu.com/search?q=笛卡尔积&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A32137597})可以把什么课都没选的同学查询出来

8. 查询至少有一门课与学号为" 01 "的同学所学相同的同学的信息

```sql
SELECT DISTINCT
	student.*
FROM
	sc,
	student
WHERE
	sc.CId IN ( SELECT CId FROM sc WHERE sc.SId = '01' )
	AND sc.SId = student.SId
```

9.查询和" 01 "号的同学学习的课程完全相同的其他同学的信息

```sql
SELECT
	*
FROM
	student
WHERE
	student.SId NOT IN (
	SELECT
		t1.SId
	FROM
		( SELECT student.SId, t.CId FROM student,( SELECT sc.CId FROM sc WHERE sc.SId = '01' ) AS t ) AS t1
		LEFT JOIN sc ON t1.SId = sc.SId
		AND t1.CId = sc.CId
	WHERE
		sc.CId IS NULL
	)
	AND student.SId != '01'
```

10.查询没学过"张三"老师讲授的任一门课程的学生姓名

```sql
SELECT
	*
FROM
	student
WHERE
	student.SId NOT IN (
	SELECT
		student.SId
	FROM
		student
		LEFT JOIN sc ON student.SId = sc.SId
	WHERE
		EXISTS (
		SELECT
			*
		FROM
			teacher,
			course
		WHERE
			teacher.Tname = '张三'
			AND teacher.TId = course.TId
		AND course.CId = sc.CId
	))
```

11.查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩

```sql
SELECT
	student.SId,
	student.Sname,
	avg( sc.score )
FROM
	student,
	sc
WHERE
	student.SId = sc.SId
	AND sc.score < 60
GROUP BY
	sc.SId
HAVING
	count(*)>=2
```

次数有问题

12. 检索" 01 "课程分数小于 60，按分数降序排列的学生信息

```sql
SELECT
	student.*
FROM
	student,
	sc
WHERE
	sc.CId = '01'
	AND sc.score < 60
	AND student.SId = sc.SId
```

13. 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

```sql
SELECT
	sc.SId,
	sc.CId,
	sc.score,
	t1.avgscore
FROM
	sc
	LEFT JOIN ( SELECT sc.SId, avg( sc.score ) AS avgscore FROM sc GROUP BY sc.SId ) AS t1 ON sc.SId = t1.SId
ORDER BY
	t1.avgscore DESC
```

14. 查询各科成绩最高分、最低分和平均分：

以如下形式显示：课程 ID，课程 name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率

及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90

要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列

```sql

```

15. 按各科成绩进行排序，并显示排名， Score 重复时保留名次空缺

```sql
SELECT
	sc.CId,
	max( sc.score ) AS 最高分,
	min( sc.score ) AS 最低分,
	AVG( sc.score ) AS 平均分,
	count(*) AS 选修人数,
	sum( CASE WHEN sc.score >= 60 THEN 1 ELSE 0 END )/ count(*) AS 及格率,
	sum( CASE WHEN sc.score >= 70 AND sc.score < 80 THEN 1 ELSE 0 END )/ count(*) AS 中等率,
	sum( CASE WHEN sc.score >= 80 AND sc.score < 90 AND sc.score < 80 THEN 1 ELSE 0 END )/ count(*) AS 优良率,
	sum( CASE WHEN sc.score >= 90 THEN 1 ELSE 0 END )/ count(*) AS 优秀率
FROM
	sc
GROUP BY
	sc.CId
ORDER BY
	count(*) DESC,
	sc.CId ASC
```

15.1 按各科成绩进行排序，并显示排名， Score 重复时合并名次

```sql
SELECT
	sc.SId,
	sc.CId,
CASE

		WHEN @pre_parent_code = sc.CId THEN
		(
		CASE

				WHEN @prefontscore = sc.score THEN
				@curRank
				WHEN @prefontscore := sc.score THEN
				@curRank := @curRank + 1
			END
			)
			WHEN @prefontscore := sc.score THEN
			@curRank := 1
		END AS rank,
		sc.score,
		@pre_parent_code := sc.CId
	FROM
		( SELECT @curRank := 0, @pre_parent_code := '', @prefontscore := NULL ) AS t,
		sc
	ORDER BY
	sc.CId,
	sc.score DESC
```

16. 查询学生的总成绩，并进行排名，总分重复时保留名次空缺

```sql
SELECT
	t1.*,
	@currank := @currank + 1 AS rank
FROM
	( SELECT sc.SId, sum( score ) FROM sc GROUP BY sc.SId ORDER BY sum( score ) DESC ) AS t1,(
	SELECT
	@currank := 0
	) AS t
```

16.1 查询学生的总成绩，并进行排名，总分重复时不保留名次空缺

```sql
SELECT
	t1.*,
CASE

		WHEN @fontscore = t1.sumscore THEN
		@currank
		WHEN @fontscore := t1.sumscore THEN
		@currank := @currank + 1
	END AS rank
FROM
	( SELECT sc.SId, sum( score ) AS sumscore FROM sc GROUP BY sc.SId ORDER BY sum( score ) DESC ) AS t1,(
	SELECT
		@currank := 0,
	@fontscore := NULL
	) AS t
```

17. 统计各科成绩各分数段人数：课程编号，课程名称，[100-85]，[85-70]，[70-60]，[60-0] 及所占百分比

```sql

```

18. 查询各科成绩前三名的记录

思路：前三名转化为若大于此成绩的数量少于 3 即为前三名。

```sql
SELECT
	course.CId,
	course.Cname,
	t1.*
FROM
	course
	LEFT JOIN (
	SELECT
		sc.CId,
		CONCAT( sum( CASE WHEN sc.score >= 85 AND sc.score <= 100 THEN 1 ELSE 0 END )/ count(*)* 100, '%' ) AS '[85-100]',
		CONCAT( sum( CASE WHEN sc.score >= 70 AND sc.score < 85 THEN 1 ELSE 0 END )/ count(*)* 100, '%' ) AS '[70-85)',
		CONCAT( sum( CASE WHEN sc.score >= 60 AND sc.score < 70 THEN 1 ELSE 0 END )/ count(*)* 100, '%' ) AS '[60-70)',
		CONCAT( sum( CASE WHEN sc.score >= 0 AND sc.score < 60 THEN 1 ELSE 0 END )/ count(*)* 100, '%' ) AS '[0-60)'
	FROM
		sc
	GROUP BY
	sc.CId
	) AS t1 ON course.CId = t1.CId
```

19. 查询每门课程被选修的学生数

```sql
SELECT
	sc.CId,
	count(*)
FROM
	sc
GROUP BY
	sc.CId
```

20. 查询出只选修两门课程的学生学号和姓名

```sql
SELECT
	student.SId,
	student.Sname
FROM
	sc,
	student
WHERE
	student.SId = sc.SId
GROUP BY
	sc.SId
HAVING
	count(*)=2
```

21.查询男生、女生人数

```sql
SELECT
	student.Ssex,
	count(*) AS 人数
FROM
	student
GROUP BY
	student.Ssex
```

22. 查询名字中含有「风」字的学生信息

```sql
SELECT
	*
FROM
	student
WHERE
	student.Sname LIKE '%风%'
```

23.查询同名同性学生名单，并统计同名人数

```sql
SELECT
	*
FROM
	student
	LEFT JOIN ( SELECT Sname, Ssex, COUNT(*)同名人数 FROM Student GROUP BY Sname, Ssex ) AS t1 ON student.Sname = t1.Sname
	AND student.Ssex = t1.Ssex
WHERE
	t1.同名人数 >1
```

24.查询 1990 年出生的学生名单

```sql
SELECT
	*
FROM
	student
WHERE
	YEAR ( student.Sage )= 1990
```

25.查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列

```sql
SELECT
	sc.CId,
	AVG( sc.score )
FROM
	sc
GROUP BY
	sc.CId
ORDER BY
	AVG( sc.score ) DESC,
	sc.CId ASC
```

26.查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩

```sql
SELECT
	student.SId,
	student.Sname,
	t1.avgscore
FROM
	student
	INNER JOIN (
	SELECT
		sc.SId,
		AVG( sc.score ) AS avgscore
	FROM
		sc
	GROUP BY
		sc.SId
	HAVING
	AVG( sc.score )> 85
	) AS t1 ON student.SId = t1.SId
```

27. 查询课程名称为「数学」，且分数低于 60 的学生姓名和分数

```sql
SELECT
	student.Sname,
	t1.score
FROM
	student
	INNER JOIN (
	SELECT
		sc.SId,
		sc.score
	FROM
		sc,
		course
	WHERE
		sc.CId = course.CId
		AND course.Cname = '数学'
	AND sc.score < 60
	) AS t1 ON student.SId = t1.SId
```

28. 查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）

```sql
SELECT
	student.SId,
	sc.CId,
	sc.score
FROM
	Student
	LEFT JOIN sc ON student.SId = sc.SId
```

29. 查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数

```sql
SELECT
	student.Sname,
	course.Cname,
	sc.score
FROM
	student,
	sc,
	course
WHERE
	sc.score >= 70
	AND student.SId = sc.SId
	AND sc.CId = course.CId
```

30.查询存在不及格的课程

```sql
SELECT DISTINCT
	sc.CId
FROM
	sc
WHERE
	sc.score < 60
```

31.查询课程编号为 01 且课程成绩在 80 分以上的学生的学号和姓名

```sql
SELECT
	student.SId,
	student.Sname
FROM
	student,
	sc
WHERE
	sc.CId = '01'
	AND student.SId = sc.SId
	AND sc.score > 80
```

32. 求每门课程的学生人数

```sql
SELECT
	sc.CId,
	count(*) AS 学生人数
FROM
	sc
GROUP BY
	sc.CId
```

33. 成绩不重复，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	student.*,
	sc.score
FROM
	student,
	course,
	teacher,
	sc
WHERE
	course.CId = sc.CId
	AND course.TId = teacher.TId
	AND teacher.Tname = '张三'
	AND student.SId = sc.SId
	LIMIT 1
```

34. 成绩有重复的情况下，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	student.*,
	t1.score
FROM
	student
	INNER JOIN (
	SELECT
		sc.SId,
		sc.score,
	CASE

			WHEN @fontage = sc.score THEN
			@rank
			WHEN @fontage := sc.score THEN
			@rank := @rank + 1
		END AS rank
	FROM
		course,
		teacher,
		sc,(
		SELECT
			@fontage := NULL,
			@rank := 0
		) AS t
	WHERE
		course.CId = sc.CId
		AND course.TId = teacher.TId
		AND teacher.Tname = '张三'
	ORDER BY
		sc.score DESC
	) AS t1 ON student.SId = t1.SId
WHERE
	t1.rank =1
```

35. 查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩

```sql
SELECT
	*
FROM
	sc AS t1
WHERE
	EXISTS (
	SELECT
		*
	FROM
		sc AS t2
	WHERE
		t1.SId = t2.SId
		AND t1.CId != t2.CId
	AND t1.score = t2.score
	)
```

36.查询每门功成绩最好的前两名

```sql
SELECT
	*
FROM
	sc AS t1
WHERE
	( SELECT count(*) FROM sc AS t2 WHERE t1.CId = t2.CId AND t2.score > t1.score )< 2
ORDER BY
	t1.CId
```

37.统计每门课程的学生选修人数（超过 5 人的课程才统计）

```sql
SELECT
	sc.CId AS 课程编号,
	count(*) AS 选修人数
FROM
	sc
GROUP BY
	sc.CId
HAVING
	count(*)>5
```

38.检索至少选修两门课程的学生学号

```sql
SELECT DISTINCT
	t1.SId
FROM
	sc AS t1
WHERE
	( SELECT count(* ) FROM sc WHERE t1.SId = sc.SId )>=3
```

39. 查询选修了全部课程的学生信息

```sql
SELECT
	student.*
FROM
	sc,
	student
WHERE
	sc.SId = student.SId
GROUP BY
	sc.SId
HAVING
	count(*) = (
	SELECT DISTINCT
		count(*)
	FROM
	course
	)
```

40.查询各学生的年龄，只按年份来算

```sql
SELECT
	student.SId AS 学生编号,
	student.Sname AS 学生姓名,
	TIMESTAMPDIFF(
		YEAR,
		student.Sage,
	CURDATE()) AS 学生年龄
FROM
	student
```

41. 按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一

```sql
SELECT
	student.SId AS 学生编号,
	student.Sname AS 学生姓名,
	TIMESTAMPDIFF(
		YEAR,
		student.Sage,
	CURDATE()) AS 学生年龄
FROM
	student
```

42.查询本周过生日的学生

```sql
SELECT
	*
FROM
	student
WHERE
	YEARWEEK( student.Sage )= YEARWEEK(
	CURDATE())
```

43. 查询下周过生日的学生

```sql
SELECT
	*
FROM
	student
WHERE
	YEARWEEK( student.Sage )= CONCAT(
		YEAR (
		CURDATE()),
	WEEK (
	CURDATE())+ 1)
```

44.查询本月过生日的学生

```sql
SELECT
	*
FROM
	student
WHERE
	EXTRACT( YEAR_MONTH FROM student.Sage )= EXTRACT(
	YEAR_MONTH
FROM
	CURDATE())
```

45.查询下月过生日的学生

```sql
SELECT
	*
FROM
	student
WHERE
	EXTRACT( YEAR_MONTH FROM student.Sage )= EXTRACT(
	YEAR_MONTH
FROM
	DATE_ADD( CURDATE(), INTERVAL 1 MONTH ))
```
