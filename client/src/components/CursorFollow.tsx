import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorFollow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 blur-xl" />
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 180,
          delay: 0.05,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-violet-500/20 blur-lg" />
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-cyan-400" />
      </motion.div>
    </>
  );
}
