"use client";

import { Heart, Circle } from "lucide-react";

// Paw print SVG component
const PawPrint = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 20.5c-4.5 0-8-2.5-8-5.5s3.5-5.5 8-5.5 8 2.5 8 5.5-3.5 5.5-8 5.5zm-5-12c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5zm8 0c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-