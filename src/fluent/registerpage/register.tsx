import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
      comments: "",
      dev_size: undefined,
      plan_to_use: undefined,
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
        if (values.comments) {
          formData.append("sysparm_user_comments", values.comments);
        }
        if (values.dev_size) {
          formData.append("sysparm_user_dev_size", values.dev_size);
        }
        if (values.plan_to_use) {
          formData.append("sysparm_user_plan_to_use", values.plan_to_use);
        }

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
            width: "400px",
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
            slotProps={{ htmlInput: { maxLength: 255 } }}
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
            slotProps={{ htmlInput: { maxLength: 255 } }}
            required
          />
          <TextField
            name="company"
            label="Company"
            variant="outlined"
            slotProps={{ htmlInput: { maxLength: 255 } }}
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            required
          />
          <Grid
            container
            spacing={2}
            columns={{ xs: 6, sm: 6, md: 12 }}
            sx={{ alignItems: "stretch" }}
          >
            <Grid size={6} display="flex" flexDirection="column">
              <FormControl>
                <InputLabel id="devTeamSize-label">Dev Team Size</InputLabel>
                <Select
                  id="dev_size"
                  name="dev_size"
                  labelId="devTeamSize-label"
                  label="Dev Team Size"
                  value={formik.values.dev_size}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1}>1 (me)</MenuItem>
                  <MenuItem value={5}>2-5</MenuItem>
                  <MenuItem value={10}>6-10</MenuItem>
                  <MenuItem value={20}>11-20</MenuItem>
                  <MenuItem value={50}>21-50</MenuItem>
                  <MenuItem value={9999}>50+</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6} display="flex" flexDirection="column">
              <FormControl>
                <InputLabel id="planToUser-label">Plan to use</InputLabel>
                <Select
                  id="plan_to_use"
                  name="plan_to_use"
                  labelId="planToUser-label"
                  label="Plan to use"
                  value={formik.values.plan_to_use}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="convert_existing_app">
                    Convert existing app
                  </MenuItem>
                  <MenuItem value="build_new_app">New app</MenuItem>
                  <MenuItem value="investigate">Investigate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            name="comments"
            label="Additional questions or comments?"
            variant="outlined"
            minRows={3}
            slotProps={{ htmlInput: { maxLength: 5000 } }}
            multiline
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.comments && Boolean(formik.errors.comments)}
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
