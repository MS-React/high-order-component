export function getUserId(user = {}) {
  return user._id ? user._id : user.id;
}
