![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# TeamTrack

## Description

_Duration: 2 Week Sprint (with random updates driven from user feedback)_

&emsp; Team Track is an eSports team data management system that combines and visualizes statistics. The Web App is focused on the game Team Fortress 2 due to its active community and widely available statistics (from the website [logs.tf](https://logs.tf)) . These factors combined allowed me to get plenty of real world data and users on the site in a short period of time (70+ in a week).

&emsp; Team Track is built to support any input of preexisting statistical data within the Team Fortress 2 competative scene, and will evolve as the userbase and competitive community does.

&emsp; The combined statistics allow for an unbiased and insightful analysis into team strengths and weaknesses over a span of time, providing a much needed asset to leaders and players alike.

To see the fully functional site, please visit: [teamtrack.xyz](https://teamtrack.xyz)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a database with a name of your choice (I recommend `TeamTrack`),
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries
3. Create a `.env` file and fill out the following information:
        SERVER_SESSION_SECRET=
        STEAM_API_KEY=
        DATABASE_USERNAME=
        DATABASE_PASSWORD=
        DATABASE_URL=
        DATABASE_PORT=
        DATABASE_NAME=
        DOMAIN_NAME=
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

### Creating a team

1. Login with steam by clicking on `sign in through STEAM` in the top right of the page.
2. Once done you will be taken to the home page.
3. Click the `New Team` Button located in the bottom left corner below the `Teams` table. (or the bottom middle of the page on mobile)
4. Fill out the team information that appears in the popup.
5. Click `Create Team`
6. Congratulations you have made your new team.

### Joining a team

1. Login with steam by clicking on `sign in through STEAM` in the top right of the page.
2. Select the team you would like to join through the Teams list or by using a link to the teams page.
3. Click `Join Team` at the bottom left of the players list.
4. Click `Yes, Join` on the popup to confirm.

### Changing a players Class
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Find the player you want to edit in the list.
4. Click on the dropdown under the `Class` section of the manage table.
5. Select the class you wish to change it to.

### Changing a players role
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Find the player you want to edit in the list.
4. Click on the dropdown under the `Role` section of the manage table.
5. Select the role you wish to change it to.

### Promote a player to Leader
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Find the player you want to edit in the list.
4. Click on the button labeled `Promote`

### Remove player from team
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Find the player you want to remove in the list.
4. Click on the button labeled `Remove`

### Deactivate team
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Click on the button labeled `Deactivate` at the bottom left of the page

### Upload Stats
1. Go to the page of a team you are the leader of.
2. Click to the `Manage` tab. (this tab only shows if you are the teams leader)
3. Click on the button labeled `Upload Log` at the bottom right of the page.
4. Paste the logs.tf link in the input field named `Logs.tf URL`.
5. Fill out the rest of the information.
6. Click `Upload`.
7. When its done uploading it will close the window.

### Viewing a teams stats (no login required)

1. Select the team you would like to view through the Teams list or by using a link to the teams page.
2. Click to the `Stats` Tab.

### Viewing a players stats (no login required)

#### From home page 

1. Find the player listed in the players table on the right side of the screen (or at the bottom on mobile)
2. Click to the `Stats` Tab.

#### From team page

1. Click the players name on the `Members` table.
2. Click to the `Stats` Tab.

### Viewing your own stats

1. Login with steam by clicking on `sign in through STEAM` in the top right of the page.
2. Click on your username in the top right of the screen.
3. Click `View Profile` from the drop down.
4. Click to the `Stats` Tab.

### Changing profile name or picture

1. Login with steam by clicking on `sign in through STEAM` in the top right of the page.
2. Change username/profile picture to desired username/profile picture
3. Click on your username in the top right of the screen.
4. Click `View Profile` from the drop down.
5. Username/profile picture will update to match your steam name/picture

## Built With

- REACTjs
- Redux
- HTML
- CSS
- JavaScript
- Ant Design
- Nodejs
- Express
- PostgreSQL
- Logs.tf
- Recharts
- Azure

## Acknowledgement
Massive thank you to the Team Fortress 2 community for working with me to help make this a reality.

Thanks to my friends and mentors that helped me improve and grow throughout the process of developing this app.

Finally thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. 

## Support
If you have suggestions or issues, please email me at markspannbauer@gmail.com