function authenticate_user(router: any) {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const AuthenticatedUser = JSON.parse(storedUser);
    return AuthenticatedUser;
  } else {
    router.push("/login");
  }
  return null;
}
export default authenticate_user;
