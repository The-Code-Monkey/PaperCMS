import {Header, NavItemsSettings} from "../components";
import {StyledMain} from "./styled";
import {useState} from "react";
import {Box} from "@techstack/components";

const SettingsPage = ({ settings }) => {
  const [formData, setFormData] = useState(settings);

  const navItems = formData.find(entry => entry.setting === 'menu');

  const handleOnChange = (setting: string, value: any) => {
    setFormData(prevState => {
      const newState = [...prevState];
      const settingIndex = newState.findIndex(entry => entry.setting === setting);
      newState[settingIndex].content = value;
      return newState;
    })
  }

  return <StyledMain>
    <Header noEntry tid="settings" />
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
  </StyledMain>;
}

export default SettingsPage;
