import z from 'zod'

export const signInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export type signInSchemaType = z.infer<typeof signInSchema>

export const announcementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
})

export type announcementSchemaType = z.infer<typeof announcementSchema>

export type announcementSchemaTypeWithId = {
  id: string
  title: string
  content: string
}

export const handbookSchema = z.object({
  day: z.string().min(1),
  title: z.string().min(1),
  link: z.string().min(1)
})

export type handbookSchemaType = z.infer<typeof handbookSchema>

export type handbookSchemaTypeWithId = {
  id: string
  day: string
  title: string
  link: string
}

// Schema untuk StudentAssignment
export const studentAssignmentSchema = z.object({
  link: z.string().min(5),
});

export type studentAssignmentType = z.infer<typeof studentAssignmentSchema>;

export type studentAssignmentTypeWithId = {
  id: string;
  link: string;
  createdAt: Date;
  userId: string;
  assignmentId: string;
};

// Schema untuk AssignmentForStudent
export const assignmentForStudentSchema = z.object({
  day: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.string(),
  linkAttach: z.string()
});

export type assignmentForStudentType = z.infer<typeof assignmentForStudentSchema>;

export type assignmentForStudentTypeWithId = {
  id: string;
  day: string;
  title: string;
  description: string;
  dueDate: string;
  linkAttach: string;
  submissions?: studentAssignmentType[];
};