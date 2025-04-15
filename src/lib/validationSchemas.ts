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

export const EditProfileSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  major: Yup.string().oneOf(['computerscience', 'business', 'engineering', 'arts', 'sciences', 'socialsciences']).required(),
  year: Yup.string().oneOf(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).required(),
  owner: Yup.string().required(),
});