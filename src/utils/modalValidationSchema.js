import * as Yup from 'yup';

const schema = (channelsNames) => Yup.object({
  channelName: Yup.string()
    .min(3, 'Min name length is 3 letters')
    .max(20, 'Max name length is 20 letters')
    .required('Required!')
    .notOneOf(channelsNames, 'Channel with this name already exists'),
});

export default schema;
