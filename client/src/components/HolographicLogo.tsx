import { motion } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';

export function HolographicLogo() {
  return (
    <div className="relative w-64 h-64 mx-auto perspective-1000">
      <motion.div
        className="absolute inset-0 preserve-3d"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-violet-500/30 to-cyan-500/30 backdrop-blur-md border border-cyan-500/50 shadow-2xl shadow-cyan-500/50">
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur-lg border border-violet-500/30 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <Gamepad2 className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]" />
              
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-8 h-8 text-violet-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              transformOrigin: 'center',
              transform: `rotateZ(${i * 90}deg) translateZ(20px)`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.1,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(168, 85, 247, 0.6)',
              boxShadow: i % 2 === 0 
                ? '0 0 10px rgba(6, 182, 212, 0.8)' 
                : '0 0 10px rgba(168, 85, 247, 0.8)',
              transform: `translateY(${-100 - i * 10}px)`,
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-violet-500/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 1.5,
        }}
      />
    </div>
  );
}
