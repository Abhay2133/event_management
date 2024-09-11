export interface APIResponse {
  type:'success' | 'error',
  message : string
}

export interface ErrorResponse {
  type ?:'error',
  message : string,
}