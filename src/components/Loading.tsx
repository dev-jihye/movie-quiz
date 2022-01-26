import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

interface Iloading {
  loading: boolean;
}

export default function Loading({ loading }: Iloading) {
  const color = "#d73c36";
  return (
    <div className="my-32 sweet-loading">
      <BarLoader color={color} loading={loading} css={override} />
    </div>
  );
}
