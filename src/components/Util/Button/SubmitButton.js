import { Button } from "@/components/ui/button";
import React from "react";

const classCss =
  "py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-5";
export default function SubmitButton({
  title = "",
  className = classCss,
  loading = false,
  disabled,
  handleClick,
}) {
  return (
    <Button
      type="submit"
      id="submit"
      className={className}
      defaultValue={title}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? "Sending..." : title}
    </Button>
  );
}
