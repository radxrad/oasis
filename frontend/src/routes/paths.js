import { sicknessStatus } from "routes/types";

const paths = {
  home: "/",
  signIn: "/signin",
  signUp: "/signup",
  onboard: "/onboard",
  myStory: "/mystory",
  storyHistory: "/storyhistory",
  micropub: "/micropub",
  public: "/public",
  user: "/user",
  reading: "/reading",
};

export const getConfirmFlow = (state, sickness) => {
  if (!state || state.onboard === false) return paths.criticalQuestions;
  if (sickness === sicknessStatus.SICK) return paths.symptoms;
  return paths.dashboard;
};

export default paths;
