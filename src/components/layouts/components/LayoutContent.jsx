"use client";
import { useEffect, useState, useContext } from "react";
import { AtomicState } from "atomic-utils";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import Footer from "@/components/footers/Footer";
import LoadingLayer from "@/components/animations/LoadingLayer";
import ConstructionBWPageComponent from "@/components/pages/constructions/ConstructionBWPageComponent";
import LayoutMainContent from "@/components/layouts/components/LayoutMainContent";
import LanguageSwitcherInMenu from "@/components/switchers/LanguageSwitcherInMenu";
import useFont from "@/hooks/useFont";
import useBackgroundColor from "@/hooks/useBackgroundColor";
import { isHomepage } from "@/utils/routeUtils";
import { LAYOUT_LOADING_TIME } from "@/components/layouts/constants/layout_constants";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分钟缓存
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function useUnderConstruction() {
  const [isUnderConstruction, setIsUnderConstruction] = useState(false);
  useEffect(() => {
    const envValue = String(process?.env?.NEXT_PUBLIC_APP_UNDER_CONSTRUCTION ?? "")
      .trim().toLowerCase();
    setIsUnderConstruction(envValue === "true");
  }, []);
  return isUnderConstruction;
}

function useLayoutReady(delay = LAYOUT_LOADING_TIME) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return isReady;
}

/** Forces html/body background transparent while construction page is active. */
function useTransparentBody(active) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    html.style.backgroundColor = "transparent";
    body.style.backgroundColor = "transparent";
    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, [active]);
}

export default function LayoutContent({ children }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const isLayoutReady = useLayoutReady();
  const isUnderConstruction = useUnderConstruction();

  const pathname = usePathname();
  const showBackButton = !isHomepage(pathname);

  const { style } = useFont();
  const { isMobile } = useContext(DeviceContext);
  const { backgroundColor } = useBackgroundColor("transparent", { useCustomColor: true });

  useEffect(() => { setIsClientReady(true); }, []);

  useTransparentBody(isClientReady && isUnderConstruction);

  // 1. Pre-hydration
  if (!isClientReady) {
    return <LoadingLayer isLoading />;
  }

  // 2. Construction mode
  if (isUnderConstruction) {
    return (
      <>
        <LoadingLayer isLoading={!isLayoutReady} />
        {isLayoutReady && (
          <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%" }}>
            <ConstructionBWPageComponent />
          </div>
        )}
      </>
    );
  }

  // 3. Normal layout
  const containerStyle = { backgroundColor, background: backgroundColor };

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <LoadingLayer isLoading={!isLayoutReady} />
      {isLayoutReady && (
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
          style={{ ...style, ...containerStyle }}
        >
          <Box 
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1, width: "100%", position: "relative" }}
            style={containerStyle}
          >
            {/* Language Switcher */}
            <LanguageSwitcherInMenu />

            <AtomicState>
              <LayoutMainContent
                showBackButton={showBackButton}
                isMobile={isMobile}
                backgroundColor={backgroundColor}
              >
                {children}
              </LayoutMainContent>
            </AtomicState>
          </Box>
          <Footer />
        </Box>
      )}
      </QueryClientProvider>
    </>
  );
}