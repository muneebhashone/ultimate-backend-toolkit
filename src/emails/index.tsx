import { Button, Html, render } from "@react-email/components";
import * as React from "react";

export const Email = () => {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me Muneeb
      </Button>
    </Html>
  );
};

export default Email;

export const emailHtmlString = render(<Email />);
