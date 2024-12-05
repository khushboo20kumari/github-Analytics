
import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, Card, Container } from '@mui/material';
import RepoBarChart from './RepoListWithChart';
import img from "./assets/img.jpeg";

const GithubSearch = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [mostForkedRepos, setMostForkedRepos] = useState([]);
  const [popularLanguage, setPopularLanguage] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowWelcome(false); // Hide welcome message on search
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
      setError(null);

      // Fetch the repositories
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repoLanguages = {};
      const sortedRepos = reposResponse.data.sort((a, b) => b.forks_count - a.forks_count);

      // Get the top 5 most forked repos
      const topForkedRepos = sortedRepos.slice(0, 5).map((repo) => ({
        name: repo.name,
        forks: repo.forks_count,
        url: repo.html_url,
      }));

      setMostForkedRepos(topForkedRepos);

      // Count the languages used in repositories
      reposResponse.data.forEach((repo) => {
        if (repo.language) {
          repoLanguages[repo.language] = (repoLanguages[repo.language] || 0) + 1;
        }
      });

      // Convert the language counts into an array for PieChart
      const languageData = Object.keys(repoLanguages).map((language) => ({
        label: language,
        value: repoLanguages[language],
      }));

      setLanguages(languageData);

      // Determine the most popular language
      const maxLanguage = Object.keys(repoLanguages).reduce((a, b) =>
        repoLanguages[a] > repoLanguages[b] ? a : b
        , null);

      setPopularLanguage(maxLanguage);
    } catch (error) {
      setProfile(null);
      setError('User Not Found');
      setLanguages([]);
      setMostForkedRepos([]);
      setPopularLanguage(null); // Reset popular language
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">GitHub User Dashboard</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter Github Username...."
          value={username}
          className="search-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {showWelcome && (

        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <img
            src={img}
            alt="Welcome"
            style={{
              width: '100%',
              maxWidth: "700px",
              maxHeight: '400px',
              height: 'auto',
              borderRadius: "30px"
            }}
          />
        </Container>

      )}

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-img">
              <img src={profile.avatar_url} alt="Avatar" className="profile-avatar" />
            </div>
            <div className="profile-details">
              <div className="profile-des">
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-created">Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="profile-username">
                @{profile.login}
              </a>
              <p className="profile-bio">{profile.bio}</p>

              <div className="profile-stats">
                <p className="profile-repos">Repositories<br /><span className="stats">{profile.public_repos}</span></p>
                <p className="profile-followers">Followers<br /><span className="stats">{profile.followers}</span></p>
                <p className="profile-following">Following<br /><span className="stats">{profile.following}</span></p>
              </div>

              <div className="profile-info">
                <p className="profile-location"><FaMapMarkerAlt /> {profile.location}</p>
                <p className="profile-company"><PiBuildingsFill /> {profile.company}</p>
              </div>
            </div>
          </div>

          {/* Display Popular Language */}
          {popularLanguage && (
            <Card className="popular-language" sx={{ p: 4, textAlign: "center", mt: 4, background: " #141d2f", color: "white" }}>
              <Typography sx={{ fontWeight: "bold" }}>Most Popular Language:</Typography>
              <Typography sx={{ fontSize: "16px" }}>{popularLanguage}</Typography>
            </Card>
          )}

          {/* Display PieChart for Languages Used */}
          <div className="languages-chart">
            <Typography sx={{ textAlign: "center", mt: 3 }}>Languages Used</Typography>
            <Box sx={{ margin: "auto", display: "flex", justifyContent: "center", mt: 3, fontWeight: "bold" }}>
              {languages.length > 0 && (
                <PieChart
                  series={[{ data: languages }]}
                  width={400}
                  height={200}
                />
              )}
              {languages.length === 0 && <p>No languages data available.</p>}
            </Box>
          </div>

          <div className="most-forked-repos">
            <RepoBarChart mostForkedRepos={mostForkedRepos} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
