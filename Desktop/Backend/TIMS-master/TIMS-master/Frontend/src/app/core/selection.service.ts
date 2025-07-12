import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private readonly KEY = 'user-selection';

  setSelection(company: string, division: string, branch: string): void {
    sessionStorage.setItem(this.KEY, JSON.stringify({ company, division, branch }));
  }

  get company(): string | null {
    return this.get()?.company ?? null;
  }

  get division(): string | null {
    return this.get()?.division ?? null;
  }

  get branch(): string | null {
    return this.get()?.branch ?? null;
  }

  clear(): void {
    sessionStorage.removeItem(this.KEY);
  }

  private get(): { company: string; division: string; branch: string } | null {
    const raw = sessionStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
