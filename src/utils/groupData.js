// utils/groupData.js
export function groupData(items, groupConfig, context = {}) {
    if (!groupConfig?.enabled) {
      return null;
    }
  
    const {
      field,
      getGroupKey,
      getGroupLabel,
      emptyLabel = { EN: "Ungrouped", CN: "未分组" },
      sortGroups = false,
      sortGroupsFn,
      sortItemsBy,
      sortItemsOrder = "asc",
      sortItemsFn,
    } = groupConfig;
  
    const map = new Map();
  
    for (const item of items) {
      const rawKey =
        typeof getGroupKey === "function"
          ? getGroupKey(item, context)
          : item?.[field];
  
      const normalizedKey =
        rawKey === undefined || rawKey === null || String(rawKey).trim() === ""
          ? "__UNGROUPED__"
          : String(rawKey).trim();
  
      if (!map.has(normalizedKey)) {
        const label =
          normalizedKey === "__UNGROUPED__"
            ? (context.isCn ? emptyLabel.CN : emptyLabel.EN)
            : typeof getGroupLabel === "function"
            ? getGroupLabel(normalizedKey, [], context)
            : normalizedKey;
  
        map.set(normalizedKey, {
          key: normalizedKey,
          label,
          items: [],
        });
      }
  
      map.get(normalizedKey).items.push(item);
    }
  
    let groups = Array.from(map.values());
  
    groups = groups.map((group) => {
      let sortedItems = [...group.items];
  
      if (typeof sortItemsFn === "function") {
        sortedItems.sort(sortItemsFn);
      } else if (sortItemsBy) {
        sortedItems.sort((a, b) => {
          const aVal = a?.[sortItemsBy];
          const bVal = b?.[sortItemsBy];
  
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return 1;
          if (bVal == null) return -1;
  
          const result = String(aVal).localeCompare(String(bVal), undefined, {
            numeric: true,
            sensitivity: "base",
          });
  
          return sortItemsOrder === "desc" ? -result : result;
        });
      }
  
      return {
        ...group,
        label:
          typeof getGroupLabel === "function"
            ? getGroupLabel(group.key, sortedItems, context)
            : group.label,
        items: sortedItems,
      };
    });
  
    if (typeof sortGroupsFn === "function") {
      groups.sort(sortGroupsFn);
    } else if (sortGroups === "asc" || sortGroups === "desc") {
      groups.sort((a, b) => {
        const result = String(a.label).localeCompare(String(b.label), undefined, {
          numeric: true,
          sensitivity: "base",
        });
        return sortGroups === "desc" ? -result : result;
      });
    }
  
    return groups;
  }