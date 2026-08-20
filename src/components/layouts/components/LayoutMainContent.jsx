"use client";
import { useContext } from "react";
import { Box } from "@mui/material";
import { ManagerContext } from "@/components/contexts/ManagerContext";
import TitleTextNavSimpleStyle from "@/components/navs/ManagerNav";
import MainNav from "@/components/navs/MainNav";
import LanguageSwitcherInMenu from "@/components/switchers/LanguageSwitcherInMenu";
import ManagerAuthGate from "@/components/layouts/components/ManagerAuthGate";
import {
  ESTIMATED_FOOTER_HEIGHT,
  MAIN_PT_MOBILE,
  MAIN_PT_DESKTOP,
  BACK_BUTTON_TOP,
  BACK_BUTTON_RIGHT,
} from "@/components/layouts/constants/layout_constants";

/**
 * Core page shell: nav, back button, language switcher, and page content.
 * Uses MainNav for public pages, TitleTextNavSimpleStyle for manager.
 */
export default function LayoutMainContent({ children, showBackButton, isMobile, backgroundColor }) {
  const { isManager } = useContext(ManagerContext);

  // MainNav includes its own 56px spacer — only add extra pt for manager nav
  const pt = isManager ? (isMobile ? MAIN_PT_MOBILE : MAIN_PT_DESKTOP) : 0;

  const navSlot = isManager ? (
    <Box sx={{ position: "relative", zIndex: 1100 }} style={{ background: "transparent" }}>
      <TitleTextNavSimpleStyle />
    </Box>
  ) : (
     <Box sx={{ position: "relative", zIndex: 1100,marginTop:"45px" }} style={{ background: "transparent" }}>
    <MainNav />
  </Box>
  );

  const content = (
    <>
      {navSlot}

      <LanguageSwitcherInMenu
        sx={{
          position: "fixed",
          top: BACK_BUTTON_TOP,
          right: BACK_BUTTON_RIGHT,
          zIndex: 1200,
        }}
      />



      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          pb: ESTIMATED_FOOTER_HEIGHT,
          pt,
          minWidth: 0,
          position: "relative",
        }}
        style={{ backgroundColor, background: backgroundColor }}
      >
        {children}
      </Box>
    </>
  );

  if (isManager) {
    return <ManagerAuthGate>{content}</ManagerAuthGate>;
  }

  return content;
}
