import * as Yup from 'yup';
import i18n from '../i18n';

Yup.setLocale({
  mixed: {
    default: () => i18n.t('errors.fieldInvalid'),
    required: () => i18n.t('errors.required'),
    notOneOf: () => i18n.t('errors.channelExists'),
  },
  string: {
    min: () => i18n.t('errors.fieldTooShort'),
    max: () => i18n.t('errors.fieldTooBig'),
  },
});

const schema = (channelsNames) => Yup.object().shape({
  channelName: Yup.string()
    .min(3)
    .max(20)
    .required()
    .notOneOf(channelsNames),
});

export default schema;
