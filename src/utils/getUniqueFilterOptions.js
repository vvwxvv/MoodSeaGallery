
// Constants for dropdown and sorting
const ALL_FILTER_VALUE = 'all';

const getUniqueFilterOptions = (data, field, allLabel) => {
  const uniqueValues = Array.from(
    new Set(
      data
        .map(item => item[field])
        .filter(Boolean)
    )
  );
  const sortedValues = uniqueValues.sort((a, b) => String(a).localeCompare(String(b)));
  return [
    { value: ALL_FILTER_VALUE, label: allLabel },
    ...sortedValues.map(value => ({ value, label: value }))
  ];
};

export default getUniqueFilterOptions;