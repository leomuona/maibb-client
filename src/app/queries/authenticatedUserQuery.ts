import { authenticatedUserRequest } from "../api/authentication";

export const authenticatedUserQuery = {
  queryKey: ["authenticatedUser"],
  queryFn: async () => {
    try {
      return await authenticatedUserRequest();
    } catch (_err) {
      return null;
    }
  },
};
