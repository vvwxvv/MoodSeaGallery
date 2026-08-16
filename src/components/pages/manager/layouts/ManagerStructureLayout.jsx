"use client";

import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// ─── Contexts ──────────────────────────────────────────────────────────────
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";

// ─── Hooks ─────────────────────────────────────────────────────────────────
import useFont from "@/hooks/useFont";
import useData from "@/hooks/useData";
import useDeleteItem from "@/hooks/useDeleteItem";
import useDataExport from "@/hooks/useDataExport";
import useDebounce from "@/hooks/useDebounce";
import useDeleteDialog from "@/hooks/useDeleteDialog";
import { useSnackbarNotification } from "@/hooks/useSnackbarNotification";

// ─── Utils ─────────────────────────────────────────────────────────────────
import { createFilterHandlersWithReset } from "@/utils/filterHandlers";
import { groupData } from "@/utils/groupData";
import { getSystemLabel } from "@/components/labels/system_labels";
import {
  filterByAlphabetLetter,
  ALPHABET_FILTER_VALUES,
} from "@/utils/alphabetPaginationUtils";
import { getNumericOrder } from "@/utils/getNumericOrder";
import { renderFilters } from "@/utils/filterRenderers";
import { triggerDataRefresh } from "@/utils/dataRefresh";

// ─── Components ────────────────────────────────────────────────────────────
import AddButton from "@/components/buttons/AddButton";
import ViewModeToggle from "@/components/buttons/ViewModeToggle";
import ButtonRow from "@/components/buttons/ButtonRow";
import AlertInfo from "@/components/alerts/AlertInfo";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import ManagerCard from "@/components/pages/manager/components/ManagerCard";
import GridViewLayout from "@/components/layouts/GridViewLayout";
import ListWithExpandInfo from "@/components/lists/ListWithExpandInfo";
import AppSnackbar from "@/components/ui/Snackbar";
import AlphabetPaginationBar from "@/components/navs/AlphabetPaginationBar";
import AccordionBox from "@/components/others/AccordionBox";
import DeleteDialog from "@/components/popups/DeleteDialog";
import { useQuery, useQueryClient } from '@tanstack/react-query';
// ─────────────────────────────────────────────────────────────────────────────
// Constants (single source of truth for theme tokens, timing & layout)
// ─────────────────────────────────────────────────────────────────────────────

/** CSS-variable-backed colors (fallbacks preserved from the original UI). */
const COLORS = {
  pageBg: "var(--background-primary, #ffffff)",
  pageText: "var(--text-primary, #000000)",
  surfaceBg: "var(--background, #ffffff)",
  surfaceText: "var(--foreground, #000000)",
  surfaceBorder: "var(--border-color, #e5e7eb)",
};

/** Colors passed to AccordionBox / group cards. */
const SURFACE_COLORS = {
  background: COLORS.surfaceBg,
  text: COLORS.surfaceText,
  border: COLORS.surfaceBorder,
};

const TIMING = {
  DEFAULT_DEBOUNCE_MS: 300,
  SNACKBAR_AUTOHIDE_MS: 4000,
};

const LAYOUT = {
  CONTROLS_TOP_OVERLAP: "-35px",
  SURFACE_RADIUS: "12px",
  SECTION_GAP: "16px",
  CARD_MAX_HEIGHT: 800,
};

const SNACKBAR_ANCHOR = { vertical: "bottom", horizontal: "center" };

/** Exported style map — consumed by this component and external callers. */
const STYLES = {
  PAGE_CONTAINER: {
    p: { xs: 1, sm: 2, md: 3 },
    minHeight: "100vh",
    boxSizing: "border-box",
    mt: "270px",
  },
  PAGE_CONTAINER_MOBILE: {
    p: { xs: 1, sm: 2, md: 3 },
    minHeight: "100vh",
    boxSizing: "border-box",
    mt: "80px",
  },
  CONTAINER: {
    px: { xs: 0.5, sm: 2 },
    width: "100%",
  },
  HEADER: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  COUNT_DISPLAY: {
    fontWeight: 500,
    fontSize: "1rem",
    marginLeft: 16,
  },
  DIVIDER: {
    width: "100%",
    borderBottom: "2px solid",
    marginBottom: "1.5rem",
  },
  TITLE: {
    fontSize: "24px",
    fontWeight: "bold",
    color: COLORS.pageText,
    margin: 0,
    letterSpacing: "2px",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers (no React state — kept at module scope)
// ─────────────────────────────────────────────────────────────────────────────

/** Resolves a bilingual text object to the current language string. */
const pickLang = (obj, lang) => obj?.[lang] ?? obj?.EN ?? "";

/** Ensures every item carries a consistent `id` / `_id` pair. */
const normalizeId = (item) => {
  if (!item) return item;
  const resolvedId = item.id || item._id;
  return { ...item, id: resolvedId, _id: resolvedId };
};

/**
 * Sort items with support for a numeric `order` field.
 * @param {Array} items
 * @param {string|null} field
 * @param {'asc'|'desc'} direction
 * @returns {Array} sorted copy
 */
function sortItems(items, field, direction = "asc") {
  if (!field) return items;

  return [...items].sort((a, b) => {
    let aVal;
    let bVal;

    if (field === "order") {
      aVal = getNumericOrder(a);
      bVal = getNumericOrder(b);
    } else {
      aVal = a[field] ?? "";
      bVal = b[field] ?? "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

/** Renders the labelled detail fields shown inside the delete dialog. */
function renderItemDetails({ item, fontStyle, isCn, fields = [], defaultFields = null }) {
  if (!item) {
    return (
      <div style={{ ...fontStyle, lineHeight: 1.7 }}>
        {getSystemLabel("loading", isCn)}
      </div>
    );
  }

  const fallbackDefaultFields = defaultFields || [
    { key: "title", label: getSystemLabel("title", isCn) },
    { key: "type", label: getSystemLabel("type", isCn) },
    { key: "year", label: getSystemLabel("year", isCn) },
    { key: "series", label: getSystemLabel("series", isCn) },
    { key: "caption", label: getSystemLabel("caption", isCn) },
  ];

  const fieldsToShow = fields.length > 0 ? fields : fallbackDefaultFields;

  return (
    <div style={{ ...fontStyle, lineHeight: 1.7 }}>
      {fieldsToShow.map((field) => {
        const value = item[field.key];
        if (!value && value !== 0) return null;
        return (
          <div key={field.key}>
            <b>{field.label}:</b> {value || "N/A"}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Local sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Delete confirmation dialog with default content + optional data refresh. */
function DeleteDialogWrapper({
  open,
  item,
  onClose,
  onConfirm,
  loading,
  title,
  content,
  confirmText,
  cancelText,
  fontStyle,
  isCn,
  fields = [],
  itemName = "item",
  schemaName = null,
  triggerRefresh = true,
  defaultFields = null,
}) {
  const handleConfirm = async () => {
    await onConfirm();
    if (triggerRefresh && schemaName) {
      triggerDataRefresh(schemaName);
    }
  };

  const renderContent = () => {
    if (content) return content;

    const defaultContent = getSystemLabel("delete_dialog_text", isCn).replace(
      "{itemName}",
      itemName
    );

    return (
      <div style={{ fontFamily: fontStyle?.fontFamily }}>
        <p style={{ marginBottom: "1rem", fontWeight: 500 }}>{defaultContent}</p>
        {renderItemDetails({ item, fontStyle, isCn, fields, defaultFields })}
      </div>
    );
  };

  return (
    <DeleteDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      loading={loading}
      title={title}
      content={renderContent()}
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );
}

/** Search input + optional single-select dropdown. */
function SearchAndSelectPanel({
  searchTerm = "",
  onSearchChange,
  placeholder = "Search...",
  ariaLabelSearch = "Search",
  options = [],
  selectedOption = "all",
  onOptionChange,
  optionPlaceholder = "Select an option",
  ariaLabelSelect = "Select option",
  fontStyle = {},
}) {
  const inputStyle = { ...fontStyle, fontSize: "14px" };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Search box */}
      <div className="w-full sm:max-w-md">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 h-[40px] border border-black dark:border-white rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white outline-none transition-colors text-sm bg-white dark:bg-black text-black dark:text-white"
            style={inputStyle}
            aria-label={ariaLabelSearch}
          />
        </div>
      </div>

      {/* Select dropdown */}
      {options.length > 0 && (
        <div className="w-full sm:w-auto">
          <select
            value={selectedOption}
            onChange={(e) => onOptionChange?.(e.target.value)}
            className="w-full sm:w-auto h-[40px] px-3 border border-black dark:border-white rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white outline-none transition-colors text-sm bg-white dark:bg-black text-black dark:text-white cursor-pointer"
            style={inputStyle}
            aria-label={ariaLabelSelect}
          >
            <option value="all">{optionPlaceholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

/**
 * FilterPanel — wraps renderFilters and resets all filters when the language
 * changes, using the original setters for a direct reset.
 */
function FilterPanel(props) {
  const {
    filterHandlers,
    originalSetters = {},
    filterValues = { ALL: "all" },
    ...renderFiltersProps
  } = props;

  const safeFilterHandlers = useMemo(() => filterHandlers || {}, [filterHandlers]);
  const memoizedOriginalSetters = useMemo(() => originalSetters, [originalSetters]);

  const languageContext = useContext(LanguageContext);
  const { onLanguageChange } = languageContext || {};

  const handleLanguageChange = useCallback(() => {
    const defaultValue = filterValues.ALL !== undefined ? filterValues.ALL : "all";
    Object.values(memoizedOriginalSetters).forEach((setter) => {
      if (typeof setter === "function") setter(defaultValue);
    });
  }, [memoizedOriginalSetters, filterValues.ALL]);

  useEffect(() => {
    if (typeof onLanguageChange !== "function") return undefined;
    return onLanguageChange(handleLanguageChange);
  }, [onLanguageChange, handleLanguageChange]);

  return renderFilters({
    ...renderFiltersProps,
    filterHandlers: safeFilterHandlers,
    filterValues,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {{ managerSchemaConfig: import("@/types/schemaConfig").SchemaConfig }} props
 */
export default function ManagerStructureLayout({ managerSchemaConfig }) {
  // ── Contexts ───────────────────────────────────────────────────────────────
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const router = useRouter();
  const { style: fontStyle } = useFont();

  const lang = isCn ? "CN" : "EN";
  const t = useCallback((obj) => pickLang(obj, lang), [lang]);

  // ── Guard: schema config is required ──────────────────────────────────────
  if (!managerSchemaConfig) {
    console.warn("ManagerStructureLayout: managerSchemaConfig missing or invalid");
    return null;
  }

  // ── Schema config ─────────────────────────────────────────────────────────
  const {
    title,
    schemaName,
    navigation,
    dataConfig,
    filterConfig,
    exportConfig,
    uiConfig,
    labels,
    components = {},
  } = managerSchemaConfig;

  const { filterFields = [], values: FILTER_VALUES } = filterConfig || {};
  const { pageText, itemName } = labels;
  const { viewModes } = uiConfig;
  const { actionButtons, searchConfig } = components;
  const defaultSort = dataConfig.defaultSort || null;

  // ── State ─────────────────────────────────────────────────────────────────
  const [sortField, setSortField] = useState(defaultSort?.field || null);
  const [sortDirection, setSortDirection] = useState(defaultSort?.direction || "asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(ALPHABET_FILTER_VALUES.ALL);
  const [viewMode, setViewMode] = useState(uiConfig.defaultViewMode ?? viewModes.GRID);
  const [deleteError, setDeleteError] = useState(null);

  const initialFilterState = useMemo(
    () =>
      Object.fromEntries(
        (filterFields || []).map((f) => [f.key, FILTER_VALUES?.ALL || "all"])
      ),
    [filterFields, FILTER_VALUES]
  );
  const [filterState, setFilterState] = useState(initialFilterState);

  const debouncedSearch = useDebounce(
    searchTerm,
    uiConfig.debounceDelay ?? TIMING.DEFAULT_DEBOUNCE_MS
  );

  // ── Derived config ────────────────────────────────────────────────────────
  const fields = useMemo(() => dataConfig.getFields(lang), [lang, dataConfig]);
  const deleteDialogFields = useMemo(
    () => dataConfig.getDeleteDialogFields(lang),
    [lang, dataConfig]
  );
  const controlPanelConfig = useMemo(
    () => filterConfig?.createControlPanelConfig(isCn),
    [isCn, filterConfig]
  );

  const themeStyles = useMemo(
    () => ({
      ...STYLES,
      COUNT_DISPLAY: { ...STYLES.COUNT_DISPLAY, color: COLORS.pageText },
      DIVIDER: { ...STYLES.DIVIDER, borderBottomColor: COLORS.pageText },
      LIST_CONTAINER: {},
    }),
    []
  );

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetAllFilters = useCallback(() => {
    setFilterState(initialFilterState);
    setSearchTerm("");
    setSelectedLetter(ALPHABET_FILTER_VALUES.ALL);
    setSortField(defaultSort?.field || null);
    setSortDirection(defaultSort?.direction || "asc");
  }, [initialFilterState, defaultSort]);

  // ── Data fetching ─────────────────────────────────────────────────────────
  const {
    data: rawData = [],
    isLoading,
    error,
    refetch,
  } = useData(managerSchemaConfig.api.endpoint);

  const safeData = useMemo(() => (Array.isArray(rawData) ? rawData : []), [rawData]);

  // ── Delete ────────────────────────────────────────────────────────────────
  const { deleteItem, loadingId } = useDeleteItem(
    () => {
      refetch?.();
      resetAllFilters();
    },
    setDeleteError,
    managerSchemaConfig.api.deleteEndpoint,
    { itemUrl: managerSchemaConfig.api.listEndpoint }
  );

  const {
    openDialogItem,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
  } = useDeleteDialog(deleteItem, null, schemaName);

  const handleDeleteConfirmWithRefresh = useCallback(async () => {
    try {
      await handleDeleteConfirm();
    } catch {
      // Errors surfaced via deleteError state
    }
  }, [handleDeleteConfirm]);

  // ── Export / Notifications ────────────────────────────────────────────────
  const { handleExport } = useDataExport();
  const { snackbar, showNotification, hideNotification } = useSnackbarNotification();

  // ── Filter setters ────────────────────────────────────────────────────────
  const setFilter = useCallback(
    (key, value) => setFilterState((prev) => ({ ...prev, [key]: value })),
    []
  );

  const filterSetters = useMemo(
    () =>
      Object.fromEntries(
        (filterFields || []).map((f) => {
          const capitalized = f.key.charAt(0).toUpperCase() + f.key.slice(1);
          return [`setSelected${capitalized}`, (val) => setFilter(f.key, val)];
        })
      ),
    [filterFields, setFilter]
  );

  // ── Data pipeline: language → search → alphabet → filters → sort ──────────

  const languageFilteredData = useMemo(() => {
    if (!dataConfig.languageField) return safeData;

    const languageValue = isCn ? "CN" : "EN";
    return safeData.filter((item) => {
      const itemLanguage = item[dataConfig.languageField];
      return !itemLanguage || itemLanguage === languageValue || itemLanguage === "";
    });
  }, [safeData, isCn, dataConfig.languageField]);

  const searchFilteredData = useMemo(() => {
    const term = debouncedSearch?.trim().toLowerCase();
    if (!term) return languageFilteredData;

    const searchFields = dataConfig.searchFields || [];
    return languageFilteredData.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (!value) return false;
        if (Array.isArray(value)) {
          return value.some((v) => String(v).toLowerCase().includes(term));
        }
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [languageFilteredData, debouncedSearch, dataConfig.searchFields]);

  const alphabetFilteredData = useMemo(() => {
    if (!dataConfig.alphabetFilterField) return searchFilteredData;
    return filterByAlphabetLetter(
      searchFilteredData,
      dataConfig.alphabetFilterField,
      selectedLetter
    );
  }, [searchFilteredData, selectedLetter, dataConfig.alphabetFilterField]);

  const filteredData = useMemo(() => {
    if (!filterConfig?.filterFields) return alphabetFilteredData;

    return alphabetFilteredData.filter((item) =>
      filterConfig.filterFields.every(({ key, fields: filterMatchFields }) => {
        const selectedValue = filterState[key];
        if (!selectedValue || selectedValue === FILTER_VALUES?.ALL) return true;

        return filterMatchFields.some((field) => {
          const itemValue = item[field];
          if (!itemValue) return false;
          if (Array.isArray(itemValue)) {
            return itemValue.some(
              (val) => String(val).toLowerCase() === selectedValue.toLowerCase()
            );
          }
          return String(itemValue).toLowerCase() === selectedValue.toLowerCase();
        });
      })
    );
  }, [alphabetFilteredData, filterState, filterConfig, FILTER_VALUES]);

  const processedData = useMemo(() => {
    const mapped = filteredData.map((item) => ({
      ...dataConfig.getEmptyItem(),
      ...item,
    }));
    return sortField ? sortItems(mapped, sortField, sortDirection) : mapped;
  }, [filteredData, sortField, sortDirection, dataConfig]);

  const normalizedProcessedData = useMemo(
    () => processedData.map(normalizeId),
    [processedData]
  );

  // ── Grouping ──────────────────────────────────────────────────────────────
  const groupedData = useMemo(() => {
    const groupConfig = dataConfig.groupConfig || managerSchemaConfig.groupConfig;
    if (!groupConfig?.enabled) return null;

    const applyTo = groupConfig.applyTo || ["grid", "list"];
    if (!applyTo.includes(viewMode)) return null;

    return groupData(normalizedProcessedData, groupConfig, {
      isCn,
      t,
      managerSchemaConfig,
    });
  }, [normalizedProcessedData, dataConfig, managerSchemaConfig, viewMode, isCn, t]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearchChange = useCallback((eventOrValue) => {
    if (typeof eventOrValue === "string") return setSearchTerm(eventOrValue);
    return setSearchTerm(eventOrValue?.target?.value ?? "");
  }, []);

  const handleLetterChange = useCallback((l) => setSelectedLetter(l), []);
  const handleViewModeChange = useCallback((mode) => setViewMode(mode), []);
  const handleRetry = useCallback(() => refetch?.(), [refetch]);

  const handleEditClick = useCallback(
    (id) => router.push(navigation.editPathTemplate.replace("{id}", id)),
    [router, navigation.editPathTemplate]
  );

  const handleExportClick = useCallback(() => {
    try {
      const formatted = exportConfig.formatter(processedData, isCn);
      const filename = isCn ? exportConfig.filename.CN : exportConfig.filename.EN;
      handleExport(formatted, "csv", filename);
      showNotification(
        `${t(pageText.export.success)} — ${processedData.length} ${t(pageText.export.items)}`,
        "success"
      );
    } catch {
      showNotification(t(pageText.export.error), "error");
    }
  }, [exportConfig, processedData, isCn, handleExport, showNotification, t, pageText]);

  const handleSortByField = useCallback(
    (field) => {
      if (sortField === field) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField]
  );

  // ── Prefetch create page ──────────────────────────────────────────────────
  useEffect(() => {
    if (navigation?.createPath) router.prefetch(navigation.createPath);
  }, [navigation?.createPath, router]);

  const handleCreateClick = useCallback(() => {
    router.push(navigation.createPath);
  }, [router, navigation.createPath]);

  // ── Control-panel derived state ───────────────────────────────────────────
  const filterStateForPanel = useMemo(() => {
    const prefixed = Object.fromEntries(
      Object.entries(filterState).map(([key, val]) => [
        `selected${key.charAt(0).toUpperCase() + key.slice(1)}`,
        val,
      ])
    );
    return { filteredData, ...prefixed };
  }, [filterState, filteredData]);

  const filterHandlers = useMemo(
    () => createFilterHandlersWithReset(filterSetters, FILTER_VALUES),
    [filterSetters, FILTER_VALUES]
  );

  const controlHandlers = useMemo(() => {
    const handlers = {};
    controlPanelConfig?.controls?.forEach((control) => {
      if (control.action === "sortByField" && control.sortField) {
        handlers.sortByField = (controlConfig) => {
          const field = controlConfig?.sortField || control.sortField;
          handleSortByField(field);
        };
      }
    });
    return handlers;
  }, [handleSortByField, controlPanelConfig]);

  const translatedControlPanelConfig = useMemo(() => {
    if (!controlPanelConfig) return null;
    return {
      ...controlPanelConfig,
      filters: controlPanelConfig.filters?.map((filter) => ({
        ...filter,
        label: typeof filter.label === "object" ? t(filter.label) : filter.label,
      })),
      controls: controlPanelConfig.controls?.map((control) => ({
        ...control,
        label: typeof control.label === "object" ? t(control.label) : control.label,
        tooltip: typeof control.tooltip === "object" ? t(control.tooltip) : control.tooltip,
      })),
    };
  }, [controlPanelConfig, t]);

  // ── Group helpers ─────────────────────────────────────────────────────────
  const getGroupItems = (group) => {
    if (!group) return [];
    if (Array.isArray(group)) return group;
    if (Array.isArray(group.items)) return group.items;
    if (Array.isArray(group.data)) return group.data;
    if (Array.isArray(group.children)) return group.children;
    return [];
  };

  const getGroupLabel = (group, fallbackIndex) => {
    if (!group) return `Group ${fallbackIndex + 1}`;
    return (
      group.label ||
      group.title ||
      group.groupLabel ||
      group.groupName ||
      group.key ||
      `Group ${fallbackIndex + 1}`
    );
  };

  // ── Render helpers ────────────────────────────────────────────────────────
  const renderEmptyState = (isSearch = false) => (
    <AlertInfo
      isCn={isCn}
      message={
        isSearch
          ? t(pageText.emptyState.noMatchingItems)
          : t(pageText.emptyState.noData)
      }
      subMessage=""
    />
  );

  const renderGroupSummary = (group, index) => {
    const count = getGroupItems(group).length;
    const label = getGroupLabel(group, index);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          ...fontStyle,
        }}
      >
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: "13px", opacity: 0.8, whiteSpace: "nowrap" }}>
          {count} {count === 1 ? t(itemName) : `${t(itemName)}s`}
        </span>
      </div>
    );
  };

  const renderGridItems = (items) => {
    const normalizedData = (items || []).map(normalizeId);
    return (
      <GridViewLayout
        data={normalizedData}
        Component={ManagerCard}
        componentProps={{
          fields,
          titleField: dataConfig.titleField,
          fieldDisplayConfig: dataConfig.fieldDisplayConfig,
          isCn,
          style: fontStyle,
          onEdit: (idOrItem) => {
            const id =
              typeof idOrItem === "string" ? idOrItem : idOrItem?.id || idOrItem?._id;
            if (id) handleEditClick(id);
          },
          onDelete: (item) => handleDeleteClick(normalizeId(item)),
          showActions: true,
          useOriginalSize: uiConfig.useOriginalSize ?? false,
          customHeight: uiConfig.customHeight ?? null,
          customWidth: uiConfig.customWidth ?? null,
          maxHeight: uiConfig.maxHeight ?? LAYOUT.CARD_MAX_HEIGHT,
          minHeight: uiConfig.minHeight ?? 0,
          objectFit: uiConfig.objectFit ?? "cover",
        }}
        style={fontStyle}
      />
    );
  };

  const renderListItems = (items) => {
    const summaryFieldsConfig = (dataConfig.fieldDisplayConfig?.summaryFields || []).map(
      (fieldKey) => fields.find((f) => f.key === fieldKey) || { key: fieldKey, label: fieldKey }
    );
    const detailFieldsConfig = (dataConfig.fieldDisplayConfig?.detailFields || []).map(
      (fieldKey) => fields.find((f) => f.key === fieldKey) || { key: fieldKey, label: fieldKey }
    );

    const normalizedData = (items || []).map(normalizeId).sort((a, b) => {
      const aOrder = a.order;
      const bOrder = b.order;
      if (aOrder == null && bOrder == null) return 0;
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      return String(aOrder).localeCompare(String(bOrder), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    return (
      <div style={themeStyles.LIST_CONTAINER}>
        {normalizedData.map((item) => (
          <ListWithExpandInfo
            key={item.id}
            item={item}
            fields={fields}
            titleKey={dataConfig.titleField}
            subtitleKey={dataConfig.descriptionField}
            imageKey={dataConfig.imageField}
            videoKey={dataConfig.videoField}
            summaryFields={summaryFieldsConfig}
            detailFields={detailFieldsConfig}
            onEdit={() => handleEditClick(item.id)}
            onDelete={() => handleDeleteClick(item)}
            loadingId={loadingId}
            isCn={isCn}
            manager
          />
        ))}
      </div>
    );
  };

  const renderGroupContent = (groupItems) =>
    viewMode === viewModes.GRID
      ? renderGridItems(groupItems)
      : renderListItems(groupItems);

  const renderGroupedContent = () => {
    if (!groupedData) return null;

    let groups = [];
    if (Array.isArray(groupedData)) {
      groups = groupedData;
    } else if (Array.isArray(groupedData.groups)) {
      groups = groupedData.groups;
    } else if (typeof groupedData === "object") {
      groups = Object.entries(groupedData).map(([key, value]) => ({
        key,
        label: key,
        items: Array.isArray(value) ? value : [],
      }));
    }

    if (!groups.length) return renderEmptyState(!!searchTerm);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: LAYOUT.SECTION_GAP }}>
        {groups.map((group, index) => {
          const groupItems = getGroupItems(group);
          const groupKey = group?.key || group?.label || group?.title || `group-${index}`;
          const content = renderGroupContent(groupItems);

          // First group renders open (static card); the rest are collapsible.
          if (index === 0) {
            return (
              <div
                key={groupKey}
                style={{
                  border: `1px solid ${SURFACE_COLORS.border}`,
                  borderRadius: LAYOUT.SURFACE_RADIUS,
                  background: SURFACE_COLORS.background,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${SURFACE_COLORS.border}`,
                    fontWeight: 600,
                    color: SURFACE_COLORS.text,
                  }}
                >
                  {renderGroupSummary(group, index)}
                </div>
                <div style={{ padding: LAYOUT.SECTION_GAP }}>{content}</div>
              </div>
            );
          }

          return (
            <AccordionBox
              key={groupKey}
              summary_text={renderGroupSummary(group, index)}
              colors={SURFACE_COLORS}
              defaultOpen={false}
              content={content}
            />
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) return <LoadingAnimation isLoading />;

    if (error) {
      return (
        <AlertInfo
          message={t(pageText.errors.loadingError)}
          subMessage={t(pageText.errors.systemError)}
          buttonText={t(pageText.errors.tryAgain)}
          onBack={handleRetry}
          isCn={isCn}
        />
      );
    }

    if (deleteError) {
      return (
        <AlertInfo
          message={deleteError}
          subMessage={t(pageText.errors.pleaseRetry)}
          buttonText={t(pageText.errors.ok)}
          messageCn={deleteError}
          subMessageCn={pageText.errors.pleaseRetry?.CN}
          buttonTextCn={pageText.errors.ok?.CN}
          onBack={() => setDeleteError(null)}
          isCn={isCn}
        />
      );
    }

    if (safeData.length === 0) return renderEmptyState(false);
    if (processedData.length === 0) return renderEmptyState(!!searchTerm);
    if (groupedData) return renderGroupedContent();

    return viewMode === viewModes.GRID
      ? renderGridItems(normalizedProcessedData)
      : renderListItems(normalizedProcessedData);
  };

  const renderActionButtons = () => {
    if (!actionButtons?.length) return null;

    const buttons = actionButtons.map((btn) => {
      const button = { ...btn, style: fontStyle };
      if (btn.action === "export") {
        button.onClick = handleExportClick;
        button.label = getSystemLabel(btn.labelKey || "exportData", isCn);
      } else if (btn.route) {
        button.label = getSystemLabel(btn.labelKey, isCn);
      }
      return button;
    });

    return <ButtonRow buttons={buttons} style={fontStyle} />;
  };

  const renderSearchPanel = () => {
    if (!searchConfig) return null;

    const { placeholder, ariaLabel, selectConfig } = searchConfig;
    let selectOptions = [];
    let selectedValue = "all";
    let onSelectChange = null;

    if (selectConfig) {
      const filterKey = selectConfig.filterKey;
      selectOptions = [
        ...new Set(
          safeData
            .map((item) => item[filterKey])
            .filter((val) => val && String(val).trim() !== "")
        ),
      ].sort();
      selectedValue = filterState[filterKey] || "all";
      onSelectChange = (value) => {
        const setter = filterSetters[filterKey];
        if (setter) setter(value === "all" ? "all" : value);
      };
    }

    return (
      <SearchAndSelectPanel
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder={t(placeholder)}
        ariaLabelSearch={t(ariaLabel)}
        options={selectConfig ? selectOptions : []}
        selectedOption={selectedValue}
        onOptionChange={onSelectChange}
        optionPlaceholder={selectConfig ? t(selectConfig.placeholder) : ""}
        ariaLabelSelect={selectConfig ? t(selectConfig.ariaLabel) : ""}
        fontStyle={fontStyle}
      />
    );
  };

  const renderFilterPanel = () => {
    if (isMobile) return null;
    return (
      <FilterPanel
        controlPanelConfig={translatedControlPanelConfig}
        filterState={filterStateForPanel}
        filterHandlers={filterHandlers}
        originalSetters={filterSetters}
        controlHandlers={controlHandlers}
        isCn={isCn}
        isMobile={isMobile}
        fontStyle={fontStyle}
        filterValues={FILTER_VALUES}
        isArtistweb={uiConfig.isArtistweb ?? false}
      />
    );
  };

  const renderControlsAccordion = () => {
    const hasActionButtons = actionButtons?.length > 0;
    const hasSearchPanel = searchConfig != null;
    const hasFilterPanel = !isMobile;
    const hasAlphabetBar = safeData.length > 0 && !!dataConfig.alphabetFilterField;

    if (!hasActionButtons && !hasSearchPanel && !hasFilterPanel && !hasAlphabetBar) {
      return null;
    }

    return (
      <Box sx={{ marginBottom: 2, marginTop: LAYOUT.CONTROLS_TOP_OVERLAP }}>
        <AccordionBox
          summary_text=""
          colors={SURFACE_COLORS}
          defaultOpen={false}
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: LAYOUT.SECTION_GAP }}>
              {hasActionButtons && renderActionButtons()}
              {hasSearchPanel && renderSearchPanel()}
              {hasFilterPanel && (
                <>
                  {renderFilterPanel()}
                  <div style={themeStyles.DIVIDER} />
                </>
              )}
              {hasAlphabetBar && (
                <AlphabetPaginationBar
                  data={safeData}
                  field={dataConfig.alphabetFilterField}
                  selectedLetter={selectedLetter}
                  onLetterChange={handleLetterChange}
                  isCn={isCn}
                  showCounts
                />
              )}
            </div>
          }
        />
      </Box>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const dialogItemId = openDialogItem?.id || openDialogItem?._id;

  return (
    <Box
      sx={{
        backgroundColor: COLORS.pageBg,
        color: COLORS.pageText,
        padding: isMobile ? "20px" : "0px",
      }}
    >
      <Container maxWidth="lg" sx={themeStyles.CONTAINER}>
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div style={{ ...STYLES.TITLE, ...fontStyle }}>{title}</div>
          <div className="flex items-center gap-2">
            <AddButton
              onClick={handleCreateClick}
              tooltipTitle={t(pageText.createTooltip)}
              fontStyle={fontStyle}
            />
            <span className="mx-2" style={{ color: COLORS.pageText }}>
              |
            </span>
            <ViewModeToggle
              viewMode={viewMode}
              setViewMode={handleViewModeChange}
              fontStyle={fontStyle}
            />
          </div>
        </div>

        <div style={themeStyles.DIVIDER} />

        {renderControlsAccordion()}
        {renderContent()}

        <DeleteDialogWrapper
          open={openDialogItem !== null}
          item={openDialogItem ? normalizeId(openDialogItem) : null}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirmWithRefresh}
          loading={loadingId === dialogItemId}
          title={t(pageText.deleteDialog.title)}
          confirmText={t(pageText.deleteDialog.confirm)}
          cancelText={t(pageText.deleteDialog.cancel)}
          fontStyle={fontStyle}
          isCn={isCn}
          fields={deleteDialogFields}
          itemName={t(itemName)}
          schemaName={schemaName}
          triggerRefresh
        />

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={hideNotification}
          autoHideDuration={TIMING.SNACKBAR_AUTOHIDE_MS}
          anchorOrigin={SNACKBAR_ANCHOR}
        />
      </Container>
    </Box>
  );
}

export { STYLES };