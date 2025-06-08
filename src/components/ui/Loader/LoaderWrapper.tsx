"use client";

import { useAnimation } from '@/context/AnimationContext';
import Loader from '.';

export default function LoaderWrapper() {
  const { loaderHidden } = useAnimation();
  return <Loader isLoading={!loaderHidden} />;
} 