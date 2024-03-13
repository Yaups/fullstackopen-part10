import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";

const IndividualRepository = () => {
  const { repositoryId } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) return <Text>Loading...</Text>;

  if (!data) return <Text>No repository info found!</Text>;

  return <RepositoryItem individualView={true} item={data.repository} />;
};

export default IndividualRepository;
