import { HttpResponseI } from '../models/httpResponse.interface';

/**
 * Constructs an HttpResponse object with the provided status, message, and data.
 * @template T - The type of the data in the response.
 * @param {number} status - The HTTP status code of the response.
 * @param {string} message - A descriptive message about the response.
 * @param {T} data - The actual data returned by the API.
 * @returns {HttpResponseI<T>} - The HttpResponse object.
 */
export function HttpResponse<T>(status: number, message: string, data: T): HttpResponseI<T> {
  return {
    status: status,
    message: message,
    data: data,
  };
}
