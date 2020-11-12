/* eslint react/prop-types: 0 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { selectChannel, showModal } from '../slices';
import i18n from '../i18n';
import { getChannels } from '../selectors';

const Channel = (props) => {
  const dispatch = useDispatch();
  const { channelId, channelData, t } = props;
  const { id, name, removable } = channelData;

  const chatSelectHandler = (selectedChannelId) => {
    dispatch(selectChannel(selectedChannelId));
  };
  const renameHandler = (selectedChannelId) => {
    dispatch(showModal({ modalType: 'renaming', extra: selectedChannelId }));
  };
  const deleteHandler = (selectedChannelId) => {
    dispatch(showModal({ modalType: 'removing', extra: selectedChannelId }));
  };

  const variant = id === channelId ? 'primary' : 'light';

  if (!removable) {
    return (
      <li className="w-100">
        <Button
          onClick={() => chatSelectHandler(id)}
          className="w-100 mb-1 text-left"
          variant={variant}
        >
          {name}
        </Button>
      </li>
    );
  }
  return (
    <li className="w-100">
      <Dropdown as={ButtonGroup} className="mb-1 w-100">
        <Button onClick={() => chatSelectHandler(id)} className="w-100 text-left" variant={variant}>{name}</Button>

        <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => renameHandler(id)}>{t('rename')}</Dropdown.Item>
          <Dropdown.Item onClick={() => deleteHandler(id)}>{t('delete')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const Channels = ({ t }) => {
  const dispatch = useDispatch();
  const { channelId, channelsList } = useSelector(getChannels);
  const addChannelHandler = () => {
    dispatch(showModal({ modalType: 'adding' }));
  };

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const channels = channelsList.map((channel) => (
    <Channel
      channelData={channel}
      channelId={channelId}
      dispatch={dispatch}
      key={channel.id}
      t={t}
    />
  ));

  const { language } = i18n;

  return (
    <div className="mr-3 col-3 border-right">
      <div className="d-flex justify-content-between">
        <h3>{t('channelsList')}</h3>
        <button type="button" onClick={addChannelHandler} className="btn btn-link">+</button>
      </div>
      <ul className="nav flex-column">
        {channels}
      </ul>
      <ButtonGroup className="w-100">
        <Button
          size="sm"
          variant={language === 'ru' ? 'primary' : 'light'}
          onClick={() => setLanguage('ru')}
        >
          ru
        </Button>
        <Button
          size="sm"
          variant={language === 'en' ? 'primary' : 'light'}
          onClick={() => setLanguage('en')}
        >
          en
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default withNamespaces()(Channels);
