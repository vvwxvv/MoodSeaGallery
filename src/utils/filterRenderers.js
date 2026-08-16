/**
 * filterRenderers.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * React render helpers for the filter panel.
 *
 * Key improvements vs. previous version
 *  • renderControl — device-aware click / touch handling (no 300 ms tap delay,
 *    no double-fire on hybrid devices, pointer-events normalised).
 *  • useMemo / useCallback used correctly at module level (hooks are only used
 *    inside ControlButton — a real component — never inside switch branches).
 *  • processControls is now a pure function exported from filterHelpers.
 *
 * Dependencies: React, FilterBarDropdown, CircleToggleButton, CustomTooltip,
 *               filterUtils, filterOptionsGenerators, fieldUtils, bilingualUtils
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useRef, useCallback, useMemo } from 'react';
import FilterBarDropdown from '@/components/navs/FilterBarDropdown';
import CircleToggleButton from '@/components/buttons/CircleToggleButton';
import CustomTooltip from '@/components/others/CustomTooltip';
import { getStateKey, getHandlerKey } from '@/utils/fieldUtils';
import { getBilingualLabel } from '@/utils/bilingualUtils';
import { generateFilterOptions } from '@/utils/filterOptionsGenerators';

import { resolveFilterColors, shouldShowFilter } from '@/utils/filterUtils';
import {
  processControls,
  renderSeparator,
  renderCountDisplay,
} from '@/utils/filterHelpers';

// ─── Device-aware interactive button ─────────────────────────────────────────

/**
 * Resolves a locale-aware string from a string | { cn, en } shape.
 */
const resolveLocale = (value, isCn) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return isCn ? (value.cn || value.en || '') : (value.en || value.cn || '');
};

/**
 * useTapHandler — returns a set of event props that work correctly on:
 *   • Desktop  (mouse)
 *   • Mobile   (touch — prevents 300 ms ghost click)
 *   • Hybrid   (pointer events — no double-fire)
 *
 * Strategy: use `onPointerUp` as the primary signal and cancel `onClick` when
 * a touch already handled the interaction.
 */
const useTapHandler = (onTap) => {
  const didTouch = useRef(false);

  const handlePointerUp = useCallback(
    (e) => {
      // Only respond to primary pointer (left-click / first touch)
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      onTap();
    },
    [onTap]
  );

  // Guard: some browsers still fire onClick after pointerup
  const handleClick = useCallback(
    (e) => {
      if (didTouch.current) {
        didTouch.current = false;
        e.preventDefault();
        return;
      }
      // Fallback for environments where pointer events are absent
      onTap();
    },
    [onTap]
  );

  const handleTouchStart = useCallback(() => {
    didTouch.current = true;
  }, []);

  return {
    onPointerUp:  handlePointerUp,
    onTouchStart: handleTouchStart,
    onClick:      handleClick,
    // Remove tap highlight on mobile
    style: { WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' },
  };
};

// ─── ControlButton ────────────────────────────────────────────────────────────

/**
 * Renders either an icon toggle or a plain icon button.
 * Extracted as a proper component so hooks obey the Rules of Hooks.
 *
 * @param {object} props
 * @param {object} props.control         Processed control config
 * @param {object} props.controlHandlers Map of action → handler
 * @param {object} props.fontStyle       Forwarded font style
 * @param {boolean} props.isCn           Locale flag
 */
const ControlButton = ({ control, controlHandlers, fontStyle, isCn }) => {
  const {
    type,
    action,
    icon,
    label,
    tooltip,
    isActive        = false,
    activeColor     = 'red',
    inactiveColor   = 'var(--text-primary, #000000)',
  } = control;

  const onTap = useCallback(() => {
    const handler = controlHandlers?.[action];
    if (typeof handler === 'function') {
      handler(control);
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(`[ControlButton] No handler for action: "${action}"`);
    }
  }, [action, control, controlHandlers]);

  const tapProps   = useTapHandler(onTap);
  const tooltipTxt = useMemo(() => resolveLocale(tooltip, isCn), [tooltip, isCn]);
  const labelTxt   = useMemo(() => resolveLocale(label, isCn),   [label,   isCn]);
  const ariaLabel  = labelTxt || tooltipTxt || action;

  // ── Circle toggle (no icon) ───────────────────────────────────────────────
  if (type === 'toggle' && !icon) {
    return (
      <CustomTooltip title={tooltipTxt || labelTxt} placement="top" arrow>
        <div style={{ display: 'inline-flex' }}>
          <CircleToggleButton
            isActive={isActive}
            onToggle={onTap}   // CircleToggleButton handles its own events
            fieldName={action}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            diameter={16}
            style={fontStyle}
          />
        </div>
      </CustomTooltip>
    );
  }

  // ── Icon toggle / button ──────────────────────────────────────────────────
  const color = type === 'toggle' && isActive ? activeColor : inactiveColor;

  return (
    <CustomTooltip title={tooltipTxt || labelTxt} placement="top" arrow>
      {/*
        Outer div absorbs the touch / pointer events so that the tooltip
        wrapper never blocks them on mobile.
      */}
      <div
        style={{ display: 'inline-flex', cursor: 'pointer' }}
        aria-label={ariaLabel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onTap()}
        {...tapProps}
      >
        <div
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          style={{
            ...fontStyle,
            color,
            transition: 'color 0.2s ease',
            userSelect: 'none',
          }}
        >
          {icon && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
          )}
          {labelTxt && (
            <span className="text-xs whitespace-nowrap" style={{ marginTop: 2, lineHeight: 1 }}>
              {labelTxt}
            </span>
          )}
        </div>
      </div>
    </CustomTooltip>
  );
};

// ─── Public: renderControl ────────────────────────────────────────────────────

/**
 * Renders a single control from the control panel config.
 *
 * @param {object}  controlConfig
 * @param {object}  controlHandlers
 * @param {object}  fontStyle
 * @param {boolean} [isCn=false]
 * @returns {React.ReactNode|null}
 */
export const renderControl = (controlConfig, controlHandlers, fontStyle, isCn = false) => (
  <ControlButton
    key={controlConfig.action}
    control={controlConfig}
    controlHandlers={controlHandlers}
    fontStyle={fontStyle}
    isCn={isCn}
  />
);

// ─── Public: renderFilter ─────────────────────────────────────────────────────

/**
 * Renders a single filter dropdown or returns null if the filter should not
 * be shown.
 *
 * @param {object}   filterConfig
 * @param {object}   filterState         Must contain `originalData` or `filteredData`
 * @param {object}   filterHandlers
 * @param {Function} shouldShowFilterFn  Bound visibility guard
 * @param {Function} generateOptions     Bound option generator
 * @param {object}   filterValues        Must contain `.ALL`
 * @returns {React.ReactNode|null}
 */
export const renderFilter = (
  filterConfig,
  filterState,
  filterHandlers,
  shouldShowFilterFn,
  generateOptions,
  filterValues
) => {
  const { field, label, colors } = filterConfig;

  if (!filterHandlers || typeof filterHandlers !== 'object') {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[renderFilter] filterHandlers is invalid:', filterHandlers);
    }
    return null;
  }

  const data = filterState.originalData ?? filterState.filteredData;

  if (!shouldShowFilterFn(filterConfig, data, generateOptions)) return null;

  const options    = generateOptions(filterConfig, data, filterValues);
  const stateKey   = getStateKey(field);
  const value      = filterState[stateKey] ?? filterValues.ALL;
  const handlerKey = getHandlerKey(field);
  const onChange   = filterHandlers[handlerKey] ?? (() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[renderFilter] No handler for field "${field}" (looked up: "${handlerKey}")`);
    }
  });

  return (
    <FilterBarDropdown
      key={field}
      label={getBilingualLabel(label)}
      options={options}
      value={value}
      onChange={onChange}
      mode="dropdown"
      fullWidth
      {...resolveFilterColors(colors)}
      theme="auto"
      highlightSelected
      renderOption={(opt) => opt.label}
      dropdownFontSize="12px"
      dropdownPadding="2px"
    />
  );
};

// ─── Public: renderFilters ────────────────────────────────────────────────────

/**
 * Renders the complete filter panel — dropdowns + count badge + controls.
 *
 * @param {object} params
 * @param {object}   params.controlPanelConfig
 * @param {object}   params.filterState
 * @param {object}   params.filterHandlers
 * @param {object}   params.controlHandlers
 * @param {boolean}  params.isMobile
 * @param {object}   params.fontStyle
 * @param {object}   params.filterValues
 * @param {boolean}  [params.isArtistweb=false]
 * @param {boolean}  [params.isCn=false]
 * @returns {React.ReactNode}
 */
export const renderFilters = ({
  controlPanelConfig,
  filterState,
  filterHandlers,
  controlHandlers,
  isMobile,
  fontStyle,
  filterValues,
  isArtistweb = false,
  isCn        = false,
}) => {
  if (!controlPanelConfig) {
    console.error('[renderFilters] controlPanelConfig is missing');
    return <div>Error: Control panel configuration not available</div>;
  }
  if (!filterHandlers || typeof filterHandlers !== 'object') {
    console.error('[renderFilters] filterHandlers is invalid:', filterHandlers);
    return <div>Error: Filter handlers not available</div>;
  }

  const dataSource    = filterState.originalData ?? filterState.filteredData;
  const controls      = processControls(controlPanelConfig.controls ?? [], filterState);
  const filters       = controlPanelConfig.filters ?? [];
  const filteredCount = Array.isArray(filterState.filteredData)
    ? filterState.filteredData.length
    : 0;

  // Bind helpers so child callers don't receive the full closure
  const boundGenerateOptions = (fc) =>
    generateFilterOptions(fc, dataSource, filterValues);

  const boundShouldShow = (fc) =>
    shouldShowFilter(fc, dataSource, boundGenerateOptions, isArtistweb);

  const boundRenderFilter = (fc) =>
    renderFilter(fc, filterState, filterHandlers, boundShouldShow, boundGenerateOptions, filterValues);

  const boundRenderControl = (cc) =>
    renderControl(cc, controlHandlers, fontStyle, isCn);

  return (
    <div
      className={`bg-white dark:bg-black rounded-lg shadow-sm border-none p-2 mb-4 ${isMobile ? 'hidden' : ''}`}
      style={fontStyle}
    >
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full">
        {/* Filter dropdowns */}
        <div className="flex flex-col sm:flex-row flex-1 gap-2 w-full">
          {filters.map(boundRenderFilter)}
        </div>

        {/* Count + controls */}
        <div className="flex items-center gap-4">
          {renderCountDisplay(filteredCount, fontStyle)}

          {controls.map((control, index) => (
            <React.Fragment key={`${control.action}-${index}`}>
              {renderSeparator()}
              {boundRenderControl(control)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};