import { jsonPlaceholderService } from "./jsonPlaceholderService";

// Conserva el nombre usado por el ejemplo del profesor, con un solo servicio HTTP.
export const placeHolderServices = {
  get: jsonPlaceholderService.getById,
};
