import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Grid, SimpleGrid, Skeleton, Button, useMantineTheme, rem, Paper, createStyles, TextInput,  Group, Box } from '@mantine/core';
import { useForm } from "@mantine/form";
import useBoundStore from "../../store/Store";


const PRIMARY_COL_HEIGHT = rem(610);
const PICTURES = rem(560);
const CONTENT = rem(200);
const DETAIL = rem(100);
let screenview = 0;

const useStyles = createStyles((theme) => ({
  Paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  card: {
    height: PRIMARY_COL_HEIGHT,
    width: rem(1200),
    backgroundColor: "lightgrey",
  },

  picture: {
    height: PICTURES,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: PICTURES,
  },
  content: {
    height: CONTENT,
  },
  detail: {
    height: DETAIL,
  }
}));


function PostDetailsPage(props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [editing, setEditing] = useState(0);
  const posts = useLoaderData();
  const stateuser = useBoundStore((state) => { return state.user; });
  const navigate = useNavigate();

  let edit;

  if(editing==0) {

    if(stateuser.email.split("@")[0] === posts.authorname) {
      edit =
        <Grid.Col>
          <Button className={classes.Paper} onClick={() => { setEditing(1); }}>
            Edit
          </Button>
        </Grid.Col> ;
    }
  }

  const viewScreen =
    <>
      <Container my="md">
        <Paper shadow="md" p="xl" radius="md" className={classes.card}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Grid gutter="md">
              <Grid.Col>
                <Paper shadow="md" p="xl" radius="md" className={classes.detail} >
                  {posts.authorname}
                </Paper>
              </Grid.Col>
              <Grid.Col>
                <Paper shadow="md" p="xl" radius="md" className={classes.detail} >
                  {posts.title}
                </Paper>
              </Grid.Col>
              <Grid.Col>
                <Paper shadow="md" p="xl" radius="md" className={classes.detail} >
                  {posts.category}
                </Paper>
              </Grid.Col>
              <Grid.Col>
                <Paper shadow="md" p="xl" radius="md" className={classes.content} >
                  { posts.content }
                </Paper>
              </Grid.Col>
              { edit }
            </Grid>
            <Paper shadow="md" p="xl" radius="md"
              sx={{ backgroundImage: `url(${posts.image})` }}
              className={classes.picture} />
          </SimpleGrid>
        </Paper>
      </Container>
    </>;

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/postss`, values);
    if (res?.data.success) {
      navigate("/posts");
    }
  };

let  form = useForm({
    initialValues: {
      title:    posts.title,
      category: posts.category,
      image:    posts.image,
      content:  posts.content,
      id:       posts.id,
    },
  });


  const editScreen =
    <>
      <Box maw={600} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter a Title"
            {...form.getInputProps("title")}
          />

          <TextInput
            label="Category"
            placeholder="Enter a Category"
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder="Enter an Image"
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Content"
            placeholder="Enter some content"
            {...form.getInputProps("content")}
          />
          <Group position="right" mt="md">
            <Button className={classes.Paper} type="submit">
                Update
            </Button>
          </Group>
        </form>

      </Box>
    </>;

  if(editing == 0) {
    return viewScreen;
  } else {
    return editScreen;
  }
}


export const postDetailsLoader = async ({ params }) => {
  let url = `${DOMAIN}/api/posts/:id=`+params.id;
  const res = await axios.get(url);
  return res.data;
};

export default PostDetailsPage;
