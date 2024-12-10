import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimationLayout({ open, children, className = 'mt-4 bg-white p-4 rounded-md shadow-md' }) {
    const formAnimation = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    }
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={formAnimation}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
