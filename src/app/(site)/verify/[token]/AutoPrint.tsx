"use client";

import { useEffect } from "react";

/**
 * Opens the print / Save-as-PDF dialog automatically once the clean certificate
 * page has rendered. Used when the dashboard's "Download certificate" button
 * opens /verify/<token>?print=1 in a new tab, so downloading is one click. The
 * small delay lets fonts and the certificate settle before the dialog snapshots
 * the page.
 */
export function AutoPrint() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 500);
    return () => clearTimeout(t);
  }, []);
  return null;
}
