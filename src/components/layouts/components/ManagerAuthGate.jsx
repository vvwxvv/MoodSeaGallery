"use client";
import { Box, Alert, CircularProgress } from "@mui/material";
import PatternLock from "@/components/lockers/PatternLock";
import { usePatternAuth } from "@/hooks/usePatternAuth";

/**
 * Auth gate rendered only when the app is in manager mode.
 * Blocks all children behind a pattern lock until authenticated.
 */
export default function ManagerAuthGate({ children }) {
  const {
    isAuthenticated,
    isChecking,
    error: authError,
    authenticate,
    clearError,
  } = usePatternAuth();

  if (isChecking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--background-primary, #ffffff)",
        }}
      >
        <CircularProgress sx={{ color: "var(--text-primary, #000000)" }} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--background-primary, #ffffff)",
          gap: 2,
        }}
      >
        {authError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
            {authError}
          </Alert>
        )}
        <PatternLock onSuccess={authenticate} />
      </Box>
    );
  }

  return <>{children}</>;
}