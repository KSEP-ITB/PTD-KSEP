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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit = async (data: ChangePasswordForm) => {
    if (!session?.user?.id) {
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsProcessing(true);
      const updatedUser = await changeUserPassword(session.user.id, data.password);
      toast.success("Password updated successfully");
      console.log("Password changed for user:", updatedUser);
      reset(); // Reset form after successful update
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Failed to change password:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center p-6 bg-gray-100 bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] bg-clip-text text-transparent mb-4">
          Change Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full focus-visible:ring-transparent"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="mt-1 block w-full focus-visible:ring-transparent"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] text-white focus-visible:ring-transparent"
            >
              {isProcessing ? "Updating..." : "Update Password"}
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
