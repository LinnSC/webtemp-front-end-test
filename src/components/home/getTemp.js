import { BASE_URL, LAT_PARAM, LON_PARAM } from "../../utils/constants/api";
import axios from "axios";

export const getTemp = async (lat, lon) => {
  const result = await axios.get(
    `${BASE_URL}${LAT_PARAM}${lat}${LON_PARAM}${lon}`
  );
  if (result.status !== 200) return [];

  return result.data;
};
