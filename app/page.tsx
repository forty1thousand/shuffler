import dyn from "next/dynamic";

export const dynamic = "force-static" as const;

export default dyn(() => import("./real"), { ssr: false });
