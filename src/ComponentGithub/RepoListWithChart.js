// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { Box, Typography } from '@mui/material';

// export default function RepoListWithChart() {
//   const mostForkedRepos = [
//     { name: 'Repo 1', url: 'https://github.com/repo1', forks: 10 },
//     { name: 'Repo 2', url: 'https://github.com/repo2', forks: 15 },
//     { name: 'Repo 3', url: 'https://github.com/repo3', forks: 7 },
//     // Add more repos as needed
//   ];

//   return (
//     <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
//       {mostForkedRepos.length > 0 ? (
//         mostForkedRepos.map((repo) => (
//           <div key={repo.name} className="repo-item">
//             <a href={repo.url} target="_blank" rel="noreferrer" className="repo-link">
//               <Typography variant="body1">{repo.name}</Typography>
//             </a>
//             <Typography variant="body2">Forks: {repo.forks}</Typography>
//           </div>
//         ))
//       ) : (
//         <p>No forked repos available.</p>
//       )}

//       {/* Line chart section */}
//       <LineChart
//         xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//         series={[
//           {
//             data: [2, 5.5, 2, 8.5, 1.5, 5],
//             area: true,
//           },
//         ]}
//         width={500}
//         height={300}
//       />
//     </Box>
//   );
// }

import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

export default function RepoBarChart() {
  const mostForkedRepos = [
    { name: 'Repo 1', forks: 10 },
    { name: 'Repo 2', forks: 15 },
    { name: 'Repo 3', forks: 7 },
  ];

  const repoNames = mostForkedRepos.map((repo) => repo.name);
  const forksData = mostForkedRepos.map((repo) => repo.forks);

  return (
    <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Most Forked Repositories
      </Typography>

      <BarChart
        xAxis={[{ scaleType: 'band', data: repoNames }]} // Repository names on the X-axis
        series={[
          {
            data: forksData, // Fork counts on the Y-axis
            label: 'Forks',
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
}
