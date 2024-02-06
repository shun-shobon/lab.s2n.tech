import { shun_shobon } from "@shun-shobon/eslint-config";

export default shun_shobon(
	{},
	{
		files: ["**/*.astro"],
		rules: {
			"astro/jsx-a11y/control-has-associated-label": [
				"error",
				{
					ignoreElements: ["canvas"],
				},
			],
		},
	},
);
