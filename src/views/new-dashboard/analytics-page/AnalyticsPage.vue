<template>
    <div class="bg-gray-900 text-white min-h-screen flex">
        <div class="content-left">
            <div class="left-panel-wrapper">
                <h2>Timeline</h2>
                <h4>{{ selectedData.name }}</h4>
                <ul>
                    <li v-for="(item, index) in sortedData" :key="index" :class="timelineClass(index)"
                        @click="selectTimestamp(item, index)">
                        <p>{{ formatTimestamp(item.timestamp).split('-')[0] }}</p>
                        <p>{{ formatTimestamp(item.timestamp).split('-')[1] }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-right">
            <!-- Tabs Navigation -->
            <div class="flex space-x-4">
                <button class="btn-tab" v-for="tab in tabs" :key="tab" @click="currentTab = tab" :class="tabClass(tab)">
                    / {{ tab }}
                </button>
            </div>

            <!-- Users Tab -->
            <div v-if="currentTab === 'Users'" class="mt-4 table-wrapper">
                <table class="min-w-full content-table">
                    <thead>
                        <tr>
                            <th class="py-2 px-4">Name</th>
                            <th class="py-2 px-4">Online time</th>
                            <th class="py-2 px-4">Total Talk Time</th>
                            <th class="py-2 px-4">Webcam time</th>
                            <th class="py-2 px-4">Is Moderator</th>
                            <th class="py-2 px-4">Is Dial In</th>
                            <th class="py-2 px-4">Total Messages</th>
                            <th class="py-2 px-4">Emojis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, userKey) in selectedData.users" :key="userKey">
                            <td class="px-4 py-2">{{ user.name }}</td>
                            <td class="px-4 py-2">{{ getTotalIntIdTime(user.intIds) }}</td>
                            <td class="px-4 py-2">{{ getTalkTime(user.talk.totalTime) }}</td>
                            <td class="px-4 py-2">{{ getWebcamTime(user.webcams) }}</td>
                            <td class="px-4 py-2">{{ user.isModerator ? '✔️' : '❌' }}</td>
                            <td class="px-4 py-2">{{ user.isDialIn ? '✔️' : '❌' }}</td>
                            <td class="px-4 py-2">{{ user.totalOfMessages }}</td>
                            <td class="px-4 py-2">
                                <span class="emoji-span" v-for="(emoji, emojiId) in user.emojis" :key="emojiId">
                                    {{ renderEmoji(emoji.name.split('_')[0]) }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Polls Tab -->
            <div v-if="currentTab === 'Polls'" class="mt-4 table-wrapper">
                <table class="min-w-full content-table">
                    <thead>
                        <tr>
                            <th class="py-2 px-4">User</th>
                            <th v-for="(poll, pollId) in selectedData.polls" :key="pollId" class="py-2 px-4">{{
                    poll.question }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, userKey) in selectedData.users" :key="userKey">
                            <td class="px-4 py-2">{{ user.name }}</td>
                            <td v-for="(poll, pollId) in selectedData.polls" :key="pollId" class="px-4 py-2">
                                {{ getUserPollAnswer(userKey, pollId) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Screenshare Tab -->
            <div v-if="currentTab === 'Screenshare'" class="mt-4 table-wrapper">
                <table class="min-w-full content-table">
                    <thead>
                        <tr>
                            <th class="py-2 px-4">Started On</th>
                            <th class="py-2 px-4">Stopped On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(screenshare, index) in selectedData.screenshares" :key="index">
                            <td class="px-4 py-2">{{ new Date(screenshare.startedOn).toLocaleString() }}</td>
                            <td class="px-4 py-2">{{ new Date(screenshare.stoppedOn).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Presentation Tab -->
            <div v-if="currentTab === 'Presentation'" class="mt-4 table-wrapper">
                <table class="min-w-full content-table">
                    <thead>
                        <tr>
                            <th class="py-2 px-4">Presentation Name</th>
                            <th class="py-2 px-4">Page Number</th>
                            <th class="py-2 px-4">Set On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(slide, index) in selectedData.presentationSlides" :key="index">
                            <td class="px-4 py-2">{{ slide.presentationName }}</td>
                            <td class="px-4 py-2">{{ slide.pageNum }}</td>
                            <td class="px-4 py-2">{{ new Date(slide.setOn).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end">
                <button class="btn-tab px-4 py-2" type="button" @click="handleSaveSessionData">
                    Convert to CSV
                </button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 'Users',
            tabs: ['Users', 'Polls', 'Screenshare', 'Presentation'],
            timestampsData: [],
            selectedData: null,
            selectedTimeStampIndex: 0,
        };
    },
    created() {
        this.fetchAnalyticsData();
    },
    computed: {
        sortedData() {
            return this.timestampsData.sort((a, b) => b.timestamp - a.timestamp);
        }
    },
    methods: {
        getTotalIntIdTime(intIds) {
            let totalSeconds = 0;
            // Loop through each intId entry
            for (const key in intIds) {
                if (intIds.hasOwnProperty(key)) {
                    const entry = intIds[key];
                    const sessionTime = (entry.leftOn - entry.registeredOn) / 1000;
                    totalSeconds += sessionTime;
                }
            }
            // Calculate hours, minutes, and seconds from total seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);
            // Format time as HH:MM:SS
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return formattedTime;
        },
        getTalkTime(totalTime) {
            const totalSeconds = totalTime / 1000;
            // Calculate hours, minutes, and seconds from total seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);
            // Format time as HH:MM:SS
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return formattedTime;
        },
        getWebcamTime(webcams) {
            let totalSeconds = 0;
            // Loop through each webcam session to calculate total time in seconds
            webcams.forEach(webcam => {
                const sessionTime = (webcam.stoppedOn - webcam.startedOn) / 1000;
                totalSeconds += sessionTime;
            });
            // Calculate hours, minutes, and seconds from total seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);
            // Format time as HH:MM:SS
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return formattedTime;
        },
        renderEmoji(emojiName) {
            const emojis = {
                raiseHand: '✋',
                away: '⌚',
                neutral: '😑',
                applause: '👏',
                thumbsUp: '👍',
                thumbsDown: '👎',
                sad: '😔',
                happy: '😀',
                confused: '😕',
            };
            return emojis[emojiName] || ''; // Returns the emoji or an empty string if not found
        },
        tabClass(tab) {
            return [
                "px-4 py-2",
                "btn-tab",
                this.currentTab === tab
                    ? "btn-tab-active"
                    : "",
            ];
        },
        timelineClass(index) {
            return [
                this.selectedTimeStampIndex === index
                    ? "tm-line-active"
                    : "tm-line",
            ];
        },
        getUserPollAnswer(userKey, pollId) {
            const userAnswers = this.selectedData.users[userKey].answers;
            if (userAnswers[pollId]) {
                return userAnswers[pollId].join(', ');
            }
            return '-';
        },
        // Function to format the timestamp to the desired format
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);

            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            const hours = date.getHours() % 12 || 12;
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

            return `${day} ${month}, ${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
        },
        selectTimestamp(item, index) {
            this.selectedData = item.data;
            this.selectedTimeStampIndex = index;
        },
        async fetchAnalyticsData() {
            const meetingId = this.$route.params.meetingID; // Get the meetingId from route parameters
            const url = `https://api.cast.decast.live/api/get/analytics/data/?meetingId=${meetingId}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Set the Bearer token in the headers
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const responseData = await response.json();
                this.timestampsData = responseData;
                this.selectedData = responseData[0].data;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        handleSaveSessionData() {
            const link = document.createElement('a');
            const data = this.makeUserCSVData(this.selectedData.users, this.selectedData.polls);
            const filename = `Decast_${this.selectedData.name}_${new Date(this.selectedData.createdOn).toISOString().substr(0, 10)}.csv`.replace(/ /g, '-');

            link.setAttribute('href', `data:text/csv;charset=UTF-8,${encodeURIComponent(data)}`);
            link.setAttribute('download', filename);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                link.remove();
            }, 3000);
        },
        getActivityScore(user, allUsers, totalOfPolls) {
            if (user.isModerator) return 0;

            const allUsersArr = Object.values(allUsers || {}).filter(currUser => !currUser.isModerator);
            let userPoints = 0;

            // Calculate points of Talking
            const usersTalkTime = allUsersArr.map(currUser => currUser.talk.totalTime);
            const maxTalkTime = Math.max(...usersTalkTime);
            if (maxTalkTime > 0) {
                userPoints += (user.talk.totalTime / maxTalkTime) * 2;
            }

            // Calculate points of Chatting
            const usersTotalOfMessages = allUsersArr.map(currUser => currUser.totalOfMessages);
            const maxMessages = Math.max(...usersTotalOfMessages);
            if (maxMessages > 0) {
                userPoints += (user.totalOfMessages / maxMessages) * 2;
            }

            // Calculate points of Raise hand
            const usersRaiseHand = allUsersArr.map(currUser =>
                currUser.emojis.filter(emoji => emoji.name === 'raiseHand').length
            );
            const maxRaiseHand = Math.max(...usersRaiseHand);
            const userRaiseHand = user.emojis.filter(emoji => emoji.name === 'raiseHand').length;
            if (maxRaiseHand > 0) {
                userPoints += (userRaiseHand / maxRaiseHand) * 2;
            }

            // Calculate points of Emojis
            const usersEmojis = allUsersArr.map(currUser =>
                currUser.emojis.filter(emoji => emoji.name !== 'raiseHand').length
            );
            const maxEmojis = Math.max(...usersEmojis);
            const userEmojis = user.emojis.filter(emoji => emoji.name !== 'raiseHand').length;
            if (maxEmojis > 0) {
                userPoints += (userEmojis / maxEmojis) * 2;
            }

            // Calculate points of Polls
            if (totalOfPolls > 0) {
                userPoints += (Object.values(user.answers || {}).length / totalOfPolls) * 2;
            }

            return userPoints;
        },

        getSumOfTime(eventsArr) {
            return eventsArr.reduce((prevVal, elem) => {
                if ((elem.stoppedOn || elem.leftOn) > 0) {
                    return prevVal + ((elem.stoppedOn || elem.leftOn) - (elem.startedOn || elem.registeredOn));
                }
                return prevVal + (new Date().getTime() - (elem.startedOn || elem.registeredOn));
            }, 0);
        },

        getJoinTime(eventsArr) {
            return eventsArr.reduce((prevVal, elem) => {
                if (prevVal === 0 || elem.registeredOn < prevVal) {
                    return elem.registeredOn;
                }
                return prevVal;
            }, 0);
        },

        getLeaveTime(eventsArr) {
            return eventsArr.reduce((prevVal, elem) => {
                if (elem.leftOn > prevVal) {
                    return elem.leftOn;
                }
                return prevVal;
            }, 0);
        },

        tsToHHmmss(ts) {
            return new Date(ts).toISOString().substr(11, 8);
        },

        makeUserCSVData(users, polls) {
            const userRecords = {};
            const userValues = Object.values(users || {});
            const pollValues = Object.values(polls || {});
            const skipEmojis = ['raiseHand']; // Emojis to skip

            for (let i = 0; i < userValues.length; i += 1) {
                const user = userValues[i];
                const webcam = this.getSumOfTime(user.webcams);
                const duration = this.getSumOfTime(Object.values(user.intIds));
                const joinTime = this.getJoinTime(Object.values(user.intIds));
                const leaveTime = this.getLeaveTime(Object.values(user.intIds));

                const userData = {
                    name: user.name,
                    moderator: user.isModerator ? 'TRUE' : 'FALSE',
                    activityScore: this.getActivityScore(user, userValues, pollValues.length).toFixed(1),
                    talk: user.talk.totalTime > 0 ? this.tsToHHmmss(user.talk.totalTime) : '-',
                    webcam: webcam > 0 ? this.tsToHHmmss(webcam) : '-',
                    messages: user.totalOfMessages,
                    raiseHand: this.filterUserEmojis(user, 'raiseHand').length,
                    answers: Object.keys(user.answers).length,
                    emojis: this.filterUserEmojis(user, skipEmojis).length,
                    registeredOn: new Date(joinTime).toLocaleString(),
                    leftOn: leaveTime > 0 ? new Date(leaveTime).toLocaleString() : '-',
                    duration: this.tsToHHmmss(duration),
                };

                for (let j = 0; j < pollValues.length; j += 1) {
                    userData[`Poll_${j}`] = user.answers[pollValues[j].pollId] || '-';
                }

                const userFields = Object.values(userData).map(data => `"${data}"`);
                userRecords[user.userKey] = userFields.join(',');
            }

            const tableHeaderFields = [
                'Name', 'Moderator', 'Activity Score', 'Talk Time', 'Webcam Time', 'Messages',
                'Raise Hands', 'Poll Votes', 'Emojis', 'Join', 'Left', 'Duration'
            ];

            let header = tableHeaderFields.join(',');
            let anonymousRecord = `"Anonymous"`;

            // Skip the fields for the anonymous record
            for (let k = 0; k < header.split(',').length - 1; k += 1) {
                anonymousRecord += ',""';
            }

            for (let i = 0; i < pollValues.length; i += 1) {
                header += `,${pollValues[i].question || `Poll ${i + 1}`}`;
                anonymousRecord += `,"${pollValues[i].anonymousAnswers.join('\r\n')}"`;
            }
            userRecords.Anonymous = anonymousRecord;

            return [header, Object.values(userRecords).join('\r\n')].join('\r\n');
        },

        filterUserEmojis(user, filter) {
            return user.emojis.filter(emoji => !filter.includes(emoji.name));
        },
    }
};
</script>

<style scoped>
/* Tailwind CSS styles for dark theme */
.bg-gray-900 {
    background-color: #000000;
    /* Black background */
}

.text-white {
    color: #fff;
    /* White text */
}

.bg-gray-800 {
    background-color: #0f1114;
    /* Darker background for tables */
}

.border-gray-700 {
    border-color: #FFFFFF;
    /* Darker border color */
}

.text-gray-400 {
    color: #cbd5e0;
    /* Lighter text color for inactive tab buttons */
}

.content-right {
    padding: 18px;
    width: 100%;
}

.left-panel-wrapper {
    border-right: 1px solid #cbd5e0;
    width: 250px;
    color: #FFFFFF;
    padding: 18px;
    height: 100vh;
}

.left-panel-wrapper h2 {
    color: #FFFFFF;
    font-weight: 500;
    padding-bottom: 8px;
}

.left-panel-wrapper h4 {
    color: #cbd5e0;
    font-weight: 400;
    padding-bottom: 20px;
}

.tm-line {
    margin: 14px 0px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
}

.tm-line-active {
    margin: 14px 0px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: #d7df23;
}

.tm-line:hover {
    color: #cbd5e0;
}

.content-table thead {
    background-color: #FFFFFF;
    color: #000000;
}

.emoji-span {
    font-size: large;
}

.btn-tab {
    background-color: #000000;
    color: #FFFFFF;
    border-top: 1px solid #FFFFFF;
    border-bottom: 3px solid #FFFFFF;
    border-right: 3px solid #FFFFFF;
    border-left: 1px solid #FFFFFF;
    cursor: pointer;
    min-width: 125px;
    font-weight: 500 !important;
    transition: all 0.2s ease;
}

.btn-tab-active {
    background-color: #d7df23 !important;
    color: #000000 !important;
    font-weight: 600 !important;
}
.table-wrapper {
    height: calc(100vh - 120px);
    overflow-y: scroll;
}
table {
    margin-bottom: 20px;
}
td {
  border-bottom: 1px solid #FFFFFF;
}
</style>