import { motion } from 'framer-motion';

export function SectionDivider() {
  return (
    <div className="relative h-24 flex items-center justify-center my-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
      <div className="relative flex items-center gap-4">
        <motion.div
          className="w-3 h-3 rounded-full bg-cyan-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-violet-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-pink-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
