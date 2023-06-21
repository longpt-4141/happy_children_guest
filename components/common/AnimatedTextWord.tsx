import React from 'react'
import { motion } from "framer-motion";
import ReadmoreButton from './ReadmoreButton';

type Props = {
    text: string,
    isShown : boolean
}

const AnimatedTextWord = ({text, isShown}: Props) => {
    const letters = Array.from(text);

    // Variants for Container
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

// Variants for each letter
    const child = {
        visible: {
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 200,
        },
        },
        hidden: {
        opacity: 0,
        x: 100,
        y: 0,
        rotateY: 90,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 200,
        },
        },
    };


    return (
        <div className='absolute top-[50%] w-[110%] px-4 z-[12] '>
            <motion.div
            style={{ overflow: "hidden", display: "flex", }}
            variants={container}
            initial="hidden"
            animate={isShown? "visible" : "hidden"}
            className='text-6xl font-black tracking-[0.2em] uppercase font-outline-4 text-[#E26C50]'
            >
                {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
                ))}
            </motion.div>
            <motion.div
                variants={child}
                initial="hidden"
                animate={isShown? "visible" : "hidden"}
            >
                <ReadmoreButton />
            </motion.div>
        </div>
    )
}
export default AnimatedTextWord