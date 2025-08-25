export const formatUserName = (userName?: string) => {
  if (userName) {
    if (userName?.length > 14) return userName.slice(0, 14);
    return userName;
  }

  return "";
};
