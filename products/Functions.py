"""
    与 Database.py 对应的操作函数
    不要直接运行这个文件, 这个文件只提供函数供其他文件调用
"""
from products.Database import *
import os
import re


# 这里 player_num 参数表示对局玩家数, 默认是四麻, 三麻参数填3就行
def generator(player_num=4):
    # 作为模版的文件, 文件名是 template.js
    infile = open("./template.js", "r", encoding='utf-8')
    if not os.path.exists("./output"):
        os.makedirs("./output")

    for index in range(len(chars)):
        outfile = open("./output/" + outfile_names[index], "w", encoding='utf-8')
        # flag_hand = True
        flag_views = True
        name_count = id_count = 0

        """ tmp_nickname: 一桌角色所用的皮肤
        东起用的是契约皮肤, 其他三/两个用的是最近的三/两个皮肤, 没有皮肤用原皮顶上, 简单的说就是
        四麻: 
            若总共有至少四个皮肤, 则按照 "契约, 氪金皮1, 氪金皮2, 氪金皮3" 座次排列, 三个氪金皮按照时间先后顺序且都是最近出的
            若总共有只有三个皮肤, 则按照 "契约, 原皮, 氪金皮1, 氪金皮2" 排列
            若总共只有两个皮肤, 则按照 "契约, 原皮, 契约, 氪金皮" 排列
            若总共只有一个皮肤, 则按照 "契约, 原皮, 契约, 原皮" 排列
        三麻: 
            若总共有至少三个皮肤, 则按照 "契约, 氪金皮1, 氪金皮2" 排列, 两个氪金皮按照时间先后顺序且都是最近出的
            若总共只有两个皮肤, 则按照 "契约, 原皮, 氪金皮" 排列
            若总共只有一个皮肤, 则按照 "契约, 原皮, 契约" 排列
        名称方面原皮用角色名称, 契约皮用"角色名-契约"的形式, 氪金皮用皮肤名称(如一姬的"绮春歌")
        """
        tmp_nickname = []
        tmp_avatar_id = []
        if player_num == 4:
            if len(chars[index]['skin']) == 1 or len(chars[index]['skin']) == 2:
                for j in [0, 1, 2, 3]:
                    tmp_nickname.append(chars[index]['skin'][(j + 1) % len(chars[index]['skin'])]['name'])
                    tmp_avatar_id.append(chars[index]['skin'][(j + 1) % len(chars[index]['skin'])]['id'])
            if len(chars[index]['skin']) == 3 or len(chars[index]['skin']) == 4:
                tmp_nickname.append(chars[index]['skin'][1]['name'])
                tmp_nickname.append(chars[index]['skin'][0]['name'])
                tmp_nickname.append(chars[index]['skin'][len(chars[index]['skin']) - 2]['name'])
                tmp_nickname.append(chars[index]['skin'][len(chars[index]['skin']) - 1]['name'])

                tmp_avatar_id.append(chars[index]['skin'][1]['id'])
                tmp_avatar_id.append(chars[index]['skin'][0]['id'])
                tmp_avatar_id.append(chars[index]['skin'][len(chars[index]['skin']) - 2]['id'])
                tmp_avatar_id.append(chars[index]['skin'][len(chars[index]['skin']) - 1]['id'])
            if len(chars[index]['skin']) >= 5:
                tmp_nickname.append(chars[index]['skin'][1]['name'])
                tmp_avatar_id.append(chars[index]['skin'][1]['id'])
                for j in [-3, -2, -1]:
                    tmp_nickname.append(chars[index]['skin'][j]['name'])
                    tmp_avatar_id.append(chars[index]['skin'][j]['id'])

            for line in infile:
                result = re.search(pattern_name, line)
                if name_count < 4 and result:
                    # 匹配成功, result[0] 是全体, result[1] 是 nickname
                    line = line.replace(result[1], tmp_nickname[name_count])
                    name_count += 1
                if id_count < 4 and name_count == 4:
                    result = re.search(pattern_id, line)
                    if result:
                        # 匹配成功, result[0] 是全体, result[1] 是 avatar_id
                        line = line.replace(result[1], str(tmp_avatar_id[id_count]))
                        id_count += 1
                outfile.write(line)
                if flag_views and chars[index]['id'] in char_unique_views and id_count == 4 and name_count == 4:
                    outfile.write("\n" + char_unique_views[chars[index]['id']])
                    flag_views = False

        elif player_num == 3:
            if len(chars[index]['skin']) == 1 or len(chars[index]['skin']) == 2:
                for j in [0, 1, 2]:
                    tmp_nickname.append(chars[index]['skin'][(j + 1) % len(chars[index]['skin'])]['name'])
                    tmp_avatar_id.append(chars[index]['skin'][(j + 1) % len(chars[index]['skin'])]['id'])
            if len(chars[index]['skin']) == 3:
                tmp_nickname.append(chars[index]['skin'][1]['name'])
                tmp_nickname.append(chars[index]['skin'][0]['name'])
                tmp_nickname.append(chars[index]['skin'][2]['name'])

                tmp_avatar_id.append(chars[index]['skin'][1]['id'])
                tmp_avatar_id.append(chars[index]['skin'][0]['id'])
                tmp_avatar_id.append(chars[index]['skin'][2]['id'])
            if len(chars[index]['skin']) >= 4:
                tmp_nickname.append(chars[index]['skin'][1]['name'])
                tmp_avatar_id.append(chars[index]['skin'][1]['id'])
                for j in [-2, -1]:
                    tmp_nickname.append(chars[index]['skin'][j]['name'])
                    tmp_avatar_id.append(chars[index]['skin'][j]['id'])

            for line in infile:
                result = re.search(pattern_name, line)
                if name_count < 3 and result:
                    # 匹配成功, result[0] 是全体, result[1] 是 nickname
                    line = line.replace(result[1], tmp_nickname[name_count])
                    name_count += 1
                if id_count < 3 and name_count == 3:
                    result = re.search(pattern_id, line)
                    if result:
                        # 匹配成功, result[0] 是全体, result[1] 是 avatar_id
                        line = line.replace(result[1], str(tmp_avatar_id[id_count]))
                        id_count += 1
                outfile.write(line)
                if flag_views and chars[index]['id'] in char_unique_views_3P and id_count == 3 and name_count == 3:
                    outfile.write("\n" + char_unique_views_3P[chars[index]['id']])
                    flag_views = False
        infile.seek(0)
        outfile.close()

    infile.close()
    return
