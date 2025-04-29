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
                        "register-script-include": {
                            "table": "sys_script_include",
                            "id": "76ef823ae4ac425ba2cc99feef411083"
                        },
                        "k25-sdk-register_app_jsdbx": {
                            "table": "sys_ux_lib_asset",
                            "id": "2a08f3add52342e09a66081d2b92ec79"
                        }
                    };
                deleted: {
                        "sys_ux_lib_asset": [
                            "ac687b3447464accb5d4a66cae633ce5",
                            "15ffa22965d748659a476d8ddf17c3fa",
                            "f4115bf2108f4d83ae72595149278ccd"
                        ],
                        "sys_module": [
                            "f9b19330005e4b5a8ca16fcc793728b8"
                        ]
                    };
            }
        }
    }
}
