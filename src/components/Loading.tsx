import { useState } from "react";
import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #d73c36;
`;

export default function Loading({ loading }: any) {
  const [color, setColor] = useState("#d73c36");
  return (
    <div className="my-32 sweet-loading">
      <BarLoader color={color} loading={loading} css={override} />
    </div>
  );
}
