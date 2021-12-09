---
sidebarDepth: 0
---

# 查询表数据

## 基本查询语句

- 条件查询:

```sql
SELECT cust_id,cust_name FROM customers WHERE cust_id=10086
```

其中过滤条件操作符有：`=`，`<>`，`!=`，`<`，`<=`，`>`，`>=`，`BETWEEN AND`，`IS NULL`.

- 为某一列信息去重:

```sql
SELECT DISTINCT cust_name FROM customers
```

- 限制单列查询结果的行数：

```sql
SELECT cust_name FROM customers LIMIT 5
```

LIMIT 后跟一个数值，表示从第 0 行开始取，共取 5 行数据。

- 排序：

```sql
SELECT cust_id,cust_name FROM customers ORDER BY cust_id DESC, cust_name
```

- IN 操作符用来指定条件范围:

```sql
SELECT cust_id, cust_name FROM customers WHERE cust_id IN (1000,2000)
```

范围中的每个条件都可以进行匹配，另外，NOT 操作符可以和 IN 操作符配合使用，用于表示检索出不符合条件的所有数据。

- LIKE 操作符用来表明模糊查询

与之配合使用的通配符有`**%**`

`%`: 表示任何字符出现任何次数  
`*`: 表示只能匹配一个字符

```sql
SELECT cust_id,cust_name FROM customers WHERE cust_name LIKE '%happy%'
```

- 使用分组查询并可以满足一定的分组过滤条件 GROUP BY HAVING。如检索总计订单金额大于等于 50 的订单号和订单总金额，并按总金额进行排序：

```sql
SELECT order_num, SUM(quantity*item_price)
AS order_total FROM orderitems
GROUP BY order_num
HAVING SUM(quantity*item_price)>=50
ORDER BY order_total
```

- WHERE 和 HAVING 的比较。

WHERE 是行级过滤，而 HAVING 是组级过滤。被 WHERE 过滤掉的数据不会出现在分组中。WHERE 中通配符以及多个 WHERE 子句的连接同样适用于 HAVING 子句。

- GROUP BY 的使用注意事项：
  （1）GROUP BY 子句中可以嵌套分组（即通过多个列进行分组 GROUP BY cust_id, cust_name），但是进行数据汇总时，是在最后规定的分组上进行；  
  （2）GROUP BY 子句中列出的每个列都必须是检索列或者是有效的表达式。  
  （3）如果有 NULL 值，将值 NULL 作为一个分组进行返回，如果有多行 NULL 值，它们将分为一组

- 嵌套其他查询中的查询，称之为子查询。

执行过程由里向外，里层查询结果作为外层查询的条件：

```sql
SELECT cust_id FROM orders WHERE order_num
IN (SELECT order_num FROM orderitems WHERE prod_id = 'happy')
```

- [50 道 SQL 练习题](https://zhuanlan.zhihu.com/p/32137597)
