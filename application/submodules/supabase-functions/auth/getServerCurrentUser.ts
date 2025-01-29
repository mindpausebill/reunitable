import { getServerUser } from "./getServerUser";
import { use } from "react";
import { getServerSessionUser } from "./getServerSessionUser";

export const getServerCurrentUser = async () => {
  const user = await getServerSessionUser();
  let serverUser = undefined;
  if (user) {
    const { data: serverUserData, error } = await getServerUser(user.id);
    serverUser = serverUserData;
  }
  return serverUser;
};

export const useServerCurrentUser = () => {
  return use(getServerCurrentUser());
};
