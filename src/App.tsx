import React, { useState } from "react";
import "./assets/main.css";

interface Repo {
  name: string;
}

function App() {
  const [repo, setRepo] = useState("");
  const [data, setData] = useState<any[] | never>([]);

  const getFetch = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await fetch(
      `https://api.github.com/users/${repo}/repos`
    )
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1>API GITHUB</h1>
      <form action="GET">
        <div>
          <label htmlFor="">Digite um nome de úsuario do GitHUB e veja os repos desta pessoa.</label>
          <input type="text" onChange={(e) => setRepo(e.target.value)} />
        </div>
        <button type="submit" onClick={getFetch}>
          CLICK
        </button>
      </form>

      <div className="content">
        {data.map((item) => {
          return <Repo key={item.id} name={item.name} />;
        })}
      </div>
    </div>
  );
}

const Repo = ({ name }: Repo) => {
  return (
    <div className="repo">
      <h3>{name}</h3>
    </div>
  );
};

export default App;
