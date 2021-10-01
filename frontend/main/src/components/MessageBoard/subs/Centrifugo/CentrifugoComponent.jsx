import React, { useEffect, useState } from 'react'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';
import { GET_CHANNELMESSAGES, GET_RENDEREDMESSAGES } from '../../../../redux/actions/types';

import { useParams } from 'react-router';

//Centrifugo
//import Centrifuge from 'centrifuge';
import { SubscribeToChannel } from '@zuri/control'


const CentrifugoComponent = ({channelId}) => {

  //WHERE WE DO THE PREVIOUS CONNECTION

  const dispatch = useDispatch()
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)

  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)
  const { channelDetails, sendMessages } = useSelector((state) => state.channelsReducer)

  console.log("ChannelMessages: ", channelMessages);
  console.log("Sockets: ", sockets);

  const loadData = async () => {
    await _getChannelMessages("614679ee1a5607b13c00bcb7", channelId)
    await _getSocket("614679ee1a5607b13c00bcb7", channelId)
  }


  SubscribeToChannel(sockets.socket_name, function(messageCtx) {
    console.log("from centrifugo: ", messageCtx);
    dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
    console.log("Testing rendered messages: ", renderedMessages);

    let eventType = messageCtx.data.event.action
    let eventNumber = messageCtx.data.event.recipients
  })
  

  useEffect(async () => {
    loadData()
   }, []);
}

export default CentrifugoComponent;