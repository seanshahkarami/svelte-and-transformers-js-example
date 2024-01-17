import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter({
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		paths: {
			base: '/svelte-and-transformers-js-example',
		}
	},
};
