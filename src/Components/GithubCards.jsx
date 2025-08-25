import React, { useState } from "react";

const GithubCards = () => {
  const [username, setUsername] = useState("");
  const [displayData, setDisplayData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    if (!username) return; // boşsa fetch yapma

    const token = import.meta.env.VITE_GITHUB_TOKEN; // kendi token'ını buraya ekle
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        setError("Kullanıcı bulunamadı");
        setDisplayData(null);
        return;
      }
      if (response.status === 404) {
        setError("Kullanıcı bulunamadı");
        setDisplayData(null);
        return;
      }
      const data = await response.json();
      setDisplayData(data);
      setError(null);
      console.log(data);
    } catch (error) {
      displayError(error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-dark text-light">
      <h2 className="text-danger">Github Kullanıcı Adına Göre Bilgiler</h2>
      <form onSubmit={(e) => e.preventDefault()} className="w-40">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-dark text-light border-danger"
            placeholder="Github Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="btn btn-danger border-danger"
            type="submit"
            onClick={fetchData}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      {displayData && (
        <div
          className="card mt-4 text-center bg-dark border-danger text-light"
          style={{ width: "18rem" }}
        >
          <img
            src={displayData.avatar_url}
            className="card-img-top border-bottom border-danger"
            alt="Avatar"
          />
          <div className="card-body">
            <h5 className="card-title text-danger">
              {displayData.name} // {displayData.login}
            </h5>
            <p className="card-text">{displayData.bio}</p>
          </div>
          <ul className="list-group list-group-flush bg-dark text-light">
            <li className="list-group-item bg-dark text-light border-danger">
              Toplam Public Repo Sayısı: {displayData.public_repos}
            </li>
            <li className="list-group-item bg-dark text-light border-danger">
              Takipçi Sayısı: {displayData.followers}
            </li>
            <li className="list-group-item bg-dark text-light border-danger">
              Takip Edilen: {displayData.following}
            </li>
            <li className="list-group-item bg-dark text-light border-danger">
              Hesap Oluşturma:{" "}
              {new Date(displayData.created_at).toLocaleDateString()}
            </li>
            <li className="list-group-item bg-dark text-light border-danger">
              <a
                href={displayData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-outline-danger">Takip Et</button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GithubCards;
