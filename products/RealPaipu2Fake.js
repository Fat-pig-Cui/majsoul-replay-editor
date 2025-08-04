function RealPaipu2Fake(paipulink = '') {
    if (paipulink === '')
        paipulink = prompt('Please Enter a Paipu Link or Paipu UUID.');
    if (!paipulink) {
        console.log('User canceled input');
        return;
    }
    paipulink = paipulink.split('=');
    paipulink = paipulink[paipulink.length - 1].split('_');
    let uuid = paipulink[0];
    if (paipulink.length > 2 && parseInt(paipulink[2]) === 2)
        uuid = game.Tools.DecodePaipuUUID(uuid);

    const pbWrapper = net.ProtobufManager.lookupType('.lq.Wrapper');
    const pbGameDetailRecords = net.ProtobufManager.lookupType('.lq.GameDetailRecords');

    function parseRecords(gameDetailRecords, json) {
        if (gameDetailRecords.version === 0) {
            for (let i in gameDetailRecords.records) {
                const record = pbWrapper.decode(gameDetailRecords.records[i]);
                const pb = net.ProtobufManager.lookupType(record.name);
                const data = JSON.parse(JSON.stringify(pb.decode(record.data)));
                json.records[i] = {name: record.name, data: data};
            }
        } else if (gameDetailRecords.version === 210715) {
            for (let i in gameDetailRecords.actions) {
                if (gameDetailRecords.actions[i].type === 1) {
                    const record = pbWrapper.decode(gameDetailRecords.actions[i].result);
                    const pb = net.ProtobufManager.lookupType(record.name);
                    const data = JSON.parse(JSON.stringify(pb.decode(record.data)));
                    json.actions[i].result = {name: record.name, data: data};
                }
            }
        } else
            throw new Error('Unknown version: ' + gameDetailRecords.version);
        return json;
    }

    async function fetchData(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }

    function download(data, uuid) {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([data], {type: 'text/plain'}));
        a.download = `fake_paipu_${uuid}.js`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchGameRecord',
        {game_uuid: uuid, client_version_string: GameMgr.Inst.getClientVersion()},
        async function (error, gameRecord) {
            if (gameRecord.data === '')
                gameRecord.data = await fetchData(gameRecord.data_url);
            const gameDetailRecordsWrapper = pbWrapper.decode(gameRecord.data);
            const gameDetailRecords = pbGameDetailRecords.decode(gameDetailRecordsWrapper.data);
            let gameDetailRecordsJson = JSON.parse(JSON.stringify(gameDetailRecords));
            gameDetailRecordsJson = parseRecords(gameDetailRecords, gameDetailRecordsJson);
            gameRecord.data = '';
            let gameRecordJson = JSON.parse(JSON.stringify(gameRecord));
            gameRecordJson.data = {name: gameDetailRecordsWrapper.name, data: gameDetailRecordsJson};

            json2js(gameRecordJson, uuid);
        });

    function json2js(json, uuid) {
        let txt = '';
        txt += `clearproject();\n\n// ${uuid}\n\n`;

        for (let i in json.head.accounts)
            txt += `player_datas[${i}]=${JSON.stringify(json.head.accounts[i])};\n`;
        txt += `\nconfig=${JSON.stringify(json.head.config)};\n\n`;

        let actions = json.data.data.actions;
        for (let i in actions)
            if (actions[i].result) {
                let tmp = actions[i].result.name.split('.');
                actions[i].result.name = tmp[tmp.length - 1];
                let Data = actions[i].result.data;

                if (actions[i].result.name === 'RecordNewRound') {
                    let chang = Data.chang, ju = Data.ju, ben = Data.ben;
                    txt += `// ${roundinfo(chang, ju, ben)}\n`;
                    txt += `tiles0='${Data.tiles0.join('')}';\n`;
                    txt += `tiles1='${Data.tiles1.join('')}';\n`;
                    txt += `tiles2='${Data.tiles2.join('')}';\n`;
                    if (Data.tiles3 && Data.tiles3.length !== 0)
                        txt += `tiles3='${Data.tiles3.join('')}';\n`;
                    txt += `paishan=separatetile('${Data.paishan}');\n`;
                    if (json.head.config.mode && json.head.config.mode.detail_rule && json.head.config.mode.detail_rule.muyu_mode) {
                        let muyuseats = '', tmp = [];
                        for (let j = i + 1; j < actions.length; j++)
                            if (actions[j].result && actions[j].result.data.muyu) {
                                if (!tmp[actions[i].result.data.muyu.seat])
                                    muyuseats += actions[i].result.data.muyu.seat.toString();
                                tmp[actions[i].result.data.muyu.seat] = actions[i].result.data.muyu.count !== 0;
                            }
                        txt += `muyuseats='${muyuseats}';\n`;
                    }
                    txt += `roundbegin();\n`;
                }
                if (actions[i].result.name === 'RecordDiscardTile') {
                    let tile = Data.tile, is_liqi = Data.is_liqi, moqie = Data.moqie;
                    if (is_liqi) {
                        if (moqie)
                            txt += `qiepai(true);\n`;
                        else
                            txt += `qiepai('${tile}',true);\n`;
                    } else {
                        if (moqie)
                            txt += `qiepai();\n`;
                        else
                            txt += `qiepai('${tile}');\n`;
                    }
                    let beishui_type = Data.liqi_type_beishuizhizhan;
                    if (beishui_type !== undefined)
                        txt = txt.substring(0, txt.length - 3) + `,[${beishui_type}]);\n`;
                }
                if (actions[i].result.name === 'RecordChangeTile') {
                    let tls = ['', '', '', ''];
                    for (let i = 0; i < tls.length; i++)
                        tls[i] = Data.chang_tile_infos[i].out_tiles.join('');
                    let type = Data.change_type;
                    txt += `huansanzhang('${tls[0]}','${tls[1]}','${tls[2]}','${tls[3]}',${type});\n`;
                }
                if (actions[i].result.name === 'RecordSelectGap') {
                    let gap_types = Data.gap_types;
                    let words = {'0': 'p', '1': 'm', '2': 's'};
                    let ret = '';
                    for (let i in gap_types)
                        ret += words[gap_types[i]];
                    txt += `dingque('${ret}');\n`;
                }
                if (actions[i].result.name === 'RecordDealTile') {
                    if (Data.tile_index)
                        txt += `mopai([${Data.tile_index}]);\n`;
                    else
                        txt += `mopai();\n`;
                }
                if (actions[i].result.name === 'RecordChiPengGang') {
                    let froms = Data.froms, seat = Data.seat, tiles = Data.tiles;

                    let c_tiles = '';
                    for (let i in tiles)
                        if (froms[i] === seat)
                            c_tiles += tiles[i];
                    let j = i + 1;
                    while (!actions[j].result)
                        j++;
                    if (actions[j].result.name === 'RecordGangResultEnd')
                        txt += `mingpai(${seat},'${c_tiles}',true);\n`;
                    else
                        txt += `mingpai(${seat},'${c_tiles}');\n`;
                }
                if (actions[i].result.name === 'RecordAnGangAddGang') {
                    let tile = Data.tiles, type = Data.type;
                    let c_type = type === 3 ? 'angang' : 'jiagang';

                    let j = i + 1;
                    while (!actions[j].result)
                        j++;
                    if (actions[j].result.name === 'RecordGangResultEnd')
                        txt += `leimingpai('${tile}','${c_type}',true);\n`;
                    else
                        txt += `leimingpai('${tile}','${c_type}');\n`;
                }
                if (actions[i].result.name === 'RecordBaBei') {
                    let tile = Data.tile;
                    txt += `leimingpai('${tile}','babei');\n`;
                }
                if (actions[i].result.name === 'RecordHule') {
                    let allseats = [];
                    for (let i in Data.hules)
                        allseats.push(Data.hules[i].seat);
                    txt += `hupai(${allseats});\n\n`;
                }
                if (actions[i].result.name === 'RecordLiuJu') {
                    txt += `liuju();\n\n`;
                }
                if (actions[i].result.name === 'RecordNoTile') {
                    txt += `notileliuju();\n\n`;
                }
                if (actions[i].result.name === 'RecordHuleXueZhanMid') {
                    let allseats = [];
                    for (let i in Data.hules)
                        allseats.push(Data.hules[i].seat);
                    txt += `hupai([${allseats}]);\n\n`;
                }
                if (actions[i].result.name === 'RecordHuleXueZhanEnd') {
                    let allseats = [];
                    for (let i in Data.hules)
                        allseats.push(Data.hules[i].seat);
                    txt += `hupai([${allseats}],true);\n\n\n\n`;
                }
                if (actions[i].result.name === 'RecordGangResult') { // 不需要
                }
                if (actions[i].result.name === 'RecordGangResultEnd') { // 不需要
                }
                if (actions[i].result.name === 'RecordRevealTile') {
                    let tile = Data.tile, is_liqi = Data.is_liqi;
                    if (is_liqi)
                        txt += `qiepai('${tile}',true,'anpai');\n`;
                    else
                        txt += `qiepai('${tile}','anpai');\n`;
                }
                if (actions[i].result.name === 'RecordLockTile') {
                    let j = i - 1;
                    while (!actions[j].result)
                        j--;
                    if (actions[j].result.name === 'RecordUnveilTile'){
                        let seat = actions[j].result.data.seat;
                        if (actions[j].result.data.lock_state === 1)
                            txt += `unveil_lock(${seat});\n`;
                        else if (actions[j].result.data.lock_state === 0)
                            txt += `unveil(${seat});\n`;
                    }
                }
                if (actions[i].result.name === 'RecordUnveilTile') { // 不需要
                }
                if (actions[i].result.name === 'RecordNewCard') { // 不需要
                }
                if (actions[i].result.name === 'RecordFillAwaitingTiles') { // 不需要
                }
            }
        // txt += `editdata.players = ${JSON.stringify(json.head.result.players)};\n`;
        txt = txt.substring(0, txt.length - 1); // 去掉最后多余的回车

        download(txt, uuid);

        function roundinfo(chang, ju, ben) {
            let chang_word = [`东`, `南`, `西`, `北`];
            return `${chang_word[chang]}${ju + 1}局${ben}本场`;
        }
    }
}

RealPaipu2Fake();
