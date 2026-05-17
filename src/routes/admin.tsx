import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CONTENT_SECTIONS, ALL_DEFAULTS } from "@/lib/content-registry";
import { getAllContent, updateContent, verifyPassword } from "@/lib/content.functions";
import { Lock, LogOut, Save, RotateCcw } from "lucide-react";

const STORAGE_KEY = "focused_admin_pw";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Focused Combined School" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setPassword(stored);
  }, []);

  if (!password) return <LoginGate onAuth={(pw) => setPassword(pw)} />;
  return <Editor password={password} onLogout={() => { sessionStorage.removeItem(STORAGE_KEY); setPassword(null); }} />;
}

function LoginGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const verify = useServerFn(verifyPassword);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const { ok } = await verify({ data: { password: pw } });
      if (!ok) {
        setErr("Incorrect password.");
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, pw);
      onAuth(pw);
    } catch {
      setErr("Could not verify password. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Lock size={20} />
        </div>
        <h1 className="mt-5 font-display text-3xl">Admin sign-in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to edit the website content.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="pw" className="text-sm font-medium">Password</label>
            <input
              id="pw"
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {err && <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Editor({ password, onLogout }: { password: string; onLogout: () => void }) {
  const fetchAll = useServerFn(getAllContent);
  const save = useServerFn(updateContent);

  const initialValues = useMemo(() => ({ ...ALL_DEFAULTS }), []);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [original, setOriginal] = useState<Record<string, string>>(initialValues);
  const [activeSection, setActiveSection] = useState<string>(CONTENT_SECTIONS[0].id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetchAll()
      .then((data) => {
        const merged = { ...ALL_DEFAULTS, ...data };
        setValues(merged);
        setOriginal(merged);
      })
      .catch(() => setMessage({ tone: "err", text: "Could not load existing content." }))
      .finally(() => setLoading(false));
  }, [fetchAll]);

  const dirtyKeys = useMemo(
    () => Object.keys(values).filter((k) => values[k] !== original[k]),
    [values, original],
  );

  async function onSave() {
    if (dirtyKeys.length === 0) return;
    setSaving(true);
    setMessage(null);
    try {
      const updates: Record<string, string> = {};
      for (const k of dirtyKeys) updates[k] = values[k];
      await save({ data: { password, updates } });
      setOriginal({ ...values });
      setMessage({ tone: "ok", text: `Saved ${dirtyKeys.length} change${dirtyKeys.length === 1 ? "" : "s"}. Live on the site now.` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not save changes.";
      setMessage({ tone: "err", text: msg });
    } finally {
      setSaving(false);
    }
  }

  function resetField(key: string) {
    setValues((v) => ({ ...v, [key]: ALL_DEFAULTS[key] ?? "" }));
  }

  const section = CONTENT_SECTIONS.find((s) => s.id === activeSection)!;

  return (
    <section className="container mx-auto px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">Admin</p>
          <h1 className="mt-1 font-display text-3xl">Edit website content</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Changes save instantly and appear on the live site for every visitor.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            disabled={saving || dirtyKeys.length === 0}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving…" : dirtyKeys.length ? `Save ${dirtyKeys.length} change${dirtyKeys.length === 1 ? "" : "s"}` : "Saved"}
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      {message && (
        <div className={`mt-6 rounded-md px-4 py-3 text-sm ${message.tone === "ok" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
          {message.text}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <nav className="lg:col-span-3">
          <div className="sticky top-24 space-y-1 rounded-xl border border-border bg-card p-3">
            {CONTENT_SECTIONS.map((s) => {
              const dirtyInSection = s.fields.some((f) => values[f.key] !== original[f.key]);
              const active = s.id === activeSection;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${active ? "bg-secondary font-semibold text-primary" : "hover:bg-secondary/60"}`}
                >
                  <span>{s.title}</span>
                  {dirtyInSection && <span className="h-2 w-2 rounded-full bg-crimson" />}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="lg:col-span-9">
          {loading ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Loading content…
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">{section.title}</h2>
              {section.fields.map((f) => {
                const dirty = values[f.key] !== original[f.key];
                return (
                  <div key={f.key} className={`rounded-xl border bg-card p-5 transition ${dirty ? "border-crimson/60 ring-1 ring-crimson/30" : "border-border"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor={f.key} className="text-sm font-semibold">{f.label}</label>
                      <button
                        type="button"
                        onClick={() => resetField(f.key)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                        title="Reset to original"
                      >
                        <RotateCcw size={12} /> Reset
                      </button>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-muted-foreground">{f.key}</div>
                    {f.multiline ? (
                      <textarea
                        id={f.key}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        rows={Math.min(8, Math.max(3, (values[f.key]?.split("\n").length ?? 3)))}
                        maxLength={5000}
                        className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    ) : (
                      <input
                        id={f.key}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        maxLength={5000}
                        className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
