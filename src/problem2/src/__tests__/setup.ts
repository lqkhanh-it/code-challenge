import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { vi } from 'vitest';

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Mock ResizeObserver
vi.stubGlobal('ResizeObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

// Mock scrollIntoView
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true
});