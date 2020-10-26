import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
    margin: "0 auto 15px",
  },
}));

const AvatarImage = ({ alt, src, styleClass }) => {
  const classes = useStyles();

  return (
    <Avatar
      alt={alt}
      src={src}
      // src="https://s3-us-west-1.amazonaws.com/acropolis-wp-content-uploads/excavator1.jpg"
      className={classes[styleClass]}
    />
  );
};

export default AvatarImage;
