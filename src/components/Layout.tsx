import { ReactChild, ReactChildren } from "react";
import Nav from "./Nav";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

export default function Layout({ children }: AuxProps) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
