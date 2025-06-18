'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
          }}
          animate={{
            y: [-100, window.innerHeight + 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}