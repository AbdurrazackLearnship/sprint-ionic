import { any, string } from "prop-types"
import { ElementType } from "react";

export interface IErrorPages {
  status?: number;
}

export interface modalInterface {
  open: boolean;
  modalClosed: Function;
}

export interface SummaryImageProps {
  alt: string;
  url: string;
  width?: string;
  height?: string;
  customClass? : string;
}

export interface SummaryBlock {
  title: any;
  summary: any;
}

export interface NewsFeedBlock {
  title: string;
  summary: string;
  buttonText: string;
}

export interface ProductCardProps {
  title: any;
  summary?: any;
  iconFontClass: string;
  headColorClass: string;
  roundButtonText?: string;
  flatButtonText?: any;
  redirectURL?: string;
  productcardclass?: string;
  cardimage?: any;
  prodcardimage?: any;
  activecourse?: string;
  productid?: string;
  activeCourseButtonText?: any;
  activeCourseCertificateButtonText?: any;
  activeCourseContinueStudyingButtonText?: any;
}

export interface LearnerHomeProps {
  isActiveCourseenabled?: any;
}

export interface IAppProps {
  sourceURL?: string;
  width: number;
  height: number;
  type: string;
}

export interface ICarousal {
  Quote: string;
  Author: string;
  Client: string;
}

export interface IH1SummaryBlock {
  Heading: string;
  Description: string;
  ButtonText: string;
}

export interface ITextcontent {
  Header: string;
  Description: string;
}

export interface IImageBlock {
  url: string;
  alt: string;
}
export interface Icarousal {
  Quote: string;
  Author: string;
  Client: string;
}

export interface ISchedule {
  Heading: string;
  Description: any;
  IsAddButtonRequired: boolean;
  HeaderTextColor: string;
  PaperOnClick?: VoidFunction;
  ScheduleOnClick?: VoidFunction;
  Navigation?: boolean;
  imageURL? : string;
  buttonClick?: VoidFunction;
}

export interface ILearnerSessions {
  SessionId: number;
  CoachName?: string;
  Session_GetstartDate?: string;
  StartTime?: string;
  DurationMins?: string;
  SessionLocation?: string;
  CourseName?: string;
  IconType?: string;
  StyleInfo?: string;
  OnclickInfo?: VoidFunction;
  JoinNowButtonEnable?: boolean;
  sessionRating?: number;
  FeedbackLinkText?: string;
  FeedbackData?: IFeedbackData[];
  SessionNumber? : string;
  startTimeUnix : number;
}

export interface LoaderInterface {
  showLoader: any;
}

export interface ILearnerProfile {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  email: string;
  preferredContact: string;
  skypeID: string;
  mobile: string;
  landline: string;
  agree: boolean;
  orgLogoPath: string;
}

export interface IUpcomingData {
  upcomingTimeData: number;
  upcomingClassRoomLink: string;
}

export interface IReschedulePopup {
  currentSessionId: number;
  openPopup: boolean;
  setPopupState: any;
}
export interface ICancelPopup {
  currentSessionId: number;
  openPopup: boolean;
  coachName: string;
  sessionStartDate: string;
  sessionStartTime: string;
  duration: string;
}

export interface IEmailVerificationPopup {
  emailOpenPopup: boolean;
  setPopupState: any;
  isverifyemaildisabled: boolean;
  setVerifyEmailDisabled: any;
  setIsverifiedEmail: any;
  verifyClick: VoidFunction;
  isEmailTextDisabled: boolean;
  setEmailTextDisabled: any;
  GenerateOTP: any;
  email: any;
  edgeid: any;
}

export interface IFeedbackData {
  id: string;
  session_id: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  user_id: string;
  rating: string;
  comment: string;
  meta: any;
}

export interface ISessionRating {
  SessionDate: string;
  SessionTime: string;
  SessionDuration: string;
  Status: string;
  Rating: number;
  Teacher: boolean;
  Content: boolean;
  Technology: boolean;
  Comment: string;
  CoachName: string;
  SessionID: number;
  IsReadOnly: boolean;
}

export interface IMetaInfo {
  Teacher: boolean;
  Content: boolean;
  Technology: boolean;
}

export interface IRatingResponse {
  input: {
    SessionId: string;
    UserType: string;
    UUID: string;
    Source: string;
    Rating: number;
    Comments: string;
    Meta: any;
    learnerToken: string;
  };
}

export interface LocaleInterface {
  key: string;
  val: string;
}

export interface IDisplayNotification {
  message: any;
  iconClass: string;
  className: string;
  type: string;
  link?: string;
}

export interface completionCardInterface {
  title?: JSX.Element;
  type?: string;
  cardData?: any;
}

export interface SubSkillCardInterface {
  subSkillData: any;
  showHomeWork?: boolean;
}

export interface SkillsListInterface {
  skilltitle: string;
  skillcourses: Array<object> 
}

export interface IndivUnitsProgressInterface{
  level: string;
  overallPrework: number;
  overallSessions: number;
  overallTotalPrework: number;
  overallTotalSessions: number;
  units: Array<object>;
}

export interface TestResultsChip {
  title: JSX.Element | string;
  titleData: string | number;
}

export interface TestResultCardInterface {
  portalLoginURL: string;
  result: TestResultsDataInterface;
}

export interface TestResultsSectionInterface {
  Section: string;
  Score: number;
}

export interface TestResultsDataInterface {
  UserId: string | number;
  CompletedDate: string;
  AttemptId : string | number;
  TotalScore : number;
  TestLevel : any;
  TestId : number;
  TestName : string;
  TestSectionScores : Array<TestResultsSectionInterface>;
}

export interface ReachOverallInterface{
  ReachSkillsCompleted: number;
  ReachBadgesEarned: number;
  ReachMissionsPassed: number;
  TimeInReach : number
}

export interface ReachReportSkillList{
  SkillId: string;
  SkillName: string;
  IsAchieved: number;
  TotalBadge: number;
  BadgesEarned: number;
  TotalMission: number;
  MissionsPassed: number;
  UserCurrentGoal: number;
}

export interface ReachReportSubSkillList{
  SkillId: string;
  SkillName: string;
  BadgeId: string;
  BadgeName: string;
  IsBadgeCompleted: number;
  MissionPassed: number;
  TotalMission: number;
}

export interface LicenseObjectInterface{
  active: any;
  endDate: string;
  licenseId: string;
  organizationDetail: any
  productId: string;
  productName: string;
  startDate: string;
  show: boolean;
}

export interface InitialUserInfo{
  lgId: string | number;
  luuId: string | number;
  leuId: string | number;
  pub: string;
  managerEmail: string;
  isManagerEmailRequired: boolean;
  firstName: string;
  lastName: string;
  userId: string;
}