import Parse from "./parse";

export async function registerUser(email, password) {
  const user = new Parse.User();
  user.set("username", email);
  user.set("email", email);
  user.set("password", password);

  try {
    await user.signUp();
    return user;
  } catch (error) {
    console.error("Error while signing up user:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const user = await Parse.User.logIn(email, password);
    return user;
  } catch (error) {
    console.error("Error while logging in user:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await Parse.User.logOut();
    return true;
  } catch (error) {
    console.error("Error while logging out user:", error);
    throw error;
  }
}

export function getCurrentUser() {
  return Parse.User.current();
}