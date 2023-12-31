import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import SwitchToggle from "./SwitchToggle";
import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
 } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';



const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${ rem(8) } ${ rem(12) }`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
 }));



export function Navbar() {
  const [ opened, { toggle, close }] = useDisclosure(false);
  const { logoutService, user } = useBoundStore((state) => state);
  const { classes, cx } = useStyles();

  const onLogout = () => {
    logoutService();
  };

  const links = !!user ? [
      { link: "/", label: "LOGO" }
    , { link: "/", label: "Home" }
    , { link: "posts", label: "Posts" }
    , { link: "/", label: "Logout", clicks: onLogout }
    ] : [
      { link: "/", label: "LOGO" }
    , { link: "/", label: "Home" }
    , { link: "login", label: "Login" }
    ];

  const [ active, setActive] = useState(links[0].link);


  const items = links.map((link) => (
    <NavLink
      key={ link.label }
      to={ link.link }
      className={ cx(classes.link, { [classes.linkActive]: active === link.link }) }
      onClick={ link.clicks }
    >
      { link.label }
    </NavLink>
  ));

  return (
      <Header  height={ 60 } px="md" position="apart">
       <Container className={classes.header}>
        <Group spacing={ 5 } className={ classes.links }>
            { items }
            <SwitchToggle/>
          </Group>
        </Container>
      </Header>
  );
 }

export default Navbar;