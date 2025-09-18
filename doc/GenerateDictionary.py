from datetime import datetime

from products.DatabaseClass import db

chars = db.chars
views = db.views
titles = db.titles

get_slot = db.get_slot
get_view = db.get_view
get_title = db.get_title

# ---

filename = '字典_template.md'
tmp_filename = '0_字典.md'

infile = open(filename, 'r', encoding='utf-8')
outfile = open(tmp_filename, 'w', encoding='utf-8')

pattern1 = 'Updated YYYY/MM/DD'

replaced_string = '##########'

table_cnt = 0

table_head = [
    '| avatar_id | 角色 | 服饰 |\n|:---------:|:--:|:--:|\n',  # avatar_id (头像)
    '| charid | 角色 |\n|:------:|:--:|\n',  # charid (角色)
    '| id | 名称 |\n|:--:|:--:|\n',  # 立直棒 0
    '| id | 名称 |\n|:--:|:--:|\n',  # 和牌特效 1
    '| id | 名称 |\n|:--:|:--:|\n',  # 立直特效 2
    '| id | 名称 |\n|:--:|:--:|\n',  # 鸣牌指示 10
    '| id | 名称 | 备注 |\n|:--:|:--:|:--:|\n',  # 手的样式 4
    '| id | 名称 |\n|:--:|:--:|\n',  # 立直音乐 4
    '| id | 名称 |\n|:--:|:--:|\n',  # 头像框 5
    '| id | 名称 |\n|:--:|:--:|\n',  # 桌布 6
    '| id | 名称 |\n|:--:|:--:|\n',  # 牌背 7
    '| id | 名称 |\n|:--:|:--:|\n',  # 牌面 13
    '| id | 名称 |\n|:--:|:--:|\n',  # 大厅背景 8
    '| id | 名称 |\n|:--:|:--:|\n',  # 大厅音乐 9
    '| id | 名称 |\n|:--:|:--:|\n',  # 对局音乐 9
    '| title_id | 名称 | 备注 |\n|:--:|:--:|:--:|\n',  # 称号
]


def print_db():
    if table_cnt == 0:  # avatar_id
        outfile.write('|400000|默认皮肤(女)|\n|400001|默认皮肤(男)|\n')
        for char in chars:
            for skin in char['skin']:
                char_name = char['skin'][0]['name']
                skin_id = skin['id']

                skin_name = skin['name']
                if skin_id % 100 == 1:
                    skin_name = '初始'
                elif skin_id % 100 == 2:
                    skin_name = '契约'
                outfile.write('|{}|{}|{}|\n'.format(skin_id, char_name, skin_name))
    elif table_cnt == 1:  # charid
        for char in chars:
            char_id = char['id']
            char_name = char['skin'][0]['name']
            outfile.write('|{}|{}|\n'.format(char_id, char_name))
    elif table_cnt == 2:  # 立直棒
        for item in get_slot(0):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 3:  # 和牌特效
        for item in get_slot(1):
            if item['name'].strip() != '(已过期)':
                outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 4:  # 立直特效
        for item in get_slot(2):
            if item['name'].strip() != '(已过期)':
                outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 5:  # 鸣牌指示
        for item in get_slot(10):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 6:  # 手的样式
        for item in get_slot(3):
            item_id = item['id']
            if item_id == 309991:
                outfile.write('|{}|{}|穆萨使用|\n'.format(item_id, item['name']))
            elif item_id == 309992:
                outfile.write('|{}|{}|汉娜使用|\n'.format(item_id, item['name']))
            elif item_id == 309994:
                outfile.write('|{}|{}|除了生志摩妄|\n'.format(item_id, item['name']))
            elif item_id == 309995:
                outfile.write('|{}|{}|藤本绮罗, 莎拉, 小黑|\n'.format(item_id, item['name']))
            elif item_id == 309996:
                outfile.write('|{}|{}|约瑟夫, A-37|\n'.format(item_id, item['name']))
            elif item_id == 30990001:
                outfile.write('|{}|{}|偶像大师联动角色使用|\n'.format(item_id, item['name']))
            else:
                outfile.write('|{}|{}|\n'.format(item_id, item['name']))
    elif table_cnt == 7:  # 立直音乐
        for item in get_slot(4):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 8:  # 头像框
        for item in get_slot(5):
            name = item['name']
            name = name.replace(' ', ' ')
            outfile.write('|{}|{}|\n'.format(item['id'], name))
    elif table_cnt == 9:  # 桌布
        for item in get_slot(6):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 10:  # 牌背
        for item in get_slot(7):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 11:  # 牌面
        for item in get_slot(13):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 12:  # 大厅背景
        for item in get_slot(8):
            outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 13:  # 大厅音乐
        for item in get_slot(9):
            id_str = str(item['id'])
            if id_str[3] == '0':  # 大厅音乐
                outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 14:  # 大厅/对局音乐
        for item in get_slot(9):
            id_str = str(item['id'])
            if id_str[3] != '0':  # 对局音乐
                outfile.write('|{}|{}|\n'.format(item['id'], item['name']))
    elif table_cnt == 15:  # 称号
        for title in titles:
            title_id = title['id']
            name = title['name']
            name = name.replace(' ', ' ')
            if name == '':
                continue
            if title_id == 600004 or title_id == 600016:
                outfile.write('|{}|{}|四麻|\n'.format(title_id, name))
            elif title_id == 600022 or title_id == 600023:
                outfile.write('|{}|{}|三麻|\n'.format(title_id, name))
            else:
                outfile.write('|{}|{}|\n'.format(title_id, name))


for line in infile:
    if line.strip() == pattern1:
        outfile.write('Updated ' + datetime.now().strftime('%Y/%m/%d') + '\n')
        continue
    if line.strip() == replaced_string:
        outfile.write(table_head[table_cnt])
        print_db()
        table_cnt += 1
        continue
    else:
        outfile.write(line)

infile.close()
outfile.close()
