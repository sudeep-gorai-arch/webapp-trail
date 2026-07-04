import { userService } from "./userService";

export const getProfile = () => userService.me();
