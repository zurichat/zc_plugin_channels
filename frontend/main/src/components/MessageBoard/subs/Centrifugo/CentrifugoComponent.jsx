import React, { useEffect, useState } from 'react'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

import { useParams } from 'react-router';

//Centrifugo
import Centrifuge from 'centrifuge';

const CentrifugoComponent = () => {
    let socketUrl = "";
            
  if (window.location.hostname == "127.0.0.1")
  {
    socketUrl = "ws://localhost:8000/connection/websocket";
  } else {
    socketUrl = "wss://realtime.zuri.chat/connection/websocket";
  }

  const centrifuge = new Centrifuge(socketUrl);
  centrifuge.connect();

  centrifuge.on('connect', function(ctx) {
    console.log("connected", ctx);
  });

  centrifuge.on('disconnect', function(ctx) {
    console.log("disconnected", ctx);
  });

  centrifuge.on('publish', (ctx) => {
    console.log(ctx);
  });

  const dispatch = useDispatch()
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)

  const { channelMessages, sockets } = useSelector((state) => state.appReducer)
  const { channelDetails } = useSelector((state) => state.channelsReducer)

  console.log("ChannelMessages: ", channelMessages);
  console.log("Sockets: ", sockets);

  const { channelId } = useParams()

  const loadData = async () => {
    await _getChannelMessages(1, channelId)
    await _getSocket(1, channelId)
  }

  

  centrifuge.subscribe(sockets.socket_name, function(messageCtx) {
    console.log(messageCtx);
    let eventType = messageCtx.data.event.action
    let eventNumber = messageCtx.data.event.recipients
    switch (eventType) {
        case "JOIN":
            channelDetails.members + eventNumber.length
            break;
    
        default:
            break;
    }
  })

  useEffect(async () => {
    loadData()
   }, []);

    return(
        <>

        </>
    )
}

export default CentrifugoComponent