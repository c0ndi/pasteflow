import { Box, Button, Input, Text } from "@mantine/core";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { onValue, push, ref, set } from "firebase/database";

function RegisterForm() {
	const mobile = useMediaQuery("(max-width: 768px)");

	const Router = useRouter();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, formData.email, formData.password)
			.then((user) => {
				console.log(user);
				set(ref(db, `/users/${user.user.uid}`), {
					username: formData.username,
					userId: user.user.uid,
					followers: [user.user.uid],
				});

				Router.push("/login");
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
			<Box
				sx={{
					width: `${mobile ? "300px" : "400px"}`,
					display: "flex",
					gap: "1em",
					flexDirection: "column",
					color: "#fff",
				}}
			>
				<Text sx={{ fontSize: "1.75rem", fontWeight: "600" }}>Register your account</Text>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your username</Text>
				<Input
					placeholder="Username"
					onChange={(e) => setFormData({ ...formData, username: e.target.value })}
				/>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your email</Text>
				<Input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
				<Text sx={{ paddingTop: "0.75em" }}>Enter your password</Text>
				<Input
					placeholder="Password"
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				<Button type="submit" sx={{ marginTop: "1em" }} radius="md">
					Register account
				</Button>
			</Box>
			<Text
				sx={{
					textAlign: "center",
					paddingTop: "1em",
					display: "flex",
					justifyContent: "center",
					color: "#fff",
				}}
			>
				Already have account?{" "}
				<Text sx={{ color: "#228be6" }}>
					&nbsp;
					<Link href={"/login"}>Click here</Link>
				</Text>
			</Text>
		</form>
	);
}

export default RegisterForm;
