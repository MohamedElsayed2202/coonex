"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useLocale, useTranslations } from "next-intl";
import { useFormik } from "formik";
import { ILead } from "@/app/utils/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { queryClient } from "@/app/utils/react-query";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
  name: yup.string().required("Name is required").min(3),
  status: yup.string().required("Status is required"),
  date: yup.string().required("Date is required"),
  leadSrc: yup.string(),
  query: yup.string(),
  propertyType: yup.string(),
});

const addLead = async (_data: ILead) => {
  try {
    const { data } = await axios.post(
      "https://leads-back.vercel.app/api/v1/leads",
      _data
    );
  } catch (error) {
    throw error;
  }
};

const AddNewLead = () => {
  const t = useTranslations("AddPage");
  const router = useRouter();
  const localeActive = useLocale();
  const { mutate, isLoading } = useMutation({
    mutationFn: addLead,
    onSettled: () => {
      queryClient.invalidateQueries("leads");
      router.push(`/${localeActive}`);
    },
  });
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik<ILead>({
    initialValues: {
      name: "",
      date: "",
      status: "",
      leadSrc: "",
      propertyType: "",
      query: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Box
      component={"section"}
      sx={{
        m: 2,
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          width: "100%",
          minHeight: "100%",
          p: "1.5rem",
        }}
      >
        <Typography
          component={"h2"}
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            mb: "1rem",
          }}
        >
          {t("basic_information")}
        </Typography>

        <Box
          component={"form"}
          noValidate
          autoComplete="off"
          width={"100%"}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item md={4} xs={6} sx={{ mb: 2 }}>
              <TextField
                name="name"
                label={t("contact_name")}
                id="name"
                required
                fullWidth
                variant="filled"
                placeholder={t("contact_name")}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item md={4} xs={6} sx={{ mb: 2 }}>
              <FormControl
                fullWidth
                variant="filled"
                error={touched.status && Boolean(errors.status)}
              >
                <InputLabel id="status">{t("status")}</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={values.status}
                  label={t("status")}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                >
                  <MenuItem value={"newLeads"}>New Lead</MenuItem>
                  <MenuItem value={"contacted"}>Contacted</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.status && errors.status}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12} sx={{ mb: 2 }}>
              <TextField
                name="date"
                id="date"
                required
                fullWidth
                variant="filled"
                type="date"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4} xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="propertyType">{t("prop_type")}</InputLabel>
                <Select
                  labelId="propertyType"
                  id="propertyType"
                  value={values.propertyType}
                  label={t("prop_type")}
                  onChange={(e) =>
                    setFieldValue("propertyType", e.target.value)
                  }
                >
                  <MenuItem value={"Residential"}>Residential</MenuItem>
                  <MenuItem value={"Commercial"}>Commercial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="query">{t("enquery_type")}</InputLabel>
                <Select
                  labelId="query"
                  id="query"
                  value={values.query}
                  label={t("enquery_type")}
                  onChange={(e) => setFieldValue("query", e.target.value)}
                >
                  <MenuItem value={"Enquiry Type1"}>Enquiry Type1</MenuItem>
                  <MenuItem value={"Enquiry Type2"}>Enquiry Type2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="leadSrc">{t("lead_source")}</InputLabel>
                <Select
                  labelId="leadSrc"
                  id="leadSrc"
                  value={values.leadSrc}
                  label={t("lead_source")}
                  onChange={(e) => setFieldValue("leadSrc", e.target.value)}
                >
                  <MenuItem value={"Call"}>Call</MenuItem>
                  <MenuItem value={"Facebook"}>Facebook</MenuItem>
                  <MenuItem value={"Instagram"}>Instagram</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                router.push(`/${localeActive}`);
              }}
            >
              {t("cancel")}
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              {t("add")}
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddNewLead;
