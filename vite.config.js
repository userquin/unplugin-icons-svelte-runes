import process from 'node:process'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import PluginInspect from 'vite-plugin-inspect'

const options = process.env.CUSTOM_COMPILER === 'true'
  ? {
      compiler: {
        extension: 'svelte',
        compiler: compilerFactory(),
      },
    }
  : { compiler: 'svelte' }

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    svelte(),
    Icons(options),
    PluginInspect({ build: true }),
  ],
})

function customSvelteCompiler(svg) {
  const openTagStart = svg.indexOf('<svg ')
  const openTagEnd = svg.indexOf('>', openTagStart)
  const closeTagStart = svg.lastIndexOf('</svg')
  const attributes = svg.slice(openTagStart + 5, openTagEnd)
  const content = svg.slice(openTagEnd + 1, closeTagStart)
  return `<script>
  import CustomSvg from "/src/CustomSvg.svelte";
  const content=\`${content.replace(/`/g, '&#96;')}\`;
</script>
<CustomSvg ${attributes} {...$$props} {content}/>
`
}

// to show how to use async
async function compilerFactory() {
  return Promise.resolve(customSvelteCompiler)
}
