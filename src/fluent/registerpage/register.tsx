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
      name: "",
      email: "",
      company: "",
    },
    onSubmit: (values, { setStatus }) => {
      return new Promise<void>(async (resolve, reject) => {
        const formData = new URLSearchParams();
        formData.append(
          "sysparm_processor",
          "sn_k25sdkregister.K25SDKRegister"
        );
        formData.append("sysparm_scope", "sn_k25sdkregister");
        formData.append("sysparm_name", "registerAjax");
        formData.append("sysparm_user_name", values.name);
        formData.append("sysparm_user_email", values.email);
        formData.append("sysparm_user_company", values.company);

        const request = await fetch("/xmlhttp.do", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "*/*",
            "X-Usertoken": window.g_ck,
          },
          body: formData.toString(),
        });

        if (!request.ok) {
          console.error("Request failed", request);
          setStatus("Request failed");
          reject("Request failed");
          return;
        }

        const text = await request.text();
        const parsed = new window.DOMParser().parseFromString(text, "text/xml");

        console.info(parsed);

        const data = JSON.parse(parsed.documentElement.getAttribute("answer")!);

        if (!data.success) {
          setStatus(data.message);
          reject(data.message);
          return;
        }

        resolve();
        navigate("/thanks", { replace: true });
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

declare global {
  interface Window {
    //ServiceNow token
    g_ck: string;
  }
}
