import React from "react";
import DocumentsList, { DocEntry } from "@/components/DocumentsList";

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<DocEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<DocEntry | null>(null);

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
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DocumentsList items={docs} onView={(d) => setSelected(d)} />
          </div>
          <div>
            {selected ? (
              <div className="border rounded-md p-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">{selected.title || selected.file}</div>
                  <div>
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 mr-2"
                    >
                      Open in new tab
                    </a>
                    <button className="text-sm text-gray-600" onClick={() => setSelected(null)}>Close</button>
                  </div>
                </div>
                {selected.url && selected.url.endsWith('.pdf') ? (
                  <iframe src={selected.url} className="w-full h-[70vh] border" title={selected.file}></iframe>
                ) : selected.url ? (
                  <div className="p-4 bg-gray-50">Open this file: <a href={selected.url} target="_blank" rel="noreferrer" className="text-blue-600">{selected.file}</a></div>
                ) : (
                  <div>No preview available</div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Select a document to preview</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
