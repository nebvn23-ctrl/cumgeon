"use client";

import IdentityScanner from "@/components/lore/IdentityScanner";

export default function ScannerScene() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-trench-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(202,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(202,255,0,0.06) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-trench-950 via-transparent to-trench-950" />
      <div className="relative z-10 mt-10 sm:mt-0 sm:ml-auto sm:mr-24">
        <IdentityScanner />
      </div>
    </div>
  );
}
