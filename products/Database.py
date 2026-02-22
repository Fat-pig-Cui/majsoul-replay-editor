from products.DatabaseClass import db

chars = db.chars
views = db.views
titles = db.titles

get_view = db.get_view
get_slot = db.get_slot
get_title = db.get_title

# 输出的文件名集合, 如: 200001_一姬.js
outfile_names = []
for i in range(len(chars)):
    outfile_names.append(str(chars[i]['id']) + '_' + chars[i]['skin'][0]['name'] + '.js')

# 两个正则匹配串
pattern_name = r'player_datas\[\d]\.nickname = \'(.*)\';'
pattern_id = r'player_datas\[\d]\.avatar_id = (.*);'

template_title = 'player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = '
template_verified = 'player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = '
template_avatar_frame = 'player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = '
template_views = 'player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = '
template_title_3P = 'player_datas[0].title = player_datas[1].title = player_datas[2].title = '
template_verified_3P = 'player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = '
template_avatar_frame_3P = 'player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = '
template_views_3P = 'player_datas[0].views = player_datas[1].views = player_datas[2].views = '


def to_title(title_id, player_num=4):
    temp = template_title
    if player_num != 4:
        temp = template_title_3P
    return '// 称号-' + get_title(title_id)['name'] + '\n' + temp + str(title_id) + ';\n'


def to_verified(verified, player_num=4):
    temp = template_verified
    if player_num != 4:
        temp = template_verified_3P
    if verified != 1:
        return '// 职业(P标)认证\n' + temp + str(verified) + ';\n'
    return '// 主播(猫爪)认证\n' + temp + str(verified) + ';\n'


def to_frame(frame_id, player_num=4):
    temp = template_avatar_frame
    if player_num != 4:
        temp = template_avatar_frame_3P
    return '// ' + get_view(frame_id)['name'] + '\n' + temp + str(frame_id) + ';\n'


def to_views(item_ids, player_num=4):
    temp = template_views
    if player_num != 4:
        temp = template_views_3P

    slots = []
    for item_id in item_ids:
        slots.append(get_slot(item_id))
    result = temp + '[\n'
    for index in range(len(slots)):
        result += ('    {slot: ' + str(slots[index]) + ', item_id: ' + str(item_ids[index]) + '}, // ' +
                   get_view(item_ids[index])['name'] + '\n')
    result += '];\n'
    return result


# 对于称号和认证的判定, 限定角色不考虑, 因为限定角色是独立的
# 认证
# 对于明显是"神明"一类的年龄未知的角色: 如
# 一姬, 辉夜姬, 福姬, 青鸾, 琳琅, 汪次郎, 七夕, 加上猫爪子认证
# 姬川响因为本身就是主播, 所以也有猫爪子认证
# 称号
# 一姬有个专属称号"一姬当千"
# 相原舞, 辉夜姬, 汪次郎, 福姬在神社或道馆中, 故有称号"神社贵宾"
# 二阶堂美树和一姬关系很好, 故有称号"喵国大护法"

# 角色专属装扮
def build_char_unique_views(player_num=4):
    n = player_num
    return {
        ### 贵人
        # 西园寺一羽: 和牌-剑吟虎啸; 立直-虎啸长风; 头像框-秋霜切玉
        200052: to_frame(305529, n) + to_views([305215, 305315, 305529], n),
        # 北原莉莉: 和牌-银链飞雪; 立直-蛇行诡道; 头像框-圣堂百合
        200061: to_frame(305537, n) + to_views([305219, 305319, 305537], n),
        # 东城玄音: 和牌-衔环结草; 立直-狐缘之绊; 头像框-丹心一寸
        200076: to_frame(305551, n) + to_views([305223, 305323, 305551], n),
        # 南枫花: 和牌-落羽涅槃; 立直-有凤来仪; 头像框-赤丹霞羽
        200095: to_frame(30550012, n) + to_views([30520006, 30530006, 30550012], n),
        # 璃央: 和牌-静伏蛰影; 立直-曲径通幽; 头像框-星点鳞光
        20000112: to_frame(30550030, n) + to_views([30520009, 30530009, 30550030], n),

        ### 联动角色
        # 轻库娘: 立直棒-乘风破浪; 和牌-海浪的馈赠; 立直-浪之声; 桌布-冲鸭！; 牌背-浪花朵朵 (没有专属UP, 都是20年同期活动UP)
        200015: to_views([305604, 305208, 305308, 305802, 305702], n),
        # 宫永照, 原村和, 天江衣, 宫永照: 立直棒-墨西哥卷饼; 和牌-龙卷雷霆; 立直-花天月地; 桌布-赛间小憩; 牌背-艾托企鹅 (天江衣还有"头像框-大小姐发带")
        200034: to_views([308003, 308001, 308002, 308004, 308005], n),
        200035: to_views([308003, 308001, 308002, 308004, 308005], n),
        200036: to_frame(305552, n) + to_views([308003, 308001, 308002, 305552, 308004, 308005], n),
        200037: to_views([308003, 308001, 308002, 308004, 308005], n),
        # 蛇喰梦子, 早乙女芽亚里, 生志摩妄, 桃喰绮罗莉: 立直棒-生死之剑; 和牌-命运之轮; 立直-纸牌花火; 桌布-无双之花; 牌背-百花境界
        200040: to_views([308008, 308006, 308007, 308009, 308010], n),
        200041: to_views([308008, 308006, 308007, 308009, 308010], n),
        200042: to_views([308008, 308006, 308007, 308009, 308010], n),
        200043: to_views([308008, 308006, 308007, 308009, 308010], n),
        # 赤木茂, 鹫巢岩: 立直棒-命悬一线; 和牌-地狱低语; 立直-幽冥之焰; 桌布-传说之夜;
        200050: to_views([308013, 308011, 308012, 308014, 308015], n),
        200051: to_views([308013, 308011, 308012, 308014, 308015], n),
        # 四宫辉夜, 白银御行, 早坂爱, 白银圭: 立直棒-恋之反省; 和牌-恋之降临; 立直-恋之箭矢; 桌布-恋之见证; 牌背-恋之背影
        200055: to_views([308018, 308016, 308017, 308019, 308020], n),
        200056: to_views([308018, 308016, 308017, 308019, 308020], n),
        200057: to_views([308018, 308016, 308017, 308019, 308020], n),
        200058: to_views([308018, 308016, 308017, 308019, 308020], n),
        # 竹井久, 福路美穗子, 新子憧, 园城寺怜: 立直棒-爱心便当; 和牌-高岭之花; 立直-未来视; 桌布-清凉假日; 牌背-摇曳彩球
        200062: to_views([308023, 308021, 308022, 308024, 308025], n),
        200063: to_views([308023, 308021, 308022, 308024, 308025], n),
        200064: to_views([308023, 308021, 308022, 308024, 308025], n),
        200065: to_views([308023, 308021, 308022, 308024, 308025], n),
        # 鲁鲁修·兰佩洛基, C.C., 枢木朱雀, 红月卡莲: 立直棒-骑士的钥匙; 和牌-绝对的命令; 立直-王者的决意; 桌布-魔女的契约; 牌背-假面的裁决
        200070: to_views([308028, 308026, 308027, 308029, 308030], n),
        200071: to_views([308028, 308026, 308027, 308029, 308030], n),
        200072: to_views([308028, 308026, 308027, 308029, 308030], n),
        200073: to_views([308028, 308026, 308027, 308029, 308030], n),
        # 伊莉雅, 美游, 小黑, 吉尔: 立直棒-红晖的魔杖; 和牌-魔力的迸发; 立直-英灵的典仪; 桌布-星夜的羁绊; 牌背-苍蓝的星辰
        200079: to_views([308033, 308031, 308032, 308034, 308035], n),
        200080: to_views([308033, 308031, 308032, 308034, 308035], n),
        200081: to_views([308033, 308031, 308032, 308034, 308035], n),
        200082: to_views([308033, 308031, 308032, 308034, 308035], n),
        # 砂狼白子, 小鸟游星野, 陆八魔爱露, 浅黄睦月: 立直棒-大蛇比纳; 和牌-冷血射击; 立直-虹色轨迹; 桌布-什亭青空; 牌背-佩洛之星
        200086: to_views([308038, 308036, 308037, 308039, 308040], n),
        200087: to_views([308038, 308036, 308037, 308039, 308040], n),
        200088: to_views([308038, 308036, 308037, 308039, 308040], n),
        200089: to_views([308038, 308036, 308037, 308039, 308040], n),
        # 浅仓透, 樋口圆香, 福丸小糸, 市川雏菜: 立直棒-动听之源; 和牌-涟漪之空; 立直-水漾星光; 桌布-闪耀吧！; 牌背-静谧夜光
        20000100: to_views([30560005, 30520007, 30530007, 30580011, 30570007], n),
        20000101: to_views([30560005, 30520007, 30530007, 30580011, 30570007], n),
        20000102: to_views([30560005, 30520007, 30530007, 30580011, 30570007], n),
        20000103: to_views([30560005, 30520007, 30530007, 30580011, 30570007], n),
        # 间桐樱, 远坂凛, Saber, Archer: 立直棒-胜利誓约; 和牌-咒层界・恶念祝祭; 立直-虚影祝祷; 桌布-剑之丘; 牌背-噬光之剑
        20000108: to_views([308043, 308041, 308042, 308044, 308045], n),
        20000109: to_views([308043, 308041, 308042, 308044, 308045], n),
        20000110: to_views([308043, 308041, 308042, 308044, 308045], n),
        20000111: to_views([308043, 308041, 308042, 308044, 308045], n),
        # 坂田银时, 桂小太郎, 高杉晋助, 坂本辰马: 立直棒-志村新八; 和牌-谢幕的Just a way; 立直-伊丽莎白; 头像框-伊丽莎白框; 桌布-骑摩托的银时; 牌背-Just a way
        20000113: to_frame(308051, n) + to_views([308048, 308046, 308047, 308051, 308049, 308050], n),
        20000114: to_frame(308051, n) + to_views([308048, 308046, 308047, 308051, 308049, 308050], n),
        20000115: to_frame(308051, n) + to_views([308048, 308046, 308047, 308051, 308049, 308050], n),
        20000116: to_frame(308051, n) + to_views([308048, 308046, 308047, 308051, 308049, 308050], n),

        ### 常驻角色
        # 一姬: 称号-一姬当千. 猫爪子认证. 立直棒-炎夏型一姬甜筒; 和牌-疾月斩; 立直-猫过留痕; 桌布-吃瓜; 牌面-猫咪雀圣
        200001: to_title(600045, n) + to_verified(1, n) + to_views([305049, 305213, 305324, 305046, 305718], n),
        # 二阶堂美树: 称号-喵国大护法. 桌布-藤萝悦色
        200002: to_title(600021, n) + to_views([305818], n),
        # 藤田佳奈: 桌布-雀魂祭一周年
        200003: to_views([305048], n),
        # 三上千织: 头像框-大小姐发带; 桌布-冲鸭！
        200004: to_frame(305552, n) + to_views([305552, 305802], n),
        # 相原舞: 称号-神社贵宾. 桌布-贺华岁
        200005: to_title(600038, n) + to_views([305804], n),
        # 抚子: 桌布-雀魂祭一周年
        200006: to_views([305048], n),
        # 八木唯: 动态桌布-星间飞行
        200007: to_views([30580007], n),
        # 九条璃雨: 动态桌布-捞金鱼
        200008: to_views([305805], n),
        # 泽尼娅: 桌布-小恶魔日记
        200009: to_views([30580008], n),
        # 卡维: 立直棒-陨石法杖; 动态桌布-紫霞海岸
        200010: to_views([305612, 305809], n),
        # 汪次郎: 称号-神社贵宾; 猫爪子认证; 桌布-中光波——————！
        200012: to_title(600038, n) + to_verified(1, n) + to_views([305810], n),
        # 明智英树: 桌布-中光波——————！
        200014: to_views([305810], n),
        # 二之宫花: 立直棒-盆栽; 头像框-豆芽; 桌布-锦鲤游; 牌背-新手报到
        200017: to_frame(305500, n) + to_views([305621, 305500, 305801, 305715], n),
        # 五十岚阳菜: 头像框-猫咪军团的身份
        200020: to_frame(305523, n) + to_views([305523], n),
        # 雏桃: 桌布-贺华岁
        200026: to_views([305804], n),
        # 辉夜姬: 称号-神社贵宾. 猫爪子认证. 桌布-锦绣余年
        200029: to_title(600038, n) + to_verified(1, n) + to_views([30580016], n),
        # 艾丽莎: 桌布-堆雪人
        200032: to_views([305803], n),
        # 福姬: 称号-神社贵宾. 猫爪子认证
        200038: to_title(600038, n) + to_verified(1, n),
        # 七夕: 猫爪子认证
        200039: to_verified(1, n),
        # 姬川响: 猫爪子认证
        200046: to_verified(1, n),
        # 柚: 立直棒-陨石法杖
        200059: to_views([305612], n),
        # 四宫冬实: 桌布-仙境茶话会
        200066: to_views([305812], n),
        # 青鸾: 猫爪子认证
        200067: to_verified(1, n),
        # 岚星: 立直棒-秘传之卷; 和牌-天地无用; 立直-毒烟玉; 牌背-手里剑
        200074: to_views([305620, 305222, 305322, 305714], n),
        # 伊芙: 和牌-虚空结界; 立直-星河入梦
        200083: to_views([30520002, 30530002], n),
        # 琳琅: 猫爪子认证
        200084: to_verified(1, n),
        # 元宵: 立直棒-青竹伞; 头像框-竹福滚滚; 桌布-清辉竹影; 牌背-翠竹墨影
        20000107: to_frame(30550022, n) + to_views([30560007, 30550022, 30580015, 30570009], n),
    }


class CharUniqueViews:
    def __init__(self):
        self.char_unique_views = build_char_unique_views()
        self.char_unique_views_3P = build_char_unique_views(3)

    def get_char_unique_views(self, char_id, player_num=4):
        if player_num == 4:
            return self.char_unique_views.get(char_id, None)
        elif player_num == 3:
            return self.char_unique_views_3P.get(char_id, None)
        else:
            return None


cuv = CharUniqueViews()
