import { Prism } from "@mantine/prism";
import { Box } from "@mantine/core";
import Link from "next/link";

function CodePost({ author, date, postData, authorId }) {
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
