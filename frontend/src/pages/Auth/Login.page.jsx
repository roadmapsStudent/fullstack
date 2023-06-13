import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { CircleLoader } from "react-spinners";
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button, } from '@mantine/core';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <Container size={420} my={40}>
      { authLoading ? <h2 style={{ textAlign:"center" }}>Loads<CircleLoader color="red" /></h2> :
        <div>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
          <form onSubmit={onLogin}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput label="Email" placeholder="you@my.bcit.ca" name="email" required />
              <PasswordInput label="Password" placeholder="Your password" name="password" required mt="md" />
              <Group position="apart" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">Sign In</Button>

            </Paper>
          </form>
        </div>
         }
      </Container>
    </div>
  );
};

export default LoginPage;
