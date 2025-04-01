import { SxProps, Typography, TypographyProps } from "@mui/material";

// Define the props interface
interface ClampedTextProps extends TypographyProps {
  text: string;
  lines?: number;
  lineHeight?: number;
  textSx?: SxProps;
  textAttr?: React.HTMLProps<HTMLSpanElement>;
}

const ClampedText = ({
  text,
  lines = 3,
  lineHeight = 24,
  textSx,
  textAttr,
}: ClampedTextProps) => {
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: lines,
    lineHeight: `${lineHeight}px`,
    maxHeight: `${lines * lineHeight}px`,
    ...textSx,
  };

  return (
    <Typography style={clampStyle} {...textAttr}>
      {text}
    </Typography>
  );
};

export default ClampedText;
