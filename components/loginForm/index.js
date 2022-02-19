import { useAuth } from "../../pages/_app";
import { Box, Button, Input, Text } from "@mantine/core";
import { auth } from "../../config";
import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
	const { setUser } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();

		signInWithEmailAndPassword(auth, formData.email, formData.password)
			.then((userCredential) => {
				const user = userCredential.user;

				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);
			});
	}
	return (
		<form onSubmit={handleSubmit}>
			<Box sx={{ width: 350, display: "flex", gap: "1em", flexDirection: "column" }}>
				<Text sx={{ fontSize: "1.75rem", fontWeight: "600" }}>Log in</Text>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your email</Text>
				<Input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
				<Text sx={{ paddingTop: "0.75em" }}>Enter your password</Text>
				<Input
					placeholder="Password"
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				<Button type="submit" sx={{ marginTop: "1em" }}>
					Log in
				</Button>
			</Box>
			<Text sx={{ textAlign: "center", paddingTop: "1em", display: "flex", justifyContent: "center" }}>
				Don't have account?{" "}
				<Text sx={{ color: "blue" }}>
					&nbsp;
					<Link href={"/register"}>Click here</Link>
				</Text>
			</Text>
		</form>
	);
}

export default LoginForm;
