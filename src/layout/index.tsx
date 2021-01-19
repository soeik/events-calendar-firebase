import * as React from "react";
import cx from "classnames";

interface LayoutElementProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export function Container({ children, className, style }: LayoutElementProps) {
  return (
    <div className={cx("container", className)} style={style}>
      {children}
    </div>
  );
}

export function Row({ children, className }: LayoutElementProps) {
  return <div className={cx("row", className)}>{children}</div>;
}

export interface ColumnProps extends LayoutElementProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}

export function Column({
  children,
  size = 12,
  offset,
  className,
}: ColumnProps) {
  const sizes = {
    1: "one column",
    2: "two columns",
    3: "three columns",
    4: "four columns",
    5: "five columns",
    6: "six columns",
    7: "seven columns",
    8: "eight columns",
    9: "nine columns",
    10: "ten columns",
    11: "eleven columns",
    12: "twelve columns",
  };
  const offsets = {
    1: "offset-by-one column",
    2: "offset-by-two columns",
    3: "offset-by-three columns",
    4: "offset-by-four columns",
    5: "offset-by-five columns",
    6: "offset-by-six columns",
    7: "offset-by-seven columns",
    8: "offset-by-eight columns",
    9: "offset-by-nine columns",
    10: "offset-by-ten columns",
    11: "offset-by-eleven columns",
  };
  return (
    <div className={cx(sizes[size], offsets[offset], className)}>
      {children}
    </div>
  );
}
