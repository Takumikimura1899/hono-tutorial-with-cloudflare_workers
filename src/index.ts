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

export default app;
