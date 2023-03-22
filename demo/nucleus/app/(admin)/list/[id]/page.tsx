import { PageProps } from '../../../../utils/pageTypes';
import Container from "./Container";
import {useDB} from '@nucleus-cms/utils';

const List = async ({ params }: PageProps) => {
  const { id } = params ?? {};
  const DB = useDB();
  const { data } = await DB.get<Record<string, string>[]>(id as any);

  const { data: fieldData } = await DB.dbFunction<Record<string, string>[]>(
    'get_table_fields',
    {
      name: id,
    }
  );

  return <Container id={id} data={data} fieldData={fieldData} />
};

export default List;
