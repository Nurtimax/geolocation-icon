/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const updateUserProfile = async (updates: any, id: string) => {
  const response = await axios.put(
    `https://nearant-me-default-rtdb.europe-west1.firebasedatabase.app/location/${id}.json`,
    updates
  );

  return response.data;
};
