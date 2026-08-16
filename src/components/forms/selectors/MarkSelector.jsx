"use client";
import React, { useMemo, useCallback, useId } from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import useFont from '@/hooks/useFont';
import formMarksData from '@/data/form_marks.json';

const { Option } = Select;

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_VALUE = '';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const resolveLabel = (getLabel, key, isCn, fallbackEn, fallbackCn) => {
  if (getLabel) return getLabel(key, isCn);
  return isCn ? fallbackCn : fallbackEn;
};

const optionStyle = (colors, inputFontFamily) => ({
  color:           colors?.text       || '#2c2c2c',
  backgroundColor: colors?.background || '#fff',
  fontFamily:      inputFontFamily,
  minHeight:       '44px',
  display:         'flex',
  alignItems:      'center',
  padding:         '12px 16px',
});

// ─── FieldLabel ───────────────────────────────────────────────────────────────
const FieldLabel = ({ htmlFor, label, colors, labelFontFamily }) => (
  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <label
      htmlFor={htmlFor}
      className="form-label"
      style={{
        color:      colors?.text || '#2c2c2c',
        fontFamily: labelFontFamily,
        fontSize:   '14px',
        fontWeight: 500,
      }}
    >
      {label}
    </label>
    <span
      aria-hidden="true"
      style={{ color: colors?.text || '#2c2c2c', fontFamily: labelFontFamily, fontSize: '14px' }}
    >
      |
    </span>
  </div>
);

const ErrorMessage = ({ error, labelFontFamily }) =>
  error ? (
    <div
      role="alert"
      style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px', fontFamily: labelFontFamily }}
    >
      {error.message}
    </div>
  ) : null;

// ─── Direct JSON reader ───────────────────────────────────────────────────────
// Reads straight from form_marks.json — no formDataUtils dependency
const getMarksForEntity = (entityType, isCn) => {
  const marks = formMarksData[entityType] ?? [];
  return marks.map((m) => ({
    value: m.value,
    label: isCn ? m.label_cn : m.label_en,
  }));
};

// ─── MarkSelector ─────────────────────────────────────────────────────────────
const MarkSelector = ({
  form,
  entityType,
  value,
  onChange,
  disabled,
  getLabel,
  schemaName,
  onFieldChange,
  colors,
  isCn = false,
  name = 'mark',
  ...registerProps
}) => {
  const { inputFontFamily, labelFontFamily } = useFont();
  const autoId  = useId();
  const fieldId = `mark-selector-${autoId}`;

  const entityTypeToUse = entityType || schemaName || 'image';

  // ── Read directly from JSON, deduplicate ─────────────────────────────────
  const markOptions = useMemo(() => {
    const raw  = getMarksForEntity(entityTypeToUse, isCn);
    const seen = new Set();
    return raw.filter((opt) => {
      if (!opt.value?.trim()) return false;
      if (seen.has(opt.value)) return false;
      seen.add(opt.value);
      return true;
    });
  }, [entityTypeToUse, isCn]);

  const fieldLabel  = resolveLabel(getLabel, 'mark',            isCn, 'Mark',           '标记');
  const placeholder = resolveLabel(getLabel, 'markPlaceholder', isCn, 'Select mark...', '选择标记');

  const selectStyle = useMemo(() => ({
    width:           '100%',
    fontFamily:      inputFontFamily,
    color:           colors?.text       || '#2c2c2c',
    backgroundColor: colors?.background || '#fff',
    borderColor:     colors?.border     || '#d9d9d9',
    borderRadius:    '8px',
  }), [inputFontFamily, colors]);

  const sharedSelectProps = {
    id:               fieldId,
    placeholder,
    disabled,
    showSearch:       true,
    allowClear:       true,
    style:            selectStyle,
    getPopupContainer: (trigger) => trigger.parentElement,
    listHeight:       256,
    virtual:          true,
    onTouchEnd:       (e) => e.stopPropagation(),
    popupRender:      (menu) => (
      <div onTouchEnd={(e) => e.stopPropagation()}>{menu}</div>
    ),
  };

  const renderedOptions = useMemo(() => {
    const style = optionStyle(colors, inputFontFamily);
    return [
      <Option key="__placeholder__" value={EMPTY_VALUE} style={style}>
        <em>{isCn ? '选择标记' : 'Select mark'}</em>
      </Option>,
      ...markOptions.map((opt) => (
        <Option key={opt.value} value={opt.value} style={style}>
          {opt.label}
        </Option>
      )),
    ];
  }, [markOptions, colors, inputFontFamily, isCn]);

  const makeChangeHandler = useCallback(
    (fieldOnChange) => (val) => {
      fieldOnChange?.(val ?? EMPTY_VALUE);
      onFieldChange?.('mark');
    },
    [onFieldChange]
  );

  const Wrapper = ({ children, error }) => (
    <div style={{ marginBottom: '16px' }} onTouchEnd={(e) => e.stopPropagation()}>
      <FieldLabel
        htmlFor={fieldId}
        label={fieldLabel}
        colors={colors}
        labelFontFamily={labelFontFamily}
      />
      {children}
      <ErrorMessage error={error} labelFontFamily={labelFontFamily} />
    </div>
  );

  // ── With react-hook-form ──────────────────────────────────────────────────
  if (form) {
    return (
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Wrapper error={fieldState.error}>
            <Select
              {...sharedSelectProps}
              {...field}
              value={field.value || EMPTY_VALUE}
              onChange={makeChangeHandler(field.onChange)}
            >
              {renderedOptions}
            </Select>
          </Wrapper>
        )}
      />
    );
  }

  // ── Without react-hook-form ───────────────────────────────────────────────
  return (
    <Wrapper>
      <Select
        {...sharedSelectProps}
        {...registerProps}
        value={value || EMPTY_VALUE}
        onChange={makeChangeHandler(onChange)}
      >
        {renderedOptions}
      </Select>
    </Wrapper>
  );
};

export default MarkSelector;