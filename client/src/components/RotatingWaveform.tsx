import { motion } from 'framer-motion';

export function RotatingWaveform() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border-2 border-violet-500/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 backdrop-blur-sm flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                MB
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: '4px',
            height: `${20 + Math.random() * 30}px`,
            background: i % 2 === 0 ? 'rgba(0, 255, 255, 0.3)' : 'rgba(176, 38, 255, 0.3)',
            transformOrigin: 'center',
            transform: `rotate(${i * 45}deg) translateY(-80px)`,
          }}
          animate={{
            height: [
              `${20 + Math.random() * 30}px`,
              `${40 + Math.random() * 40}px`,
              `${20 + Math.random() * 30}px`,
            ],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
