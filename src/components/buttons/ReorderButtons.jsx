import { Box, Button, CircularProgress } from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';

export default function ReorderButtons({ 
  onSave, 
  onReset, 
  onRefresh, 
  canSave, 
  canReset, 
  isSaving, 
  labels = {},
  onAutoOrderByYear,
  showAutoOrderByYear = false,
  yearOrder = 'asc', // 'asc' or 'desc'
  onYearOrderToggle, // function to toggle year order
}) {
  const {
    saveOrder = 'Save Order',
    saving = 'Saving...',
    reset = 'Reset',
    refresh = 'Refresh',
  } = labels;
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button
        variant="contained"
        size="medium"
        startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
        onClick={(e) => {
          e.stopPropagation();
          if (onSave) onSave(e);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onSave) onSave(e);
        }}
        disabled={!canSave}
        sx={{ 
          minWidth: 120, 
          fontWeight: 600, 
          borderRadius: '8px', 
          textTransform: 'none', 
          fontSize: '1rem', 
          backgroundColor: 'var(--text-primary, #000)', 
          color: 'var(--background-primary, #fff)', 
          '&:hover': { backgroundColor: 'var(--text-secondary, #222)' },
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {isSaving ? saving : saveOrder}
      </Button>
      <Button
        variant="outlined"
        size="medium"
        startIcon={<RefreshIcon />}
        onClick={(e) => {
          e.stopPropagation();
          if (onReset) onReset(e);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onReset) onReset(e);
        }}
        disabled={!canReset}
        sx={{ 
          minWidth: 100, 
          borderRadius: '8px', 
          textTransform: 'none', 
          fontSize: '1rem', 
          color: 'var(--text-primary, #000)', 
          borderColor: 'var(--text-primary, #000)', 
          '&:hover': { backgroundColor: 'var(--text-primary, #000)', color: 'var(--background-primary, #fff)', borderColor: 'var(--text-primary, #000)' },
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {reset}
      </Button>
      <Button
        variant="text"
        size="medium"
        onClick={(e) => {
          e.stopPropagation();
          if (onRefresh) onRefresh(e);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onRefresh) onRefresh(e);
        }}
        disabled={isSaving}
        sx={{
          color: 'var(--text-primary, #000)',
          borderColor: 'var(--text-primary, #000)',
          borderWidth: 1,
          borderStyle: 'solid',
          textTransform: 'none',
          fontSize: '1rem',
          backgroundColor: 'var(--background-primary, #fff)',
          '&:hover': {
            backgroundColor: 'var(--background-secondary, #eee)',
            color: 'var(--text-primary, #000)',
            borderColor: 'var(--text-primary, #000)',
          },
          '&.Mui-disabled': {
            color: 'var(--text-secondary, #aaa)',
            borderColor: 'var(--border-light, #eee)',
          },
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {refresh}
      </Button>
      {/* Only show Auto Order by Year button and toggle if showAutoOrderByYear is true */}
      {showAutoOrderByYear && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
              if (onAutoOrderByYear) onAutoOrderByYear(e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onAutoOrderByYear) onAutoOrderByYear(e);
            }}
            disabled={isSaving}
            sx={{ 
              minWidth: 140, 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontSize: '1rem', 
              color: '#000', 
              borderColor: '#000', 
              '&:hover': { backgroundColor: '#000', color: '#fff', borderColor: '#000' },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {labels.autoOrderByYear || 'Auto Order by Year'}
          </Button>
          <Button
            variant="text"
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
              if (onYearOrderToggle) onYearOrderToggle(e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onYearOrderToggle) onYearOrderToggle(e);
            }}
            disabled={isSaving}
            sx={{
              minWidth: 40,
              borderRadius: '8px',
              color: '#000',
              borderColor: '#000',
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#eee',
                color: '#000',
                borderColor: '#000',
              },
              '&.Mui-disabled': {
                color: '#aaa',
                borderColor: '#eee',
              },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
            title={yearOrder === 'asc' ? (labels.yearAsc || 'Year Ascending') : (labels.yearDesc || 'Year Descending')}
          >
            {yearOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
          </Button>
        </Box>
      )}
    </Box>
  );
} 