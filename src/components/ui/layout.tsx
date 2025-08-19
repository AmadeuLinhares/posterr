import type { PropsWithChildren } from "react";

import { Navbar } from "./navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {/*navbar*/}
      <Navbar />
      {/*content*/}
      <div className="p-6">{children}</div>
    </div>
  );
};
