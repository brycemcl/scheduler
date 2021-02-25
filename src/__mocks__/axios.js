// this is the sample data for the jest tests where axios is mocked
const fixtures = {
  days: [
    {
      id: 1,
      name: 'Monday',
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: 'Tuesday',
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    1: { id: 1, time: '12pm', interview: null },
    2: {
      id: 2,
      time: '1pm',
      interview: { student: 'Archie Cohen', interviewer: 2 },
    },
    3: {
      id: 3,
      time: '2pm',
      interview: { student: 'Leopold Silvers', interviewer: 4 },
    },
    4: { id: 4, time: '3pm', interview: null },
  },
  interviewers: {
    1: {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
    2: {
      id: 2,
      name: 'Tori Malcolm',
      avatar: 'https://i.imgur.com/Nmx0Qxo.png',
    },
    3: {
      id: 3,
      name: 'Mildred Nazir',
      avatar: 'https://i.imgur.com/T2WwVfS.png',
    },
    4: {
      id: 4,
      name: 'Cohana Roy',
      avatar: 'https://i.imgur.com/FK8V841.jpg',
    },
  },
};
export default {
  get: jest.fn((url) => {
    const urlArray = url.split('/');
    if (urlArray[1] === 'api') {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: fixtures[urlArray[2]],
      });
    } else {
      return Promise.reject();
    }
  }),
  put: jest.fn(() => {
    return Promise.resolve();
  }),
};
