import { Prism } from "@mantine/prism";
import { Box } from "@mantine/core";
import Link from "next/link";

function CodePost({ author, date, postData, authorId }) {
	const langs = [
		"markup",
		"bash",
		"clike",
		"c",
		"cpp",
		"css",
		"javascript",
		"jsx",
		"coffeescript",
		"actionscript",
		"css-,extr",
		"diff",
		"git",
		"go",
		"graphql",
		"handlebars",
		"json",
		"less",
		"makefile",
		"markdown",
		"objectivec",
		"ocaml",
		"python",
		"reason",
		"sass",
		"scss",
		"sql",
		"stylus",
		"tsx",
		"typescript",
		"wasm",
		"yaml",
	]; // todo

	return (
		<Box sx={{ padding: "2em 0", color: "#ced4da" }}>
			<Link href={`/${authorId}`} passHref>
				<Box sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
					<p>{author}</p>
					<p>{new Date(date).toLocaleDateString()}</p>
				</Box>
			</Link>
			<Prism language="js" colorScheme="dark" withLineNumbers>
				{postData}
			</Prism>
		</Box>
	);
}

export default CodePost;
