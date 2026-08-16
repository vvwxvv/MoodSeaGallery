import React from 'react';
import { Select } from 'antd';
import { Controller } from "react-hook-form";
import useFont from '@/hooks/useFont';

const { Option } = Select;

const YearSelector = ({ 
  form,
  value, 
  onChange, 
  disabled, 
  getLabel, 
  onFieldChange,
  colors,
  startYear = 2006,
  endYear = new Date().getFullYear(),
  placeholder,
  isCn = false,
  allowCustomInput = true,
  ...registerProps 
}) => {
  const { style: labelFontStyle, inputFontFamily, labelFontFamily } = useFont();
  
  // Generate year options from startYear to endYear
  const yearOptions = React.useMemo(() => {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  }, [startYear, endYear]);

  if (form) {
    return (
      <Controller
        name="year"
        control={form.control}
        render={({ field }) => {
          // Convert field value to appropriate format based on mode
          const selectValue = allowCustomInput 
            ? (field.value ? [String(field.value)] : []) // Array for tags mode
            : (field.value || undefined); // String for normal mode

          return (
            <div 
              style={{ marginBottom: '16px' }}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <label 
                className="form-label" 
                style={{ 
                  color: colors?.text || '#2c2c2c',
                  fontFamily: labelFontFamily,
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  display: 'block'
                }}
              >
                {getLabel ? getLabel('year', isCn) : (isCn ? '年份' : 'Year')}
              </label>
              <Select
                id="year"
                placeholder={placeholder || getLabel?.('yearPlaceholder', isCn) || (isCn ? '选择年份' : 'Select year')}
                disabled={disabled}
                showSearch
                allowClear
                mode={allowCustomInput ? "tags" : undefined}
                maxTagCount={1}
                style={{
                  width: '100%',
                  fontFamily: inputFontFamily,
                }}
                styles={{
                  popup: {
                    root: {
                      fontFamily: inputFontFamily,
                    }
                  }
                }}
                onChange={(value) => {
                  // Handle both single year and custom input
                  let finalValue = "";
                  if (value) {
                    if (Array.isArray(value)) {
                      // When tags mode is enabled, value is an array
                      finalValue = value.length > 0 ? String(value[0]) : "";
                    } else {
                      finalValue = String(value);
                    }
                  }
                  field.onChange(finalValue);
                  onFieldChange && onFieldChange('year');
                }}
                onTouchEnd={(e) => e.stopPropagation()}
                value={selectValue}
                filterOption={(input, option) => {
                  const optionValue = String(option?.value || '');
                  return optionValue.toLowerCase().includes(input.toLowerCase());
                }}
                popupRender={(menu) => (
                  <div onTouchEnd={(e) => e.stopPropagation()}>
                    {menu}
                  </div>
                )}
              >
                {yearOptions.map((year) => (
                  <Option 
                    key={year} 
                    value={String(year)}
                    style={{
                      color: colors?.text || '#2c2c2c',
                      backgroundColor: colors?.background || '#fff',
                      fontFamily: inputFontFamily,
                    }}
                  >
                    {year}
                  </Option>
                ))}
              </Select>
              {form.formState.errors?.year && (
                <div 
                  style={{ 
                    color: '#d32f2f', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    fontFamily: labelFontFamily
                  }}
                >
                  {form.formState.errors.year.message}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }

  const handleChange = (val) => {
    let finalValue = "";
    if (val) {
      if (Array.isArray(val)) {
        finalValue = val.length > 0 ? String(val[0]) : "";
      } else {
        finalValue = String(val);
      }
    }
    onChange?.(finalValue);
    registerProps.onChange?.(finalValue);
    onFieldChange?.('year');
  };

  // Convert value to appropriate format based on mode
  const selectValue = allowCustomInput 
    ? (value ? [String(value)] : []) // Array for tags mode
    : (value || undefined); // String for normal mode

  return (
    <div 
      style={{ marginBottom: '16px' }}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <label 
        className="form-label" 
        style={{ 
          color: colors?.text || '#2c2c2c',
          fontFamily: labelFontFamily,
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '8px',
          display: 'block'
        }}
      >
        {getLabel ? getLabel('year', isCn) : (isCn ? '年份' : 'Year')}
      </label>
      <Select
        id="year"
        value={selectValue}
        placeholder={placeholder || getLabel?.('yearPlaceholder', isCn) || (isCn ? '选择年份' : 'Select year')}
        disabled={disabled}
        showSearch
        allowClear
        mode={allowCustomInput ? "tags" : undefined}
        maxTagCount={1}
        style={{
          width: '100%',
          fontFamily: inputFontFamily,
        }}
        styles={{
          popup: {
            root: {
              fontFamily: inputFontFamily,
            }
          }
        }}
        onChange={handleChange}
        onTouchEnd={(e) => e.stopPropagation()}
        filterOption={(input, option) => {
          const optionValue = String(option?.value || '');
          return optionValue.toLowerCase().includes(input.toLowerCase());
        }}
        popupRender={(menu) => (
          <div onTouchEnd={(e) => e.stopPropagation()}>
            {menu}
          </div>
        )}
        {...registerProps}
      >
        {yearOptions.map((year) => (
          <Option 
            key={year} 
            value={String(year)}
            style={{
              color: colors?.text || '#2c2c2c',
              backgroundColor: colors?.background || '#fff',
              fontFamily: inputFontFamily,
            }}
          >
            {year}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default YearSelector;