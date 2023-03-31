import Container from './container';
import {useDB} from "@nucleus-cms/utils";

const Page = async () => {
  const DB = useDB();

  const { data } = await DB.get('settings');

  return <Container settings={data} />
}

export default Page;
