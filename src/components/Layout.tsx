import { ReactChild, ReactChildren } from "react";
import Nav from "./Nav";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

export default function Layout({ children }: AuxProps) {
  return (
    <div>
      <Nav />
      <div className="bg-white pt-12 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
