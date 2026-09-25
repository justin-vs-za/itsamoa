import { readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const APP_ID = process.env.VITE_BASE44_APP_ID || "6aa613ccd990b946b850fb36";
const BASE44_API = process.env.BASE44_API_BASE || "https://itsamoa.base44.app";

/** Allow-list only — never serve arbitrary paths */
const ALLOWED = {
  "invoice-template.pdf": {
    type: "application/pdf",
    download: "Golden-Tide-Invoice-Template.pdf",
  },
  "invoice-template.docx": {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    download: "Golden-Tide-Invoice-Template.docx",
  },
  "invoice-template.xlsx": {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    download: "Golden-Tide-Invoice-Template.xlsx",
  },
  "quote-template.pdf": {
    type: "application/pdf",
    download: "Golden-Tide-Quote-Template.pdf",
  },
  "quote-template.docx": {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    download: "Golden-Tide-Quote-Template.docx",
  },
  "quote-template.xlsx": {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    download: "Golden-Tide-Quote-Template.xlsx",
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
}

async function verifyBase44User(token) {
  const url = `${BASE44_API}/api/apps/${APP_ID}/entities/User/me`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-App-Id": APP_ID,
      Accept: "application/json",
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function handler(event) {
  const origin = event.headers.origin || event.headers.Origin || "";
  const headers = corsHeaders(origin);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: "Method not allowed" };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return {
      statusCode: 401,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Login required to download this file." }),
    };
  }

  let user;
  try {
    user = await verifyBase44User(token);
  } catch (err) {
    console.error("auth verify failed", err);
    return {
      statusCode: 401,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Could not verify login." }),
    };
  }

  if (!user) {
    return {
      statusCode: 401,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid or expired session. Please log in again." }),
    };
  }

  const fileKey = basename(event.queryStringParameters?.file || "");
  const meta = ALLOWED[fileKey];
  if (!meta) {
    return {
      statusCode: 404,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "File not found." }),
    };
  }

  // Bundled next to the function via netlify.toml included_files
  const candidates = [
    join(__dirname, "..", "..", "secure-downloads", fileKey),
    join(process.cwd(), "secure-downloads", fileKey),
    join(__dirname, "secure-downloads", fileKey),
  ];
  const filePath = candidates.find((p) => existsSync(p));
  if (!filePath) {
    console.error("missing file", fileKey, candidates);
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "File unavailable on server." }),
    };
  }

  const data = readFileSync(filePath);
  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      ...headers,
      "Content-Type": meta.type,
      "Content-Disposition": `attachment; filename="${meta.download}"`,
      "Cache-Control": "private, no-store",
    },
    body: data.toString("base64"),
  };
}
