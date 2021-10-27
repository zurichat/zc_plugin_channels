import { useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import Home from "../components/home/Home"
import Admin from "../components/admin/index"
import CreateChannel from "../components/createChannel/index"
import MessageBoardIndex from "../components/MessageBoard/MessageBoardIndex"
import ChannelDetailsAndSetting from "../components/channelDetailsAndSetting/index"
import UserProfile from "../components/UserProfile/UserProfile"
import ChannelBrowser from "../components/ChannelBrowser"
import MessageBoardEmpty from "../components/MessageBoard/subs/EmptyMessageBoard/MessageBoardEmpty"

import appActions from "../redux/actions/app"
import centrifugo from "../utils/centrifugo"

const routes = () => {
  const dispatch = useDispatch()
  const { _getUsers, _getWorkspaceUsers } = bindActionCreators(
    appActions,
    dispatch
  )

  useEffect(async () => {
    _getUsers()
    _getWorkspaceUsers()
    centrifugo.addListener("UpdateOrganizationMemberProfile", () => {
      // console.log("reacting to UpdateOrganizationMemberProfile")
      _getWorkspaceUsers()
    })
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={ChannelBrowser} />
      <Route exact path="/home" component={Home} />
      <Route path="/create-channel" component={CreateChannel} />
      <Route path="/admin" component={Admin} />
      <Route exact path="/message-board/" component={MessageBoardEmpty} />
      <Route
        exact
        path="/message-board/:channelId"
        component={MessageBoardIndex}
      />
      <Route path="/channel-detail" component={ChannelDetailsAndSetting} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/channel-browser" component={ChannelBrowser} />
    </Switch>
  )
}

export default routes
