import { SignupPayload } from "@/libs/types/userType";

export interface SignUpState {
  payload: SignupPayload;
  isDuplicated: boolean | null;
}

export type SignUpAction =
  | { type: "SET_PAYLOAD"; payload: Partial<SignupPayload> }
  | { type: "SET_IS_DUPLICATED"; isDuplicated: boolean | null }
  | {
      type: "UPDATE_SOCIAL_LINKS";
      payload: Partial<SignupPayload["socialLinks"]>;
    };
