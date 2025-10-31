import React from "react";

export interface DocEntry {
  file: string;
  title: string;
  date?: string;
  visible?: boolean;
}

export default function DocumentsList({ items }: { items: DocEntry[] }) {
  if (!items || items.length === 0) return <div>No documents found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ul className="space-y-3">
        {items.map((doc) => {
          const link = (doc as any).url || `/documents/${encodeURIComponent(doc.file)}`;
          const isExternal = Boolean((doc as any).url);

          return (
            <li key={doc.file} className="p-3 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">{doc.title || doc.file}</div>
                {doc.date ? <div className="text-sm text-muted-foreground">{doc.date}</div> : null}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  View
                </a>
                {!isExternal ? (
                  <a href={link} download={doc.file} className="btn">Download</a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
