import * as React from "react";

import { RenderProps } from "./typedefs";

export function DefaultInnerWrapper({ attrs: _, children, ...props }: RenderProps) {
  return <div {...props}>{children}</div>;
}

export function DefaultTagsContainer({ attrs: _, children, ...props }: RenderProps) {
  return <div {...props}>{children}</div>;
}
