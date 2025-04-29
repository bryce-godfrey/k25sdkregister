import { Record } from "@servicenow/sdk/core";

Record({
  $id: Now.ID["register-script-include"],
  table: "sys_script_include",
  data: {
    name: "K25SDKRegister",
    api_name: "sn_k25sdkregister.K25SDKRegister",
    script: Now.include("./K25SDKRegister.server.js"),
    client_callable: true,
    active: true,
  },
});
