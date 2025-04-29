import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "Bryce Godfrey",
      email: "bryce.godfrey@servicenow.com",
      company: "ServiceNow",
    },
    onSubmit: (values, { setStatus }) => {
      return new Promise<void>((resolve, reject) => {
        if ("GlideAjax" in window === false) {
          console.error("GlideAjax is not available");
          resolve();
          navigate("/thanks", { replace: true });
          return;
        }

        //@ts-expect-error
        const ajax = new GlideAjax("sn_k25sdkregister.K25SDKRegister");
        ajax.addParam("sysparm_scope", "sn_k25sdkregister");
        ajax.addParam("sysparm_name", "registerAjax");
        ajax.addParam("sysparm_user_name", values.name);
        ajax.addParam("sysparm_user_email", values.email);
        ajax.addParam("sysparm_user_company", values.company);

        console.log("Sending data to server:", values);

        ajax.getXML((response) => {
          const data = JSON.parse(
            response.responseXML.documentElement.getAttribute("answer")
          );

          console.warn(data);

          if (data.success) {
            setStatus(data.message);
            reject(data.message);
            return;
          }

          resolve();
          navigate("/thanks", { replace: true });
        });
      });
    },
  });

  return (
    <div className="register-page">
      <Typography
        variant="h4"
        component="h1"
        align="center"
        alignContent="center"
      >
        ServiceNow SDK Info Registration
      </Typography>
      <form
        method="post"
        action="/thanks"
        encType="multipart/form-data"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "300px",
            margin: "0 auto",
            marginTop: "50px",
          }}
        >
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            required
          />
          <TextField
            name="company"
            label="Company"
            variant="outlined"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            required
          />
          {formik.status && <Alert severity="error">{formik.status}</Alert>}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
            {formik.isSubmitting ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "green",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-10px",
                  marginLeft: "-10px",
                }}
              />
            ) : null}
          </Button>
        </Box>
      </form>
    </div>
  );
};
