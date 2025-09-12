export interface ProfileFormData {
  name: string;
  bio: string;
  skillsToTeach: [string];
  skillsToLearn: [string];
  learnEmbedding?: string;
  teachEmbedding?: string;
  profilePictureurl: string;
  userId?: string;
  email?: string;
}
