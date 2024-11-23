"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAllStudentAssignmentByAssignmentId, getAssignmentForStudentById } from "@/actions/assigment-actions";
import { assignmentForStudentTypeWithId, studentAssignmentTypeWithId } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { getUsernameById } from "@/actions/user-actions";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [assignment, setAssignment] = useState<assignmentForStudentTypeWithId>();
  const [studentAssignments, setStudentAssignments] = useState<(studentAssignmentTypeWithId & { username?: string })[]>([]);

  if (!session) {
    router.push("/sign-in");
  }

  useEffect(() => {
    const id = pathname?.split("/").pop();

    const fetchAssignment = async () => {
      try {
        if (id) {
          const assignmentData = await getAssignmentForStudentById(id);
          if (assignmentData) {
            setAssignment(assignmentData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignment();
  }, [pathname]);

  useEffect(() => {
    const id = pathname?.split("/").pop();

    const fetchStudentSubmissions = async () => {
      try {
        if (id) {
          const submissions = await getAllStudentAssignmentByAssignmentId(id);

          // Fetch usernames for each submission
          const submissionsWithUsernames = await Promise.all(
            submissions.map(async (submission) => {
              const username = await getUsernameById(submission.userId);
              return { ...submission, username };
            })
          );

          // @ts-ignore
          setStudentAssignments(submissionsWithUsernames);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentSubmissions();
  }, [pathname]);

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-pink-100 pb-20">
      <div />

      {assignment && (
        <div className="w-full max-w-5xl p-6 bg-gradient-to-b from-purple-200 to-pink-200 border-white rounded-lg text-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-purple-600">{assignment.day}</h1>
          <h3 className="text-2xl font-semibold mb-6 text-pink-600">{assignment.title}</h3>

          <div
            className="overflow-x-auto bg-white p-4 rounded-md mb-6 text-gray-700 shadow-sm border border-purple-100"
            dangerouslySetInnerHTML={{ __html: assignment.description }}
          ></div>

          <p className="text-sm mb-6">
            <span className="font-semibold text-purple-500">Due Date:</span>{" "}
            <span className="font-medium">{assignment.dueDate}</span>
          </p>

          <Button className="px-6 py-2 text-white bg-pink-300 hover:bg-pink-400 font-medium rounded-md shadow-md transition duration-200">
            See Attachment
          </Button>
        </div>
      )}

      {studentAssignments.length > 0 && (
        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Student Submissions</h2>
          <div className="space-y-4">
            {studentAssignments.map((submission) => (
              <div
                key={submission.id}
                className="p-4 bg-gray-100 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-700 font-medium">Submission Link:</p>
                  <a
                    href={submission.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline break-words"
                  >
                    {submission.link}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Submitted on: {new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">User: {submission.username || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
