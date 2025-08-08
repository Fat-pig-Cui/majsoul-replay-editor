// 将从天凤牌谱编辑的数据赋值给 json 变量, 例子:
/*
{"title":["",""],"name":["COM0","COM1","COM2","COM3"],"rule":{"disp":"玉の間四人南","aka":1},"log":[[[0,0,0],[25000,25000,25000,25000],[13],[],[13,14,41,41,43,31,11,28,26,17,36,29,36],[26,"p414141",17,"c121314",43,45,37,31,26,23,19,43,21,24,32,11,35,52],[43,31,11,28,26,17,45,36,37,26,43,60,23,19,17,36,32,60],[39,47,46,41,22,34,17,33,14,37,25,19,18],[45,53,23,28,13,32,34,33,47,46,19,43,27,23,24,32,25,16],[39,47,46,60,41,22,34,17,33,14,37,33,23,18,46,45,43,47],[19,31,32,38,13,37,14,22,26,16,12,14,22],[12,38,39,28,39,35,47,42,25,42,21,23,46,44,27,37,34,18],[19,31,32,38,60,60,60,60,60,60,60,60,60,60,60,60,60,60],[41,11,42,11,18,15,21,36,33,33,45,21,38],[24,44,12,44,27,31,17,16,22,18,51,46,35,15,39,15,38,29],[41,11,60,42,11,60,60,60,60,60,60,38,21,18,60,27,60,46],["不明"]]]}
*/

clearproject();

let json = JSON.parse(prompt('Please Enter JSON from touhou.net/6/:'));
if (!json)
    throw new Error('User canceled input');

player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _no_liujumanguan: true,
            _fafu_1ting: 0,
            _fafu_2ting: 0,
            _fafu_3ting: 0,
            _fafu_3p_1ting: 0,
            _fafu_3p_2ting: 0,
            _fafu_2p: 0,

            _local_position_: 0,
        }
    }
};

function main_function(){

    // 玩家数
    playercnt = 4;

    const log = json.log;
    config.mode.detail_rule._chang_ju_ben_num_ = [chang, ju, ben] = log[0].shift();
    config.mode.detail_rule._scores_ = log[0].shift();
    config.mode.mode = playercnt === 4 ? 2 : 12;

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
    let new_mopaiset = [[], [], [], []], new_qiepaiset = [[], [], [], []];
    // 各家摸牌的巡目河切牌的巡目
    let mopai_xunmu = [0, 0, 0, 0], qiepai_xunmu = [0, 0, 0, 0];

    for (let i = 0; i < Math.floor(log[0].length / 3); i++) {
        tiles[i] = log[0][3 * i];
        new_mopaiset[i] = log[0][3 * i + 1];
        new_qiepaiset[i] = log[0][3 * i + 2];
    }

    // while 循环关键变量, seati 表示要操作的玩家, nxt_step 表示下个操作的类型
    let seati = ju, nxt_step = 'mopai';
    while (true) {
        switch (nxt_step) {
            case 'mopai':
                new_mopai();
                break;
            case 'qiepai':
                new_qiepai();
                break;
            case 'chi':
            case 'pon':
            case 'minggang':
                new_chipongang();
                break;
            case 'angang':
            case 'jiagang':
                new_angangjiagang();
                break;
            case 'babei':
                break;
        }
        if (nxt_step === 'liuju'){
            notileliuju();
            break;
        }
    }
    // new_mopai 不会改变 seati
    function new_mopai(){
        if (mopai_xunmu[seati] >= new_mopaiset[seati].length){
            nxt_step = 'liuju';
            return;
        }
        if (seati === ju && mopai_xunmu[ju] === 0) {
            tiles[ju].push(new_mopaiset[ju][mopai_xunmu[ju]]);

            tiles0 = process(tiles[0]);
            tiles1 = process(tiles[1]);
            tiles2 = process(tiles[2]);
            tiles3 = process(tiles[3]);
            let zhishipais = '';
            for (let i = biao_dora.length - 1; i >= 0; i--) {
                if (li_dora[i] !== undefined)
                    zhishipais += dict[li_dora[i]];
                zhishipais += dict[biao_dora[i]];
            }
            randompaishan('', zhishipais + '....');
            roundbegin();
            function process(tiles){
                let ret = '';
                for (let i in tiles)
                    ret += dict[tiles[i]];
                return ret;
            }
        } else
            mopai(seati, dict[new_mopaiset[seati][mopai_xunmu[seati]]]);
        mopai_xunmu[seati]++;

        if (typeof new_qiepaiset[seati][qiepai_xunmu[seati]] == 'string') {
            if (new_qiepaiset[seati][qiepai_xunmu[seati]].indexOf('a') !== -1)
                nxt_step = 'angang';
            else if (new_qiepaiset[seati][qiepai_xunmu[seati]].indexOf('k') !== -1)
                nxt_step = 'jiagang';
            else if (new_qiepaiset[seati][qiepai_xunmu[seati]].indexOf('r') !== -1)
                nxt_step = 'qiepai';
        } else
            nxt_step = 'qiepai';
    }

    function new_qiepai() {
        if (qiepai_xunmu[seati] >= new_qiepaiset[seati].length){
            nxt_step = 'liuju';
            return;
        }
        let is_liqi = false, tile;
        if (typeof new_qiepaiset[seati][qiepai_xunmu[seati]] == 'string'){
            tile = dict[parseInt(new_qiepaiset[seati][qiepai_xunmu[seati]].substring(1))];
            is_liqi = true;
        } else
            tile = dict[new_qiepaiset[seati][qiepai_xunmu[seati]]];
        qiepai(seati, tile, is_liqi);
        qiepai_xunmu[seati]++;

        // 明杠
        for (let i = seati + 1; i < seati + playercnt; i++) {
            let tmp_seat = i % playercnt;
            if (typeof new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
                let tmp_fulu = new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]];
                let tmp_fulu_from_seat;
                let tmp_fulu_type;
                [tmp_fulu_from_seat, tmp_fulu_type] = judgefulu(tmp_fulu, tmp_seat);
                if (tmp_fulu_from_seat === seati && tmp_fulu_type === 'a'){
                    nxt_step = 'minggang';
                    seati = tmp_seat;
                    return;
                }
            }
        }
        // 碰
        for (let i = seati + 1; i < seati + playercnt; i++) {
            let tmp_seat = i % playercnt;
            if (typeof new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
                let tmp_fulu = new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]];
                let tmp_fulu_from_seat;
                let tmp_fulu_type;
                [tmp_fulu_from_seat, tmp_fulu_type] = judgefulu(tmp_fulu, tmp_seat);
                if (tmp_fulu_from_seat === seati && tmp_fulu_type === 'p'){
                    nxt_step = 'pon';
                    seati = tmp_seat;
                    return;
                }
            }
        }
        // 吃
        let tmp_seat = (seati + 1) % playercnt;
        if (typeof new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]] == 'string') {
            let tmp_fulu = new_mopaiset[tmp_seat][mopai_xunmu[tmp_seat]];
            let tmp_fulu_from_seat;
            let tmp_fulu_type;
            [tmp_fulu_from_seat, tmp_fulu_type] = judgefulu(tmp_fulu, tmp_seat);
            if (tmp_fulu_from_seat === seati && tmp_fulu_type === 'c'){
                nxt_step = 'chi';
                seati = tmp_seat;
                return;
            }
        }
        // 摸牌
        seati = (seati + 1) % playercnt;
        nxt_step = 'mopai';

        function judgefulu(tmp_fulu, tmp_seat) {
            let fulu_local_seat = 0;
            let fulu_types = ['c', 'p', 'm'];
            let fulu_type = '';
            for (let i in fulu_types)
                if (tmp_fulu.indexOf(fulu_types[i]) !== -1) {
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

    // new_chipongang 不会改变 seati
    function new_chipongang() {
        function parse_fulu(fulu) {
            let fulu_types = ['c', 'p', 'm'];
            let fulu_type = '';
            for (let i in fulu_types)
                if (fulu.indexOf(fulu_types[i]) !== -1) {
                    fulu_type = fulu_types[i];
                    let index = fulu_types.indexOf(fulu_types[i]);
                    return [fulu.substring(0,index) + fulu.substring(index + 3), fulu_type];
                }
            return [];
        }
        let fulu = new_mopaiset[seati][mopai_xunmu[seati]];
        mopai_xunmu[seati]++;
        let tmp_tiles, fulu_type;
        [tmp_tiles, fulu_type] = parse_fulu(fulu);
        let tiles = [];
        while (tmp_tiles.length) {
            tiles.push(dict[parseInt(tmp_tiles.substring(0, 2))]);
            tmp_tiles = tmp_tiles.substring(2);
        }
        mingpai(seati, tiles.join(''));

        if (fulu_type === 'm') {
            qiepai_xunmu[seati]++;
            nxt_step = 'mopai';
        }
        else
            nxt_step = 'qiepai';
    }

    // new_angangjiagang 不会改变 seati
    function new_angangjiagang() {
        function parse_fulu(fulu) {
            let fulu_types = ['a', 'k'];
            let fulu_type = '';
            for (let i in fulu_types)
                if (fulu.indexOf(fulu_types[i]) !== -1) {
                    fulu_type = fulu_types[i];
                    let index = fulu_types.indexOf(fulu_types[i]);
                    return [fulu.substring(0,index) + fulu.substring(index + 3), fulu_type];
                }
            return [];
        }

        let tmp_tiles;
        let fulu_type;
        [tmp_tiles, fulu_type] = parse_fulu();
        let tile = dict[parseInt(tmp_tiles.substring(0, 2))];
        let type = fulu_type === 'a'?'angang':'jiagang';
        leimingpai(seati, tile, type);
    }
}

main_function();
