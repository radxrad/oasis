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
  researcher: "/researcher",
};

export const getConfirmFlow = (state, sickness) => {
  if (!state || state.onboard === false) return paths.criticalQuestions;
  if (sickness === sicknessStatus.SICK) return paths.symptoms;
  return paths.dashboard;
};

export default paths;
