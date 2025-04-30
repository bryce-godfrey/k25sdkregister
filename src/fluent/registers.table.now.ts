import { ChoiceColumn, StringColumn, Table } from "@servicenow/sdk/core";

export const sn_k25sdkregister_attendees = Table({
  name: "sn_k25sdkregister_attendees",
  label: "K25 SDK Register Attendees",
  schema: {
    name: StringColumn({
      label: "Name",
      maxLength: 255,
      mandatory: false,
    }),
    email: StringColumn({
      label: "Email",
      maxLength: 255,
      mandatory: true,
    }),
    company: StringColumn({
      label: "Company",
      maxLength: 255,
      mandatory: false,
    }),
    comments: StringColumn({
      label: "Comments",
      maxLength: 5000,
    }),
    plan_to_use: ChoiceColumn({
      label: "Plan to use",
      choices: {
        convert_existing_app: {
          label: "Convert existing app",
        },
        build_new_app: {
          label: "Build new app",
        },
        investigate: {
          label: "Investigate",
        },
      },
    }),
    dev_size: ChoiceColumn({
      label: "Dev team size",
      choices: {
        1: {
          label: "1",
        },
        5: {
          label: "2-5",
        },
        10: {
          label: "6-10",
        },
        20: {
          label: "11-20",
        },
        50: {
          label: "21-50",
        },
        9999: {
          label: "50+",
        },
      },
    }),
  },
});
