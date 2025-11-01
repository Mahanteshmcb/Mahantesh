import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform } from 'framer-motion';

type Project = any;

export default function ProjectCard({ project, onView }: { project: Project; onView: (p: any) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // framer-motion values for smooth parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, (v) => `${v / 20}px`);
  const ty = useTransform(my, (v) => `${v / 20}px`);
  const rx = useTransform(mx, (v) => `${v / 200}deg`);
  const ry = useTransform(my, (v) => `${-v / 200}deg`);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(x);
    my.set(y);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="h-full relative overflow-hidden p-6" aria-hidden={false}>
        {/* particle layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
            <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
              <circle cx="20%" cy="20%" r="2" fill="rgba(99,102,241,0.08)" />
              <circle cx="80%" cy="40%" r="3" fill="rgba(56,189,248,0.06)" />
              <circle cx="60%" cy="80%" r="2" fill="rgba(139,92,246,0.06)" />
            </g>
          </svg>
        </div>

        <motion.div style={{ translateX: tx, translateY: ty, rotateX: ry, rotateY: rx }} className="relative z-10 flex flex-col h-full">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">{project.title[0]}</div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
            <div>
              <Button size="sm" variant="outline" onClick={() => onView(project)}>View Details</Button>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 5).map((tech: string) => (
              <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/6 border border-white/10">{tech}</span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/4 border border-white/10">+{project.technologies.length - 5}</span>
            )}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
