import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

let blogPosts = [
  { id: '1', title: 'First Post', content: 'This is my first post' },
  { id: '2', title: 'First Post', content: 'This is my first post' },
  { id: '3', title: 'First Post', content: 'This is my first post' },
];

app.use('*', prettyJSON());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/posts', (c) => c.json({ posts: blogPosts }));

app.get('/posts/:id', (c) => {
  const id = c.req.param('id');
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return c.json({ error: 'not found post' }, 404);
  }
  return c.json({ post });
});

app.post('/posts', async (c) => {
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  const newPost = { id: String(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

app.put('/posts/:id', async (c) => {
  const id = c.req.param('id');
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    return c.json({ error: 'not found post' }, 404);
  }
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  blogPosts[index] = { ...blogPosts[index], title, content };
  return c.json(blogPosts[index], 200);
});

export default app;
