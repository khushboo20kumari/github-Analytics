
import React, { useState } from 'react';
import axios from 'axios';
// import { FaMapMarkerAlt } from 'react-icons/fa'; 
// import { PiBuildingsFill } from 'react-icons/pi';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaGithub } from 'react-icons/fa';
import { PieChart } from '@mui/x-charts/PieChart'; // Install this or use your preferred chart library
import Followers from './Followers';

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);
    const [languagesData, setLanguagesData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileResponse = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(profileResponse.data);
            setError(null);

            // Fetch followers
            const followersResponse = await axios.get(profileResponse.data.followers_url);
            setFollowers(followersResponse.data);

            // Fetch repositories
            const reposResponse = await axios.get(profileResponse.data.repos_url);
            const repos = reposResponse.data;

            // Fetch languages for each repository
            const languageRequests = repos.map(repo =>
                axios.get(repo.languages_url).then(res => res.data)
            );
            const languagesArray = await Promise.all(languageRequests);

            // Aggregate language data
            const languageCounts = languagesArray.reduce((acc, langObj) => {
                Object.entries(langObj).forEach(([lang, bytes]) => {
                    acc[lang] = (acc[lang] || 0) + bytes;
                });
                return acc;
            }, {});

            // Convert to pie chart data format
            const totalBytes = Object.values(languageCounts).reduce((a, b) => a + b, 0);
            const pieData = Object.entries(languageCounts).map(([lang, bytes], id) => ({
                id,
                value: ((bytes / totalBytes) * 100).toFixed(2), // Percentage
                label: lang,
            }));

            setLanguagesData(pieData);
        } catch (error) {
            setProfile(null);
            setFollowers([]);
            setLanguagesData([]);
            setError('User Not Found');
        }
    };

    return (
        <div className='main-container'>
            <h1 className='main-heading'>GitHub User Dashboard</h1>
            <form onSubmit={handleSubmit} className='search-form'>
                <input
                    type='text'
                    placeholder='Enter Github Username....'
                    value={username}
                    className='search-input'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type='submit' className='search-btn'>Search</button>
            </form>

            {/* Display Welcome Message */}
            {!profile && !error && (
                <div className='welcome-message'>
                    <img style={{ borderRadius: "40px" }} src='https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fwww.pubnub.com%2Fcdn%2F3prze68gbwl1%2F3EnBdT60RDOITCeyKH5xjX%2F5e30793c93634b17a7864b86c40bc98d%2F1380.png'></img>
                </div>
            )}

            {/* Display Error Message */}
            {error && <p className='error-msg'>{error}</p>}

            {/* Display Profile Information */}
            {profile && (
                <div className='profile-container'>
                    {/* Profile Details */}
                    <div className='profile-content'>
                        <div className='profile-img'>
                            <img src={profile.avatar_url} alt='Avatar' className='profile-avatar' />
                        </div>
                        <div className='profile-details'>
                            <h2 className='profile-name'>{profile.name}</h2>
                            <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                            <p className='profile-bio'>{profile.bio}</p>
                        </div>
                    </div>

                    {/* Display Languages */}
                    {languagesData.length > 0 && (
                        <div className='languages-chart'>
                            <PieChart
                                series={[{ data: languagesData }]}
                                width={400}
                                height={200}
                            />
                        </div>
                    )}

                    {/* Display Followers */}
                    <div className='followers-container'>
                        <h3>Followers</h3>
                        <Followers followers={followers} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GithubSearch;
