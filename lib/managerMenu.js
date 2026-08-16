import { getMenu, toSections, toLeaves } from "@/lib/menu";

const STANDALONE = { en: "GENERAL", cn: "通用" };

// language stays out of the leaf fetch — keys/models are identical, so pin to "en"
export const getManagerSections = (isCn) =>
  toSections(getMenu("managerMenu", isCn), STANDALONE[isCn ? "cn" : "en"]);

export const getManagerModels = () => toLeaves(getMenu("managerMenu", false));