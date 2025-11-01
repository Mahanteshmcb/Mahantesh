import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string | null;
  link?: string | null;
  featured?: string | null;
};

export function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // prevent background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const el = modalRef.current;
    // focus the first focusable element in the modal
    const focusable = el?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        onClose();
        return;
      }

      if (ev.key === 'Tab') {
        // trap focus within modal
        const focusables = el?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (ev.shiftKey) {
          if (document.activeElement === first) {
            ev.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            ev.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // restore focus
      previouslyFocused.current?.focus?.();
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  // derive small feature bullets from technologies if no explicit features provided
  const derivedFeatures = project.technologies.slice(0, 5).map((t: string) => `Built using ${t} to handle ${t.toLowerCase().includes('unity') ? 'game/runtime' : 'core functionality'}`);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4" aria-hidden={!isOpen}>
          {/* opaque non-clickable overlay — modal only closes with the close button */}
          <div
            className="absolute inset-0 pointer-events-auto"
            style={{ backgroundColor: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(6px)' }}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            aria-describedby={`project-modal-desc-${project.id}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 max-w-4xl w-full"
          >
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: 'rgba(6,8,10,0.98)', color: 'white' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 bg-gradient-to-br from-cyan-600 to-violet-600 p-6 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={`${project.title} screenshot`} className="w-full h-48 object-cover rounded-md shadow-lg" />
                  ) : (
                    <div className="w-full h-48 rounded-md flex items-center justify-center bg-white/6 border border-white/8 text-white">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{project.title.split(' ').map((s: string) => s[0]).join('')}</div>
                        <div className="text-xs mt-2 opacity-80">{project.featured ? 'Featured Project' : 'Project'}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 id={`project-modal-title-${project.id}`} className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p id={`project-modal-desc-${project.id}`} className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    </div>

                    <div className="flex items-start gap-2">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-violet-500 border-0">
                            Visit <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      )}
                      <button onClick={onClose} title="Close" className="text-muted-foreground hover:text-foreground ml-2" aria-label="Close project dialog">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Overview</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>

                      <h4 className="text-sm font-semibold mt-4 mb-2">My Role</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>Led architecture and implemented core systems.</li>
                        <li>Built AI/automation pipelines and optimized runtime performance.</li>
                        <li>Integrated editor tooling and automated asset pipelines.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {derivedFeatures.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>

                      <h4 className="text-sm font-semibold mt-4 mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t: string) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/6 border border-white/10">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2">Impact & Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-white/3 rounded-md text-center">
                        <div className="text-lg font-bold">—</div>
                        <div className="text-xs text-muted-foreground">Performance</div>
                      </div>
                      <div className="p-3 bg-white/3 rounded-md text-center">
                        <div className="text-lg font-bold">—</div>
                        <div className="text-xs text-muted-foreground">Stability</div>
                      </div>
                      <div className="p-3 bg-white/3 rounded-md text-center">
                        <div className="text-lg font-bold">—</div>
                        <div className="text-xs text-muted-foreground">Automation</div>
                      </div>
                      <div className="p-3 bg-white/3 rounded-md text-center">
                        <div className="text-lg font-bold">—</div>
                        <div className="text-xs text-muted-foreground">Integration</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default ProjectModal;
