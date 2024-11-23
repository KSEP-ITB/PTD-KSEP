"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { changeUserPassword } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ChangePasswordForm = {
  password: string;
  confirmPassword: string;
};

const ChangePasswordPage = () => {
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit = async (data: ChangePasswordForm) => {
    if (!session?.user?.id) {
      return;
    }

    if (data.password !== data.confirmPassword) {
      return;
    }

    try {
      setIsProcessing(true);
      const updatedUser = await changeUserPassword(session.user.id, data.password);
      console.log("Password changed for user:", updatedUser);
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Failed to change password:", error);
    } finally {
      setIsProcessing(false);
      toast.success("Password updated successfully");
    }
  };

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center p-6 bg-gray-100 bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent mb-4">Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full focus-visible:ring-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="mt-1 block w-full focus-visible:ring-transparent"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] text-white focus-visible:ring-transparent"
          >
            {isProcessing ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
