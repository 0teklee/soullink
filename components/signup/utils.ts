import { SignUpAction, SignUpState } from "@/components/signup/type";

export const payloadReducer = (
  state: SignUpState,
  action: SignUpAction,
): SignUpState => {
  switch (action.type) {
    case "SET_PAYLOAD":
      return { ...state, payload: { ...state.payload, ...action.payload } };
    case "SET_IS_DUPLICATED":
      return { ...state, isDuplicated: action.isDuplicated };
    case "UPDATE_SOCIAL_LINKS":
      return {
        ...state,
        payload: {
          ...state.payload,
          socialLinks: {
            ...state.payload.socialLinks,
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};
