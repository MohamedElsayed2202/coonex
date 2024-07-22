"use client";
import { MenuItem, Select } from "@mui/material";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();
  const changeLanguage = (newLocale: string) => {
    const oldPath = pathname.split("/").filter((path) => path !== "");
    oldPath.shift();
    oldPath.join("/");

    const newPathname = `/${newLocale}/${oldPath}`;
    router.replace(newPathname);
  };

  return (
    <Select
      value={localeActive}
      onChange={(e) => changeLanguage(e.target.value)}
      displayEmpty
      inputProps={{ "aria-label": "language switcher" }}
      sx={{
        color: "black",
        borderColor: "white",
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">العربية</MenuItem>
    </Select>
  );
};

export default LocaleSwitcher;
