const getDirection = <T>(index: number, activeIndex: number, arr: T[]) => {
  console.log(index, activeIndex, arr.length / 2, arr.length / 2 > index);
  return arr.length / 2 > index ? 1 : -1;
};

const getIsCenterSide = <T>(index: number, activeIndex: number, arr: T[]) => {
  return (
    activeIndex === index + 1 ||
    activeIndex === index - 1 ||
    (activeIndex === arr.length - 1 && index === 0) ||
    (activeIndex === 0 && index === arr.length - 1)
  );
};

const getIsSideEnds = <T>(index: number, activeIndex: number, arr: T[]) => {
  return (
    activeIndex === index + 2 ||
    activeIndex === index - 2 ||
    (activeIndex === arr.length - 1 && index === 1) ||
    (activeIndex === 0 && index === arr.length - 2)
  );
};

const getPositions = <T>(index: number, activeIndex: number, arr: T[]) => {
  return {
    direction: getDirection(index, activeIndex, arr),
    isCenterSide: getIsCenterSide(index, activeIndex, arr),
    isSideEnds: getIsSideEnds(index, activeIndex, arr),
  };
};

const setZIndex = <T>(index: number, activeIndex: number, arr: T[]) => {
  const { isCenterSide, isSideEnds } = getPositions(index, activeIndex, arr);

  if (isCenterSide) {
    return 1;
  }
  if (isSideEnds) {
    return 0;
  }

  return -1;
};

const setOpacity = <T>(index: number, activeIndex: number, arr: T[]) => {
  const { isCenterSide, isSideEnds } = getPositions(index, activeIndex, arr);

  if (isCenterSide) {
    return 0.7;
  }

  if (isSideEnds) {
    return 0.4;
  }

  if (index === 0 && activeIndex === arr.length - 1) {
    return 0.4;
  }

  return 0;
};

const setXindex = <T>(index: number, activeIndex: number, arr: T[]) => {
  const { isCenterSide, isSideEnds, direction } = getPositions(
    index,
    activeIndex,
    arr,
  );

  if (isCenterSide) {
    return 120 * direction;
  }

  if (isSideEnds) {
    return 240 * direction;
  }

  return 0;
};

const setScale = <T>(index: number, activeIndex: number, arr: T[]) => {
  const { isCenterSide, isSideEnds } = getPositions(index, activeIndex, arr);

  if (isCenterSide) {
    return 0.9;
  }

  if (isSideEnds) {
    return 0.8;
  }
};

const getItemMotionInitial = <T>(
  index: number,
  arr: T[],
  activeIndex: number,
) => {
  const zIndex = setZIndex(index, activeIndex, arr);
  const xIndex = setXindex(index, activeIndex, arr);
  const opacity = setOpacity(index, activeIndex, arr);
  const scale = setScale(index, activeIndex, arr);

  const transition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  const centerValue = {
    x: 0,
    zIndex: 2,
    opacity: 1,
    scale: 1,
    transition,
  };

  return {
    center: centerValue,
    initial: {
      x: xIndex,
      zIndex,
      opacity,
      scale,
      transition,
    },
  };
};

const sortArr = <T>(arr: T[], activeIndex: number) => {
  const beforeArr = arr.slice(0, activeIndex);
  const afterArr = arr.slice(activeIndex, arr.length);

  return afterArr.concat(beforeArr);
};

export { getItemMotionInitial, setZIndex, sortArr };
