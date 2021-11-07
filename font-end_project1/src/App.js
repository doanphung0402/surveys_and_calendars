import React from "react";
import "./App.css";
import {Router} from "./Constaint/Router";
import DashBoard from "./Container/DashBoard";
import { Route, Switch } from "react-router-dom";
import { Router1 } from "./Constaint/Router";
import { ProtectedRoute } from "./Config/Protected.router";

const renderRouterPageWithoutDB =(Router) =>{
  let xml =null ; 
  xml = Router.map((route,index) =>{
    const AuthenComponent = route.component; 
    return (<Route key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           render ={(routeProps)=>{
                              return (<AuthenComponent {...routeProps}/>  )
                           }}
                          />)
  })
  return xml;    
}
const renderRouterPageWithDB =(Router1) =>{
  let xml =null ; 
  xml = Router1.map((route,index) =>{

    return (<ProtectedRoute key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           component={route.component}
                           parentComponent= {DashBoard}
                           />)
  })
  return xml;    
}
function App() {
  return (
      <div className="App">
         <Switch>
             {renderRouterPageWithDB(Router1)}
             {renderRouterPageWithoutDB(Router)}
         </Switch>
      </div>
  );
}

export default App;