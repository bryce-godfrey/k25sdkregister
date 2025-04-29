import "@servicenow/sdk/global";

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                        "register-page": {
                            "table": "sys_ui_page",
                            "id": "8b41ebf014f4473d85806ac98703f352"
                        },
                        "package_json": {
                            "table": "sys_module",
                            "id": "b59a843b60fb4f61a39c28539443e329"
                        },
                        "k25-sdk-register_app_jsdbx": {
                            "table": "sys_ux_lib_asset",
                            "id": "ac687b3447464accb5d4a66cae633ce5"
                        },
                        "src_server_registration_ts": {
                            "table": "sys_module",
                            "id": "f9b19330005e4b5a8ca16fcc793728b8"
                        },
                        "register-script-include": {
                            "table": "sys_script_include",
                            "id": "76ef823ae4ac425ba2cc99feef411083"
                        }
                    };
                deleted: {
                        "sys_ux_lib_asset": [
                            "15ffa22965d748659a476d8ddf17c3fa",
                            "f4115bf2108f4d83ae72595149278ccd"
                        ]
                    };
            }
        }
    }
}
