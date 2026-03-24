/**
 * 用户修改 json 数据
 * - tiles0-3: 各家在何切的巡目的手牌(若是第一类何切, 则不包含刚摸的牌, 若未知则置为空)
 * - lst_mopai: 第一类何切中何切巡目刚摸的牌, 若是第二类何切, 则要置为空
 * - dora: 宝牌指示牌, 从左到右
 * - li_dora: 里宝牌指示牌, 从左到右, 长度要和 dora 一致, 若未知则置为空
 * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌, 牌之间空格不影响
 *             牌有后缀g表示摸切, 无g则为手切
 *             有后缀r表示立直, 无r表示非立直
 *             g和r顺序不分先后
 * - fulu0-3: 各家的副露, 按时间顺序从左到右
 *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
 *            大明杠对家的牌的'_'放在第二个数字前
 *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
 * - first_op: 庄家第一个操作, 0: 切牌(含立直), 1: 暗杠/拔北, 2. 和牌(天和), 默认为0, 若是第二类何切则无论如何都置为0
 * - end_mode: 结束方式, 0: 荒牌流局, 1: 和牌, 2: 途中流局(若不符合途中流局条件则会报错), 默认为1
 * - hu_seat: 和牌玩家的所有 seat, 只在 end_mode 是 1 的时候有效, 若为空则自动判断谁可以和牌(若无人能和牌会报错)
 */
type RoundJson = {
    tile0: string,
    tile1: string,
    tile2: string,
    tile3: string,
    lst_mopai?: Tile,
    dora: Doras,
    li_dora?: Doras | [],
    paihe0: string,
    paihe1: string,
    paihe2: string,
    paihe3: string,
    fulu0: string[] | [],
    fulu1: string[] | [],
    fulu2: string[] | [],
    fulu3: string[] | [],
    end_mode?: 0 | 1 | 2,
    hu_seat?: Seat[] | [],
    first_op?: 0 | 1 | 2,
}