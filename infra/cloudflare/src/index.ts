export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  ALLOWED_ORIGIN?: string;
}

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN || "*";
  return {
    ...JSON_HEADERS,
    "access-control-allow-origin": allowed === "*" || origin === allowed ? origin || allowed : allowed,
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "cache-control": "public, max-age=60, stale-while-revalidate=300",
  };
}

function json(request: Request, env: Env, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request, env) });
}

function notFound(request: Request, env: Env) {
  return json(request, env, { error: "not_found" }, 404);
}

function safeLimit(value: string | null) {
  const parsed = Number(value || 50);
  return Number.isFinite(parsed) ? Math.min(Math.max(Math.floor(parsed), 1), 100) : 50;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    const url = new URL(request.url);

    if (url.pathname.startsWith("/assets/")) {
      const key = decodeURIComponent(url.pathname.slice("/assets/".length));
      const object = await env.ASSETS.get(key);
      if (!object) return notFound(request, env);
      const headers = new Headers({
        "cache-control": "public, max-age=86400, s-maxage=604800, immutable",
        "content-type": object.httpMetadata?.contentType || "image/jpeg",
        etag: object.httpEtag,
      });
      return new Response(object.body, { headers });
    }

    if (url.pathname === "/health") return json(request, env, { ok: true, service: "campanha-edson-eleicoes-api" });

    const snapshot = await env.DB.prepare(
      "SELECT id, version, source, source_updated_at AS sourceUpdatedAt, imported_at AS importedAt FROM election_snapshots WHERE status = 'active' ORDER BY id DESC LIMIT 1",
    ).first<{ id: number; version: string; source: string; sourceUpdatedAt: string; importedAt: string }>();
    if (!snapshot) return json(request, env, { error: "snapshot_not_ready" }, 503);

    if (url.pathname === "/v1/elections/2026/manifest") {
      const counts = await env.DB.prepare(
        "SELECT scope, office_code AS officeCode, COUNT(*) AS count FROM candidates WHERE snapshot_id = ?1 GROUP BY scope, office_code ORDER BY scope, office_code",
      ).bind(snapshot.id).all();
      return json(request, env, { snapshot, counts: counts.results });
    }

    if (url.pathname === "/v1/candidatos") {
      const scope = url.searchParams.get("scope");
      const officeCode = url.searchParams.get("cargo");
      const query = url.searchParams.get("q")?.trim();
      const limit = safeLimit(url.searchParams.get("limit"));
      const clauses = ["snapshot_id = ?1"];
      const bindings: Array<string | number> = [snapshot.id];
      if (scope === "RJ" || scope === "BR") { bindings.push(scope); clauses.push(`scope = ?${bindings.length}`); }
      if (officeCode) { bindings.push(officeCode); clauses.push(`office_code = ?${bindings.length}`); }
      if (query) { bindings.push(`%${query}%`, `%${query}%`, `%${query}%`); clauses.push(`(ballot_name LIKE ?${bindings.length - 2} OR ballot_number LIKE ?${bindings.length - 1} OR party_acronym LIKE ?${bindings.length})`); }
      bindings.push(limit);
      const result = await env.DB.prepare(
        `SELECT candidate_id AS candidateId, scope, uf, office_code AS officeCode, office_name AS officeName, ballot_number AS ballotNumber, ballot_name AS ballotName, party_number AS partyNumber, party_acronym AS partyAcronym, party_name AS partyName, registration_status AS registrationStatus, ballot_status AS ballotStatus, photo_key AS photoKey FROM candidates WHERE ${clauses.join(" AND ")} ORDER BY office_code, ballot_name LIMIT ?${bindings.length}`,
      ).bind(...bindings).all();
      return json(request, env, { snapshot, candidates: result.results });
    }

    const candidateMatch = url.pathname.match(/^\/v1\/candidatos\/([^/]+)$/);
    if (candidateMatch) {
      const candidate = await env.DB.prepare(
        "SELECT candidate_id AS candidateId, scope, uf, office_code AS officeCode, office_name AS officeName, ballot_number AS ballotNumber, ballot_name AS ballotName, party_number AS partyNumber, party_acronym AS partyAcronym, party_name AS partyName, registration_status AS registrationStatus, ballot_status AS ballotStatus, photo_key AS photoKey FROM candidates WHERE snapshot_id = ?1 AND candidate_id = ?2",
      ).bind(snapshot.id, candidateMatch[1]).first();
      return candidate ? json(request, env, { snapshot, candidate }) : notFound(request, env);
    }

    return notFound(request, env);
  },

  async scheduled(_event: ScheduledEvent, env: Env) {
    // The scheduled hook is intentionally a no-op until a reviewed TSE importer
    // is configured. It keeps the four daily free-tier-safe trigger slots ready
    // without downloading or publishing a new snapshot automatically.
    await env.DB.prepare("SELECT 1").first();
  },
};
