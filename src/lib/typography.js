// lib/typography.js
// One entry per layout role. Add a new area to the site? Add one entry
// here — nothing else needs to change.

export const FONT_FACES = {
  zh: {
    thin: 'PingFangThin',
    light: 'PingFangLight',
    regular: 'PingFangRegular',
    // ⚠️ PingFangMedium has no @font-face rule declared anywhere in the
    // site's CSS yet. Pointing this key at that name doesn't error — the
    // string resolves fine in JS — but the browser can't find a font by
    // that name and silently falls back to the system default. That's
    // why every role requesting zh "medium" (artistName, artistWorksHeading,
    // managerNavLink) was rendering in the wrong typeface with no warning.
    // Aliasing to PingFangRegular for now means those roles render the
    // correct BRANDED font instead of an invisible system fallback.
    // TODO: once PingFangMedium is added via @font-face, change this one
    // line back — every role using FONT_FACES.zh.medium updates automatically.
    medium: 'PingFangRegular',
  },
  en: {
    regular: 'AvenirNextRegular',
    medium: 'AvenirNextMedium',
  },
};

// fontSize / lineHeight are read straight off the AI Character panel (pt → px, 1:1).
// If your artboard scale isn't 1pt = 1px, multiply every fontSize/lineHeight
// by your real scale factor — nothing else in this file changes.
// letterSpacing is stored as Illustrator tracking / 1000 (its native em unit).
export const TYPE_SCALE = {
  sectionTitle: {                       // "艺术家" page/section heading
    zh: { weight: 'regular', fontSize: 60, lineHeight: 72, letterSpacing: 14 / 1000 },
    en: { weight: 'regular', fontSize: 60, lineHeight: 72, letterSpacing: 14 / 1000 },
  },
  artistListItem: {                     // 蔡向燭 / 陈鸿志 / ... index list
    zh: { weight: 'thin',    fontSize: 43, lineHeight: 92, letterSpacing: 50 / 1000 },
    en: { weight: 'regular', fontSize: 43, lineHeight: 92, letterSpacing: 50 / 1000 }, // no Avenir Thin available
  },
  artistName: {                         // "汪一舟" detail-page heading
    zh: { weight: 'medium', fontSize: 56, lineHeight: 67.2, letterSpacing: 100 / 1000 },
    en: { weight: 'regular', fontSize: 56, lineHeight: 67.2, letterSpacing: 100 / 1000 },
  },
  // NAV LINK — only `weight` is actually used, to pick the font FILE
  // (FONT_FACES[lang][weight]) that useFont("navLink") hands to MainNav.js
  // as `fontFamily`. Size, weight (CSS), spacing, line-height, color,
  // transform for the nav all live in NAV_CONFIG inside
  // components/nav/MainNav.js — edit there, not here.
  navLink: {
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  // MANAGER NAV LINK — same weight-only split as navLink above, used by
  // useFont("managerNavLink") in components/nav/ManagerNav.js for the
  // desktop/mobile menu labels, dropdown items, and Contact button.
  // Sizing/spacing for those elements is set inline in ManagerNav.js
  // (MenuLabel, DropdownItem, etc.) — edit there, not here.
  managerNavLink: {
    zh: { weight: 'medium' },
    en: { weight: 'regular' },
  },
  // ⚠️ Not sampled from the AI comp — this is a placeholder based on the
  // component's previous hardcoded 12px. Replace with real values once
  // you've selected this element (or its equivalent) in the design file.
  languageSwitcher: {
    zh: { weight: 'regular', fontSize: 12, lineHeight: 16, letterSpacing: 0 },
    en: { weight: 'regular', fontSize: 12, lineHeight: 16, letterSpacing: 0 },
  },

  // ── Exhibitions list page ──────────────────────────────────────────────
  // All five roles below only supply `weight` (→ font FILE). Size, line
  // height, letter-spacing, and CSS font-weight for every exhibitions-page
  // element live in EXHIBITIONS_CONFIG at the top of ExhibitionsPage.jsx —
  // edit there, not here, if the page isn't changing when you'd expect it to.

  exhibitionCaption: {                  // ExhibitionCard title + date. AI comp
                                         // sample (34pt/44pt Avenir Next
                                         // Regular) is preserved as the
                                         // default in EXHIBITIONS_CONFIG.CARD_TITLE
                                         // / CARD_DATE.
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  exhibitionSectionHeading: {           // "Current" / "Past" / selected-year heading
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },
  yearDropdownLabel: {                  // Year-filter dropdown trigger + menu items
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  exhibitionCardLabel: {                // Fallback gallery-name label when a card has no cover image
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  bodyText: {                           // Generic paragraph copy: empty states, retry messages, etc.
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },

  // ── Artworks page ───────────────────────────────────────────────────────
  // Same split as the exhibitions roles above: these only supply `weight`
  // (→ font FILE). Size, line-height, letter-spacing, opacity, and CSS
  // font-weight for every artwork-card element live in ARTWORK_CONFIG at
  // the top of components/artwork/ArtworkPageComponent.jsx and
  // components/artwork/ArtworkCell.jsx — edit there, not here.
  artworkSectionTitle: {                // "作品" / "Artworks" page heading
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  artworkCardArtist: {                  // Artist name line on each artwork card
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  artworkCardCaption: {                 // Title (italic) + year line
    zh: { weight: 'light' },
    en: { weight: 'regular' },          // no Avenir Light available
  },
  artworkCardMeta: {                    // Medium / size line
    zh: { weight: 'light' },
    en: { weight: 'regular' },          // no Avenir Light available
  },
  artworkCardEnquire: {                 // "咨询" / "Enquire" button label
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  artworkCardFallback: {                // "无图片" / "No Image" placeholder label
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },

  // ── Artist pages (index + detail) ───────────────────────────────────────
  // sectionTitle / artistListItem / artistName already existed above and are
  // reused as-is (index heading, index list, detail heading). These three
  // are new, same weight-only split: sizing lives in ARTIST_CONFIG at the
  // top of ArtistIndexPageComponent.jsx / ArtistDetailPageComponent.jsx.
  artistListMeta: {                     // Secondary line beside each index-list name (e.g. year/nationality)
    zh: { weight: 'light' },
    en: { weight: 'regular' },          // no Avenir Light available
  },
  artistBio: {                          // Detail-page biography paragraph
    zh: { weight: 'light' },
    en: { weight: 'regular' },          // no Avenir Light available
  },
  artistWorksHeading: {                 // "作品" / "Works" sub-heading on the artist detail page
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },

  // ── Exhibition & Fair detail pages ──────────────────────────────────────
  // Shared weight-only roles (→ font FILE via FONT_FACES[lang][weight]) used
  // by BOTH the exhibition-detail and fair-detail pages, which share an
  // identical layout. Size, line-height, letter-spacing, colour, opacity and
  // CSS font-weight for every element live in TEXT_CONFIG / LAYOUT_CONFIG at
  // the top of ExhibitionDetailPageComponent.jsx and
  // FairDetailPageComponent.jsx — edit those, not here. Change only `weight`
  // here to swap the typeface FILE for a role across both pages at once.
  detailTitle: {                        // Exhibition / fair title heading (e.g. *I Am Here*)
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },
  detailSubtitle: {                     // Exhibition subtitle / fair "section" line
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  detailDate: {                         // Date-range line
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },
  detailCaption: {                      // Cover caption + body-image captions (italic)
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  detailBody: {                         // Introduction / description / press-release paragraphs
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  detailSectionHeading: {               // "Works" / "Related Artists" sub-headings
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },
  detailLink: {                         // Works + related-artist text links
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },
  detailMetaLabel: {                    // Metadata table — uppercase label column
    zh: { weight: 'medium' },
    en: { weight: 'medium' },
  },
  detailMetaValue: {                    // Metadata table — value column
    zh: { weight: 'regular' },
    en: { weight: 'regular' },
  },

  // ── Generic / fallback ──────────────────────────────────────────────────
  body: {                               // Default body text — used by useFont() without a role
    zh: { weight: 'regular', fontSize: 15, lineHeight: 24, letterSpacing: 0 },
    en: { weight: 'regular', fontSize: 15, lineHeight: 24, letterSpacing: 0 },
  },
  loadingAnimation: {                   // Skeleton / loading pages
    zh: { weight: 'regular', fontSize: 13, lineHeight: 20, letterSpacing: 1 / 1000 },
    en: { weight: 'regular', fontSize: 13, lineHeight: 20, letterSpacing: 1 / 1000 },
  },
};
