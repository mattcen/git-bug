import * as React from 'react';
import { useParams } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useGetUserByIdQuery } from '../../components/Identity/UserIdentity.generated';

import Identity from './Identity';

const UserQuery: React.FC = () => {
  const params = useParams<'id'>();
  if (params.id === undefined) throw new Error();

  const { loading, error, data } = useGetUserByIdQuery({
    variables: { userId: params.id },
  });
  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!data?.repository?.identity) return <p>404.</p>;
  return <Identity identity={data.repository.identity} />;
};

export default UserQuery;
