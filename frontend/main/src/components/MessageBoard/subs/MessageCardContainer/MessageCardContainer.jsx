

import React, { useEffect, useState, useRef } from 'react'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Image } from "@chakra-ui/react"
import Spinner from '../../../../../src/assets/spinner.gif'

import APIService from "../../../../utils/api";

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from '../../../shared/MessageCard';
import EmptyStateComponent from '../../../createChannel/EmptyStateComponent';

//centrifuge
import Centrifuge from 'centrifuge'
import { GET_RENDEREDMESSAGES } from '../../../../redux/actions/types';


const MessageCardContainer = ({ channelId }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)
    const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)

    const [allChannelMessage, setAllChannelMessage] = useState()
    const [moreMessages, setMoreMessages] = useState(false)
    const noOfMessages = 20;

    const messageRef = useRef();

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [channelMessages])


    useEffect(() => {
        if (users && users.currentWorkspace) {
            _getChannelMessages(users.currentWorkspace, channelId)
        }
    }, [channelId, users]);


    return (
        <>
            <Box overflowY='scroll'
                height='100%'
                position='relative'>
                <EmptyStateComponent org_id={users.currentWorkspace} />
                {channelMessages && channelMessages.length > 0 &&
                    <Box ref={messageRef}>
                        {channelMessages && channelMessages.length > 0 &&
                            channelMessages.map((message) => {
                                return (
                                    message === [] ? <Text textAlign="center">Loading...</Text> :
                                        <MessageCard {...message} key={message._id} />
                                )
                            })
                        }
                    </Box>
                }
                <Box />
            </Box>
        </>
    )
}

export default MessageCardContainer;
