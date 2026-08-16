import React, { useContext, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { useFieldArray } from 'react-hook-form';

import { LanguageContext } from '@/components/contexts/LanguageContext';
import { getSystemLabel } from '@/components/labels/system_labels';
import useFont from '@/hooks/useFont';

import FormTextField from '@/components/forms/fields/FormTextField';
import ArrayManager from '@/components/forms/managers/ArrayManager';
import ObjectArrayManager from '@/components/forms/managers/ObjectArrayManager';

const TabbedFormManager = ({
  form,
  schema = [],
  getLabelFunc,
  onFieldChange,
  colors = {},
  disabled = false,
  customRenderers = {},
}) => {
  const { isCn } = useContext(LanguageContext);
  const { inputFontFamily, labelFontFamily } = useFont();
  const [activeTab, setActiveTab] = useState('0');

  const arrayFieldNames = useMemo(() => {
    return schema
      .filter(
        (tab) =>
          (tab.type === 'array' || tab.type === 'object-array') && tab.fieldName
      )
      .map((tab) => tab.fieldName);
  }, [schema]);

  const fieldArraysData = {};
  arrayFieldNames.forEach((fieldName) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fieldArraysData[fieldName] = useFieldArray({
      control: form.control,
      name: fieldName,
    });
  });

  const getLabel = (key, labelObj) => {
    if (getLabelFunc) return getLabelFunc(key);
    if (labelObj) return labelObj[isCn ? 'cn' : 'en'];
    return getSystemLabel(key, isCn);
  };

  const paletteColor = (key, fallback) => colors?.[key] || fallback;

  const inputStyles = useMemo(
    () => ({
      fontFamily: inputFontFamily,
      color: paletteColor('text') || undefined,
      backgroundColor: paletteColor('background') || undefined,
      borderColor: paletteColor('border') || undefined,
      borderRadius: '8px',
    }),
    [colors, inputFontFamily]
  );

  const renderFieldGroup = (fields) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {fields.map((meta) => (
        <FormTextField
          key={meta.name}
          name={meta.name}
          label={getLabel(meta.name, meta.label)}
          control={form.control}
          error={form.formState.errors[meta.name]}
          disabled={disabled}
          multiline={meta.type === 'multiline'}
          rows={meta.rows || 1}
          colors={colors}
          labelFontFamily={labelFontFamily}
          inputStyles={inputStyles}
          onChange={() => onFieldChange?.(meta.name)}
          placeholder={getLabel(meta.name, meta.label)}
        />
      ))}
    </div>
  );

  const renderArrayField = (tabConfig) => {
    const fieldArrayData = fieldArraysData[tabConfig.fieldName];
    if (!fieldArrayData) {
      console.error(`No field array data found for ${tabConfig.fieldName}`);
      return null;
    }
    const { fields, append, remove, replace } = fieldArrayData;
    // 直接使用 tabConfig.addLabel，若不存在则通过 getLabel 生成
    const addLabel = tabConfig.addLabel || getLabel(`add${tabConfig.fieldName}`);
    return (
      <ArrayManager
        fields={fields}
        append={append}
        remove={remove}
        register={form.register}
        control={form.control}
        errors={form.formState.errors}
        fieldName={tabConfig.fieldName}
        itemLabel={getLabel(tabConfig.fieldName, tabConfig.label)}
        addButtonLabel={addLabel}
        isSubmitting={disabled}
        rows={tabConfig.rows || 3}
        multiline={tabConfig.multiline || false}
        onChange={(index, value) =>
          onFieldChange?.(`${tabConfig.fieldName}[${index}]`, value)
        }
      />
    );
  };

  const renderObjectArrayField = (tabConfig) => {
    const fieldArrayData = fieldArraysData[tabConfig.fieldName];
    if (!fieldArrayData) {
      console.error(`No field array data found for ${tabConfig.fieldName}`);
      return null;
    }
    const { fields, append, remove, replace } = fieldArrayData;

    const resolvedSubFields = (tabConfig.subFields || []).map((f) => ({
      ...f,
      label: getLabel(f.name, f.label),
    }));

    const addLabel = tabConfig.addLabel || getLabel(`add${tabConfig.fieldName}`);

    return (
      <ObjectArrayManager
        fields={fields}
        append={append}
        remove={remove}
        replace={replace}
        control={form.control}
        errors={form.formState.errors}
        fieldName={tabConfig.fieldName}
        subFields={resolvedSubFields}
        getLabel={(key) => getLabel(key, tabConfig.subFieldLabels?.[key])}
        isSubmitting={disabled}
        addButtonLabel={addLabel}
        minItems={tabConfig.minItems || 0}
        maxItems={tabConfig.maxItems || null}
        allowJsonMode={tabConfig.allowJsonMode !== false}
        colors={colors}
        inputFontFamilyProp={inputFontFamily}
        labelFontFamilyProp={labelFontFamily}
      />
    );
  };

  const renderTabContent = (tabConfig) => {
    if (tabConfig.fields) {
      return renderFieldGroup(tabConfig.fields);
    }
    if (tabConfig.type === 'array') {
      return renderArrayField(tabConfig);
    }
    if (tabConfig.type === 'object-array') {
      return renderObjectArrayField(tabConfig);
    }
    if (tabConfig.type === 'custom' && customRenderers[tabConfig.renderKey]) {
      const renderer = customRenderers[tabConfig.renderKey];
      return typeof renderer === 'function' ? renderer() : renderer;
    }
    return null;
  };

  const tabItems = schema.map((tab, idx) => ({
    key: String(idx),
    label: getLabel(tab.key, tab.label),
    children: <div style={{ padding: '2px' }}>{renderTabContent(tab)}</div>,
  }));

  return (
    <div style={{ width: '100%' }}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={tabItems}
        tabBarGutter={24}
        style={{ fontFamily: labelFontFamily }}
      />
    </div>
  );
};

export default TabbedFormManager;