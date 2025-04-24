import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddChatSchema = Yup.object({
  chat: Yup.string().required(),
  contactId: Yup.number().required(),
  owner: Yup.string().required(),
});

export const createProfileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(), // Also owner
  description: Yup.string().required(),
  year: Yup.string().oneOf(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).required(),
  major: Yup.string().required(),
  likes: Yup.string().required(),
  mbti: Yup.string().required(),
  commute: Yup.string().oneOf(['dorm', 'commuter', 'other']).required(),
  current: Yup.string().required(),
  previous: Yup.string().required(),
});

export const EditProfileSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  description: Yup.string().required(),
  year: Yup.string().oneOf(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).required(),
  major: Yup.string().required(),
  likes: Yup.string().required(),
  mbti: Yup.string().required(),
  commute: Yup.string().oneOf(['dorm', 'commuter', 'other']).required(),
  current: Yup.string().required(),
  previous: Yup.string().required(),
});