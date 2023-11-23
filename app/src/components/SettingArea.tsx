
import { Spacer } from './Spacer';
import { LanguageSelection } from './LanguageSelection';
import { OutputPathForm } from './OutputPathForm';
import { Heading } from './Heading';


export const SettingArea = () => {


  return (
    <div id="SettingArea">
      <Heading>Settings</Heading>
      <Spacer size={10} />
      <LanguageSelection />
      <Spacer size={10} />
      <OutputPathForm />
    </div>
  )
}