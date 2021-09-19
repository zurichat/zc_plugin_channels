import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    Button,
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import appActions from "../../../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";


const ArchiveChannelModal = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const { _archiveChannel } = bindActionCreators(appActions, dispatch);
    
    // Archive a channel
    const archiveChannel = async () => {
        // close the modal first
        onClose()
        
        const orgId = 1
        const channelId = "613f70bd6173056af01b4aba"
        // code to archive the channel with Id from props
        _archiveChannel(orgId, channelId)
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent p="40px">
                <ModalHeader p="0" fontSize="20px">Archive Channel</ModalHeader>
                <ModalCloseButton right="40px" top="40px" onClick={onClose} />
                <ModalBody p="0" mt="1.9rem">
                    <Text color="#8B8B8B">
                        You are about to archive this Channel, all users will be removed from channel. However the messages and files shares will still be available in general search, but it will not appear in the side bar.
                    </Text>
                </ModalBody>
                <ModalFooter mt="6.6rem" p="0" justifyContent="center">
                    <HStack justifyContent="center" spacing="2.56rem">
                        <Button onClick={onClose} borderRadius="3px" bg="transparent" border="1px #000000 solid" px="3.28rem" py="12px">
                            Cancel
                        </Button>
                        <Button onClick={archiveChannel} borderRadius="3px" bg="#00B87C" color="#ffffff" px="3.28rem" py="12px">
                            Done
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default ArchiveChannelModal;