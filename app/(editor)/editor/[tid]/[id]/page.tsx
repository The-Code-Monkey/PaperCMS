import PreviewEditor from '../../../../../components/PreviewEditor';
import { PageProps } from '../../../../../utils/pageTypes';
import useDB from '../../../../../db';
import { RecordType } from '../../../../utils';
import { StyledMain } from '../../../../(admin)/styled';

const Page = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB();

  const { data: fieldData } = await DB.dbFunction<Record<string, string>[]>(
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
  return (
    <StyledMain>
      <PreviewEditor
        fields={fieldData ?? []}
        tid={tid}
        id={id}
        data={id === 'new' ? {} : data?.[0] ?? {}}
      />
    </StyledMain>
  );
};

export default Page;
