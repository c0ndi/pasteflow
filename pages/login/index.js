import Head from "next/head";
import { useAuth } from "../_app";
import { Box, Button, Input, Text } from "@mantine/core";
import { auth } from "../../config";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

const Home = () => {
	const { user, setUser } = useAuth();
	const Router = useRouter();

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

	useEffect(() => {
		if (user) {
			Router.push("/");
		}
	}, [user]);
	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "90vh" }}>
			<Head>
				<title>Login</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
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
		</Box>
	);
};

export default Home;
