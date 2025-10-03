import React from "react"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          color: "white",
          fontSize: 160,
          fontWeight: 800,
          fontFamily: "Inter, system-ui, Arial, sans-serif",
        },
      },
      "PK"
    ),
    { width: 384, height: 384 }
  )
}
