enum ZIndex {
  CenterSides = 1,
  SideEnds = 0,
}

enum Opacity {
  CenterSides = 0.7,
  SideEnds = 0.5,
}

enum Scale {
  CenterSides = 0.9,
  SideEnds = 0.5,
}

enum Direction {
  Left = -1,
  Right = 1,
}

const { Left, Right } = Direction;

const getZIndex = (distanceToCenter: number) => {
  return distanceToCenter === 2 ? ZIndex.SideEnds : ZIndex.CenterSides;
};

const getOpacity = (distanceToCenter: number) => {
  return distanceToCenter === 2 ? Opacity.SideEnds : Opacity.CenterSides;
};

const getScale = (distanceToCenter: number) => {
  return distanceToCenter === 2 ? Scale.SideEnds : Scale.CenterSides;
};

const getDirection = (activeIndex: number, index: number) => {
  const distance = (index - activeIndex + 5) % 5;
  return distance > 2 ? Left : Right;
};

const getXIndex = (distanceToCenter: number, direction: number) => {
  return distanceToCenter === 2
    ? 240 * direction
    : 120 * (2 - distanceToCenter) * direction;
};

const getItemMotionInitial = <T>(
  index: number,
  arr: T[],
  activeIndex: number,
) => {
  const relativeIndex = (index - activeIndex + arr.length) % arr.length;
  const distanceToCenter = Math.min(
    relativeIndex,
    Math.abs(arr.length - relativeIndex),
  );

  const zIndex = getZIndex(distanceToCenter);
  const opacity = getOpacity(distanceToCenter);
  const scale = getScale(distanceToCenter);
  const direction = getDirection(activeIndex, index);
  const xIndex = getXIndex(distanceToCenter, direction);

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

export { getItemMotionInitial };
