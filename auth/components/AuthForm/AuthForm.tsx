"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { SignUpSchema, loginSchema, signUpSchema } from "@/auth/schemas";
import { AuthAction } from "@/auth/types";
import { Button, Input } from "@/components/ui";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import { OAuth } from "../OAuth";

export const AuthForm = () => {
	const [authAction, setAuthAction] = useState<AuthAction>("login");
	const [requestError, setRequestError] = useState<string | null>(null);
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		register,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(authAction === "login" ? loginSchema : signUpSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const toggleAuthAction = () => {
		setAuthAction(authAction === "login" ? "signup" : "login");
	};

	const supabase = createClientComponentClient<Database>();

	const onSubmit = handleSubmit(async (data) => {
		const { email, password } = data;

		setRequestError(null);

		try {
			const method = authAction === "login" ? "signInWithPassword" : "signUp";
			const response = await supabase.auth[method]({
				email,
				password,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`,
				},
			});

			if (response.error?.status === 400) {
				setRequestError("Invalid credentials");
				setError("email", { message: "" });
				setError("password", { message: "" });
			}

			response.data.session && router.refresh();
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
		}
	});

	const cardText = {
		title: authAction === "login" ? "Login" : "Register",
		description:
			authAction === "login"
				? "Add your details below to get back into the app"
				: "Let’s get you started sharing your links!",
		footer:
			authAction === "login"
				? "Don't have an account yet?"
				: "Already have an account?",
		passwordPlaceholder:
			authAction === "login" ? "Enter your password" : "At least 8 characters",
		changeActionButton: authAction === "login" ? "Create new account" : "Login",
	};

	const authProviders = [
		{ provider: "google" as Provider, icon: <FcGoogle size="30px" /> },
		{ provider: "github" as Provider, icon: <FaGithub size="30px" /> },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="mb-2 text-2xl sm:text-3xl">
					{cardText.title}
				</CardTitle>
				<CardDescription>{cardText.description}</CardDescription>
			</CardHeader>
			<CardContent>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={onSubmit} className="flex flex-col gap-6">
					<Input
						{...register("email")}
						type="email"
						label="Email address"
						placeholder="e.g. johndoe@email.com"
						icon="/images/icon-email.svg"
						error={Boolean(errors.email)}
						errorMessage={errors.email?.message}
					/>
					<Input
						{...register("password")}
						label="Password"
						type="password"
						placeholder={cardText.passwordPlaceholder}
						icon="/images/icon-password.svg"
						error={Boolean(errors.password)}
						errorMessage={errors.password?.message}
					/>
					{authAction === "signup" && (
						<Input
							{...register("passwordConfirmation")}
							label="Password Confirmation"
							type="password"
							placeholder={cardText.passwordPlaceholder}
							icon="/images/icon-password.svg"
							error={Boolean(errors.passwordConfirmation)}
							errorMessage={errors.passwordConfirmation?.message}
						/>
					)}
					{requestError && (
						<p className="text-sm text-red-500">{requestError}</p>
					)}
					<Button className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : cardText.title}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex w-full flex-col items-center justify-center gap-3">
				<div className="flex flex-col items-center justify-center sm:flex-row sm:gap-3">
					<span className="block text-sm text-gray-500">{cardText.footer}</span>
					<Button
						variant="link"
						onClick={toggleAuthAction}
						className="block p-0 text-primary hover:shadow-none"
					>
						{cardText.changeActionButton}
					</Button>
				</div>
				<div className="flex flex-col items-center">
					<p className="text-sm text-gray-500">
						Or use one of the providers below:
					</p>
					<OAuth providers={authProviders} />
				</div>
			</CardFooter>
		</Card>
	);
};
