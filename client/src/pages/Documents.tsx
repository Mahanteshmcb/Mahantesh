import React from "react";
import DocumentsList, { DocEntry } from "@/components/DocumentsList";
import { motion, AnimatePresence } from "framer-motion";

function extractDriveId(url?: string) {
  if (!url) return null;
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (byPath && byPath[1]) return byPath[1];
  const byIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (byIdParam && byIdParam[1]) return byIdParam[1];
  return null;
}

function drivePreviewUrl(url?: string) {
  const id = extractDriveId(url);
  if (!id) return url;
  return `https://drive.google.com/file/d/${id}/preview`;
}

function driveDownloadUrl(url?: string) {
  const id = extractDriveId(url);
  if (!id) return url;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<DocEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<DocEntry | (DocEntry & { previewUrl?: string; downloadUrl?: string }) | null>(null);

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
            <DocumentsList items={docs} onView={(d) => setSelected({ ...d, previewUrl: drivePreviewUrl(d.url), downloadUrl: driveDownloadUrl(d.url) })} />
          </div>
          <div>
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={(selected as DocEntry).file}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.28 }}
                  className="border rounded-md p-2 bg-white/70 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">{(selected as DocEntry).title || (selected as DocEntry).file}</div>
                    <div>
                      <a
                        href={(selected as any).downloadUrl || (selected as DocEntry).url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 mr-2"
                      >
                        Open in new tab
                      </a>
                      <button className="text-sm text-gray-600" onClick={() => setSelected(null)}>Close</button>
                    </div>
                  </div>
                  {/* Use previewUrl when available (Drive preview) otherwise fallback to url */}
                  {(((selected as any).previewUrl || (selected as DocEntry).url) && (((selected as any).previewUrl || (selected as DocEntry).url) as string).endsWith('.pdf')) ? (
                    <iframe src={(selected as any).previewUrl || (selected as DocEntry).url} className="w-full h-[70vh] border rounded-md" title={(selected as DocEntry).file}></iframe>
                  ) : ((selected as any).previewUrl || (selected as DocEntry).url) ? (
                    <div className="p-4 bg-gray-50">Open this file: <a href={(selected as any).downloadUrl || (selected as DocEntry).url} target="_blank" rel="noreferrer" className="text-blue-600">{(selected as DocEntry).file}</a></div>
                  ) : (
                    <div className="p-4">No preview available — <a href={(selected as any).downloadUrl || (selected as DocEntry).url} target="_blank" rel="noreferrer" className="text-blue-600">Open in new tab</a></div>
                  )}
                  {(selected as any).previewUrl && (selected as DocEntry).url?.includes('drive.google.com') ? (
                    <div className="mt-2 text-xs text-gray-600">If the embed doesn't render, click "Open in new tab" to view the file directly on Google Drive.</div>
                  ) : null}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground"
                >
                  Select a document to preview
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
