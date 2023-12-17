import React, { Dispatch, SetStateAction } from "react";
import {
  ChromePicker,
  CirclePicker,
  SketchPicker,
  SliderPicker,
} from "react-color";

interface ColorPickerProps {
  customFontColor: string;
  setCustomFontColor: Dispatch<SetStateAction<string>>;
  setIsColorPickerOpen: Dispatch<SetStateAction<boolean>>;
}

const ColorPicker = ({
  customFontColor,
  setCustomFontColor,
  setIsColorPickerOpen,
}: ColorPickerProps) => {
  return (
    <div
      className={`absolute top-1/2 left-1/4 -translate-x-1/4 -translate-y-1/2 px-2 bg-white border border-gray-300 rounded-md overflow-hidden shadow-2xl z-30`}
    >
      <ChromePicker
        className={`pt-4 [&__input]:hidden [&__label]:text-white [&__svg]:hidden`}
        disableAlpha={true}
        color={customFontColor}
        onChange={(color) => {
          setCustomFontColor(color.hex);
        }}
        onChangeComplete={(color) => {
          setCustomFontColor(color.hex);
        }}
        styles={{
          default: {
            picker: {
              background: "transparent",
              border: "none",
              borderRadius: "0",
              boxShadow: "none",
            },
          },
        }}
      />
      <div className={`flex justify-between gap-3 px-2 py-3 bg-white`}>
        <button
          className={`px-6 py-2 text-md text-white bg-gray-400 hover:bg-white hover:text-gray-500 dark:text-warmGray-50  rounded-md`}
          onClick={() => {
            setCustomFontColor("");
            setIsColorPickerOpen(false);
          }}
        >
          Reset
        </button>
        <button
          className={`px-6 py-2 text-md text-white bg-primary rounded-md`}
          onClick={() => {
            setIsColorPickerOpen(false);
          }}
        >
          select
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
