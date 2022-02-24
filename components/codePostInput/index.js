import { Button, Textarea, Box, Text } from "@mantine/core";
import { useState, useRef } from "react";
import { useAuth } from "../../pages/_app";
import { db } from "../../config";
import { ref, push, serverTimestamp } from "firebase/database";

function CodePostInput() {
	const [codePostData, setPostCodeData] = useState();
	const textarea = useRef(null);

	const { user } = useAuth();

	function addPost(codePostData) {
		textarea.current.value = "";
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
				minRows={10}
				maxRows={10}
				size="lg"
				onChange={(e) => setPostCodeData(e.target.value)}
				style={{ color: "red" }}
				ref={textarea}
			/>
			<Button sx={{ marginTop: "1em" }} onClick={() => addPost(codePostData)} radius="md">
				Add post
			</Button>
		</Box>
	);
}

export default CodePostInput;
