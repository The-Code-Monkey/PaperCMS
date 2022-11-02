'use client'

import { useStyledComponentsRegistry } from '../lib/styled-components';
import { useServerInsertedHTML } from 'next/navigation';

export default function RootStyleRegistry({
                                            children,
                                          }: {
  children: React.ReactNode;
}) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] =
    useStyledComponentsRegistry();

  useServerInsertedHTML(() => {
    return <>{styledComponentsFlushEffect()}</>;
  });

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
}