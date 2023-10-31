import { ListItem, ListItemColumn, Teams, UserData } from 'interfaces';

type DataType = 'user' | 'teamLead' | 'team';

type DataToColumnsMapType = {
  [key in DataType]: (data: UserData | Teams) => ListItemColumn[];
};

const dataToColumnsMap: DataToColumnsMapType = {
  user: (data: UserData): ListItemColumn[] => [
    {
      key: 'Name',
      value: `${data.firstName} ${data.lastName}`,
    },
    {
      key: 'Display Name',
      value: data.displayName,
    },
    {
      key: 'Location',
      value: data.location,
    },
  ],
  teamLead: (data: UserData): ListItemColumn[] => [
    {
      key: 'Name',
      value: `${data.firstName} ${data.lastName}`,
    },
    {
      key: 'Display Name',
      value: data.displayName,
    },
    {
      key: 'Location',
      value: data.location,
    },
  ],
  team: (data: Teams): ListItemColumn[] => [
    {
      key: 'Name',
      value: data.name,
    },
  ],
};

export const mapDataToColumns = (data: UserData | Teams, type: DataType): ListItem => {
  const mapper = dataToColumnsMap[type];
  if (!mapper) {
    throw new Error(`Unknown data type: ${type}`);
  }

  const columns = mapper(data);
  const url = type === 'team' ? `/team/${data.id}` : `/user/${data.id}`;

  return {
    id: data.id,
    url,
    columns,
    navigationProps: data,
  };
};
