import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    Switch,
    Button,
    ModalFooter,
    Text,
    Flex,
} from "@chakra-ui/react";

const AdditionalSettingModal = ({ actions, isOpen, onClose }) => {
    const [archiveChannel, setArchiveChannel] = useState(false);
    const [makePrivate, setPrivate] = useState(false);

    const finishSettings = () => {
        onClose()
        if (makePrivate) {
            // code to make channel private
        }
        if (archiveChannel)
            actions.triggerArchiveChannel()
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent p="40px">
                <ModalHeader p="0" fontSize="20px">Additional Settings</ModalHeader>
                <ModalCloseButton right="40px" top="40px" />
                <ModalBody p="0">
                    <Text fontFamily="Lato" color="#8B8B8B" fontSize="16px" mb="10px" mt=".4rem">
                        Adjust your notifications, alerts, and message alert settings here.
                    </Text>

                    <Text fontFamily="Lato" fontSize="16px" fontWeight="bold" mb="10px" mt="1.75rem">
                        Archive this channel
                    </Text>
                    <HStack fontFamily="Lato" mb="1.75rem">
                        <Text fontSize="16px" color="#8B8B8B" flex="1">
                            If you don’t think it will be used anymore you can archive it (All members will be removed ). You can retreive it later.
                        </Text>
                        <Switch id="archiveChannel" colorScheme="green" ml="3.75rem" value={archiveChannel} onChange={(ev) => setArchiveChannel(ev.target.checked)} />
                    </HStack>

                    <Text fontFamily="Lato" fontSize="16px" color="#2B2B2B" fontWeight="bold" pb="10px">Rename this channel</Text>
                    <Text fontSize="16px" color="#8B8B8B" pb="10px" mb="1.75rem">you can rename your channel name anytime, but dont do it too often</Text>
                    <Flex justifyContent="space-between" mb="1.75rem">
                        <Text fontWeight="700" fontSize="16px" color="#2B2B2B">Set this channel to private</Text>
                        <Switch id="setChannel" colorScheme="green" ml="3.75rem" value={makePrivate} onChange={(ev) => setPrivate(ev.target.checked)} />
                    </Flex>

                    <Text fontSize="16px" fontWeight="bold" color="#2B2B2B">Delete this channel</Text>
                    <HStack mt="10px">
                        <Text flex="1" fontSize="16px" width="319px" color="#8B8B8B"fontWeight="normal" fontFamily="Lato">
                            Deleting a channel will permanently remove all of its messages. This cannot be undone.
                        </Text>
                        <Button bg="#00B87C" fontSize="15px" width="140px" ml="3.75rem" borderRadius="3px" border="none" color="#FFFFFF" outline="none" py="0.75rem" px="1.125rem">
                            Delete Channel
                        </Button>
                    </HStack>
                </ModalBody>
                <ModalFooter mt="44px" p="0">
                    <Button onClick={finishSettings} borderRadius="3px" bg="#00B87C" color="#ffffff" mb="4" py="0.875rem" px="5.06rem">
                        Done
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default AdditionalSettingModal;