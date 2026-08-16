import { Box, Typography, Divider, Button } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { Add as AddIcon } from "@mui/icons-material";
// Removed COMPONENT_STYLES import

// Inline styles used in this component
const headerStyle = {
  textAlign: 'left',
  mb: { xs: 2, sm: 4 },
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: { xs: 2, sm: 0 },
  justifyContent: 'space-between',
  alignItems: { xs: 'stretch', sm: 'center' }
};

const titleStyle = {
  fontWeight: 600,
  fontFamily: 'monospace',
  letterSpacing: '0.05em',
  textTransform: "uppercase",
  fontSize: { xs: '1.1rem', sm: '1.25rem' },
  backgroundColor: 'transparent'
};

const dividerStyle = {
  width: "100%",
  mt: 1,
  borderColor: '#000',
  borderWidth: 1
};

const primaryButtonStyle = {
  backgroundColor: '#000',
  color: "white",
  fontFamily: 'monospace',
  fontSize: { xs: '0.75rem', sm: '0.8rem' },
  textTransform: "uppercase",
  letterSpacing: '0.05em',
  borderRadius: '4px',
  px: { xs: 1.5, sm: 2 },
  py: { xs: 1, sm: 1.2 },
  minHeight: { xs: '44px', sm: 'auto' },
  width: { xs: '100%', sm: 'auto' },
  '&:hover': { backgroundColor: '#333' }
};

export default function SimplePageTitle({ title, buttonLabel, createRoute, labelFontStyle, viewMode, showAnimatedLine }) {

  return (
    <Box sx={headerStyle}>
      <div>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={titleStyle}
        >
          {title}
        </Typography>
        <Divider sx={dividerStyle} />
      </div>
      {createRoute && buttonLabel && (
        <Link href={createRoute} passHref>
          <motion.div whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={primaryButtonStyle}
            >
              {buttonLabel}
            </Button>
          </motion.div>
        </Link>
      )}
    </Box>
  );
} 
