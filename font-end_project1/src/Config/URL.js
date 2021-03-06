const url ="http://localhost:3000"; 
const URL ={
   urlBackend :url , 
   login : `${url}/login`, 
   signup :`${url}/signup`,
   authorization:`${url}/authorization`,
   getAllSurvey : `${url}/survey/get-all-survey`,
   sendSurvey : `${url}/survey/create-send-survey`, 
   getPaginationPage :`${url}/survey/get-survey`, 
   getAllSurveyReceived : `${url}/survey/get-all-survey-received`, 
   getAllSurveySend :`${url}/survey/get-all-survey-send`, 
   updateSurveyCheck :`${url}/survey/survey-choose/update-survey-user-choose`, 
   changeStatusSurveyItem :`${url}/survey/change-status-survey`, 
   createSchedule : `${url}/scheduler/create-schedule`, 
   getAllScheduleSend:`${url}/scheduler/get-all-schedule-send`, 
   getAllMySchedule :`${url}/scheduler/get-all-my-schedule`, 
   getSchedulePagination : `${url}/scheduler/get-scheduler-with-pagination`,
   getAllScheduleReceived : `${url}/scheduler/get-all-schedule-received`, 

   changeStatusSchedule : `${url}/scheduler/change-status-schedule-received`, 
   showDetailScheduleSend :`${url}/scheduder/detail-schedule-send`,
   deleteScheduleById : `${url}/scheduler/delete-schedule-by-id`, 
   deleteScheduleReceivedById :`${url}/scheduler/delete-scheduler-received-by-id`, 
   checkLoginAuth : `${url}/auth/login/success`
}
export default URL; 