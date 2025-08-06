/**
 * @file: main.js - main script of Majsoul Replay Editor
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

'use strict';

// 除了常量, 全局变量的初始化全在 clearproject, gamebegin, roundbegin, init 函数中

/**
 * 玩家的个人信息, 有效长度为玩家数, 不超过4
 * @type {{nickname: string, avatar_id: number, title: number|undefined, avatar_frame: number|undefined, verified: number|undefined, views: {slot: number, item_id: number}[]|undefined}[]}
 */
let player_datas;
/**
 * 对局的模式
 * @type {{category: number, meta: {mode_id: number}, mode: {mode: number, detail_rule: {}}}}
 */
let config;
/**
 * 玩家的起手, 赋值的类型是 string 或 string[]
 * @type {string}
 */
let tiles0, tiles1, tiles2, tiles3;
/**
 * 牌山, 会随着牌局的进行逐渐减少
 * @type {string[]}
 */
let paishan;
/**
 * 玩家的实时点数, 长度为玩家数, 不超过4
 * @type {number[]}
 */
let scores;
/**
 * 玩家的切牌集合和摸牌集合, 用户输入侧, 有效长度为玩家数, 不超过4
 * @type {string[]}
 */
let qiepaiset, mopaiset;
/**
 * 龙之目玉模式拥有目玉的玩家队列
 * @type {string}
 */
let muyuseats;

// 初始化必要变量
function clearproject() {
    if (view && view.DesktopMgr && view.DesktopMgr.Inst && view.DesktopMgr.Inst.active)
        throw new Error('请退出当前牌谱后再载入自制牌谱');

    gamebegin_once = true;
    player_datas = [
        {nickname: '电脑0', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑1', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑2', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑3', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
    ];
    config = {
        category: 1,
        meta: {mode_id: 0},
        mode: {
            mode: 1,
            detail_rule: {
            }
        }
    };
    tiles0 = tiles1 = tiles2 = tiles3 = muyuseats = '';
    paishan = [];
    chang = ju = ben = liqibang = lianzhuangcnt = 0;
    juc = -1;
    playertiles = [[], [], [], []];
    qiepaiset = ['', '', '', ''];
    mopaiset = ['', '', '', ''];
    editdata = {
        actions: [],
        xun: [],
        players: players,
        config: config,
        player_datas: player_datas,
    };
}

/**
 * 随机牌山函数, 最后会将随机牌山赋给全局变量 paishan, paishan.join('') 就是牌谱界面显示的牌山字符串代码
 * @example
 * // 以四个三索开头, 东风为第一张岭上牌的牌山, 可以简写, 中间的空格不影响
 * randompaishan('33s3s 3s', '1z')
 * @param {string} [pshead] - 牌山开头
 * @param {string} [psback] - 牌山结尾
 */
function randompaishan(pshead = '', psback = '') {
    function randomcmp() {
        return Math.random() - 0.5;
    }

    if (editdata.actions.length === 0 && gamebegin_once)
        gamebegin();

    let tiles = [separate(tiles0), separate(tiles1), separate(tiles2), separate(tiles3)];
    let para_tiles = [separate(pshead), separate(psback)];

    // 检查手牌数量是否合规
    for (let i = 0; i < playercnt; i++) {
        let tiles_len = tiles[i].length;
        if (i === ju) {
            if (tiles_len > Qin_tiles_num || tiles_len < Qin_tiles_num && !is_buquanshoupai())
                console.warn(roundinfo() + `tiles${i} 作为庄家牌数量不对: ${tiles_len}`);
            else if (tiles_len < Qin_tiles_num && is_buquanshoupai())
                console.log(roundinfo() + `tiles${i} 作为庄家牌数量不够: ${tiles_len}, 自动补全至14张`);
        } else {
            if (tiles_len > Xian_tiles_num || tiles_len < Xian_tiles_num && !is_buquanshoupai())
                console.warn(roundinfo() + `tiles${i} 作为闲家牌数量不对: ${tiles_len}`);
            else if (tiles_len < Xian_tiles_num && is_buquanshoupai())
                console.log(roundinfo() + `tiles${i} 作为闲家牌数量不够: ${tiles_len}, 自动补全至13张`);
        }
    }

    let aka_cnt = 3;
    if (typeof config.mode.detail_rule.dora_count == 'number')
        aka_cnt = config.mode.detail_rule.dora_count;
    else if (config.mode.mode >= 10 && config.mode.mode < 19)
        aka_cnt = 2;
    else if (config.mode.mode >= 20 && config.mode.mode <= 29)
        aka_cnt = 1;

    let cnt = [];
    cnt[Cbd] = 0;
    for (let i = C1m; i <= C7z; i++)
        cnt[i] = 4;
    for (let i = C0m; i <= C0s; i++)
        cnt[i] = 0;

    if (playercnt === 2) { // 二麻
        for (let i = C1p + 1; i <= C9p - 1; i++)
            cnt[i] = 0;
        for (let i = C1s + 1; i <= C9s - 1; i++)
            cnt[i] = 0;
        cnt[C5m] = 4 - aka_cnt;
        cnt[C0m] = aka_cnt;
    } else if (playercnt === 3) { // 三麻
        for (let i = C1m + 1; i <= C9m - 1; i++)
            cnt[i] = 0;
        cnt[C5p] = cnt[C5s] = 4 - Math.floor(aka_cnt / 2);
        cnt[C0p] = cnt[C0s] = Math.floor(aka_cnt / 2);
    } else { // 四麻
        if (aka_cnt === 4) {
            cnt[C5m] = cnt[C5s] = 3;
            cnt[C5p] = cnt[C0p] = 2;
            cnt[C0m] = cnt[C0s] = 1;
        } else {
            cnt[C5m] = cnt[C5p] = cnt[C5s] = 4 - Math.floor(aka_cnt / 3);
            cnt[C0m] = cnt[C0p] = cnt[C0s] = Math.floor(aka_cnt / 3);
        }
    }
    if (is_chuanma()) {
        for (let i = C1z; i <= C7z; i++)
            cnt[i] = 0;
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
        cnt[C5m] = cnt[C5p] = cnt[C5s] = 4;
    }
    if (is_guobiao()) {
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
        cnt[C5m] = cnt[C5p] = cnt[C5s] = 4;
        // 用 Huapai 当做国标的花牌
        if (is_guobiao_huapai() && typeof editfunction == 'function')
            cnt[tiletoint(Huapai, true)] = 8;
    }

    // 明镜之战
    let cnt2 = [];
    cnt2[Cbd] = 0;
    for (let i = C1m; i <= C7z; i++)
        cnt2[i] = 3;
    if (is_mingjing()) {
        for (let i = C1m; i <= C7z; i++)
            cnt[i] = 1;
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
    }

    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[Cbd] = 4;

    // 减去玩家起手
    for (let j in tiles)
        for (let i in tiles[j])
            if (tiles[j][i].length > 2 && tiles[j][i][2] === SPT_Suf && is_mingjing())
                cnt2[tiletoint(tiles[j][i])]--;
            else
                cnt[tiletoint(tiles[j][i], true)]--;

    if (config.mode.detail_rule._mopai_paishan && mopaiset[ju].length !== 0) {
        para_tiles[0] = [];
        for (let i = 0; i < playercnt; i++)
            dealtiles[i] = separate(mopaiset[i]);
        while (dealtiles[0].length > 0 || dealtiles[1].length > 0 || dealtiles[2].length > 0 || dealtiles[3].length > 0)
            for (let i = ju + 1; i < ju + 1 + playercnt; i++)
                if (dealtiles[i % playercnt].length > 0)
                    para_tiles[0].push(dealtiles[i % playercnt].shift());
    }

    // 减去两个参数的牌
    let sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
    for (let j in para_tiles)
        for (let i in para_tiles[j])
            if (sp_type.indexOf(para_tiles[j][i][0]) === -1)
                if (para_tiles[j][i].length === 3 && para_tiles[j][i][2] === SPT_Suf)
                    cnt2[tiletoint(para_tiles[j][i], true)]--;
                else
                    cnt[tiletoint(para_tiles[j][i], true)]--;

    let remain_tiles = [];
    for (let i = C1m; i <= C0s; i++) {
        for (let j = 0; j < cnt[i]; j++)
            remain_tiles.push(inttotile(i));
        if (is_mingjing())
            for (let j = 0; j < cnt2[i]; j++)
                remain_tiles.push(inttotile(i, true));
    }

    remain_tiles.sort(randomcmp);

    for (let i in para_tiles)
        randomize(para_tiles[i]);

    for (let i in cnt) {
        let full_num = 4, have_fault = false;
        if (cnt[i] < 0) {
            have_fault = true;
            if (is_mingjing())
                full_num = 1;
        }
        if (have_fault)
            console.warn(roundinfo() + `paishan 不合规: ${full_num - cnt[i]} 个 ${inttotile(i)}`);
        if (cnt2[i] < 0)
            console.warn(roundinfo() + `paishan 不合规: ${3 - cnt2[i]} 个 ${inttotile(i, true)}`);
    }

    paishan = para_tiles[0].concat(remain_tiles, para_tiles[1]);

    function randomize(tls) {
        for (let i in tls)
            if (tls[i][0] === 'H' || tls[i][0] === 'T') {
                let index = remain_tiles.findIndex(tile => judgetile(tile, tls[i][0]));
                if (index > -1)
                    tls[i] = remain_tiles.splice(index, 1)[0];
                else
                    tls[i] = remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === 'Y' || tls[i][0] === 'D' || tls[i][0] === 'M' || tls[i][0] === 'P' || tls[i][0] === 'S') {
                let index = remain_tiles.findIndex(tile => judgetile(tile, tls[i][0]));
                if (index > -1)
                    tls[i] = remain_tiles.splice(index, 1)[0];
                else
                    tls[i] = remain_tiles.pop();
            }
        // 补全玩家起手
        if (config.mode.detail_rule._buquanshoupai) {
            for (let i = 0; i < playercnt; i++) {
                while (tiles[i].length < Xian_tiles_num)
                    tiles[i].push(remain_tiles.pop());
                if (i === ju && tiles[i].length < Qin_tiles_num)
                    tiles[i].push(remain_tiles.pop());
            }
            tiles0 = tiles[0].join('');
            tiles1 = tiles[1].join('');
            tiles2 = tiles[2].join('');
            tiles3 = tiles[3].join('');
        }
        for (let i in tls)
            if (tls[i][0] === '.')
                tls[i] = remain_tiles.pop();
    }
}

// 开局, 数据初始化
function roundbegin() {
    if (editdata.actions.length === 0 && gamebegin_once)
        gamebegin();

    init();
    benchangbang = ben;

    if (is_dora3())
        doracnt.cnt = doracnt.licnt = 3;

    // 计算各玩家开局的听牌, 庄家开局听的牌无法显示
    let lastile = playertiles[ju].pop();
    let tingpai = [];
    for (let seat = 0; seat < playercnt; seat++) {
        let tingpais1 = calctingpai(seat);
        if (tingpais1.length > 0)
            tingpai.push({seat: seat, tingpais1: tingpais1});
    }
    playertiles[ju].push(lastile);

    let left_cnt = paishan.length - 14;
    if (playercnt === 2)
        left_cnt = paishan.length - 18;
    else if (is_chuanma() || is_guobiao())
        left_cnt = paishan.length;

    let opens = [];
    if (is_peipaimingpai() || is_openhand())
        for (let seat = 0; seat < playercnt; seat++) {
            let ret = {seat: seat, tiles: [], count: []};
            let tiles = playertiles[seat], cnt = [];
            for (let i = C1m; i <= C0s; i++)
                cnt[i] = 0;
            for (let i in tiles)
                cnt[tiletoint(tiles[i], true)]++;
            mingpais[seat] = cnt;
            for (let i = C1m; i <= C0s; i++) {
                if (cnt[i] === 0)
                    continue;
                ret.tiles.push(inttotile(i));
                ret.count.push(cnt[i]);
            }
            opens.push(ret);
        }

    if (is_muyu())
        update_muyu(true);

    addNewRound(left_cnt, md5(paishan.join('')), tingpai, opens);

    /**
     * md5 计算函数, 与牌谱回放关系不大
         * @param {string} string - 要计算md5的字符串
     * @returns {string} md5 string
     */
    function md5(string) {
        function md5_RotateLeft(lValue, iShiftBits) {
            return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
        }

        function md5_AddUnsigned(lX, lY) {
            let lX4, lY4, lX8, lY8, lResult;
            lX8 = lX & 0x80000000;
            lY8 = lY & 0x80000000;
            lX4 = lX & 0x40000000;
            lY4 = lY & 0x40000000;
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4)
                return lResult ^ 0x80000000 ^ lX8 ^ lY8;
            if (lX4 | lY4) {
                if (lResult & 0x40000000)
                    return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
                else
                    return lResult ^ 0x40000000 ^ lX8 ^ lY8;
            } else
                return lResult ^ lX8 ^ lY8;
        }

        function md5_F(x, y, z) {
            return x & y | ~x & z;
        }

        function md5_G(x, y, z) {
            return x & z | y & ~z;
        }

        function md5_H(x, y, z) {
            return x ^ y ^ z;
        }

        function md5_I(x, y, z) {
            return y ^ (x | ~z);
        }

        function md5_FF(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }

        function md5_GG(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }

        function md5_HH(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }

        function md5_II(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }

        function md5_ConvertToWordArray(string) {
            let lWordCount;
            let lMessageLength = string.length;
            let lNumberOfWords_temp1 = lMessageLength + 8;
            let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
            let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            let lWordArray = Array(lNumberOfWords - 1);
            let lBytePosition = 0;
            let lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - lByteCount % 4) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
                lByteCount++;
            }
            lWordCount = (lByteCount - lByteCount % 4) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        function md5_WordToHex(lValue) {
            let WordToHexValue = '',
                WordToHexValue_temp = '',
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = lValue >>> lCount * 8 & 255;
                WordToHexValue_temp = '0' + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substring(WordToHexValue_temp.length - 2);
            }
            return WordToHexValue;
        }

        function md5_Utf8Encode(string) {
            string = string.replace(/\r\n/g, '\n');
            let utftext = '';
            for (let n in string) {
                let c = string.charCodeAt(parseInt(n));
                if (c < 128)
                    utftext += String.fromCharCode(c);
                else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode(c >> 6 | 192);
                    utftext += String.fromCharCode(c & 63 | 128);
                } else {
                    utftext += String.fromCharCode(c >> 12 | 224);
                    utftext += String.fromCharCode(c >> 6 & 63 | 128);
                    utftext += String.fromCharCode(c & 63 | 128);
                }
            }
            return utftext;
        }

        let x;
        let k, AA, BB, CC, DD, a, b, c, d;
        let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        let S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = md5_Utf8Encode(string);
        x = md5_ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = md5_FF(a, b, c, d, x[k], S11, 0xD76AA478);
            d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = md5_GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
            a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = md5_HH(d, a, b, c, x[k], S32, 0xEAA127FA);
            c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = md5_II(a, b, c, d, x[k], S41, 0xF4292244);
            d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = md5_AddUnsigned(a, AA);
            b = md5_AddUnsigned(b, BB);
            c = md5_AddUnsigned(c, CC);
            d = md5_AddUnsigned(d, DD);
        }
        return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
    }
}

// ==========================================

/**
 * 摸牌, 参数顺序可以不一致
 * @param {number} [seat] - 摸牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 摸的牌, 没有此参数时将根据 dealtiles 或牌山确定
 * @param {number[]} [index] - 占星之战: 牌候选池中选择的牌位置, 后面会变为 number 类型
 */
function mopai(seat, tile, index) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [seat, tile, index];
        for (let i in mat)
            if (typeof mat[i] == 'string')
                x.tile = mat[i];
            else if (typeof mat[i] == 'number')
                x.seat = mat[i];
            else if (mat[i] instanceof Array && typeof mat[i][0] == 'number')
                x.index = mat[i][0];
        return [x.seat, x.tile, x.index];
    }

    let zhanxing_index;
    let lstaction = getlstaction();
    let liqi = null;

    [seat, tile, zhanxing_index] = preprocess();

    lstaction_completion();

    if (seat === undefined) {
        let lstseat = lstaction.data.seat;
        // 自家鸣牌, 摸牌家仍然是上个操作的玩家
        if (lstaction.name === 'RecordChiPengGang' || lstaction.name === 'RecordBaBei' || lstaction.name === 'RecordAnGangAddGang')
            seat = lstseat;
        // 广义切牌, 摸牌家是上个操作玩家的下一家
        if (lstaction.name === 'RecordDiscardTile' || lstaction.name === 'RecordLockTile')
            seat = is_hunzhiyiji() && hunzhiyiji_info[lstseat].liqi && !hunzhiyiji_info[lstseat].overload ? lstseat : (lstseat + 1) % playercnt;

        let lst2action = getlstaction(2), lst2seat = lst2action.data.seat;
        // 血战到底和牌, 若为枪杠, 则摸牌家为开杠家的下一家, 否则为最后和牌家的下一家
        if (lstaction.name === 'RecordHuleXueZhanMid')
            seat = lst2action.name === 'RecordAnGangAddGang' ? (lst2seat + 1) % playercnt : (lstaction.data.hules.at(-1).seat + 1) % playercnt;
        // 血流成河或国标错和, 摸牌家为和牌之前最后操作玩家的下一家
        if (lstaction.name === 'RecordHuleXueLiuMid' || lstaction.name === 'RecordCuohu')
            seat = lst2action.name === 'RecordNewRound' ? (ju + 1) % playercnt : (lst2seat + 1) % playercnt;

        while (hupaied[seat])
            seat = (seat + 1) % playercnt;
        if (isNaN(seat))
            throw new Error(roundinfo() + `mopai: 无法判断谁摸牌, lstaction.name: ${lstaction.name}`);
    }

    // 占星之战, 填充牌候选池供 seat 号玩家选择
    if (is_zhanxing()) {
        if (zhanxing_index === undefined)
            zhanxing_index = 0;
        if (drawtype === 0)
            awaiting_tiles.push(paishan.pop());
        while (awaiting_tiles.length < 3 && paishan.length > 14)
            awaiting_tiles.push(paishan.shift());

        addFillAwaitingTiles(seat, paishan.length - 14 + awaiting_tiles.length, liqi);
    }

    // 魂之一击, 摸牌家 seat 没过载, 则减少次数
    let hunzhiyiji_data = null;
    if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload) {
        hunzhiyiji_info[seat].continue_deal_count--;
        hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[seat]));
    }

    let tile_state = is_openhand() || liqiinfo[seat].kai !== 0;

    let tmp_paishan_len = paishan.length;
    if (is_zhanxing())
        tmp_paishan_len += awaiting_tiles.length;
    let left_cnt = tmp_paishan_len - 15;
    if (playercnt === 2)
        left_cnt = tmp_paishan_len - 19;
    else if (is_chuanma() || is_guobiao())
        left_cnt = tmp_paishan_len - 1;

    let drawcard;
    if (is_zhanxing())
        drawcard = awaiting_tiles.splice(zhanxing_index, 1)[0];
    else if (drawtype === 1)
        drawcard = paishan[0];
    else
        drawcard = paishan.at(-1);

    if (tile === undefined && dealtiles[seat].length !== 0) {
        tile = dealtiles[seat].shift();
        if (tile === '..')
            tile = undefined;
    }
    if (tile !== undefined)
        drawcard = tile;

    playertiles[seat].push(drawcard);

    addDealTile(seat, drawcard, left_cnt, liqi, tile_state, zhanxing_index, hunzhiyiji_data);

    if (!is_zhanxing())
        drawtype === 1 ? paishan.shift() : paishan.pop();
    lstdrawtype = drawtype;
    drawtype = 1;

    // 完成上个操作的后续
    function lstaction_completion() {
        // 开杠翻指示牌
        if (doracnt.lastype === 2) {
            doracnt.cnt += 1 + doracnt.bonus;
            doracnt.licnt += 1 + doracnt.bonus;
            doracnt.bonus = doracnt.lastype = 0;
        }

        // pass 掉自家鸣牌, 则破一发
        for (let i = 0; i < playercnt; i++)
            if (liqiinfo[i].yifa === -1)
                liqiinfo[i].yifa = 0;

        // 龙之目玉: 更新目玉数据
        if (is_muyu() && muyu.count === 0)
            update_muyu(true);

        // 川麻: 刮风下雨结算结算点数
        if (is_chuanma())
            calcgangpoint();

        // 暗夜之战: 暗牌无人开
        if (is_anye() && lstaction.name === 'RecordRevealTile')
            addLockTile(lstaction.data.seat, 2);

        // 魂之一击: 已过载的玩家, push 一次过载数据
        if (is_hunzhiyiji()) {
            let lstseat = lstaction.data.seat, count = hunzhiyiji_info[lstseat].continue_deal_count;
            if (hunzhiyiji_info[lstseat].liqi && count === 0 && !hunzhiyiji_info[lstseat].overload) {
                hunzhiyiji_info[lstseat].overload = true;
                hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[lstseat]));
            }
        }

        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < playercnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }
        // 摸牌解除同巡振听
        pretongxunzt[seat] = tongxunzt[seat] = false;
        update_zhenting();

        // 立直
        if (lstliqi != null) {
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan()) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }
            if (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi()) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
                // 幻境传说: 机会卡2
                if (get_field_spell_mode2() === 2)
                    liqiinfo[lstliqi.seat].yifa = 3;
                liqi = {
                    seat: lstliqi.seat,
                    liqibang: liqibang,
                    score: scores[lstliqi.seat],
                };
                if (is_beishuizhizhan())
                    liqi.liqi_type_beishuizhizhan = liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
            } else
                liqi = {
                    seat: lstliqi.seat,
                    liqibang: liqibang,
                    score: scores[lstliqi.seat],
                    failed: true,
                };
        }

        lstliqi = null;
        lstaction = getlstaction();
    }
}

/**
 * 切牌, 参数顺序可以不一致
 * @param {number} [seat] - 切牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 切的牌, 没有此参数时将根据 discardtiles 确定或摸切
 * @param {boolean|string} [is_liqi] - 是否立直, 默认不立直, 若为 'kailiqi', 则为开立直
 * @param {string} [anpai] - 暗夜之战: 当值为字符串 'anpai' 时, 表示暗牌, 默认不暗牌
 * @param {(number)[]} [bs_type] - 背水之战: 立直类型, 有效值为 '[0]', '[1]', '[2]', 默认为普通立直, 需要配合 is_liqi 使用
 */
function qiepai(seat, tile, is_liqi, anpai, bs_type) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [seat, tile, is_liqi, anpai, bs_type];
        for (let i in mat)
            if (mat[i] === 'anpai')
                x.anpai = mat[i];
            else if (typeof mat[i] == 'number')
                x.seat = mat[i];
            else if (typeof mat[i] == 'boolean' || mat[i] === 'kailiqi')
                x.is_liqi = mat[i];
            else if (mat[i] instanceof Array && typeof mat[i][0] === 'number')
                x.beishui_type = mat[i][0];
            else if (typeof mat[i] == 'string')
                x.tile = mat[i];
        return [x.seat, x.tile, x.is_liqi, x.anpai, x.beishui_type];
    }

    let beishui_type;
    [seat, tile, is_liqi, anpai, beishui_type] = preprocess();

    lstaction_completion();

    let lstaction = getlstaction();
    if (seat === undefined)
        seat = lstaction.name === 'RecordNewRound' ? ju : lstaction.data.seat;
    if (is_liqi === undefined)
        is_liqi = false;

    let moqie = true;
    // 如果 tile 参数原生不空, 且在手牌出现不止一次, 则一定是手切
    if (tile !== undefined && playertiles[seat].indexOf(tile) !== playertiles[seat].length - 1)
        moqie = false;
    if (tile === undefined && discardtiles[seat].length !== 0)
        tile = discardtiles[seat].shift();
    if (tile === undefined || tile === '..')
        tile = playertiles[seat].at(-1);
    moqie = moqie && playertiles[seat].at(-1) === tile && lstaction.name !== 'RecordNewRound' && lstaction.name !== 'RecordChiPengGang';

    let is_wliqi = false, is_kailiqi = false;
    if (is_liqi === 'kailiqi')
        is_liqi = is_kailiqi = true;
    if (is_liqi && liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0)
        is_wliqi = true;

    if (is_liqi)
        lstliqi = {seat: seat, type: is_wliqi ? 2 : 1, kai: is_kailiqi ? 1 : 0, beishui_type: 0};
    if (is_beishuizhizhan() && is_liqi)
        lstliqi.beishui_type = beishui_type;

    // 龙之目玉: 更新目玉数据
    if (is_muyu() && seat === muyu.seat)
        update_muyu(false);

    // 暗夜之战: 暗牌支付1000点
    if (is_anye() && anpai === 'anpai') {
        scores[seat] -= 1000;
        liqibang++;
    }

    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3)
        if (liqiinfo[seat].liqi !== 0)
            spell_hourglass[seat]++;

    // 咏唱之战: 更新手摸切数据
    if (is_yongchang()) {
        shoumoqie[seat].push(!(tile === playertiles[seat].at(-1) && moqie));
        update_shoumoqie(seat);
    }

    // 魂之一击相关
    if (is_hunzhiyiji() && lstliqi != null)
        hunzhiyiji_info[seat] = {
            seat: seat,
            liqi: lstliqi.type,
            continue_deal_count: 6,
            overload: false,
        };

    let index = playertiles[seat].lastIndexOf(tile);
    if (index === -1)   // 要切的牌手牌中没有, 则报错
        throw new Error(roundinfo() + `seat: ${seat} 手牌不存在要切的牌: ${tile}`);
    playertiles[seat].splice(index, 1);
    playertiles[seat].sort(cmp);

    let tile_state = is_openhand();
    if (is_peipaimingpai())
        tile_state = erasemingpai(seat, tile);

    paihe[seat].tiles.push(tile);
    if (!(is_anye() && anpai === 'anpai') && !judgetile(tile, 'Y'))
        paihe[seat].liujumanguan = false;
    if (liqiinfo[seat].yifa > 0)
        liqiinfo[seat].yifa--;

    if (is_anye() && anpai === 'anpai')
        addRevealTile(seat, tile, moqie, is_liqi, is_wliqi);
    else {
        addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type);

        update_shezhangzt(seat);
        update_prezhenting(seat, tile);
    }

    // 完成上个操作的后续
    function lstaction_completion() {
        baogangseat = -1;

        if (doracnt.lastype === 1) {
            doracnt.cnt += 1 + doracnt.bonus;
            doracnt.licnt += 1 + doracnt.bonus;
            doracnt.bonus = doracnt.lastype = 0;
        }
    }
}

/**
 * 他家鸣牌(吃/碰/明杠), 参数顺序可以不一致
 * @param {number} [seat] - 鸣牌的玩家, 没有此参数时按照能否可以 明杠/碰/吃 确定鸣牌玩家
 * @param {string|string[]} [tiles] - 鸣牌家从手里拿出来的牌, 没有此参数时将根据能否可以 明杠/碰/吃 确定鸣牌类型
 * @param {boolean} [jifei] - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
function mingpai(seat, tiles, jifei) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [seat, tiles, jifei];
        for (let i in mat)
            if (typeof mat[i] == 'number')
                x.seat = mat[i];
            else if (typeof mat[i] == 'boolean')
                x.jifei = mat[i];
            else if (mat[i] instanceof Array || typeof mat[i] == 'string' && mat[i].length >= 3)
                x.tiles = separate(mat[i]);
        return [x.seat, x.tiles, x.jifei];
    }

    [seat, tiles, jifei] = preprocess();

    let from = getlstaction().data.seat, tile = getlstaction().data.tile;
    let liqi = null;

    lstaction_completion();

    if (seat === undefined) {
        if (tiles !== undefined && !equaltile(tiles[0], tile))
            seat = (from + 1) % playercnt;
        else if (tiles !== undefined)
            for (let seat2 = 0; seat2 < playercnt; seat2++) {
                if (seat2 === from)
                    continue;
                let cnt = [];
                for (let i = C1m; i <= C7z; i++)
                    cnt[i] = 0;
                for (let i in playertiles[seat2])
                    cnt[tiletoint(playertiles[seat2][i])]++;
                if (tiles.length === 3 && cnt[tiletoint(tiles[0])] >= 3)
                    seat = seat2;
                else if (tiles.length === 2 && cnt[tiletoint(tiles[0])] >= 2)
                    seat = seat2;
                if (seat !== undefined)
                    break;
            }
    }
    if (tiles === undefined) {
        // 明杠
        if (trying([tile, tile, tile], seat))
            return;
        // 碰
        if (trying([tile, tile], seat))
            return;
        // 吃
        seat = (from + 1) % playercnt;
        if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '2') // 吃上端
            if (trying([inttotile(tiletoint(tile) - 2), inttotile(tiletoint(tile) - 1)], seat))
                return;
        if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '9') // 吃中间
            if (trying([inttotile(tiletoint(tile) - 1), inttotile(tiletoint(tile) + 1)], seat))
                return;
        if (tile[1] !== 'z' && tile[0] !== '8' && tile[0] !== '9') // 吃下端
            if (trying([inttotile(tiletoint(tile) + 1), inttotile(tiletoint(tile) + 2)], seat))
                return;

        throw new Error(roundinfo() + `seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
    }

    let tile_states = [];
    if (is_peipaimingpai())
        for (let i in tiles)
            tile_states.push(erasemingpai(seat, tiles[i]));

    let type, froms, split_tiles;
    if (!equaltile(tiles[0], tile)) { // 吃
        type = 0;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];
        fulu[seat].push({type: 0, tile: split_tiles, from: from});
    } else if (tiles.length === 2) { // 碰
        type = 1;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];
        fulu[seat].push({type: 1, tile: split_tiles, from: from});

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.lastype = is_dora_jifan() ? 2 : 1;
    } else if (tiles.length === 3) { // 大明杠
        type = 2;
        froms = [seat, seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tiles[2], tile];
        fulu[seat].push({type: 2, tile: split_tiles, from: from});

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.bonus = 1;

        doracnt.lastype = is_dora_jifan() ? 2 : 1;
        if (!is_chuanma()) {
            if (!is_guobiao()) {
                if (!sigangbao[seat]) { // 查是否四杠子确定, 用于包牌
                    let gang_num = 0;
                    for (let j in fulu[seat])
                        if (fulu[seat][j].type === 2 || fulu[seat][j].type === 3) // 查杠子个数
                            gang_num++;
                    if (gang_num === 3) // 之前已经有3个杠子, 则第4个杠构成四杠子包牌
                        sigangbao[seat] = true;
                }
                if (is_baogang())
                    baogangseat = from;
            }
            drawtype = 0;
        } else
            chuanmagangs.notover.push({from: from, to: seat, val: 2000});
    }

    for (let i in tiles)
        playertiles[seat].splice(playertiles[seat].indexOf(tiles[i]), 1);

    addChiPengGang(seat, split_tiles, froms, type, liqi, tile_states);

    // 幻境传说: 命运卡4
    if (get_field_spell_mode3() === 4) {
        scores[seat] -= 500;
        scores[from] += 500;
    }
    // 幻境传说: 命运卡5
    if (get_field_spell_mode3() === 5 && is_dora(tile)) {
        scores[seat] -= 2000;
        liqibang += 2;
    }

    playertiles[seat].sort(cmp);
    if (jifei)
        roundend();

    // 完成上个操作的后续
    function lstaction_completion() {
        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < playercnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }
        // 自家鸣牌解除同巡振听
        pretongxunzt[seat] = tongxunzt[seat] = false;
        update_zhenting();

        // 破流满
        paihe[from].liujumanguan = false;

        // 龙之目玉: 更新目玉信息
        if (is_muyu() && muyu.count === 0)
            update_muyu(true);

        // 咏唱之战: 移除最后的切牌
        if (is_yongchang()) {
            shoumoqie[from].pop();
            update_shoumoqie(from);
        }

        // 魂之一击: 破一发
        if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi)
            hunzhiyiji_info[from].overload = true;

        // 立直
        let need_bangzi = liqi_need;
        if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
            if (lstliqi.beishui_type === 1)
                need_bangzi = 5;
            else if (lstliqi.beishui_type === 2)
                need_bangzi = 10;
        }
        if (lstliqi != null && (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi())) {
            liqibang += need_bangzi;
            scores[lstliqi.seat] -= need_bangzi * 1000;
            liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
            // 幻境传说: 机会卡2
            if (get_field_spell_mode2() === 2)
                liqiinfo[lstliqi.seat].yifa = 3;

            liqi = {
                seat: lstliqi.seat,
                liqibang: liqibang,
                score: scores[lstliqi.seat],
            };
            if (is_beishuizhizhan())
                liqi.liqi_type_beishuizhizhan = liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
        }
        lstliqi = null;

        for (let i = 0; i < playercnt; i++)
            liqiinfo[i].yifa = 0;
    }

    /**
     * 判断玩家能否鸣 x 牌对应的一个组合
         * @param {string[]} x - 牌型, 组合之一
     * @param {number} seat - 鸣牌的玩家, 可能为 undefined
     * @returns {boolean}
     */
    function trying(x, seat) {
        let x0 = allequaltiles(x[0]).reverse(), x1 = allequaltiles(x[1]).reverse(), x2 = [];
        if (x.length === 3) // 明杠
            x2 = allequaltiles(x[2]).reverse();
        for (let i in x0)
            for (let j in x1) {
                let try_tiles = [x0[i], x1[j]];
                if (x.length === 3) // 明杠
                    for (let k in x2) {
                        try_tiles[2] = x2[k];
                        if (trymingpai(try_tiles))
                            return true;
                    }
                else if (trymingpai(try_tiles))
                    return true;
            }
        return false;

        /**
         * 判断 x 牌对应的某个组合 try_tiles 能否有玩家能鸣
                 * @param {string[]} try_tiles - 牌型, 组合之一
         * @returns {boolean}
         */
        function trymingpai(try_tiles) {
            for (let seat2 = 0; seat2 < playercnt; seat2++)
                if (seat2 !== from && (seat === seat2 || seat === undefined) && intiles(try_tiles, playertiles[seat2])) {
                    mingpai(seat2, try_tiles, jifei);
                    return true;
                }
            return false;
        }
    }

    /**
     * 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集
         * @param {string|string[]} x - 子集
     * @param {string[]} y - 全集
     * @returns {boolean}
     */
    function intiles(x, y) {
        let cnt = [], cnt2 = [];
        for (let i = C1m; i <= C0s + SPT_Offset; i++)
            cnt[i] = cnt2[i] = 0;
        for (let i in x)
            cnt[tiletoint(x[i], true, true)]++;
        for (let i in y)
            cnt2[tiletoint(y[i], true, true)]++;
        for (let i = C1m; i <= C0s + SPT_Offset; i++)
            if (cnt[i] > cnt2[i])
                return false;
        return true;
    }
}

/**
 * 自家鸣牌(暗杠/加杠/拔北), 参数顺序可以不一致
 * @param {number} [seat] - 鸣牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 要鸣的牌, 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * @param {string} [type] - 操作类型, 暗杠/加杠/拔北分别为 'angang'/'jiagang'/'babei', 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * @param {boolean} [jifei] - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
function leimingpai(seat, tile, type, jifei) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [seat, tile, type, jifei];
        for (let i in mat)
            if (mat[i] === 'babei' || mat[i] === 'angang' || mat[i] === 'jiagang' || mat[i] === 'baxi')
                x.type = mat[i];
            else if (typeof mat[i] == 'number')
                x.seat = mat[i];
            else if (typeof mat[i] == 'boolean')
                x.jifei = mat[i];
            else if (typeof mat[i] == 'string')
                x.tile = mat[i];
        return [x.seat, x.tile, x.type, x.jifei];
    }

    [seat, tile, type, jifei] = preprocess();

    let lstaction = getlstaction();
    if (seat === undefined) {
        seat = lstaction.name === 'RecordNewRound' ? ju : lstaction.data.seat;
        if (seat === undefined)
            throw new Error(roundinfo() + `无法判断谁 leimingpai, lstaction.name: ${lstaction.name}`)
    }
    if (jifei === undefined)
        jifei = false;
    if (tile === undefined) {
        if (trying())
            return;
        throw new Error(roundinfo() + `seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 leimingpai (没给 tile 情况下)`);
    }

    if (doracnt.lastype === 1) {
        doracnt.cnt += 1 + doracnt.bonus;
        doracnt.licnt += 1 + doracnt.bonus;
        doracnt.bonus = doracnt.lastype = 0;
    }
    let tile_states = [];
    let tilecnt = 0;
    for (let i in playertiles[seat])
        if (equaltile(tile, playertiles[seat][i]))
            tilecnt++;

    // 拔北
    let is_babei = tilecnt >= 1 && (playercnt === 3 || playercnt === 2) && equaltile(tile, '4z') && (!type || type === 'babei');
    // 拔西, 并入拔北
    is_babei = is_babei || tilecnt >= 1 && playercnt === 2 && equaltile(tile, '3z') && (!type || type === 'baxi');
    // 国标补花'拔花', 需要载入 add_function.js
    is_babei = is_babei || is_guobiao() && tile === Huapai && type === 'babei' && typeof editfunction == 'function';
    // 强制拔北, 需要载入 add_function.js
    is_babei = is_babei || tilecnt >= 1 && type === 'babei' && typeof editfunction == 'function';

    let is_angang = tilecnt >= 4 && (!type || type === 'angang');

    let is_jiagang = false;
    if (tilecnt >= 1 && (!type || type === 'jiagang'))
        for (let i in fulu[seat])
            if (equaltile(fulu[seat][i].tile[0], tile) && fulu[seat][i].type === 1) {
                is_jiagang = true;
                break;
            }

    for (let i = 0; i < playercnt; i++)
        if (liqiinfo[i].yifa > 0)
            liqiinfo[i].yifa = -1;
    update_prezhenting(seat, tile, is_angang);

    // 拔北
    if (is_babei) {
        if (is_peipaimingpai())
            tile_states.push(erasemingpai(seat, tile));
        fulu[seat].push({type: 4, tile: [tile]});
        drawtype = 0;
        for (let i in playertiles[seat])
            if (playertiles[seat][i] === tile) {
                playertiles[seat].splice(parseInt(i), 1);
                break;
            }
        playertiles[seat].sort(cmp);

        addBaBei(seat, tile, tile_states);

    } else if (is_angang || is_jiagang) {
        let ming_type = is_angang ? 3 : 2;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.bonus = 1;

        doracnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;

        if (!is_chuanma())
            drawtype = 0;

        if (is_angang) {
            let tmp_fulu = {type: 3, tile: []};
            let tilenum = 0;
            for (let i in playertiles[seat])
                if (equaltile(tile, playertiles[seat][i])) {
                    tilenum++;
                    if (is_peipaimingpai())
                        tile_states.push(erasemingpai(seat, playertiles[seat][i]));
                    tmp_fulu.tile.push(playertiles[seat][i]);
                    if (tilenum >= 4)
                        break;
                }
            tmp_fulu.tile.sort(cmp);
            tmp_fulu.tile = [tmp_fulu.tile[0], tmp_fulu.tile[2], tmp_fulu.tile[3], tmp_fulu.tile[1]]; // 让红宝牌显露
            fulu[seat].push(tmp_fulu);

            if (is_chuanma())
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    chuanmagangs.notover.push({from: i, to: seat, val: 2000});
                }
            for (let j = 0; j < 4; j++)
                for (let i = playertiles[seat].length - 1; i >= 0; i--)
                    if (equaltile(playertiles[seat][i], tile)) {
                        playertiles[seat][i] = playertiles[seat].at(-1);
                        playertiles[seat].pop();
                        break;
                    }
        } else {
            for (let i in fulu[seat])
                if (equaltile(fulu[seat][i].tile[0], tile) && fulu[seat][i].type === 1) {
                    fulu[seat][i].type = 2;
                    for (let j in playertiles[seat])
                        if (tile === playertiles[seat][j]) {
                            if (is_peipaimingpai())
                                tile_states.push(erasemingpai(seat, tile));
                            fulu[seat][i].tile.push(tile);
                            break;
                        }
                    break;
                }

            if (playertiles[seat].at(-1) === tile)
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    chuanmagangs.notover.push({from: i, to: seat, val: 1000});
                }
            for (let i = playertiles[seat].length - 1; i >= 0; i--)
                if (equaltile(playertiles[seat][i], tile)) {
                    playertiles[seat][i] = playertiles[seat].at(-1);
                    playertiles[seat].pop();
                    break;
                }
        }
        playertiles[seat].sort(cmp);

        addAnGangAddGang(seat, tile, ming_type, tile_states);

        if (jifei)
            roundend();
    } else
        throw new Error(roundinfo() + `seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 leimingpai (给定 tile: ${tile} 情况下)`);

    /**
     * seat 号玩家尝试自家鸣牌, 按照顺序: 国标补花, 拔北, 拔西, 暗杠, 加杠
         * @returns {boolean}
     */
    function trying() {
        // 国标补花
        if (is_guobiao() && typeof editfunction == 'function' && intiles(Huapai, playertiles[seat])) {
            leimingpai(seat, Huapai, 'babei');
            return true;
        }
        let alltiles;
        // 拔北
        if (playercnt === 2 || playercnt === 3) {
            alltiles = allequaltiles('4z').reverse();
            for (let i in alltiles)
                if (intiles(alltiles[i], playertiles[seat])) {
                    leimingpai(seat, alltiles[i], 'babei');
                    return true;
                }
        }
        // 拔西
        if (playercnt === 2 && typeof editfunction == 'function') {
            alltiles = allequaltiles('3z').reverse();
            for (let i in alltiles)
                if (intiles(alltiles[i], playertiles[seat])) {
                    leimingpai(seat, alltiles[i], 'babei')
                    return true;
                }
        }
        // 暗杠
        for (let i = C1m; i <= C7z; i++) {
            alltiles = allequaltiles(inttotile(i)).reverse();
            for (let x0 in alltiles)
                for (let x1 in alltiles)
                    for (let x2 in alltiles)
                        for (let x3 in alltiles) {
                            let tmp_angang = [alltiles[x0], alltiles[x1], alltiles[x2], alltiles[x3]];
                            if (intiles(tmp_angang, playertiles[seat])) {
                                leimingpai(seat, alltiles[x0], 'angang', jifei);
                                return true;
                            }
                        }
        }
        // 加杠
        for (let i = C1m; i <= C7z; i++) {
            alltiles = allequaltiles(inttotile(i)).reverse();
            for (let i in alltiles)
                if (intiles(alltiles[i], playertiles[seat])) {
                    let can_jiagang = false;
                    for (let i in fulu[seat])
                        if (equaltile(fulu[seat][i].tile[0], alltiles[i]) && fulu[seat][i].type === 1) {
                            can_jiagang = true;
                            break;
                        }
                    if (can_jiagang) {
                        leimingpai(seat, alltiles[i], 'jiagang', jifei);
                        return true;
                    }
                }
        }
        return false;

        /**
         * 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集
                 * @param {string|string[]} x - 子集
         * @param {string[]} y - 全集
         * @returns {boolean}
         */
        function intiles(x, y) {
            if (typeof x == 'string')
                x = [x];
            let cnt = [], cnt2 = [];
            for (let i = C1m; i <= C0s + SPT_Offset; i++)
                cnt[i] = cnt2[i] = 0;
            for (let i in x)
                cnt[tiletoint(x[i], true, true)]++;
            for (let i in y)
                cnt2[tiletoint(y[i], true, true)]++;
            for (let i = C1m; i <= C0s + SPT_Offset; i++)
                if (cnt[i] > cnt2[i])
                    return false;
            return true;
        }
    }
}

/**
 * 和牌, 参数顺序可以不一致
 * @param {number|number[]} [allseats] - 本次和牌所有和牌的玩家, 没有此参数时按照正常对局流程
 * @param {boolean} [type] - 修罗/川麻: 是否为最终和牌, 默认为中途和牌
 */
function hupai(allseats, type) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [allseats, type];
        for (let i in mat)
            if (typeof mat[i] == 'number')
                x.allseats = [mat[i]];
            else if (mat[i] instanceof Array)
                x.allseats = mat[i];
            else if (typeof mat[i] == 'boolean')
                x.type = mat[i];
        return [x.allseats, x.type];
    }

    [allseats, type] = preprocess();

    // 川麻枪杠, 则杠不成立
    if (chuanmagangs.notover.length !== 0) {
        let seat = getlstaction().data.seat, tile = getlstaction().data.tiles;
        for (let i in fulu[seat])
            if (fulu[seat][i].type === 2 && equaltile(fulu[seat][i].tile[0], tile)) {
                fulu[seat][i].type = 1;
                fulu[seat][i].tile.pop();
                break;
            }
        chuanmagangs.notover.length = 0;
    }

    if (type === undefined)
        type = false;
    if (allseats === undefined || allseats.length === 0) {
        let lstaction = getlstaction();
        if (lstaction.name === 'RecordDealTile')
            allseats = [lstaction.data.seat];
        else if (lstaction.name === 'RecordNewRound')
            allseats = [ju];
        else { // 荣和
            allseats = [];
            for (let i = lstaction.data.seat + 1; i < lstaction.data.seat + playercnt; i++) {
                const seat = i % playercnt;
                if (seat === lstaction.data.seat || hupaied[seat])
                    continue;
                if (lstaction.name === 'RecordDiscardTile' || lstaction.name === 'RecordRevealTile' || lstaction.name === 'RecordLockTile')
                    playertiles[seat].push(lstaction.data.tile);
                else if (lstaction.name === 'RecordBaBei')
                    playertiles[seat].push(lstaction.data.tile);
                else if (lstaction.name === 'RecordAnGangAddGang')
                    playertiles[seat].push(lstaction.data.tiles);
                if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting[seat]) && calchupai(playertiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和, 及
                        let points = calcfan(seat, false, lstaction.data.seat);
                        if (calcsudian(points) !== -2000)
                            allseats.push(seat);
                    } else
                        allseats.push(seat);
                }
                playertiles[seat].pop();
                if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao()) && allseats.length >= 1)
                    break;
            }
        }
        if (allseats.length === 0)  // 没给参数 seat 的情况下, 无人能正常和牌
            throw new Error(roundinfo() + 'hupai 没给 seat 参数无人能正常和牌');
    }
    // 血流成河模式中, 和牌家prezhenting消失
    for (let i in allseats) {
        pretongxunzt[allseats[i]] = tongxunzt[allseats[i]] = false;
        prelizhizt[allseats[i]] = lizhizt[allseats[i]] = false;
    }
    update_zhenting();

    if (is_toutiao() || is_mingjing() || is_guobiao()) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
        allseats = [allseats[0]];

    // 非血战到底, 血流成河模式
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        let ret = [], baopait = 0;
        for (let i in allseats)
            ret.push(!is_guobiao() ? hupaioneplayer(allseats[i]) : hupaioneplayer_guobiao(allseats[i]));
        // 国标错和陪打
        if (is_guobiao() && is_cuohupeida() && typeof editfunction == 'function' && ret[0].cuohu) {
            let old_scores = scores.slice();
            for (let i = 0; i < playercnt; i++)
                if (i === allseats[0])
                    delta_scores[i] = -3 * cuohu_points() * scale_points();
                else
                    delta_scores[i] = cuohu_points() * scale_points();
            for (let i = 0; i < playercnt; i++)
                scores[i] += delta_scores[i];

            addCuohu(allseats[0], ret[0].zimo, old_scores);

            for (let i = 0; i < playercnt; i++)
                delta_scores[i] = 0;
            cuohu[allseats[0]] = true;
            return;
        }
        for (let i in allseats)
            hupaied[allseats[i]] = true;
        // '包'字的选择
        // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
        if (!is_guobiao() && baogangseat !== -1)
            baopait = baogangseat + 1
        baogangseat = -1;
        // 多家包牌, 自摸情况下以最先包牌的玩家为准
        // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
        if (!is_guobiao())
            for (let i in allseats)
                if (baopai[allseats[i]].length !== 0) {
                    baopait = baopai[allseats[i]][0].seat + 1;
                    break;
                }
        let old_scores = scores.slice();
        for (let i = 0; i < playercnt; i++)
            scores[i] += delta_scores[i];

        endHule(ret, old_scores, baopait);

        for (let i = 0; i < playercnt; i++)
            delta_scores[i] = 0;
        if (hupaied[ju]) { // 庄家和牌, 则连庄
            // 国标正常情况下不连庄, 除了设置了 '_guobiao_lianzhuang'
            if (!is_guobiao() || is_guobiao() && is_guobiao_lianzhuang())
                ben++;
            // 幻境传说: 庄家卡2
            if (get_field_spell_mode1() === 2)
                ben += 4;
            lianzhuangcnt++;
        } else {
            ju++;
            ben = 0;
            lianzhuangcnt = 0;
        }
        roundend();
    } else {
        let ret = [];
        for (let i in allseats) {
            let whatever = !is_chuanma() ? hupaioneplayer(allseats[i]) : hupaioneplayer_chuanma(allseats[i]);
            ret.push(whatever);
            hules_history.push(whatever);
        }
        if (is_chuanma() && juc === -1)
            juc = allseats[0];
        if (!is_xueliu())
            for (let i in allseats)
                hupaied[allseats[i]] = true;
        let old_scores = scores.slice();
        for (let i = 0; i < playercnt; i++)
            scores[i] += delta_scores[i];

        if (!type) {
            let liqi = null;
            if (lstliqi != null) {
                if (scores[lstliqi.seat] >= 1000 * liqi_need || is_fufenliqi())
                    liqi = {
                        seat: lstliqi.seat,
                        liqibang: liqibang + liqi_need,
                        score: scores[lstliqi.seat] - 1000 * liqi_need,
                    };
                else
                    liqi = {
                        seat: lstliqi.seat,
                        liqibang: liqibang,
                        score: scores[lstliqi.seat],
                        failed: true,
                    };
            }
            if (!is_chuanma())
                for (let i = 0; i < playercnt; i++)
                    liqiinfo[i].yifa = 0;

            if (!is_xueliu())
                addHuleXueZhanMid(ret, old_scores, liqi);
            else
                addHuleXueLiuMid(ret, old_scores);

            if (lstliqi != null && (scores[lstliqi.seat] >= 1000 * liqi_need || is_fufenliqi())) {
                liqibang += liqi_need;
                scores[lstliqi.seat] -= 1000 * liqi_need;
                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 0, kai: lstliqi.kai};
            }
            lstliqi = null;
        } else {

            if (!is_xueliu())
                endHuleXueZhanEnd(ret, old_scores);
            else
                endHuleXueLiuEnd(ret, old_scores);
        }
        for (let i = 0; i < playercnt; i++)
            delta_scores[i] = 0;
        if (type) {
            if (!is_chuanma())
                ju++;
            roundend();
        }
    }
}

// 荒牌流局, 任何时刻都可以调用
function notileliuju() {
    // 暗夜之战暗牌无人开
    let lstaction = getlstaction();
    if (is_anye() && lstaction.name === 'RecordRevealTile')
        addLockTile(lstaction.data.seat, 2);

    // 幻境传说: 庄家卡3
    if (get_field_spell_mode1() === 3) {
        scores[ju] += liqibang * 1000;
        liqibang = 0;
    }

    let tingcnt = 0;
    let ret = [];
    for (let i = 0; i < playercnt; i++) {
        let tings = calctingpai(i);
        if (tings.length === 0 || hupaied[i])
            ret.push({
                tingpai: false,
                hand: [],
                tings: [],
            });
        else {
            tingcnt++;
            ret.push({
                tingpai: true,
                hand: playertiles[i].slice(),
                tings: tings
            });
        }
    }
    lianzhuangcnt = 0; // 任意荒牌流局都会导致连庄数重置

    // 幻境传说: 命运卡1
    let times = 1;
    if (get_field_spell_mode3() === 1)
        times = 2;

    let ret2 = [];

    if (!no_liujumanguan()) {
        // 有流满
        let liujumanguan = false;
        for (let i = ju; i < playercnt + ju; i++) {
            if (is_chuanma() || is_guobiao())
                break;
            let seat = i % playercnt;
            if (!paihe[seat].liujumanguan || hupaied[seat])
                continue;
            liujumanguan = true;
            let score = 0;
            for (let i = 0; i < playercnt; i++) {
                if (seat === i || hupaied[i])
                    continue;
                // 幻境传说: 命运卡1
                if (seat === ju || i === ju) {
                    delta_scores[i] -= 4000 * times;
                    delta_scores[seat] += 4000 * times;
                    score += 4000 * times;
                } else {
                    delta_scores[i] -= 2000 * times;
                    delta_scores[seat] += 2000 * times;
                    score += 2000 * times;
                }
            }
            if ((playercnt === 3 || playercnt === 2) && no_zimosun()) {
                let base_points = playercnt === 3 ? 1000 : 4000;
                for (let j = 0; j < playercnt; j++) {
                    if (seat === j || hupaied[j])
                        continue;
                    if (seat === ju) {
                        delta_scores[j] -= base_points * 2;
                        delta_scores[seat] += base_points * 2;
                        score += base_points * 2;
                    } else {
                        delta_scores[j] -= base_points;
                        delta_scores[seat] += base_points;
                        score += base_points;
                    }
                }
            }
            let ming = [];
            for (let i in fulu[seat]) {
                let tiles = fulu[seat][i].tile;
                if (fulu[seat][i].type === 0)
                    ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
                else if (fulu[seat][i].type === 1)
                    ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
                else if (fulu[seat][i].type === 2)
                    ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
                else if (fulu[seat][i].type === 3)
                    ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
            }
            ret2.push({
                delta_scores: delta_scores.slice(),
                doras: calcdoras(),
                hand: playertiles[seat].slice(),
                ming: ming,
                old_scores: scores.slice(),
                score: score,
                seat: seat,
            });
            for (let i = 0; i < playercnt; i++) {
                scores[i] += delta_scores[i];
                delta_scores[i] = 0;
            }
        }
        if (liujumanguan && !is_chuanma() && !is_guobiao()) {

            endNoTile(true, ret, ret2);

            if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_xueliu()) {
                ben++;
                // 幻境传说: 庄家卡2
                if (get_field_spell_mode1() === 2)
                    ben += 4;
            }
            if (!ret[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo())
                ju++;
            roundend();
            return;
        }
    }
    ret2 = [{delta_scores: [], old_scores: []}];
    let playerleft = 0;
    for (let i = 0; i < playercnt; i++)
        if (!hupaied[i])
            playerleft++;
    let notingcnt = playerleft - tingcnt;
    if (tingcnt !== 0 && notingcnt !== 0) {
        if (!is_chuanma() && !is_guobiao()) {
            let fafu = 1000;
            if (tingcnt === 1 && notingcnt === 1)
                fafu = fafu_2p;
            else if (tingcnt === 1 && notingcnt === 2)
                fafu = fafu_3p_1ting;
            else if (tingcnt === 2 && notingcnt === 1)
                fafu = fafu_3p_2ting;
            else if (tingcnt === 1 && notingcnt === 3)
                fafu = fafu_1ting;
            else if (tingcnt === 2 && notingcnt === 2)
                fafu = fafu_2ting;
            else if (tingcnt === 3 && notingcnt === 1)
                fafu = fafu_3ting;

            for (let i = 0; i < playercnt; i++) {
                if (hupaied[i])
                    continue;
                // 幻境传说: 命运卡1
                if (ret[i].tingpai)
                    delta_scores[i] += fafu * notingcnt / tingcnt * times;
                else
                    delta_scores[i] -= fafu * times;
            }
        } else if (is_chuanma()) {
            // seat 向 i 查大叫, 查花猪
            for (let seat = 0; seat < playercnt; seat++) {
                for (let i = 0; i < playercnt; i++) {
                    if (hupaied[seat] || hupaied[i] || i === seat)
                        continue;
                    let points = 0;
                    if (huazhu(i))
                        points = Math.max(calcsudian_chuanma(calcfan_chuanma(seat, false, true)), 8000);
                    else if (!ret[i].tingpai && ret[seat].tingpai)
                        points = calcsudian_chuanma(calcfan_chuanma(seat, false, true));
                    delta_scores[seat] += points;
                    delta_scores[i] -= points;
                }
            }
        }
    }
    ret2[0].old_scores = scores.slice();
    ret2[0].delta_scores = delta_scores.slice();
    if (is_chuanma()) {
        // 未听返税
        let taxes = [0, 0, 0, 0];
        for (let i in chuanmagangs.over) {
            let from = chuanmagangs.over[i].from, to = chuanmagangs.over[i].to, val = chuanmagangs.over[i].val;
            if (!(ret[to].tingpai || hupaied[to])) {
                taxes[to] -= val;
                taxes[from] += val;
            }
        }
        ret2[0].taxes = taxes;
        for (let i = 0; i < playercnt; i++)
            delta_scores[i] += taxes[i];
    }
    for (let i = 0; i < playercnt; i++) {
        scores[i] += delta_scores[i];
        delta_scores[i] = 0;
    }

    endNoTile(false, ret, ret2);

    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma()) {
        ben++;
        // 幻境传说: 庄家卡2
        if (get_field_spell_mode1() === 2)
            ben += 4;
    }
    if ((!ret[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || is_guobiao() && !is_guobiao_lianzhuang()) && !is_chuanma())
        ju++;
    roundend();
}

/**
 * 途中流局
 * @param {number} [liuju_type] - 流局类型
 * - 1: 九种九牌
 * - 2: 四风连打
 * - 3: 四杠散了
 * - 4: 四家立直
 * - 5: 三家和了(需要在 detail_rule 中设置 _sanxiangliuju)
 *
 * 若没有该参数, 则除了"三家和了"外, 由系统自动判断属于哪种流局
 */
function liuju(liuju_type) {
    let lstaction = getlstaction();
    let liuju_data, seat = lstaction.name === 'RecordNewRound' ? ju : lstaction.data.seat;
    let allliuju = [jiuzhongjiupai, sifenglianda, sigangsanle, sijializhi, sanjiahule];

    let allplayertiles = ['', '', '', ''];
    for (let seat = 0; seat < playercnt; seat++)
        for (let i in playertiles[seat]) {
            allplayertiles[seat] += playertiles[seat][i];
            if (i !== playertiles[seat].length - 1)
                allplayertiles[seat] += '|';
        }

    if (typeof liuju_type == 'number')
        allliuju[liuju_type - 1]();
    else
        for (let i in allliuju) {
            allliuju[i]();
            if (liuju_data !== undefined)
                break;
        }

    // 九种九牌
    function jiuzhongjiupai() {
        let cnt = [], yaojiutype = 0;
        for (let i = C1m; i <= C7z; i++)
            cnt[i] = 0;
        for (let i in playertiles[seat])
            cnt[tiletoint(playertiles[seat][i])]++;
        for (let i = C1m; i <= C7z; i++)
            if (cnt[i] >= 1 && judgetile(inttotile(i), 'Y'))
                yaojiutype++;
        if (yaojiutype >= 9 && liqiinfo[seat].liqi === 0 && liqiinfo[seat].yifa === 1 && playertiles[seat].length === 14)
            liuju_data = {
                seat: seat,
                tiles: playertiles[seat].slice(),
                type: 1,
            };
    }

    // 四风连打
    function sifenglianda() {
        if (playercnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (paihe[0].tiles[0] === paihe[1].tiles[0] && paihe[1].tiles[0] === paihe[2].tiles[0] && paihe[2].tiles[0] === paihe[3].tiles[0])
                        if (tiletoint(paihe[0].tiles[0]) >= 28 && tiletoint(paihe[0].tiles[0]) <= 31) {
                            let need_bangzi = liqi_need;
                            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                                if (lstliqi.beishui_type === 1)
                                    need_bangzi = 5;
                                else if (lstliqi.beishui_type === 2)
                                    need_bangzi = 10;
                            }
                            let liqi = null;
                            if (lstliqi != null && (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi())) {
                                liqibang += need_bangzi;
                                scores[lstliqi.seat] -= need_bangzi * 1000;
                                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
                                if (is_beishuizhizhan())
                                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
                                liqi = {
                                    seat: lstliqi.seat,
                                    liqibang: liqibang,
                                    score: scores[lstliqi.seat],
                                };
                            }
                            liuju_data = {
                                type: 2,
                            };
                            if (liqi != null)
                                liuju_data.liqi = liqi;
                        }
    }

    // 四杠散了
    function sigangsanle() {
        let havegang = [false, false, false, false], havegangcnt = 0;
        for (let seat = 0; seat < playercnt; seat++) {
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 2 || fulu[seat][i].type === 3)
                    havegang[seat] = true;
            if (havegang[seat])
                havegangcnt++;
        }
        if (doracnt.cnt === 5 && havegangcnt >= 2) {
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }
            let liqi = null;
            if (lstliqi != null && (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi())) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
                if (is_beishuizhizhan())
                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
                liqi = {
                    seat: lstliqi.seat,
                    liqibang: liqibang,
                    score: scores[lstliqi.seat],
                };
            }
            liuju_data = {
                type: 3,
            };
            if (liqi != null)
                liuju_data.liqi = liqi;
        }
    }

    // 四家立直
    function sijializhi() {
        if (playercnt === 4) {
            let liqiplayercnt = 0;
            for (let i = 0; i <= 3; i++)
                if (liqiinfo[i].liqi !== 0)
                    liqiplayercnt++;
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }
            if (lstliqi != null && (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi())) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
                if (is_beishuizhizhan())
                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
                if (liqiplayercnt === 3)
                    liuju_data = {
                        type: 4,
                        liqi: {
                            liqibang: liqibang,
                            score: scores[lstliqi.seat],
                            seat: lstliqi.seat
                        },
                        allplayertiles: allplayertiles,
                    };
            }
        }
    }

    // 三家和了, 需要设置 '_sanxiangliuju'
    function sanjiahule() {
        if (is_sanxiangliuju()) {
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }
            let liqi = null;
            if (lstliqi != null && (scores[lstliqi.seat] >= need_bangzi * 1000 || is_fufenliqi())) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {liqi: lstliqi.type, yifa: 1, kai: lstliqi.kai};
                if (is_beishuizhizhan())
                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
                liqi = {
                    seat: lstliqi.seat,
                    liqibang: liqibang,
                    score: scores[lstliqi.seat],
                };
            }
            liuju_data = {
                seat: seat,
                type: 5,
                allplayertiles: allplayertiles,
            };
            if (liqi != null)
                liuju_data.liqi = liqi;
        }
    }

    if (hules_history.length !== 0 && liuju_data != null)
        liuju_data.hules_history = hules_history.slice();
    if (liuju_data !== undefined) {

        endLiuJu(liuju_data);

        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_guobiao()) {
            ben++;
            // 幻境传说: 庄家卡2
            if (get_field_spell_mode1() === 2)
                ben += 4;
        }
        roundend();
    } else
        throw new Error(roundinfo() + '不符合任何途中流局条件');
}

// ==========================================

/**
 * 换三张换牌(修罗/川麻)
 * @param {string} tls0 - 东起玩家交出去的牌
 * @param {string} tls1 - 南起玩家交出去的牌
 * @param {string} tls2 - 西起玩家交出去的牌
 * @param {string} tls3 - 北起玩家交出去的牌
 * @param {number} type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
function huansanzhang(tls0, tls1, tls2, tls3, type) {
    let tiles = [tls0, tls1, tls2, tls3];
    for (let i in tiles)
        tiles[i] = separate(tiles[i]);

    let ret = [];
    for (let seat = 0; seat < playercnt; seat++) {
        let in_seat = (seat - type + 3) % playercnt;
        for (let j = 0; j < 3; j++)
            for (let i in playertiles[seat])
                if (playertiles[seat][i] === tiles[seat][j]) {
                    playertiles[seat].splice(parseInt(i), 1);
                    break;
                }
        for (let j = 0; j < 3; j++)
            playertiles[seat].push(tiles[in_seat][j]);

        ret.push({
            out_tiles: tiles[seat],
            out_tile_states: [0, 0, 0],
            in_tiles: tiles[in_seat],
            in_tile_states: [0, 0, 0],
        });
    }
    for (let i = 0; i < playercnt; i++)
        playertiles[i].sort(cmp);

    let lastile = playertiles[ju].at(-1);
    playertiles[ju].pop();
    let tingpais = [];
    for (let i = 0; i < playercnt; i++) {
        let tingpais1 = calctingpai(i);
        if (tingpais1.length !== 0)
            tingpais.push({seat: i, tingpais1: tingpais1});
    }
    playertiles[ju].push(lastile);

    addChangeTile(ret, type, tingpais);
}

/**
 * 定缺(川麻)
 * @example
 * // seat 从0-3的定缺花色分别为"索,万,饼,索"
 * dingque('smps')
 * @param {string} x - 四位玩家的定缺
 */
function dingque(x) {
    let alldingque = x.split('');
    let dict = {'m': 1, 'p': 0, 's': 2}; // 注意 012 分别对应 pms, 而不是 mps
    let ret = [];
    for (let i in alldingque)
        ret.push(dict[alldingque[i]]);
    gaps = ret;

    let tingpai = [];
    for (let i = 0; i < playercnt; i++) {
        let tingpais1 = calctingpai(i);
        if (tingpais1.length !== 0)
            tingpai.push({seat: i, tingpais1: tingpais1});
    }

    addSelectGap(ret, tingpai);
}

/**
 * 开牌并成功(暗夜之战)
 * @param {number} seat - 开牌的玩家
 */
function unveil(seat) {
    if (typeof seat != 'number')
        throw new Error(roundinfo() + `unveil: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getlstaction().name === 'RecordRevealTile') {
        let tile_seat = getlstaction().data.seat;
        let tile = getlstaction().data.tile;
        scores[seat] -= 2000;
        liqibang += 2;

        addUnveilTile(seat);

        addLockTile(tile_seat, 0, tile);

        if (!judgetile(tile, 'Y'))
            paihe[tile_seat].liujumanguan = false;
    } else
        throw new Error(roundinfo() + `unveil: 暗夜之战开牌的前提是有人刚暗牌, lstaction.name: ${getlstaction().name}`);
}

/**
 * 开牌后锁定(暗夜之战)
 * @param {number} seat - 开牌的玩家
 */
function unveil_lock(seat) {
    if (typeof seat != 'number')
        throw new Error(roundinfo() + `unveil_lock: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getlstaction().name === 'RecordRevealTile') {
        let tile_seat = getlstaction().data.seat;
        scores[seat] -= 2000;
        liqibang += 2;

        addUnveilTile(seat);

        scores[tile_seat] -= 4000;
        liqibang += 4;

        addLockTile(tile_seat, 1);

    } else
        throw new Error(roundinfo() + `unveil_lock: 暗夜之战开牌的前提是有人刚暗牌, lstaction.name: ${getlstaction().name}`);
}

// ==========================================

/**
 * 跳转局数
 * @param {number} c - 场 chang, 0,1,2,3 分别表示 东,南,西,北 场
 * @param {number} j - 局 ju, seat 为 ju 坐庄
 * @param {number} b - 本 ben, 本场数
 */
function gotoju(c, j, b) {
    chang = c;
    ju = j;
    ben = b;
}

// 示例牌局
function demogame() {
    tiles0 = '11223344556777z';
    if (config.mode.mode >= 20 && config.mode.mode <= 29) {
        tiles1 = '1112340678999m';
        randompaishan('6z', '55z............');
    } else if (config.mode.mode >= 10 && config.mode.mode <= 19) {
        tiles1 = '1112340678999p';
        tiles2 = '1112340678999s';
        randompaishan('6z', '55z........');
    } else {
        tiles1 = '1112340678999m';
        tiles2 = '1112340678999p';
        tiles3 = '1112340678999s';
        randompaishan('6z', '55z....');
    }
    roundbegin();
    qiepai(true);
    moqieliqi();
    hupai();
}

// ==========================================

/**
 * 便捷函数: 正常摸切
 * @param {number|string} [tile_cnt] - 要切的牌(string)或循环次数(number), 默认为1
 */
function normalmoqie(tile_cnt) {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai();
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt);
    } else
        throw new Error(roundinfo() + `normalmoqie: tile_cnt 参数不合规: ${tile_cnt}`);
}

/**
 * 便捷函数: 摸牌立直
 * @param {number|string} [tile_cnt] - 要切的牌(string)或循环次数(number), 默认为1
 */
function moqieliqi(tile_cnt) {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai(true);
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt, true);
    } else
        throw new Error(roundinfo() + `moqieliqi: tile_cnt 参数不合规: ${tile_cnt}`);
}

/**
 * 便捷函数: 连续岭上摸牌
 * @param {number|string} [tile_cnt] - 要鸣的牌(string)或循环次数(number), 默认为1
 */
function combomopai(tile_cnt) {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            leimingpai();
            mopai();
        }
    else if (typeof tile_cnt == 'string') {
        leimingpai(tile_cnt);
        mopai();
    } else
        throw new Error(roundinfo() + `combomopai: tile_cnt 参数不合规: ${tile_cnt}`);
}

/**
 * 便捷函数: 鸣牌并切牌
 * @param {number|string} [tls_cnt] - 要切的牌(string, 1张牌)或鸣牌从手里拿出来的牌(string, 至少2张牌)或循环次数(number), 默认为1
 */
function mingqiepai(tls_cnt) {
    if (tls_cnt === undefined)
        tls_cnt = 1;
    if (typeof tls_cnt == 'number')
        for (let i = 0; i < tls_cnt; i++) {
            mingpai();
            qiepai();
        }
    else if (typeof tls_cnt == 'string') {
        let split_tile = separate(tls_cnt);
        if (split_tile.length >= 2) {
            mingpai(tls_cnt);
            qiepai();
        } else {
            mingpai();
            qiepai(tls_cnt);
        }
    } else
        throw new Error(roundinfo() + `mingqiepai: tls_cnt 参数不合规: ${tls_cnt}`);
}

/**
 * 便捷函数: 自摸和牌
 * @param {boolean} [flag] - 修罗/川麻: 即 hupai 中的 type 参数, 是否为最终和牌, 默认为中途和牌
 */
function zimohu(flag = false) {
    if (typeof flag == 'boolean') {
        mopai();
        hupai(flag);
    } else
        throw new Error(roundinfo() + `zimohu: flag 参数不合规: ${flag}`);
}

// 便捷函数: 摸切到荒牌流局
function moqieliuju() {
    normalmoqie(get_left_tile_cnt());
    notileliuju();

    /**
     * 获取当前位置还剩余多少牌
         * @returns {number}
     */
    function get_left_tile_cnt() {
        for (let i = actions.length - 1; i >= 0; i--)
            if (actions[i].name === 'RecordNewRound' || actions[i].name === 'RecordDealTile' || actions[i].name === 'RecordFillAwaitingTiles')
                return actions[i].data.left_tile_count;
        console.error(`moqieliuju: 无法确定剩余多少牌`);
        return 0;
    }
}

// ==========================================

/**
 * 判断 tile 牌是否满足 type 规则
 * @example
 * // return true
 * judgetile('1m', 'M')
 * @param {string} tile - 要验的牌
 * @param {string} type - 规则:
 * - 'H': 字牌
 * - 'T': 老头牌
 * - 'Y': 幺九牌
 * - 'D': 中张牌
 * - 'M': 万子
 * - 'P': 饼子
 * - 'S': 索子
 * - 'L': 组成绿一色的牌
 * - 'quanshuang': 国标: 组成全双刻的牌
 * - 'quanda': 国标: 组成全大的牌
 * - 'quanzhong': 国标: 组成全中的牌
 * - 'quanxiao': 国标: 组成全小的牌
 * - 'dayuwu': 国标: 组成大于五的牌
 * - 'xiaoyuwu': 国标: 组成小于五的牌
 * - 'tuibudao': 国标: 组成推不倒的牌
 * @returns {boolean}
 */
function judgetile(tile, type) {
    if (typeof tile != 'string' || tile.length === 1)
        throw new Error(roundinfo() + `judgetile: tile 格式不合规: ${tile}`);
    if (tile === Tbd)
        return true;
    let x = tiletoint(tile);
    switch (type) {
        case 'Y':
            return tile[0] === '1' || tile[0] === '9' || tile[1] === 'z';
        case 'D':
            return !(tile[0] === '1' || tile[0] === '9' || tile[1] === 'z');
        case 'T':
            return tile[0] === '1' && tile[1] !== 'z' || tile[0] === '9';
        case 'H':
            return tile[1] === 'z';
        case 'M':
            return tile[1] === 'm';
        case 'P':
            return tile[1] === 'p';
        case 'S':
            return tile[1] === 's';
        case 'L':
            return x === C1s + 1 || x === C1s + 2 || x === C1s + 3 || x === C1s + 5 || x === C1s + 7 || x === C5z + 1;
        case 'quanshuang':
            return x <= C9s && ((x - 1) % 9 + 1) % 2 === 0;
        case 'quanda':
            return x <= C9s && (x - 1) % 9 >= 6;
        case 'quanzhong':
            return x <= C9s && (x - 1) % 9 >= 3 && (x - 1) % 9 <= 5;
        case 'quanxiao':
            return x <= C9s && (x - 1) % 9 <= 2;
        case 'dayuwu':
            return x <= C9s && (x - 1) % 9 >= 5;
        case 'xiaoyuwu':
            return x <= C9s && (x - 1) % 9 <= 3;
        case 'tuibudao':
            return x === 10 || x === 11 || x === 12 || x === 13 || x === 14 || x === 17 || x === 18 || x === 20 || x === 22 || x === 23 || x === 24 || x === 26 || x === 27 || x === 32;
        default:
            throw new Error(roundinfo() + `judgetile: type 格式不合规: ${type}`);
    }
}

/**
 * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 SPT_Suf 放到后面
 * @example
 * // return ['5m', '0m', '5mt', '0mt']
 * allequaltiles('5m')
 * @param {string} tile - 要查的牌
 * @returns {string[]} - 所有与参数 tile 等效的牌的字符串数组
 */
function allequaltiles(tile) {
    if (tile === Tbd)
        return [Tbd];
    tile = tile.substring(0, 2);
    if (tile[0] === '0' || tile[0] === '5' && tile[1] !== 'z')
        return ['5' + tile[1], '5' + tile[1] + SPT_Suf, '0' + tile[1], '0' + tile[1] + SPT_Suf];
    else
        return [tile, tile + SPT_Suf];
}

/**
 * 判断两个牌是否等效
 * @param {string} x - 牌1
 * @param {string} y - 牌2
 * @returns {boolean}
 */
function equaltile(x, y) {
    return allequaltiles(x).indexOf(y) !== -1;
}

/**
 * 解析牌, 会将简化后牌编码恢复成单个并列样子
 * @example
 * // return '1m2m3m9p9p'
 * decompose('123m99p')
 * @param {string} tiles - 要解析的牌
 * @returns {string} - 解析后的牌
 */
function decompose(tiles) {
    let x = tiles.replace(/\s*/g, '');
    for (let i = 0; i < x.length; i++) {
        if (x[i] === '.' || x[i] === 'Y' || x[i] === 'D' || x[i] === 'H' || x[i] === 'T' || x[i] === 'M' || x[i] === 'P' || x[i] === 'S') {
            x = x.substring(0, i + 1) + x[i] + x.substring(i + 1);
            i++;
            continue;
        }
        if (x[i] === 'b') { // 万象修罗的百搭牌
            if (i + 1 === x.length || i + 1 < x.length && x[i + 1] !== 'd')
                x = x.substring(0, i + 1) + 'd' + x.substring(i + 1);
            i++;
            continue;
        }
        if (x[i] !== 'm' && x[i] !== 'p' && x[i] !== 's' && x[i] !== 'z')
            for (let j = i + 1; j < x.length; j++) {
                if (x[j] === 'm' || x[j] === 'p' || x[j] === 's' || x[j] === 'z') {
                    if (j + 1 < x.length && x[j + 1] === SPT_Suf) { // 以 SPT_Suf 结尾的特殊牌
                        if (j !== i + 1)
                            x = x.substring(0, i + 1) + x[j] + x[j + 1] + x.substring(i + 1);
                        i += 2;
                        break;
                    } else {
                        if (j !== i + 1)
                            x = x.substring(0, i + 1) + x[j] + x.substring(i + 1);
                        i++;
                        break;
                    }
                }
            }
    }
    return x;
}

/**
 * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
 * @example
 * // return ['1m', '2m', '3m', '9p', '9p']
 * separate('123m99p')
 * @param {string|string[]} tiles - 要拆分的牌
 * @returns {string[]} - 拆分后的牌集合, 字符串数组
 */
function separate(tiles) {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret = [];
    while (tiles.length > 0) {
        if (tiles.length > 2 && tiles[2] === SPT_Suf) { // 第3位是 SPT_Suf, 则是特殊牌
            ret.push(tiles.substring(0, 3));
            tiles = tiles.substring(3);
        } else {
            ret.push(tiles.substring(0, 2));
            tiles = tiles.substring(2);
        }
    }
    return ret;
}

/**
 * 计算手牌为 tiles 时的和牌型
 * @example
 * // return 1
 * calchupai('11122233344455z')
 * @example
 * // return 3
 * calchupai('19m19p19s11234567z')
 * // return 0, 因为牌少一张, 处于待牌状态, 不是和牌型
 * calchupai('19m19p19s1234567z')
 * @param {string[]} tiles - 手牌
 * @param {boolean} [type] - 是否可能没有百搭牌, 默认为可能有百搭牌
 * @returns {number}
 * - 0: 不是和牌型
 * - 1: 一般型和牌
 * - 2: 七对子和牌
 * - 3: 国士型和牌
 * - 4: 国标中全不靠和牌(不含组合龙)
 * - 5: 国标中全不靠和牌(含有组合龙)
 * - 6-11: 国标中不含全不靠的组合龙和牌
 * - 12: 一番街古役: 十三不搭
 */
function calchupai(tiles, type = false) {
    let cnt = [], tmp = [];
    for (let i = Cbd; i <= C7z; i++) // 是 Cbd 而不是 C1m 是因为百搭牌
        cnt[i] = tmp[i] = 0;
    for (let i in tiles)
        cnt[tiletoint(tiles[i])]++;

    if (is_guobiao() && tiles.indexOf(Huapai) !== -1)  // 国标无法听花牌, 有花牌一定不是和牌型
        return 0;

    if (is_wanxiangxiuluo() && cnt[Cbd] === 1 && !type) {
        let tmp_tiles = [];
        for (let i in tiles)
            if (tiles[i] !== Tbd)
                tmp_tiles.push(tiles[i]);
        for (let i = 1; i <= 34; i++) { // 百搭牌试所有牌
            tmp_tiles.push(inttotile(i));
            let result = calchupai(tmp_tiles, true);
            if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                return result;
            tmp_tiles.pop();
        }
        return 0;
    }

    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] >= 2) { // 假设雀头, 则剩下的只有4个面子
            cnt[i] -= 2;
            let ok = true; // 先假设能和, 再依条件否定
            for (let j = C1m; j <= C7z; j++)
                tmp[j] = cnt[j];
            tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;

            for (let k = 1; k <= 3; k++) {
                for (let j = k * 9 - 8; j !== 0; j = nxt2[j]) {
                    if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                    // j, nxt2[j], nxt2[nxt2[j]] 构成顺子, 三个一组减去
                    tmp[nxt2[j]] -= tmp[j];
                    tmp[nxt2[nxt2[j]]] -= tmp[j];
                }
                tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;
            }
            // 若字牌不能构成暗刻
            for (let j = C1z; j <= C7z; j++)
                if (tmp[j] % 3 !== 0)
                    ok = false;

            cnt[i] += 2;
            if (ok)
                return 1;
        }
    }

    // 七对子
    let duizi = 0;
    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] === 2)
            duizi++;
        // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
        if (cnt[i] >= 4 && cnt[i] % 2 === 0 && (is_chuanma() || is_guobiao()))
            duizi += cnt[i] / 2;
    }
    if (duizi === 7)
        return 2;

    // 国士无双
    let guoshi = true;
    for (let i = C1m; i <= C7z; i++) {
        if (judgetile(inttotile(i), 'Y')) {
            if (cnt[i] === 0) // 所有幺九牌都至少有一张
                guoshi = false;
        } else if (cnt[i] > 0) // 存在非幺九牌
            guoshi = false;
    }
    if (guoshi)
        return 3;

    if (is_guobiao() && tiles.length === 14) { // 国标的全不靠和七星不靠
        let quanbukao = true;
        for (let i = C1m; i <= C7z; i++)
            if (cnt[i] >= 2)
                quanbukao = false;
        // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
        let jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        for (let j = 0; j <= 2; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[j * 9 + i + 1] === 1)
                    jin_huase[j][i % 3] = true;

        // jin_huase 的每一行, 每一列都最多只有一个 true
        for (let i = 0; i <= 2; i++) {
            let true_cnt_row = 0, true_cnt_col = 0;
            for (let j = 0; j <= 2; j++) {
                if (jin_huase[i][j]) // 扫描每一行
                    true_cnt_row++;
                if (jin_huase[j][i]) // 扫描每一列
                    true_cnt_col++;
            }
            if (true_cnt_row >= 2 || true_cnt_col >= 2)
                quanbukao = false;
        }
        if (quanbukao) {
            let zuhelong = true; // 是否复合组合龙
            for (let j = 0; j <= 2; j++)
                for (let i = 0; i <= 2; i++)
                    if (jin_huase[j][i])
                        if (!(cnt[j * 9 + 1 + i] === 1 && cnt[j * 9 + 4 + i] === 1 && cnt[j * 9 + 7 + i] === 1))
                            zuhelong = false;
            if (!zuhelong)
                return 4;
            else
                return 5;
        }
    }
    if (is_guobiao() && tiles.length >= 11) { // 国标不含全不靠的组合龙
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        let flag = [true, true, true, true, true, true];
        for (let j in condition)
            for (let i in condition[j])
                if (cnt[condition[j][i]] === 0)
                    flag[j] = false;

        for (let row in condition) {
            if (flag[row]) {
                let new_tiles = tiles.slice();
                for (let i in condition[row])
                    for (let j in new_tiles)
                        if (new_tiles[j] === inttotile(condition[row][i])) {
                            new_tiles.splice(parseInt(j), 1);
                            break;
                        }
                if (calchupai(new_tiles) === 1)
                    return 6 + parseInt(row);
            }
        }
    }
    if (is_yifanjieguyi() && tiles.length === 14) {
        let shisanbuda = true;
        let duizi_num = 0;
        for (let i = C1m; i <= C7z; i++) {
            if (cnt[i] === 2)
                duizi_num++;
            if (cnt[i] >= 3)
                shisanbuda = false;
        }
        if (duizi_num !== 1)
            shisanbuda = false;

        for (let j = 0; j <= 2; j++)
            for (let i = 1; i <= 7; i++)
                if (cnt[j * 9 + i] >= 1)
                    if (cnt[j * 9 + i + 1] !== 0 || cnt[j * 9 + i + 2] !== 0)
                        shisanbuda = false;
        if (shisanbuda)
            return 12;
    }
    return 0;
}

/**
 * 计算 seat 号玩家的所有听牌
 * @example
 * // return [{tile: '6m'}, {tile: '9m'}]
 * // 当 playertiles[0] 为 separate('1122335577889m')
 * calctingpai(0)
 * @param {number} seat - seat 号玩家
 * @param {boolean} [type] - 是否考虑听第5张(无虚听), 默认不考虑
 * @returns {{tile: string}[]}
 */
function calctingpai(seat, type = false) {
    if (is_chuanma() && huazhu(seat))
        return [];
    let tiles = playertiles[seat];
    let cnt = [];
    for (let i = Cbd; i <= C7z; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tiletoint(tiles[i])]++;

    if (is_guobiao() && tiles.indexOf(Huapai) !== -1) // 国标无法听花牌, 有花牌一定不是听牌型
        return [];

    let ret = [];
    for (let i = C1m; i <= C7z; i++) { // 试所有牌作为听牌, 检查是否为和牌型
        tiles.push(inttotile(i));
        cnt[i]++;
        // cnt[i] <= 4 为了除去虚听
        if ((cnt[i] <= 4 || type) && calchupai(tiles) !== 0 && calchupai(tiles) !== 12)
            ret.push({tile: inttotile(i)});

        tiles.pop();
        cnt[i]--;
    }
    return ret;
}

// ==========================================

/**
 * 获取最近操作信息, 忽略 RecordChangeTile, RecordSelectGap, RecordGangResult, RecordFillAwaitingTiles 这几个操作
 * @param {number} [num] - 倒数第 num 个操作, 默认为1
 * @returns {{name: string, data: {}}}
 */
function getlstaction(num = 1) {
    if (actions.length !== 0) {
        let ret = actions.length;
        for (let i = 0; i < num; i++) {
            ret--;
            while (actions[ret] !== undefined && (actions[ret].name === 'RecordChangeTile' || actions[ret].name === 'RecordSelectGap' || actions[ret].name === 'RecordGangResult' || actions[ret].name === 'RecordFillAwaitingTiles'))
                ret--;
        }
        return actions[ret];
    } else
        return editdata.actions[editdata.actions.length - 1][editdata.actions[editdata.actions.length - 1].length - 1];
}

// 复原以查看真实牌谱
function resetpaipu() {
    if (checkPaiPu !== undefined)
        GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config, is_maka) {
            return checkPaiPu.call(this, game_uuid, account_id, paipu_config, is_maka);
        }
    if (resetData !== undefined)
        uiscript.UI_Replay.prototype.resetData = function () {
            return resetData.call(this);
        }
    if (showRecord !== undefined)
        uiscript.UI_Win.prototype.showRecord = function (K) {
            return showRecord.call(this, K);
        }
    if (showInfo_record !== undefined)
        uiscript.UI_Win.prototype._showInfo_record = function (K) {
            return showInfo_record.call(this, K);
        }
    if (setFanFu !== undefined)
        uiscript.UI_Win.prototype.setFanFu = function (B, K) {
            return setFanFu.call(this, B, K);
        }
}

// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// 编辑自制牌谱时, 除非知道自己在做什么, 否则不建议修改下面的所有变量与函数, 或仅限只读

/**
 * 玩家数, 有效值2, 3, 4, 默认为4
 * @type {number}
 */
let playercnt;
/**
 * 玩家终局信息, 有效长度为玩家数, 不超过4
 * @type {{seat:number, part_point_1: number, total_point: number}[]}
 */
let players;
/**
 * 立直所需要的棒子数, 默认为1
 * @type {number}
 */
let liqi_need;
/**
 * 本场点数的倍数, 默认为1
 * @type {number}
 */
let ben_times;
/**
 * 荒牌流局罚符(未听牌玩家向听牌玩家支付的点数), 默认为段位场配置
 * @type {number}
 */
let fafu_1ting, fafu_2ting, fafu_3ting, fafu_3p_1ting, fafu_3p_2ting, fafu_2p;
/**
 * chang: 场(东/南/西/北对应0/1/2/3), ju: 局(东1/2/3/4对应0/1/2/3), ben: 本场数, liqibang: 场上立直棒个数, benchangbang: 原子化的本场棒个数
 * @type {number}
 */
let chang, ju, ben, liqibang, benchangbang;
/**
 * 玩家的切牌集合和摸牌集合, 算法使用侧, 有效长度为玩家数, 不超过4
 * @type {[string][]}
 */
let discardtiles, dealtiles;
/**
 * 玩家的副露信息, 一维有效长度为玩家数, 不超过4
 * @type {[{type: number, tile: string[], from: number|undefined}][]}
 */
let fulu;
/**
 * 玩家的副露信息, 一维有效长度为玩家数, 不超过4
 * @type {{liujumanguan: boolean, tiles: string[]}[]}
 */
let paihe;
/**
 * 玩家的巡目, 对应的数字是在 actions 中的下标, 一维有效长度为玩家数, 不超过4
 * @type {[number][]}
 */
let xun;
/**
 * 立直信息, 有效长度为玩家数, 不超过4
 * @type {{liqi: number, yifa: number, kai: number, beishui_type: number|undefined}[]}
 */
let liqiinfo;
/**
 * lstliqi: 宣言立直的玩家信息
 * @type {{seat: number, type: number, kai: number, beishui_type: number}|null}
 */
let lstliqi;
/**
 * 宝牌指示牌(表和里各5张)
 * @type {string[]}
 */
let doras, li_doras;
/**
 * 表里dora数量, 及最近类型: 1表示即翻指示牌(暗杠), 2表示过一个操作才翻指示牌(明杠), bonus 是幻境传说模式下能否多一个dora的表现
 * @type {{cnt: number, licnt: number, lastype: number, bonus: number}}
 */
let doracnt;
/**
 * 各家点数变动
 * @type {number[]}
 */
let delta_scores;
/**
 * 各家原点分数, 默认为25000
 * @type {number}
 */
let base_points;
/**
 * drawtype: 摸牌方向: 1 表示正常摸牌, 0 表示岭上摸牌, lstdrawtype: 最近玩家摸牌方向
 * @type {number}
 */
let drawtype, lstdrawtype;
/**
 * 最终要注入到牌谱回放中的内容的内容, 每小局结束后 push 到 editdata.actions 中并清空
 * @type {{name: string, data: {}}[]}
 */
let actions;
/**
 * 血战到底/血流成河: 玩家和牌历史
 * @type {{}[]}
 */
let hules_history;
/**
 * 玩家是否已和牌, 有效长度为玩家数, 不超过4
 * @type {boolean[]}
 */
let hupaied;
/**
 * 玩家的包牌信息, 有效长度为玩家数, 不超过4
 * @type {[{seat: number, val: number}][]}
 */
let baopai;
/**
 * 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌), 有效长度为玩家数, 不超过4
 * @type {boolean[]}
 */
let sigangbao;
/**
 * 包杠的玩家, 无人包杠则为-1
 * @type {number}
 */
let baogangseat;
/**
 * 配牌明牌: 玩家所亮明的牌, number 为牌的数字编码, 有效长度为玩家数, 不超过4
 * @type {[number][]}
 */
let mingpais;
/**
 * 龙之目玉: 中的目玉信息
 * @type {{id: number, seat: number, count: number, count_max: number}}
 */
let muyu;
/**
 * 龙之目玉: 打点的倍数, 只有有目玉的玩家为2, 其他都为1, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let muyutimes;
/**
 * 川麻: 第一位和牌玩家的 seat, 第一局为-1
 * @type {number}
 */
let juc;
/**
 * 川麻: 玩家的定缺, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let gaps;
/**
 * 川麻: 开杠刮风下雨, over 是已经收取点数的部分, notover 是可能会被枪杠的部分, 通过后会转为 over
 * @type {{over: {from: number, to: number, val: number}[], notover: {from: number, to: number, val: number}[]}}
 */
let chuanmagangs;
/**
 * 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let spell_hourglass;
/**
 * 魂之一击: 各家立直信息
 * @type {{seat: number, liqi:number, continue_deal_count: number, overload: boolean}[]}
 */
let hunzhiyiji_info;
/**
 * 咏唱之战: 各家舍牌手摸切信息
 * @type {[boolean][]}
 */
let shoumoqie;
/**
 * 咏唱之战: 各家舍牌手摸切最大长度和bonus
 * @type {{seat: number, moqie_count:number, moqie_bonus: number, shouqie_count: number, shouqie_bonus: number}[]}
 */
let yongchang_data;
/**
 * 占星之战: 牌候选池, 通常长度为3
 * @type {string[]}
 */
let awaiting_tiles;
/**
 * 庄家连续和牌连庄数量, 用于八连庄
 * @type {number}
 */
let lianzhuangcnt;
/**
 * 国标玩家是否已错和, 长度为4
 * @type {boolean[]}
 */
let cuohu;
/**
 * 各种振听, 有效长度为玩家数, 不超过4
 *
 * 造成振听的因素
 * 1. 自家牌河中有听的牌(qiepai)
 * 2. 其他家切牌(qiepai), 加杠(leimingpai), 拔北(leimingpai), 暗杠(国士, leimingpai)有听的牌
 *
 * 只有切牌的时候会解除舍张振听
 * 只有在摸牌和自家鸣牌的时候会解除同巡振听
 * 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
 * @type {boolean[]}
 */
let pretongxunzt, prelizhizt, shezhangzt, tongxunzt, lizhizt, zhenting;
/**
 * 玩家当时的手牌, 一维长度为玩家数, 不超过4
 * @type {[string][]}
 */
let playertiles;
/**
 * 完成编辑后的所有信息集合
 * @type {{actions: [{name: string, data: {}}][], xun: [[number]][], players: {}[], config: {}, player_datas: {}[]}}
 */
let editdata;

// ===========================================

/**
 * 亲家起手牌数量和闲家起手牌数量
 * @constant
 * @default
 */
const Qin_tiles_num = 14, Xian_tiles_num = 13;
/**
 * 常用牌的数字编码
 * @constant
 * @default
 */
const C1m = 1, C9m = 9, C1p = 10, C9p = 18, C1s = 19, C9s = 27, C1z = 28, C4z = 31, C5z = 32, C7z = 34, C0m = 35,
    C0p = 36, C0s = 37, C5m = 5, C5p = 14, C5s = 23;
/**
 * 特殊牌的后缀
 * @constant
 * @default
 */
const SPT_Suf = 't';
/**
 * 特殊牌和普通牌数字编码的差值
 * @constant
 * @default
 */
const SPT_Offset = 40;
/**
 * 万象修罗百搭牌编码
 * @constant
 * @default
 */
const Tbd = 'bd';
/**
 * 万象修罗百搭牌数字编码
 * @constant
 * @default
 */
const Cbd = 0;
/**
 * 国标麻将起和番
 * @constant
 * @default
 */
const GB_Qihu = 8;
/**
 * 国标麻将花牌的编码
 * @constant
 * @default
 */
const Huapai = '0m';
/**
 * 顺子中比它大的牌, 如果某张牌的数字编码(不区分红宝牌)为 i, 则由它构成的顺子中比它大1的牌的数字编码为 nxt2[i]
 *
 * 故可得出 即 j, nxt2[j], nxt2[nxt2[j]] 构成递增的顺子
 *
 * 如果不存在, 则指向 35, 36
 *
 * 数组长度为37
 * @constant
 * @default
 */
const nxt2 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 35, 11, 12, 13, 14, 15, 16, 17, 18, 35, 20, 21, 22, 23, 24, 25, 26, 27, 35, 35, 35, 35, 35, 35, 35, 35, 36, 0];
/**
 * 宝牌指示牌表, 如果某张指示牌的数字编码(不区分红宝牌)为 i, 则它对应的宝牌的数字编码为 doranxt[i]
 *
 * 数组长度35
 * @constant
 * @default
 */
const doranxt = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18, 10, 20, 21, 22, 23, 24, 25, 26, 27, 19, 29, 30, 31, 28, 33, 34, 32];

// ===========================================

/**
 * 使 gamebegin 每个牌谱只运行一次的变量
 * @type {boolean}
 */
let gamebegin_once;

// 只在一开局生效或者整个对局期间都不会变化的值的初始化
function gamebegin() {
    editdata.config = config;
    editdata.player_datas = player_datas;

    if (config.mode.mode >= 10 && config.mode.mode <= 29) { // 三麻, 二麻屏蔽以下模式
        if (is_xuezhandaodi() || is_wanxiangxiuluo())
            config.mode.detail_rule.wanxiangxiuluo_mode = config.mode.detail_rule.xuezhandaodi = false;
        if (is_muyu())
            config.mode.detail_rule.muyu_mode = false;
        if (is_chuanma())
            config.mode.detail_rule.chuanma = false;
    }
    if (config.mode.mode >= 20)
        playercnt = 2;
    else if (config.mode.mode >= 10 && config.mode.mode <= 19)
        playercnt = 3;
    else
        playercnt = 4;

    ben_times = liqi_need = 1;
    fafu_1ting = 3000;
    fafu_3p_1ting = 2000;
    fafu_2ting = 1500;
    fafu_2p = fafu_3p_2ting = fafu_3ting = 1000;
    if (typeof config.mode.detail_rule._liqi_need == 'number')
        liqi_need = config.mode.detail_rule._liqi_need;
    else if (get_field_spell_mode3() === 2) // 幻境传说: 命运卡2
        liqi_need = 2;
    else
        liqi_need = 1;
    if (typeof config.mode.detail_rule._ben_times == 'number')
        ben_times = config.mode.detail_rule._ben_times;
    else
        ben_times = 1;

    if (typeof config.mode.detail_rule._fafu_1ting == 'number')
        fafu_1ting = config.mode.detail_rule._fafu_1ting;
    else
        fafu_1ting = 1000;
    if (typeof config.mode.detail_rule._fafu_2ting == 'number')
        fafu_2ting = config.mode.detail_rule._fafu_2ting;
    else
        fafu_2ting = 1500;
    if (typeof config.mode.detail_rule._fafu_3ting == 'number')
        fafu_3ting = config.mode.detail_rule._fafu_3ting;
    else
        fafu_3ting = 3000;
    if (typeof config.mode.detail_rule._fafu_3p_1ting == 'number')
        fafu_3p_1ting = config.mode.detail_rule._fafu_3p_1ting;
    else
        fafu_3p_1ting = 1000;
    if (typeof config.mode.detail_rule._fafu_3p_2ting == 'number')
        fafu_3p_2ting = config.mode.detail_rule._fafu_3p_2ting;
    else
        fafu_3p_2ting = 2000;
    if (typeof config.mode.detail_rule._fafu_2p == 'number')
        fafu_2p = config.mode.detail_rule._fafu_2p;
    else
        fafu_2p = 2000;

    chang = ju = ben = liqibang = lianzhuangcnt = 0;
    juc = -1;
    if (config.mode.detail_rule._chang_ju_ben_num_ instanceof Array) {
        [chang, ju, ben, liqibang] = config.mode.detail_rule._chang_ju_ben_num_;
        if (typeof liqibang != 'number')
            liqibang = 0;
        if (typeof chang != 'number' || typeof ju != 'number' || typeof ben != 'number' || chang < 0 || chang > 4 || ju < 0 || ju > playercnt)
            throw new Error(`_chang_ju_ben_num_ 参数不合规: ${config.mode.detail_rule._chang_ju_ben_num_}`);
    }

    let init_point = undefined;
    if (typeof config.mode.detail_rule.init_point == 'number')
        init_point = config.mode.detail_rule.init_point;
    if (init_point !== undefined) {
        scores = [];
        for (let i = 0; i < playercnt; i++)
            scores.push(init_point);
    } else if (playercnt === 2) { // 二麻
        scores = [50000, 50000];
    } else if (playercnt === 3) { // 三麻
        scores = [35000, 35000, 35000];
    } else { // 四麻
        if (is_guobiao()) {
            scores = [300, 300, 300, 300];
            for (let i = 0; i < playercnt; i++)
                scores[i] *= scale_points();
        } else if (is_chuanma() || is_tianming())
            scores = [50000, 50000, 50000, 50000];
        else if (is_muyu())
            scores = [40000, 40000, 40000, 40000];
        else if (is_dora3())
            scores = [35000, 35000, 35000, 35000];
        else
            scores = [25000, 25000, 25000, 25000];
    }
    base_points = scores[0];

    if (config.mode.detail_rule._scores_ instanceof Array)
        scores = config.mode.detail_rule._scores_;

    gamebegin_once = false;
}

// 大部分数据初始化
function init() {
    actions = [];
    muyutimes = [1, 1, 1, 1];
    muyu = {id: 0, seat: 0, count: 5, count_max: 5};
    xun = [[], [], [], []];
    gaps = [];
    baopai = [[], [], [], []];
    lstliqi = null;
    mingpais = [[], [], [], []];
    chuanmagangs = {over: [], notover: []};
    doracnt = {cnt: 1, licnt: 1, lastype: 0, bonus: 0};
    hupaied = [false, false, false, false];
    hules_history = [];
    fulu = [[], [], [], []];
    paihe = [
        {liujumanguan: true, tiles: []},
        {liujumanguan: true, tiles: []},
        {liujumanguan: true, tiles: []},
        {liujumanguan: true, tiles: []}
    ];
    liqiinfo = [
        {liqi: 0, yifa: 1, kai: 0},
        {liqi: 0, yifa: 1, kai: 0},
        {liqi: 0, yifa: 1, kai: 0},
        {liqi: 0, yifa: 1, kai: 0},
    ];
    lstdrawtype = drawtype = 1;

    baogangseat = -1;
    shezhangzt = [false, false, false, false];
    pretongxunzt = [false, false, false, false];
    prelizhizt = [false, false, false, false];
    tongxunzt = [false, false, false, false];
    lizhizt = [false, false, false, false];
    zhenting = [false, false, false, false];
    sigangbao = [false, false, false, false];
    spell_hourglass = [0, 0, 0, 0];
    hunzhiyiji_info = [
        {seat: 0, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 1, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 2, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 3, liqi: 0, continue_deal_count: 0, overload: false},
    ];
    shoumoqie = [[], [], [], []];
    yongchang_data = [
        {seat: 0, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 1, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 2, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 3, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
    ];
    awaiting_tiles = [];
    cuohu = [false, false, false, false];

    discardtiles = [[], [], [], []];
    dealtiles = [[], [], [], []];
    for (let i = 0; i < playercnt; i++)
        discardtiles[i] = separate(qiepaiset[i]);
    for (let i = 0; i < playercnt; i++)
        dealtiles[i] = separate(mopaiset[i]);
    delta_scores = [];
    for (let i = 0; i < playercnt; i++)
        delta_scores[i] = 0;

    if (paishan.length === 0)
        randompaishan();
    doras = [];
    li_doras = [];
    for (let i = 0; i < 5; i++) {
        doras.push(paishan[paishan.length - (21 - 4 * playercnt + 2 * i)]);
        li_doras.push(paishan[paishan.length - (22 - 4 * playercnt + 2 * i)]);
    }

    let tiles = [separate(tiles0), separate(tiles1), separate(tiles2), separate(tiles3)];
    if (tiles[0].length === 0 && tiles[1].length === 0 && tiles[2].length === 0 && tiles[3].length === 0) { // 没有给定起手, 则模仿现实中摸牌
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < playercnt; j++)
                for (let k = 0; k < 4; k++)
                    tiles[j].push(paishan.shift());
        for (let i = 0; i < playercnt; i++)
            tiles[i].push(paishan.shift());
        tiles[0].push(paishan.shift());

        tiles = tiles.slice(ju, playercnt).concat(tiles.slice(0, ju));
    }
    for (let i = 0; i < playercnt; i++) {
        tiles[i].sort(cmp);
        playertiles[i] = tiles[i];
    }
}

// 玩家的巡目所对应的操作位置
function calcxun() {
    for (let i = 0; i < playercnt; i++)
        if (playertiles[i].length % 3 === 2 && !hupaied[i])
            xun[i].push(actions.length - 1);
}

/**
 * 计算表指示牌
 * @returns {string[]}
 */
function calcdoras() {
    doracnt.cnt = Math.min(doracnt.cnt, 5);
    doracnt.licnt = Math.min(doracnt.licnt, 5);
    if (no_ganglidora())
        doracnt.licnt = 1;
    if (no_gangdora())
        doracnt.cnt = doracnt.licnt = 1;
    if (no_lidora())
        doracnt.licnt = 0;
    if (is_chuanma() || is_guobiao() || no_dora())
        doracnt.cnt = doracnt.licnt = 0;
    let doras0 = [];
    for (let i = 0; i < doracnt.cnt; i++)
        doras0[i] = doras[i];
    return doras0;
}

// ===========================================

/**
 * tile 编码转换为数字编码
 * @param {string} tile - 输入的牌
 * @param {boolean} [type] - 是否区分红宝牌, 默认不区分
 * @param {boolean} [sptile] - 是否区分以 SPT_Suf 结尾的特殊牌, 默认不区分
 * @returns {number}
 */
function tiletoint(tile, type = false, sptile = false) {
    if (tile === Tbd) // 万象修罗百搭牌
        return 0;
    if (!sptile || tile.length <= 2) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35;
            if (tile[1] === 'p')
                return 36;
            if (tile[1] === 's')
                return 37;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile);
        if (tile[1] === 'p')
            return 9 + parseInt(tile);
        if (tile[1] === 's')
            return 18 + parseInt(tile);
        if (tile[1] === 'z')
            return 27 + parseInt(tile);
    } else if (tile[2] === SPT_Suf) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35 + SPT_Offset;
            if (tile[1] === 'p')
                return 36 + SPT_Offset;
            if (tile[1] === 's')
                return 37 + SPT_Offset;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile) + SPT_Offset;
        if (tile[1] === 'p')
            return 9 + parseInt(tile) + SPT_Offset;
        if (tile[1] === 's')
            return 18 + parseInt(tile) + SPT_Offset;
        if (tile[1] === 'z')
            return 27 + parseInt(tile) + SPT_Offset;
    }
    throw new Error(roundinfo() + `tiletoint 输入不合规: ${tile}`);
}

/**
 * 数字编码转换为 tile 编码
 * @param {number} x - 数字编码
 * @param {boolean} [type] - 是否生成带 SPT_Suf 结尾的特殊牌
 * @returns {string}
 */
function inttotile(x, type = false) {
    if (x === 0)
        return Tbd;
    if (!type) {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm';
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p';
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's';
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z';
        if (x === 35)
            return '0m';
        if (x === 36)
            return '0p';
        if (x === 37)
            return '0s';
    } else {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm' + SPT_Suf;
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p' + SPT_Suf;
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's' + SPT_Suf;
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z' + SPT_Suf;
        if (x === 35)
            return '0m' + SPT_Suf;
        if (x === 36)
            return '0p' + SPT_Suf;
        if (x === 37)
            return '0s' + SPT_Suf;
    }
    throw new Error(roundinfo() + `inttotile 输入不合规: ${x}`);
}

/**
 * 手牌理牌算法
 * @param {string} x - tile x
 * @param {string} y - tile y
 * @returns {number}
 */
function cmp(x, y) {
    return tiletoint(x) - tiletoint(y);
}

// ===========================================

/**
 * 更新 seat 号玩家的舍张振听状态
 * @param {number} seat - seat 号玩家
 */
function update_shezhangzt(seat) {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        shezhangzt[seat] = false;
        let tingpais = calctingpai(seat);
        for (let i in tingpais)
            for (let j in paihe[seat].tiles)
                if (equaltile(tingpais[i].tile, paihe[seat].tiles[j]))
                    shezhangzt[seat] = true;
        update_zhenting();
    }
}

/**
 * 更新同巡和立直预振听, leimingpai 不会造成舍张振听, 所以只有同巡和立直,
 * 此外, 暗杠只有国士听牌才有可能导致其他玩家振听
 * @param {number} seat - seat 号玩家
 * @param {string} tile - 相关操作的牌
 * @param {boolean} [is_angang] - 是否为暗杠
 */
function update_prezhenting(seat, tile, is_angang = false) {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 同巡振听预判断
        for (let i = 0; i < playercnt; i++) {
            if (i === seat)
                continue;
            let tingpais_i = calctingpai(i);
            for (let j in tingpais_i)
                if (equaltile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        pretongxunzt[i] = true;
                        break;
                    } else {
                        let tiles = playertiles[i];
                        tiles.push(tile);
                        if (calchupai(tiles) === 3) {
                            pretongxunzt[i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
        // 立直振听预判断
        for (let i = 0; i < playercnt; i++) {
            if (liqiinfo[i].liqi === 0)
                continue;
            let tingpais_i = calctingpai(i);
            for (let j in tingpais_i)
                if (equaltile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        prelizhizt[i] = true;
                        break;
                    } else {
                        let tiles = playertiles[i];
                        tiles.push(tile);
                        if (calchupai(tiles) === 3) {
                            prelizhizt[i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
    }
}

// 更新振听状态
function update_zhenting() {
    for (let i = 0; i < playercnt; i++)
        zhenting[i] = shezhangzt[i] || tongxunzt[i] || lizhizt[i];
}

// ===========================================

/**
 * 配牌明牌, 如果有明的牌则去掉, 返回 true, 没有则返回 false
 * @param {number} seat - seat 号玩家
 * @param {string} tile - 牌的种类
 * @returns {boolean}
 */
function erasemingpai(seat, tile) {
    if (mingpais[seat][tiletoint(tile, true)] > 0) {
        mingpais[seat][tiletoint(tile, true)]--;
        return true;
    }
    return false;
}

/**
 * 龙之目玉, 更新目玉
 * @param {boolean} [type] - 更新类型, true 表示生成新目玉, false 表示计数, 默认为 false
 */
function update_muyu(type = false) {
    if (type) {
        muyu.id++;
        muyu.count = 5;
        if (muyuseats.length > 0) {
            muyu.seat = parseInt(muyuseats[0]);
            muyuseats = muyuseats.substring(1);
        } else
            muyu.seat = Math.floor(Math.random() * playercnt);
        muyutimes = [1, 1, 1, 1];
        muyutimes[muyu.seat]++;
    } else
        muyu.count--;
}

/**
 * 川麻, 判断 seat 玩家是否花猪
 * @param {number} seat - seat 号玩家
 * @returns {boolean}
 */
function huazhu(seat) {
    // 注意 gaps 的 012 分别对应 pms, 而不是 mps
    for (let i in playertiles[seat]) { // 查手牌
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    for (let i in fulu[seat]) { // 查副露
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    return false;
}

/**
 * 幻境传说, 判断 tile 是否为 dora
 * @param {string} tile - 牌
 * @returns {boolean}
 */
function is_dora(tile) {
    if (tile[0] === '0')
        return true;
    let doras0 = calcdoras();
    for (let i in doras0)
        if (tiletoint(tile) === doranxt[tiletoint(doras0[i])])
            return true;
    return false;
}

/**
 * 天命之战, 有多少天命牌
 * @param {number} seat - seat 号玩家
 * @param {boolean} zimo - 是否为自摸
 * @returns {number}
 */
function calctianming(seat, zimo) {
    let sum = 1;
    for (let i in playertiles[seat]) { // 查手牌
        if (!zimo && i === playertiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (playertiles[seat][i].length >= 2 && playertiles[seat][i][2] === SPT_Suf)
            sum++;
    }
    for (let i in fulu[seat]) // 查副露
        for (let j in fulu[seat][i].tile) {
            if (fulu[seat][i].type !== 3 && j === fulu[seat][i].tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (fulu[seat][i].tile[j].length > 2 && fulu[seat][i].tile[j][2] === SPT_Suf)
                sum++;
        }
    return sum;
}

/**
 * 咏唱之战, 更新 seat 号玩家手摸切信息
 * @param {number} seat - seat 号玩家
 */
function update_shoumoqie(seat) {
    for (let k = 0; k < 2; k++) { // k 为 0 表示摸切, 为 1 表示手切
        let flag = !!k, len = 0;
        for (let i = 0; i < shoumoqie[seat].length; i++)
            if (shoumoqie[seat][i] === flag) {
                let j = i + 1;
                while (shoumoqie[seat][j] === flag && j < shoumoqie[seat].length)
                    j++;
                len = Math.max(len, j - i);
                i = j + 1;
            }
        yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'] = len;
        yongchang_data[seat][flag ? 'shouqie_bonus' : 'moqie_bonus'] = calcyongchang(seat, flag);
    }

    /**
     * 咏唱之战, 计算 seat 号玩家的奖励番(绯, 苍)
         * @param {number} seat - seat 号玩家
     * @param {boolean} flag - 计算类型, false 表示摸切, true 表示手切
     * @returns {number}
     */
    function calcyongchang(seat, flag) {
        const val = yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'];
        if (!flag) { // 摸切
            if (val < 3)
                return 0;
            else if (val < 5)
                return 1;
            else if (val < 7)
                return 2;
            else if (val < 9)
                return 3;
            else if (val < 12)
                return 5;
            else
                return 12;
        } else { // 手切
            if (val < 3)
                return 0;
            else if (val < 6)
                return 1;
            else if (val < 9)
                return 2;
            else if (val < 12)
                return 3;
            else if (val < 18)
                return 5;
            else
                return 12;
        }
    }
}

// ===========================================

/**
 * hupaioneplayer 组 - 立直
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
function hupaioneplayer(seat) {
    /**
     * 点数切上到整百
         * @param {number} point - 原点数
     * @returns {number}
     */
    function qieshang(point) {
        return Math.ceil(point / 100) * 100;
    }

    let lstaction = getlstaction(), zimo = false;
    if (lstaction.name === 'RecordDealTile' || lstaction.name === 'RecordNewRound')
        zimo = true;
    else if (lstaction.name === 'RecordDiscardTile' || lstaction.name === 'RecordRevealTile' || lstaction.name === 'RecordLockTile')
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === 'RecordBaBei')
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === 'RecordAnGangAddGang')
        playertiles[seat].push(lstaction.data.tiles);
    let fangchong;
    if (!zimo)
        fangchong = lstaction.data.seat;

    if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong].liqi !== 0)
        hunzhiyiji_info[fangchong].overload = true;

    let ming = [];
    for (let i in fulu[seat]) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (fulu[seat][i].type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    let qinjia = seat === ju;
    let liqi = liqiinfo[seat].liqi !== 0;
    let hand = playertiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    let points = calcfan(seat, zimo, fangchong);
    let sudian = calcsudian(points);
    let val = 0, title_id = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    if (!is_qingtianjing()) {
        if (points.yiman)
            title_id = val + 4;
        else if (sudian === 8000)
            title_id = 11;
        else if (sudian === 6000)
            title_id = 4;
        else if (sudian === 4000)
            title_id = 3;
        else if (sudian === 3000)
            title_id = 2;
        else if (sudian === 2000)
            title_id = 1;
    }
    // -------------------------------------------
    let tianming_bonus = 1;
    if (is_tianming())
        tianming_bonus = calctianming(seat, zimo);
    // -------------------------------------------
    let zhahu = false;
    if (calchupai(playertiles[seat]) === 0 || sudian === -2000)
        zhahu = true;
    if ((calchupai(playertiles[seat]) !== 3 || no_guoshiangang()) && lstaction.name === 'RecordAnGangAddGang' && lstaction.data.type === 3)
        zhahu = true;
    if (!zimo && zhenting[seat])
        zhahu = true;
    if (lstaction.name === 'RecordRevealTile' || lstaction.name === 'RecordLockTile' && lstaction.data.lock_state !== 0)
        zhahu = true;
    let point_rong, point_sum, point_zimo_qin, point_zimo_xian;

    let doras0 = calcdoras();
    let li_doras0 = [];
    if (liqiinfo[seat].liqi !== 0)
        for (let i = 0; i < doracnt.licnt; i++)
            li_doras0[i] = li_doras[i];

    if (zhahu) {
        [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcpoint(-2000);
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            let delta_point = 0;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyutimes[i] * muyutimes[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyutimes[i] * muyutimes[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        let ret = {
            count: 0,
            doras: doras0,
            li_doras: li_doras0,
            fans: [{val: 0, id: 9000}],
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: liqi,
            ming: ming,
            point_rong: -point_rong,
            point_sum: -point_sum,
            point_zimo_qin: -point_zimo_qin,
            point_zimo_xian: -point_zimo_xian,
            qinjia: qinjia,
            seat: seat,
            title_id: 1,
            yiman: false,
            zimo: zimo,
        }
        playertiles[seat].pop();
        if (is_xuezhandaodi() || is_wanxiangxiuluo() || playercnt === 2)
            ret.dadian = -delta_scores[seat];
        return ret;
    }

    [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcpoint(sudian);
    point_rong = qieshang(point_rong) * tianming_bonus;
    point_sum = qieshang(point_sum) * tianming_bonus;
    point_zimo_qin = qieshang(point_zimo_qin) * tianming_bonus;
    point_zimo_xian = qieshang(point_zimo_xian) * tianming_bonus;

    // 有包牌
    if (baopai[seat].length !== 0) {
        let delta_point = 0;
        let yiman_sudian = 8000;
        let baoval = 0;
        for (let j in baopai[seat])
            baoval += baopai[seat][j].val;

        let feibao_rong, feibao_zimo_qin, feibao_zimo_xian;
        [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcpoint((val - baoval) * yiman_sudian);
        feibao_rong = qieshang(feibao_rong) * tianming_bonus;
        feibao_zimo_qin = qieshang(feibao_zimo_qin) * tianming_bonus;
        feibao_zimo_xian = qieshang(feibao_zimo_xian) * tianming_bonus;

        if (zimo) {
            // 包牌部分, 包牌家全包
            for (let j in baopai[seat]) {
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    if (i === ju || seat === ju) {
                        delta_point = baopai[seat][j].val * 2 * yiman_sudian * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    } else {
                        delta_point = baopai[seat][j].val * yiman_sudian * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    }
                }
            }
            // 非包牌部分: 没有包杠, 则是一般自摸; 存在包杠, 则包杠全包
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                let equ_seat = i;
                if (baogangseat !== -1 && !hupaied[baogangseat])
                    equ_seat = baogangseat;
                if (i === ju || seat === ju) {
                    delta_point = feibao_zimo_qin * muyutimes[i] * muyutimes[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = feibao_zimo_xian * muyutimes[i] * muyutimes[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            // 包牌部分
            for (let j in baopai[seat]) {
                delta_point = baopai[seat][j].val * yiman_sudian * 2 * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                if (qinjia)
                    delta_point *= 1.5;
                delta_scores[baopai[seat][j].seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
            delta_point = (point_rong + feibao_rong) / 2 * muyutimes[fangchong] * muyutimes[seat];
            delta_scores[fangchong] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    // 无包牌情况下的包杠, 自摸全由包杠家负担
    else if (baogangseat !== -1 && !hupaied[baogangseat] && zimo) {
        let delta_point = 0;
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyutimes[i] * muyutimes[seat];
                delta_scores[baogangseat] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyutimes[i] * muyutimes[seat];
                delta_scores[baogangseat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
    }
    // 一般情况
    else {
        let delta_point = 0;
        if (zimo) {
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                if (i === ju || seat === ju) {
                    delta_point = point_zimo_qin * muyutimes[i] * muyutimes[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = point_zimo_xian * muyutimes[i] * muyutimes[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            delta_point = point_rong * muyutimes[fangchong] * muyutimes[seat];
            delta_scores[fangchong] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3 && liqiinfo[seat].liqi !== 0) {
        let diff = 300 * spell_hourglass[seat];
        if (delta_scores[seat] <= diff)
            for (let i = 0; i < playercnt; i++)
                delta_scores[i] = 0;
        else {
            delta_scores[seat] -= diff;
            if (zimo)
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat)
                        continue;
                    delta_scores[i] += diff / 3;
                }
            else
                delta_scores[fangchong] += diff;
        }
    }

    // 幻境传说: 庄家卡5
    if (get_field_spell_mode1() === 5 && seat === ju && !zimo) {
        delta_scores[seat] += points.dorabonus * 1000;
        delta_scores[fangchong] -= points.dorabonus * 1000;
    }

    calcchanggong();

    let ret = {
        count: val,
        doras: doras0,
        li_doras: li_doras0,
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: liqi,
        ming: ming,
        point_rong: point_rong,
        point_sum: point_sum,
        point_zimo_qin: point_zimo_qin,
        point_zimo_xian: point_zimo_xian,
        qinjia: qinjia,
        seat: seat,
        title_id: title_id,
        yiman: points.yiman,
        zimo: zimo,
    }
    if (is_tianming())
        ret.tianming_bonus = tianming_bonus;
    if (is_xuezhandaodi() || is_wanxiangxiuluo() || playercnt === 2)
        ret.dadian = dadian;
    playertiles[seat].pop();
    return ret;

    /**
     * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
         * @param {number} c_sudian - 素点
     * @returns {[number, number, number, number]} - 荣和, 自摸总计, 自摸收亲, 自摸收闲
     */
    function calcpoint(c_sudian) {
        let rong, sum, zimo_qin, zimo_xian;
        if (qinjia) {
            rong = 6 * c_sudian;
            sum = 6 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = 2 * c_sudian;
            if (no_zimosun())
                zimo_xian = 6 / (playercnt - 1) * c_sudian;
            else
                sum = 2 * (playercnt - 1) * c_sudian;
        } else {
            rong = 4 * c_sudian;
            sum = 4 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = c_sudian;
            if (no_zimosun()) {
                zimo_qin = (playercnt + 2) / (playercnt - 1) * c_sudian;
                zimo_xian = 3 / (playercnt - 1) * c_sudian;
            } else
                sum = playercnt * c_sudian;
        }
        return [rong, sum, zimo_qin, zimo_xian];
    }

    // 计算本场供托划分
    function calcchanggong() {
        let equ_seat = fangchong; // 等效放铳 seat
        let baopai_same_seat = true; // true 表示当前的和牌只有一种包牌, 或只有一家包牌
        let all_baopai = true; // 包牌家是否只有一家
        if (baopai[seat].length !== 0) { // 有包牌
            let baoval = 0;
            for (let i in baopai[seat]) {
                baoval += baopai[seat][i].val
                if (baopai[seat][0].seat !== baopai[seat][i].seat)
                    baopai_same_seat = false;
            }
            all_baopai = val === baoval;
        }
        // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
        if (baogangseat !== -1 && zimo && !hupaied[baogangseat])
            equ_seat = baogangseat;
        // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
        else if (baopai[seat].length !== 0 && zimo && all_baopai && baopai_same_seat)
            equ_seat = baopai[seat][0].seat;

        let delta_point;
        if (equ_seat !== undefined) {
            delta_point = (playercnt - 1) * 100 * benchangbang * ben_times;
            delta_scores[equ_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        } else {
            delta_point = 100 * benchangbang * ben_times;
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        benchangbang = 0;
        // 供托
        delta_scores[seat] += liqibang * 1000;
        liqibang = 0;
    }
}

/**
 * hupaioneplayer 组 - 川麻
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
function hupaioneplayer_chuanma(seat) {
    let lstaction = getlstaction(), zimo = false;
    if (lstaction.name === 'RecordDealTile' || lstaction.name === 'RecordNewRound')
        zimo = true;
    else if (lstaction.name === 'RecordDiscardTile')
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === 'RecordAnGangAddGang')
        playertiles[seat].push(lstaction.data.tiles);
    let fangchong;
    if (!zimo)
        fangchong = lstaction.data.seat;

    let ming = [];
    for (let i in fulu[seat]) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (fulu[seat][i].type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    let hand = playertiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    let points = calcfan_chuanma(seat, zimo);
    let sudian = calcsudian_chuanma(points);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    // -------------------------------------------
    let zhahu = false;
    if (huazhu(seat) || calchupai(playertiles[seat]) === 0)
        zhahu = true;
    if (lstaction.name === 'RecordAnGangAddGang' && lstaction.data.type === 3)
        zhahu = true;
    if (zhahu) {
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            delta_scores[i] -= -33000;
            delta_scores[seat] += -33000;
        }
        playertiles[seat].pop();
        return {
            seat: seat,
            hand: hand,
            ming: ming,
            hu_tile: hu_tile,
            zimo: zimo,
            yiman: false,
            count: 0,
            fans: [{val: 0, id: 9000}],
            fu: 0,
            title_id: 0,
            dadian: -delta_scores[seat],
            liqi: false,
            qinjia: false,
            doras: [],
            li_doras: [],
        };
    }
    if (zimo)
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            delta_scores[i] -= sudian + 1000;
            delta_scores[seat] += sudian + 1000;
        }
    else {
        delta_scores[fangchong] -= sudian;
        delta_scores[seat] += sudian;
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    playertiles[seat].pop();
    // ---------------------------------------------------
    return {
        seat: seat,
        hand: hand,
        ming: ming,
        hu_tile: hu_tile,
        zimo: zimo,
        yiman: false,
        count: val,
        fans: points.fans,
        fu: points.fu,
        title_id: 0,
        dadian: dadian,
        liqi: false,
        qinjia: false,
        doras: [],
        li_doras: [],
    };
}

/**
 * hupaioneplayer 组 - 国标
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
function hupaioneplayer_guobiao(seat) {
    let lstaction = getlstaction(), zimo = false;
    if (lstaction.name === 'RecordDealTile' || lstaction.name === 'RecordNewRound')
        zimo = true;
    else if (lstaction.name === 'RecordDiscardTile')
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === 'RecordAnGangAddGang')
        playertiles[seat].push(lstaction.data.tiles);
    else if (lstaction.name === 'RecordBaBei')
        playertiles[seat].push(lstaction.data.tile);
    let fangchong;
    if (!zimo)
        fangchong = lstaction.data.seat;

    let ming = [];
    for (let i in fulu[seat]) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (fulu[seat][i].type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    let qinjia = seat === ju;
    let hand = playertiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    let points = calcfan_guobiao(seat, zimo);
    let sudian = calcsudian_guobiao(points), sudian_no_huapai = calcsudian_guobiao(points, true);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    // -------------------------------------------
    let zhahu = false, is_cuohu = false;
    if (calchupai(playertiles[seat]) === 0)
        zhahu = true;
    // 国标无法听花牌, 所以和拔的花牌一定是诈和
    if (lstaction.name === 'RecordBaBei' || lstaction.name === 'RecordAnGangAddGang' && lstaction.data.type === 3)
        zhahu = true;
    if (!is_guobiao_no_8fanfu() && sudian_no_huapai < GB_Qihu * scale_points())
        is_cuohu = true;
    if (cuohu[seat]) // 已错和的玩家再次和牌, 仍然是错和
        is_cuohu = true;

    if (zhahu || is_cuohu) { // 诈和, 错和赔三家各 cuohu_points() * scale_points() 点
        for (let i = 0; i < playercnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] += cuohu_points() * scale_points();
            delta_scores[seat] -= cuohu_points() * scale_points();
        }
        if (!zimo)
            playertiles[seat].pop();
        return {
            count: 0,
            doras: [],
            li_doras: [],
            fans: zhahu ? [{val: 0, id: 9000}] : points.fans,
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: false,
            ming: ming,
            point_rong: 3 * cuohu_points() * scale_points(),
            point_sum: 3 * cuohu_points() * scale_points(),
            point_zimo_qin: cuohu_points() * scale_points(),
            point_zimo_xian: cuohu_points() * scale_points(),
            qinjia: qinjia,
            seat: seat,
            title_id: 0,
            yiman: false,
            zimo: zimo,
            cuohu: true,
        };
    }
    if (zimo) {
        for (let i = 0; i < playercnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= sudian + GB_Qihu * scale_points();
            delta_scores[seat] += sudian + GB_Qihu * scale_points();
        }
    } else {
        delta_scores[fangchong] -= sudian;
        delta_scores[seat] += sudian;

        for (let i = 0; i < playercnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= GB_Qihu * scale_points();
            delta_scores[seat] += GB_Qihu * scale_points();
        }
    }
    playertiles[seat].pop();
    return {
        count: val,
        doras: [],
        li_doras: [],
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: false,
        ming: ming,
        point_rong: sudian + 3 * GB_Qihu * scale_points(),
        point_sum: 3 * (sudian + GB_Qihu * scale_points()),
        point_zimo_qin: sudian + GB_Qihu * scale_points(),
        point_zimo_xian: sudian + GB_Qihu * scale_points(),
        qinjia: qinjia,
        seat: seat,
        title_id: 0,
        yiman: false,
        zimo: zimo,
    };
}

/**
 * calcfan 组 - 立直
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @param {number} fangchong - 放铳玩家的 seat, 只有在 zimo 为 false 有效
 * @returns {{yiman: boolean, fans: {id: number, val: number}[], fu: number, dorabonus: number}}
 */
function calcfan(seat, zimo, fangchong) {
    // 更新返回值
    function updateret(x) {
        if (calcsudian(ret, 1) < calcsudian(x, 1))
            ret = x;
    }

    let tiles = playertiles[seat];
    let lastile = tiles.at(-1), fulucnt = 0;
    let ret = {yiman: false, fans: [], fu: 0};
    let cnt = []; // cnt 是仅手牌的数量集合, 不含红宝牌
    for (let i = Cbd; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tiletoint(tiles[i])]++;

    let partition = [];
    for (let i in fulu[seat])
        if (fulu[seat][i].type !== 4) {
            if (fulu[seat][i].type !== 3)
                fulucnt++;
            partition.push(fulu[seat][i]);
        }

    // 幻境传说: 庄家卡1: 庄家门清状态下荣和只能是立直状态, 否则诈和
    if (get_field_spell_mode1() === 1 && seat === ju && fulucnt === 0 && !zimo && liqiinfo[seat].liqi !== 0)
        return ret;

    if (!is_wanxiangxiuluo())
        normal_calc();
    else if (cnt[Cbd] === 1) {
        cnt[Cbd]--;
        tiles.splice(tiles.indexOf(Tbd), 1);
        for (let j = C1m; j <= C7z; j++) {
            cnt[j]++;
            tiles.push(inttotile(j));

            normal_calc();

            tiles.pop();
            cnt[j]--;
        }
        tiles.unshift(Tbd);
    }

    if (is_yifanjieguyi() && calchupai(tiles) === 12) {
        let ans = {yiman: !is_qingtianjing(), fans: [], fu: 25};
        if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && zimo)
            ans.fans.push({val: 1, id: 9708}); // 十三不搭
        updateret(ans);
    }
    return ret;

    // 没有百搭牌情况下的算番流程, 分为一般算番(dfs)和国士型
    function normal_calc() {
        dfs(1);
        if (calchupai(tiles) === 3) {
            let menqing = fulucnt === 0;
            let tianhu = false;
            let ans = {yiman: !is_qingtianjing(), fans: [], fu: 25};
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                tianhu = true;
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35});
            } // 天和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && is_guyi())
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和
            if (menqing && cnt[tiletoint(lastile)] === 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 42}); // 国士无双
            if (menqing && (cnt[tiletoint(lastile)] === 2 || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 49}; // 国士无双十三面
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (liqiinfo[seat].liqi === 2) {
                let wangpai_num = 14;
                if (playercnt === 3)
                    wangpai_num = 18;
                else if (playercnt === 2)
                    wangpai_num = 22;

                if (zimo && paishan.length === wangpai_num && lstdrawtype === 1 || !zimo && paishan.length === wangpai_num)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
            }
            updateret(ans);
        }
    }

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(now) {
        if (now === C0m) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [inttotile(now), inttotile(now), inttotile(now)]});
                partition.push({type: 7, tile: [inttotile(now), inttotile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [inttotile(now), inttotile(now), inttotile(now)]});

            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [inttotile(now), inttotile(nxt2[now]), inttotile(nxt2[nxt2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.pop();
            cnt[now] += whatever[k];
        }
    }

    // 算番
    function calc() {
        let cnt2 = []; // cnt2 是包含副露的牌数量集合, 不含红包牌
        for (let i = C1m; i <= C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tls = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j < 3; j++)
                    cnt2[tiletoint(tls[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tiletoint(tls[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tiletoint(tls[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tiletoint(tls[0])] += 2;
        }

        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (equaltile(tile[0], lastile) || equaltile(tile[1], lastile) || equaltile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = inttotile((tiletoint(tile[0]) + tiletoint(tile[1]) + tiletoint(tile[2])) / 3);
                if (equaltile(midtile, lastile))
                    updateret(calc0(2)); // 坎张听符
                else if (tiletoint(lastile) % 9 === 3 && tiletoint(midtile) % 9 === 2)
                    updateret(calc0(2)); // 边张听符
                else if (tiletoint(lastile) % 9 === 7 && tiletoint(midtile) % 9 === 8)
                    updateret(calc0(2)); // 边张听符
                else
                    updateret(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && equaltile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateret(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && equaltile(tile[0], lastile))
                updateret(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数
         * @returns {{yiman: boolean, fans: {id: number, val: number}[], fu: number, dorabonus: number}}
         */
        function calc0(tingpaifu) {
            /**
             * 删除 ans 中有番为 id 的番
             *
             * @param {number} id - 听牌符数
             */
            function deletefan(id) {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            }

            baopai[seat] = []; // 重置和牌玩家包牌信息
            let tianhu = false;
            let menqing = fulucnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            let ans = {yiman: !is_qingtianjing(), fans: [], fu: 0, dorabonus: 0};
            // ----------------------------------------------
            // typecnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;

            for (let i = C1m; i <= C7z; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[i] = gangzi[i] = kezi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let type = partitiontmp[i].type;
                switch (type) {
                    case 1:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tiletoint(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false, sanlianke = false;
            for (let i = C1m; i <= C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];

                if (i >= C1m + 1 && i <= C9m - 1 || i >= C1p + 1 && i <= C9p - 1 || i >= C1s + 1 && i <= C9s - 1)
                    if (kezi[i - 1] >= 1 && kezi[i] >= 1 && kezi[i + 1] >= 1)
                        sanlianke = true;

                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[i] / 2);

                if (Math.floor(shunzi[i] / 3) >= 1)
                    santongshun = true;
            }
            // ---------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgetile(inttotile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false; // 字一色
                if (!judgetile(inttotile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false; // 绿一色
                if (!judgetile(inttotile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false; // 清老头
                if (!judgetile(inttotile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false; // 断幺九
                if (!judgetile(inttotile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false; // 混老头
            }
            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            let jiulian = [false, ''], yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = [true, ''];
                for (let i = C1m; i <= C9m; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = [false, ''];
                    else if (cnt2[k * 9 + i] > jlbd[i]) // 多出来的牌
                        jiulian[1] = inttotile(k * 9 + i);
                if (jiulian[0])
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = [false, ''];

            for (let k = 0; k <= 3; k++) { // 0, 1, 2, 3 分别代表 m, p, s, z
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise) // 有一个满足, 就跳出
                    break;
            }
            // ----------------------------------
            let sanse = false, sansetongke = false;
            for (let i = C1m; i <= C9m; i++) {
                if (i >= C1m + 1 && i <= C9m - 1)
                    if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                        sanse = true;
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    sansetongke = true;
            }
            // ----------------------------------
            let chunquandai = true, hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    chunquandai = hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = hunquandai = false;
                if (i >= C1z && i <= C7z && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = false;
            }
            // ------------------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++) {
                if (kezi[i] >= 1) // 有刻子
                    pinghu = false;
                if (typecnt[i][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (tiletoint((chang + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (i >= C5z && i <= C7z)
                        pinghu = false;
                }
            }
            // 顺子两面听判断
            let flag_liangmian = false;
            if ((tiletoint(lastile) - 1) % 9 >= 3) // 数牌4-9
                if (shunzi[tiletoint(lastile) - 1] >= 1) // 顺子的中心比 lastile 小 1
                    flag_liangmian = true;
            if ((tiletoint(lastile) - 1) % 9 <= 5) // 数牌1-6
                if (shunzi[tiletoint(lastile) + 1] >= 1) // 顺子的中心比 lastile 大 1
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            // -------------------------------------
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;

            for (let i = 0; i < 3; i++)
                if (typecnt[C5z + i][7] === 1 && kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;

            if (kezi[C5z] >= 1 && kezi[C5z + 1] >= 1 && kezi[C5z + 2] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (typecnt[C1z + i][7] === 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1 && kezi[C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;

            if (kezi[C1z] >= 1 && kezi[C1z + 1] >= 1 && kezi[C1z + 2] >= 1 && kezi[C1z + 3] >= 1)
                dasixi = true;

            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            let alldoras = [0, 0, 0, 0];
            // 先把拔北给算上, 然后减去
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4) {
                    cnt2[tiletoint(fulu[seat][i].tile[0])]++;
                    alldoras[2]++;
                }
            for (let i = 0; i < doracnt.cnt; i++) {
                if (playercnt === 3 && tiletoint(doras[i]) === C1m)
                    alldoras[0] += cnt2[C9m];
                else if (playercnt === 2) {
                    if (tiletoint(doras[i]) === C1p)
                        alldoras[0] += cnt2[C9p];
                    if (tiletoint(doras[i]) === C1s)
                        alldoras[0] += cnt2[C9s];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        alldoras[0] += cnt2[tiletoint(doras[i])];
                    alldoras[0] += cnt2[doranxt[tiletoint(doras[i])]];
                }
            }
            for (let i = 0; i < doracnt.licnt; i++) {
                if (playercnt === 3 && tiletoint(li_doras[i]) === C1m)
                    alldoras[3] += cnt2[C9m];
                else if (playercnt === 2) {
                    if (tiletoint(li_doras[i]) === C1p)
                        alldoras[3] += cnt2[C9p];
                    if (tiletoint(li_doras[i]) === C1s)
                        alldoras[3] += cnt2[C9s];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        alldoras[3] += cnt2[tiletoint(li_doras[i])];
                    alldoras[3] += cnt2[doranxt[tiletoint(li_doras[i])]];
                }
            }
            // cnt2 不记录红宝牌, 所以不能用 cnt2
            for (let i in tiles)
                if (tiles[i][0] === '0')
                    alldoras[1]++;
            for (let i in fulu[seat])
                for (let j in fulu[seat][i].tile)
                    if (fulu[seat][i].tile[j][0] === '0')
                        alldoras[1]++;

            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    cnt2[tiletoint(fulu[seat][i].tile[0])]--;

            // 幻境传说: 庄家卡5
            if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                ans.dorabonus = alldoras[0] + alldoras[1] + alldoras[3];
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (typecnt[C5z][2] === 1 && typecnt[C5z][7] === 1 && typecnt[C5z][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9001}); // 天地创造
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9001}); // 设为0是防止重复计数
            }
            if (typecnt[C5z + 1][3] === 4 && typecnt[C5z + 1][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9002}); // 万物生长
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9002}); // 设为0是防止重复计数
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                tianhu = true;
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
            }
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi()))
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (dasanyuan) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusanyuancnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tiletoint(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C5z && t_int <= C7z)) {
                            fulusanyuancnt++;
                            if (fulusanyuancnt === 3 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: 1});
                        }
                    }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 37}); // 大三元
            }

            if (menqing && anke_num === 4 && (typecnt[tiletoint(lastile)][7] === 1 || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 48}; // 四暗刻单骑
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            } else if (menqing && anke_num === 4 && anke[tiletoint(lastile)] - gangzi[tiletoint(lastile)] >= 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 38}); // 四暗刻

            if (flag_ziyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 39}); // 字一色
            if (flag_lvyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 40}); // 绿一色
            if (flag_qinglaotou)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 41}); // 清老头

            if (xiaosixi && !dasixi)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 43}); // 小四喜

            if (gangzi_num === 4) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && is_sigangbaopai() && sigangbao[seat]) {
                    let fulugangzi = 0;
                    for (let i in fulu[seat])
                        if (fulu[seat][i].type === 2 || fulu[seat][i].type === 3) {
                            fulugangzi++;
                            if (fulugangzi === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: 1});
                        }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 44}); // 四杠子
            }

            if (menqing && jiulian[0] && (equaltile(lastile, jiulian[1]) || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 47}; // 纯正九莲宝灯
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }

            if (menqing && jiulian[0] && !equaltile(lastile, jiulian[1]) && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 45}); // 九莲宝灯

            if (dasixi) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusixicnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tiletoint(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C1z && t_int <= C4z)) {
                            fulusixicnt++;
                            if (fulusixicnt === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: no_wyakuman() ? 1 : 2});
                        }
                    }
                }
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 50}; // 大四喜
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            let wangpai_num = 14;
            if (playercnt === 2)
                wangpai_num = 18;

            if (is_guyi() || is_yifanjieguyi()) {
                if (qingyise && duizi_num === 7 && flag_duanyao) {
                    if (cnt2[2] > 0)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 62}); // 大数邻
                    if (cnt2[11] > 0)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 60}); // 大车轮
                    if (cnt2[20] > 0)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 61}); // 大竹林
                }

                if (liqiinfo[seat].liqi === 2)
                    if (zimo && paishan.length === wangpai_num && lstdrawtype === 1 || !zimo && paishan.length === wangpai_num)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
                if (flag_ziyise && duizi_num === 7 && !no_wyakuman()) {
                    deletefan(39); // 删除字一色
                    let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 64}; // 大七星
                    if (no_wyakuman())
                        tmp.val /= 2;
                    ans.fans.push(tmp);
                }
            }
            // 四连刻, 一色四同顺, 红孔雀, 红一点, 黑一色,
            // 十三不搭, 八连庄, 百万石, 金门桥, 东北新干线, 无发绿一色
            if (is_yifanjieguyi()) {
                let sitongshun = false, silianke = false;
                for (let i = 0; i <= 2; i++)
                    for (let j = C1m; j <= C9m; j++) {
                        if (j !== C1m && j !== C9m && shunzi[i * 9 + j] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({val: 1, id: 9703}); // 四连刻
                if (sitongshun)
                    ans.fans.push({val: 1, id: 9704}); // 一色四同顺

                let hongkongque = true, hongyidian = true, heiyise = true;
                if (cnt2[34] === 0)
                    hongkongque = hongyidian = false;
                for (let i = C1m; i <= C7z; i++) {
                    if (i !== 19 && i !== 23 && i !== 25 && i !== 27 && i !== 34 && i !== 37 && cnt2[i] >= 1)
                        hongkongque = false;
                    if (i !== 20 && i !== 21 && i !== 22 && i !== 24 && i !== 26 && i !== 34 && cnt2[i] >= 1)
                        hongyidian = false;
                    if (i !== 11 && i !== 13 && i !== 17 && i !== 28 && i !== 29 && i !== 30 && i !== 31 && cnt2[i] >= 1)
                        heiyise = false;
                }
                if (hongkongque)
                    ans.fans.push({val: 1, id: 9705}); // 红孔雀
                if (hongyidian)
                    ans.fans.push({val: 1, id: 9706}); // 红一点
                if (heiyise)
                    ans.fans.push({val: 1, id: 9707}); // 黑一色

                if (seat === ju && lianzhuangcnt >= 7) // 第8次和牌
                    ans.fans.push({val: 1, id: 46}); // 八连庄

                let wan_qingyise = true;
                for (let i = C1p; i <= C7z; i++)
                    if (cnt2[i] >= 1)
                        wan_qingyise = false;
                if (wan_qingyise) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i] * i;
                    if (sum >= 100)
                        ans.fans.push({val: 1, id: 9709}); // 百万石
                }

                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({val: 1, id: 9710}); // 金门桥

                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++) {
                    xinganxian_part1 = true;
                    for (let i = C1m; i <= C9m; i++)
                        if (cnt2[j * 9 + i] !== 1)
                            xinganxian_part1 = false;
                    if (xinganxian_part1)
                        break;
                }
                if (kezi[C1z] === 1 && typecnt[C4z][7] === 1 || kezi[C4z] === 1 && typecnt[C1z][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({val: 1, id: 9711}); // 东北新干线

                if (flag_lvyise && cnt2[33] === 0) {
                    deletefan(40);
                    ans.fans.push({val: 2, id: 9712}); // 无发绿一色
                }
            }

            if (liqiinfo[seat].kai && !zimo && liqiinfo[fangchong].liqi === 0) { // 开立直
                if (liqiinfo[seat].liqi === 1)
                    ans.fans.push({val: 1, id: 9003});
                if (liqiinfo[seat].liqi === 2)
                    ans.fans.push({val: 1, id: 9004});
            }

            if (ans.fans.length !== 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            ans.yiman = false;

            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi()))
                if (is_renhumanguan())
                    ans.fans.push({val: 5, id: 65}); // 人和2

            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({val: 2, id: 804}); // 立直
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({val: 3, id: 805}); // 双立直
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({val: 1, id: 30}); // 一发
            } else {
                if (liqiinfo[seat].kai) { // 开立直非役满情况
                    if (liqiinfo[seat].liqi === 1)
                        ans.fans.push({val: 2, id: 9005}); // 开立直
                    if (liqiinfo[seat].liqi === 2)
                        ans.fans.push({val: 3, id: 9006}); // 开两立直
                } else {
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode2() === 5) {
                        if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({val: 2, id: 2}); // 立直
                        if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({val: 4, id: 18}); // 两立直
                    } else if (is_beishuizhizhan()) {
                        if (liqiinfo[seat].liqi === 1 && liqiinfo[seat].beishui_type === 1)
                            ans.fans.push({val: 3, id: 806}); // 真-立直
                        else if (liqiinfo[seat].liqi === 2 && liqiinfo[seat].beishui_type === 1)
                            ans.fans.push({val: 4, id: 807}); // 真-两立直
                        else if (liqiinfo[seat].liqi === 1 && liqiinfo[seat].beishui_type === 2)
                            ans.fans.push({val: 5, id: 808}); // 极-立直
                        else if (liqiinfo[seat].liqi === 2 && liqiinfo[seat].beishui_type === 2)
                            ans.fans.push({val: 6, id: 809}); // 极-两立直
                        else if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        else if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    } else {
                        if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    }
                }
                // 幻境传说: 机会卡5
                if (get_field_spell_mode2() === 5) {
                    if (liqiinfo[seat].liqi !== 0 && liqiinfo[seat].yifa !== 0)
                        ans.fans.push({val: 2, id: 30}); // 一发
                } else {
                    if (liqiinfo[seat].liqi !== 0 && liqiinfo[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({val: 1, id: 30}); // 一发
                }
            }
            let lstaction = getlstaction();
            if (is_guyi() || is_yifanjieguyi()) {
                if (lstaction.name === 'RecordDiscardTile' && lstaction.data.is_liqi)
                    ans.fans.push({val: 1, id: 51}); // 燕返
                if (!zimo && lstdrawtype === 0 && lstaction.name === 'RecordDiscardTile')
                    if (getlstaction(3) !== undefined && (getlstaction(3).name === 'RecordAnGangAddGang' || getlstaction(3).name === 'RecordChiPengGang'))
                        ans.fans.push({val: 1, id: 52}); // 杠振
                if (fulucnt === 4)
                    ans.fans.push({val: 1, id: 53}); // 十二落抬
            }
            if (menqing && zimo)
                ans.fans.push({val: 1, id: 1}); // 门前清自摸和

            if (lstaction.name === 'RecordAnGangAddGang')
                ans.fans.push({val: 1, id: 3}); // 枪杠
            if (zimo && lstdrawtype === 0)
                ans.fans.push({val: 1, id: 4}); // 岭上开花
            if (zimo && paishan.length === wangpai_num && lstdrawtype === 1)
                ans.fans.push({val: 1, id: 5}); // 海底摸月
            if (!zimo && paishan.length === wangpai_num)
                ans.fans.push({val: 1, id: 6}); // 河底捞鱼

            if (kezi[C5z] >= 1)
                ans.fans.push({val: kezi[C5z], id: 7}); // 白
            if (kezi[C5z + 1] >= 1)
                ans.fans.push({val: kezi[C5z + 1], id: 8}); // 发
            if (kezi[C7z] >= 1)
                ans.fans.push({val: kezi[C7z], id: 9}); // 中
            if (kezi[tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z')] >= 1)
                ans.fans.push({
                    val: kezi[tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z')],
                    id: 10
                }); // 自风
            if (kezi[tiletoint((chang + 1).toString() + 'z')] >= 1)
                ans.fans.push({val: kezi[tiletoint((chang + 1).toString() + 'z')], id: 11}); // 场风

            if (flag_duanyao && (!no_shiduan() || no_shiduan() && menqing))
                // 幻境传说: 机会卡4
                ans.fans.push({val: get_field_spell_mode2() === 4 ? 3 : 1, id: 12}); // 断幺九

            if (beikou === 1 && menqing)
                ans.fans.push({val: 1, id: 13}); // 一杯口

            if (pinghu && menqing)
                ans.fans.push({val: 1, id: 14}); // 平和

            if (hunquandai && !chunquandai && !flag_hunlaotou)
                ans.fans.push({val: menqing ? 2 : 1, id: 15}); // 混全带幺九

            if (yiqi)
                ans.fans.push({val: menqing ? 2 : 1, id: 16}); // 一气通贯

            if (sanse)
                ans.fans.push({val: menqing ? 2 : 1, id: 17}); // 三色同顺

            if (sansetongke)
                ans.fans.push({val: 2, id: 19}); // 三色同刻

            if (gangzi_num === 3)
                ans.fans.push({val: 2, id: 20}); // 三杠子

            if (kezi_num === 4)
                ans.fans.push({val: 2, id: 21}); // 对对和

            if (anke_num === 3)
                ans.fans.push({val: 2, id: 22}); // 三暗刻

            if (xiaosanyuan)
                ans.fans.push({val: 2, id: 23}); // 小三元

            if (flag_hunlaotou && !flag_qinglaotou)
                ans.fans.push({val: 2, id: 24}); // 混老头

            if (duizi_num === 7)
                ans.fans.push({val: 2, id: 25}); // 七对子

            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({val: 2, id: 54}); // 五门齐

            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({val: 2, id: 55}); // 三连刻

            if (chunquandai)
                ans.fans.push({val: menqing ? 3 : 2, id: 26}); // 纯全带幺九

            if (hunyise && !qingyise)
                ans.fans.push({val: menqing ? 3 : 2, id: 27}); // 混一色

            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                deletefan(13); // 删除一杯口
                ans.fans.push({val: menqing ? 3 : 2, id: 56}); // 一色三同顺
            }

            if (beikou === 2 && menqing)
                ans.fans.push({val: 3, id: 28}); // 二杯口

            if (qingyise)
                ans.fans.push({val: menqing ? 6 : 5, id: 29}); // 清一色

            if (is_guyi()) {
                if (zimo && paishan.length === wangpai_num && lstdrawtype === 1 && lastile.substring(0, 2) === '1p') {
                    deletefan(5); // 删除海底摸月
                    ans.fans.push({val: 5, id: 57}); // 一筒摸月
                }
                if (!zimo && paishan.length === wangpai_num && lastile.substring(0, 2) === '9p') {
                    deletefan(6); // 删除河底捞鱼
                    ans.fans.push({val: 5, id: 58}); // 九筒捞鱼
                }
            }

            if (is_yifanjieguyi()) {
                let tuibudao = true;
                for (let i = C1m; i <= C7z; i++)
                    if (i !== 10 && i !== 11 && i !== 12 && i !== 13 && i !== 14 && i !== 17 && i !== 18)
                        if (i !== 20 && i !== 22 && i !== 23 && i !== 24 && i !== 26 && i !== 27)
                            if (i !== 32 && cnt2[i] >= 1) {
                                tuibudao = false;
                                break;
                            }

                let have_0m = false, have_0p = false, have_0s = false;
                for (let i in tiles) {
                    if (tiles[i].substring(0, 2) === '0m')
                        have_0m = true;
                    if (tiles[i].substring(0, 2) === '0p')
                        have_0p = true;
                    if (tiles[i].substring(0, 2) === '0s')
                        have_0s = true;
                }
                for (let i in fulu[seat])
                    for (let j in fulu[seat][i].tile) {
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0m')
                            have_0m = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0p')
                            have_0p = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0s')
                            have_0s = true;
                    }
                let chisanse = have_0m && have_0p && have_0s;

                let sansetongguan = false;
                for (let i = 0; i < 3; i++)
                    for (let j = 0; j < 3; j++)
                        for (let k = 0; k < 3; k++)
                            if (i !== j && j !== k && i !== k)
                                if (shunzi[3 * i + 2] >= 1 && shunzi[3 * j + 11] && shunzi[3 * k + 20]) {
                                    sansetongguan = true;
                                    break;
                                }

                if (tuibudao)
                    ans.fans.push({val: 1, id: 9700}); // 推不倒
                if (chisanse)
                    ans.fans.push({val: 2, id: 9701}); // 赤三色
                if (sansetongguan)
                    ans.fans.push({val: menqing ? 2 : 1, id: 9702}); // 三色通贯
            }


            if (calcsudian(ans) === -2000)
                return ans;

            // --------------------------------------------------
            // 悬赏番

            if (alldoras[0] !== 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode2() === 1 && liqiinfo[seat].liqi !== 0))
                    ans.fans.push({val: alldoras[0], id: 31}); // 宝牌
            if (alldoras[1] !== 0)
                ans.fans.push({val: alldoras[1], id: 32}); // 红宝牌
            if (alldoras[2] !== 0)
                ans.fans.push({val: alldoras[2], id: 34}); // 北宝牌
            if (liqiinfo[seat].liqi !== 0) {
                let times = 1;
                // 幻境传说: 机会卡1
                if (get_field_spell_mode2() === 1 && liqiinfo[seat].liqi !== 0)
                    times = 2;
                ans.fans.push({val: alldoras[3] * times, id: 33}); // 里宝牌
            }

            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({val: 2, id: 803}); // 过载

            if (is_yongchang()) {
                let moqie_bonus = yongchang_data[seat].moqie_bonus;
                let shouqie_bonus = yongchang_data[seat].shouqie_bonus;
                if (moqie_bonus !== 0)
                    ans.fans.push({val: moqie_bonus, id: 801}); // 绯
                if (shouqie_bonus !== 0)
                    ans.fans.push({val: shouqie_bonus, id: 802}); // 苍
            }
            // --------------------------------------------------
            // --------------------------------------------------
            // --------------------------------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C7z; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgetile(inttotile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (no_lianfengsifu()) {
                        if (i === tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z') || i === tiletoint((chang + 1).toString() + 'z'))
                            ans.fu += 2;
                    } else {
                        if (i === tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z'))
                            ans.fu += 2;
                        if (i === tiletoint((chang + 1).toString() + 'z'))
                            ans.fu += 2;
                    }
                    if (i >= 32 && i <= 34)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulucnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }
}

/**
 * calcfan 组 - 川麻
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @param {boolean} [type] - false 表示正常和牌, true 表示查大叫的情况
 * @returns {{fans: {id: number, val: number}[], fu: number}}
 */
function calcfan_chuanma(seat, zimo, type = false) {
    // 更新返回值
    function updateret(x) {
        if (calcsudian_chuanma(ret, 1) < calcsudian_chuanma(x, 1))
            ret = x;
    }

    /**
     * 根据初步算得的番列表, 确定要实际显示哪些番
     *
     * @param {{fans: {id: number, val: number}[], fu: number}} x
     * @returns {{fans: {id: number, val: number}[], fu: number}}
     */
    function tofan(x) {
        let ans = {fans: [], fu: x.fu};
        for (let i = 1019; i >= 1005; i--) {
            if (i === 1014 && x.fans[1020] >= 1) { // 这里 1014 可以换成 1013, 1012
                ans.fans.push({val: x.fans[1020], id: 1020});
                break;
            }
            if (x.fans[i] >= 1) {
                ans.fans.push({val: x.fans[i], id: i});
                break;
            }
            if (i === 1005 && ans.fans.length === 0)
                ans.fans.push({val: x.fans[1003], id: 1003});
        }
        if (x.fans[1000] >= 1)
            ans.fans.push({val: x.fans[1000], id: 1000});
        if (x.fans[1001] >= 1)
            ans.fans.push({val: x.fans[1001], id: 1001});
        if (x.fans[1002] >= 1)
            ans.fans.push({val: x.fans[1002], id: 1002});
        if (x.fans[1004] >= 1)
            ans.fans.push({val: x.fans[1004], id: 1004});
        if (x.fans[1021] >= 1)
            ans.fans.push({val: x.fans[1021], id: 1021});
        return ans;
    }

    let tiles = playertiles[seat];
    // 手牌少一张, 表示查大叫的情况
    if (tiles.length % 3 === 1 && type) {
        let tingpais = calctingpai(seat), ret = {fans: [], fu: 0};
        for (let i in tingpais) {
            tiles.push(tingpais[i].tile);
            let tmp = calcfan_chuanma(seat, zimo, true);
            updateret(tmp);
            tiles.pop();
        }
        return ret;
    }

    let lastile = tiles.at(-1), fulucnt = 0;
    let ret = {fans: [], fu: 0};
    if (huazhu(seat))
        return ret;
    let cnt = [];
    for (let i = C1m; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tiletoint(tiles[i])]++;
    let partition = [];
    for (let i in fulu[seat]) {
        partition.push(fulu[seat][i]);
        fulucnt++;
    }

    dfs(1);
    if (calchupai(tiles) === 2) { // 七对子只有一种分解方式
        partition = [];
        for (let i = C1m; i <= C9s; i++)
            while (cnt[i] > 0) {
                partition.push({type: 7, tile: [inttotile(i), inttotile(i)]});
                cnt[i] -= 2;
            }
        calc();
    }

    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(now) {
        if (now === C1z) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [inttotile(now), inttotile(now), inttotile(now)]});
                partition.push({type: 7, tile: [inttotile(now), inttotile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [inttotile(now), inttotile(now), inttotile(now)]});

            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [inttotile(now), inttotile(nxt2[now]), inttotile(nxt2[nxt2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.pop();
            cnt[now] += whatever[k];
        }
    }

    // 算番
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C9s; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tmp_tiles = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j <= 2; j++)
                    cnt2[tiletoint(tmp_tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tiletoint(tmp_tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tiletoint(tmp_tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tiletoint(tmp_tiles[0])] += 2;
        }

        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (equaltile(tile[0], lastile) || equaltile(tile[1], lastile) || equaltile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = inttotile((tiletoint(tile[0]) + tiletoint(tile[1]) + tiletoint(tile[2])) / 3);
                if (equaltile(midtile, lastile))
                    updateret(calc0(2)); // 坎张听符
                else if (tiletoint(lastile) % 9 === 3 && tiletoint(midtile) % 9 === 2)
                    updateret(calc0(2)); // 边张听符
                else if (tiletoint(lastile) % 9 === 7 && tiletoint(midtile) % 9 === 8)
                    updateret(calc0(2)); // 边张听符
                else
                    updateret(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && equaltile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateret(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && equaltile(tile[0], lastile))
                updateret(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数, 这里没什么用
         * @returns {{fans: {id: number, val: number}[], fu: number}}
         */
        function calc0(tingpaifu) {
            let ans = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            let kezi = [], gangzi = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (let i = C1m; i <= C9s; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[i] = gangzi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let tmp_type = partitiontmp[i].type;
                switch (tmp_type) {
                    case 1:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (tmp_type === 1 || tmp_type === 2 || tmp_type === 3 || tmp_type === 6 || tmp_type === 7)
                    typecnt[tiletoint(partitiontmp[i].tile[0])][tmp_type]++;
                if (tmp_type === 0 || tmp_type === 5)
                    typecnt[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3][tmp_type]++;
            }
            for (let i = C1m; i <= C9s; i++) {
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            let quandai = true;
            for (let i = C1m; i <= C9s; i++) {
                // 顺子和(刻子, 雀头)
                if (i !== 2 && i !== 8 && i !== 11 && i !== 17 && i !== 20 && i !== 26 && shunzi[i] >= 1)
                    quandai = false;
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && i < 28 && kezi[i] + typecnt[i][7] >= 1)
                    quandai = false;
            }
            // --------------------------
            let qingyise = false;
            for (let k = 0; k < 3; k++) {
                qingyise = true;
                for (let i = C1m; i <= C9s; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0)
                        qingyise = false;
                if (qingyise)
                    break;
            }
            // ---------------------------
            let jiangdui = true;
            for (let i = C1m; i <= C9s; i++)
                if (i !== 2 && i !== 5 && i !== 8 && i !== 11 && i !== 14 && i !== 17 && i !== 20 && i !== 23 && i !== 26 && cnt2[i] > 0)
                    jiangdui = false;
            // ---------------------------
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (let i = C1m; i <= C9s; i++)
                ans.fans[1000] += Math.floor(cnt2[i] / 4); // 根
            if (!type && zimo && getlstaction(2) !== undefined && (getlstaction(2).name === 'RecordAnGangAddGang' || getlstaction(2).name === 'RecordChiPengGang'))
                ans.fans[1001] = 1; // 杠上花
            if (!type && !zimo && getlstaction(3) !== undefined && (getlstaction(3).name === 'RecordAnGangAddGang' || getlstaction(3).name === 'RecordChiPengGang'))
                ans.fans[1002] = 1; // 杠上炮
            if (!type && getlstaction().name === 'RecordAnGangAddGang')
                ans.fans[1004] = 1; // 抢杠
            if (kezi_num === 4)
                ans.fans[1005] = 2; // 对对和
            if (qingyise)
                ans.fans[1006] = 3; // 清一色
            if (duizi_num === 7)
                ans.fans[1007] = 3; // 七对子
            if (quandai)
                ans.fans[1008] = 3; // 带幺九
            if (fulucnt === 4)
                ans.fans[1009] = 3; // 金钩钓
            if (qingyise && kezi_num === 4)
                ans.fans[1010] = 4; // 清对
            if (jiangdui && kezi_num === 4)
                ans.fans[1011] = 4; // 将对
            if (ans.fans[1000] > 0 && duizi_num === 7) {
                ans.fans[1012] = 4;
                ans.fans[1000]--;
            } // 龙七对
            if (qingyise && duizi_num === 7)
                ans.fans[1013] = 5; // 清七对
            if (qingyise && fulucnt === 4)
                ans.fans[1014] = 5; // 清金钩钓
            if (qingyise && ans.fans[1012] === 4)
                ans.fans[1015] = 6; // 清龙七对
            if (gangzi_num === 4) {
                ans.fans[1016] = 6;
                ans.fans[1000] -= 4;
            } // 十八罗汉
            if (qingyise && gangzi_num === 4)
                ans.fans[1017] = 6; // 清十八罗汉
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo)
                ans.fans[1018] = 6; // 天和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo)
                ans.fans[1019] = 6; // 地和
            if (qingyise && quandai)
                ans.fans[1020] = 5; // 清幺九
            if (!type && paishan.length === 0)
                ans.fans[1021] = 1; // 海底捞月

            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return tofan(ans);
            }
            ans.fu = 20; // 符底
            ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C9s; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgetile(inttotile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
            }
            if (zimo)
                ans.fu += 2; // 自摸符
            if (!zimo && fulucnt === 0)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulucnt !== 0 && ans.fu === 20)
                ans.fu = 30;

            return tofan(ans);
        }
    }
}

/**
 * calcfan 组 - 国标
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @returns {{fans: {id: number, val: number}[], fu: number}}
 */
function calcfan_guobiao(seat, zimo) {
    // 更新返回值
    function updateret(x) {
        if (calcsudian_guobiao(ret) < calcsudian_guobiao(x))
            ret = x;
    }

    let tiles = playertiles[seat];
    let lastile = tiles.at(-1), fulucnt = 0;
    let ret = {fans: [], fu: 0};
    let cnt = [];
    for (let i = C1m; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tiletoint(tiles[i])]++;

    let partition = [];
    for (let i in fulu[seat])
        if (fulu[seat][i].type !== 4) {
            if (fulu[seat][i].type !== 3)
                fulucnt++;
            partition.push(fulu[seat][i]);
        }

    dfs(1);

    let result = calchupai(tiles);
    if (result === 3) {
        let ans = {fans: [], fu: 25};
        // 国标麻将十三幺不能枪暗杠, 至于优先头跳, 这里没有实现
        ans.fans.push({val: 88, id: 8006}); // 十三幺
        updateret(ans);
    }
    if (result === 4 || result === 5) { // 一定是全不靠或七星不靠
        let qixingbukao = true;
        for (let i = C1z; i <= C7z; i++)
            if (cnt[i] === 0)
                qixingbukao = false;

        let ans = {fans: [], fu: 25};
        if (qixingbukao)
            ans.fans.push({val: 24, id: 8019}); // 七星不靠
        else if (result === 5) { // 有组合龙
            ans.fans.push({val: 12, id: 8033}); // 全不靠
            ans.fans.push({val: 12, id: 8034}); // 组合龙
        } else
            ans.fans.push({val: 12, id: 8033}); // 全不靠
        updateret(ans);
    }
    if (result >= 6 && result <= 11) { // 没有全不靠的组合龙
        let row = result - 6;
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        for (let i = 0; i < 3; i++) {
            let new_shunzi = [inttotile(condition[row][3 * i]), inttotile(condition[row][3 * i + 1]), inttotile(condition[row][3 * i + 2])];
            partition.push({type: 9, tile: new_shunzi});
        }
        for (let i in condition[row]) {
            tiles.splice(tiles.indexOf(inttotile(condition[row][i])), 1);
            cnt[condition[row][i]]--;
        }

        dfs(1);

        for (let i in condition[row]) {
            tiles.push(inttotile(condition[row][i]));
            cnt[condition[row][i]]++;
        }
        tiles.sort(cmp);

        ret.fans.push({val: 12, id: 8034}); // 组合龙
        ret.fu = 25;
    }
    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(now) {
        if (now === C0m) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        let whatever = [0, 2, 3];
        for (let k = 0; k < 3; k++) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (k === 1) {
                partition.push({type: 7, tile: [inttotile(now), inttotile(now)]});
                dfs(now);
            } else if (k === 2)
                partition.push({type: 6, tile: [inttotile(now), inttotile(now), inttotile(now)]});
            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [inttotile(now), inttotile(nxt2[now]), inttotile(nxt2[nxt2[now]])]
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.length = partition.length - 1;
            }
            if (k === 1 || k === 2)
                partition.length = partition.length - 1;
            cnt[now] += whatever[k];
        }
    }

    // 算番
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tiles = partitiontmp[i].tile;
            // 新增 9 分类, 用于组合龙
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5 || partitiontmp[i].type === 9)
                for (let j = 0; j <= 2; j++)
                    cnt2[tiletoint(tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tiletoint(tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tiletoint(tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tiletoint(tiles[0])] += 2;
        }

        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (equaltile(tile[0], lastile) || equaltile(tile[1], lastile) || equaltile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = inttotile((tiletoint(tile[0]) + tiletoint(tile[1]) + tiletoint(tile[2])) / 3);
                if (equaltile(midtile, lastile))
                    updateret(calc0(2)); // 坎张听符
                else if (tiletoint(lastile) % 9 === 3 && tiletoint(midtile) % 9 === 2)
                    updateret(calc0(2)); // 边张听符
                else if (tiletoint(lastile) % 9 === 7 && tiletoint(midtile) % 9 === 8)
                    updateret(calc0(2)); // 边张听符
                else
                    updateret(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && equaltile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateret(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && equaltile(tile[0], lastile))
                updateret(calc0(2)); // 单骑符
            if (type === 9)
                updateret(calc0(0)); // 组合龙
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数, 这里没什么用
         * @returns {{fans: {id: number, val: number}[], fu: number}}
         */
        function calc0(tingpaifu) {
            /**
             * ban 掉 ids 中 id 的番
             *
             * @param {number|number[]} ids - ban 番列表
             */
            function banfan(ids) {
                if (typeof ids == 'number')
                    ids = [ids];
                for (let i in ids)
                    ban_num[ids[i] - 8000] = true;
            }

            /**
             * id 番是否已被 ban
             *
             * @param {number} id - 查询番的 id
             */
            function is_banned(id) {
                return ban_num[id - 8000];
            }

            let lstaction = getlstaction();
            let menqing = fulucnt === 0;
            // 不计列表
            let ban_num = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            // 指定数量的不计幺九刻计数
            let ban_yaojiuke_num = 0;

            let ans = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0;
            let angang_num = 0;

            for (let i = C1m; i <= C7z; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                anke[i] = gangzi[i] = kezi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let type = partitiontmp[i].type;
                switch (type) {
                    case 1:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3]++;
                        break;
                    case 9:
                        banfan(8042); // 有类型9, 则是在组合龙内, ban 无番和
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tiletoint(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false, sanlianke = false;
            for (let i = C1m; i <= C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];
                minggang_num += typecnt[i][2];
                angang_num += typecnt[i][3];

                if (i >= C1m + 1 && i <= C9m - 1 || i >= C1p + 1 && i <= C9p - 1 || i >= C1s + 1 && i <= C9s - 1)
                    if (kezi[i - 1] >= 1 && kezi[i] >= 1 && kezi[i + 1] >= 1)
                        sanlianke = true;
                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[i] / 2);

                if (shunzi[i] === 3)
                    santongshun = true;
            }

            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            // --------------------------
            // --------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgetile(inttotile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false; // 字一色
                if (!judgetile(inttotile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false; // 绿一色
                if (!judgetile(inttotile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false; // 清老头
                if (!judgetile(inttotile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false; // 断幺九
                if (!judgetile(inttotile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false; // 混老头
            }
            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            let jiulian = false, yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = false;
                    else if (cnt2[k * 9 + i] > jlbd[i] && lastile !== inttotile(k * 9 + i)) // 多出来的牌
                        jiulian = false;
                if (jiulian)
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = false;
            // --------------------------
            for (let k = 0; k <= 3; k++) {
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise) // 有一个满足, 就跳出
                    break;
            }
            // --------------------------
            let santongke = false, shuangtongke = false;
            for (let i = 1; i <= 9; i++) {
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    santongke = true;
                else if (kezi[i] >= 1 && kezi[i + 9] >= 1 || kezi[i] >= 1 && kezi[i + 18] >= 1 || kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    shuangtongke = true;
            }
            // --------------------------
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;

            for (let i = 0; i < 3; i++)
                if (typecnt[C5z + i][7] === 1 && kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;

            if (kezi[C5z] >= 1 && kezi[C5z + 1] >= 1 && kezi[C5z + 2] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (typecnt[C1z + i][7] === 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1 && kezi[C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;

            if (kezi[C1z] >= 1 && kezi[C1z + 1] >= 1 && kezi[C1z + 2] >= 1 && kezi[C1z + 3] >= 1)
                dasixi = true;
            // --------------------------
            let hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    hunquandai = false;
            }
            // --------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++)
                if (kezi[i] >= 1 || typecnt[i][7] === 1 && i >= 28 && i <= 34) { // 有刻子或雀头是字牌
                    pinghu = false;
                    break;
                }
            // --------------------------
            let sansetongshun = false, ersetongshun_num = 0;
            for (let i = 2; i <= 8; i++) {
                if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                    sansetongshun = true;

                for (let j = 0; j < 3; j++)
                    for (let k = j + 1; k < 3; k++)
                        if (shunzi[i + 9 * j] >= 1 && shunzi[i + 9 * k] >= 1) {
                            ersetongshun_num += shunzi[i + 9 * j] >= 2 && shunzi[i + 9 * k] >= 2 ? 2 : 1;
                            break;
                        }
            }
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (angang_num === 1 && gangzi_num === 2)
                ans.fans.push({val: 5, id: 8082}); // 明暗杠
            // --------------------------
            // 天地人和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                ans.fans.push({val: 8, id: 8083}); // 天和
                // 不计 不求人, 自摸, 边张, 坎张, 单钓将
                banfan([8055, 8081, 8078, 8079, 8080]);
            }

            let first_tile = true;
            for (let i = 0; i < playercnt; i++) {
                if (i === ju)
                    continue;
                if (!(liqiinfo[i].yifa !== 0 && liqiinfo[i].liqi === 0))
                    first_tile = false;
            }
            if (first_tile && seat !== ju && !zimo) {
                ans.fans.push({val: 8, id: 8084}); // 地和
                // 不计 门前清
                banfan(8063);
            }

            // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo) {
                ans.fans.push({val: 8, id: 8085}); // 人和
                // 不计 不求人, 自摸
                banfan([8055, 8081]);
            } else if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && liqiinfo[(ju + 1) % playercnt].yifa === 0) {
                ans.fans.push({val: 8, id: 8085}); // 人和
                // 不计 门前清
                banfan(8063);
            }
            // --------------------------
            // --------------------------
            // --------------------------
            // 88 番, 十三幺不在 calc 函数中, 另算
            if (dasixi && !is_banned(8000)) {
                ans.fans.push({val: 88, id: 8000}); // 大四喜
                // 不计 三风刻, 碰碰和, 圈风刻, 门风刻, 幺九刻
                banfan([8037, 8047, 8061, 8062, 8074]);
            }
            if (dasanyuan && !is_banned(8001)) {
                ans.fans.push({val: 88, id: 8001}); // 大三元
                // 不计 双箭刻, 箭刻, 组成大三元的三副刻子不计幺九刻
                banfan([8053, 8058, 8059, 8060]);
                ban_yaojiuke_num += 3;
            }
            if (flag_lvyise && !is_banned(8002)) {
                ans.fans.push({val: 88, id: 8002}); // 绿一色
                // 不计 混一色
                banfan(8048);
            }
            // 国标中的九莲对标立直麻将中的纯九
            if (jiulian && !is_banned(8003)) {
                ans.fans.push({val: 88, id: 8003}); // 九莲宝灯
                // 不计 清一色, 不求人, 门前清, 无字, 一个幺九刻
                banfan([8021, 8055, 8063, 8077]);
                ban_yaojiuke_num++;
            }
            if (gangzi_num === 4 && !is_banned(8004)) {
                ans.fans.push({val: 88, id: 8004}); // 四杠
                // 不计 碰碰和, 单钓将
                banfan([8047, 8080]);
            }

            let lianqidui = false;
            for (let i = 0; i <= 2; i++)
                if (typecnt[3 + i * 9][7] >= 1 && typecnt[4 + i * 9][7] >= 1 && typecnt[5 + i * 9][7] >= 1 && typecnt[6 + i * 9][7] >= 1 && typecnt[7 + i * 9][7] >= 1) {
                    if (typecnt[1 + i * 9][7] >= 1 && typecnt[2 + i * 9][7] >= 1)
                        lianqidui = true;
                    if (typecnt[2 + i * 9][7] >= 1 && typecnt[8 + i * 9][7] >= 1)
                        lianqidui = true;
                    if (typecnt[8 + i * 9][7] >= 1 && typecnt[9 + i * 9][7] >= 1)
                        lianqidui = true;
                    break;
                }
            if (lianqidui && !is_banned(8005)) {
                ans.fans.push({val: 88, id: 8005}); // 连七对
                // 不计 清一色, 七对, 不求人, 门前清, 无字, 单钓将
                banfan([8021, 8018, 8055, 8063, 8077, 8080]);
            }
            // ---------------------------
            // 64 番
            if (flag_qinglaotou && !is_banned(8007)) {
                ans.fans.push({val: 64, id: 8007}); // 清幺九
                // 不计 混幺九, 碰碰和, 全带幺, 双同刻, 幺九刻, 无字
                banfan([8017, 8047, 8054, 8066, 8074, 8077]);
            }
            if (xiaosixi && !is_banned(8008)) {
                ans.fans.push({val: 64, id: 8008}); // 小四喜
                // 不计 三风刻, 幺九刻
                banfan([8037, 8074]);
            }
            if (xiaosanyuan && !is_banned(8009)) {
                ans.fans.push({val: 64, id: 8009}); // 小三元
                // 不计 箭刻, 双箭刻, 组成小三元的两副刻子不计幺九刻
                banfan([8058, 8059, 8060, 8053]);
                ban_yaojiuke_num += 2;
            }
            if (flag_ziyise && !is_banned(8010)) {
                ans.fans.push({val: 64, id: 8010}); // 字一色
                // 不计 混幺九, 碰碰和, 全带幺, 幺九刻
                // 此外删除判断漏洞的混一色
                banfan([8017, 8047, 8054, 8074, 8048]);
            }
            if (anke_num === 4 && !is_banned(8011)) {
                ans.fans.push({val: 64, id: 8011}); // 四暗刻
                // 不计 碰碰和, 不求人, 门前清
                banfan([8047, 8055, 8063]);
            }

            let shuanglonghui = false;
            for (let i = 0; i <= 2; i++)
                if (shunzi[2 + i] >= 2 && shunzi[8 + i] >= 2 && typecnt[5 + i][7] >= 1)
                    shuanglonghui = true;

            if (shuanglonghui && !is_banned(8012)) {
                ans.fans.push({val: 64, id: 8012}); // 一色双龙会
                // 不计 七对, 清一色, 平和, 一般高, 老少副, 无字
                banfan([8018, 8021, 8064, 8070, 8073, 8077]);
            }
            // ---------------------------
            // 48 番
            let sitongshun = false, sijiegao = false;
            for (let i = 0; i <= 2; i++)
                for (let j = 1; j <= 9; j++) {
                    if (j !== 1 && j !== 9 && shunzi[i * 9 + j] >= 4)
                        sitongshun = true;
                    if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                        sijiegao = true;
                }
            if (sitongshun && !is_banned(8013)) {
                ans.fans.push({val: 48, id: 8013}); // 一色四同顺
                // 不计 一色三同顺, 一色三节高, 七对, 四归一, 一般高
                banfan([8022, 8023, 8018, 8065, 8070]);
            }
            if (sijiegao && !is_banned(8014)) {
                ans.fans.push({val: 48, id: 8014}); // 一色四节高
                // 不计 一色三同顺, 一色三节高, 碰碰和
                banfan([8022, 8023, 8047]);
            }
            // ---------------------------
            // 32 番
            let sibugao = false;
            for (let i = 0; i <= 2; i++) {
                for (let j = 2; j <= 5; j++)
                    if (shunzi[i * 9 + j] >= 1 && shunzi[i * 9 + j + 1] >= 1 && shunzi[i * 9 + j + 2] >= 1 && shunzi[i * 9 + j + 3] >= 1)
                        sibugao = true;

                if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                    sibugao = true;
            }
            if (sibugao && !is_banned(8015)) {
                ans.fans.push({val: 32, id: 8015}); // 一色四步高
                // 不计 一色三步高, 连六, 老少副
                banfan([8029, 8072, 8073]);
            }
            if (gangzi_num === 3)
                ans.fans.push({val: 32, id: 8016}); // 三杠
            if (flag_hunlaotou && !flag_qinglaotou && !is_banned(8017)) {
                ans.fans.push({val: 32, id: 8017}); // 混幺九
                // 不计 碰碰和, 全带幺, 幺九刻
                banfan([8047, 8054, 8074]);
            }
            // ---------------------------
            // 24 番
            // 七星不靠不在 calc 函数中, 另算
            if (duizi_num === 7 && !is_banned(8018)) {
                ans.fans.push({val: 24, id: 8018}); // 七对
                // 不计 不求人, 门前清, 单钓将
                banfan([8055, 8063, 8080]);
            }
            let quanshuangke = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgetile(inttotile(i), 'quanshuang') && cnt2[i] >= 1)
                    quanshuangke = false;
            if (duizi_num >= 2) // 不能是七对
                quanshuangke = false;
            if (quanshuangke && !is_banned(8020)) {
                ans.fans.push({val: 24, id: 8020}); // 全双刻
                // 不计 碰碰和, 断幺, 无字
                banfan([8047, 8069, 8077]);
            }
            if (qingyise && !is_banned(8021)) {
                ans.fans.push({val: 24, id: 8021}); // 清一色
                // 不计 无字
                banfan(8077);
            }

            if (santongshun && !is_banned(8022)) {
                ans.fans.push({val: 24, id: 8022}); // 一色三同顺
                // 不计 一色三节高, 一般高
                banfan([8023, 8070]);
            }

            let sanjiegao = false;
            for (let j = 0; j <= 2; j++)
                for (let i = 1; i <= 7; i++)
                    if (kezi[j * 9 + i] >= 1 && kezi[j * 9 + i + 1] >= 1 && kezi[j * 9 + i + 2] >= 1)
                        sanjiegao = true;
            if (sanjiegao && !is_banned(8023)) {
                ans.fans.push({val: 24, id: 8023}); // 一色三节高
                // 不计一色三同顺
                banfan(8022);
            }

            let quanda = true, quanzhong = true, quanxiao = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgetile(inttotile(i), 'quanda') && cnt2[i] >= 1)
                    quanda = false;
                if (!judgetile(inttotile(i), 'quanzhong') && cnt2[i] >= 1)
                    quanzhong = false;
                if (!judgetile(inttotile(i), 'quanxiao') && cnt2[i] >= 1)
                    quanxiao = false;
            }

            if (quanda && !is_banned(8024)) {
                ans.fans.push({val: 24, id: 8024}); // 全大
                // 不计 大于五, 无字
                banfan([8035, 8077]);
            }
            if (quanzhong && !is_banned(8025)) {
                ans.fans.push({val: 24, id: 8025}); // 全中
                // 不计 断幺, 无字
                banfan([8069, 8077]);
            }
            if (quanxiao && !is_banned(8026)) {
                ans.fans.push({val: 24, id: 8026}); // 全小
                // 不计 小于五, 无字
                banfan([8036, 8077]);
            }
            // ---------------------------
            // 16 番
            if (yiqi && !is_banned(8027)) {
                ans.fans.push({val: 16, id: 8027}); // 清龙
                // 不计 连六, 老少副
                banfan([8072, 8073]);
            }
            let sanseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + 9 * ((i + 1) % 3)] >= 1 && shunzi[8 + 9 * ((i + 1) % 3)] >= 1)
                    if (shunzi[2 + 9 * ((i + 2) % 3)] >= 1 && shunzi[8 + 9 * ((i + 2) % 3)] >= 1)
                        if (typecnt[5 + 9 * i][7] >= 1)
                            sanseshuanglonghui = true;
            if (sanseshuanglonghui && !is_banned(8028)) {
                ans.fans.push({val: 16, id: 8028}); // 三色双龙会
                // 不计 喜相逢, 老少副, 无字, 平和
                banfan([8071, 8073, 8077, 8064]);
            }
            let sanbugao = false;
            for (let j = 0; j <= 2; j++) {
                for (let i = 2; i <= 6; i++)
                    if (shunzi[j * 9 + i] >= 1 && shunzi[j * 9 + i + 1] >= 1 && shunzi[j * 9 + i + 2] >= 1)
                        sanbugao = true;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[j * 9 + 2 + i] >= 1 && shunzi[j * 9 + 4 + i] >= 1 && shunzi[j * 9 + 6 + i] >= 1)
                        sanbugao = true;
            }
            if (sanbugao && !is_banned(8029))
                ans.fans.push({val: 16, id: 8029}); // 一色三步高
            let quandaiwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!(i >= 4 && i <= 6) && !(i >= 13 && i <= 15) && !(i >= 22 && i <= 24) && shunzi[i] >= 1)
                    quandaiwu = false;
                if (i !== C5m && i !== C5p && i !== C5s)
                    if (kezi[i] >= 1 || typecnt[i][7] >= 1)
                        quandaiwu = false;
            }
            if (quandaiwu && !is_banned(8030)) {
                ans.fans.push({val: 16, id: 8030}); // 全带五
                // 不计 断幺, 无字
                banfan([8069, 8077]);
            }

            if (santongke && !is_banned(8031)) {
                ans.fans.push({val: 16, id: 8031}); // 三同刻
                // 不计 双同刻
                banfan(8066);
            }
            if (anke_num === 3 && !is_banned(8032))
                ans.fans.push({val: 16, id: 8032}); // 三暗刻
            // ---------------------------
            // 12 番
            // 全不靠和组合龙不在 calc 函数中, 另算
            let dayuwu = true, xiaoyuwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgetile(inttotile(i), 'dayuwu') && cnt2[i] >= 1)
                    dayuwu = false;
                if (!judgetile(inttotile(i), 'xiaoyuwu') && cnt2[i] >= 1)
                    xiaoyuwu = false;
            }
            if (dayuwu && !is_banned(8035)) {
                ans.fans.push({val: 12, id: 8035}); // 大于五
                // 不计 无字
                banfan(8077);
            }
            if (xiaoyuwu && !is_banned(8036)) {
                ans.fans.push({val: 12, id: 8036}); // 小于五
                // 不计 无字
                banfan(8077);
            }
            let sanfengke = false;
            for (let i = 0; i < 4; i++)
                if (kezi[C1z + i] >= 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1)
                    sanfengke = true;
            if (sanfengke && !xiaosixi && !is_banned(8037)) {
                ans.fans.push({val: 12, id: 8037}); // 三风刻
                // 组成三风刻的三副刻子不计幺九刻
                ban_yaojiuke_num += 3;
            }
            // ---------------------------
            // 8 番, 无番和放到最后
            let hualong = false;
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        if (i !== j && j !== k && i !== k)
                            if (shunzi[3 * i + 2] >= 1 && shunzi[3 * j + 11] && shunzi[3 * k + 20]) {
                                hualong = true;
                                break;
                            }
            if (hualong && !is_banned(8038)) {
                ans.fans.push({val: 8, id: 8038}); // 花龙
                // 还有喜相逢时, 删除连六和老少副
                if (ersetongshun_num >= 1)
                    banfan([8072, 8073]);
            }

            let tuibudao = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgetile(inttotile(i), 'tuibudao') && cnt2[i] >= 1)
                    tuibudao = false;

            if (tuibudao && !is_banned(8039)) {
                ans.fans.push({val: 8, id: 8039}); // 推不倒
                // 不计 缺一门
                banfan(8076);
            }

            if (sansetongshun && !is_banned(8040)) {
                ans.fans.push({val: 8, id: 8040}); // 三色三同顺
                // 不计 喜相逢
                banfan(8071);
            }
            let sansesanjiegao = false;
            for (let i = C1m; i <= C9m - 2; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        for (let l = 0; l < 3; l++)
                            if (j !== k && j !== k && k !== l)
                                if (kezi[i + j] >= 1 && kezi[i + k + 9] >= 1 && kezi[i + l + 18] >= 1)
                                    sansesanjiegao = true;

            if (sansesanjiegao && !is_banned(8041))
                ans.fans.push({val: 8, id: 8041}); // 三色三节高
            if (paishan.length === 0) {
                if (zimo && !is_banned(8043)) {
                    ans.fans.push({val: 8, id: 8043}); // 妙手回春
                    // 不计 自摸
                    banfan(8081);
                } else if (!is_banned(8044))
                    ans.fans.push({val: 8, id: 8044}); // 海底捞月
            }
            if (zimo && lstdrawtype === 0 && !is_banned(8045) && getlstaction(2).name !== 'RecordBaBei') {
                ans.fans.push({val: 8, id: 8045}); // 杠上开花
                // 不计 自摸
                banfan(8081);
            }
            if (lstaction.name === 'RecordAnGangAddGang' && !is_banned(8046)) {
                ans.fans.push({val: 8, id: 8046}); // 抢杠和
                // 不计 和绝张
                banfan(8057);
            }
            // ---------------------------
            // 6 番
            if (kezi_num === 4 && !is_banned(8047))
                ans.fans.push({val: 6, id: 8047}); // 碰碰和
            if (hunyise && !qingyise && !is_banned(8048))
                ans.fans.push({val: 6, id: 8048}); // 混一色
            let sansesanbugao = false;
            for (let i = 2; i <= 6; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        for (let l = 0; l < 3; l++)
                            if (j !== k && j !== k && k !== l)
                                if (shunzi[i + j] >= 1 && shunzi[i + k + 9] >= 1 && shunzi[i + l + 18] >= 1)
                                    sansesanbugao = true;

            if (sansesanbugao && !is_banned(8049))
                ans.fans.push({val: 6, id: 8049}); // 三色三步高
            if (wumenqi && !is_banned(8050))
                ans.fans.push({val: 6, id: 8050}); // 五门齐
            let quanqiuren = true;
            if (zimo || fulucnt !== 4)
                quanqiuren = false;

            if (quanqiuren && !is_banned(8051)) {
                ans.fans.push({val: 6, id: 8051}); // 全求人
                // 不计 单钓将
                banfan(8080);
            }
            if (angang_num === 2 && !is_banned(8052)) {
                ans.fans.push({val: 6, id: 8052}); // 双暗杠
                // 不计 双暗刻
                banfan(8067);
            }

            let shuangjianke = false;
            for (let i = 0; i < 3; i++)
                if (kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    shuangjianke = true;
            if (shuangjianke && !is_banned(8053)) {
                // 不计箭刻, 组成双箭刻的两副刻子不计幺九刻
                banfan([8058, 8059, 8060]);
                ban_yaojiuke_num += 2;
                ans.fans.push({val: 6, id: 8053}); // 双箭刻
            }
            // ---------------------------
            // 4 番
            if (hunquandai && !is_banned(8054))
                ans.fans.push({val: 4, id: 8054}); // 全带幺
            if (menqing && zimo && !is_banned(8055)) {
                // 不计 自摸
                banfan(8081);
                ans.fans.push({val: 4, id: 8055}); // 不求人
            }

            if (minggang_num === 2 && gangzi_num === 2 && !is_banned(8056))
                ans.fans.push({val: 4, id: 8056}); // 双明杠

            let lastile_num = 0;
            for (let i = 0; i < playercnt; i++) {
                for (let j in paihe[i].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (equaltile(lastile, paihe[i].tiles[j]))
                        lastile_num++;
                for (let j in fulu[i])  // 查副露
                    if (fulu[i][j].from !== undefined)
                        for (let k = 0; k < fulu[i][j].tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (equaltile(lastile, fulu[i][j].tile[k]))
                                lastile_num++;
            }
            if (lastile_num === 4 && !is_banned(8057))
                ans.fans.push({val: 4, id: 8057}); // 和绝张
            // ---------------------------
            // 2 番
            if (!is_banned(8058))
                for (let i = 0; i < kezi[C5z]; i++) {
                    ans.fans.push({val: 2, id: 8058}); // 箭刻 白
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!is_banned(8059))
                for (let i = 0; i < kezi[C5z + 1]; i++) {
                    ans.fans.push({val: 2, id: 8059}); // 箭刻 发
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!is_banned(8060))
                for (let i = 0; i < kezi[C7z]; i++) {
                    ans.fans.push({val: 2, id: 8060}); // 箭刻 中
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (!is_banned(8061))
                for (let i = 0; i < kezi[tiletoint((chang + 1).toString() + 'z')]; i++) {
                    ans.fans.push({val: 2, id: 8061}); // 圈风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!is_banned(8062))
                for (let i = 0; i < kezi[tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z')]; i++) {
                    ans.fans.push({val: 2, id: 8062}); // 门风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (menqing && !zimo && !is_banned(8063))
                ans.fans.push({val: 2, id: 8063}); // 门前清

            if (pinghu && !is_banned(8064)) {
                ans.fans.push({val: 2, id: 8064}); // 平和
                // 不计 无字
                banfan(8077);
            }

            let siguiyi_num = 0;
            for (let i = C1m; i <= C7z; i++)
                if (cnt2[i] === 4 && gangzi[i] === 0)
                    siguiyi_num++;
            if (siguiyi_num >= 1 && !is_banned(8065))
                ans.fans.push({val: 2 * siguiyi_num, id: 8065}); // 四归一

            if (shuangtongke && !is_banned(8066))
                ans.fans.push({val: 2, id: 8066}); // 双同刻

            if (anke_num === 2 && !is_banned(8067))
                ans.fans.push({val: 2, id: 8067}); // 双暗刻
            if (angang_num === 1 && gangzi_num === 1 && !is_banned(8068))
                ans.fans.push({val: 2, id: 8068}); // 暗杠
            if (flag_duanyao && !is_banned(8069)) {
                ans.fans.push({val: 2, id: 8069}); // 断幺
                // 不计 无字
                banfan(8077);
            }
            // ---------------------------
            // 1 番
            if (beikou >= 1 && !is_banned(8070))
                ans.fans.push({val: beikou, id: 8070}); // 一般高
            if (ersetongshun_num >= 1 && !sansetongshun && !is_banned(8071))
                // 有2个一般高的情况下喜相逢最多只会算1个
                ans.fans.push({val: beikou >= 2 ? 1 : ersetongshun_num, id: 8071}); // 一般高

            let lianliu_num = 0;
            for (let j = 0; j <= 2; j++)
                for (let i = 2; i <= 5; i++)
                    if (shunzi[j * 9 + i] >= 1 && shunzi[j * 9 + i + 3] >= 1)
                        lianliu_num++;
            if (lianliu_num >= 1 && !is_banned(8072))
                // 有2个一般高, 喜相逢的情况下连六最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : lianliu_num, id: 8072}); // 连六

            let laoshaofu_num = 0;
            for (let j = 0; j <= 2; j++)
                if (shunzi[j * 9 + 2] >= 1 && shunzi[j * 9 + 8] >= 1)
                    if (shunzi[j * 9 + 2] >= 2 && shunzi[j * 9 + 8] >= 2)
                        laoshaofu_num += 2;
                    else
                        laoshaofu_num++;

            if (laoshaofu_num >= 1 && !is_banned(8073))
                // 有2个一般高, 喜相逢的情况下老少副最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : laoshaofu_num, id: 8073}); // 老少副

            let yaojiuke_num = -ban_yaojiuke_num;
            for (let i = C1m; i <= C7z; i++)
                if (judgetile(inttotile(i), 'Y'))
                    yaojiuke_num += kezi[i];
            if (!is_banned(8074) && yaojiuke_num >= 1)
                ans.fans.push({val: yaojiuke_num, id: 8074}); // 幺九刻

            if (minggang_num === 1 && gangzi_num === 1 && !is_banned(8075))
                ans.fans.push({val: 1, id: 8075}); // 明杠

            let queyimen = false, have_m = 0, have_p = 0, have_s = 0;
            for (let i = C1m; i <= C9m; i++) {
                if (cnt2[i] >= 1)
                    have_m = 1;
                if (cnt2[i + 9] >= 1)
                    have_p = 1;
                if (cnt2[i + 18] >= 1)
                    have_s = 1;
            }
            if (have_m + have_p + have_s === 2)
                queyimen = true;
            if (queyimen && !is_banned(8076))
                ans.fans.push({val: 1, id: 8076}); // 缺一门

            let wuzi = true;
            for (let i = C1z; i <= C7z; i++)
                if (cnt2[i] >= 1)
                    wuzi = false;
            if (wuzi && !is_banned(8077))
                ans.fans.push({val: 1, id: 8077}); // 无字

            let cnt_tiles = []; // 只包括手牌的 cnt, cnt2 是包括副露的
            for (let i = C1m; i <= C7z; i++)
                cnt_tiles[i] = 0;
            for (let i in tiles)
                cnt_tiles[tiletoint(tiles[i])]++;

            let bianzhang = false;
            if ((tiletoint(lastile) - 1) % 9 + 1 === 3 && cnt_tiles[tiletoint(lastile) - 1] >= 1 && cnt_tiles[tiletoint(lastile) - 2] >= 1)
                bianzhang = true;
            if ((tiletoint(lastile) - 1) % 9 + 1 === 7 && cnt_tiles[tiletoint(lastile) + 1] >= 1 && cnt_tiles[tiletoint(lastile) + 2] >= 1)
                bianzhang = true;
            if (bianzhang && !is_banned(8078)) {
                cnt[tiletoint(lastile)]--;
                tiles.pop();
                if (calctingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8078}); // 边张
                tiles.push(lastile);
                cnt[tiletoint(lastile)]++;
            }

            let kanzhang = cnt_tiles[tiletoint(lastile) - 1] >= 1 && cnt_tiles[tiletoint(lastile) + 1] >= 1;
            if (kanzhang && !bianzhang && !is_banned(8079)) {
                cnt[tiletoint(lastile)]--;
                tiles.pop();
                if (calctingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8079}); // 坎张
                tiles.push(lastile);
                cnt[tiletoint(lastile)]++;
            }

            let dandiaojiang = true;
            if (typecnt[tiletoint(lastile)][7] !== 1)
                dandiaojiang = false;

            if (dandiaojiang && !kanzhang && !bianzhang && !is_banned(8080)) {
                cnt[tiletoint(lastile)]--;
                tiles.pop();
                if (calctingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8080}); // 单钓将
                tiles.push(lastile);
                cnt[tiletoint(lastile)]++;
            }

            if (zimo && !is_banned(8081))
                ans.fans.push({val: 1, id: 8081}); // 自摸
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 无番和
            if (ans.fans.length === 0 && !is_banned(8042))
                ans.fans.push({val: 8, id: 8042}); // 无番和
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 花牌
            let huapai_num = 0;
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    huapai_num++;
            if (huapai_num >= 1 && huapai_num <= 8)
                ans.fans.push({val: huapai_num, id: 8090 + huapai_num});
            else if (huapai_num >= 9)
                ans.fans.push({val: huapai_num, id: 8099});
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C7z; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgetile(inttotile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (i === tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i === tiletoint((chang + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i >= C5z && i <= C7z)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu =
                Math.ceil(ans.fu / 10) * 10;
            if (fulucnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }
}

/**
 * calcsudian 组 - 立直
 *
 * 根据算得的番计算素点
 * @param {{yiman: boolean, fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {boolean} x.yiman - 是否为役满
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {number} type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 * @returns {number}
 */
function calcsudian(x, type = 0) {
    let fanfu = 1;
    if (typeof config.mode.detail_rule.fanfu == 'number')
        fanfu = config.mode.detail_rule.fanfu;

    let val = 0;
    for (let i in x.fans)
        val += x.fans[i].val;
    if (is_qingtianjing())
        return x.fu * Math.pow(2, val + 2);

    if (x.yiman)
        return 8000 * val;

    else if (val < fanfu)
        return -2000;
    else if (val >= 13 && !no_leijiyiman())
        return 8000 + type * (val + x.fu * 0.01);
    else if (val >= 11)
        return 6000 + type * (val + x.fu * 0.01)
    else if (val >= 8)
        return 4000 + type * (val + x.fu * 0.01)
    else if (val >= 6)
        return 3000 + type * (val + x.fu * 0.01)
    else if (val >= 5)
        return 2000 + type * (val + x.fu * 0.01)
    else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return 2000 + type * (val + x.fu * 0.01)
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, 2000) + type * (val + x.fu * 0.01)
}

/**
 * calcsudian 组 - 川麻
 *
 * 根据算得的番计算素点
 * @param {{fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {number} type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 * @returns {number}
 */
function calcsudian_chuanma(x, type = 0) {
    let val = 0;
    for (let i in x.fans)
        val = val + x.fans[i].val;
    if (val === 0)
        return 0;
    return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
}

/**
 * calcsudian 组 - 国标
 *
 * 根据算得的番计算素点
 * @param {{fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {boolean} no_huapai - 是否不考虑花牌, 默认考虑
 * @returns {number}
 */
function calcsudian_guobiao(x, no_huapai = false) {
    let val = 0;
    for (let i in x.fans)
        if (!(no_huapai && x.fans[i].id >= 8091 && x.fans[i].id <= 8099))
            val = val + x.fans[i].val;
    return val * scale_points();
}

// ===========================================

/**
 * 川麻刮风下雨
 * @param {boolean} [type] - 是否完场, 默认不完场
 */
function calcgangpoint(type = false) {
    if (chuanmagangs.notover.length === 0)
        return;
    for (let i = chuanmagangs.notover.length - 1; i >= 0; i--) {
        chuanmagangs.over.push(chuanmagangs.notover[i]);
        delta_scores[chuanmagangs.notover[i].from] -= chuanmagangs.notover[i].val;
        delta_scores[chuanmagangs.notover[i].to] += chuanmagangs.notover[i].val;
        chuanmagangs.notover.pop();
    }
    let old_scores = scores.slice();
    for (let i = 0; i < playercnt; i++)
        scores[i] += delta_scores[i];

    if (!type)
        addGangResult(old_scores);
    else
        addGangResultEnd(old_scores);

    for (let i = 0; i < playercnt; i++)
        delta_scores[i] = 0;
}

// 小局结束
function roundend() {
    if (actions.length === 0)
        return;
    if (is_chuanma() && chuanmagangs.notover.length !== 0 && getlstaction().name !== 'RecordNoTile' && getlstaction().name !== 'RecordHuleXueZhanEnd')
        calcgangpoint(true);
    qiepaiset = ['', '', '', ''];
    mopaiset = ['', '', '', ''];
    tiles0 = tiles1 = tiles2 = tiles3 = muyuseats = '';
    paishan = [];

    editdata.actions.push(actions.slice());
    editdata.xun.push(xun.slice());
    xun = [[], [], [], []];
    actions = [];
    if (is_chuanma() && juc !== -1) {
        ju = juc;
        juc = -1;
    }
    if (ju === playercnt) {
        chang++;
        ju = 0;
    }
    chang %= playercnt;

    gameend();
}

// 计算终局界面玩家的点数
function gameend() {
    /**
     * 根据最终点数和座次确定位次的比较算法
         * @param {{part_point_1: number, seat: number}} x - 参数1玩家的信息
     * @param {{part_point_1: number, seat: number}} y - 参数2玩家的信息
     * @returns {number} - 有效值 -1, 0, 1
     */
    function cmp2(x, y) {
        if (x.part_point_1 < y.part_point_1)
            return 1;
        if (x.part_point_1 > y.part_point_1)
            return -1;
        if (x.seat > y.seat)
            return 1;
        if (x.seat < y.seat)
            return -1;
        return 0;
    }

    players = [];
    for (let i = 0; i < playercnt; i++)
        players.push({
            gold: 0,
            grading_score: 0,
            part_point_1: scores[i],
            part_point_2: 0,
            seat: i,
            total_point: 0,
        });
    players.sort(cmp2);
    players[0].part_point_1 += liqibang * 1000;

    let madian = [[5, -5], [10, 0, -10], [15, 5, -5, -15]];
    for (let i = 1; i < playercnt; i++) {
        players[i].total_point = players[i].part_point_1 - base_points + madian[playercnt - 2][i] * 1000;
        players[0].total_point -= players[i].total_point;
    }
    editdata.players = players;
    edit_offline();
}

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
function roundinfo() {
    let chang_word = [`东`, `南`, `西`, `北`];
    return `${chang_word[chang]}${ju + 1}局${ben}本场: `;
}

// ===========================================
// ============== 以下是胶水代码 ===============
// ===========================================

/**
 * 胶水代码: 开局
 * @param {number} left_tile_count - 剩余牌数
 * @param {string} md5 - 算得的牌山 md5
 * @param {{seat: number, tingpais1: {tile: string}[]}[]} tingpai - 所有玩家的听牌
 * @param {{seat: number, tiles: string[], count: number[]}[]} opens - 配牌明牌: 明的牌
 */
function addNewRound(left_tile_count, md5, tingpai, opens) {
    actions.push({
        name: 'RecordNewRound',
        data: {
            chang: chang,
            ju: ju,
            ben: ben,
            ju_count: editdata.actions.length,
            left_tile_count: left_tile_count,
            liqibang: liqibang,
            tiles0: playertiles[0].slice(),
            tiles1: playertiles[1].slice(),
            tiles2: playertiles[2].slice(),
            tiles3: playertiles[3].slice(),
            paishan: paishan.join(''),
            scores: scores.slice(),
            tingpai: tingpai,
            doras: calcdoras(),
            opens: opens,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            md5: md5,
        }
    });
    calcxun();
}

/**
 * 胶水代码: 摸牌
 * @param {number} seat - 摸牌的玩家
 * @param {string} drawcard - 摸的牌
 * @param {number} left_tile_count - 剩余牌数
 * @param {{}} liqi - 刚立直玩家的立直信息
 * @param {boolean} tile_state - 配牌明牌: 摸的牌是否是明牌
 * @param {number} tile_index - 占星之战: 摸的牌在候选池的位置
 * @param {{}|{seat: number, liqi: number, continue_deal_count: number, overload: boolean}} hunzhiyiji_data - 魂之一击: 魂之一击立直数据
 */
function addDealTile(seat, drawcard, left_tile_count, liqi, tile_state, tile_index, hunzhiyiji_data) {
    actions.push({
        name: 'RecordDealTile',
        data: {
            seat: seat,
            tile: drawcard,
            left_tile_count: left_tile_count,
            liqi: liqi,
            doras: calcdoras(),
            tile_state: tile_state,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            tile_index: is_zhanxing() ? tile_index : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() ? hunzhiyiji_data : undefined,
        }
    });
    calcxun();
}

/**
 * 胶水代码: 占星之战: 牌候选池填充
 * @param {number} seat - 要摸牌的玩家
 * @param {number} left_tile_count - 剩余牌数
 * @param {{}|{liqibang: number, seat: number, scores: number[]}} liqi - 刚立直玩家的立直信息
 */
function addFillAwaitingTiles(seat, left_tile_count, liqi) {
    actions.push({
        name: 'RecordFillAwaitingTiles',
        data: {
            operation: {seat: seat},
            awaiting_tiles: awaiting_tiles.slice(),
            left_tile_count: left_tile_count,
            liqi: liqi,
            doras: calcdoras(),
        }
    });
}

/**
 * 胶水代码: 切牌
 * @param {number} seat - 切牌的玩家
 * @param {string} tile - 切的牌
 * @param {boolean} moqie - 是否为摸切
 * @param {boolean} is_liqi - 是否立直
 * @param {boolean} is_wliqi - 是否为双立直
 * @param {boolean} is_kailiqi - 是否为开立直
 * @param {boolean} tile_state - 配牌明牌: 切的牌是否为明的牌
 * @param {number} beishui_type - 背水之战: 立直类型
 */
function addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type) {
    actions.push({
        name: 'RecordDiscardTile',
        data: {
            seat: seat,
            tile: tile,
            moqie: moqie,
            is_liqi: is_liqi,
            is_wliqi: is_wliqi,
            is_kailiqi: is_kailiqi,
            doras: calcdoras(),
            tingpais: calctingpai(seat),
            tile_state: tile_state,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            yongchang: is_yongchang() ? JSON.parse(JSON.stringify(yongchang_data[seat])) : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload ? JSON.parse(JSON.stringify(hunzhiyiji_info[seat])) : undefined,
            liqi_type_beishuizhizhan: is_liqi ? beishui_type : undefined,
        }
    });
}

/**
 * 胶水代码: 暗夜之战暗牌
 * @param {number} seat - 暗牌的玩家
 * @param {string} tile - 切的牌
 * @param {boolean} moqie - 是否为摸切
 * @param {boolean} is_liqi - 是否立直
 * @param {boolean} is_wliqi - 是否为双立直
 */
function addRevealTile(seat, tile, moqie, is_liqi, is_wliqi) {
    actions.push({
        name: 'RecordRevealTile',
        data: {
            seat: seat,
            tile: tile,
            moqie: moqie,
            is_liqi: is_liqi,
            is_wliqi: is_wliqi,
            liqibang: liqibang,
            scores: scores.slice(),
            tingpais: calctingpai(seat),
        }
    });
}

/**
 * 胶水代码: 暗夜之战锁牌
 * @param {number} seat - 切牌的玩家
 * @param {number} lock_state - 锁定状态, 0 为未锁定, 1 为锁定, 2 为无人开牌
 * @param {string} [tile] - 切的牌
 */
function addLockTile(seat, lock_state, tile = '') {
    actions.push({
        name: 'RecordLockTile',
        data: {
            seat: seat,
            tile: tile,
            scores: scores.slice(),
            liqibang: liqibang,
            lock_state: lock_state,
        }
    });
}

/**
 * 胶水代码: 暗夜之战开牌
 * @param {number} seat - 开牌的玩家
 */
function addUnveilTile(seat) {
    actions.push({
        name: 'RecordUnveilTile',
        data: {
            seat: seat,
            scores: scores.slice(),
            liqibang: liqibang,
        }
    });
}

/**
 * 胶水代码: 他家鸣牌(吃/碰/明杠)
 * @param {number} seat - 鸣牌的玩家
 * @param {string[]} tiles - 参与鸣牌的所有牌
 * @param {number[]} froms - 副露的牌来自哪些玩家
 * @param {number} type - 操作类型, 0吃, 1碰, 2明杠
 * @param {{}} liqi - 刚立直玩家的立直信息
 * @param {boolean[]} tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
function addChiPengGang(seat, tiles, froms, type, liqi, tile_states) {
    actions.push({
        name: 'RecordChiPengGang',
        data: {
            seat: seat,
            tiles: tiles,
            type: type,
            froms: froms,
            liqi: liqi,
            tingpais: calctingpai(seat),
            tile_states: tile_states,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            yongchang: is_yongchang() ? JSON.parse(JSON.stringify(yongchang_data[froms.at(-1)])) : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi ? JSON.parse(JSON.stringify(hunzhiyiji_info[froms.at(-1)])) : undefined,
        }
    });
    calcxun();
}

/**
 * 胶水代码: 自家鸣牌(暗杠/加杠)
 * @param {number} seat - 鸣牌的玩家
 * @param {string} tile - 鸣的牌
 * @param {number} type - 操作类型, 2加杠, 3暗杠
 * @param {boolean[]} tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
function addAnGangAddGang(seat, tile, type, tile_states) {
    actions.push({
        name: 'RecordAnGangAddGang',
        data: {
            seat: seat,
            tiles: tile,
            type: type,
            doras: calcdoras(),
            tingpais: calctingpai(seat),
            tile_states: tile_states,
        }
    });
}

/**
 * 胶水代码: 自家鸣牌: 拔北
 * @param {number} seat - 拔北的玩家
 * @param {string} tile - 拔的牌
 * @param {boolean[]} tile_states - 配牌明牌: 拔出去的牌是否为明牌
 */
function addBaBei(seat, tile, tile_states) {
    actions.push({
        name: 'RecordBaBei',
        data: {
            seat: seat,
            tile: tile,
            tile_states: tile_states,
            doras: calcdoras(),
            tingpais: calctingpai(seat),
        }
    });
}

/**
 * 胶水代码: 和牌
 * @param {{}[]} HuleInfo - 本次和牌所有的和牌信息
 * @param {number[]} old_scores - 结算前分数
 * @param {number} baopai - 包牌玩家, 注意和数值比 seat 大1
 */
function endHule(HuleInfo, old_scores, baopai) {
    actions.push({
        name: 'RecordHule',
        data: {
            hules: HuleInfo,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            baopai: baopai,
        }
    });
}

/**
 * 胶水代码: 血战到底(修罗/川麻)中途和牌
 * @param {{}[]} HuleInfo - 本次和牌所有的和牌信息
 * @param {number[]} old_scores - 结算前分数
 * @param {{}} liqi - 刚立直玩家的立直信息
 */
function addHuleXueZhanMid(HuleInfo, old_scores, liqi) {
    actions.push({
        name: 'RecordHuleXueZhanMid',
        data: {
            hules: HuleInfo,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            liqi: liqi,
        }
    });
}

/**
 * 胶水代码: 血战到底(修罗/川麻)完场和牌
 * @param {{}[]} HuleInfo - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
function endHuleXueZhanEnd(HuleInfo, old_scores) {
    actions.push({
        name: 'RecordHuleXueZhanEnd',
        data: {
            hules: HuleInfo,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules_history: hules_history.slice(),
        }
    });
}

/**
 * 胶水代码: 自创函数: 血流成河中途和牌
 * @param {{}[]} HuleInfo - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
function addHuleXueLiuMid(HuleInfo, old_scores) {
    let ret = {
        name: 'RecordHuleXueLiuMid',
        data: {
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules: HuleInfo,
            baopai: 0
        }
    };
    if (getlstaction().name === 'RecordNewRound')
        ret.data.tingpais = calctingpai(ju);
    actions.push(ret);
}

/**
 * 胶水代码: 自创函数: 血流成河完场和牌
 * @param {{}[]} HuleInfo - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
function endHuleXueLiuEnd(HuleInfo, old_scores) {
    actions.push({
        name: 'RecordHuleXueLiuEnd',
        data: {
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules: HuleInfo,
            hules_history: hules_history.slice(),
            baopai: 0,
        }
    });
}

/**
 * 胶水代码: 荒牌流局
 * @param {boolean} liujumanguan - 是否有流局满贯
 * @param {{}[]} players - 玩家手牌相关信息
 * @param {{}[]} scores - 结算相关信息
 */
function endNoTile(liujumanguan, players, scores) {
    actions.push({
        name: 'RecordNoTile',
        data: {
            scores: scores,
            players: players,
            liujumanguan: liujumanguan,
            hules_history: hules_history.slice(),
        }
    });
}

/**
 * 胶水代码: 途中流局
 * @param {{}} liuju_data - 途中流局信息
 */
function endLiuJu(liuju_data) {
    actions.push({
        name: 'RecordLiuJu',
        data: liuju_data,
    });
}

/**
 * 胶水代码: 换三张换牌
 * @param {{}[]} change_tile_infos - 换三张主体信息
 * @param {number} change_type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 * @param {{seat: number, tingpais1: {tile: string}[]}[]} tingpai - 所有玩家的听牌
 */
function addChangeTile(change_tile_infos, change_type, tingpai) {
    actions.push({
        name: 'RecordChangeTile',
        data: {
            change_tile_infos: change_tile_infos,
            change_type: change_type,
            doras: calcdoras(),
            tingpai: tingpai,
            operations: [],
        }
    });
}

/**
 * 胶水代码: 川麻: 定缺
 * @param {number[]} gap_types - 所有玩家的定缺
 * @param {{seat: number, tingpais1: {tile: string}[]}[]} tingpai - 所有玩家的听牌
 */
function addSelectGap(gap_types, tingpai) {
    actions.push({
        name: 'RecordSelectGap',
        data: {
            gap_types: gap_types,
            tingpai: tingpai,
        }
    });
}

/**
 * 胶水代码: 川麻: 刮风下雨
 * @param {number[]} old_scores - 结算前分数
 */
function addGangResult(old_scores) {
    actions.push({
        name: 'RecordGangResult',
        data: {
            gang_infos: {
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
            }
        }
    });
}

/**
 * 胶水代码: 川麻: 刮风下雨完场
 * @param {number[]} old_scores - 结算前分数
 */
function addGangResultEnd(old_scores) {
    actions.push({
        name: 'RecordGangResultEnd',
        data: {
            gang_infos: {
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
                hules_history: hules_history.slice(),
            },
        }
    });
}

/**
 * 胶水代码: 自创函数, 国标错和配打
 * @param {number} seat - 错和的玩家
 * @param {boolean} zimo - 是否为自摸
 * @param {number[]} old_scores - 结算前分数
 */
function addCuohu(seat, zimo, old_scores) {
    actions.push({
        name: 'RecordCuohu',
        data: {
            cuohu_info: {
                seat: seat,
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
                zimo: zimo,
            },
        }
    });
}

// ===========================================
// ======= 以下是 detail_rule 有关设置 =========
// ===========================================

function is_xuezhandaodi() {
    return config.mode.detail_rule.xuezhandaodi;
}

function is_chuanma() {
    return config.mode.detail_rule.chuanma;
}

function is_dora3() {
    return config.mode.detail_rule.dora3_mode;
}

function is_peipaimingpai() {
    return config.mode.detail_rule.begin_open_mode;
}

function is_muyu() {
    return config.mode.detail_rule.muyu_mode;
}

function is_mingjing() {
    return config.mode.detail_rule.jiuchao_mode;
}

function is_anye() {
    return config.mode.detail_rule.reveal_discard;
}

function is_field_spell() {
    return typeof config.mode.detail_rule.field_spell_mode == 'number';
}

function get_field_spell_mode1() {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) % 10);
}

function get_field_spell_mode2() {
    if (!is_field_spell())
        return 0;
    return Math.floor((parseInt(config.mode.detail_rule.field_spell_mode) / 100) % 10);
}

function get_field_spell_mode3() {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) / 10000);
}

function is_zhanxing() {
    return config.mode.detail_rule.zhanxing;
}

function is_tianming() {
    return config.mode.detail_rule.tianming_mode;
}

function is_yongchang() {
    return config.mode.detail_rule.yongchang_mode;
}

function is_hunzhiyiji() {
    return config.mode.detail_rule.hunzhiyiji_mode;
}

function is_wanxiangxiuluo() {
    return config.mode.detail_rule.wanxiangxiuluo_mode;
}

function is_beishuizhizhan() {
    return config.mode.detail_rule.beishuizhizhan_mode;
}

function is_xueliu() {
    return config.mode.detail_rule._xueliu;
}

// -------------------------------------------

function is_guyi() {
    return config.mode.detail_rule.guyi_mode;
}

function is_yifanjieguyi() {
    return config.mode.detail_rule._yifanjieguyi;
}

function no_shiduan() {
    return config.mode.detail_rule._no_shiduan;
}

function no_zimosun() {
    return config.mode.detail_rule._no_zimosun;
}

function is_openhand() {
    return config.mode.detail_rule.open_hand;
}

// -------------------------------------------

function is_qieshang() {
    return config.mode.detail_rule._qieshangmanguan;
}

function is_toutiao() {
    return config.mode.detail_rule._toutiao;
}

function no_normalbaopai() {
    return config.mode.detail_rule._no_normalbaopai;
}

function is_sigangbaopai() {
    return config.mode.detail_rule._sigangbaopai;
}

function no_liujumanguan() {
    return config.mode.detail_rule._no_liujumanguan;
}

function no_yifa() {
    return config.mode.detail_rule._no_yifa;
}

function no_lianfengsifu() {
    return config.mode.detail_rule._no_lianfengsifu;
}

function is_dora_jifan() {
    return config.mode.detail_rule._dora_jifan;
}

function is_sanxiangliuju() {
    return config.mode.detail_rule._sanxiangliuju;
}

function no_leijiyiman() {
    return config.mode.detail_rule._no_leijiyiman;
}

function no_wyakuman() {
    return config.mode.detail_rule._no_wyakuman;
}

function no_guoshiangang() {
    return config.mode.detail_rule._no_guoshiangang;
}

function is_renhumanguan() {
    return config.mode.detail_rule._renhumanguan;
}

function no_dora() {
    return config.mode.detail_rule._no_dora;
}

function no_lidora() {
    return config.mode.detail_rule._no_lidora;
}

function no_gangdora() {
    return config.mode.detail_rule._no_gangdora;
}

function no_ganglidora() {
    return config.mode.detail_rule._no_ganglidora;
}

function is_fufenliqi() {
    return config.mode.detail_rule._fufenliqi;
}

// -------------------------------------------

function is_baogang() {
    return config.mode.detail_rule._baogang;
}

function is_qingtianjing() {
    return config.mode.detail_rule._qingtianjing;
}

function no_zhenting() {
    return config.mode.detail_rule._no_zhenting;
}

function is_ronghuzhahu() {
    return config.mode.detail_rule._ronghuzhahu;
}

function is_buquanshoupai() {
    return config.mode.detail_rule._buquanshoupai;
}

// -------------------------------------------

function is_guobiao() {
    return config.mode.detail_rule._guobiao;
}

function is_guobiao_huapai() {
    return config.mode.detail_rule._guobiao_huapai;
}

function is_guobiao_no_8fanfu() {
    return config.mode.detail_rule._guobiao_no_8fanfu;
}

function is_guobiao_lianzhuang() {
    return config.mode.detail_rule._guobiao_lianzhuang;
}

function scale_points() {
    if (typeof config.mode.detail_rule._scale_points == 'number')
        return config.mode.detail_rule._scale_points;
    return 100;
}

function cuohu_points() {
    if (typeof config.mode.detail_rule._cuohu_points == 'number')
        return config.mode.detail_rule._cuohu_points;
    return 10;
}

function is_cuohupeida() {
    return config.mode.detail_rule._cuohupeida;
}

// ===========================================
// ============ 随机装扮与自定义番种 ============
// ===========================================
/**
 * 回放用装扮随机池和中文服无法加载和排除的装扮, 键是 slot, 值是对应的装扮id数组
 * @type {{}}
 */
let views_pool = {}, invalid_views = {
    // 头像框
    5: [
        305501,  // 头像框-默认
        305510,  // 头像框-四象战
        305511,  // 头像框-四象战
        305512,  // 头像框-四象战
        305513,  // 头像框-四象战
        305514,  // 头像框-四象战
        305515,  // 头像框-四象战
        305516,  // 头像框-四象战
        305517,  // 头像框-四象战
        305518,  // 头像框-四象战
        305519,  // 头像框-四象战
        305524,  // 头像框-四象战
        305525,  // 双聖の眷属たち
        305526,  // Team Championship Limited Portrait Frame
        305527,  // 头像框-四象战
        305528,  // 头像框-四象战
        305530,  // 头像框-四象战
        305531,  // 头像框-四象战
        305532,  // 头像框-四象战
        305533,  // 双聖の眷属たち
        305534,  // 头像框-四象战
        305535,  // 头像框-四象战
        305536,  // 头像框-四象战
        305538,  // 头像框-四象战
        305539,  // 双聖の眷属たち
        305540,  // 头像框-四象战
        305541,  // 头像框-四象战
        305543,  // 头像框-四象战
        305544,  // 头像框-四象战
        305546,  // 双聖の眷属たち
        305547,  // 头像框-四象战
        305548,  // 头像框-四象战
        305549,  // 头像框-四象战
        305550,  // 头像框-四象战
        305553,  // 双聖の眷属たち
        305555,  // 头像框-豆芽测试用
        30550001,  // 头像框-四象战
        30550002,  // 头像框-四象战
        30550003,  // 头像框-四象战
        30550004,  // 头像框-四象战
        30550005,  // 头像框-四象战
        30550006,  // 头像框-四象战
        30550007,  // 双聖の眷属たち
        30550008,  // 头像框-四象战
        30550009,  // 头像框-四象战
        30550010,  // 头像框-四象战
        30550011,  // 头像框-四象战
        30550013,  // 双聖の眷属たち
        30550015,  // 头像框-四象战
        30550018,  // Limited Portrait Frame
        30550019,  // 프로필 테두리 - MKC 2025
        30550024,  // 双聖の眷属たち
    ],
    // 称号
    11: [
        600017,  // 认证玩家
        600025,  // 限时称号测试用
        600026,  // 雀魂公認の選ばれしプレイヤーG
        600029,  // インターハイ王者
        600041,  // 最強鴉天狗の愛弟子
        600043,  // Limited Title
        600044,  // 花より団子
        600048,  // 伝説の名コンビ
        600049,  // 伝説の迷コンビ
        600051,  // 虹懸かる右手
        600055,  // 麻雀スクワッド
        600066,  // みんな家族
        600067,  // ぶいすぽ女傑
        600069,  // インターハイ王者
        600071,  // 煌めく女王の星
        600072,  // 闘魂杯王者
        600073,  // 華風戦優勝
        600076,  // 雀魂インビ夏王者
        600077,  // 雀魂インビ冬将軍
        600081,  // 野鳥観察部
        600082,  // ななしサンマ王
        600085,  // ぶいすぽの頂
        600087,  // 雀荘牌舞台
        600088,  // 闘魂杯王者
        600089,  // 麒麟位2024
        600090,  // 四象战冠军
        600091,  // 四象战冠军
        600092,  // 四象战冠军
        600093,  // 花ノ国 戦国最強
        600095,  // 双聖戦優勝
        600097,  // 雀魂インビ夏王者
        600098,  // 限定称号
        600099,  // 四象战冠军
        600100,  // 四象战冠军
        600102,  // 豪勇無双のまつたけ
        600103,  // 華風戦優勝
        600104,  // Limited Title
        600105,  // MKC 2025 국사무쌍
        600106,  // 四象战冠军
        600109,  // 雀魂インビ冬将軍
        600110,  // ぶいすぽの覇者
        600111,  // プロ×魂天覇者
        600114,  // あやまらないよ！
        600115,  // 双聖戦優勝
        600122,  // 麒麟位2025
    ],
};

/**
 * 各使 update_views, DIY_fans, guobiao_fans 只运行一次的变量
 * @type {boolean}
 */
let update_views_once = true, DIY_fans_once = true, guobiao_fans_once = true;

// 更新装扮随机池
function update_views() {
    if (!update_views_once)
        return;
    update_views_once = false;

    // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
    const slots = [0, 1, 2, 5, 6, 7, 11, 13];
    for (let i in slots) {
        views_pool[slots[i]] = [];
        if (invalid_views[slots[i]] === undefined)
            invalid_views[slots[i]] = [];
    }

    const Items = cfg.item_definition.item.rows_, Titles = cfg.item_definition.title.rows_;
    for (let i in Items) {
        if (Items[i].name_chs === '(已过期)' || Items[i].category !== 5 || Items[i].type === 11)
            continue;
        let slot = Items[i].type;
        if (slots.indexOf(slot) !== -1 && invalid_views[slot].indexOf(Items[i].id) === -1)
            views_pool[slot].push(Items[i].id);
    }
    for (let i in Titles)
        if (invalid_views[11].indexOf(Titles[i].id) === -1)
            views_pool[11].push(Titles[i].id)
}

// 自定义番种: 役种名称的汉字需要在已有的里面选, 否则不会显示
function DIY_fans() {
    if (!DIY_fans_once)
        return;
    DIY_fans_once = false;
    // 9000: 诈和, '诈'字无法显示, 原名称为'振和'
    // 9001: 天地创造: '创造'无法显示, 原名称为'天地大白'
    // 9002: 万物生长: '万生长'无法显示, 原名称为'龙发杠载'
    // 9003: 开立直(役满): 对应语音是对局中的宣言立直
    // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
    // 9005: 开立直(2番)
    // 9006: 开两立直(3番)
    cfg.fan.fan.map_[9000] = {
        id: 9000,
        name_chs: '诈和',
        name_chs_t: '诈和',
        name_jp: '诈和',
        name_en: 'Fake winning',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 5,
        sound: '',
    };
    cfg.fan.fan.map_[9001] = {
        id: 9001,
        name_chs: '天地创造',
        name_chs_t: '天地创造',
        name_jp: '天地创造',
        name_en: 'Beginning of the Cosmos',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 6,
        sound: '',
    };
    cfg.fan.fan.map_[9002] = {
        id: 9002,
        name_chs: '万物生长',
        name_chs_t: '万物生长',
        name_jp: '万物生长',
        name_en: 'Sprout of the Earth',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 7,
        sound: '',
    };
    cfg.fan.fan.map_[9003] = {
        id: 9003,
        name_chs: '役满 开立直',
        name_chs_t: '役满 开立直',
        name_jp: '役满 开立直',
        name_en: 'Open Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9004] = {
        id: 9004,
        name_chs: '役满 开两立直',
        name_chs_t: '役满 开两立直',
        name_jp: '役满 开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9005] = {
        id: 9005,
        name_chs: '开立直',
        name_chs_t: '开立直',
        name_jp: '开立直',
        name_en: 'Open Reach',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: 'fan_liqi',
    };
    cfg.fan.fan.map_[9006] = {
        id: 9006,
        name_chs: '开两立直',
        name_chs_t: '开两立直',
        name_jp: '开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 0,
        sound: 'fan_dliqi',
    };

    // 以下是流局满贯和自风场风役种分化
    // 9100: 流局满贯
    // 9101: 东
    // 9102: 连东
    // 9103: 南
    // 9104: 连南
    // 9105: 西: '西'显示不出来
    // 9106: 连西
    // 9107: 北
    // 9108: 连北
    cfg.fan.fan.map_[9100] = {
        id: 9100,
        name_chs: '流局满贯',
        name_chs_t: '流局滿貫',
        name_jp: '流局滿貫',
        name_en: 'mangan at draw',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 2000,
        sound: 'fan_liujumanguan',
    };
    cfg.fan.fan.map_[9101] = {
        id: 9101,
        name_chs: '役牌 东',
        name_chs_t: '役牌 東',
        name_jp: '役牌 東',
        name_en: 'East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_dong',
    };
    cfg.fan.fan.map_[9102] = {
        id: 9102,
        name_chs: '役牌 连东',
        name_chs_t: '役牌 連東',
        name_jp: '役牌 連東',
        name_en: 'Double East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doubledong',
    };
    cfg.fan.fan.map_[9103] = {
        id: 9103,
        name_chs: '役牌 南',
        name_chs_t: '役牌 南',
        name_jp: '役牌 南',
        name_en: 'South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_nan',
    };
    cfg.fan.fan.map_[9104] = {
        id: 9104,
        name_chs: '役牌 连南',
        name_chs_t: '役牌 連南',
        name_jp: '役牌 連南',
        name_en: 'Double South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublenan',
    };
    cfg.fan.fan.map_[9105] = {
        id: 9105,
        name_chs: '役牌 西',
        name_chs_t: '役牌 西',
        name_jp: '役牌 西',
        name_en: 'West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_xi',
    };
    cfg.fan.fan.map_[9106] = {
        id: 9106,
        name_chs: '役牌 连西',
        name_chs_t: '役牌 連西',
        name_jp: '役牌 連西',
        name_en: 'Double West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublexi',
    };
    cfg.fan.fan.map_[9107] = {
        id: 9107,
        name_chs: '役牌 北',
        name_chs_t: '役牌 北',
        name_jp: '役牌 北',
        name_en: 'North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_bei',
    };
    cfg.fan.fan.map_[9108] = {
        id: 9107,
        name_chs: '役牌 连北',
        name_chs_t: '役牌 連北',
        name_jp: '役牌 連北',
        name_en: 'Double North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_doublebei',
    };

    // 对局操作语音, 中间会有较长时间的停顿
    // 9200: 立直
    // 9201: 两立直
    // 9202: 吃
    // 9203: 碰
    // 9204: 杠
    // 9205: 拔北
    // 9206: 荣, '荣'无法显示, 原名称为'点和'
    // 9207: 自摸
    cfg.fan.fan.map_[9200] = {
        id: 9200,
        name_chs: '立直',
        name_chs_t: '立直',
        name_jp: '立直',
        name_en: 'Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9201] = {
        id: 9200,
        name_chs: '双立直',
        name_chs_t: '双立直',
        name_jp: '双立直',
        name_en: 'Double Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9202] = {
        id: 9202,
        name_chs: '吃',
        name_chs_t: '吃',
        name_jp: '吃',
        name_en: 'Chi',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_chi',
    };
    cfg.fan.fan.map_[9203] = {
        id: 9203,
        name_chs: '碰',
        name_chs_t: '碰',
        name_jp: '碰',
        name_en: 'Pon',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_pon',
    };
    cfg.fan.fan.map_[9204] = {
        id: 9204,
        name_chs: '杠',
        name_chs_t: '杠',
        name_jp: '杠',
        name_en: 'Kan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_kan',
    };
    cfg.fan.fan.map_[9205] = {
        id: 9205,
        name_chs: '拔北',
        name_chs_t: '拔北',
        name_jp: '拔北',
        name_en: 'Babei',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_babei',
    };
    cfg.fan.fan.map_[9206] = {
        id: 9206,
        name_chs: '荣和',
        name_chs_t: '荣和',
        name_jp: '荣和',
        name_en: 'Ron',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_ron',
    };
    cfg.fan.fan.map_[9207] = {
        id: 9207,
        name_chs: '自摸',
        name_chs_t: '自摸',
        name_jp: '自摸',
        name_en: 'Tsumo',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_tumo',
    };
    // 9208: 终局一位语音(天地无双指一姬的)
    cfg.fan.fan.map_[9208] = {
        id: 9208,
        name_chs: '天地无双',
        name_chs_t: '天地无双',
        name_jp: '天地无双',
        name_en: 'tianxiawushuangmiao',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top',
    };

    // 满贯及以上和听牌语音
    // 9300: 满贯
    // 9301: 跳满, '跳'无法显示, 原名称为'一点五满贯'
    // 9302: 倍满, '倍'无法显示, 原名称为'两满贯'
    // 9303: 三倍满
    // 9304: 役满
    // 9305: 双倍役满
    // 9306: 三倍役满
    // 9307: 四倍役满
    // 9308: 五倍役满
    // 9309: 六倍役满
    // 9310: 累计役满, '累计'无法显示, 原名称为'数满贯'
    // 9311: 听牌, '听'无法显示
    // 9312: 未听牌, '未'无法显示, 原名称为'无听牌'
    cfg.fan.fan.map_[9300] = {
        id: 9300,
        name_chs: '满贯',
        name_chs_t: '满贯',
        name_jp: '满贯',
        name_en: 'mangan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_manguan',
    };
    cfg.fan.fan.map_[9301] = {
        id: 9301,
        name_chs: '跳满',
        name_chs_t: '跳满',
        name_jp: '跳满',
        name_en: 'tiaoman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tiaoman',
    };
    cfg.fan.fan.map_[9302] = {
        id: 9302,
        name_chs: '倍满',
        name_chs_t: '倍满',
        name_jp: '倍满',
        name_en: 'beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_beiman',
    };
    cfg.fan.fan.map_[9303] = {
        id: 9303,
        name_chs: '三倍满',
        name_chs_t: '三倍满',
        name_jp: '三倍满',
        name_en: 'sanbeiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sanbeiman',
    };
    cfg.fan.fan.map_[9304] = {
        id: 9304,
        name_chs: '役满',
        name_chs_t: '役满',
        name_jp: '役满',
        name_en: 'yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman1',
    };
    cfg.fan.fan.map_[9305] = {
        id: 9305,
        name_chs: '两倍役满',
        name_chs_t: '两倍役满',
        name_jp: '两倍役满',
        name_en: 'Double Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman2',
    };
    cfg.fan.fan.map_[9306] = {
        id: 9306,
        name_chs: '三倍役满',
        name_chs_t: '三倍役满',
        name_jp: '三倍役满',
        name_en: 'Triple Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman3',
    };
    cfg.fan.fan.map_[9307] = {
        id: 9307,
        name_chs: '四倍役满',
        name_chs_t: '四倍役满',
        name_jp: '四倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman4',
    };
    cfg.fan.fan.map_[9308] = {
        id: 9308,
        name_chs: '五倍役满',
        name_chs_t: '五倍役满',
        name_jp: '五倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman5',
    };
    cfg.fan.fan.map_[9309] = {
        id: 9309,
        name_chs: '六倍役满',
        name_chs_t: '六倍役满',
        name_jp: '六倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman6',
    };
    cfg.fan.fan.map_[9310] = {
        id: 9310,
        name_chs: '累计役满',
        name_chs_t: '累计役满',
        name_jp: '累计役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_leijiyiman',
    };
    cfg.fan.fan.map_[9311] = {
        id: 9311,
        name_chs: '听牌',
        name_chs_t: '听牌',
        name_jp: '听牌',
        name_en: 'tingpai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tingpai',
    };
    cfg.fan.fan.map_[9312] = {
        id: 9310,
        name_chs: '未听牌',
        name_chs_t: '未听牌',
        name_jp: '未听牌',
        name_en: 'noting',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_noting',
    };

    // 流局语音, 这里可以穿插到川麻的番种中
    // 9400: 四风连打
    // 9400: 四杠散了, '散'无法显示
    // 9400: 九种九牌, '种'无法显示
    cfg.fan.fan.map_[9400] = {
        id: 9400,
        name_chs: '四风连打',
        name_chs_t: '四风连打',
        name_jp: '四风连打',
        name_en: 'sifenglianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sifenglianda',
    };
    cfg.fan.fan.map_[9401] = {
        id: 9401,
        name_chs: '四杠散了',
        name_chs_t: '四杠散了',
        name_jp: '四杠散了',
        name_en: 'sigangsanle',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sigangliuju',
    };
    cfg.fan.fan.map_[9402] = {
        id: 9402,
        name_chs: '九种九牌',
        name_chs_t: '九种九牌',
        name_jp: '九种九牌',
        name_en: 'jiuzhongjiupai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_jiuzhongjiupai',
    };

    // 大厅交互语音
    // 9500: 获得语音, 都无法显示
    // 9501: 登录语音普通, '语音普'无法显示
    // 9502: 登录语音满羁绊, '语音羁绊'无法显示
    // 9503: 大厅交互语音1, '厅互语音'无法显示
    // 9504: 大厅交互语音2
    // 9505: 大厅交互语音3
    // 9506: 大厅交互语音4
    // 9507: 大厅交互语音5
    // 9508: 大厅交互语音6
    // 9509: 大厅交互语音7
    // 9510: 大厅交互语音8
    // 9511: 送礼物语音普通, '送语音普'无法显示
    // 9512: 送礼物语音喜好, '送语音'无法显示
    // 9513: 好感度升级语音1, '感度升级语音'无法显示
    // 9514: 好感度升级语音2
    // 9515: 好感度升级语音3
    // 9516: 好感度升级语音4
    // 9517: 好感度升级语音5
    // 9518: 契约语音, 都无法显示
    // 9519: 新年语音, '新语音'无法显示
    // 9520: 情人节语音, '情节语音'无法显示
    cfg.fan.fan.map_[9500] = {
        id: 9500,
        name_chs: '获得语音',
        name_chs_t: '获得语音',
        name_jp: '获得语音',
        name_en: 'selfintro',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_selfintro',
    };
    cfg.fan.fan.map_[9501] = {
        id: 9501,
        name_chs: '登录语音普通',
        name_chs_t: '登录语音普通',
        name_jp: '登录语音普通',
        name_en: 'playerlogin',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9502] = {
        id: 9502,
        name_chs: '登录语音满羁绊',
        name_chs_t: '登录语音满羁绊',
        name_jp: '登录语音满羁绊',
        name_en: 'playerlogin_max',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9503] = {
        id: 9503,
        name_chs: '大厅交互语音1',
        name_chs_t: '大厅交互语音1',
        name_jp: '大厅交互语音1',
        name_en: 'lobby_normal1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9504] = {
        id: 9504,
        name_chs: '大厅交互语音2',
        name_chs_t: '大厅交互语音2',
        name_jp: '大厅交互语音2',
        name_en: 'lobby_normal2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9505] = {
        id: 9505,
        name_chs: '大厅交互语音3',
        name_chs_t: '大厅交互语音3',
        name_jp: '大厅交互语音3',
        name_en: 'lobby_normal3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9506] = {
        id: 9506,
        name_chs: '大厅交互语音4',
        name_chs_t: '大厅交互语音4',
        name_jp: '大厅交互语音4',
        name_en: 'lobby_normal4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9507] = {
        id: 9507,
        name_chs: '大厅交互语音5',
        name_chs_t: '大厅交互语音5',
        name_jp: '大厅交互语音5',
        name_en: 'lobby_normal5',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9508] = {
        id: 9508,
        name_chs: '大厅交互语音6',
        name_chs_t: '大厅交互语音6',
        name_jp: '大厅交互语音6',
        name_en: 'lobby_normal6',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9509] = {
        id: 9509,
        name_chs: '大厅交互语音7',
        name_chs_t: '大厅交互语音7',
        name_jp: '大厅交互语音7',
        name_en: 'lobby_normal7',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9510] = {
        id: 9510,
        name_chs: '大厅交互语音8',
        name_chs_t: '大厅交互语音8',
        name_jp: '大厅交互语音8',
        name_en: 'lobby_normal8',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9511] = {
        id: 9511,
        name_chs: '送礼物语音普通',
        name_chs_t: '送礼物语音普通',
        name_jp: '送礼物语音普通',
        name_en: 'lobby_gift',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift',
    };
    cfg.fan.fan.map_[9512] = {
        id: 9512,
        name_chs: '送礼物语音喜好',
        name_chs_t: '送礼物语音喜好',
        name_jp: '送礼物语音喜好',
        name_en: 'lobby_gift_favor',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift_favor',
    };
    cfg.fan.fan.map_[9513] = {
        id: 9513,
        name_chs: '好感度升级语音1',
        name_chs_t: '好感度升级语音1',
        name_jp: '好感度升级语音1',
        name_en: 'lobby_levelup1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup1',
    };
    cfg.fan.fan.map_[9514] = {
        id: 9514,
        name_chs: '好感度升级语音2',
        name_chs_t: '好感度升级语音2',
        name_jp: '好感度升级语音2',
        name_en: 'lobby_levelup2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup2',
    };
    cfg.fan.fan.map_[9515] = {
        id: 9515,
        name_chs: '好感度升级语音3',
        name_chs_t: '好感度升级语音3',
        name_jp: '好感度升级语音3',
        name_en: 'lobby_levelup3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup3',
    };
    cfg.fan.fan.map_[9516] = {
        id: 9516,
        name_chs: '好感度升级语音4',
        name_chs_t: '好感度升级语音4',
        name_jp: '好感度升级语音4',
        name_en: 'lobby_levelup4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup4',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_levelmax',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelmax',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_manjiban',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_manjiban',
    };
    cfg.fan.fan.map_[9518] = {
        id: 9518,
        name_chs: '契约语音',
        name_chs_t: '契约语音',
        name_jp: '契约语音',
        name_en: 'lobby_qiyue',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_qiyue',
    };
    cfg.fan.fan.map_[9519] = {
        id: 9519,
        name_chs: '新年语音',
        name_chs_t: '新年语音',
        name_jp: '新年语音',
        name_en: 'lobby_newyear',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_newyear',
    };
    cfg.fan.fan.map_[9520] = {
        id: 9520,
        name_chs: '情人节语音',
        name_chs_t: '情人节语音',
        name_jp: '情人节语音',
        name_en: 'lobby_valentine',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_valentine',
    };

    // 对局契约特殊语音
    // 9600: 连续打出多张相同牌, '续出多张'无法显示
    // 9600: 打出宝牌, '出'无法显示
    // 9600: 余牌少于10, '余少于'无法显示
    // 9600: 役满听牌, '听'无法显示
    // 9600: 倍满/三倍满听牌, '倍听'无法显示
    cfg.fan.fan.map_[9600] = {
        id: 9600,
        name_chs: '连续打出多张相同牌',
        name_chs_t: '连续打出多张相同牌',
        name_jp: '连续打出多张相同牌',
        name_en: 'ingame_lianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_lianda',
    };
    cfg.fan.fan.map_[9601] = {
        id: 9601,
        name_chs: '打出宝牌',
        name_chs_t: '打出宝牌',
        name_jp: '打出宝牌',
        name_en: 'ingame_baopai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_baopai',
    };
    cfg.fan.fan.map_[9602] = {
        id: 9602,
        name_chs: '余牌少于10',
        name_chs_t: '余牌少于10',
        name_jp: '余牌少于10',
        name_en: 'ingame_remain10',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_remain10',
    };
    cfg.fan.fan.map_[9603] = {
        id: 9603,
        name_chs: '役满听牌',
        name_chs_t: '役满听牌',
        name_jp: '役满听牌',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_yiman',
    };
    cfg.fan.fan.map_[9604] = {
        id: 9604,
        name_chs: '倍满/三倍满听牌',
        name_chs_t: '倍满/三倍满听牌',
        name_jp: '倍满/三倍满听牌',
        name_en: 'ingame_beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_beiman',
    };

    // 一番街的特色古役
    // 9700: 推不倒, '推倒'无法显示, 原名称为'对称牌'
    // 9701: 赤三色, '赤'无法显示, 原名称为'红三色'
    // 9702: 三色通贯
    // 9703: 四连刻
    // 9704: 一色四同顺
    // 9705: 红孔雀, '孔雀'无法显示, 原名称为'红一色'
    // 9706: 红一点
    // 9707: 黑一色, '黑'无法显示, 原名称为'暗一色'
    // 9708: 十三不搭, '搭'无法显示, 原名称为'十三不顺'
    // 9709: 百万石, '百万'无法显示, 原名称为'1000000石'
    // 9710: 金门桥, '桥'无法显示, 原名称为'金门顺'
    // 9711: 东北新干线, '新干线'无法显示, 原名称'东北一气通贯'
    // 9712: 无发绿一色
    cfg.fan.fan.map_[9700] = {
        id: 9700,
        name_chs: '推不倒',
        name_chs_t: '推不倒',
        name_jp: '推不倒',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9701] = {
        id: 9701,
        name_chs: '赤三色',
        name_chs_t: '赤三色',
        name_jp: '赤三色',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9702] = {
        id: 9702,
        name_chs: '三色通贯',
        name_chs_t: '三色通贯',
        name_jp: '三色通贯',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9703] = {
        id: 9703,
        name_chs: '四连刻',
        name_chs_t: '四连刻',
        name_jp: '四连刻',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9704] = {
        id: 9704,
        name_chs: '一色四同顺',
        name_chs_t: '一色四同顺',
        name_jp: '一色四同顺',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9705] = {
        id: 9705,
        name_chs: '红孔雀',
        name_chs_t: '红孔雀',
        name_jp: '红孔雀',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9706] = {
        id: 9706,
        name_chs: '红一点',
        name_chs_t: '红一点',
        name_jp: '红一点',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9707] = {
        id: 9707,
        name_chs: '黑一色',
        name_chs_t: '黑一色',
        name_jp: '黑一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9708] = {
        id: 9708,
        name_chs: '十三不搭',
        name_chs_t: '十三不搭',
        name_jp: '十三不搭',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9709] = {
        id: 9709,
        name_chs: '百万石',
        name_chs_t: '百万石',
        name_jp: '百万石',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9710] = {
        id: 9710,
        name_chs: '金门桥',
        name_chs_t: '金门桥',
        name_jp: '金门桥',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9711] = {
        id: 9711,
        name_chs: '东北新干线',
        name_chs_t: '东北新干线',
        name_jp: '东北新干线',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9712] = {
        id: 9712,
        name_chs: '无发绿一色',
        name_chs_t: '无发绿一色',
        name_jp: '无发绿一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'fan_lvyise',
    };
}

// 国标麻将番种
function guobiao_fans() {
    if (!guobiao_fans_once)
        return;
    guobiao_fans_once = false;
    cfg.fan.fan.map_[8000] = {
        id: 8000,
        name_chs: '大四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8000,
        sound: 'fan_dasixi',
    };
    cfg.fan.fan.map_[8001] = {
        id: 8001,
        name_chs: '大三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8001,
        sound: 'fan_dasanyuan',
    };
    cfg.fan.fan.map_[8002] = {
        id: 8002,
        name_chs: '绿一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8002,
        sound: 'fan_lvyise',
    };
    cfg.fan.fan.map_[8003] = {
        id: 8003,
        name_chs: '九莲宝灯',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8003,
        sound: 'fan_jiulianbaodeng',
    };
    cfg.fan.fan.map_[8004] = {
        id: 8004,
        name_chs: '四杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8004,
        sound: 'fan_sigangzi',
    };
    cfg.fan.fan.map_[8005] = {
        id: 8005,
        name_chs: '连七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8005,
        sound: '',
    };
    cfg.fan.fan.map_[8006] = {
        id: 8006,
        name_chs: '十三幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8006,
        sound: 'fan_guoshiwushuang',
    };

    cfg.fan.fan.map_[8007] = {
        id: 8007,
        name_chs: '清幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8007,
        sound: 'fan_qinglaotou',
    };
    cfg.fan.fan.map_[8008] = {
        id: 8008,
        name_chs: '小四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8008,
        sound: 'fan_xiaosixi',
    };
    cfg.fan.fan.map_[8009] = {
        id: 8009,
        name_chs: '小三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8009,
        sound: 'fan_xiaosanyuan',
    };
    cfg.fan.fan.map_[8010] = {
        id: 8010,
        name_chs: '字一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8010,
        sound: 'fan_ziyise',
    };
    cfg.fan.fan.map_[8011] = {
        id: 8011,
        name_chs: '四暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8011,
        sound: 'fan_sianke',
    };
    cfg.fan.fan.map_[8012] = {
        id: 8012,
        name_chs: '一色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8012,
        sound: '',
    };

    cfg.fan.fan.map_[8013] = {
        id: 8013,
        name_chs: '一色四同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8013,
        sound: '',
    };
    cfg.fan.fan.map_[8014] = {
        id: 8014,
        name_chs: '一色四节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8014,
        sound: '',
    };

    cfg.fan.fan.map_[8015] = {
        id: 8015,
        name_chs: '一色四步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8015,
        sound: '',
    };
    cfg.fan.fan.map_[8016] = {
        id: 8016,
        name_chs: '三杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8016,
        sound: 'fan_sangangzi',
    };
    cfg.fan.fan.map_[8017] = {
        id: 8017,
        name_chs: '混幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8017,
        sound: 'fan_hunlaotou',
    };

    cfg.fan.fan.map_[8018] = {
        id: 8018,
        name_chs: '七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8018,
        sound: 'fan_qiduizi',
    };
    cfg.fan.fan.map_[8019] = {
        id: 8019,
        name_chs: '七星不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8019,
        sound: '',
    };
    cfg.fan.fan.map_[8020] = {
        id: 8020,
        name_chs: '全双刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8020,
        sound: '',
    };
    cfg.fan.fan.map_[8021] = {
        id: 8021,
        name_chs: '清一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8021,
        sound: 'fan_qingyise',
    };
    cfg.fan.fan.map_[8022] = {
        id: 8022,
        name_chs: '一色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8022,
        sound: '',
    };
    cfg.fan.fan.map_[8023] = {
        id: 8023,
        name_chs: '一色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8023,
        sound: '',
    };
    cfg.fan.fan.map_[8024] = {
        id: 8024,
        name_chs: '全大',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8024,
        sound: '',
    };
    cfg.fan.fan.map_[8025] = {
        id: 8025,
        name_chs: '全中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8025,
        sound: '',
    };
    cfg.fan.fan.map_[8026] = {
        id: 8026,
        name_chs: '全小',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8026,
        sound: '',
    };

    cfg.fan.fan.map_[8027] = {
        id: 8027,
        name_chs: '清龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8027,
        sound: 'fan_yiqitongguan',
    };
    cfg.fan.fan.map_[8028] = {
        id: 8028,
        name_chs: '三色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8028,
        sound: '',
    };
    cfg.fan.fan.map_[8029] = {
        id: 8029,
        name_chs: '一色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8029,
        sound: '',
    };
    cfg.fan.fan.map_[8030] = {
        id: 8030,
        name_chs: '全带五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8030,
        sound: '',
    };
    cfg.fan.fan.map_[8031] = {
        id: 8031,
        name_chs: '三同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8031,
        sound: 'fan_sansetongke',
    };
    cfg.fan.fan.map_[8032] = {
        id: 8032,
        name_chs: '三暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8032,
        sound: 'fan_sananke',
    };

    cfg.fan.fan.map_[8033] = {
        id: 8033,
        name_chs: '全不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8033,
        sound: '',
    };
    cfg.fan.fan.map_[8034] = {
        id: 8034,
        name_chs: '组合龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8034,
        sound: '',
    };
    cfg.fan.fan.map_[8035] = {
        id: 8035,
        name_chs: '大于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8035,
        sound: '',
    };
    cfg.fan.fan.map_[8036] = {
        id: 8036,
        name_chs: '小于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8036,
        sound: '',
    };
    cfg.fan.fan.map_[8037] = {
        id: 8037,
        name_chs: '三风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8037,
        sound: '',
    };

    cfg.fan.fan.map_[8038] = {
        id: 8038,
        name_chs: '花龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8038,
        sound: '',
    };
    cfg.fan.fan.map_[8039] = {
        id: 8039,
        name_chs: '推不倒',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8039,
        sound: '',
    };
    cfg.fan.fan.map_[8040] = {
        id: 8040,
        name_chs: '三色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8040,
        sound: 'fan_sansetongshun',
    };
    cfg.fan.fan.map_[8041] = {
        id: 8041,
        name_chs: '三色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8041,
        sound: '',
    };
    cfg.fan.fan.map_[8042] = {
        id: 8042,
        name_chs: '无番和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8042,
        sound: '',
    };
    cfg.fan.fan.map_[8043] = {
        id: 8043,
        name_chs: '妙手回春',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8043,
        sound: 'fan_haidi',
    };
    cfg.fan.fan.map_[8044] = {
        id: 8044,
        name_chs: '海底捞月',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8044,
        sound: 'fan_hedi',
    };
    cfg.fan.fan.map_[8045] = {
        id: 8045,
        name_chs: '杠上开花',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8045,
        sound: 'fan_lingshang',
    };
    cfg.fan.fan.map_[8046] = {
        id: 8046,
        name_chs: '抢杠和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8046,
        sound: 'fan_qianggang',
    };

    cfg.fan.fan.map_[8047] = {
        id: 8047,
        name_chs: '碰碰和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8047,
        sound: 'fan_duiduihu',
    };
    cfg.fan.fan.map_[8048] = {
        id: 8048,
        name_chs: '混一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8048,
        sound: 'fan_hunyise',
    };
    cfg.fan.fan.map_[8049] = {
        id: 8049,
        name_chs: '三色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8049,
        sound: '',
    };
    cfg.fan.fan.map_[8050] = {
        id: 8050,
        name_chs: '五门齐',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8050,
        sound: '',
    };
    cfg.fan.fan.map_[8051] = {
        id: 8051,
        name_chs: '全求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8051,
        sound: '',
    };
    cfg.fan.fan.map_[8052] = {
        id: 8052,
        name_chs: '双暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8052,
        sound: '',
    };
    cfg.fan.fan.map_[8053] = {
        id: 8053,
        name_chs: '双箭刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8053,
        sound: '',
    };

    cfg.fan.fan.map_[8054] = {
        id: 8054,
        name_chs: '全带幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8054,
        sound: 'fan_hunquandaiyaojiu',
    };
    cfg.fan.fan.map_[8055] = {
        id: 8055,
        name_chs: '不求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8055,
        sound: 'fan_zimo',
    };
    cfg.fan.fan.map_[8056] = {
        id: 8056,
        name_chs: '双明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8056,
        sound: '',
    };
    cfg.fan.fan.map_[8057] = {
        id: 8057,
        name_chs: '和绝张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8057,
        sound: '',
    };

    cfg.fan.fan.map_[8058] = {
        id: 8058,
        name_chs: '箭刻 白',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8058,
        sound: 'fan_bai',
    };
    cfg.fan.fan.map_[8059] = {
        id: 8059,
        name_chs: '箭刻 发',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8059,
        sound: 'fan_fa',
    };
    cfg.fan.fan.map_[8060] = {
        id: 8060,
        name_chs: '箭刻 中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8060,
        sound: 'fan_zhong',
    };
    cfg.fan.fan.map_[8061] = {
        id: 8061,
        name_chs: '圈风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8061,
        sound: '',
    };
    cfg.fan.fan.map_[8062] = {
        id: 8062,
        name_chs: '门风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8062,
        sound: '',
    };
    cfg.fan.fan.map_[8063] = {
        id: 8063,
        name_chs: '门前清',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8063,
        sound: '',
    };
    cfg.fan.fan.map_[8064] = {
        id: 8064,
        name_chs: '平和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8064,
        sound: 'fan_pinghu',
    };
    cfg.fan.fan.map_[8065] = {
        id: 8065,
        name_chs: '四归一',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8065,
        sound: 'scfan_gen',
    };
    cfg.fan.fan.map_[8066] = {
        id: 8066,
        name_chs: '双同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8066,
        sound: '',
    };
    cfg.fan.fan.map_[8067] = {
        id: 8067,
        name_chs: '双暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8067,
        sound: '',
    };
    cfg.fan.fan.map_[8068] = {
        id: 8068,
        name_chs: '暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8068,
        sound: '',
    };
    cfg.fan.fan.map_[8069] = {
        id: 8069,
        name_chs: '断幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8069,
        sound: 'fan_duanyao',
    };

    cfg.fan.fan.map_[8070] = {
        id: 8070,
        name_chs: '一般高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8070,
        sound: 'fan_yibeikou',
    };
    cfg.fan.fan.map_[8071] = {
        id: 8071,
        name_chs: '喜相逢',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8071,
        sound: '',
    };
    cfg.fan.fan.map_[8072] = {
        id: 8072,
        name_chs: '连六',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8072,
        sound: '',
    };
    cfg.fan.fan.map_[8073] = {
        id: 8073,
        name_chs: '老少副',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8073,
        sound: '',
    };
    cfg.fan.fan.map_[8074] = {
        id: 8074,
        name_chs: '幺九刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8074,
        sound: '',
    };
    cfg.fan.fan.map_[8075] = {
        id: 8075,
        name_chs: '明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8075,
        sound: '',
    };
    cfg.fan.fan.map_[8076] = {
        id: 8076,
        name_chs: '缺一门',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8076,
        sound: '',
    };
    cfg.fan.fan.map_[8077] = {
        id: 8077,
        name_chs: '无字',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8077,
        sound: '',
    };
    cfg.fan.fan.map_[8078] = {
        id: 8078,
        name_chs: '边张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8078,
        sound: '',
    };
    cfg.fan.fan.map_[8079] = {
        id: 8079,
        name_chs: '坎张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8079,
        sound: '',
    };
    cfg.fan.fan.map_[8080] = {
        id: 8080,
        name_chs: '单钓将',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8080,
        sound: '',
    };
    cfg.fan.fan.map_[8081] = {
        id: 8081,
        name_chs: '自摸',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8081,
        sound: 'fan_zimo',
    };

    cfg.fan.fan.map_[8082] = {
        id: 8082,
        name_chs: '明暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8082,
        sound: '',
    };

    cfg.fan.fan.map_[8083] = {
        id: 8083,
        name_chs: '天和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8083,
        sound: 'fan_tianhu',
    };
    cfg.fan.fan.map_[8084] = {
        id: 8084,
        name_chs: '地和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8084,
        sound: 'fan_dihu',
    };
    cfg.fan.fan.map_[8085] = {
        id: 8085,
        name_chs: '人和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8085,
        sound: '',
    };

// 花牌1-8, 以及'一大堆'情况
    cfg.fan.fan.map_[8091] = {
        id: 8091,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8091,
        sound: 'fan_dora1',
    };
    cfg.fan.fan.map_[8092] = {
        id: 8092,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8092,
        sound: 'fan_dora2',
    };
    cfg.fan.fan.map_[8093] = {
        id: 8093,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 8093,
        sound: 'fan_dora3',
    };
    cfg.fan.fan.map_[8094] = {
        id: 8094,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8094,
        sound: 'fan_dora4',
    };
    cfg.fan.fan.map_[8095] = {
        id: 8095,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 8095,
        sound: 'fan_dora5',
    };
    cfg.fan.fan.map_[8096] = {
        id: 8096,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8096,
        sound: 'fan_dora6',
    };
    cfg.fan.fan.map_[8097] = {
        id: 8097,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 7,
        fan_fulu: 7,
        show_index: 8097,
        sound: 'fan_dora7',
    };
    cfg.fan.fan.map_[8098] = {
        id: 8098,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8098,
        sound: 'fan_dora8',
    };
    cfg.fan.fan.map_[8099] = {
        id: 8099,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8099,
        sound: 'fan_dora13',
    };
}

// ===========================================
// ================= 重写函数 =================
// ===========================================

/**
 * 回放接口, 在 edit_offline 中重写, 并在 resetpaipu 中复原
 *
 * 其中 OnChoosedPai, seat2LocalPosition, localPosition2Seat 在 add_function.js 中
 * @type {function}
 */
var checkPaiPu, resetData, showRecord, showInfo_record, setFanFu, OnChoosedPai, seat2LocalPosition, localPosition2Seat;

// 在线编辑(进入牌谱之后的修改, 包括切换视角和切换巡目, 只在 edit_offline 中的 resetData 中调用)
function edit_online() {
    let x = editdata, rounds = [];
    for (let i in x.actions)
        rounds.push({actions: x.actions[i], xun: x.xun[i][view.DesktopMgr.Inst.seat]});
    uiscript.UI_Replay.Inst.rounds = rounds;
    uiscript.UI_Replay.Inst.gameResult.result.players = x.players;
}

// 离线编辑(进入牌谱之前改, 只在 gameend 中调用)
function edit_offline() {
    function override() {
        if (checkPaiPu === undefined)
            checkPaiPu = GameMgr.Inst.checkPaiPu;
        if (resetData === undefined)
            resetData = uiscript.UI_Replay.prototype.resetData;
        if (showRecord === undefined)
            showRecord = uiscript.UI_Win.prototype.showRecord;
        if (showInfo_record === undefined)
            showInfo_record = uiscript.UI_Win.prototype._showInfo_record;
        if (setFanFu === undefined)
            setFanFu = uiscript.UI_Win.prototype.setFanFu;
        if (OnChoosedPai === undefined)
            OnChoosedPai = view.ViewPai.prototype.OnChoosedPai
        if (seat2LocalPosition === undefined)
            seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition;
        if (localPosition2Seat === undefined)
            localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat;
        if (typeof editfunction == 'function')
            editfunction();
    }

    function edit_player_datas() {
        let ret = [];
        // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
        let slots = [0, 1, 2, 5, 6, 7, 11, 13];
        for (let seat in x.player_datas) {
            ret[seat] = {
                account_id: x.player_datas[seat].avatar_id * 10 + seat, // 账号唯一id, 这里没什么用随便设的
                seat: seat, // 座次
                nickname: x.player_datas[seat].nickname, // 昵称
                avatar_id: x.player_datas[seat].avatar_id, // 头像id
                character: { // 角色信息
                    charid: cfg.item_definition.skin.map_[x.player_datas[seat].avatar_id].character_id, // 角色id
                    level: 5, // 角色好感等级, 即好感几颗心
                    exp: 0, // 好感经验, 契约之后值是0
                    skin: x.player_datas[seat].avatar_id, // 皮肤, 和 avatar_id 一样
                    is_upgraded: true, // 是否已契约
                    extra_emoji: [10, 11, 12], // 额外表情, 除了初始的九个外其他都是额外表情, 包括契约后的三个
                },
                title: x.player_datas[seat].title, // 称号
                level: {id: 10503, score: 4500}, // 四麻段位分, 这里是圣三原点, 下同
                level3: {id: 20503, score: 4500}, // 三麻段位分
                avatar_frame: x.player_datas[seat].avatar_frame, // 头像框
                verified: x.player_datas[seat].verified, // 是否已认证, 0: 未认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
                views: x.player_datas[seat].views, // 装扮槽
            };
            if (config.mode.detail_rule._random_views)
                for (let i in slots) {
                    let slot = slots[i];
                    let item_id = views_pool[slot][Math.floor(Math.random() * views_pool[slot].length)];
                    if (slot === 11) {
                        ret[seat].title = item_id;
                        continue;
                    }
                    if (slot === 5)
                        ret[seat].avatar_frame = item_id;
                    let existed = false;
                    for (let j in ret[seat].views)
                        if (ret[seat].views[j].slot === slot) {
                            ret[seat].views[j].item_id = item_id;
                            existed = true;
                            break;
                        }
                    if (!existed)
                        ret[seat].views.push({
                            slot: slot,
                            item_id: item_id,
                        });
                }
            if (config.mode.detail_rule._random_skin) {
                let skin_len = cfg.item_definition.skin.rows_.length;
                let skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                while (skin_id === 400000 || skin_id === 400001)
                    skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                ret[seat].avatar_id = ret[seat].character.skin = skin_id;
                ret[seat].character.charid = cfg.item_definition.skin.map_[skin_id].character_id;
            }
        }
        x.player_datas = ret;
        return ret;
    }

    function get_tablecloth_id() {
        if (typeof config.mode.detail_rule._tablecloth_id == 'number')
            return config.mode.detail_rule._tablecloth_id;
        if (x.player_datas[0].views) {
            let views = x.player_datas[0].views;
            for (let i in views)
                if (views[i].slot === 6)
                    return views[i].item_id;
        }
        // 原来的桌布
        return uiscript.UI_Sushe.now_desktop_id;
    }

    function get_mjp_id() {
        if (typeof config.mode.detail_rule._mjp_id == 'number')
            return config.mode.detail_rule._mjp_id;
        if (x.player_datas[0].views) {
            let views = x.player_datas[0].views;
            for (let i in views)
                if (views[i].slot === 7)
                    return views[i].item_id;
        }
        // 原来的牌背
        return uiscript.UI_Sushe.now_mjp_id;
    }

    function get_mjpsurface_id() {
        if (typeof config.mode.detail_rule._mjpsurface_id == 'number')
            return config.mode.detail_rule._mjpsurface_id;
        if (x.player_datas[0].views) {
            let views = x.player_datas[0].views;
            for (let i in views)
                if (views[i].slot === 13)
                    return views[i].item_id;
        }
        // 原来的牌面
        return uiscript.UI_Sushe.now_mjp_surface_id;
    }

    override();
    const x = editdata;
    // 重写对局信息
    uiscript.UI_Replay.prototype.resetData = function () {
        try {
            resetData.call(this);
            edit_online();
        } catch (e) {
            console.error(e);
        }
    }
    // 重写房间信息和玩家信息
    GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config) {
        try {
            // 添加下面
            update_views();
            DIY_fans();
            guobiao_fans();
            guobiao_function();
            if (editdata.actions.length === 0) {
                console.error('没有载入自制牌谱, 不可查看, 若要查看真实牌谱, 请输入 resetpaipu()');
                return;
            }
            // 添加上面

            const W = this;
            game_uuid = game_uuid.trim();
            app.Log.log('checkPaiPu game_uuid:' + game_uuid + ' account_id:' + account_id.toString() + ' paipu_config:' + paipu_config);

            if (this.duringPaipu)
                app.Log.Error('已经在看牌谱了');
            else {
                this.duringPaipu = true;
                uiscript.UI_Loading.Inst.show(uiscript.ELoadingType.EEnterMJ);
                GameMgr.Inst.onLoadStart('paipu');
                if (paipu_config === 2)
                    game_uuid = game.Tools.DecodePaipuUUID(game_uuid);
                this.record_uuid = game_uuid;

                app.NetAgent.sendReq2Lobby('Lobby', 'fetchGameRecord', {
                        game_uuid: game_uuid,
                        client_version_string: this.getClientVersion()
                    },
                    function (l, n) {
                        if (l || n.error) {
                            uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', l, n);
                            let y = 0.12;
                            uiscript.UI_Loading.Inst.setProgressVal(y);
                            const f = function () {
                                y += 0.06;
                                uiscript.UI_Loading.Inst.setProgressVal(Math.min(1, y));
                                if (y >= 1.1) {
                                    uiscript.UI_Loading.Inst.close();
                                    uiscript.UIMgr.Inst.showLobby();
                                    Laya.timer.clear(this, f);
                                }
                            };
                            Laya.timer.loop(50, W, f);
                            W.duringPaipu = false;
                        } else {
                            // 添加: 接受的牌谱信息去除 robots
                            n.head.robots = [];

                            // 修改的地方: 本来是 openMJRoom 的第二个参数(单个字母), 现在是 edit_player_datas 函数
                            // 本来是 openMJRoom 的第一个参数(如 X.config), 现在是 x.config
                            // 添加下面
                            let new_player_datas = edit_player_datas();
                            if (cfg.item_definition.view.get(get_tablecloth_id()) !== undefined)
                                uiscript.UI_Sushe.now_desktop_id = get_tablecloth_id();
                            if (cfg.item_definition.view.get(get_mjp_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_id = get_mjp_id();
                                GameMgr.Inst.mjp_view = cfg.item_definition.view.get(get_mjp_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjp/${GameMgr.Inst.mjp_view}/hand.atlas`);
                            }
                            if (cfg.item_definition.view.get(get_mjpsurface_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_surface_id = get_mjpsurface_id();
                                GameMgr.Inst.mjp_surface_view = cfg.item_definition.view.get(get_mjpsurface_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjpm/${GameMgr.Inst.mjp_surface_view}/ui.atlas`);
                            }
                            // 第一场的主视角
                            if (typeof config.mode.detail_rule._local_position_ == 'number')
                                account_id = new_player_datas[config.mode.detail_rule._local_position_].account_id;
                            else
                                account_id = new_player_datas[x.actions[0][0].data.ju].account_id;
                            // 添加上面

                            const C = Laya.Handler.create(W, function (H) {
                                const main_func = function () {
                                    game.Scene_Lobby.Inst.active = false;
                                    game.Scene_MJ.Inst.openMJRoom(x.config, new_player_datas,
                                        Laya.Handler.create(W, function () {
                                            W.duringPaipu = false;
                                            view.DesktopMgr.Inst.paipu_config = paipu_config;
                                            view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(x.config)), new_player_datas, account_id, view.EMJMode.paipu, Laya.Handler.create(W, function () {
                                                // 添加下面4行
                                                if (typeof editfunction2 == 'function')
                                                    editfunction2();
                                                if (playercnt === 2)
                                                    view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;

                                                uiscript.UI_Replay.Inst.initMaka(false, false);
                                                uiscript.UI_Replay.Inst.initData(H);
                                                uiscript.UI_Replay.Inst.enable = true;
                                                Laya.timer.once(1000, W, function () {
                                                    W.EnterMJ();
                                                });
                                                Laya.timer.once(1500, W, function () {
                                                    view.DesktopMgr.player_link_state = [view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY];
                                                    uiscript.UI_DesktopInfo.Inst.refreshLinks();
                                                    uiscript.UI_Loading.Inst.close();
                                                });
                                                Laya.timer.once(1000, W, function () {
                                                    uiscript.UI_Replay.Inst.nextStep(true);
                                                });
                                            }));
                                        }),
                                        Laya.Handler.create(W,
                                            function (H) {
                                                return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.9 * H);
                                            },
                                            null, false)
                                    );
                                };
                                main_func();
                            });
                            let B = {};
                            B.record = n.head;
                            if (n.data && n.data.length) {
                                B.game = net.MessageWrapper.decodeMessage(n.data);
                                C.runWith(B);
                            } else {
                                let O = n.data_url;
                                if (!O.startsWith('http'))
                                    O = GameMgr.prefix_url + O;
                                game.LoadMgr.httpload(O, 'arraybuffer', false,
                                    Laya.Handler.create(W,
                                        function (H) {
                                            if (H.success) {
                                                const N = new Laya.Byte();
                                                N.writeArrayBuffer(H.data);
                                                B.game = net.MessageWrapper.decodeMessage(N.getUint8Array(0, N.length));
                                                C.runWith(B);
                                            } else {
                                                uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + n.data_url);
                                                uiscript.UI_Loading.Inst.close();
                                                uiscript.UIMgr.Inst.showLobby();
                                                W.duringPaipu = false;
                                            }
                                        }
                                    )
                                );
                            }
                        }
                    }
                );
            }
        } catch (e) {
            console.error(e);
        }
    }
}

// ===========================================
// ============== 国标的优化函数 ===============
// ===========================================

function guobiao_function() {
    // 国标添加圈风刻, 门风刻语音, 并不显示宝牌指示牌
    uiscript.UI_Win.prototype.showRecord = function (K) {
        var z = this;
        if (!view.DesktopMgr.Inst.record_show_anim)
            return this._showInfo_record(K),
                this.isDoAnimation = false,
                undefined;
        this.isDoAnimation = true,
            this.container_Activity_Point.me.visible = false,
            this.container_activity_rpg.me.visible = false,
            this.root.alpha = 0,
            this.tweenManager.addTweenTo(this.root, {
                alpha: 1
            }, 500);
        var Z = view.DesktopMgr.Inst.getPlayerName(K.seat);
        game.Tools.SetNickname(this.winner_name, Z, false, true);
        var s = view.DesktopMgr.Inst.player_datas[K.seat].character
            , U = new uiscript.UIRect();
        U.x = this.illust_rect.x,
            U.y = this.illust_rect.y,
            U.width = this.illust_rect.width,
            U.height = this.illust_rect.height,
            this.char_skin.setRect(U),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        var O = K.fan_names.length
            , m = 100;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var Y = null;
        Y = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= O ? this.container_fan_8 : 12 >= O ? this.container_fan_12 : this.container_fan_15,
            Y.visible = true;
        for (var j = 0; j < Y.numChildren; j++)
            Y.getChildAt(j).visible = false;
        for (var Q = [], j = 0; j < K.fan_names.length; j++) {
            var p = K.fan_names[j]
                , M = 0
                , u = K.fan_ids[j]
                , e = false
                , H = cfg.fan.fan.get(u);
            H && (e = !!H.mark),
            9999 !== u && H && (M = H.show_index);
            var r = {
                name: p,
                index: M,
                isSpecialFan: e
            };
            if (K.fan_value && K.fan_value.length > j && (r.value = K.fan_value[j]),
            10 === u)
                switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (11 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            // 添加下面
            else if (8061 === u)
                switch (view.DesktopMgr.Inst.index_change % 4) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (8062 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            // 添加上面
            else if (u >= 31 && 34 >= u) {
                var T = r.value;
                T > 13 && (T = 13),
                    r.sound = 0 === T ? '' : 'fan_dora' + T;
            } else
                9999 === u ? r.sound = 'fan_liujumanguan' : u >= 0 && (r.sound = cfg.fan.fan.get(u).sound);
            Q.push(r);
        }
        Q = Q.sort(function (B, K) {
            return B.index - K.index;
        }),
            m += 500;
        for (var I = function (B) {
            var Z = game.Tools.get_chara_audio(s, Q[B].sound);
            C.timerManager.addTimerOnce(m, function () {
                var s = Y.getChildAt(B)
                    , U = s.getChildByName('l_name');
                U.text = Q[B].name,
                    U.color = Q[B].isSpecialFan ? '#ffc74c' : '#f1eeda';
                var O = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                if (U.width = O,
                    game.Tools.labelLocalizationSize(U, O, 0.8),
                undefined !== Q[B].value && null !== Q[B].value) {
                    s.getChildAt(2).visible = true;
                    var m = Q[B].value
                        , j = m.toString();
                    2 === j.length ? (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[1] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(4).visible = true) : (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).visible = false);
                }
                s.visible = true,
                    z.tweenManager.addTweenFrom(s, {
                        x: 169,
                        y: 184,
                        alpha: 0
                    }, 100, Laya.Ease.strongOut),
                    Z ? (view.AudioMgr.PlaySound(Z.path, Z.volume),
                        view.AudioMgr.PlayAudio(211, 1, 0.5)) : view.AudioMgr.PlayAudio(211, 1, 1);
            }),
                m += Z ? Z.time_length > 500 ? Z.time_length : 500 : 500;
        }, C = this, j = 0; O > j && j < Y.numChildren; j++)
            I(j);
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? (m += 300,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.setFanFu(K.fan, K.fu);
                })) : K.yiman && (m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.img_yiman.alpha = 0,
                        z.img_yiman.visible = true,
                        z.tweenManager.addTweenTo(z.img_yiman, {
                            alpha: 1
                        }, 200);
                })),
            this.container_score.alpha = 0;
        for (var j = 0; j < this.score_imgs.length; j++)
            this.score_imgs[j].visible = false;
        if (m += 700,
            this.container_score.scaleX = this.container_score.scaleY = 2,
            this.timerManager.addTimerOnce(m, function () {
                for (var B = 0, Z = K.score; 0 !== Z;) {
                    var s = Z % 10;
                    if (Z = Math.floor(Z / 10),
                        z.score_imgs[B].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + s.toString() + '.png'),
                        z.score_imgs[B].visible = true,
                        B++,
                    B >= z.score_imgs.length)
                        break;
                }
                z.tweenManager.addTweenTo(z.container_score, {
                    alpha: 1,
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 200, Laya.Ease.strongIn),
                    view.AudioMgr.PlayAudio(221);
            }),
            this.container_title.visible = false,
            K.title_id) {
            m += 700;
            var V = 0
                , g = 0
                , W = '';
            switch (K.title_id) {
                case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
                    W = 'gameend_manguan',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
                    W = 'gameend_tiaoman',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
                    W = 'gameend_beiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
                    W = 'gameend_sanbeiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
                    W = 'gameend_leijiyiman',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
                    W = 'gameend_yiman1',
                        g = 1,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
                    W = 'gameend_yiman2',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
                    W = 'gameend_yiman3',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
                    W = 'gameend_yiman4',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
                    W = 'gameend_yiman5',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
                    W = 'gameend_yiman6',
                        g = 2,
                        V = 226;
            }
            var X = game.Tools.get_chara_audio(s, W);
            this.timerManager.addTimerOnce(m, function () {
                z.setTitle(K.title_id),
                    z.container_title.visible = true,
                    z.container_title.alpha = 0,
                    z.container_title.scaleX = z.container_title.scaleY = 3,
                    z.tweenManager.addTweenTo(z.container_title, {
                        alpha: 1,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 300, Laya.Ease.strongIn),
                    z.timerManager.addTimerOnce(300, function () {
                        0 !== V && view.AudioMgr.PlayAudio(V);
                    }),
                X && z.timerManager.addTimerOnce(500, function () {
                    view.AudioMgr.PlaySound(X.path, X.volume);
                }),
                0 !== g && z.timerManager.addTimerOnce(300, function () {
                    var B, K;
                    'en' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                        K = 'scene/effect_yiman2.lh') : 'kr' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                        K = 'scene/effect_yiman.lh') : 1 === g ? (B = z.root.getChildByName('effect_yiman'),
                        K = 'scene/effect_yiman.lh') : (B = z.root.getChildByName('effect_yiman2'),
                        K = 'scene/effect_yiman2.lh'),
                        z.effect_yiman = game.FrontEffect.Inst.create_ui_effect(B, K, new Laya.Point(0, 0), 25);
                });
            }),
            (K.yiman || '累积役满' === K.title) && (m += 500);
        }
        if (this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var i = false;
            0 === K.mode ? i = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (i = true),
            K.seat === view.DesktopMgr.Inst.muyu_info.seat && (i = true)),
            i && (this.muyu.scale(1.2, 1.2),
                m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    z.muyu.visible = true,
                        z.muyu.alpha = 0;
                    var B = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                    z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + B + '.png'),
                        z.tweenManager.addTweenTo(z.muyu, {
                            alpha: 1
                        }, 250);
                }));
        }
        if (view.DesktopMgr.Inst.is_tianming_mode()) {
            this.muyu.visible = false;
            var i = false;
            K.tianming_bonus > 0 && (i = true),
            i && (this.muyu.scale(1, 1),
                m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    z.muyu.visible = true,
                        z.muyu.alpha = 0,
                        z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/tianming_result_' + K.tianming_bonus + '.png'),
                        z.tweenManager.addTweenTo(z.muyu, {
                            alpha: 1
                        }, 250);
                }));
        }
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && K.seat === view.DesktopMgr.Inst.seat && K.mode <= 1 && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_DuanWu_Point.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            S ? this.container_Activity_Point.me.visible = false : m += this.container_Activity_Point.show(m, K.point_sum, K.score);
        } else
            this.container_Activity_Point.me.visible = false;
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_RPG.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            if (S)
                this.container_activity_rpg.me.visible = false;
            else {
                var f = 0;
                view.DesktopMgr.Inst.seat !== K.seat && (f = 0 === K.mode ? 2 : 1),
                    1 === f && 0 !== view.DesktopMgr.Inst.seat2LocalPosition(view.DesktopMgr.Inst.index_player) ? this.container_activity_rpg.me.visible = false : this.container_activity_rpg.show(f, 0);
            }
        } else
            this.container_activity_rpg.me.visible = false;
        this.btn_confirm.visible = false,
            m += 300,
            this.btn_confirm.disabled = true,
            this.timerManager.addTimerOnce(m, function () {
                if (z.btn_confirm.visible = true,
                    z.btn_confirm.alpha = 1,
                    z.tweenManager.addTweenFrom(z.btn_confirm, {
                        alpha: 0
                    }, 200),
                    z.btn_confirm.disabled = false,
                view.DesktopMgr.Inst.mode === view.EMJMode.paipu || view.DesktopMgr.Inst.mode === view.EMJMode.xinshouyindao)
                    z.count_down.visible = false,
                        z.btn_confirm.getChildByName('confirm').x = 131;
                else {
                    z.count_down.visible = true,
                        z.btn_confirm.getChildByName('confirm').x = 165;
                    for (var B = function (B) {
                        z.timerManager.addTimerOnce(1000 * B, function () {
                            z.btn_confirm.disabled || (z.count_down.text = '(' + (3 - B).toString() + ')');
                        });
                    }, K = 0; 3 > K; K++)
                        B(K);
                    z.timerManager.addTimerOnce(3000, function () {
                        z.btn_confirm.disabled || z.onConfirm();
                    });
                }
            });
    }

    // 上述函数对应的跳过动画的版本
    uiscript.UI_Win.prototype._showInfo_record = function (K) {
        this.container_Activity_Point.me.visible = false,
            this.root.alpha = 1;
        view.DesktopMgr.Inst.setNickname(this.winner_name, K.seat, '#c3e2ff', '#fbfbfb', true);
        var z = new uiscript.UIRect();
        z.x = this.illust_rect.x,
            z.y = this.illust_rect.y,
            z.width = this.illust_rect.width,
            z.height = this.illust_rect.height,
            this.char_skin.setRect(z),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        var Z = K.fan_names.length;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var s;
        s = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= Z ? this.container_fan_8 : 12 >= Z ? this.container_fan_12 : this.container_fan_15,
            s.visible = true;
        for (var U = 0; U < s.numChildren; U++)
            s.getChildAt(U).visible = false;
        for (var O = [], U = 0; U < K.fan_names.length; U++) {
            var m = K.fan_names[U]
                , Y = K.fan_ids[U]
                , j = 0
                , Q = false
                , p = cfg.fan.fan.get(Y);
            p && (Q = !!p.mark),
            9999 !== Y && p && (j = p.show_index);
            var M = {
                name: m,
                index: j,
                isSpecialFan: Q
            };
            K.fan_value && K.fan_value.length > U && (M.value = K.fan_value[U]),
                O.push(M);
        }
        O = O.sort(function (B, K) {
            return B.index - K.index;
        });
        for (var U = 0; Z > U && U < s.numChildren; U++) {
            var u = s.getChildAt(U)
                , e = u.getChildByName('l_name');
            e.text = O[U].name,
                e.color = O[U].isSpecialFan ? '#ffc74c' : '#f1eeda';
            var H = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
            if (e.width = H,
                game.Tools.labelLocalizationSize(e, H, 0.8),
            undefined !== O[U].value && null !== O[U].value) {
                u.getChildAt(2).visible = true;
                var r = O[U].value
                    , T = r.toString();
                2 === T.length ? (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[1] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(4).visible = true) : (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).visible = false);
            }
            u.visible = true;
        }
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? this.setFanFu(K.fan, K.fu) : K.yiman && (this.img_yiman.alpha = 1,
                this.img_yiman.visible = true);
        for (var U = 0; U < this.score_imgs.length; U++)
            this.score_imgs[U].visible = false;
        for (var I = K.score.toString(), U = 0; U < I.length && !(U >= this.score_imgs.length); U++)
            this.score_imgs[U].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + I.charAt(I.length - 1 - U) + '.png'),
                this.score_imgs[U].visible = true;
        if (this.container_score.alpha = 1,
            this.container_score.scaleX = this.container_score.scaleY = 1.2,
            this.container_title.visible = false,
        K.title_id && (this.setTitle(K.title_id),
            this.container_title.visible = true,
            this.container_title.alpha = 1,
            this.container_title.scaleX = this.container_title.scaleY = 1.2),
            this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var C = false;
            if (0 === K.mode ? C = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (C = true),
            K.seat === view.DesktopMgr.Inst.muyu_info.seat && (C = true)),
                C) {
                this.muyu.visible = true,
                    this.muyu.alpha = 1;
                var V = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                this.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + V + '.png');
            }
        }
        this.count_down.text = '',
            this.btn_confirm.visible = true,
            this.btn_confirm.disabled = false,
            this.btn_confirm.alpha = 1,
            this.count_down.visible = false,
            this.btn_confirm.getChildByName('confirm').x = 131;
    }

    // 国标麻将不显示符数
    uiscript.UI_Win.prototype.setFanFu = function (B, K) {
        // cloneImage 函数由猫粮工作室老板娘'丝茉茉'提供
        function cloneImage(original) {
            let clone = new Laya.Image();
            original.parent.addChildAt(clone, 0);
            clone.pos(-138, 62);
            clone.size(original.width, original.height);
            clone.rotation = original.rotation;
            clone.scale(original.scaleX, original.scaleY);
            clone.alpha = original.alpha;
            clone.visible = original.visible;
            clone.skin = original.skin;
            return clone;
        }

        this.container_fan.visible = this.container_fu.visible = true,
            this.container_fan.alpha = this.container_fu.alpha = 0;

        if (this.fan_imgs.length < 3)
            this.fan_imgs[2] = cloneImage(this.fan_imgs[1]);

        for (var z = 0; 3 > z; z++)
            if (0 === B)
                this.fan_imgs[z].visible = false;
            else {
                var Z = B % 10;
                B = Math.floor(B / 10),
                    this.fan_imgs[z].visible = true,
                    this.fan_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + Z.toString() + '.png');
            }
        this.container_fu.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        for (var z = 0; 3 > z; z++)
            if (0 === K)
                this.fu_imgs[z].visible = false;
            else {
                var Z = K % 10;
                K = Math.floor(K / 10),
                    this.fu_imgs[z].visible = true,
                    this.fu_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + Z.toString() + '.png');
            }
        this.tweenManager.addTweenTo(this.container_fan, {
            alpha: 1
        }, 200),
            this.tweenManager.addTweenTo(this.container_fu, {
                alpha: 1
            }, 200);
    }
}
