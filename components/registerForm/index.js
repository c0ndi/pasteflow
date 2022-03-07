import { Box, Button, Input, Text } from "@mantine/core";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { ref, set } from "firebase/database";

function RegisterForm() {
	const inputUsername = useRef(null);
	const inputEmail = useRef(null);
	const inputPassword = useRef(null);

	const mobile = useMediaQuery("(max-width: 768px)");

	const Router = useRouter();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		if (
			formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
			formData.username.length > 3 &&
			formData.username.length < 24 &&
			formData.password.length > 3 &&
			formData.password.length < 24
		) {
			createUserWithEmailAndPassword(auth, formData.email, formData.password)
				.then((user) => {
					console.log(user);
					set(ref(db, `/users/${user.user.uid}`), {
						username: formData.username,
						userId: user.user.uid,
						followers: [user.user.uid],
						following: [user.user.uid],
					});

					Router.push("/login");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					console.log(errorCode);
					console.log(errorMessage);
				});
		} else {
			if (formData.username.length < 3 || formData.username.length > 24) {
				inputUsername.current.style = "border: 1px solid red";
			} else {
				inputUsername.current.style = "";
			}
			if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
				inputEmail.current.style = "border: 2px solid red;";
			}
			if (formData.password.length < 3 || formData.password.length > 24) {
				inputPassword.current.style = "border: 2px solid red";
			}
		}
	}

	function validateInput(inputField) {
		if (inputField.current.name == "email") {
			if (inputField.current.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
				inputField.current.style.border = "";
			} else {
				inputField.current.style.border = "2px solid red";
			}
		} else if (inputField.current.type == "text" || inputField.current.type == "password") {
			if (inputField.current.value.length > 3 && inputField.current.value.length < 24) {
				inputField.current.style.border = "0px";
			} else {
				inputField.current.style.border = "2px solid red";
			}
		}
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
					onBlur={() => validateInput(inputUsername)}
					ref={inputUsername}
					placeholder="Username"
					type="text"
					onChange={(e) => setFormData({ ...formData, username: e.target.value })}
				/>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your email</Text>
				<Input
					onBlur={() => validateInput(inputEmail)}
					ref={inputEmail}
					placeholder="Email"
					name="email"
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<Text sx={{ paddingTop: "0.75em" }}>Enter your password</Text>
				<Input
					onBlur={() => validateInput(inputPassword)}
					ref={inputPassword}
					placeholder="Password"
					type="password"
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
