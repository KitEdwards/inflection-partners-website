import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

// Exposes the Lenis instance created in Layout so pages can drive smooth scrolling
export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);
