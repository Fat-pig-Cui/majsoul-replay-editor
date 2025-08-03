clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 40},
    mode: {
        mode: 1,
        detail_rule: {
            xuezhandaodi: true,
        }
    }
};

// 要让一家巡目最高且牌河最多, 那该家最好是亲家
// 且 亲家前两次出的牌分别铳了北家和西家
// 然后碰了南家四次(或者自家暗杠四次)
// 38张/巡
tiles0 = '9m16p9999s1233457z';
tiles1 = '457m28p3577s5557z';
tiles2 = '234569m2345p124z';
tiles3 = '2233448m3467p18s';
randompaishan('1m1s1234z');
roundbegin();
huansanzhang('9m16p', '28p7z', '124z', '8m18s', 1);
qiepai('7z');
hupai();

normalmoqie();
hupai();

normalmoqie();
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9s');
}
moqieliuju();
