"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Drawer, Table } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { ILead } from "../utils/interfaces";
import axios from "axios";
import { useQuery } from "react-query";
import { getLoads } from "../utils/apis";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const t = useTranslations("IndexPage");
  const router = useRouter();
  const localeActive = useLocale();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<{
    leadSrc: string;
    status: string;
    filtring: boolean;
  }>({
    leadSrc: "",
    status: "",
    filtring: false,
  });

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
        height: "79vh",
      }}
    >
      <Drawer
        sx={{
          "& .MuiDrawer-paper": { width: 300, height: "91vh", top: "65px" },
        }}
        open={openFilter}
        anchor={localeActive === "ar" ? "left" : "right"}
        onClose={() => setOpenFilter(false)}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        ></Box>
      </Drawer>
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
          <Button variant="contained" onClick={() => setOpenFilter(true)}>
            {t("filter")}
          </Button>
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
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[5]}
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
    </Box>
  );
}
