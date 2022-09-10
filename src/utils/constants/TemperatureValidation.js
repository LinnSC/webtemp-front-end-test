import * as yup from "yup";
import { LAT_MIN, LAT_MAX, LON_MIN, LON_MAX } from "./registration";

export const schema = yup.object().shape({
  lat: yup
    .number()
    .typeError(`You have to put in a number between ${LAT_MIN} and ${LAT_MAX}`)
    .min(LAT_MIN, `You can not put in a lower value than ${LAT_MIN}`)
    .max(LAT_MAX, ` You can not put in a higher value than ${LAT_MAX}`)
    .required("Latitude is required"),

  lon: yup
    .number()
    .typeError(`You have to put in a number between ${LON_MIN} and ${LON_MAX}`)
    .min(LON_MIN, `You can not put in a lower value than ${LON_MIN} `)
    .max(LON_MAX, ` You can not put in a higher value than ${LON_MAX}`)
    .required("Longitude is required"),
});
