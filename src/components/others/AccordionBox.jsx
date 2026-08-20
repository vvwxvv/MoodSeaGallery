import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

export default function AccordionBox({
  summary_text,
  content,
  colors,
  defaultOpen = false,
}) {
  const items = [
    {
      key: "1",
      label: (
        <span
          style={{
            color: colors?.text || "#000",
            fontSize: "14px",
            fontWeight: 500,
            display: "block",
            width: "100%",
          }}
        >
          {summary_text}
        </span>
      ),
      children: (
        <div
          style={{
            backgroundColor: colors?.background || "#fff",
            color: colors?.text || "#000",
            padding: "16px 0",
          }}
        >
          {content}
        </div>
      ),
      style: {
        backgroundColor: colors?.background || "#fff",
        border: "none",
      },
    },
  ];

  return (
    <Collapse
      ghost
      defaultActiveKey={defaultOpen ? ["1"] : []}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{
            color: colors?.text || "#000",
            fontSize: "12px",
          }}
        />
      )}
      style={{
        backgroundColor: colors?.background || "#fff",
        border: `1px solid ${colors?.border || "#ccc"}`,
        borderRadius: "8px",
        marginBottom: "16px",
      }}
      items={items}
    />
  );
}