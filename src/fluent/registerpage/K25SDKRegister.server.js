const K25SDKRegister = Class.create();
K25SDKRegister.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
  type: "K25SDKRegister",

  registerAjax: function () {
    try {
      const name = this.getParameter("sysparm_user_name");
      const email = this.getParameter("sysparm_user_email");
      const company = this.getParameter("sysparm_user_company");

      if (!name || !email) {
        return JSON.stringify({
          success: false,
          message: "Name and email are required.",
        });
      }

      const record = new GlideRecordSecure("sn_k25sdkregister_attendees");

      record.addQuery("email", email.trim());
      record.query();
      if (record.hasNext()) {
        return JSON.stringify({
          success: false,
          message: "Email already registered.",
        });
      }

      record.initialize();
      record.setValue("name", name.trim());
      record.setValue("email", email.trim());
      record.setValue("company", company.trim());
      const recordId = record.insert();

      return JSON.stringify({
        success: !!recordId,
        recordId,
      });
    } catch (error) {
      gs.error(
        "Error in K25SDKRegister: " + error.message + "\n" + error.stack
      );
      return JSON.stringify({
        success: false,
        message: error,
      });
    }
  },
});
