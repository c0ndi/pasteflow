import { Box, Button, Input, Text } from "@mantine/core";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import Link from "next/link";
import { useRouter } from "next/router";

function RegisterForm() {
	const Router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, formData.email, formData.password)
			.then(() => {
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
			<Box sx={{ width: 350, display: "flex", gap: "1em", flexDirection: "column" }}>
				<Text sx={{ fontSize: "1.75rem", fontWeight: "600" }}>Register your account</Text>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your email</Text>
				<Input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
				<Text sx={{ paddingTop: "0.75em" }}>Enter your password</Text>
				<Input
					placeholder="Password"
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				<Button type="submit" sx={{ marginTop: "1em" }}>
					Register account
				</Button>
			</Box>
			<Text sx={{ textAlign: "center", paddingTop: "1em", display: "flex", justifyContent: "center" }}>
				Already have account?{" "}
				<Text sx={{ color: "blue" }}>
					&nbsp;
					<Link href={"/login"}>Click here</Link>
				</Text>
			</Text>
		</form>
	);
}

export default RegisterForm;
