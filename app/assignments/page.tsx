"use client"

// Library Import
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Auth Import
import { useSession } from 'next-auth/react'

// Components Import
import AssignmentHeader from '@/components/Assigment/AssignmentHeader'
import AssignmentCard from '@/components/Assigment/AssignmentCard'
import AddAssignmentDialog from '@/components/Assigment/AddAssignmentDialog'

// Schemas Import
import { assignmentForStudentTypeWithId } from '@/lib/schemas'

// Actions Import
import { createAssignmentForStudent, deleteAssignmentForStudent, getAllAssignments } from '@/actions/assigment-actions'

const AssignmentsPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [assignments, setAssignments] = useState<
    assignmentForStudentTypeWithId[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    } else if (session?.user.role !== "ADMIN") {
      router.push("/assignments");
    }
  }, [session, router]);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setIsLoading(true);
        const fetchedAssignments = await getAllAssignments()
        setAssignments(fetchedAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  const handleAddAssignment = async (newAssignment: { 
    day: string, 
    title: string, 
    description: string,
    dueDate: string,
    linkAttach?: string,
  }) => {
    console.log(newAssignment);

    try {
      const createdAssignment = await createAssignmentForStudent(
        newAssignment.day,
        newAssignment.title,
        newAssignment.description,
        newAssignment.dueDate,
        newAssignment.linkAttach
      );

      setAssignments((prev) => [
        ...prev,
        { id: createdAssignment.id, ...newAssignment },
      ]);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAssignmentForStudent(id);
      setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-pink-100 pb-20">
      <AssignmentHeader />

      { session && session.user.role === 'ADMIN' && (
        <div className='px-4 max-w-5xl w-full flex flex-col items-start'>
          <AddAssignmentDialog onAddAssignment={handleAddAssignment}/>
        </div>
      )}

      <div className="px-4 max-w-5xl w-full space-y-4">
        {assignments && assignments
          .slice()
          .reverse()
          .map((assignment, index) => (
            <AssignmentCard
              key={index}
              id={assignment.id}
              day={assignment.day}
              title={assignment.title}
              description={assignment.description}
              dueDate={assignment.dueDate}
              linkAttach={assignment.linkAttach}
              onDelete={handleDelete}
            />
        ))}
        {assignments.length === 0 && (
          <p className='w-full text-center text-black/80 text-xl'>
            No assignments to show.
          </p>
        )}
      </div>

    </div>
  )
}
export default AssignmentsPage