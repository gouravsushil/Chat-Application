export const host = "http://localhost:5000";

export const registerRoute = `${host}/api/auth/register`; // The register route is defined here. The register route is the route that the client will use to register a user. The register route is a string that contains the host and the path to the register endpoint on the server. The register route is exported so that it can be used in other files.
export const loginRoute = `${host}/api/auth/login`; // The login route is defined here. The login route is the route that the client will use to login a user. The login route is a string that contains the host and the path to the login endpoint on the server. The login route is exported so that it can be used in other files.
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getMessagesRoute = `${host}/api/messages/getmsg`;
