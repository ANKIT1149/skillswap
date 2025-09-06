import z from 'zod';

export const BioSchema = z.object({
  name: z
    .string()
    .min(4, 'Name has atleast 4 character')
    .max(40, 'Name has maximum 40 character'),

  bio: z
    .string()
    .min(20, 'Bio contain atleast 20 character')
    .max(200, 'Bio is not more than 200 character'),

  skillsToTeach: z.array(z.string()),
  skillsToLearn: z.array(z.string()),

  profilePictureurl: z.string(),
});
