"use client";

import { useAnimation } from '@/context/AnimationContext';
import Loader from './Loader';

export default function ClientLoader() {
  const { loaderHidden } = useAnimation();
  return <Loader isLoading={!loaderHidden} />;
} 