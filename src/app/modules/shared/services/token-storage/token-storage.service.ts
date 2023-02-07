import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRES_AT_KEY = 'expires_at';
const CODE_VERIFIER_KEY = 'code_verifier';

@Injectable()
export class TokenStorageService {
  constructor() {}

  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  get expiresAt(): string | null {
    return localStorage.getItem(EXPIRES_AT_KEY);
  }

  get expiresAtDate(): Date {
    return new Date(+(this.expiresAt || ''));
  }

  get codeVerifier(): string | null {
    return localStorage.getItem(CODE_VERIFIER_KEY);
  }

  saveCodeVerifier(codeVerifier: string): void {
    localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);
  }

  saveTokenResponse(accessToken: string, expiresAt: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
