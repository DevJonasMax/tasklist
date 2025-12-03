import { Api } from "@/app/lib/api";
import { User } from "@/app/types/user";


export async function getUser() {
  try {
    const user = await Api.get<User>('/users/me');
    return user.data;
  } catch (error) {
    throw error;
  }
}