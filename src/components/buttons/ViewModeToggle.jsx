import { Grid, List } from "lucide-react";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { getSystemLabel } from "@/components/labels/system_labels.js";

const ViewModeToggle = ({ viewMode, setViewMode, fontStyle }) => {
  const { isCn } = useContext(LanguageContext);

  const getTooltipText = (mode) => {
    if (mode === 'grid') {
      return getSystemLabel('switch_to_grid', isCn);
    } else {
      return getSystemLabel('switch_to_list', isCn);
    }
  };

  return (
    <div 
      className="flex rounded-md border overflow-hidden" 
      style={{
        ...fontStyle,
        borderColor: 'var(--border-light, #000000)',
        backgroundColor: 'transparent',
      }}
    >
      <Tooltip 
        title={getTooltipText('grid')}
        arrow 
        placement="top"
        enterDelay={500}
        leaveDelay={200}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('grid');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setViewMode('grid');
          }}
          className="flex-1 px-3 py-2 text-sm font-medium transition-colors touch-manipulation"
          style={{
            ...fontStyle,
            backgroundColor: viewMode === 'grid' 
              ? 'var(--text-primary, #000000)' 
              : 'transparent',
            color: viewMode === 'grid' 
              ? 'var(--background-primary, #ffffff)' 
              : 'var(--text-primary, #000000)',
            border: '1px solid var(--border-light, #000000)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          <Grid size={16} className="mx-auto" />
        </button>
      </Tooltip>
      <Tooltip 
        title={getTooltipText('list')}
        arrow 
        placement="top"
        enterDelay={500}
        leaveDelay={200}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('list');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setViewMode('list');
          }}
          className="flex-1 px-3 py-2 text-sm font-medium transition-colors touch-manipulation"
          style={{
            ...fontStyle,
            backgroundColor: viewMode === 'list' 
              ? 'var(--text-primary, #000000)' 
              : 'transparent',
            color: viewMode === 'list' 
              ? 'var(--background-primary, #ffffff)' 
              : 'var(--text-primary, #000000)',
            border: '1px solid var(--border-light, #000000)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          <List size={16} className="mx-auto" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ViewModeToggle;  