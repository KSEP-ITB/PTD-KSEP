"use client";

// Library Import
import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Components Import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Assts Import
import LogoPTD from "@/public/LOGOPTD.png";

// Schemas Import
import { signInSchema } from "@/lib/schemas";
import { signInSchemaType } from "@/lib/schemas";

// Auth Import
import { signIn, useSession } from "next-auth/react";
import { getUserRole } from "@/actions/user-actions";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const SignInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: signInSchemaType) {
    console.log(values);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        toast.error("Login failed. Please check your username and password.");
      } else {
        toast.success("Welcome back! Redirecting to your assignments...");

        const role = await getUserRole(values.username);

        if (role === "ADMIN") {
          router.push("/");
        } else if (role === "USER") {
          router.push("/assignments");
        }
      }
    } catch (error) {
      toast.error(
        "Something went wrong during the login process. Please try again later."
      );
    }
  }

  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] px-4">
      <motion.div
        className="bg-white/90 rounded-2xl shadow-lg flex flex-col items-center z-10 w-full max-w-xl p-6 gap-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Image src={LogoPTD} alt="Logo PTD" width={100} height={100} />
        </motion.div>
        <motion.h1
          className="text-3xl font-extrabold bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Sign In
        </motion.h1>

        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bg-gradient-to-tr from-red-600 to-amber-600 bg-clip-text text-transparent ">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-100 border focus:ring-orange-400 focus:ring-2 rounded-lg w-full px-4 py-2 focus-visible:ring-transparent border-orange-400"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bg-gradient-to-tr from-red-600 to-amber-600 bg-clip-text text-transparent">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-gray-100 border focus:ring-orange-400 focus:ring-2 rounded-lg w-full px-4 py-2 focus-visible:ring-transparent border-orange-400"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <Button
                type="submit"
                className="bg-amber-600 text-white font-semibold rounded-lg w-full py-3 hover:bg-orange-400"
              >
                Submit
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </div>
  );
};

export default SignInPage;