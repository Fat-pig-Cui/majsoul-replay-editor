from products.DatabaseRAW import *


class DatabaseClass:
    def __init__(self):
        self.chars = []
        char_num = 0
        for char in CHARACTER:
            self.chars.append({'id': CHARACTER[char]['id'], 'skin': []})
            char_num += 1
            for skin in SKIN:
                if SKIN[skin]['character_id'] == CHARACTER[char]['id']:
                    self.chars[char_num - 1]['skin'].append({'id': SKIN[skin]['id'], 'name': SKIN[skin]['name_chs']})
                    if SKIN[skin]['name_chs'] == '契约':
                        origin_name = self.chars[char_num - 1]['skin'][0]['name']
                        index = len(self.chars[char_num - 1]['skin']) - 1
                        # 名字过长修剪
                        if origin_name == '早乙女芽亚里':
                            self.chars[char_num - 1]['skin'][index]['name'] = '早乙女-契约'
                        elif origin_name == '鲁鲁修·兰佩洛基':
                            self.chars[char_num - 1]['skin'][index]['name'] = '鲁鲁修-契约'
                        else:
                            self.chars[char_num - 1]['skin'][index]['name'] = origin_name + '-契约'

        self.views = []
        # 立直棒, 和牌特效, 立直特效, 手的样式, 立直音乐, 头像框,
        # 桌布, 牌背, 大厅背景, 大厅/对局音乐, 鸣牌指示, 加载图, 牌面
        # 11 是称号, 但在 ITEM 中不全
        slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]
        for slot in slots:
            self.views.append({'slot': slot, 'item': []})
        for item in ITEM:
            category = ITEM[item]['category']
            item_slot = ITEM[item]['type']
            if category == 5 and item_slot in slots or category == 8 and item_slot == 12:
                index = 0
                while index < len(self.views) and self.views[index]['slot'] != item_slot:
                    index += 1
                self.views[index]['item'].append({'id': ITEM[item]['id'], 'name': ITEM[item]['name_chs']})

        self.titles = []
        for title in TITLE:
            self.titles.append({'id': TITLE[title]['id'], 'name': TITLE[title]['name_chs']})

        return

    def get_char(self, char_id):
        for char in self.chars:
            if char['id'] == char_id:
                return char
        return None

    def get_skin(self, skin_id):
        for char in self.chars:
            for skin in char['skin']:
                if skin['id'] == skin_id:
                    return skin
        return None

    def get_view(self, view_id):
        for slot in self.views:
            for item in slot['item']:
                if item['id'] == view_id:
                    return item
        return None

    def get_slot(self, slot_id):
        for slot in self.views:
            if slot['slot'] == slot_id:
                return slot['item']
        return None

    def get_title(self, title_id):
        for title in self.titles:
            if title['id'] == title_id:
                return title
        return None


db = DatabaseClass()
# for i in db.chars:
#     print(i)
# for i in db.views:
#     print(i)
# for i in db.titles:
#     print(i)
