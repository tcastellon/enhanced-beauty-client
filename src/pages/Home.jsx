import { getUserInfo } from "../utils/auth";

function Home() {
  const user = getUserInfo()

  return (
    <div>
      <h1 className="title">Welcome{user?.first_name ? `, ${user.first_name}!` : ''}</h1>
    </div>
  );
}

export default Home;
