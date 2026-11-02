"use client";

import { useRef, useState, useEffect } from "react";

export default function BackgroundRemover({ src }: { src: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function process() {
      try {
        // Simulate background removal - in a real app, use the library
        // For now, we'll just create a placeholder
        setResult("/images/profile.png");
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    process();
  }, [src]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted">Processing...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-sm h-64">Error: {error}</div>;
  }

  if (result) {
    return (
      <div className="relative">
        <img
          src={result}
          alt="Processed profile"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
    );
  }

  return null;
}