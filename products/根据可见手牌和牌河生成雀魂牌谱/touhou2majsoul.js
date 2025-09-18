clearProject();

player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: { // 无流满, 无罚符
            _no_liujumanguan: true,
            _fafu_1ting: 0,
            _fafu_2ting: 0,
            _fafu_3ting: 0,
            _fafu_3p_1ting: 0,
            _fafu_3p_2ting: 0,
            _fafu_2p: 0,
            _mainrole_: 0,
        }
    }
});

(function () {
    /* 将从天凤牌谱编辑的数据赋值给 json 变量, 两个例子:
    {"title":["",""],"name":["COM0","COM1","COM2","COM3"],"rule":{"aka":1},"log":[[[0,0,0],[25000,25000,25000,25000],[13],[],[13,14,41,41,43,31,11,28,26,17,36,29,36],[26,"p414141",17,"c121314",43,45,37,31,26,23,19,43,21,24,32,11,35,52],[43,31,11,28,26,17,45,36,37,26,43,60,23,19,17,36,32,60],[39,47,46,41,22,34,17,33,14,37,25,19,18],[45,53,23,28,13,32,34,33,47,46,19,43,27,23,24,32,25,16],[39,47,46,60,41,22,34,17,33,14,37,33,23,18,46,45,43,47],[19,31,32,38,13,37,14,22,26,16,12,14,22],[12,38,39,28,39,35,47,42,25,42,21,23,46,44,27,37,34,18],[19,31,32,38,60,60,60,60,60,60,60,60,60,60,60,60,60,60],[41,11,42,11,18,15,21,36,33,33,45,21,38],[24,44,12,44,27,31,17,16,22,18,51,46,35,15,39,15,38,29],[41,11,60,42,11,60,60,60,60,60,60,38,21,18,60,27,60,46],["全員聴牌"]]]}
    {"title":["",""],"name":["COM0","COM1","COM2","COM3"],"rule":{"aka":1},"log":[[[0,0,1],[25000,25000,25000,25000],[52],[],[43,39,21,18,29,41,34,42,31,19,18,31,36],[15,28,37,22,27,42,33,15,19,37,46,13,27,17,26,43,35,12,42],[43,39,21,60,18,29,41,34,"r15",60,60,60,60,60,60,60,60,60,60],[47,42,13,45,45,21,19,11,23,35,14,12,24],[26,24,14,25,31,41,44,44,34,16,17,17,38,14,46,21,34,36],[47,42,13,45,60,60,60,60,14,19,16,45,12,35,21,14,26,34],[15,51,41,41,45,45,29,47,46,22,18,34,26],[16,16,39,"p454545",38,"p414141",44,11,"15p1551",36,23,33,25,23,14,11,17,12],[29,47,46,22,18,34,60,60,26,60,60,60,60,60,60,60,60,60],[29,39,44,24,13,32,38,22,28,39,16,23,36],[46,47,19,37,35,38,31,27,29,12,47,21,28,27,43,32,24,25],[29,60,39,60,60,44,24,60,31,32,60,36,13,39,29,27,23,19],["全員聴牌"]]]}
    */
    let json = JSON.parse(prompt('Please Enter JSON from touhou.net/6/:'));
    if (!json)
        throw new Error('User canceled input');
    const log = json.log;
    config.mode.detail_rule._chang_ju_ben_num_ = [, ju,] = log[0].shift();
    config.mode.detail_rule._scores_ = log[0].shift();
    const biao_dora = log[0].shift();
    const li_dora = log[0].shift();
    const dict = {
        '1m': 11, '2m': 12, '3m': 13, '4m': 14, '5m': 15, '6m': 16, '7m': 17, '8m': 18, '9m': 19,
        '1p': 21, '2p': 22, '3p': 23, '4p': 24, '5p': 25, '6p': 26, '7p': 27, '8p': 28, '9p': 29,
        '1s': 31, '2s': 32, '3s': 33, '4s': 34, '5s': 35, '6s': 36, '7s': 37, '8s': 38, '9s': 39,
        '1z': 41, '2z': 42, '3z': 43, '4z': 44, '5z': 45, '6z': 46, '7z': 47,
        '0m': 51, '0p': 52, '0s': 53,
        11: '1m', 12: '2m', 13: '3m', 14: '4m', 15: '5m', 16: '6m', 17: '7m', 18: '8m', 19: '9m',
        21: '1p', 22: '2p', 23: '3p', 24: '4p', 25: '5p', 26: '6p', 27: '7p', 28: '8p', 29: '9p',
        31: '1s', 32: '2s', 33: '3s', 34: '4s', 35: '5s', 36: '6s', 37: '7s', 38: '8s', 39: '9s',
        41: '1z', 42: '2z', 43: '3z', 44: '4z', 45: '5z', 46: '6z', 47: '7z',
        51: '0m', 52: '0p', 53: '0s',
    };

    // 起手
    let tiles = [];
    // 广义摸牌组与广义切牌组
    let new_mopai_set = [[], [], [], []], new_qiepai_set = [[], [], [], []];
    // 各家摸牌的巡目河切牌的巡目
    let mopai_xunmu = [0, 0, 0, 0], qiepai_xunmu = [0, 0, 0, 0];

    for (let i = 0; i < Math.floor(log[0].length / 3); i++) {
        tiles[i] = log[0][3 * i];
        new_mopai_set[i] = log[0][3 * i + 1];
        new_qiepai_set[i] = log[0][3 * i + 2];
    }

    if (tiles[2].length !== 0 && tiles[3].length === 0)
        config.mode.mode = 12; // 三麻
    if (config.mode.mode === 12) { // 三麻点数修正
        let all_4p_points = true;
        for (let i in config.mode.detail_rule._scores_)
            if (config.mode.detail_rule._scores_[i] !== 25000)
                all_4p_points = false;
        if (all_4p_points) // 三麻点数修正
            config.mode.detail_rule._scores_ = [35000, 35000, 35000];
    }

    // while 循环关键变量: seat: 要操作的玩家, nxt_step: 下个操作的类型
    let seat = ju, nxt_step = 'mopai';
    while (true) {
        switch (nxt_step) {
            case 'mopai':
                new_mopai();
                break;
            case 'qiepai':
                new_qiepai();
                break;
            case 'chi':
            case 'peng':
            case 'minggang':
                new_mingpai();
                break;
            case 'angang':
            case 'jiagang':
                new_zimingpai();
                break;
            case 'babei':
                break;
        }
        if (nxt_step === 'liuju') {

            huangpai();

            break;
        }
    }

    // new_mopai 不会改变 seat
    function new_mopai() {
        if (mopai_xunmu[seat] >= new_mopai_set[seat].length) {
            nxt_step = 'liuju';
            return;
        }
        // 开局, 亲家补全至14张牌
        if (seat === ju && mopai_xunmu[ju] === 0) {
            tiles[ju].push(new_mopai_set[ju][mopai_xunmu[ju]]);

            for (let i in tiles)
                begin_tiles[i] = process(tiles[i]);

            let zhishipais = '';
            for (let i = biao_dora.length - 1; i >= 0; i--) {
                if (li_dora[i] !== undefined)
                    zhishipais += dict[li_dora[i]];
                zhishipais += dict[biao_dora[i]];
            }
            randomPaishan('', zhishipais + '....');
            roundBegin();

            function process(tls) {
                let ret = '';
                for (let i in tls)
                    ret += dict[tls[i]];
                return ret;
            }
        } else
            mopai(seat, dict[new_mopai_set[seat][mopai_xunmu[seat]]]);

        mopai_xunmu[seat]++;

        if (typeof new_qiepai_set[seat][qiepai_xunmu[seat]] == 'string') {
            if (new_qiepai_set[seat][qiepai_xunmu[seat]].indexOf('a') > -1)
                nxt_step = 'angang';
            else if (new_qiepai_set[seat][qiepai_xunmu[seat]].indexOf('k') > -1)
                nxt_step = 'jiagang';
            else if (new_qiepai_set[seat][qiepai_xunmu[seat]].indexOf('r') > -1)
                nxt_step = 'qiepai';
        } else
            nxt_step = 'qiepai';
    }

    function new_qiepai() {
        if (qiepai_xunmu[seat] >= new_qiepai_set[seat].length) {
            nxt_step = 'liuju';
            return;
        }
        let is_liqi = false, tile;
        if (typeof new_qiepai_set[seat][qiepai_xunmu[seat]] == 'string') {
            tile = dict[parseInt(new_qiepai_set[seat][qiepai_xunmu[seat]].substring(1))];
            is_liqi = true;
        } else
            tile = dict[new_qiepai_set[seat][qiepai_xunmu[seat]]];

        qiepai(seat, tile, is_liqi);

        qiepai_xunmu[seat]++;

        // 明杠
        for (let i = seat + 1; i < seat + player_cnt; i++) {
            let tmp_seat = i % player_cnt;
            if (typeof new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
                let tmp_fulu = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
                let tmp_fulu_from_seat, tmp_fulu_type;
                [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(tmp_fulu, tmp_seat);
                if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'a') {
                    nxt_step = 'minggang';
                    seat = tmp_seat;
                    return;
                }
            }
        }
        // 碰
        for (let i = seat + 1; i < seat + player_cnt; i++) {
            let tmp_seat = i % player_cnt;
            if (typeof new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
                let tmp_fulu = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
                let tmp_fulu_from_seat, tmp_fulu_type;
                [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(tmp_fulu, tmp_seat);
                if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'p') {
                    nxt_step = 'peng';
                    seat = tmp_seat;
                    return;
                }
            }
        }
        // 吃
        let tmp_seat = (seat + 1) % player_cnt;
        if (typeof new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
            let tmp_fulu = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
            let tmp_fulu_from_seat, tmp_fulu_type;
            [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(tmp_fulu, tmp_seat);
            if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'c') {
                nxt_step = 'chi';
                seat = tmp_seat;
                return;
            }
        }
        // 摸牌
        seat = (seat + 1) % player_cnt;
        nxt_step = 'mopai';

        function judge_fulu(tmp_fulu, tmp_seat) {
            let fulu_local_seat = 0;
            let fulu_types = ['c', 'p', 'm'];
            let fulu_type = '';
            for (let i in fulu_types)
                if (tmp_fulu.indexOf(fulu_types[i]) > -1) {
                    let index = tmp_fulu.indexOf(fulu_types[i]);
                    if (index === 6)
                        index = 4;
                    fulu_type = fulu_types[i];
                    fulu_local_seat = 3 - index / 2;
                    break;
                }
            let real_seat = (fulu_local_seat + tmp_seat) % 4;
            return [real_seat, fulu_type];
        }
    }

    // new_mingpai 不会改变 seat
    function new_mingpai() {
        let fulu = new_mopai_set[seat][mopai_xunmu[seat]];
        mopai_xunmu[seat]++;

        let tmp_tiles, fulu_type;
        [tmp_tiles, fulu_type] = parse_fulu(fulu);
        let tiles = [];
        while (tmp_tiles.length) {
            tiles.push(dict[parseInt(tmp_tiles.substring(0, 2))]);
            tmp_tiles = tmp_tiles.substring(2);
        }

        mingpai(seat, tiles.join(''));

        if (fulu_type === 'm') {
            qiepai_xunmu[seat]++;
            nxt_step = 'mopai';
        } else
            nxt_step = 'qiepai';
    }

    // new_zimingpai 不会改变 seat
    function new_zimingpai() {
        let fulu = new_qiepai_set[seat][qiepai_xunmu[seat]];
        qiepai_xunmu[seat]++;

        let tmp_tiles, fulu_type;
        [tmp_tiles, fulu_type] = parse_fulu(fulu);
        let tile = dict[parseInt(tmp_tiles.substring(0, 2))];
        let type = fulu_type === 'a' ? 'angang' : 'jiagang';

        zimingpai(seat, tile, type);

        nxt_step = 'mopai';
    }

    function parse_fulu(fulu) {
        let fulu_types = ['c', 'p', 'm', 'a', 'k'];
        for (let i in fulu_types)
            if (fulu.indexOf(fulu_types[i]) > -1) {
                let index = fulu.indexOf(fulu_types[i]);
                return [fulu.substring(0, index) + fulu.substring(index + 3), fulu_types[i]];
            }
        return [];
    }
})();
