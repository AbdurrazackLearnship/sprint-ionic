const GetPeopleCall = (geId: any) => {
  return `query{
    getpeopleInformation(geId:"${geId}"){
        edgeUid
        createdDate
        username
        firstName
        lastName    
        email
        contactPreference
        softPhoneId
        phone1
        country
        cityId
        phone2
        isEmailVerified
        managerEmail
        language
        accountId
        status
        token
        license
        {
          productId
          productName
          organizationDetail {
            emailFeatureSettings {
              emailFeatureName
              status
            }
          }
          licenseId
          startDate
          endDate
          active
        }
        serviceConfiguration
        {
            features
        }       
        orgLogoPath 
      }
  }`;
};

const GetTermsData = `query getterm {
  getAgreements(id: "1")
  }`;

// const GetAllTestProgress = (userId: number, orgId: number) => {
//   return `query getTP{
//     getAllTestProgress(userId: ${userId}, orgId: ${orgId})
//   }`
// };

const GetAllTestProgress = `query GetAllTestProgress($userId: Int!, $orgId: Int!){
    getAllTestProgress(userId: $userId, orgId: $orgId)
  }`;

const SetTermsData = (geId: string, id: string) => {
  return `mutation agree{
    updateAgreement(geId: "${geId}" id:"${id}")    
  }`
};


const GetCountriesList = `query {
  getCountries
  {
    countryCode
    countryName
    countryISDCode
    updated
  }
}`;

const GetStatesList = (countryCode: string) => {
  return `query {
    getStates(countryCode: "${countryCode}")
    {
     stateId
     stateName
     stateCode
     countryCode    
  }
}`;
};

const GetCitiesList = (countryCode: string, stateCode: number) => {
  return `query { 
    getCities(countryCode: "${countryCode}", stateCode: "${stateCode}") {
      cityId
      cityName
      stateCode
      stateName
      timezone    
    }
  }`;
};

const GetLearnerJwtoken = `query GetLearnerJwtoken($geId: Int, $edgeUid: Int, $username: String!, $uuId: String!, $iss: String!){
  getLearnerJwtoken(geId:$geId, edgeUid:$edgeUid, username:$username, uuid:$uuId, iss:$iss)
}`;
const GetTMSGetCourse = `query GetTMSGetCourse($uuId : String!)
{
getTMSGetCourse(uuId :$uuId )
{
  courseId
  status
  courseName
}
}`;

const UpdateTimezoneTms = `query UpdateTimezoneTms($uuId: String, $data: TMSLearner) {
    getTMSUpdateLearner(uuId: $uuId, data: $data) {
      guid
      id
    }
  }`;

const GetLearnerTasks = (userID: string) => {
  return `query{
      getLearnerTasks(id:"${userID}")
      {
        taskid
        licenseId
        status
        isexists
        isparallel       
      }
    }`;
}

const UpdateNewPasswordPeople = (geId: string, newPassword?: string) => {
  return `    
    mutation {
    updatePeopleInformation(geId:"${geId}",
    params:{password:"${newPassword}"   
  }
    )
      {
        firstName
        lastName
      }
    }`;
}

const UpdatePasswordPeople = (geId: string, oldPassword: string, newPassword?: string) => {
  return `    
    mutation {
    updatePeopleInformation(geId:"${geId}",
    params:{oldPassword:"${oldPassword}",
    password:"${newPassword}"   
  }
    )
      {
        firstName
        lastName
      }
    }`;
}

const GetCustomFields = (orgId: number) => {
  return `query
  {
    getOrganizationCustomFields(OrgId:${orgId})
    {
      flag
      customFieldName
      customFieldId
      autoGroup
      fieldType
      flag
      status
      values
      {
        id
      }
    }
  }`
}

const SendForgotEmail = (emailInput: string) => {
  return `query
  {
    sendForgotPasswordEmail(email:"${emailInput}")
    {
      message
    }
  }`
}

const SetLearnerInfoPeople = (geId: string, userInfo: any, transLang?: string) => {
  return `    
    mutation {
    updatePeopleInformation(geId:"${geId}",
    params:{firstName:"${userInfo.firstName}",
    lastName:"${userInfo.lastName}",
    country:"${userInfo.country}",
    cityId:"${userInfo.cityId}",
    email:"${userInfo.email}",
    contactPreference:"${userInfo.contactPreference}",
    softPhoneId:"${userInfo.softPhoneId}",
    phone1:"${userInfo.phone1}",
    phone2:"${userInfo.phone2}"
    ${userInfo.managerEmail ? `managerEmail: "${userInfo.managerEmail}"` : ""},
    ${userInfo.confirmProfile ? `confirmProfile: "${userInfo.confirmProfile}"` : ""},    
    language:"${transLang}",   
  }
    )
      {
        firstName
        lastName
        country
        cityId
        email
        contactPreference
        softPhoneId
        phone1
        phone2
      }
    }`;
}

const SetLearnerTask = (edgeUid: string, status: boolean, taskID: string, lastUpdateDateTime?: string) => {
  if (lastUpdateDateTime) {
    return `mutation add {
        createLearnerTask(input:{Id:"${edgeUid}",TaskId:"${taskID}",Status:${status},LastUpdate:"${lastUpdateDateTime}"})
        {
         Id
         TaskId
         Status   
        }
      }`;
  } else {
    return `mutation add {
        createLearnerTask(input:{Id:"${edgeUid}",TaskId:"${taskID}",Status:${status}})
        {
         Id
         TaskId
         Status  
        }
      }`;
  }
}

const UpdateLearnerTask = (edgeUid: string, status: boolean, taskID: string, lastUpdateDateTime?: string) => {
  if (lastUpdateDateTime) {
    return `mutation add {
        updateLearnerTask(input:{Id:"${edgeUid}",TaskId:"${taskID}",Status:${status},LastUpdate:"${lastUpdateDateTime}"})
        {
         Id
         TaskId
         Status   
        }
      }`;
  } else {
    return `mutation add {
        updateLearnerTask(input:{Id:"${edgeUid}",TaskId:"${taskID}",Status:${status}})
        {
         Id
         TaskId
         Status       
        }
      }`;
  }
}

const GetTMSLearnerSessions = `query getTMSLearnerSessions($uuId : String!)
{
getTMSLearnerSessions(uuId :$uuId )
{
  id
status
sessionType
sessionCalendarType
location
sessionLocation
label
startTime
endTime
course
students
{
name
id
guid
role
organization 
{
  name
  id
}
classroomLink
}
teacher
{
name
id
role
organization  
}
teacherComment
}
}`;
const CreateSessionService = `query createSessionService($courseId : Int!)
{
createSessionService(courseId :$courseId )
{
  id
  name
  length
  statistics
  
  {
      lostSessions
      upcomingSessions
      openSessions
      finishedSessions
  }
  hasTeacher
}
}`;

const Sendverification = `mutation Sendverification($learnerToken: String!, $userId:String , $email:String ){
  sendOTP(learnerToken:$learnerToken, userId:$userId, email:$email)
}`;

const VerifyEmail = `mutation VerifyEmail($learnerToken: String!, $userId:String , $code:String ){
  verifyEmail(learnerToken:$learnerToken, userId:$userId, code:$code)
}`;

const GetCourse = `query getCourse($uuId : String!)
{
  getTMSLearnerCourse(uuId :$uuId )
{
  courseId
  status  
  courseName
}
}`;

const getTMSAssignments = `query getTMSAssignments($sessionId: String!, $learnerToken: String!)
{
  getTMSAssignments(sessionId:$sessionId, learnerToken:$learnerToken)
  {
    assignments
    {
      type
      name
      url
    }
    instructions
  }
}`;

const GetlearnerFeedback = `query getLearnerFeedback($learnerToken : String!)
{
  getLearnerFeedback(learnerToken :$learnerToken )
  
}`;

const Createfeedback = `mutation createFeedback($SessionId : Int!,$UserType :String!,$UUID : String!, $Source : String!, $Rating : Int!, $Comment : String!, $Reasons : [String], $learnerToken : String!)
{
  createFeedback(input: {SessionId :$SessionId, UserType : $UserType,UUID : $UUID,Source : $Source,Rating : $Rating, Comment : $Comment, Meta:[{Reasons: $Reasons}]},learnerToken : $learnerToken )
}`;

const GetLearnerSessionsById = `query getLearnerSessionsById($id : String!) {
  getLearnerSessionsById(id:$id)
  {
    Id
    SessionId
    StartTime
    EndTime
    UnitId
    IsRatingGiven
  }
}`

const UpdateTmsLearnerSession = `mutation add($Id: String!, $UnitId: String!, $SessionId: Int!, $StartTime: Int!, $EndTime: Int!, $Status: Int!, $IsRatingGiven: Boolean ) {
  updateLearnerSessions(input:{Id: $Id, UnitId: $UnitId, SessionId: $SessionId, StartTime: $StartTime, EndTime: $EndTime, Status: $Status, IsRatingGiven: $IsRatingGiven})
  {
   Id
   UnitId
   SessionId
   StartTime
   EndTime
   Status
   IsRatingGiven
  }
}`;

const CancelSessionTMS = `mutation cancelSessionTMS($learnerToken : String!, $sessionId: String!) 
{
  cancelSessionTMS(learnerToken :$learnerToken,sessionId : $sessionId )

}`;

const GetTmsCalendarEvent = `query GetTmsCalendarEvent($courseId: String!){
  getTMSCalendarEvents(courseId: $courseId) {
  numberOfPages
  records
  {
    id
    status
    perWeekFrequency
    maxPerWeekFrequency
    createdAt
    course
    {
      referenceId
    }
    participants
    {
      id
      referenceId
    }
  }
  }
  }`;

const GetTmsLearnerAvailability = `query GetTmsLearnerAvailablity($patId: String!){
    getTMSLearnerAvailablity(patId:$patId) {
    currentPage
    numberOfPages
    records
    {
      fromTimestamp
      toTimestamp
    }
    }
    }`;

const GetAnnouncements = `query getAnnouncements($userId: String!) {
      getAnnouncements(userId: $userId) {
          hashKey
          announcement
      }
  }`;

const GetPortalLoginKey = (userID: string, geID: string) => {
  return `query  {getPortalLoginKey(userId: "${userID}", GEId: "${geID}")
  }`;
};

const GetSkillsProgress = `query getSkillsReport($userId : Int!){
  getSkillsReport(userId : $userId) {
      skilltitle
      skillcourses
      {
        accountid
        skillid
        skilltitle
        subskilltitle
        userid
        subskillid
        sessionid
        totalprework
        preworkcompleted
        totalhomework
        homeworkcompleted
        reviewcompleted
        totalsession
        sessioncompleted
        sessioncompleteddate
      }
    }}`

const GetReachProgress = `query getReachProgress($userId: Int!, $orgId: Int!, $token: String!){
  getReachReport(userId: $userId, orgId: $orgId, token: $token)
}`

const GetCurrentCourseDetails = (userId: String, licenseId: String, productId: number) => {
  return `query{
    getCurrentCourseDetails(userId:"${userId}", licenseId:"${licenseId}", productId:${productId} )
  }`
}

const GetNewsFeedData = () => {
  return `query LPContentSuggest{
    lpSuggest{
      UUID
      Url
      Source
      Author
      Category
      Title
      Content
      Summary
      ImageUrl
      Tags
      Keywords
      PublishedDate
      Readtime
    }
  }`
};

const GetSpintLevelQuery = (userID: number) => {
  return `
  {
    userskillscourseslist(params: {userId: ${userID}
  }) {
      skilltitle
      userid
      username
      skilllevel
      skillcourses {
        accountid
        skillid
        userid
        skilltitle
        subskilltitle
        subskillid
        sessionid
        totalprework
        preworkcompleted
        totalhomework
        homeworkcompleted
        reviewcompleted
        totalsession
        sessionstatus
        sessioncompleted
        sessionstarteddate
        sessioncompleteddate
        trainername
        duration
        comment
        rating
        skilltypeid
      }
    }
  }
  `
}

const GetRenewalDate = (userId: number) => {
  return `query{
    getRenewalDate(userId:${userId})
  }`
}

const PostRenewalData = (userId: number, status : number) => {
  return `mutation{
    postRenewalData(userId:${userId}, status : ${status})
  }`
}


export { GetLearnerTasks, SetLearnerTask, UpdateLearnerTask, GetPeopleCall, SetLearnerInfoPeople, GetCountriesList, GetStatesList, GetCitiesList, GetLearnerJwtoken, GetTMSGetCourse, GetTMSLearnerSessions, CreateSessionService, GetTermsData, GetCourse, GetlearnerFeedback, Createfeedback, SetTermsData, UpdateTimezoneTms, Sendverification, VerifyEmail, getTMSAssignments, GetLearnerSessionsById, UpdateTmsLearnerSession, UpdatePasswordPeople, GetCustomFields, CancelSessionTMS, GetTmsCalendarEvent, GetTmsLearnerAvailability, SendForgotEmail, GetAnnouncements, GetNewsFeedData, UpdateNewPasswordPeople, GetPortalLoginKey, GetSkillsProgress, GetReachProgress, GetSpintLevelQuery, GetAllTestProgress,GetCurrentCourseDetails,GetRenewalDate,PostRenewalData};

