import * as React from "react";

export function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="container" style={{ minWidth: "25rem", width: "50vw", maxWidth: "50vw" }}>
      {children}
    </div>
  );
}
