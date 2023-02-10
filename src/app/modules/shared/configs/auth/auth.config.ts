export const authConfigParameters: Record<string, string> = {
  redirect_uri: window.location.origin + '/login',
  client_id: 'ed0d8f594a7748b488fd1681e1500a03',
  scope: 'user-read-private user-read-email playlist-modify-public',
  response_type: 'code',
  code_challenge_method: 'S256',
};
