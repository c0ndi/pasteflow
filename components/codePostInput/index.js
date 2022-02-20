import { Button, Textarea, Box, Text } from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../../pages/_app";
import { db } from "../../config";
import { ref, push, serverTimestamp } from "firebase/database";

function CodePostInput() {
	const { user } = useAuth();
	const [codePostData, setPostCodeData] = useState();

	function addPost(codePostData) {
		push(ref(db, "/posts/" + user.uid), {
			postData: codePostData,
			author: user.email,
			authorId: user.uid,
			date: serverTimestamp(),
		});
	}
	return (
		<Box>
			<Text sx={{ color: "white", fontSize: "1.5rem", paddingBottom: "0.25em" }}>Your code!</Text>
			<Textarea
				placeholder="np. console.log('Hello world')"
				autosize
				minRows={5}
				size="lg"
				onChange={(e) => setPostCodeData(e.target.value)}
				style={{ color: "red" }}
			/>
			<Button sx={{ marginTop: "1em" }} onClick={() => addPost(codePostData)} radius="md">
				Add post
			</Button>
		</Box>
	);
}

export default CodePostInput;
