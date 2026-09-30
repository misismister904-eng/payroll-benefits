/** Future integration boundary. This phase intentionally has no backend calls. */
export interface ApiClient {
  get<T>(path: string): Promise<T>
  post<T>(path: string, payload: unknown): Promise<T>
}

export const futureApiClient: ApiClient = {
  async get() { throw new Error('Future API integration boundary: GET is not connected in the UI prototype.') },
  async post() { throw new Error('Future API integration boundary: POST is not connected in the UI prototype.') },
}
