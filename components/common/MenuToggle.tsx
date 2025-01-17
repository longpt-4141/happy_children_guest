import * as React from "react";
import { motion,SVGMotionProps } from "framer-motion";

const Path = (props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>) => (
    <motion.path
      fill="#991b1b"
      strokeWidth="3"
      stroke="#991b1b"
      strokeLinecap="round"
      {...props}
    />
  );


export const MenuToggle = ({ toggle }: any) => (
  <button onClick={toggle} className="outline-0 border-none cursor-pointer absolute top-4 right-[3.8vw] w-12 h-12 rounded-full bg-[transparent] flex items-center justify-center">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
