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
    plan_to_use_soon: ChoiceColumn({
      label: "Plan to use soon",
      choices: {
        1: {
          label: "Right now",
        },
        4: {
          label: "Within 1 month",
        },
        12: {
          label: "Within 3 months",
        },
        24: {
          label: "Within 6 months",
        },
      },
    }),
    dev_size: ChoiceColumn({
      label: "Dev team size",
      choices: {
        1: {
          label: "1 (just me)",
        },
        5: {
          label: "< 5",
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
        100: {
          label: "51-100",
        },
        9999: {
          label: "100+",
        },
      },
    }),
  },
});
