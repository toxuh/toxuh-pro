export interface GoogleFontSpec {
  family: string;
  weight?: string;
  ital?: 0 | 1;
}

const gfontsBase = "https://fonts.googleapis.com/css2";

function toParamFamily(family: string, weight?: string, ital?: 0 | 1) {
  const fam = family.trim().replace(/\s+/g, "+");
  if (typeof ital === "number") {
    return `family=${encodeURIComponent(fam)}:${ital ? "ital@1" : "ital@0"}`;
  }
  if (weight) {
    return `family=${encodeURIComponent(fam)}:wght@${encodeURIComponent(weight)}`;
  }
  return `family=${encodeURIComponent(fam)}`;
}

function buildCssUrl(spec: GoogleFontSpec): string {
  const params: string[] = [];
  const familyParam = toParamFamily(spec.family, spec.weight, spec.ital);
  params.push(familyParam);
  params.push("display=swap");
  params.push("subset=latin");
  return `${gfontsBase}?${params.join("&")}`;
}

function pickWoff2Url(css: string, opts: { weight?: string; ital?: 0 | 1 }) {
  const weight = opts.weight ?? "400";
  const style = opts.ital === 1 ? "italic" : "normal";

  const blocks = css.split("@font-face");
  for (const block of blocks) {
    if (
      block.includes(`font-style: ${style}`) &&
      block.includes(`font-weight: ${weight}`)
    ) {
      const m = block.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);
      if (m && m[1]) return m[1];
    }
  }

  const m = css.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);
  return m ? m[1] : undefined;
}

export async function loadGoogleFont(
  spec: GoogleFontSpec,
): Promise<ArrayBuffer> {
  const cssUrl = buildCssUrl(spec);
  const cssRes = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; EdgeImage/1.0; +https://nextjs.org/og)",
    },
  });
  if (!cssRes.ok) {
    throw new Error(`Failed to fetch Google Fonts CSS: ${cssRes.status}`);
  }
  const css = await cssRes.text();
  const url = pickWoff2Url(css, { weight: spec.weight, ital: spec.ital });
  if (!url) throw new Error("WOFF2 URL not found in Google Fonts CSS");
  const fontRes = await fetch(url);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font WOFF2: ${fontRes.status}`);
  }
  return fontRes.arrayBuffer();
}
