import { FC, useState } from "react";
import axios from "axios";
import { UserCard } from "./component/UserCard";
import { User } from "./types/api/user";
import { UserProfile } from "./types/UserProfiles";

export const App: FC = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const onClickFetchUser = () => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <button onClick={onClickFetchUser}>データ取得</button>
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
