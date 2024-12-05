import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Followers = ({ followers }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',margin:"auto" }}>
      {followers.length > 0 ? (
        followers.map((follower) => (
          <React.Fragment key={follower.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={follower.login} src={follower.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={follower.login}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {follower.login}
                    </Typography>
                    {` — Check out their profile `}
                    <a href={follower.html_url} target="_blank" rel="noreferrer">
                      here
                    </a>
                    .
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No Followers Found" />
        </ListItem>
      )}
    </List>
  );
};
export default Followers;
