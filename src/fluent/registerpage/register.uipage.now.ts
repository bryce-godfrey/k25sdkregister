import { Record } from "@servicenow/sdk/core";

Record({
  $id: Now.ID["register-page"],
  table: "sys_ui_page",
  data: {
    category: "general",
    name: "k25-sdk-register",
    direct: false,
    html: Now.asset("./index.html"),
  },
});
