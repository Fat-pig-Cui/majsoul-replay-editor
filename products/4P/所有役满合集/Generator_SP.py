"""
    这个文件使用 file_names 里面的文件来对所有报菜名进行同步刷新
    和 Function.py 中的函数大差不差, 数据在 Database.py 中
"""
from products.Database import *
import os
import re

file_names = [
    "01_单倍役满.js",
    "02_双倍役满_非复合.js",
    "03_双倍役满_复合.js",
    "04_三倍役满_21.js",
    "05_三倍役满_111.js",
    "06_四倍役满_1111_22.js",
    "07_四倍役满_211.js",
    "08_五倍役满_221.js",
    "09_五倍役满_2111.js",
    "10_六倍役满_2211.js",
]

if not os.path.exists("./output"):
    os.makedirs("./output")

outfile_dirname = []
for i in range(len(chars)):
    if chars[i]['id'] == 200071:  # 因为文件夹不能以句点结尾, 故 C.C. 舍弃两个句点变成 CC
        outfile_dirname.append(str(chars[i]['id']) + "_CC")
    else:
        outfile_dirname.append(str(chars[i]['id']) + "_" + chars[i]['skin'][0]['name'])
    if not os.path.exists("./output/" + outfile_dirname[i]):
        os.makedirs("output/" + outfile_dirname[i])


def generator_sp():
    for file_name in file_names:
        infile = open("./" + file_name, "r", encoding='utf-8')

        tmp_nickname = []
        tmp_avatar_id = []
        for index in range(len(chars)):
            outfile = open("./output/" + outfile_dirname[index] + "/" + file_name, "w", encoding='utf-8')
            # flag_hand = True
            flag_views = True
            name_count = id_count = 0

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
                    line = line.replace(result[1], tmp_nickname[name_count])
                    name_count += 1
                if id_count < 4 and name_count == 4:
                    result = re.search(pattern_id, line)
                    if result:
                        line = line.replace(result[1], str(tmp_avatar_id[id_count]))
                        id_count += 1
                outfile.write(line)
                if flag_views and chars[index]['id'] in char_unique_views and id_count == 4 and name_count == 4:
                    outfile.write("\n" + char_unique_views[chars[index]['id']])
                    flag_views = False
            infile.seek(0)
            outfile.close()

        infile.close()
    return


generator_sp()
