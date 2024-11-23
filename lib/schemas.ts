import z from 'zod'


// Sign In Schema
export const signInSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(6).max(20), 
});
export type signInSchemaType = z.infer<typeof signInSchema>

// Announcement Schema
export const announcementSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().min(8)
})
export type announcementSchemaType = z.infer<typeof announcementSchema>
export type announcementSchemaTypeWithId = {
  id: string
  title: string
  content: string
}

// Handbook Schema
export const handbookSchema = z.object({
  day: z.string().nonempty(),
  title: z.string().nonempty(), 
  link: z.string().url().nonempty(),
});
export type handbookSchemaType = z.infer<typeof handbookSchema>
export type handbookSchemaTypeWithId = {
  id: string
  day: string
  title: string
  link: string
}

// Student Assignment Schema
export const studentAssignmentSchema = z.object({
  link: z.string().nonempty(),
});
export type studentAssignmentType = z.infer<typeof studentAssignmentSchema>;
export type studentAssignmentTypeWithId = {
  id: string;
  link: string;
  createdAt: Date;
  userId: string;
  assignmentId: string;
};

// Assignment For Student Schema
export const assignmentForStudentSchema = z.object({
  day: z.string().nonempty(),
  title: z.string().nonempty(), 
  description: z.string().nonempty(), 
  dueDate: z.string().nonempty(),
  linkAttach: z.string().url().optional(),
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