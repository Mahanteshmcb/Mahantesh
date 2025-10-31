import React from "react";
import { motion } from "framer-motion";

export interface DocEntry {
  file: string;
  title: string;
  date?: string;
  visible?: boolean;
  url?: string;
}

export default function DocumentsList({
  items,
  onView,
}: {
  items: DocEntry[];
  onView?: (item: DocEntry) => void;
}) {
  if (!items || items.length === 0) return <div>No documents found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ul className="space-y-3">
        {items.map((doc, idx) => {
          const link = (doc as any).url || `/documents/${encodeURIComponent(doc.file)}`;
          const isExternal = Boolean((doc as any).url && (doc as any).url.startsWith('http')) && !(doc as any).url.startsWith('/documents/');

          function extractDriveId(url?: string) {
            if (!url) return null;
            const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (byPath && byPath[1]) return byPath[1];
            const byIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (byIdParam && byIdParam[1]) return byIdParam[1];
            return null;
          }

          function driveDownloadUrl(url?: string) {
            const id = extractDriveId(url);
            if (!id) return url;
            return `https://drive.google.com/uc?export=download&id=${id}`;
          }

          return (
            <motion.li
              key={doc.file}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.28 }}
              whileHover={{ scale: 1.01 }}
              className="p-3 border rounded-md flex justify-between items-center bg-white/60 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#1f2937" strokeWidth="1" fill="#fff" />
                    <path d="M14 2v6h6" stroke="#1f2937" strokeWidth="1" fill="none" />
                    <rect x="6" y="14" width="6" height="2" rx="0.5" fill="#ef4444" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">{doc.title || doc.file}</div>
                  {doc.date ? <div className="text-sm text-muted-foreground">{doc.date}</div> : null}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    try { window.open(link, '_blank'); } catch (e) { /* ignore */ }
                    if (onView) onView(doc);
                  }}
                  className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded shadow"
                >
                  View
                </button>
                {isExternal ? (
                  <>
                    <a href={link} target="_blank" rel="noreferrer" className="btn border px-3 py-1 rounded">Open</a>
                    {link.includes('drive.google.com') ? (
                      <a href={driveDownloadUrl(link)} className="btn border px-3 py-1 rounded ml-2">Download</a>
                    ) : null}
                  </>
                ) : (
                  <a href={link} download={doc.file} className="btn border px-3 py-1 rounded">Download</a>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
