import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Anton Zakharov — Fullstack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const OGImage = async () => {
  const [instrumentSerifRegular, instrumentSerifItalic, spaceMonoRegular] =
    await Promise.all([
      fetch(new URL("./fonts/InstrumentSerif-Regular.woff2", import.meta.url)).then(
        (res) => res.arrayBuffer(),
      ),
      fetch(new URL("./fonts/InstrumentSerif-Italic.woff2", import.meta.url)).then(
        (res) => res.arrayBuffer(),
      ),
      fetch(new URL("./fonts/SpaceMono-Regular.woff2", import.meta.url)).then(
        (res) => res.arrayBuffer(),
      ),
    ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        padding: "40px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 400,
            fontStyle: "italic",
            color: "#fafafa",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            margin: 0,
            fontFamily: "Instrument Serif",
          }}
        >
          Anton
        </h1>
        <h1
          style={{
            fontSize: 120,
            fontWeight: 400,
            color: "#fafafa",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            margin: 0,
            marginTop: 10,
            fontFamily: "Instrument Serif",
          }}
        >
          Zakharov
        </h1>
        <div
          style={{
            width: 80,
            height: 1,
            backgroundColor: "rgba(250, 250, 250, 0.35)",
            margin: "40px 0",
          }}
        />
        <p
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(250, 250, 250, 0.5)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "Space Mono",
          }}
        >
          Fullstack Engineer
        </p>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 16,
          color: "rgba(250, 250, 250, 0.35)",
          letterSpacing: "0.2em",
          fontFamily: "Space Mono",
        }}
      >
        toxuh.pro
      </p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerifRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Serif",
          data: instrumentSerifItalic,
          weight: 400,
          style: "italic",
        },
        {
          name: "Space Mono",
          data: spaceMonoRegular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
};

export default OGImage;
