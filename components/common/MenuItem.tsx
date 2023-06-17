import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, velocity: -100, damping: 40 }
    },
    duration: 2,
  },
  closed: {
    x: 1000,
    opacity: 0,
    transition: {
      x: {type: "spring", stiffness: 300, velocity: -100}
    },
    duration: 2,
  }
};

const variants2 = {
    init: {
        display: "none"
    },
    show: {
      x: 200,
      opacity: 0.5,
      display: "block",
      transition: {
        x: {type: "spring", stiffness: 40, velocity: -500, duration: 0.8, damping: 10},
      },
    },
    notShow: {
      display: "none",
      x: 500,
      opacity: 0,
      transition: {
        x: {type: "spring", stiffness: 40 },
      },
    }
  };

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, type, toggle }: any) => {
    const [isShown, setIsShown] = React.useState(false);
    const style = { border: `2px solid ${colors[i]}` };

    const handleNavigateClick = (e: any) => {
        e.preventDefault();

    }

    if(type === 'main') { 
        return (
            <>
                <motion.li
                variants={variants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:mb-10"
                >
                    <Link href={i.route} className="text-white" 
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                        onClick={toggle}
                    >
                        <span
                            className="uppercase mr-4 text-5xl font-black tracking-widest "
                        >{i.text}</span>
                        <span>{i.subtext}</span>
                        
                    </Link>
                    
                </motion.li>
                <motion.div
                    initial={"init"}
                    animate={isShown ? "show" : "notShow"}
                    variants={variants2}
                    className="absolute left-[32vw] top-[15vh]"
                >
                    <img src={i.bg} alt={i.text} width={600} height={600} />
                </motion.div>

            </>
        )
    } else if (type === 'sub') {
        return (
            <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}  
            whileTap={{ scale: 0.95 }}
            className="text-white md:mb-2 md:mr-2"
            >
                <Link href={i.route} className="md:text-[22px] uppercase font-black tracking-widest" onClick={toggle}>
                    <span>{i.text}</span>
                </Link>
                <p>
                    {i.subtext}
                </p>
            </motion.li>
        );
    } else 
    return (<></>)
};
