import React, { useRef, useEffect, useCallback, useState } from 'react';
import { func } from 'prop-types';
import { Box, Divider } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { FaCheck } from "react-icons/fa";
import { HStack } from "@chakra-ui/react"


const NotificationModal = ({ showModal, setShowModal }) => {

    const [notificationHistory, setNotificationHistory] = useState({});
    const [postId, setPostId] = useState({});
    const [clicked, setClicked] = useState(true)

    const ref = useRef();

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    useEffect(() => {
        fetch(
            `https://channels.zuri.chat/api/v1/1/channels/613f70bd6173056af01b4aba/members/cephas/notifications/`,
            {
                method: "GET",
                headers: new Headers({
                    Accept: "application/json"
                })
            }
        )
            .then(res => res.json())
            .then(notificationHistory => {
                setNotificationHistory(notificationHistory);
                console.log(notificationHistory, 'heyy')
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "web": "all",
                "mobile": "all",
                "same_for_mobile": true,
                "mute": true
            })
        };
        fetch('https://channels.zuri.chat/api/v1/1/channels/613f70bd6173056af01b4aba/members/cephas/notifications/', requestOptions)
            .then(response => response.json())
            .then(data => setPostId(data.id));

        console.log(postId, 'heyyy')
    }, []);

    function useOnClickOutside(ref, handler) {
        useEffect(
            () => {
                const listener = (event) => {
                    // Do nothing if clicking ref's element or descendent elements
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        );
    }

    useOnClickOutside(ref, () => setShowModal(false));

    return (
        <>
            {showModal ? (
                <Box ref={ref}>
                    <Box>
                        <Box
                            backgroundColor='#FFFFFF'
                            position='absolute'
                            right='3%'
                            marginTop='24px'
                            height='370px'
                            width='330px'
                            zIndex='9'
                            borderRadius='3px'
                            textAlign='initial'
                        >
                            <Text fontSize='15px' marginLeft='24px' marginTop='24px'>All messages</Text>
                            <Text fontSize='15px' marginLeft='24px' marginTop='4px' fontWeight='400'>Get notifications for {notificationHistory.mobile} messages</Text>
                            <Text fontSize='15px' marginLeft='24px' marginTop='16px' >@Mentions</Text>
                            <Text fontSize='15px' marginLeft='24px' marginTop='4px' fontWeight='400'>Get notifucations for @ mentions @ here
                                <br />and @ channel only</Text>
                            <HStack spacing="4px" marginLeft='4px' marginTop='16px'>
                                <FaCheck color="#00B87C" size={12} />
                                <Text onClick={() => setClicked(!clicked)} color='#00B87C' fontSize='15px' >
                                    {notificationHistory.web === 'nothing' ? 'Off' : 'On' && clicked ? 'On' : 'Off'}
                                </Text>
                            </HStack>
                            <Text fontSize='15px' marginLeft='24px' marginTop='4px' marginBottom='16px' fontWeight='400'> {notificationHistory.web === 'nothing' ? 'You wont get notification' : 'You will get notifcations'
                                && clicked === true ? 'You will get notifcations' : 'You wont get notification'}</Text>
                            <Divider orientation="horizontal" />
                            <Text fontSize='15px' marginLeft='24px' marginTop='16px'>Mute Channel</Text>
                            <Text fontSize='15px' marginLeft='24px' marginTop='4px' marginBottom='16px' fontWeight='400'>Move this channel to the bottom and only
                                <br /> see as a badge if you are mentioned</Text>
                            <Divider orientation="horizontal" />
                            <Text fontSize='15px' marginLeft='24px' marginTop='16px'>More notification options</Text>
                        </Box>
                    </Box>
                </Box>
            ) : null}
        </>
    );
};

NotificationModal.propTypes = {
    showModal: func,
    setShowModal: func,
};

export default NotificationModal