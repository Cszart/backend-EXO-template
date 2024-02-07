/**
  	Represents the structure of an HTTP response.
	@template T - The type of the data in the response.


	Note: This implementation might vary depending on the project.
	The final idea is that every project uses the same HTTP response structure,
	which may imply that the backend should handle responses better and consistently. 
 */
export interface HttpResponseI<T> {
  status: number; // The HTTP status code of the response.
  message: string; // A descriptive message about the response.
  data: T; // The actual data returned by the API, which can be a single item of type T or an array of type T.
}
