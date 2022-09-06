import axios from "axios";

export async function FetchAPI(url) {
  const response = await axios.get(url);

  return response.data;
}
