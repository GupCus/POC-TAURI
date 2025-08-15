import { useState } from "react";
import { AppShell, Group, ActionIcon, Burger, Text, MediaQuery, Navbar, Header } from "@mantine/core";
import "./App.css";
import Home from "./Home.tsx";
import { MemoryRouter, NavLink, Route, Routes } from "react-router-dom";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { MantineProvider } from "@mantine/core";
import { SunIcon, MoonIcon } from "@modulz/radix-icons";

function App() {
  const views = [{
    path: '/',
    name: 'Home',
    exact: true, //opcional!!
    component: Home
  /* 
  }, {
    acá para agregar otro elemento
  }
  */
  }]

  const [opened, setOpened] = useState(false)
  const defaultColorScheme = 'dark'
  const [colorScheme, setColorScheme] = useState(defaultColorScheme)
  
  const toggleColorScheme = (value?: 'light' | 'dark') => { //cambia entre oscuro y light
    const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(newValue)
  }

  const useStyles = createStyles((theme) => ({
    navLink: { //es css para que los botones se vean diferentes cuando pasamos el cursor por encima, o está la seccion seleccionada
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm, //controla los bordes -> .md para bordes redondeados, .lg para MÁS redondeados
      color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      textDecoration: 'none', //si se comenta, se ven como links, ej.: Home aparecería subrayado

      '&:hover': {
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], 
      }
    },
    navLinkActive: {
      backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    }
  }))

  const { classes } = useStyles()
  
  return (
    <MantineProvider
      theme={{fontFamily: 'Open Sans, sans serif', colorScheme: colorScheme }}
      withGlobalStyles
    >
      <MemoryRouter>
      <AppShell padding="md" navbarOffsetBreakpoint="sm" fixed
      navbar = {
        <Navbar width={{sm: 200}} padding="xs" hidden={!opened} hiddenBreakoint="sm">
          {
            views.map((view, index) =>
              <NavLink to={view.path} key={index} onClick={() => setOpened(false)} className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.navLinkActive: '')}>
                <Group><Text>{view.name}</Text></Group>
              </NavLink>
            )
          }
        </Navbar>
      } 
      header = {
        <Header height={70} padding="md">
          <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none'}}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={useMantineTheme().colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <h4>MiniNotes</h4>
            <div style={{marginLeft: "auto"}}>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon/>}
              </ActionIcon>
            </div>
          </div>
        </Header>
      } 
      styles = {theme => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      >
        <Routes>
          {
            views.map((view, index) => <Route key={index} exact={view.exact} path={view.path} element={<view.component />} />)
          }
        </Routes>
      </AppShell>
      </MemoryRouter>
    </MantineProvider>
  );
}

export default App;
