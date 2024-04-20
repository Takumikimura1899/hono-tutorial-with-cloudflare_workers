import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

let blogPosts = [
  { id: '1', title: 'First Post', content: 'This is my first post' },
  { id: '1', title: 'First Post', content: 'This is my first post' },
  { id: '1', title: 'First Post', content: 'This is my first post' },
];

app.use('*', prettyJSON());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/posts', (c) => c.json({ posts: blogPosts }));

export default app;
