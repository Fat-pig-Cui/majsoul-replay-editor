"""
    这个文件使用 template.js 来对所有报菜名进行同步刷新
    函数在 Functions.py 中, 数据在 Database.py 中
"""
from products.Functions import generator

generator(3)
