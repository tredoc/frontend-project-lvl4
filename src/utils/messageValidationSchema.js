import * as Yup from 'yup';

const schema = () => Yup.object({
  message: Yup.string()
    .trim()
    .max(255, 'toLongMessage')
    .required('requiredMessage'),
});

export default schema;
