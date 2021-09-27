import React, { useEffect, useState } from 'react'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';
import { GET_RENDEREDMESSAGES } from '../../../../redux/actions/types';

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
    console.log("Publishing: ", ctx);
  });

  const dispatch = useDispatch()
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)

  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)
  const { channelDetails, sendMessages } = useSelector((state) => state.channelsReducer)

  console.log("ChannelMessages: ", channelMessages);
  console.log("Sockets: ", sockets);

  const { channelId } = useParams()

  const loadData = async () => {
    await _getChannelMessages("614679ee1a5607b13c00bcb7", channelId)
    await _getSocket("614679ee1a5607b13c00bcb7", channelId)
  }

  
  centrifuge.subscribe(sockets.socket_name, function(messageCtx) {
    console.log("from centrifugo: ", messageCtx);
    dispatch({ type: GET_RENDEREDMESSAGES, payload: [...renderedMessages, messageCtx.data] })
    console.log("Testing rendered messages: ", renderedMessages);

    let eventType = messageCtx.data.event.action
    let eventNumber = messageCtx.data.event.recipients
    // switch (eventType) {
    //     case "join:channel":
    //       dispatch({ type: GET_RENDEREDMESSAGES, payload: renderedMessages.push(messageCtx.data) })
    //       console.log("Testing switch statement: ", renderedMessages);
    //         break;
    
    //     default:
    //         break;
    // }
  })
  

  useEffect(async () => {
    loadData()
    centrifuge.subscribe(sockets.socket_name, function(messageCtx) {
      console.log("from centrifugo: ", messageCtx);
      dispatch({ type: GET_RENDEREDMESSAGES, payload: [...renderedMessages, messageCtx.data] })
      console.log("Testing rendered messages: ", renderedMessages);
  
      let eventType = messageCtx.data.event.action
      let eventNumber = messageCtx.data.event.recipients
      // switch (eventType) {
      //     case "join:channel":
      //       dispatch({ type: GET_RENDEREDMESSAGES, payload: renderedMessages.push(messageCtx.data) })
      //       console.log("Testing switch statement: ", renderedMessages);
      //         break;
      
      //     default:
      //         break;
      // }
    })
   }, []);

    return(
        <>

        </>
    )
}

export default CentrifugoComponent