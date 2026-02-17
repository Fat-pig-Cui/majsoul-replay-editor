declare var view: any;
declare type View_Type = {
    ViewPlayer_Other: any;
    ViewPlayer_Me: any;
    EMJMode: any;
    ERuleMode: any;
    ELink_State: any;
    AudioMgr: any;
    DesktopMgr?: {
        player_link_state: any;
        Inst?: {
            seat: Seat,
            active: boolean,
            paipu_config: any;
            initRoom: Function;
            rule_mode: any;
            mode: number;
            setNickname: Function;
            is_peipai_open_mode: Function;
            is_tianming_mode: Function;
            isTargetSpecialMode: Function;
            players: { hand: any[] }[];
            waiting_lingshang_deal_tile: boolean;
            record_show_anim: boolean;
            getPlayerName: (seat: number) => string;
            player_datas: PlayerDatas;
            index_ju: number;
            player_count: number;
            index_player: Seat;
            index_change: number;
            is_chuanma_mode: () => boolean;
            seat2LocalPosition: (seat: Seat) => Seat;
            localPosition2Seat: (seat: Seat) => Seat,
            muyu_info: {
                seat: Seat,
            }
        },
    }
    ViewPai?: {
        Inst?: {
            OnChoosedPai: () => void;
        },
    }
    ActionAnGangAddGang: {
        getAngangTile: Function;
    }
};
declare var GameMgr: any;
declare type GameMgr_Type = {
    Inst: {
        checkPaiPu: (game_uuid: string, account_id: number, paipu_config: 0 | 2) => void,
        onLoadStart: Function,
        mjp_view: any,
        mjp_surface_view: any,
        duringPaipu: boolean;
        record_uuid: string;
        getClientVersion: Function;
    },
    prefix_url: string;
    client_language: string;
};
declare var uiscript: any;
declare type UIScript_Type = {
    UI_Loading: any;
    ELoadingType: any;
    UIMgr: any;
    UI_DesktopInfo: any;
    UI_Win: any;
    UIRect: any;
    UI_Activity: any;
    UI_Activity_DuanWu_Point: any;
    UI_Activity_RPG: any;
    UI_Replay: {
        prototype: {
            resetData: () => void;
        }
        Inst: {
            initMaka: Function;
            initData: Function;
            enable: boolean;
            rounds: {
                actions: Actions,
                xun: number[],
            }[],
            gameResult: {
                result: {
                    players: Players
                }
            }
            nextStep: Function;
        }
    },
    UI_Sushe: {
        now_desktop_id: number,
        now_mjp_id: number,
        now_mjp_surface_id: number,
    }
};

declare var app: any;
declare var game: any;
declare var Laya: any
declare var mjcore: any
declare var net: any;
