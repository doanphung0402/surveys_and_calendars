import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModelReceived from '../models/surveyReceivedModel';
import * as SurveyService from '../Service/SurveyService'; 
import  Random  from '../helper/random';
function  SurveyRoute(){
    const route = express.Router(); 
    route.post("/get-survey",async(req,res)=>{  //get survey //email // page  // status : string
        const page = req.query.page; 
        const email_user = req.body.email;
        console.log("🚀 ~ file: survey.js ~ line 13 ~ route.post ~ req.body", req.body)
        console.log("🚀 ~ file: survey.js ~ line 10 ~ route.post ~ email_user", email_user)
        const status = req.body.status ;   // SEND || RECEIVED 
        console.log("🚀 ~ file: survey.js ~ line 11 ~ route.post ~ status", status)
       try {
           const data =await SurveyService.paginationPage(page,email_user,status); //data is array
           res.json({message:HttpCode.SUCCESS,payload:{data}});       
        } catch (error) {
          res.json({message:HttpCode.ERROR}); 
        }
    });
    route.post("/create-send-survey", async(req,res)=>{
         const resultReq = req.body.survey;  
         const id = Random.alphabet(8); 
         console.log("🚀 ~ file: survey.js ~ line 24 ~ route.post ~ id", id)
         let newSurvey = {          
              title : resultReq.title , 
              option : resultReq.option, 
              vote_number: resultReq.vote_number,
              decription : resultReq.decription , 
              send_to : resultReq.send_to ,  
              note:resultReq.note, 
              id_survey_send : id, 
              schedule_survey : resultReq.schedule_survey
         }; 
         const surveySend = {
            email_user : resultReq.email_user, 
            survey_send : newSurvey   
         }
         let resultSend ; 
          try {
              await SurveyService.updateUserSendSurvey(surveySend);  // 
              const surveySendTo = {  
                title : newSurvey.title, 
                option:newSurvey.option , 
                note : newSurvey.note , 
                vote_number:newSurvey.vote_number, 
                decription:newSurvey.decription, 
                received_to : resultReq.email_user, 
                id_survey_send : newSurvey.id_survey_send,
                schedule_survey : newSurvey.schedule_survey
              }
              resultSend = await SurveyService.updateUserReceivedSurvey(newSurvey.send_to,surveySendTo) ;    
              res.json({status:HttpCode.SUCCESS,payload:resultSend}); 
          } catch (error) {
               res.json({message:HttpCode.FAILSE});
          }
    })
//     route.post("/get-all-survey-received",async(req,res)=>{
//           const email_user = req.body.email;  
//           try {
//               const  listSurveyReceived =await SurveyService.getSurveyReceived(email_user); 
//               res.json({status:HttpCode.SUCCESS,payload:listSurveyReceived})
//           } catch (error) {
//                res.json({status:HttpCode.FAILSE}); 
//           }
//     })
//     route.post("/get-all-survey-send",async(req,res)=>{
//      const email_user = req.body.email;  
//      try {
//          const listSurveySend =await SurveyService.getSurveySend(email_user); 
//          res.json({status:HttpCode.SUCCESS,payload:listSurveySend})
//      } catch (error) {
//           res.json({status:HttpCode.FAILSE}); 
//      }
// })
   route.post("/survey-choose/update-survey-user-choose",async (req,res)=>{   
         const surveyCheck = req.body.SurveySendAfterCheck; //
         await SurveyService.updateSurveyChoose(surveyCheck);     
         res.status(200).json(surveyCheck);    
   })
//    route.post("/fetch-survey-received",async(req,res)=>{
//          const survey_received_info = req.body ; 
//          console.log("🚀 ~ file: survey.js ~ line 81 ~ route.post ~ survey_received_info", survey_received_info)
//          const {email,id_survey_send} = survey_received_info ; 
//          const rsFetchSurveyReceived =  await SurveyService.getSurveyReceivedById(id_survey_send, email); 
//          if(rsFetchSurveyReceived){
//                res.json({message:HttpCode.SUCCESS},{payload:rsFetchSurveyReceived}); 
//          } else{ 
//               res.json({message:HttpCode.ERROR})
//          }
//    })
  route.post("/change-status-survey",async(req,res)=>{
     const data = req.body.payload; 
     const rsUpdate = await SurveyService.handleCheckSurvey(data); 
     res.status(200).json("suceess"); 
  })
  
 
    return route
}
export default SurveyRoute()