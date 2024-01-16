import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter({
			// Output docs/ as output to be more compatible with Github Pages.
			pages: 'docs',
			assets: 'docs',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
	},
};
