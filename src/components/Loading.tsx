import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #d73c36;
`;

interface Iloading {
  loading: boolean;
}

export default function Loading({ loading }: Iloading) {
  const color = "#0a0808";
  return (
    <div className="my-32 sweet-loading">
      <BarLoader color={color} loading={loading} css={override} />
    </div>
  );
}
