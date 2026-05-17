import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_PASSWORD = "focused2026";

export const getAllContent = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("site_content")
    .select("key,value");
  if (error) throw new Error(error.message);
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
});

const updateSchema = z.object({
  password: z.string().min(1).max(100),
  updates: z.record(z.string().min(1).max(200), z.string().max(5000)),
});

export const updateContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      throw new Error("Invalid password");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const rows = Object.entries(data.updates).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));
    if (rows.length === 0) return { ok: true, count: 0 };
    const { error } = await supabaseAdmin.from("site_content").upsert(rows);
    if (error) throw new Error(error.message);
    return { ok: true, count: rows.length };
  });

export const verifyPassword = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string().max(100) }).parse(input))
  .handler(async ({ data }) => {
    return { ok: data.password === ADMIN_PASSWORD };
  });
