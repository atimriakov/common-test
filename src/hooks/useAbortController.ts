import { useEffect, useState } from 'react';

export function useAbortController() {
  const [controller] = useState(new AbortController());

  useEffect(() => () => controller.abort(), []);

  return controller;
}
