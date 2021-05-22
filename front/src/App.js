import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindStudent from "./page/findStudent";
import Findpassword from "./page/findpassword";
import Login from "./page/login";
import Loginsuccess from "./page/loginsuccess";
import Main from "./page/main";
import Stusign from "./page/stusign";
import Teasign from "./page/teasign";
import FindTeacher from "./page/findTeacher";
import StuSubmit from "./page/stuSubmit";
import TeaSubmit from "./page/teaSubmit";
import MypageTp from "./page/mypageTpro";
import MypageTe from "./page/mypageTedit";
import MypageSp from "./page/mypageSpro";
import MypageSe from "./page/mypageSedit";
import Registerstu from "./page/registerStu";
import Registertea from "./page/registerTea";
import AuthRoute from "./authroute";
import Findid from "./page/findid";
import Fixpassword from "./page/fixpassword";
import PostboxSendS from "./page/postboxSendS";
import PostboxSendT from "./page/postboxSendT";
import PostboxRecieveS from "./page/postboxRecieveS";
import PostboxRecieveT from "./page/postboxRecieveT";
import PostboxDetailT from "./page/postboxDetailT";
import PostboxDetailS from "./page/postboxDetailS";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/fixpassword" exact={true} component={Fixpassword} />
        <Route path="/findid" exact={true} component={Findid} />
        <Route path="/findpassword" exact={true} component={Findpassword} />
        <Route path="/stusign" exact={true} component={Stusign} />
        <Route path="/teasign" exact={true} component={Teasign} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/loginsuccess" exact={true} component={Loginsuccess} />
        <AuthRoute path="/findstudent" exact={true} component={FindStudent} />
        <AuthRoute path="/findteacher" exact={true} component={FindTeacher} />
        <AuthRoute path="/stusubmit" exact={true} component={StuSubmit} />
        <AuthRoute path="/teasubmit" exact={true} component={TeaSubmit} />
        <AuthRoute path="/registerstu" exact={true} component={Registerstu} />
        <AuthRoute path="/registertea" exact={true} component={Registertea} />
        <AuthRoute path="/sendpost/stu" exact={true} component={PostboxSendS} />
        <AuthRoute path="/sendpost/tea" exact={true} component={PostboxSendT} />
        <AuthRoute
          path="/recievepost/stu"
          exact={true}
          component={PostboxRecieveS}
        />
        <AuthRoute
          path="/recievepost/tea"
          exact={true}
          component={PostboxRecieveT}
        />
        <AuthRoute path="/mypaget/profile" exact={true} component={MypageTp} />
        <AuthRoute path="/mypaget/edit" exact={true} component={MypageTe} />
        <AuthRoute path="/mypages/profile" exact={true} component={MypageSp} />
        <AuthRoute path="/mypages/edit" exact={true} component={MypageSe} />
        <AuthRoute
          path="/postboxdetailT"
          exact={true}
          component={PostboxDetailT}
        />
        <AuthRoute
          path="/postboxdetailS"
          exact={true}
          component={PostboxDetailS}
        />
        <Route path="/" exact={true} component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
