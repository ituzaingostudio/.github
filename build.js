// Builds the final Ituzaingó logo files: outlined SVGs + PNG renders.
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const { Resvg } = require("@resvg/resvg-js");

const OUT = process.argv[2];
const fontBuf = fs.readFileSync(
	path.join(__dirname, "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff"),
);
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));

// Locked values from the design canvas (artboard C).
const BG = "#07090B";
const MARK = "#C9D2C4";
const VIS = 0.18;
const VIS_MID = VIS * 0.35;

// Outline `text` at font size `fs`, letter spacing `ls`, centered on cx, baseline y.
function outline(text, fs, ls, cx, y) {
	const glyphs = font.stringToGlyphs(text);
	const scale = fs / font.unitsPerEm;
	let width = 0;
	const advances = glyphs.map((g, i) => {
		const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
		const adv = (g.advanceWidth + kern) * scale + (i < glyphs.length - 1 ? ls : 0);
		width += adv;
		return adv;
	});
	let x = cx - width / 2;
	let d = "";
	glyphs.forEach((g, i) => {
		d += g.getPath(x, y, fs).toPathData(2);
		x += advances[i];
	});
	return d;
}

function svg({ w, h, d, y1, y2, blur, vis, bg }) {
	const visMid = vis * 0.35;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<title>Ituzaingó</title>
<defs>
<filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${blur}"/></filter>
<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">
<stop offset="0" stop-color="${MARK}" stop-opacity="${vis}"/>
<stop offset="0.45" stop-color="${MARK}" stop-opacity="${+visMid.toFixed(4)}"/>
<stop offset="1" stop-color="${MARK}" stop-opacity="0"/>
</linearGradient>
</defs>
${bg ? `<rect width="${w}" height="${h}" fill="${BG}"/>\n` : ""}<path d="${d}" fill="url(#fade)" filter="url(#blur)"/>
</svg>
`;
}

// Wordmark: same geometry as the canvas (font 200, spacing 6, baseline 300, shifted down 44).
const SHIFT = 44;
const word = {
	w: 1680,
	h: 520,
	d: outline("ituzaingó", 200, 6, 840, 300 + SHIFT),
	y1: 160 + SHIFT,
	y2: 272 + SHIFT,
	blur: 1.6,
};

// Community cover (Roblox accepts 720x228 or 1440x456): the wordmark, scaled so it spans
// about half the width, placed exactly like on the wordmark (baseline 0.42em below center).
function cover(w, h, fs) {
	const k = fs / 200;
	const baseline = h / 2 + 84 * k;
	return {
		w,
		h,
		d: outline("ituzaingó", fs, 6 * k, w / 2, baseline),
		y1: baseline - 140 * k,
		y2: baseline - 28 * k,
		blur: +(1.6 * k).toFixed(2),
	};
}

// Icon: just the "i", same proportions scaled up. Gradient/blur are scaled from the wordmark
// (font 200: gradient 140px above baseline → 28px above baseline, blur 1.6).
function icon(vis) {
	const S = 1024;
	const topEm = font.charToGlyph("i").getBoundingBox().y2 / font.unitsPerEm; // dot top, in em above baseline
	const fadeEm = 0.1; // the fade ends 0.14em above baseline; keep a little margin
	const fs = (0.62 * S) / (topEm - fadeEm); // the dot-to-fade span fills ~62% of the square
	const baseline = S / 2 + ((topEm + fadeEm) / 2) * fs; // center the visible part
	const k = fs / 200;
	return {
		w: S,
		h: S,
		d: outline("i", fs, 0, S / 2, baseline),
		y1: baseline - 140 * k,
		y2: baseline - 28 * k,
		blur: +(1.6 * k).toFixed(2),
		vis,
	};
}

(async () => {
	fs.mkdirSync(path.join(OUT, "svg"), { recursive: true });
	fs.mkdirSync(path.join(OUT, "png"), { recursive: true });

	const files = {
		"ituzaingo-wordmark": svg({ ...word, vis: VIS, bg: true }),
		"ituzaingo-wordmark-transparent": svg({ ...word, vis: VIS, bg: false }),
		"ituzaingo-cover": svg({ ...cover(1440, 456, 170), vis: VIS, bg: true }),
		"ituzaingo-icon": svg({ ...icon(VIS), bg: true }),
		"ituzaingo-icon-emblem": svg({ ...icon(0.24), bg: true }),
		"ituzaingo-icon-bright": svg({ ...icon(0.42), bg: true }),
		"ituzaingo-icon-bright-transparent": svg({ ...icon(0.42), bg: false }),
	};
	for (const [name, s] of Object.entries(files)) fs.writeFileSync(path.join(OUT, "svg", `${name}.svg`), s);

	// Every SVG gets a PNG at each standard size: wordmarks at 1x and 2x, icons at 512 and 1024.
	const renders = [];
	for (const name of Object.keys(files)) {
		const isIcon = name.startsWith("ituzaingo-icon");
		const isCover = name.startsWith("ituzaingo-cover");
		const sizes = isCover
			? [
					[0.5, "720x228"],
					[1, "1440x456"],
				]
			: isIcon
			? [
					[0.5, "512"],
					[1, "1024"],
				]
			: [
					[1, "1680x520"],
					[2, "3360x1040"],
				];
		for (const [scale, label] of sizes) renders.push([name, scale, `${name}-${label}.png`]);
	}
	for (const [name, scale, out] of renders) {
		const r = new Resvg(files[name], { fitTo: { mode: "zoom", value: scale }, background: "rgba(0,0,0,0)" });
		fs.writeFileSync(path.join(OUT, "png", out), r.render().asPng());
	}
	console.log("done");
})();
