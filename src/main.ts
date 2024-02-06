import App from './App.svelte'
import { createRoot } from 'svelte';

const app = createRoot(App, {
  target: document.getElementById('app')!
});

export default app
