"use client";

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

// ── React 19 compatibility ──────────────────────────────────────────────
// Next.js 15.5 bundles React 19 internally (next/dist/compiled/react =
// "19.2.0-canary-…") even though package.json pins react@18.3.1. antd v5
// officially supports React 16–18, so its DEFAULT render path
// (defaultReactRender) emits a dev-only "antd v5 support React is 16 ~ 18"
// warning on every antd button click (wave effect), and static
// message/notification/Modal.confirm methods can misbehave under React 19.
//
// This is the same thing the official `@ant-design/v5-patch-for-react-19`
// package does: hand antd a createRoot-based render function, which replaces
// defaultReactRender entirely — so the warning never fires and rendering
// stays correct under React 19.
unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    // allow the unmount to be scheduled after React flushes
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

// ── Belt-and-suspenders ─────────────────────────────────────────────────
// Also silence the exact warning text in case any antd path still reaches
// console.error / console.warn (rc-util's warning() uses console.error).
const ANT_D_COMPAT = '[antd: compatible]';
const ANT_D_REACT_VERSION = 'antd v5 support React is 16 ~ 18';

function isAntdCompatWarning(message) {
  return (
    typeof message === 'string' &&
    message.includes(ANT_D_COMPAT) &&
    message.includes(ANT_D_REACT_VERSION)
  );
}

const originalWarn = console.warn;
const originalError = console.error;

console.warn = function (...args) {
  if (isAntdCompatWarning(args[0])) return;
  originalWarn.apply(console, args);
};

console.error = function (...args) {
  if (isAntdCompatWarning(args[0])) return;
  originalError.apply(console, args);
};

export default {};
