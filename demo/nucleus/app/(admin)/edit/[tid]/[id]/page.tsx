import { PageProps } from '../../../../../utils/pageTypes';
import { RecordType } from '../../../../utils';

import Container from "./Container";
import {useDB} from "@nucleus-cms/utils";

const Edit = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB();

  const { data: fields } = await DB.dbFunction<Record<string, string>[]>(
    'get_table_fields',
    {
      name: tid,
    }
  );

  const { data } = await DB.get<Record<string, Array<RecordType>>[]>(
    tid as any,
    {
      where: ['id', id],
    }
  );

  return <Container tid={tid} id={id} data={id === 'new' ? {} : data?.[0] ?? {}}
                    fields={fields ?? []} />;
};

export default Edit;
