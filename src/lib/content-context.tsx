import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ALL_DEFAULTS } from "./content-registry";
import { getAllContent } from "./content.functions";

type ContentMap = Record<string, string>;

const ContentContext = createContext<ContentMap>(ALL_DEFAULTS);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>(ALL_DEFAULTS);
  const fetchContent = useServerFn(getAllContent);

  useEffect(() => {
    let cancelled = false;
    fetchContent()
      .then((data) => {
        if (cancelled) return;
        setContent({ ...ALL_DEFAULTS, ...data });
      })
      .catch(() => {
        // keep defaults on error
      });
    return () => {
      cancelled = true;
    };
  }, [fetchContent]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const map = useContext(ContentContext);
  return (key: string, fallback?: string) => map[key] ?? fallback ?? ALL_DEFAULTS[key] ?? "";
}
