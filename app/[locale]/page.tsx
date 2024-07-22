"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Table } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { ILead } from "../utils/interfaces";
import axios from "axios";
import { useQuery } from "react-query";
import { getLoads } from "../utils/apis";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useTranslations("IndexPage");
  const router = useRouter();
  const localeActive = useLocale();
  const { data, isLoading } = useQuery({
    queryFn: () => getLoads(),
    queryKey: ["leads"],
    staleTime: 30000,
    refetchOnMount: true,
  });

  const columns: GridColDef<ILead>[] = [
    {
      field: "id",
      headerName: t("id"),
    },
    {
      field: "name",
      headerName: t("name"),
    },
    {
      field: "date",
      headerName: t("date"),
    },
    {
      field: "status",
      headerName: t("status"),
    },
    {
      field: "leadSrc",
      headerName: t("lead_source"),
    },
    {
      field: "query",
      headerName: t("enquery_type"),
    },
    {
      field: "propertyType",
      headerName: t("prop_type"),
    },
  ];
  return (
    <Box
      component={"section"}
      sx={{
        m: 2,
        height: "80vh",
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3rem",
          height: "100%",
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button variant="contained">{t("filter")}</Button>
          <Button
            variant="contained"
            onClick={() => {
              router.push(`${localeActive}/add-new-lead`);
            }}
          >
            {t("add_leads")}
          </Button>
        </Box>
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          sx={{ height: "80%", width: "100%" }}
        />
      </Box>
    </Box>
  );
}
