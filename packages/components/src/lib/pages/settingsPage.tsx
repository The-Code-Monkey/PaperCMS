import { Box } from '@techstack/components';
import { useState } from 'react';

import { Header, NavItemsSettings } from '../components';
import { NavItemType } from '../types';

import { StyledMain } from './styled';

interface Props {
  settings: Array<Record<string, unknown>>;
}

const SettingsPage = ({ settings }: Props) => {
  const [formData, setFormData] = useState(settings);

  const navItems = formData.find(entry => entry.setting === 'menu') as {
    content: Array<NavItemType>;
    setting: string;
  };

  const handleOnChange = (setting: string, value: Array<NavItemType>) => {
    setFormData(prevState => {
      const newState = [...prevState];
      const settingIndex = newState.findIndex(
        entry => entry.setting === setting
      );
      newState[settingIndex].content = value;
      return newState;
    });
  };

  return (
    <StyledMain>
      <Header noEntry tid='settings' />
      <Box<'form'>
        as='form'
        textAlign='left'
        flex='1'
        bg='neutrals.5'
        overflowY='auto'
      >
        <Box d='flex' flex='1' gap='6' flexDir='column'>
          <NavItemsSettings navItems={navItems} onChange={handleOnChange} />
        </Box>
      </Box>
    </StyledMain>
  );
};

export default SettingsPage;
