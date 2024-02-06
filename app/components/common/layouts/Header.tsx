import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export function Header(props: HeaderProps) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="white"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          {/* <SearchIcon /> */}
        </IconButton>
        {/* <Button variant="outlined" size="small">
          Sign up
        </Button> */}
      </Toolbar>
    </React.Fragment>
  );
}
export default Header