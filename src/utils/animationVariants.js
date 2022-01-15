export const cards = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.6,
      delayChildren: 0.7,
      staggerChildren: 0.4,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};

export const cardChild1 = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 },
  },
};

export const cardChild2 = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.3 },
  },
};

export const cardChild3 = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3 },
  },
};

export const cardChild4 = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.3 },
  },
};

export const topMenu = {
  hidden: {
    opacity: 0,
    y: -50,
    x: 30,
    transition: { duration: 0.01 },
    scale: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.01 },
    scale: 1,
  },
};

export const fabMenu = {
  hidden: {
    opacity: 0,
    x: 50,
    borderRadius: "50%",
    scaleX: 0.01,
    scaleY: 0.01,
  },
  visible: {
    opacity: 1,
    x: 0,
    borderRadius: "10px",
    scaleX: 1,
    scaleY: 1,
  },
};

export const btn1 = {
  hover: {
    scaleX: 1.02,
    scaleY: 1.02,
  },
  click: {
    scaleX: 0.99,
    scaleY: 0.99,
  },
};

export const startVar = {
  hidden: {
    opacity: 0,
    top: 3,
    left: 3,
    transition: { type: "spring", duration: 0.8 },
    scaleX: 0.01,
    scaleY: 0.01,
  },
  visible: {
    opacity: 1,
    top: 3,
    left: -40,
    transition: { type: "spring", duration: 0.8 },
    scaleX: 1,
    scaleY: 1,
  },
};

export const completeVar = {
  hidden: {
    opacity: 1,
    top: 3,
    left: 2,
    transition: { type: "spring", duration: 0.8 },
    scaleX: 0.01,
    scaleY: 0.01,
  },
  visible: {
    opacity: 1,
    top: 43,
    left: 2,
    transition: { type: "spring", duration: 0.8 },
    scaleX: 1,
    scaleY: 1,
  },
};
