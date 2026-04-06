(function () {
    let paipulink = prompt('Please Enter a Paipu Link or Paipu UUID.');
    if (!paipulink)
        throw new Error('User canceled input')
    paipulink = paipulink.split('=');
    paipulink = paipulink[paipulink.length - 1].split('_');
    let uuid = paipulink[0];
    if (paipulink.length > 2 && parseInt(paipulink[2]) === 2)
        uuid = game.Tools.DecodePaipuUUID(uuid);

    const pbWrapper = net.ProtobufManager.lookupType('.lq.Wrapper');
    const pbGameDetailRecords = net.ProtobufManager.lookupType('.lq.GameDetailRecords');

    function parseRecords(gameDetailRecords, json) {
        if (gameDetailRecords.version === 0) {
            for (const i of gameDetailRecords.records.keys()) {
                const record = pbWrapper.decode(gameDetailRecords.records[i]);
                const pb = net.ProtobufManager.lookupType(record.name);
                const data = JSON.parse(JSON.stringify(pb.decode(record.data)));
                json.records[i] = {name: record.name, data: data};
            }
        } else if (gameDetailRecords.version === 210715) {
            for (const i of gameDetailRecords.actions.keys()) {
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
        const a = document.createElement('a');
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
            const gameRecordJson = JSON.parse(JSON.stringify(gameRecord));
            gameRecordJson.data = {name: gameDetailRecordsWrapper.name, data: gameDetailRecordsJson};

            json2js(gameRecordJson, uuid);
        });

    function json2js(json, uuid) {
        let txt = '';
        txt += `clearProject();\n\n// ${uuid}\n\n`;

        for (const [index, account] of json.head.accounts.entries())
            txt += `player_datas[${index}]=${JSON.stringify(account)};\n`;
        txt += `\nsetConfig(${JSON.stringify(json.head.config)});\n\n`;

        const actions1 = json.data.data.actions;
        for (const [index, action] of actions1.entries())
            if (action.result) {
                const tmp = action.result.name.split('.');
                action.result.name = tmp[tmp.length - 1];
                const Data = action.result.data;

                if (action.result.name === 'RecordNewRound') {
                    const chang = Data.chang, ju = Data.ju, ben = Data.ben;
                    txt += `// ${roundinfo(chang, ju, ben)}\n`;
                    txt += `begin_tiles[0]='${Data.tiles0.join('')}';\n`;
                    txt += `begin_tiles[1]='${Data.tiles1.join('')}';\n`;
                    txt += `begin_tiles[2]='${Data.tiles2.join('')}';\n`;
                    if (Data.tiles3 && Data.tiles3.length !== 0)
                        txt += `begin_tiles[3]='${Data.tiles3.join('')}';\n`;
                    txt += `setPaishan('${Data.paishan}');\n`;
                    if (json.head.config.mode && json.head.config.mode.detail_rule && json.head.config.mode.detail_rule.muyu_mode) {
                        let muyuseats = '', tmp = [];
                        for (let j = index + 1; j < actions1.length; j++)
                            if (actions1[j].result && actions1[j].result.data.muyu) {
                                if (!tmp[action.result.data.muyu.seat])
                                    muyuseats += action.result.data.muyu.seat.toString();
                                tmp[action.result.data.muyu.seat] = action.result.data.muyu.count !== 0;
                            }
                        txt += `setMuyuSeats('${muyuseats})';\n`;
                    }
                }
                if (action.result.name === 'RecordDiscardTile') {
                    const tile = Data.tile, is_liqi = Data.is_liqi, moqie = Data.moqie;
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
                    const beishui_type = Data.liqi_type_beishuizhizhan;
                    if (beishui_type !== undefined)
                        txt = txt.substring(0, txt.length - 3) + `,[${beishui_type}]);\n`;
                }
                if (action.result.name === 'RecordChangeTile') {
                    const tls = ['', '', '', ''];
                    for (let i = 0; i < tls.length; i++)
                        tls[i] = Data.chang_tile_infos[i].out_tiles.join('');
                    const type = Data.change_type;
                    txt += `huanpai(['${tls[0]}','${tls[1]}','${tls[2]}','${tls[3]}'],${type});\n`;
                }
                if (action.result.name === 'RecordSelectGap') {
                    const gap_types = Data.gap_types;
                    const words = {'0': 'p', '1': 'm', '2': 's'};
                    let ret = '';
                    for (const type of gap_types)
                        ret += words[type];
                    txt += `dingque('${ret}');\n`;
                }
                if (action.result.name === 'RecordDealTile') {
                    if (Data.tile_index)
                        txt += `mopai([${Data.tile_index}]);\n`;
                    else
                        txt += `mopai();\n`;
                }
                if (action.result.name === 'RecordChiPengGang') {
                    const froms = Data.froms, seat = Data.seat, tiles = Data.tiles;

                    let c_tiles = '';
                    for (const i of tiles.keys())
                        if (froms[i] === seat)
                            c_tiles += tiles[i];
                    let j = index + 1;
                    while (!actions1[j].result)
                        j++;
                    if (actions1[j].result.name === 'RecordGangResultEnd')
                        txt += `mingpai(${seat},'${c_tiles}',true);\n`;
                    else
                        txt += `mingpai(${seat},'${c_tiles}');\n`;
                }
                if (action.result.name === 'RecordAnGangAddGang') {
                    const tile = Data.tiles, type = Data.type;
                    const c_type = type === 3 ? 'angang' : 'jiagang';

                    let j = index + 1;
                    while (!actions1[j].result)
                        j++;
                    if (actions1[j].result.name === 'RecordGangResultEnd')
                        txt += `zimingpai('${tile}','${c_type}',true);\n`;
                    else
                        txt += `zimingpai('${tile}','${c_type}');\n`;
                }
                if (action.result.name === 'RecordBaBei') {
                    const tile = Data.tile;
                    txt += `zimingpai('${tile}','babei');\n`;
                }
                if (action.result.name === 'RecordHule') {
                    const all_seats = [];
                    for (const i of Data.hules.keys())
                        all_seats.push(Data.hules[i].seat);
                    txt += `hupai(${all_seats.toString()});\n\n`;
                }
                if (action.result.name === 'RecordLiuJu') {
                    txt += `liuju();\n\n`;
                }
                if (action.result.name === 'RecordNoTile') {
                    txt += `huangpai();\n\n`;
                }
                if (action.result.name === 'RecordHuleXueZhanMid') {
                    const all_seats = [];
                    for (const i of Data.hules.keys())
                        all_seats.push(Data.hules[i].seat);
                    txt += `hupai([${all_seats.toString()}]);\n\n`;
                }
                if (action.result.name === 'RecordHuleXueZhanEnd') {
                    const all_seats = [];
                    for (const i of Data.hules.keys())
                        all_seats.push(Data.hules[i].seat);
                    txt += `hupai([${all_seats.toString()}],true);\n\n\n\n`;
                }
                if (action.result.name === 'RecordGangResult') { // 不需要
                }
                if (action.result.name === 'RecordGangResultEnd') { // 不需要
                }
                if (action.result.name === 'RecordRevealTile') {
                    const tile = Data.tile, is_liqi = Data.is_liqi;
                    if (is_liqi)
                        txt += `qiepai('${tile}',true,'anpai');\n`;
                    else
                        txt += `qiepai('${tile}','anpai');\n`;
                }
                if (action.result.name === 'RecordLockTile') {
                    let j = index - 1;
                    while (!actions1[j].result)
                        j--;
                    if (actions1[j].result.name === 'RecordUnveilTile') {
                        const seat = actions1[j].result.data.seat;
                        if (actions1[j].result.data.lock_state === 1)
                            txt += `kaipaiLock(${seat});\n`;
                        else if (actions1[j].result.data.lock_state === 0)
                            txt += `kaipai(${seat});\n`;
                    }
                }
                if (action.result.name === 'RecordUnveilTile') { // 不需要
                }
                if (action.result.name === 'RecordNewCard') { // 不需要
                }
                if (action.result.name === 'RecordFillAwaitingTiles') { // 不需要
                }
            }
        // txt += `all_data.players = ${JSON.stringify(json.head.result.players)};\n`;
        txt = txt.substring(0, txt.length - 1); // 去掉最后多余的回车

        download(txt, uuid);

        function roundinfo(chang, ju, ben) {
            let chang_word = [`东`, `南`, `西`, `北`];
            return `${chang_word[chang]}${ju + 1}局${ben}本场`;
        }
    }
})();
