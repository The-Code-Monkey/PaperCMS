import { PageProps } from '../../../../utils/pageTypes';
import Container from "./Container";
import {useDB} from '@nucleus-cms/utils';

const List = async ({ params }: PageProps) => {
  const { tid } = params ?? {};
  const DB = useDB();
  const { data } = await DB.get<Record<string, string>[]>(tid as any);

  const { data: fieldData } = await DB.dbFunction<Record<string, string>[]>(
    'get_table_fields',
    {
      name: tid,
    }
  );

  return <Container tid={tid} data={data} fieldData={fieldData} />
};

export default List;