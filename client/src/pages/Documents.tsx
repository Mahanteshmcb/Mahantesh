import React from "react";
import DocumentsList, { DocEntry } from "@/components/DocumentsList";

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<DocEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchManifest() {
      try {
        const res = await fetch("/documents/manifest.json");
        if (!res.ok) throw new Error("Manifest not found");
        const data = (await res.json()) as DocEntry[];
        if (!cancelled) setDocs(data.filter((d) => d.visible !== false));
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load documents");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchManifest();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      {loading && <div>Loading documents…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && <DocumentsList items={docs} />}
    </div>
  );
}
