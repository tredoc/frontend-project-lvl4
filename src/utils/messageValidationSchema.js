import * as Yup from 'yup';
import i18n from '../i18n';

Yup.setLocale({
  mixed: {
    default: () => i18n.t('errors.fieldInvalid'),
    required: () => i18n.t('errors.required'),

  },
  string: {
    max: () => i18n.t('errors.toLongMessage'),
  },
});

const schema = () => Yup.object({
  message: Yup.string()
    .trim()
    .max(255)
    .required(),
});

export default schema;
