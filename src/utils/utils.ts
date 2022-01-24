export const getAvatar = (username: string) =>
  encodeURI(
    `https://ui-avatars.com/api/?name=${username}&color=7F9CF5&background=EBF4FF`
  );
