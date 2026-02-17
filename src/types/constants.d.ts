declare var cfg: any;
declare type Cfg_Type = {
    item_definition: {
        item: {
            rows_: {
                id: number,
                name_chs: string,
                category: number,
                type: number,
            }[],
        }
        title: {
            rows_: {
                id: number,
                name_chs: string,
                category: number,
                type: number,
            }[],
        }
        skin: {
            map_: {
                id: number,
                character_id: number,
            }[],
            rows_: {
                id: number,
                character_id: number,
            }[],
        }
        view: {
            get: Function;
        }
    }
    fan: {
        fan: {
            map_: {
                id: number,
                name_chs: string,
                name_chs_t: string,
                name_jp: string,
                name_en: string,
                fan_menqing: number,
                fan_fulu: number,
                show_index: number,
                sound: string,
            }[],
            get: (id: number) => {
                id: number,
                name_chs: string,
                name_chs_t: string,
                name_jp: string,
                name_en: string,
                fan_menqing: number,
                fan_fulu: number,
                show_index: number,
                sound: string,
                mark?: boolean,
            };
        }
    }
    tournament: {
        tournaments: {
            get: (id: number) => { name: string };
        }
    },
    desktop: {
        matchmode: {
            get: (id: number) => any;
        }
    }
};
