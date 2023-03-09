import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  welcomeScreenTitle: "Welcome to Retrieve! 👋",
  welcomeScreenDesc:
    "Retrieve is a student-led campaign aimed at raising awareness of the importance of preserving and protecting the environment. We are striving to make a positive impact on the world by encouraging people to use green and sustainable practices.",
  walkthroughScreenSlides: [
    {
      id: "1",
      title: "Text One",
      image: "",
    },
    {
      id: "2",
      title: "Text Two",
      image: "",
    },
    {
      id: "3",
      title: "Text Three",
      image: "",
    },
  ],
  surveyData: [
    {
      id: "1",
      question: "How many meals containing meat do you eat per week ?",
      answers: {
        type: "radio",
        values: [
          { id: 1, label: "Daily", value: "daily" },
          { id: 2, label: "Every 2 days", value: "every-2-days" },
          { id: 3, label: "Twice a week", value: "twice-a-week" },
          { id: 4, label: "Vegan", value: "vegan" },
        ],
      },
    },
    {
      id: "2",
      question:
        "How many times do use a dishwasher or a washing machine or both?",
      answers: {
        type: "radio",
        values: [
          { id: 1, label: "Every 2 days", value: "every-2-days" },
          { id: 2, label: "Daily", value: "daily" },
          { id: 3, label: "Twice a week", value: "twice-a-week" },
          { id: 4, label: "Never", value: "never" },
        ],
      },
    },
    {
      id: "3",
      question: "How often do you recycle?",
      answers: {
        type: "radio",
        values: [
          { id: 1, label: "Sometimes", value: "sometimes" },
          { id: 2, label: "Often", value: "often" },
          { id: 3, label: "Rarely", value: "rarely" },
          { id: 4, label: "Never", value: "never" },
        ],
      },
    },
    {
      id: "4",
      question: "Do You travel using plane?",
      answers: {
        type: "radio",
        values: [
          { id: 1, label: "Often", value: "often" },
          { id: 2, label: "Sometimes", value: "sometimes" },
          { id: 3, label: "Rarely", value: "rarely" },
          { id: 4, label: "Never", value: "never" },
        ],
      },
    },
    {
      id: "5",
      question: "How many hours of transportation?",
      answers: {
        type: "radio",
        values: [
          {
            id: 1,
            label: "from 320 to 450 min daily",
            value: "from 320 to 450 min daily",
          },
          {
            id: 2,
            label: "220 to 320 min daily",
            value: "220 to 320 min daily",
          },
          {
            id: 3,
            label: "121 to 220 min daily",
            value: "121 to 220 min daily",
          },
          { id: 4, label: "45 to 120min daily", value: "45 to 120min daily" },
        ],
      },
    },
    {
      id: "6",
      question: "What is the amount of natural gas do you use per month?",
      answers: {
        type: "text",
      },
    },
    {
      id: "7",
      question: "What is the amount of Electricity do you use per month?",
      answers: {
        type: "text",
      },
    },
    {
      id: "8",
      question: "What is the amount of Fuel do you use per month?",
      answers: {
        type: "text",
      },
    },
  ],
  aboutData: [
    {
      id: "1",
      type: "h1",
      text: "About Us",
    },
    {
      id: "2",
      type: "p",
      text: "Retrieve is a group of students who are passionate about making a difference in our environment. We are dedicated to raising awareness and advocating for a cleaner and healthier environment through our campaigns. Our mission is to promote sustainable living, educate the public on environmental issues, and empower individuals to take part in the fight against climate change. Join us today and help make the world a better place.",
    },
    {
      id: "3",
      type: "h1",
      text: "Who We Are",
    },
    {
      id: "4",
      type: "p",
      text: "Retrieve is a student-led campaign aimed at raising awareness of the importance of preserving and protecting the environment. We are striving to make a positive impact on the world by encouraging people to use green and sustainable practices. Our mission is to motivate people of all ages to take action and make a difference. We provide educational resources, interactive activities and online resources to help people better understand the importance of environmental conservation. Join us today and help us reach our goal of a cleaner and greener world.",
    },
    {
      id: "5",
      type: "h1",
      text: "What We Do",
    },
    {
      id: "6",
      type: "h2",
      text: "It starts with you.",
    },
    {
      id: "7",
      type: "p",
      text: "Under the motto 'It stars with you', our team is spreading awareness about the issues threatening our environment like climate change and how we can make a difference. Not many people are cognizant of the power of recycling and how it contributes greatly to the solution. Accordingly, we decided to take action. An app was created to guide people through the infinite ways in which they can recycle items made of plastic, wood, glass, etc.. As they recycle, they can end up receiving gifts! Learn more about the app here. To spread our movement, we hold events and workshops. We could discuss and educate people about a certain problem or make fun workshops in which we teach them how to recycle.",
    },
  ],
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setAppData: (state, action) => {
      if (action.payload.welcomeScreenTitle) {
        state.welcomeScreenTitle = action.payload.welcomeScreenTitle;
      }
      if (action.payload.welcomeScreenDesc) {
        state.welcomeScreenDesc = action.payload.welcomeScreenDesc;
      }
      if (action.payload.walkthroughScreenSlides) {
        state.walkthroughScreenSlides = action.payload.walkthroughScreenSlides;
      }
      if (action.payload.surveyData) {
        state.surveyData = action.payload.surveyData;
      }
      if (action.payload.aboutData) {
        state.aboutData = action.payload.aboutData;
      }
    },
  },
});

export const { setAppData } = appDataSlice.actions;

export default appDataSlice.reducer;
