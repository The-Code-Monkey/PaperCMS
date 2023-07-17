import {useDB} from "@nucleus-cms/db";

import Container from './container';

const Page = () => {
  const DB = useDB();

  const { data } = await DB.get('settings');

  return <Container settings={data} />
}

export default Page;
