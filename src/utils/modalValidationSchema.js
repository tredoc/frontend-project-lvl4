import * as Yup from 'yup';

const schema = (channelsNames) => Yup.object({
  channelName: Yup.string()
    .min(3, 'toShort')
    .max(20, 'toLong')
    .required('required')
    .notOneOf(channelsNames, 'channelExists'),
});

export default schema;
