import type { Evolution } from "../types";
import { ASYNC_ERRORS } from "./async-errors";
import { FORM_VALIDATION } from "./form-validation";
import { REACT_LIFECYCLE } from "./react-lifecycle";
import { STATE_MANAGEMENT } from "./state-management";

export const EVOLUTIONS: Evolution[] = [
  REACT_LIFECYCLE,
  STATE_MANAGEMENT,
  FORM_VALIDATION,
  ASYNC_ERRORS,
];
