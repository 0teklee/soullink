const transition = {
  duration: 0.5,
  ease: "easeInOut",
};

export const centerValue = {
  x: 0,
  zIndex: 2,
  opacity: 1,
  scale: 1,
  transition,
};

const getDirection = (index: number) => {
  return 2 > index ? 1 : -1;
};

const getIsCenterSide = (index: number) => {
  return index === 1 || index === 3;
};

const getIsSideEnds = (index: number) => {
  return index === 0 || index === 4;
};

const getPositions = (index: number) => {
  return {
    direction: getDirection(index),
    isCenterSide: getIsCenterSide(index),
    isSideEnds: getIsSideEnds(index),
  };
};

const setZIndex = (index: number) => {
  const { isCenterSide, isSideEnds } = getPositions(index);

  if (isCenterSide) {
    return 1;
  }
  if (isSideEnds) {
    return 0;
  }

  return 2;
};

const setOpacity = (index: number) => {
  const { isCenterSide, isSideEnds } = getPositions(index);

  if (isCenterSide) {
    return 0.7;
  }

  if (isSideEnds) {
    return 0.2;
  }

  return 1;
};

const setXindex = (index: number) => {
  const { isCenterSide, isSideEnds, direction } = getPositions(index);

  if (isCenterSide) {
    return 120 * direction;
  }

  if (isSideEnds) {
    return 240 * direction;
  }

  return 0;
};

const setScale = (index: number) => {
  const { isCenterSide, isSideEnds } = getPositions(index);

  if (isCenterSide) {
    return 0.9;
  }

  if (isSideEnds) {
    return 0.5;
  }
  return 0;
};

const getItemMotionInitial = (index: number) => {
  const zIndex = setZIndex(index);
  const xIndex = setXindex(index);
  const opacity = setOpacity(index);
  const scale = setScale(index);

  if (index === 2) return centerValue;

  return {
    x: xIndex,
    zIndex,
    opacity,
    scale,
    transition,
  };
};

const getArrAnimateValue = <T>(arr: T[]) => {
  return arr.map((item, i) => {
    if (i === 2) {
      return { ...centerValue };
    }
    return {
      ...getItemMotionInitial(i),
    };
  });
};

const sortArr = <T>(arr: T[], selectedIndex: number) => {
  const beforeArr = arr.slice(0, selectedIndex);
  const afterArr = arr.slice(selectedIndex, arr.length);

  return afterArr.concat(beforeArr);
};

export { getItemMotionInitial, setZIndex, sortArr, getArrAnimateValue };
