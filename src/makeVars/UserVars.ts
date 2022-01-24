import { makeVar } from "@apollo/client";
import { me } from "../__generated__/me";

export const loginUserVar = makeVar<me | undefined>(undefined);
