"use client";
import { useState, ReactNode, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  CssBaseline,
  Box,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "../shared/LocalSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/app/utils/react-query";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { arEG, enUS } from "@mui/material/locale";

interface RootLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: RootLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("IndexPage");
  const pathname = usePathname();
  const localeActive = useLocale();
  const theme = createTheme(
    {
      direction: localeActive === "ar" ? "rtl" : "ltr",
    },
    localeActive === "ar" ? arEG : enUS
  );
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const cacheLtr = createCache({
    key: "mui",
  });

  const isActive = (path: string) => pathname === path;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    document.documentElement.dir = localeActive === "ar" ? "rtl" : "ltr";
  }, [localeActive]);
  const drawer = (
    <div>
      <Toolbar
        component="h1"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          color: "#1DB2FF",
          fontWeight: "bold",
        }}
      >
        Connex
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          component={Link}
          href={`/${localeActive}`}
          sx={{
            color: isActive(`/${localeActive}`) ? "#1DB2FF" : "black",
            "&:hover": { backgroundColor: "#EDF9FF" },
          }}
        >
          <ListItemText primary={t("leads")} />
        </ListItem>
        <ListItem
          component={Link}
          href={`/${localeActive}/add-new-lead`}
          sx={{
            color: isActive(`/${localeActive}/add-new-lead`)
              ? "#1DB2FF"
              : "black",
            "&:hover": { backgroundColor: "#EDF9FF" },
          }}
        >
          <ListItemText primary={t("add_leads")} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={localeActive === "ar" ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                width: {
                  sm: mobileOpen ? `calc(100% - 240px)` : "100%",
                  md: `calc(100% - 240px)`,
                },
                ml: { sm: `240px` },
                backgroundColor: "white",
                color: "#1DB2FF",
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ marginInlineEnd: 2, display: { md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                  {t("welcome")}
                </Typography>
                <LocaleSwitcher />
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{
                width: { sm: mobileOpen ? 240 : 0, md: 240 },
                flexShrink: { sm: 0 },
              }}
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, 
                }}
                sx={{
                  display: { xs: "block", sm: "block" },
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "none", md: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 240,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)`, xs: "100%" } }}
            >
              <Toolbar />
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
